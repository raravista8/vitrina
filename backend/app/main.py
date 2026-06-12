"""FastAPI application entrypoint.

`create_app()` wires the security middleware stack (request-id, headers,
canonical error envelopes), opens a Redis connection on startup for the
rate limiter, and mounts /healthz + /readyz for container probes.

T1.3 will mount API routers under `app.api.routers`.
"""

from __future__ import annotations

from contextlib import asynccontextmanager
from typing import Any

from fastapi import FastAPI
from fastapi.responses import JSONResponse

from app import __version__
from app.admin.routers.api import router as admin_api_router
from app.admin.routers.auth import router as admin_auth_router
from app.admin.routers.dashboard import router as admin_dashboard_router
from app.admin.routers.leads import router as admin_leads_router
from app.admin.routers.sites import router as admin_sites_router
from app.api.middleware import (
    RequestIDMiddleware,
    SecurityHeadersMiddleware,
    register_exception_handlers,
)
from app.api.routers.applications import router as applications_router
from app.api.routers.auth import router as auth_router
from app.api.routers.billing import router as billing_router
from app.api.routers.feedback import router as feedback_router
from app.api.routers.leads import router as leads_router
from app.api.routers.leads_elektrik import router as leads_elektrik_router
from app.api.routers.lk import router as lk_router
from app.api.routers.me import router as me_router
from app.api.routers.preview import router as preview_router
from app.api.routers.static_sites import router as static_site_router
from app.api.routers.track import router as track_router
from app.config import get_settings
from app.utils.logging import configure_logging, get_logger


@asynccontextmanager
async def _lifespan(app: FastAPI) -> Any:
    """Open infra clients on startup; close them on shutdown."""
    configure_logging()
    log = get_logger("app.main")
    settings = get_settings()

    # Redis (used by rate_limit + queues). Lazy-import keeps `import app.main`
    # cheap for unit tests that don't need a Redis connection.
    redis_client = None
    try:
        from redis.asyncio import Redis

        redis_client = Redis.from_url(settings.redis_url, encoding="utf-8", decode_responses=False)
        # Probe so misconfiguration surfaces on boot, not on the first request.
        await redis_client.ping()
        log.info("redis_connected", url_scheme=settings.redis_url.split("://", 1)[0])
    except Exception as exc:  # pragma: no cover — covered by integration tests
        # We do NOT crash the process: /readyz will report not-ready until
        # Redis is back, but /healthz still passes (liveness vs readiness).
        log.warning("redis_unavailable", error=exc.__class__.__name__)
        redis_client = None

    app.state.redis = redis_client

    # Notifications (T1.6) — outbound TG bot client + SMTP client wired into
    # a NotificationDispatcher. Both clients tolerate missing credentials in
    # dev: `is_available()` returns False and channels are skipped.
    from app.core.notify.channels.email import EmailChannel
    from app.core.notify.channels.telegram import TelegramChannel
    from app.core.notify.dispatcher import NotificationDispatcher
    from app.core.notify.ports import ChannelType
    from app.infrastructure.email.smtp_client import SmtpClient
    from app.infrastructure.telegram.bot_client import TelegramBotClient

    tg_client = TelegramBotClient(token=settings.tg_bot_token)
    await tg_client.start()
    smtp_client = SmtpClient(
        host=settings.smtp_host,
        port=settings.smtp_port,
        user=settings.smtp_user,
        password=settings.smtp_password,
        sender=settings.smtp_from,
    )
    dispatcher = NotificationDispatcher(
        channels={
            ChannelType.telegram: TelegramChannel(tg_client),
            ChannelType.email: EmailChannel(smtp_client),
        },
        founder_telegram_chat_id=settings.tg_admin_chat_id,
        founder_email=settings.founder_email,
    )
    app.state.notification_dispatcher = dispatcher
    log.info(
        "notifications_ready",
        telegram=tg_client.is_available(),
        smtp=smtp_client.is_available(),
        founder_chat_set=bool(settings.tg_admin_chat_id),
        founder_email_set=bool(settings.founder_email),
    )

    # Preview (T1.4b) — same TG bot client is reused for get_chat;
    # Geosearch gets its own httpx-based client.
    from app.core.preview.adapters.tg import TelegramPreviewAdapter
    from app.core.preview.adapters.ymaps import YMapsPreviewAdapter
    from app.core.preview.ports import PreviewSourceType
    from app.core.preview.service import PreviewService
    from app.infrastructure.yandex.geosearch import YandexGeosearchClient

    geosearch_client = YandexGeosearchClient(api_key=settings.yandex_geosearch_api_key)
    preview_service = PreviewService(
        adapters={
            PreviewSourceType.telegram: TelegramPreviewAdapter(tg_client),
            PreviewSourceType.ymaps: YMapsPreviewAdapter(geosearch_client),
        }
    )
    app.state.preview_service = preview_service
    log.info(
        "preview_ready",
        telegram=tg_client.is_available(),
        ymaps=geosearch_client.is_available(),
    )

    # Instant-preview (CANON_INSTANT_PREVIEW_TZ + REV2 §7) — search by
    # name + async draft builder. State lives in Redis; when Redis was
    # unavailable at startup the services stay None and the dependency
    # getters answer 503 instead of crashing.
    from app.core.preview.draft import CandidateStore, DraftStore
    from app.core.preview.draft_builder import DraftFetchers, PreviewDraftService
    from app.core.preview.search import PreviewSearchService
    from app.infrastructure.http_fetch import HttpxTextFetcher

    if redis_client is not None:
        candidate_store = CandidateStore(redis_client)
        app.state.preview_search_service = PreviewSearchService(
            gateway=geosearch_client, candidates=candidate_store
        )
        app.state.preview_draft_service = PreviewDraftService(
            store=DraftStore(redis_client),
            candidates=candidate_store,
            fetchers=DraftFetchers(geosearch=geosearch_client, html_fetcher=HttpxTextFetcher()),
        )
    else:
        app.state.preview_search_service = None
        app.state.preview_draft_service = None
    log.info(
        "instant_preview_ready",
        redis=redis_client is not None,
        geosearch=geosearch_client.is_available(),
    )

    # YandexGPT client (T4.1). When credentials are absent the client's
    # `is_available()` returns False and the content service short-
    # circuits to a "failed" outcome — `make dev` keeps working
    # without YC access. CLAUDE.md hard rule + ADR-0003: NO other LLM
    # provider may be wired here.
    from app.infrastructure.yandex.gpt import YandexGptClient

    content_llm = YandexGptClient(
        api_key=settings.yandexgpt_api_key,
        folder_id=settings.yandexgpt_folder_id,
        model_name=settings.yandexgpt_model_name,
        model_version=settings.yandexgpt_model_version,
        temperature=settings.yandexgpt_temperature,
    )
    app.state.content_llm = content_llm
    log.info("content_llm_ready", available=content_llm.is_available())

    # ЮKassa client (T9.1). Same pattern as YandexGPT: when shop_id /
    # secret_key are absent, is_available() returns False and the
    # billing router refuses checkout with a 503 — dev keeps working
    # without ЮKassa creds.
    from app.infrastructure.yookassa.client import YookassaClient

    payment_gateway = YookassaClient(
        shop_id=settings.yookassa_shop_id,
        secret_key=settings.yookassa_secret_key,
    )
    app.state.payment_gateway = payment_gateway
    log.info("payment_gateway_ready", available=payment_gateway.is_available())

    # Lead encryption (T5.2). Production envs MUST set FERNET_KEYS; in
    # dev we mint an ephemeral key so `make dev` boots without 1Password
    # access. The ephemeral key is in-memory only — restart loses
    # historical ciphertext, which is the correct behaviour for dev.
    from cryptography.fernet import Fernet

    from app.core.leads.encryption import build_fernet

    raw_keys = (settings.fernet_keys or "").strip()
    if raw_keys:
        key_list = [k.strip() for k in raw_keys.split(",") if k.strip()]
    elif settings.environment.value == "production":
        msg = "FERNET_KEYS must be set in production (SECURITY.md §A04)"
        raise RuntimeError(msg)
    else:
        ephemeral = Fernet.generate_key().decode("ascii")
        log.warning(
            "fernet_key_ephemeral",
            note="generated for dev; set FERNET_KEYS for persistent encryption",
        )
        key_list = [ephemeral]
    app.state.lead_fernet = build_fernet(key_list)
    log.info("lead_fernet_ready", key_count=len(key_list))

    # Publishing (T2.3) — Jinja2 renderer + S3 uploader + SEO + notifier
    # composed into a SitePublisher. The uploader falls back to the
    # in-memory implementation when S3 credentials are absent so the dev
    # loop and integration tests work without object-storage access.
    from pathlib import Path

    from app.core.publishing.service import SitePublisher
    from app.core.seo.adapters.google_search_console import GoogleSearchConsoleSubmitter
    from app.core.seo.adapters.indexnow import IndexNowSubmitter
    from app.core.seo.adapters.yandex_webmaster import YandexWebmasterSubmitter
    from app.core.seo.ports import SeoEngine
    from app.core.seo.service import SeoSubmissionService
    from app.infrastructure.s3.uploader import (
        InMemoryStaticUploader,
        S3StaticUploader,
    )

    uploader: InMemoryStaticUploader | S3StaticUploader
    if settings.s3_bucket and settings.s3_access_key and settings.s3_secret_key:
        uploader = S3StaticUploader(
            bucket=settings.s3_bucket,
            access_key=settings.s3_access_key,
            secret_key=settings.s3_secret_key,
            endpoint_url=settings.s3_endpoint_url,
            region=settings.s3_region,
            cdn_base_url=settings.cdn_base_url,
        )
        log.info("s3_uploader_ready", bucket=settings.s3_bucket)
    else:
        uploader = InMemoryStaticUploader()
        log.warning("s3_uploader_disabled", reason="missing_credentials")

    seo_service = SeoSubmissionService(
        submitters={
            SeoEngine.yandex_webmaster: YandexWebmasterSubmitter(
                api_key=settings.yandex_webmaster_api_key
            ),
            SeoEngine.indexnow: IndexNowSubmitter(site_key=settings.indexnow_site_key),
            SeoEngine.google_search_console: GoogleSearchConsoleSubmitter(
                service_account_json_path=settings.gsc_service_account_json
            ),
        }
    )
    if settings.sites_template_dir:
        sites_template_dir = Path(settings.sites_template_dir)
    else:
        # Two layouts work without env-config:
        #   - dev / monorepo: backend/app/main.py → ../../sites-template
        #   - Docker: /app/app/main.py + Dockerfile copies sites-template
        #     to /app/sites-template (also ../../sites-template)
        sites_template_dir = Path(__file__).resolve().parents[2] / "sites-template"
    app.state.site_publisher = SitePublisher(
        template_dir=sites_template_dir,
        uploader=uploader,
        seo=seo_service,
        notifier=dispatcher,
    )
    log.info("site_publisher_ready", template_dir=str(sites_template_dir))

    # milreview content site — rendered once at startup and served by Host via
    # `milreview_site_router` (this prod has no Object Storage write path, so the
    # app server is the origin; Caddy routes milreview.samosite.online → api).
    app.state.milreview_host = f"milreview.{settings.sites_base_domain}"
    try:
        from app.core.publishing.milreview import render_all, resolve_milreview_dir

        app.state.milreview_files = render_all(
            base_dir=resolve_milreview_dir(settings.sites_template_dir),
            base_url=f"https://{app.state.milreview_host}",
        )
        log.info("milreview_site_rendered", files=len(app.state.milreview_files))
    except Exception as exc:  # never block startup on a content-render error
        app.state.milreview_files = {}
        log.warning("milreview_site_render_failed", error=str(exc))

    # elektrik-spb customer site — same startup-render + Host-served model as
    # milreview (no Object Storage write path on this prod). Caddy routes
    # elektrik-spb.samosite.online → api.
    app.state.elektrik_host = f"elektrik-spb.{settings.sites_base_domain}"
    try:
        from app.core.publishing.elektrik import render_all as render_elektrik
        from app.core.publishing.elektrik import resolve_elektrik_dir

        app.state.elektrik_files = render_elektrik(
            base_dir=resolve_elektrik_dir(settings.sites_template_dir),
            base_url=f"https://{app.state.elektrik_host}",
        )
        log.info("elektrik_site_rendered", files=len(app.state.elektrik_files))
    except Exception as exc:  # never block startup on a content-render error
        app.state.elektrik_files = {}
        log.warning("elektrik_site_render_failed", error=str(exc))

    # Owner-deleted sites (status=pending_purge, LK4) must keep returning 410
    # across restarts. Probe the DB once and suppress any matching static-site
    # host + drop its rendered files. Best-effort — never block startup.
    app.state.purged_hosts = set()
    try:
        from sqlalchemy import select as _select

        from app.infrastructure.postgres.engine import get_sessionmaker
        from app.infrastructure.postgres.models import Site as _Site

        _sm = await get_sessionmaker()
        async with _sm() as _s:
            _rows = (
                await _s.execute(
                    _select(_Site.subdomain, _Site.custom_domain).where(
                        _Site.status == "pending_purge"
                    )
                )
            ).all()
        for _sub, _custom in _rows:
            _host = _custom or f"{_sub}.{settings.sites_base_domain}"
            app.state.purged_hosts.add(_host)
            if _host == app.state.milreview_host:
                app.state.milreview_files = {}
            elif _host == app.state.elektrik_host:
                app.state.elektrik_files = {}
        if app.state.purged_hosts:
            log.info("purged_hosts_loaded", hosts=sorted(app.state.purged_hosts))
    except Exception as exc:  # never block startup on the probe
        log.warning("purged_hosts_probe_failed", error=str(exc))

    # Re-apply owner-edited SEO keywords (client ЛК «Ключевые слова», LK5) to the
    # served pages so a `PUT /api/lk/keywords` survives api restarts (it writes
    # the page's <meta keywords> in-process; the source of truth is
    # Site.settings['keywords']). Runs AFTER the purge probe so purged hosts
    # (files={}) are skipped. Best-effort — never block startup.
    try:
        from sqlalchemy import select as _select

        from app.core.keywords import GROUP_KEYS, apply_keywords_to_html
        from app.infrastructure.postgres.engine import get_sessionmaker
        from app.infrastructure.postgres.models import Site as _Site

        _host_attr = {
            app.state.milreview_host: "milreview_files",
            app.state.elektrik_host: "elektrik_files",
        }
        _sm = await get_sessionmaker()
        async with _sm() as _s:
            _rows = (
                await _s.execute(_select(_Site.subdomain, _Site.custom_domain, _Site.settings))
            ).all()
        _applied = 0
        for _sub, _custom, _st in _rows:
            _kw = (_st or {}).get("keywords")
            if not (isinstance(_kw, dict) and isinstance(_kw.get("groups"), dict)):
                continue
            _attr = _host_attr.get(_custom or f"{_sub}.{settings.sites_base_domain}")
            if _attr is None:
                continue
            _files = getattr(app.state, _attr, {}) or {}
            _entry = _files.get("index.html")
            if _entry is None or not isinstance(_entry[0], str):
                continue
            _groups = {k: list(_kw["groups"].get(k, [])) for k in GROUP_KEYS}
            _files["index.html"] = (apply_keywords_to_html(_entry[0], _groups), _entry[1])
            setattr(app.state, _attr, _files)
            _applied += 1
        if _applied:
            log.info("keywords_reapplied", sites=_applied)
    except Exception as exc:  # never block startup on the probe
        log.warning("keywords_reapply_failed", error=str(exc))

    # Admin session store (T2.1). Disabled when Redis is unavailable —
    # /admin/login then 503s instead of letting users in without sessions.
    from app.core.auth.customer import CustomerSessionStore
    from app.core.auth.login_challenge import LoginChallengeStore
    from app.core.auth.sessions import AdminSessionStore

    if redis_client is not None:
        app.state.admin_session_store = AdminSessionStore(
            redis_client, secret_key=settings.session_secret_key
        )
        # Two-step login challenge store (PR-E). Same lifespan gate as the
        # session store — no Redis means no admin login at all.
        app.state.login_challenge_store = LoginChallengeStore(redis_client)
        # canon 0.4.0 customer login (T-Auth). Same Redis instance,
        # different cookie/prefix per CustomerSessionStore.
        app.state.customer_session_store = CustomerSessionStore(
            redis_client, secret_key=settings.session_secret_key
        )
        log.info("admin_session_store_ready")
    else:
        app.state.admin_session_store = None
        app.state.login_challenge_store = None
        app.state.customer_session_store = None
        log.warning("admin_session_store_disabled", reason="redis_unavailable")

    try:
        yield
    finally:
        if redis_client is not None:
            await redis_client.close()
        await tg_client.shutdown()


def create_app() -> FastAPI:
    settings = get_settings()
    app = FastAPI(
        title="Vitrina API",
        version=__version__,
        docs_url="/docs" if settings.debug else None,
        redoc_url=None,
        openapi_url="/openapi.json" if settings.debug else None,
        lifespan=_lifespan,
    )

    # Middleware: order matters. Starlette evaluates them inside-out, so the
    # last `add_middleware` call runs first on the request and last on the
    # response. We want the request-id assigned BEFORE the headers middleware
    # sees the response, hence headers added first then request-id.
    app.add_middleware(SecurityHeadersMiddleware)
    app.add_middleware(RequestIDMiddleware)

    register_exception_handlers(app)

    app.include_router(applications_router)
    app.include_router(auth_router)
    app.include_router(feedback_router)
    app.include_router(billing_router)
    app.include_router(leads_router)
    app.include_router(leads_elektrik_router)
    app.include_router(lk_router)
    app.include_router(me_router)
    app.include_router(preview_router)
    app.include_router(track_router)
    app.include_router(admin_auth_router)
    app.include_router(admin_api_router)
    app.include_router(admin_dashboard_router)
    app.include_router(admin_leads_router)
    app.include_router(admin_sites_router)

    @app.get("/healthz", include_in_schema=False)
    async def healthz() -> JSONResponse:
        """Liveness: process is up and serving HTTP. Used by Docker healthcheck."""
        return JSONResponse({"ok": True, "data": {"status": "alive"}})

    @app.get("/readyz", include_in_schema=False)
    async def readyz() -> JSONResponse:
        """Readiness: every dependency this process talks to is reachable.

        Currently checks Redis (set by `_lifespan`). T1.1 wired the schema;
        Postgres readiness lands when T1.3 attaches the engine. Crypto key
        readiness lands with T5.x.
        """
        checks: dict[str, bool] = {}

        redis_client = getattr(app.state, "redis", None)
        if redis_client is None:
            checks["redis"] = False
        else:
            try:
                await redis_client.ping()
                checks["redis"] = True
            except Exception:  # readiness probe is best-effort
                checks["redis"] = False

        all_ready = all(checks.values()) and len(checks) > 0
        body = {"ok": all_ready, "data": {"checks": checks}}
        return JSONResponse(body, status_code=200 if all_ready else 503)

    # Registered LAST: one Host-dispatching catch-all GET that serves the
    # app-rendered static sites (milreview + elektrik-spb). Only matches GETs no
    # earlier router/route claimed, and only responds for a registered Host — so
    # it can't shadow api/admin/health. (A single catch-all, not one per site:
    # two `/{file_path:path}` routes would conflict on path match.)
    app.include_router(static_site_router)

    return app


app = create_app()
