"""Admin site-publishing router (T2.3).

GET  /admin/sites                       — list sites with status
GET  /admin/sites/{id}                  — detail (status, source, content preview)
POST /admin/sites/{id}/publish          — fire SitePublisher, update DB, audit log

Manual MVP flow per docs/TASKS.md T2.3: founder reviews ``generated_content``,
clicks "Publish", and the orchestrator renders → uploads → submits SEO →
notifies the owner.

Errors are surfaced as red banners on the detail page rather than as JSON
errors — admin is HTML-only and a click should always get a visible result.
"""

from __future__ import annotations

from datetime import UTC, datetime
from typing import Annotated, Any
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import HTMLResponse, RedirectResponse
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.admin import admin_templates
from app.api.dependencies import (
    get_client_ip,
    get_content_llm,
    get_session,
    require_admin,
)
from app.config import get_settings
from app.core.auth.sessions import AdminSession
from app.core.content.ports import LlmClient
from app.core.content.service import generate_for_snapshot
from app.core.notify.dispatcher import UserContact
from app.core.notify.ports import ChannelType
from app.core.parsing.ports import (
    ContactRef,
    PhotoRef,
    ReviewRef,
    ServiceItem,
    SourceSnapshot,
    SourceType,
)
from app.core.publishing.service import (
    PublishContext,
    PublishResult,
    SitePublisher,
)
from app.infrastructure.audit.generation import write_audit_row
from app.infrastructure.postgres.models import AdminAction, Site, User
from app.utils.logging import get_logger

router = APIRouter(prefix="/admin/sites", tags=["admin"])
_log = get_logger("admin.sites")


def get_site_publisher(request: Request) -> SitePublisher:
    """Per-app SitePublisher initialised in lifespan. Lazy lookup keeps
    routers slim — overriding the dep in tests is the canonical seam."""
    publisher: SitePublisher | None = getattr(request.app.state, "site_publisher", None)
    if publisher is None:
        msg = "site_publisher not initialised — lifespan didn't run?"
        raise RuntimeError(msg)
    return publisher


# ---- list / detail ---------------------------------------------------------


@router.get("", response_class=HTMLResponse, include_in_schema=False)
async def admin_sites_list(
    request: Request,
    session: Annotated[AsyncSession, Depends(get_session)],
    _admin: Annotated[AdminSession, Depends(require_admin)],
) -> HTMLResponse:
    status_filter = request.query_params.get("status")
    stmt = select(Site).order_by(Site.created_at.desc()).limit(200)
    if status_filter:
        stmt = stmt.where(Site.status == status_filter)
    rows = (await session.execute(stmt)).scalars().all()
    return admin_templates.TemplateResponse(
        request,
        "sites_list.html",
        {"sites": rows, "status_filter": status_filter},
    )


@router.get("/{site_id}", response_class=HTMLResponse, include_in_schema=False)
async def admin_site_detail(
    site_id: UUID,
    request: Request,
    session: Annotated[AsyncSession, Depends(get_session)],
    _admin: Annotated[AdminSession, Depends(require_admin)],
) -> HTMLResponse:
    site = await _load_site_or_404(session, site_id)
    flash = request.query_params.get("flash")
    return admin_templates.TemplateResponse(
        request,
        "site_detail.html",
        {
            "site": site,
            "can_publish": _can_publish(site),
            "flash": flash,
        },
    )


# ---- publish action --------------------------------------------------------


@router.post("/{site_id}/generate", include_in_schema=False)
async def admin_site_generate(
    site_id: UUID,
    request: Request,
    session: Annotated[AsyncSession, Depends(get_session)],
    admin: Annotated[AdminSession, Depends(require_admin)],
    llm: Annotated[LlmClient, Depends(get_content_llm)],
) -> RedirectResponse:
    """T4.1 wire-up: take the site's stored snapshot and run it through
    the LLM. Writes ``sites.generated_content`` on success + an audit
    row either way."""
    site = await _load_site_or_404(session, site_id)
    if site.source_snapshot is None:
        return _redirect_with_flash(site_id, "no_snapshot")

    snapshot = _snapshot_from_json(site.source_snapshot)
    outcome = await generate_for_snapshot(snapshot=snapshot, llm=llm)
    await write_audit_row(session=session, site_id=site.id, outcome=outcome)

    if (outcome.status == "success" and outcome.content is not None) or (
        outcome.status == "flagged" and outcome.content is not None
    ):
        site.generated_content = outcome.content
        site.status = "review"
    # On "failed": keep snapshot, no generated_content, status unchanged
    # so the founder can re-trigger after fixing the upstream cause.

    session.add(
        AdminAction(
            admin_id=UUID(str(admin.admin_id)),
            action="content_generated",
            target_type="site",
            target_id=str(site.id),
            params={
                "status": outcome.status,
                "tokens_in": outcome.tokens_in,
                "tokens_out": outcome.tokens_out,
                "safety_flags": outcome.safety_flags,
                "error_message": outcome.error_message,
            },
            ip=get_client_ip(request),
        )
    )
    await session.commit()

    flash = f"generated_{outcome.status}"
    return _redirect_with_flash(site_id, flash)


@router.post("/{site_id}/publish", include_in_schema=False)
async def admin_site_publish(
    site_id: UUID,
    request: Request,
    session: Annotated[AsyncSession, Depends(get_session)],
    admin: Annotated[AdminSession, Depends(require_admin)],
    publisher: Annotated[SitePublisher, Depends(get_site_publisher)],
) -> RedirectResponse:
    site = await _load_site_or_404(session, site_id)
    if not _can_publish(site):
        return _redirect_with_flash(site_id, "not_publishable")

    owner = (
        await session.execute(select(User).where(User.id == site.user_id))
    ).scalar_one_or_none()
    if owner is None:
        return _redirect_with_flash(site_id, "owner_missing")

    try:
        ctx = _build_publish_context(site=site, owner=owner)
        result = await publisher.publish(ctx)
    except Exception as exc:  # admin UI must always reach a flash banner
        _log.exception(
            "publish_failed",
            site_id=str(site_id),
            error_class=exc.__class__.__name__,
        )
        return _redirect_with_flash(site_id, "publish_failed")

    await _persist_publish_outcome(
        session=session,
        site=site,
        result=result,
        admin_id=str(admin.admin_id),
        ip=get_client_ip(request),
    )
    return _redirect_with_flash(site_id, "published")


# ---- helpers ---------------------------------------------------------------


async def _load_site_or_404(session: AsyncSession, site_id: UUID) -> Site:
    site = (await session.execute(select(Site).where(Site.id == site_id))).scalar_one_or_none()
    if site is None:
        raise HTTPException(status_code=404, detail="site_not_found")
    return site


def _can_publish(site: Site) -> bool:
    """A site is publishable iff it has generated content and is in a
    state where re-publishing is meaningful (review or already-published).
    ``parsing``/``generating`` rows are blocked — the worker is still
    writing them, publishing now would race the writer.
    """
    if site.generated_content is None:
        return False
    return site.status in {"review", "published"}


def _build_publish_context(*, site: Site, owner: User) -> PublishContext:
    """Convert ORM rows into the dataclass the publisher takes.

    The render context is taken from ``site.generated_content`` (LLM
    output from T4.x) merged with computed defaults (site_url, year,
    captcha key). For unfinished MVP rows where ``generated_content``
    is still partial, missing keys fall through to the template's own
    ``{% if %}`` guards — no need to coerce shape here.

    **Phase 9c (v2.1 booking-page switchover):** template
    ``index.html.j2`` теперь ожидает **nested ``site.*`` namespace**
    (``site.hero.h1``, ``site.name``, etc) вместо старого flat shape.
    Adapter ``_adapt_to_v21_shape`` трансформирует **legacy** LLM
    output (flat ``site_title``, ``services[].title``) **или** новый
    shape (с ``hero_h1``, ``process[]``) в единый template context.
    Existing customer-sites при re-publish получат корректный layout
    даже если LLM ещё не пере-генерировал content с v2.1 fields.
    """
    settings = get_settings()
    site_url = _site_url(site.subdomain, settings.sites_base_domain)

    raw = dict(site.generated_content or {})
    content = _adapt_to_v21_shape(raw=raw, site=site, owner=owner)
    content.setdefault("site_url", site_url)
    content.setdefault("site_locale", "ru_RU")
    content.setdefault("contact_url", "/api/leads")
    content.setdefault("year", datetime.now(UTC).year)
    content.setdefault("captcha_client_key", settings.yandex_smartcaptcha_server_key or "")
    content.setdefault("site_subdomain", site.subdomain)

    return PublishContext(
        site_id=str(site.id),
        subdomain=site.subdomain,
        site_url=site_url,
        render_context=content,
        owner_contact=_owner_contact(owner),
    )


def _adapt_to_v21_shape(*, raw: dict[str, object], site: Site, owner: User) -> dict[str, object]:  # noqa: ARG001  # site/owner reserved for future per-site context overrides
    """Bridge между legacy и v2.1 booking-page template shapes.

    `index.html.j2` (v2.1) reads from a `site` dict + nested objects.
    Legacy LLM output stored these fields flat. New (post-Phase 9c)
    LLM output добавляет hero_h1, hero_sub, process[], faq[],
    about_creds[], about_guarantees[]. Adapter ничего не выдумывает —
    отсутствующие fields остаются empty, template гасит секцию
    через `{% if %}`.

    Schema produced:
      site: {
        name, category, city, address, phone, phone_e164,
        rating, reviews_count, review_source,
        years_experience, clients_served, geo, opening_hours,
        social_badges, telegram_username, whatsapp_phone,
        hero: {h1, sub, photo_url, caption}
      }
      services: [{name, desc, duration, price, price_hint}]
      services_last_updated, process, gallery, reviews_curated,
      about, faq
    """
    # Legacy field accessors with defaults.
    site_title = raw.get("site_title") or "Сайт"
    organization = raw.get("organization") or {}
    org_phone = organization.get("phone") if isinstance(organization, dict) else None
    org_address = organization.get("address") if isinstance(organization, dict) else None
    org_geo = organization.get("geo") if isinstance(organization, dict) else None
    org_hours = organization.get("opening_hours") if isinstance(organization, dict) else None

    phone = raw.get("site_phone") or org_phone or ""
    phone_e164 = _to_e164(phone)

    # Hero — either new flat fields (hero_h1 / hero_sub) or legacy
    # site_title / site_description fallback.
    hero_h1 = raw.get("hero_h1") or site_title
    hero_sub = raw.get("hero_sub") or raw.get("site_description") or ""
    hero_photo = raw.get("site_hero_photo") or ""
    hero_caption = raw.get("hero_caption") or (raw.get("site_category") or "")

    # Services — legacy used [{title, description, price_label}], new
    # template uses [{name, desc, price, duration, price_hint}].
    legacy_services = raw.get("services") or []
    services: list[dict[str, object]] = []
    for sv in legacy_services if isinstance(legacy_services, list) else []:
        if not isinstance(sv, dict):
            continue
        services.append(
            {
                "name": sv.get("name") or sv.get("title") or "",
                "desc": sv.get("desc") or sv.get("description") or "",
                "duration": sv.get("duration") or sv.get("duration_label") or "",
                "price": sv.get("price") or sv.get("price_label") or "",
                "price_hint": sv.get("price_hint") or "",
            }
        )

    # Reviews — legacy `reviews[]` или curated через E13 — `reviews_curated`.
    reviews_curated_raw = raw.get("reviews_curated") or raw.get("reviews") or []
    reviews_curated: list[dict[str, object]] = []
    for rv in reviews_curated_raw if isinstance(reviews_curated_raw, list) else []:
        if not isinstance(rv, dict):
            continue
        reviews_curated.append(
            {
                "author": rv.get("author") or "",
                "avatar_url": rv.get("avatar_url") or "",
                "rating": rv.get("rating") or 5,
                "text": rv.get("text") or "",
                "date_iso": rv.get("date_iso") or rv.get("date") or "",
                "source": rv.get("source") or raw.get("review_source_name") or "",
                "is_top_pick": bool(rv.get("is_top_pick")),
            }
        )

    # About — bio / creds / guarantees. Legacy не имел этих fields,
    # будут empty until AI re-generates с v2.1 prompt.
    about_payload: dict[str, object] | None = None
    if raw.get("about_bio") or raw.get("about_creds") or raw.get("about_guarantees"):
        about_payload = {
            "photo_url": raw.get("about_photo_url") or "",
            "bio": raw.get("about_bio") or "",
            "creds": raw.get("about_creds") or [],
            "guarantees": raw.get("about_guarantees") or [],
        }

    # Process steps — 4 fixed icons. Empty list если LLM ещё не дал.
    process = raw.get("process") or []
    faq = raw.get("faq") or []

    site_dict: dict[str, object] = {
        "name": site_title,
        "category": raw.get("site_category") or "",
        "city": raw.get("site_city") or "",
        "address": org_address or "",
        "phone": phone,
        "phone_e164": phone_e164,
        "rating": raw.get("average_rating") or raw.get("site_rating") or 5.0,
        "reviews_count": raw.get("total_reviews_count") or len(reviews_curated),
        "review_source": raw.get("review_source_name") or "источнике",
        "years_experience": raw.get("years_experience") or 0,
        "clients_served": raw.get("clients_served") or 0,
        "geo": org_geo or {},
        "opening_hours": org_hours or [],
        "social_badges": raw.get("social_badges") or [],
        "telegram_username": raw.get("telegram_username") or "",
        "whatsapp_phone": raw.get("whatsapp_phone") or "",
        "hero": {
            "h1": hero_h1,
            "sub": hero_sub,
            "photo_url": hero_photo,
            "caption": hero_caption,
        },
    }

    # Suppress unused-arg warning while keeping signature ready for
    # future per-owner data (e.g. owner-specific branding overrides).
    _ = owner

    return {
        "site": site_dict,
        "services": services,
        "services_last_updated": raw.get("services_last_updated") or "",
        "process": process,
        "gallery": raw.get("gallery") or [],
        "reviews_curated": reviews_curated,
        "about": about_payload,
        "faq": faq,
        # Preserve unknown raw keys so legacy fields not yet handled
        # (e.g. site_color) still reach the template namespace.
        **{k: v for k, v in raw.items() if not k.startswith("_") and k not in _CONSUMED_RAW_KEYS},
    }


# Keys that `_adapt_to_v21_shape` consumes explicitly — exclude from
# pass-through merge to avoid colliding with the structured `site.*`
# namespace.
_CONSUMED_RAW_KEYS: frozenset[str] = frozenset(
    {
        "site_title",
        "site_description",
        "site_category",
        "site_city",
        "site_phone",
        "site_hero_photo",
        "site_rating",
        "average_rating",
        "total_reviews_count",
        "review_source_name",
        "years_experience",
        "clients_served",
        "social_badges",
        "telegram_username",
        "whatsapp_phone",
        "hero_h1",
        "hero_sub",
        "hero_caption",
        "services",
        "services_last_updated",
        "process",
        "gallery",
        "reviews",
        "reviews_curated",
        "about_photo_url",
        "about_bio",
        "about_creds",
        "about_guarantees",
        "faq",
        "organization",
    }
)


def _to_e164(phone: object) -> str:
    """Best-effort E.164 normalization. RU mobile numbers fall under
    +7. Empty or invalid → empty string (template skips tel: link).
    """
    if not isinstance(phone, str) or not phone:
        return ""
    digits = "".join(c for c in phone if c.isdigit())
    if not digits:
        return ""
    if digits.startswith("8") and len(digits) == 11:
        digits = "7" + digits[1:]
    if not digits.startswith("7") and len(digits) == 10:
        digits = "7" + digits
    return "+" + digits


def _owner_contact(owner: User) -> UserContact:
    primary = ChannelType(owner.contact_type)
    alt_type: ChannelType | None = None
    if owner.contact_value_alt:
        # alt_value is a free-form string in MVP; we don't track its
        # type in users.* yet. Treat it as email — channels filter
        # availability anyway, so a phone-shaped alt just gets skipped.
        alt_type = ChannelType.email
    return UserContact(
        primary_type=primary,
        primary_value=owner.contact_value,
        alt_type=alt_type,
        alt_value=owner.contact_value_alt,
    )


def _site_url(subdomain: str, base_domain: str) -> str:
    return f"https://{subdomain}.{base_domain}"


async def _persist_publish_outcome(
    *,
    session: AsyncSession,
    site: Site,
    result: PublishResult,
    admin_id: str,
    ip: str | None,
) -> None:
    site.status = "published"
    site.published_at = datetime.now(UTC)
    site.seo_submission_log = result.seo_log
    session.add(
        AdminAction(
            admin_id=UUID(admin_id),
            action="site_published",
            target_type="site",
            target_id=str(site.id),
            params=_audit_params(result),
            ip=ip,
        )
    )
    await session.commit()


def _audit_params(result: PublishResult) -> dict[str, Any]:
    return {
        "site_url": result.site_url,
        "uploaded_keys": result.uploaded_keys,
        "seo_succeeded": [e.value for e in result.seo_report.succeeded_engines],
        "notification_delivered": result.notification_delivered,
    }


def _redirect_with_flash(site_id: UUID, flash: str) -> RedirectResponse:
    return RedirectResponse(
        url=f"/admin/sites/{site_id}?flash={flash}",
        status_code=303,
    )


def _snapshot_from_json(payload: dict[str, Any]) -> SourceSnapshot:
    """Rehydrate a SourceSnapshot from the JSONB column.

    Inverse of ``snapshot_to_json``. Tolerant of partial / older
    payloads: missing fields fall back to defaults so old snapshots
    don't break the generation flow when the dataclass evolves.
    """
    source_type_raw = payload.get("source_type", "ymaps")
    try:
        source_type = SourceType(source_type_raw)
    except ValueError:
        source_type = SourceType.ymaps

    return SourceSnapshot(
        source_type=source_type,
        source_ref=str(payload.get("source_ref", "")),
        title=payload.get("title"),
        description=payload.get("description"),
        contacts=[
            ContactRef(kind=str(c.get("kind", "")), value=str(c.get("value", "")))
            for c in payload.get("contacts", [])
            if isinstance(c, dict)
        ],
        photos=[
            PhotoRef(
                url=p.get("url"),
                upload_key=p.get("upload_key"),
                alt=p.get("alt"),
                photo_type=p.get("photo_type", "work"),
            )
            for p in payload.get("photos", [])
            if isinstance(p, dict)
        ],
        reviews=[
            ReviewRef(
                author=r.get("author"),
                text=str(r.get("text", "")),
                rating=r.get("rating") if isinstance(r.get("rating"), int) else None,
            )
            for r in payload.get("reviews", [])
            if isinstance(r, dict)
        ],
        services=[
            ServiceItem(
                title=str(s.get("title", "")),
                description=s.get("description"),
                price_label=s.get("price_label"),
            )
            for s in payload.get("services", [])
            if isinstance(s, dict)
        ],
        metadata=payload.get("metadata") or {},
    )
