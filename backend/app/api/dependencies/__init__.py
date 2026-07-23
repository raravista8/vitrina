"""FastAPI dependency factories.

Centralises ``Depends()`` providers so routers stay thin:

  - ``get_session``       — yields an ``AsyncSession`` per request
  - ``get_client_ip``     — leftmost X-Forwarded-For, then request.client.host
  - ``application_rate_limiter`` — 3/h/IP per FR-004
"""

from __future__ import annotations

import uuid
from collections.abc import AsyncIterator
from dataclasses import dataclass
from typing import Annotated

from cryptography.fernet import MultiFernet
from fastapi import Depends, HTTPException, Request
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.middleware import RateLimiter
from app.config import get_settings
from app.core.auth.customer import CustomerSessionStore
from app.core.auth.login_challenge import LoginChallengeStore
from app.core.auth.sessions import AdminSession, AdminSessionStore
from app.core.billing.ports import PaymentGateway
from app.core.captcha.verifier import CaptchaVerifier, build_captcha_verifier
from app.core.content.ports import LlmClient
from app.core.notify.dispatcher import NotificationDispatcher
from app.core.preview.draft_builder import PreviewDraftService
from app.core.preview.search import PreviewSearchService
from app.core.preview.service import PreviewService
from app.infrastructure.postgres.engine import get_sessionmaker


async def get_session() -> AsyncIterator[AsyncSession]:
    """Yield an AsyncSession, closing it when the request completes.

    Transactions are scoped by the caller via ``session.begin()`` or
    ``session.commit()`` — the dependency itself doesn't open a tx.
    """
    sessionmaker = await get_sessionmaker()
    async with sessionmaker() as session:
        yield session


def get_client_ip(request: Request) -> str | None:
    """Return the client IP, preferring the leftmost X-Forwarded-For entry
    (which Caddy populates) and falling back to ``request.client.host``."""
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        return forwarded.split(",", 1)[0].strip()
    return request.client.host if request.client is not None else None


# Per FR-004: applications endpoint allows N submissions per IP per hour.
# Configured via Settings.rate_limit_applications_per_ip_per_hour (default 3).
def _build_application_rate_limiter() -> RateLimiter:
    settings = get_settings()
    return RateLimiter(
        limit=settings.rate_limit_applications_per_ip_per_hour,
        window_seconds=3600,
        scope="applications",
    )


application_rate_limiter = _build_application_rate_limiter()


def _build_feedback_rate_limiter() -> RateLimiter:
    """Feedback endpoint: same 3/h/IP as applications. Feedback is an
    abuse target too (free-text → searchable in admin), so we keep the
    same budget rather than relaxing it."""
    settings = get_settings()
    return RateLimiter(
        limit=settings.rate_limit_applications_per_ip_per_hour,
        window_seconds=3600,
        scope="feedback",
    )


feedback_rate_limiter = _build_feedback_rate_limiter()


def _build_preview_rate_limiter() -> RateLimiter:
    """FR-005a: 10 req/min/IP keeps the preview endpoint useless for
    upstream-reconnaissance / harvesting attacks."""
    settings = get_settings()
    return RateLimiter(
        limit=settings.rate_limit_preview_per_ip_per_min,
        window_seconds=60,
        scope="preview",
    )


preview_rate_limiter = _build_preview_rate_limiter()


def _build_preview_search_rate_limiter() -> RateLimiter:
    """Instant-preview rev.2 §7: 10 req/min/IP on the Geosearch text
    search — 429 + Retry-After past the budget."""
    settings = get_settings()
    return RateLimiter(
        limit=settings.rate_limit_preview_search_per_ip_per_min,
        window_seconds=60,
        scope="preview_search",
    )


preview_search_rate_limiter = _build_preview_search_rate_limiter()


def _build_preview_draft_rate_limiter() -> RateLimiter:
    """Draft creation spawns a ≤30 s background build that fetches
    user-supplied URLs — 10/h/IP keeps the legit «Изменить источник»
    retry loop working while killing fetch-amplification abuse."""
    settings = get_settings()
    return RateLimiter(
        limit=settings.rate_limit_preview_draft_per_ip_per_hour,
        window_seconds=3600,
        scope="preview_draft",
    )


preview_draft_rate_limiter = _build_preview_draft_rate_limiter()


def _build_preview_draft_poll_rate_limiter() -> RateLimiter:
    """Poll endpoint: the consumer polls every ~1 s for ≤40 s per build;
    120/min/IP is generous for the flow and still recon-hostile."""
    settings = get_settings()
    return RateLimiter(
        limit=settings.rate_limit_preview_draft_poll_per_ip_per_min,
        window_seconds=60,
        scope="preview_draft_poll",
    )


preview_draft_poll_rate_limiter = _build_preview_draft_poll_rate_limiter()


def _build_admin_login_rate_limiter() -> RateLimiter:
    """SECURITY.md T7.1: 5 attempts per IP per 15 min."""
    settings = get_settings()
    return RateLimiter(
        limit=settings.rate_limit_admin_login_per_ip_per_15min,
        window_seconds=15 * 60,
        scope="admin_login",
    )


admin_login_rate_limiter = _build_admin_login_rate_limiter()


def get_admin_session_store(request: Request) -> AdminSessionStore:
    """Per-app AdminSessionStore. Lifespan attaches Redis + secret on startup."""
    store: AdminSessionStore | None = getattr(request.app.state, "admin_session_store", None)
    if store is None:
        msg = "admin_session_store not initialised — lifespan didn't run?"
        raise RuntimeError(msg)
    return store


def get_customer_session_store(request: Request) -> CustomerSessionStore:
    """Per-app CustomerSessionStore — canon 0.4.0 customer login (T-Auth).

    Lifespan attaches Redis + secret on startup. Distinct from admin store
    (different cookie name `samosite_session`, different Redis prefix
    `customer_session:`, different TTL — 30 days vs 4h).
    """
    store: CustomerSessionStore | None = getattr(request.app.state, "customer_session_store", None)
    if store is None:
        msg = "customer_session_store not initialised — lifespan didn't run?"
        raise RuntimeError(msg)
    return store


def get_login_challenge_store(request: Request) -> LoginChallengeStore:
    """Per-app LoginChallengeStore for the 2-step admin login (PR-E)."""
    store: LoginChallengeStore | None = getattr(request.app.state, "login_challenge_store", None)
    if store is None:
        msg = "login_challenge_store not initialised — lifespan didn't run?"
        raise RuntimeError(msg)
    return store


async def require_admin(
    request: Request,
    store: AdminSessionStore = Depends(get_admin_session_store),
) -> AdminSession:
    """Dependency for every /admin/* route except /admin/login.

    Reads the signed cookie, looks the session up in Redis, refreshes its
    last_seen_at, and returns the AdminSession. On any failure 303-redirects
    to /admin/login. Per SECURITY.md A07.
    """
    raw = request.cookies.get("admin_session")
    if raw is None:
        raise _unauthorised_redirect()

    session_id = store.unsign_cookie(raw)
    if session_id is None:
        raise _unauthorised_redirect()

    record = await store.load(session_id)
    if record is None:
        raise _unauthorised_redirect()

    return await store.touch(record)


def _unauthorised_redirect() -> HTTPException:
    # 303 forces a GET on /admin/login; the browser drops form data which is
    # what we want for an expired session.
    return HTTPException(
        status_code=303,
        detail="admin_login_required",
        headers={"Location": "/admin/login"},
    )


def get_captcha_verifier() -> CaptchaVerifier:
    """Module-singleton-ish factory. Tests override via
    ``app.dependency_overrides[get_captcha_verifier] = lambda: <fake>``."""
    return build_captcha_verifier(get_settings())


def get_notification_dispatcher(request: Request) -> NotificationDispatcher:
    """Return the per-app NotificationDispatcher initialised in lifespan.

    Tests override the dep directly to inject a fake dispatcher; here we
    just look up the instance set on ``app.state``.
    """
    dispatcher: NotificationDispatcher | None = getattr(
        request.app.state, "notification_dispatcher", None
    )
    if dispatcher is None:
        msg = "notification_dispatcher not initialised — lifespan didn't run?"
        raise RuntimeError(msg)
    return dispatcher


def get_preview_service(request: Request) -> PreviewService:
    """Per-app PreviewService initialised by the lifespan (T1.4b)."""
    svc: PreviewService | None = getattr(request.app.state, "preview_service", None)
    if svc is None:
        msg = "preview_service not initialised — lifespan didn't run?"
        raise RuntimeError(msg)
    return svc


def get_preview_search_service(request: Request) -> PreviewSearchService:
    """Per-app PreviewSearchService (instant-preview rev.2). ``None`` when
    Redis was down at startup — fail with 503, not a crash."""
    svc: PreviewSearchService | None = getattr(request.app.state, "preview_search_service", None)
    if svc is None:
        raise HTTPException(status_code=503, detail="preview_search_unavailable")
    return svc


def get_preview_draft_service(request: Request) -> PreviewDraftService:
    """Per-app PreviewDraftService (instant-preview rev.1+rev.2). ``None``
    when Redis was down at startup — fail with 503, not a crash."""
    svc: PreviewDraftService | None = getattr(request.app.state, "preview_draft_service", None)
    if svc is None:
        raise HTTPException(status_code=503, detail="preview_draft_unavailable")
    return svc


def _build_leads_hourly_rate_limiter() -> RateLimiter:
    """FR-052: 3/h/IP on the customer-site lead form."""
    settings = get_settings()
    return RateLimiter(
        limit=settings.rate_limit_leads_per_ip_per_hour,
        window_seconds=3600,
        scope="leads_hourly",
    )


leads_hourly_rate_limiter = _build_leads_hourly_rate_limiter()


def _build_leads_daily_rate_limiter() -> RateLimiter:
    """FR-052: 10/day/IP secondary cap on top of the hourly limit."""
    settings = get_settings()
    return RateLimiter(
        limit=settings.rate_limit_leads_per_ip_per_day,
        window_seconds=86_400,
        scope="leads_daily",
    )


leads_daily_rate_limiter = _build_leads_daily_rate_limiter()


def _build_track_rate_limiter() -> RateLimiter:
    """T5.1 / FR-? : 100 req/min/IP keeps the customer-site analytics
    endpoint useless as an amplifier while still allowing legitimate
    page interactions (scroll, click_phone, etc)."""
    settings = get_settings()
    return RateLimiter(
        limit=settings.rate_limit_track_per_ip_per_min,
        window_seconds=60,
        scope="track",
    )


track_rate_limiter = _build_track_rate_limiter()


def get_lead_fernet(request: Request) -> MultiFernet:
    """Per-app MultiFernet initialised in lifespan (T5.2). The lifespan
    fails fast at startup if FERNET_KEYS isn't configured in
    production — see ``app/main.py``."""
    fernet: MultiFernet | None = getattr(request.app.state, "lead_fernet", None)
    if fernet is None:
        msg = "lead_fernet not initialised — lifespan didn't run?"
        raise RuntimeError(msg)
    return fernet


def get_payment_gateway(request: Request) -> PaymentGateway:
    """Per-app PaymentGateway initialised in lifespan (T9.1). When
    ЮKassa credentials are absent the gateway is still wired but
    `is_available()` returns False — the router maps that to a 503."""
    gateway: PaymentGateway | None = getattr(request.app.state, "payment_gateway", None)
    if gateway is None:
        msg = "payment_gateway not initialised — lifespan didn't run?"
        raise RuntimeError(msg)
    return gateway


def get_content_llm(request: Request) -> LlmClient:
    """Per-app LlmClient initialised in lifespan (T4.1). Falls back to
    a ``YandexGptClient`` constructed with empty credentials when the
    env vars aren't set — that client's ``is_available()`` returns
    False and the content service returns a failed outcome instead of
    crashing the admin request."""
    client: LlmClient | None = getattr(request.app.state, "content_llm", None)
    if client is None:
        msg = "content_llm not initialised — lifespan didn't run?"
        raise RuntimeError(msg)
    return client


# ── client ЛК session gate ────────────────────────────────────────────────────

_CUSTOMER_SESSION_COOKIE = "samosite_session"


@dataclass(frozen=True, slots=True)
class CustomerContext:
    """Resolved owner identity for ``/api/lk/*``. ``site_id`` is the authority
    every ЛК query scopes by — never trust a site_id from the request body."""

    user_id: uuid.UUID
    site_id: uuid.UUID
    login: str


async def require_customer_session(
    request: Request,
    store: Annotated[CustomerSessionStore, Depends(get_customer_session_store)],
    session: Annotated[AsyncSession, Depends(get_session)],
) -> CustomerContext:
    """Resolve the ``samosite_session`` cookie → owner + their site.

    401 when there's no/invalid/expired session; 403 when the user has no site.
    Used as a dependency on every ``/api/lk/*`` route so scoping is enforced
    server-side, not just in the UI."""
    from app.infrastructure.postgres.models import Site, User

    raw = request.cookies.get(_CUSTOMER_SESSION_COOKIE)
    session_id = store.unsign_cookie(raw) if raw else None
    if not session_id:
        raise HTTPException(status_code=401, detail="not_authenticated")
    record = await store.load(session_id)
    if record is None:
        raise HTTPException(status_code=401, detail="session_expired")

    # One master = one site in MVP; pick their earliest site.
    row = (
        await session.execute(
            select(User.login, Site.id)
            .join(Site, Site.user_id == User.id)
            .where(User.id == record.user_id)
            .order_by(Site.created_at.asc())
            .limit(1)
        )
    ).one_or_none()
    if row is None:
        raise HTTPException(status_code=403, detail="no_site")
    return CustomerContext(user_id=record.user_id, site_id=row.id, login=row.login or "")
