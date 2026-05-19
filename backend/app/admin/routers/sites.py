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
    get_session,
    require_admin,
)
from app.config import get_settings
from app.core.auth.sessions import AdminSession
from app.core.notify.dispatcher import UserContact
from app.core.notify.ports import ChannelType
from app.core.publishing.service import (
    PublishContext,
    PublishResult,
    SitePublisher,
)
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
    """
    settings = get_settings()
    site_url = _site_url(site.subdomain, settings.sites_base_domain)

    content = dict(site.generated_content or {})
    content.setdefault("site_url", site_url)
    content.setdefault("site_locale", "ru_RU")
    content.setdefault("contact_url", "/api/leads")
    content.setdefault("year", datetime.now(UTC).year)
    content.setdefault("captcha_client_key", settings.yandex_smartcaptcha_server_key or "")

    return PublishContext(
        site_id=str(site.id),
        subdomain=site.subdomain,
        site_url=site_url,
        render_context=content,
        owner_contact=_owner_contact(owner),
    )


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
