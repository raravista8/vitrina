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

from datetime import date
from typing import Annotated, Any
from uuid import UUID

from cryptography.fernet import MultiFernet
from fastapi import APIRouter, Depends, HTTPException, Query, Response
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies import (
    CustomerContext,
    get_lead_fernet,
    get_session,
    require_customer_session,
)
from app.core.leads.encryption import LeadDecryptionError, decrypt
from app.infrastructure.postgres.models import LK_LEAD_STATUSES, Lead, LeadPhoto, Site

router = APIRouter(prefix="/api/lk", tags=["lk"])

# Fallback when a site has no explicit lead_schema in settings (e.g. milreview):
# no lead fields → the ЛК shows the "no leads" state for that site.
_NO_LEADS_SCHEMA: list[dict[str, Any]] = []


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
