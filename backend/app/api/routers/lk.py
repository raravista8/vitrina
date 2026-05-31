"""Client ЛК (owner cabinet) read API — ``/api/lk/*`` (PR-LK1).

Every route is gated by ``require_customer_session`` and **scoped to the owner's
``site_id`` server-side** — a master can never read another site's leads.

PR-LK1 surface (read-only):
- ``GET /api/lk/site``           — site name/domain/status + per-site lead schema
- ``GET /api/lk/leads``          — own leads (decrypted), filters + status counts
- ``GET /api/lk/leads/{id}``     — one lead (decrypted) + photo URLs
- ``GET /api/lk/leads/{id}/photo/{idx}`` — decrypted JPEG, owner-only

Status writes, notes, change-requests, settings, billing, delete land in
PR-LK2…LK4. PII is decrypted only here, only for the authenticated owner.
"""

from __future__ import annotations

import csv
import io
import re
import zipfile
from datetime import UTC, date, datetime, timedelta
from typing import Annotated, Any
from uuid import UUID

from cryptography.fernet import MultiFernet
from fastapi import APIRouter, Depends, HTTPException, Query, Request, Response
from fastapi.responses import JSONResponse
from pydantic import BaseModel, ConfigDict, Field
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies import (
    CustomerContext,
    get_lead_fernet,
    get_notification_dispatcher,
    get_session,
    require_customer_session,
)
from app.config import get_settings
from app.core.auth.admin import hash_password, verify_password
from app.core.keywords import (
    GROUP_KEYS,
    apply_keywords_to_html,
    empty_groups,
    generate_minus_words,
    parse_keywords_from_html,
    sanitize_groups,
    source_rev,
)
from app.core.leads.encryption import LeadDecryptionError, decrypt, encrypt
from app.core.notify.dispatcher import NotificationDispatcher
from app.core.notify.ports import NotificationKind, NotificationMessage
from app.infrastructure.postgres.models import (
    LK_LEAD_STATUSES,
    ChangeRequest,
    Lead,
    LeadPhoto,
    Site,
    User,
)
from app.utils.logging import get_logger

# Settings-form validation (mirrors the client; mandatory server-side)
_PHONE_RE = re.compile(r"^\+?[0-9()\s-]{10,18}$")
_EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
_TG_RE = re.compile(r"^@?[a-z0-9_]{4,32}$")


def _norm_phone(phone: str) -> str:
    digits = re.sub(r"\D", "", phone)
    if len(digits) == 11 and digits[0] in "78":
        return "+7" + digits[1:]
    if len(digits) == 10:
        return "+7" + digits
    return "+" + digits


router = APIRouter(prefix="/api/lk", tags=["lk"])

# Fallback when a site has no explicit lead_schema in settings (e.g. milreview):
# no lead fields → the ЛК shows the "no leads" state for that site.
_NO_LEADS_SCHEMA: list[dict[str, Any]] = []

# Grace window between an owner's delete request and the cron hard-purge (LK4).
# During it the site stops serving (410) but the owner can still pull an archive.
_PURGE_GRACE_DAYS = 10

# (host_attr, files_attr) on app.state for each app-server-rendered static site,
# so the archive can bundle the live HTML and delete can stop it serving. Mirror
# of static_sites._SITES (kept tiny + local to avoid a cross-router import).
_STATIC_SITE_STATE: tuple[tuple[str, str], ...] = (
    ("milreview_host", "milreview_files"),
    ("elektrik_host", "elektrik_files"),
)


def _dec(value: bytes | None, fernet: MultiFernet) -> str | None:
    if value is None:
        return None
    try:
        return decrypt(bytes(value), fernet=fernet)
    except LeadDecryptionError:
        return "[не удалось расшифровать]"


def _display_status(raw: str) -> str:
    """Map any legacy operator status onto the 4-state owner workflow."""
    if raw in LK_LEAD_STATUSES:
        return raw
    return {"seen": "in_progress", "contacted": "in_progress"}.get(raw, "declined")


@router.get("/site")
async def get_site(
    ctx: Annotated[CustomerContext, Depends(require_customer_session)],
    session: Annotated[AsyncSession, Depends(get_session)],
) -> dict[str, Any]:
    site = (await session.execute(select(Site).where(Site.id == ctx.site_id))).scalar_one()
    settings: dict[str, Any] = site.settings or {}
    return {
        "ok": True,
        "data": {
            "site_id": str(site.id),
            "name": settings.get("display_name") or site.subdomain,
            "subdomain": site.subdomain,
            "domain": site.custom_domain or f"{site.subdomain}.samosite.online",
            "status": site.status,
            "published_at": site.published_at.isoformat() if site.published_at else None,
            # per-site lead field structure — the ЛК renders cards/columns from this
            "lead_schema": settings.get("lead_schema", _NO_LEADS_SCHEMA),
        },
    }


def _lead_to_dict(lead: Lead, fernet: MultiFernet, photo_count: int) -> dict[str, Any]:
    return {
        "id": str(lead.id),
        "name": _dec(lead.name_enc, fernet),
        "phone": _dec(lead.phone_enc, fernet),
        "object_type": lead.object_type,
        "service": lead.service,
        "address": _dec(lead.address_enc, fernet),
        "call_time": lead.call_time,
        "comment": _dec(lead.message_enc, fernet),
        "note": _dec(lead.note_enc, fernet),
        "status": _display_status(lead.status),
        "created_at": lead.created_at.isoformat(),
        "photo_count": photo_count,
    }


@router.get("/leads")
async def list_leads(
    ctx: Annotated[CustomerContext, Depends(require_customer_session)],
    session: Annotated[AsyncSession, Depends(get_session)],
    fernet: Annotated[MultiFernet, Depends(get_lead_fernet)],
    status: Annotated[str, Query()] = "all",
    q: Annotated[str, Query()] = "",
    date_from: Annotated[date | None, Query(alias="from")] = None,
    date_to: Annotated[date | None, Query(alias="to")] = None,
) -> dict[str, Any]:
    rows = (
        (
            await session.execute(
                select(Lead).where(Lead.site_id == ctx.site_id).order_by(Lead.created_at.desc())
            )
        )
        .scalars()
        .all()
    )
    # photo counts for this site's leads, in one query
    counts: dict[UUID, int] = {}
    if rows:
        counts = {
            lid: int(n)
            for lid, n in (
                await session.execute(
                    select(LeadPhoto.lead_id, func.count(LeadPhoto.id))
                    .where(LeadPhoto.lead_id.in_([r.id for r in rows]))
                    .group_by(LeadPhoto.lead_id)
                )
            ).all()
        }

    items = [_lead_to_dict(r, fernet, int(counts.get(r.id, 0))) for r in rows]

    # status counts over the full set (for the filter chips + "N new" badge)
    status_counts: dict[str, int] = {s: 0 for s in LK_LEAD_STATUSES}
    for it in items:
        status_counts[it["status"]] = status_counts.get(it["status"], 0) + 1

    # apply filters (in-memory — PII is decrypted, set is small per site)
    def _keep(it: dict[str, Any]) -> bool:
        if status != "all" and it["status"] != status:
            return False
        if date_from and it["created_at"][:10] < date_from.isoformat():
            return False
        if date_to and it["created_at"][:10] > date_to.isoformat():
            return False
        if q:
            hay = " ".join(str(it.get(k) or "") for k in ("name", "phone", "service")).lower()
            if q.lower() not in hay:
                return False
        return True

    filtered = [it for it in items if _keep(it)]
    return {
        "ok": True,
        "data": {
            "items": filtered,
            "total": len(items),
            "new_count": status_counts.get("new", 0),
            "status_counts": status_counts,
        },
    }


@router.get("/leads/{lead_id}")
async def get_lead(
    lead_id: UUID,
    ctx: Annotated[CustomerContext, Depends(require_customer_session)],
    session: Annotated[AsyncSession, Depends(get_session)],
    fernet: Annotated[MultiFernet, Depends(get_lead_fernet)],
) -> dict[str, Any]:
    lead = (
        await session.execute(select(Lead).where(Lead.id == lead_id, Lead.site_id == ctx.site_id))
    ).scalar_one_or_none()
    if lead is None:
        raise HTTPException(status_code=404, detail="lead_not_found")
    photo_idxs = (
        (
            await session.execute(
                select(LeadPhoto.index)
                .where(LeadPhoto.lead_id == lead.id)
                .order_by(LeadPhoto.index)
            )
        )
        .scalars()
        .all()
    )
    data = _lead_to_dict(lead, fernet, len(photo_idxs))
    data["photos"] = [f"/api/lk/leads/{lead.id}/photo/{i}" for i in photo_idxs]
    return {"ok": True, "data": data}


@router.get("/leads/{lead_id}/photo/{idx}")
async def get_lead_photo(
    lead_id: UUID,
    idx: int,
    ctx: Annotated[CustomerContext, Depends(require_customer_session)],
    session: Annotated[AsyncSession, Depends(get_session)],
    fernet: Annotated[MultiFernet, Depends(get_lead_fernet)],
) -> Response:
    # join LeadPhoto → Lead to enforce the owner's site_id scope server-side
    photo = (
        await session.execute(
            select(LeadPhoto)
            .join(Lead, Lead.id == LeadPhoto.lead_id)
            .where(
                LeadPhoto.lead_id == lead_id,
                LeadPhoto.index == idx,
                Lead.site_id == ctx.site_id,
            )
        )
    ).scalar_one_or_none()
    if photo is None:
        raise HTTPException(status_code=404, detail="photo_not_found")
    try:
        raw = fernet.decrypt(bytes(photo.data_enc))
    except Exception as exc:
        raise HTTPException(status_code=404, detail="photo_unavailable") from exc
    return Response(
        content=raw,
        media_type=photo.mime,
        headers={"Cache-Control": "private, max-age=300"},
    )


# ── lead writes (status / note) ───────────────────────────────────────────────


class _StatusBody(BaseModel):
    model_config = ConfigDict(extra="forbid")
    status: str


class _NoteBody(BaseModel):
    model_config = ConfigDict(extra="forbid")
    note: Annotated[str, Field(max_length=4000)] = ""


async def _owned_lead(session: AsyncSession, lead_id: UUID, site_id: UUID) -> Lead:
    lead = (
        await session.execute(select(Lead).where(Lead.id == lead_id, Lead.site_id == site_id))
    ).scalar_one_or_none()
    if lead is None:
        raise HTTPException(status_code=404, detail="lead_not_found")
    return lead


@router.post("/leads/{lead_id}/status")
async def set_lead_status(
    lead_id: UUID,
    body: _StatusBody,
    ctx: Annotated[CustomerContext, Depends(require_customer_session)],
    session: Annotated[AsyncSession, Depends(get_session)],
) -> dict[str, Any]:
    if body.status not in LK_LEAD_STATUSES:
        raise HTTPException(status_code=400, detail="invalid_status")
    lead = await _owned_lead(session, lead_id, ctx.site_id)
    lead.status = body.status
    await session.commit()
    return {"ok": True, "data": {"id": str(lead.id), "status": lead.status}}


@router.post("/leads/{lead_id}/note")
async def set_lead_note(
    lead_id: UUID,
    body: _NoteBody,
    ctx: Annotated[CustomerContext, Depends(require_customer_session)],
    session: Annotated[AsyncSession, Depends(get_session)],
    fernet: Annotated[MultiFernet, Depends(get_lead_fernet)],
) -> dict[str, Any]:
    lead = await _owned_lead(session, lead_id, ctx.site_id)
    note = body.note.strip()
    lead.note_enc = encrypt(note, fernet=fernet) if note else None
    await session.commit()
    return {"ok": True, "data": {"id": str(lead.id)}}


# ── change requests (→ founder inbox) ─────────────────────────────────────────


class _ChangeRequestBody(BaseModel):
    model_config = ConfigDict(extra="forbid")
    text: Annotated[str, Field(min_length=5, max_length=4000)]


@router.post("/change-requests", status_code=201)
async def create_change_request(
    body: _ChangeRequestBody,
    ctx: Annotated[CustomerContext, Depends(require_customer_session)],
    session: Annotated[AsyncSession, Depends(get_session)],
    notifier: Annotated[NotificationDispatcher, Depends(get_notification_dispatcher)],
) -> dict[str, Any]:
    cr = ChangeRequest(site_id=ctx.site_id, text=body.text.strip(), status="new")
    session.add(cr)
    await session.flush()
    await session.commit()

    # best-effort founder alert (delivery inert on this prod — TG/SMTP gap)
    try:
        await notifier.notify_founder(
            kind=NotificationKind.application_received,
            message=NotificationMessage(
                title="✏️ Запрос правок из ЛК",
                body=f"Сайт: {ctx.login}\n\n{body.text.strip()[:500]}\n\nID: {cr.id}",
            ),
        )
    except Exception as exc:
        get_logger("api.lk.change_request").warning("cr_notify_failed", error=str(exc))

    return {"ok": True, "data": {"id": str(cr.id), "status": cr.status}}


@router.get("/change-requests")
async def list_change_requests(
    ctx: Annotated[CustomerContext, Depends(require_customer_session)],
    session: Annotated[AsyncSession, Depends(get_session)],
) -> dict[str, Any]:
    rows = (
        (
            await session.execute(
                select(ChangeRequest)
                .where(ChangeRequest.site_id == ctx.site_id)
                .order_by(ChangeRequest.created_at.desc())
            )
        )
        .scalars()
        .all()
    )
    return {
        "ok": True,
        "data": {
            "items": [
                {
                    "id": str(r.id),
                    "text": r.text,
                    "status": r.status,
                    "created_at": r.created_at.isoformat(),
                }
                for r in rows
            ]
        },
    }


# ── settings (contacts / notifications / password) ────────────────────────────

_DEFAULT_NOTIFICATIONS = {"tg": True, "email": True}


@router.get("/settings")
async def get_settings_view(
    ctx: Annotated[CustomerContext, Depends(require_customer_session)],
    session: Annotated[AsyncSession, Depends(get_session)],
) -> dict[str, Any]:
    site = (await session.execute(select(Site).where(Site.id == ctx.site_id))).scalar_one()
    s: dict[str, Any] = site.settings or {}
    contacts: dict[str, Any] = s.get("contacts", {})
    return {
        "ok": True,
        "data": {
            "site": {
                "name": s.get("display_name") or site.subdomain,
                "domain": site.custom_domain or f"{site.subdomain}.samosite.online",
                "status": site.status,
                "published_at": site.published_at.isoformat() if site.published_at else None,
            },
            "contacts": {
                "person": contacts.get("person", ""),
                "phone": contacts.get("phone", ""),
                "email": contacts.get("email", ""),
                "telegram": contacts.get("telegram", ""),
                "zone": contacts.get("zone", ""),
            },
            "notifications": s.get("notifications", _DEFAULT_NOTIFICATIONS),
        },
    }


class _ContactsBody(BaseModel):
    model_config = ConfigDict(extra="forbid")
    person: Annotated[str, Field(max_length=120)] = ""
    phone: Annotated[str, Field(max_length=32)] = ""
    email: Annotated[str, Field(max_length=200)] = ""
    telegram: Annotated[str, Field(max_length=40)] = ""
    zone: Annotated[str, Field(max_length=200)] = ""


@router.post("/settings/contacts")
async def post_contacts(
    body: _ContactsBody,
    ctx: Annotated[CustomerContext, Depends(require_customer_session)],
    session: Annotated[AsyncSession, Depends(get_session)],
) -> JSONResponse:
    fields: list[str] = []
    if not body.person.strip():
        fields.append("person")
    if not _PHONE_RE.match(body.phone.strip()):
        fields.append("phone")
    if not _EMAIL_RE.match(body.email.strip()):
        fields.append("email")
    if body.telegram.strip() and not _TG_RE.match(body.telegram.strip()):
        fields.append("telegram")
    if not body.zone.strip():
        fields.append("zone")
    if fields:
        # Direct JSONResponse (not HTTPException) so the per-field list survives
        # the global error handler, which collapses HTTPException → {ok,error}.
        # Mirrors the elektrik lead endpoint's _err shape for UI consistency.
        return JSONResponse(
            status_code=400,
            content={"ok": False, "error": "validation", "fields": fields},
        )

    tg = body.telegram.strip()
    contacts = {
        "person": body.person.strip(),
        "phone": _norm_phone(body.phone),
        "email": body.email.strip(),
        "telegram": ("@" + tg.lstrip("@")) if tg else "",
        "zone": body.zone.strip(),
    }
    site = (await session.execute(select(Site).where(Site.id == ctx.site_id))).scalar_one()
    site.settings = {**(site.settings or {}), "contacts": contacts}
    await session.commit()
    # NB: the elektrik site re-renders contacts from this on api startup; a live
    # re-render hook lands when the customer-site SSR pipeline is wired.
    return JSONResponse(content={"ok": True, "data": {"contacts": contacts}})


class _NotificationsBody(BaseModel):
    model_config = ConfigDict(extra="forbid")
    tg: bool = True
    email: bool = True


@router.post("/settings/notifications")
async def post_notifications(
    body: _NotificationsBody,
    ctx: Annotated[CustomerContext, Depends(require_customer_session)],
    session: Annotated[AsyncSession, Depends(get_session)],
) -> dict[str, Any]:
    site = (await session.execute(select(Site).where(Site.id == ctx.site_id))).scalar_one()
    notifications = {"tg": body.tg, "email": body.email}
    site.settings = {**(site.settings or {}), "notifications": notifications}
    await session.commit()
    return {"ok": True, "data": {"notifications": notifications}}


class _PasswordBody(BaseModel):
    model_config = ConfigDict(extra="forbid")
    current: str = Field(min_length=1, max_length=256)
    next: Annotated[str, Field(min_length=8, max_length=256)]


@router.post("/password")
async def post_password(
    body: _PasswordBody,
    request: Request,
    ctx: Annotated[CustomerContext, Depends(require_customer_session)],
    session: Annotated[AsyncSession, Depends(get_session)],
) -> dict[str, Any]:
    # light per-user rate-limit (best-effort; auth already required)
    redis = getattr(request.app.state, "redis", None)
    if redis is not None:
        key = f"lk_pwd_change:{ctx.user_id}"
        n = await redis.incr(key)
        if n == 1:
            await redis.expire(key, 3600)
        if n > 5:
            raise HTTPException(status_code=429, detail="too_many_attempts")

    user = (await session.execute(select(User).where(User.id == ctx.user_id))).scalar_one()
    if not user.password_hash or not verify_password(body.current, user.password_hash):
        raise HTTPException(status_code=400, detail="invalid_current_password")
    user.password_hash = hash_password(body.next)
    await session.commit()
    # NB: other sessions stay valid until TTL — CustomerSessionStore is keyed by
    # session_id, not user_id, so per-user revocation isn't available yet.
    return {"ok": True}


# ── billing — free-period stub ────────────────────────────────────────────────


@router.get("/billing")
async def get_billing(
    _ctx: Annotated[CustomerContext, Depends(require_customer_session)],
) -> dict[str, Any]:
    """Launch state: free period. Paid mode (method/nextDate/history) turns on
    when ЮKassa billing is wired — the UI already renders both from this shape."""
    return {
        "ok": True,
        "data": {
            "free": True,
            "planName": "Личный",
            "price": "690 ₽",
            "period": "мес",
            "status": "free",
            "nextDate": None,
            "nextAmount": None,
            "method": None,
            "history": [],
        },
    }


# ── site deletion (soft-delete + archive) ─────────────────────────────────────


def _site_host(site: Site) -> str:
    return site.custom_domain or f"{site.subdomain}.{get_settings().sites_base_domain}"


_ARCHIVE_CSV_FIELDS = (
    ("created_at", "Дата"),
    ("status", "Статус"),
    ("name", "Имя"),
    ("phone", "Телефон"),
    ("object_type", "Тип объекта"),
    ("service", "Услуга"),
    ("address", "Адрес"),
    ("call_time", "Удобное время"),
    ("comment", "Комментарий"),
    ("note", "Заметка"),
    ("photo_count", "Фото"),
)
_MIME_EXT = {"image/jpeg": "jpg", "image/png": "png", "image/webp": "webp"}


@router.get("/site/archive")
async def get_site_archive(
    request: Request,
    ctx: Annotated[CustomerContext, Depends(require_customer_session)],
    session: Annotated[AsyncSession, Depends(get_session)],
    fernet: Annotated[MultiFernet, Depends(get_lead_fernet)],
) -> Response:
    """Owner's data export (FZ-152 portability): a ZIP with leads.csv (decrypted),
    every lead photo, and the live rendered site HTML. Scoped to the own site."""
    site = (await session.execute(select(Site).where(Site.id == ctx.site_id))).scalar_one()

    leads = (
        (
            await session.execute(
                select(Lead).where(Lead.site_id == ctx.site_id).order_by(Lead.created_at.asc())
            )
        )
        .scalars()
        .all()
    )
    photos = (
        (
            await session.execute(
                select(LeadPhoto)
                .where(LeadPhoto.lead_id.in_([lead.id for lead in leads]))
                .order_by(LeadPhoto.lead_id, LeadPhoto.index)
            )
        )
        .scalars()
        .all()
        if leads
        else []
    )
    photo_counts: dict[UUID, int] = {}
    for ph in photos:
        photo_counts[ph.lead_id] = photo_counts.get(ph.lead_id, 0) + 1

    buf = io.BytesIO()
    with zipfile.ZipFile(buf, "w", zipfile.ZIP_DEFLATED) as zf:
        # leads.csv (decrypted) — utf-8-sig so Excel opens Cyrillic cleanly
        csv_buf = io.StringIO()
        writer = csv.writer(csv_buf)
        writer.writerow([label for _key, label in _ARCHIVE_CSV_FIELDS])
        for lead in leads:
            row = _lead_to_dict(lead, fernet, int(photo_counts.get(lead.id, 0)))
            writer.writerow(
                [row.get(key) if row.get(key) is not None else "" for key, _ in _ARCHIVE_CSV_FIELDS]
            )
        zf.writestr("leads.csv", csv_buf.getvalue().encode("utf-8-sig"))

        # lead photos (decrypted bytes — MultiFernet.decrypt returns bytes)
        for ph in photos:
            try:
                raw = fernet.decrypt(bytes(ph.data_enc))
            except Exception as exc:  # skip an unreadable photo, keep the rest of the archive
                get_logger("api.lk.archive").warning(
                    "archive_photo_skipped", lead_id=str(ph.lead_id), error=str(exc)
                )
                continue
            ext = _MIME_EXT.get(ph.mime or "", "bin")
            zf.writestr(f"photos/{str(ph.lead_id)[:8]}_{ph.index}.{ext}", raw)

        # live rendered site HTML/assets, if this site is one of the static sites
        host = _site_host(site)
        state = request.app.state
        for host_attr, files_attr in _STATIC_SITE_STATE:
            if getattr(state, host_attr, None) != host:
                continue
            files: dict[str, tuple[str | bytes, str]] = getattr(state, files_attr, {}) or {}
            for path, (content, _ctype) in files.items():
                data = content.encode("utf-8") if isinstance(content, str) else content
                zf.writestr(f"site/{path}", data)
            break

    buf.seek(0)
    fname = f"samosite-archive-{site.subdomain}.zip"
    return Response(
        content=buf.getvalue(),
        media_type="application/zip",
        headers={
            "Content-Disposition": f'attachment; filename="{fname}"',
            "Cache-Control": "no-store",
        },
    )


class _DeleteBody(BaseModel):
    model_config = ConfigDict(extra="forbid")
    # must equal the site's subdomain — a typed confirmation guards against an
    # accidental delete of a live client site.
    confirm: Annotated[str, Field(max_length=63)]


@router.delete("/site")
async def delete_site(
    body: _DeleteBody,
    request: Request,
    ctx: Annotated[CustomerContext, Depends(require_customer_session)],
    session: Annotated[AsyncSession, Depends(get_session)],
    notifier: Annotated[NotificationDispatcher, Depends(get_notification_dispatcher)],
) -> dict[str, Any]:
    """Soft-delete the owner's own site: status → pending_purge, deleted_at = now.
    The site stops serving immediately (410); a cron hard-purges it (cascading
    leads/photos/change-requests) after the grace window. Idempotent."""
    site = (await session.execute(select(Site).where(Site.id == ctx.site_id))).scalar_one()
    if body.confirm.strip() != site.subdomain:
        raise HTTPException(status_code=400, detail="confirm_mismatch")

    if site.status != "pending_purge":
        site.status = "pending_purge"
        site.deleted_at = datetime.now(UTC)
        await session.commit()
        get_logger("api.lk.delete").info(
            "site_delete_requested", site_id=str(site.id), subdomain=site.subdomain
        )
        # best-effort founder alert — a client wants out; founder can intervene
        # within the grace window before the cron purges.
        try:
            await notifier.notify_founder(
                kind=NotificationKind.application_received,
                message=NotificationMessage(
                    title="🗑 Запрос на удаление сайта из ЛК",
                    body=(
                        f"Сайт: {site.subdomain}\n"
                        f"Удаление через {_PURGE_GRACE_DAYS} дн. (можно отменить вручную)\n"
                        f"ID: {site.id}"
                    ),
                ),
            )
        except Exception as exc:
            get_logger("api.lk.delete").warning("delete_notify_failed", error=str(exc))

    # stop serving now: 410 via app.state.purged_hosts + drop rendered files
    host = _site_host(site)
    state = request.app.state
    purged: set[str] = getattr(state, "purged_hosts", None) or set()
    purged.add(host)
    state.purged_hosts = purged
    for host_attr, files_attr in _STATIC_SITE_STATE:
        if getattr(state, host_attr, None) == host:
            setattr(state, files_attr, {})
            break

    purge_after = (site.deleted_at or datetime.now(UTC)) + timedelta(days=_PURGE_GRACE_DAYS)
    return {
        "ok": True,
        "data": {"status": site.status, "purge_after": purge_after.isoformat()},
    }


# ── keywords (SEO) — spec 03_keywords.md ──────────────────────────────────────


def _host_index_html(state: Any, host: str) -> str | None:
    """The site's served ``index.html`` string, for first-time keyword parsing."""
    for host_attr, files_attr in _STATIC_SITE_STATE:
        if getattr(state, host_attr, None) == host:
            entry = (getattr(state, files_attr, {}) or {}).get("index.html")
            if entry is not None and isinstance(entry[0], str):
                return entry[0]
    return None


def _apply_keywords_to_host(state: Any, host: str, groups: dict[str, list[str]]) -> None:
    """Write the keyword set into the live served page's ``<meta keywords>``
    (in-process; startup re-applies from the DB so it survives restarts).
    Layout-neutral — only the meta tag changes."""
    for host_attr, files_attr in _STATIC_SITE_STATE:
        if getattr(state, host_attr, None) == host:
            files = getattr(state, files_attr, {}) or {}
            entry = files.get("index.html")
            if entry is not None and isinstance(entry[0], str):
                files["index.html"] = (apply_keywords_to_html(entry[0], groups), entry[1])
                setattr(state, files_attr, files)
            return


def _keywords_payload(rec: dict[str, Any]) -> dict[str, Any]:
    groups = rec.get("groups") or {}
    return {
        "groups": {k: list(groups.get(k, [])) for k in GROUP_KEYS},
        "updated_at": rec.get("updated_at"),
        "source_rev": rec.get("source_rev"),
    }


@router.get("/keywords")
async def get_keywords(
    request: Request,
    ctx: Annotated[CustomerContext, Depends(require_customer_session)],
    session: Annotated[AsyncSession, Depends(get_session)],
) -> dict[str, Any]:
    """4 content groups for the session's site. Primary fill: if nothing is
    stored yet, parse the site's live page (Title/H1 → main, H2 → h2, meta
    keywords → text, blog empty) so the client sees what's really on the site."""
    site = (await session.execute(select(Site).where(Site.id == ctx.site_id))).scalar_one()
    settings: dict[str, Any] = site.settings or {}
    rec = settings.get("keywords")
    if isinstance(rec, dict) and isinstance(rec.get("groups"), dict):
        return {"ok": True, "data": _keywords_payload(rec)}

    html = _host_index_html(request.app.state, _site_host(site))
    groups = parse_keywords_from_html(html) if html else empty_groups()
    new_rec = {
        "groups": groups,
        "updated_at": datetime.now(UTC).isoformat(),
        "source_rev": source_rev(groups),
    }
    site.settings = {**settings, "keywords": new_rec}
    await session.commit()
    return {"ok": True, "data": _keywords_payload(new_rec)}


class _KeywordsBody(BaseModel):
    model_config = ConfigDict(extra="forbid")
    groups: dict[str, list[str]]


@router.put("/keywords")
async def put_keywords(
    body: _KeywordsBody,
    request: Request,
    ctx: Annotated[CustomerContext, Depends(require_customer_session)],
    session: Annotated[AsyncSession, Depends(get_session)],
) -> dict[str, Any]:
    """Save the 4 groups and apply them to the live site (layout-neutral: the
    page's keywords meta). Server-side sanitize: trim/dedup/cap."""
    groups = sanitize_groups(dict(body.groups))
    rec = {
        "groups": groups,
        "updated_at": datetime.now(UTC).isoformat(),
        "source_rev": source_rev(groups),
    }
    site = (await session.execute(select(Site).where(Site.id == ctx.site_id))).scalar_one()
    site.settings = {**(site.settings or {}), "keywords": rec}
    await session.commit()
    # apply to the live served page in-process (startup re-applies from DB)
    _apply_keywords_to_host(request.app.state, _site_host(site), groups)
    return {"ok": True, "data": _keywords_payload(rec)}


@router.get("/keywords/minus")
async def get_minus_words(
    ctx: Annotated[CustomerContext, Depends(require_customer_session)],
    session: Annotated[AsyncSession, Depends(get_session)],
) -> dict[str, Any]:
    """Read-only minus-words for Yandex.Direct, generated per niche. NOT written
    to the site — the client copies them into the ad campaign."""
    site = (await session.execute(select(Site).where(Site.id == ctx.site_id))).scalar_one()
    niche = (site.settings or {}).get("niche")
    words = generate_minus_words(niche if isinstance(niche, str) else None)
    return {
        "ok": True,
        "data": {"words": words, "generated_at": datetime.now(UTC).isoformat()},
    }
