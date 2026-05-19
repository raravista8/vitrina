"""Admin lead views (T5.3).

Two endpoints:

  GET /admin/sites/{site_id}/leads   — masked list (no full PII)
  GET /admin/leads/{lead_id}         — single lead, DECRYPTED

Every call to the decrypted view writes an immutable ``admin_actions``
row tagged ``lead_decrypted`` (SECURITY.md §7). The founder can later
audit who looked at what — required for ФЗ-152 §A07 + accountability.

Decryption is wrapped in a try/except: a key-rotation failure or
corrupt ciphertext renders as ``[decryption_failed]`` instead of
crashing the admin UI. The audit row is still written either way.
"""

from __future__ import annotations

from typing import Annotated
from uuid import UUID

from cryptography.fernet import MultiFernet
from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import HTMLResponse
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.admin import admin_templates
from app.api.dependencies import (
    get_client_ip,
    get_lead_fernet,
    get_session,
    require_admin,
)
from app.core.auth.sessions import AdminSession
from app.core.leads.encryption import LeadDecryptionError, decrypt
from app.core.leads.pii_masking import (
    mask_message,
    mask_name,
    mask_phone,
)
from app.infrastructure.postgres.models import AdminAction, Lead, Site
from app.utils.logging import get_logger

router = APIRouter(prefix="/admin", tags=["admin"])
_log = get_logger("admin.leads")

DECRYPTION_PLACEHOLDER = "[decryption_failed]"


@router.get(
    "/sites/{site_id}/leads",
    response_class=HTMLResponse,
    include_in_schema=False,
)
async def admin_site_leads(
    site_id: UUID,
    request: Request,
    session: Annotated[AsyncSession, Depends(get_session)],
    _admin: Annotated[AdminSession, Depends(require_admin)],
) -> HTMLResponse:
    """Masked list — name/phone shown with the standard mask. NO
    decryption happens here, so no audit row is written. Click into a
    single lead to see the cleartext."""
    site = (await session.execute(select(Site).where(Site.id == site_id))).scalar_one_or_none()
    if site is None:
        raise HTTPException(status_code=404, detail="site_not_found")

    leads = (
        (
            await session.execute(
                select(Lead).where(Lead.site_id == site_id).order_by(Lead.created_at.desc())
            )
        )
        .scalars()
        .all()
    )

    return admin_templates.TemplateResponse(
        request,
        "lead_list.html",
        {"site": site, "leads": leads},
    )


@router.get(
    "/leads/{lead_id}",
    response_class=HTMLResponse,
    include_in_schema=False,
)
async def admin_lead_detail(
    lead_id: UUID,
    request: Request,
    session: Annotated[AsyncSession, Depends(get_session)],
    admin: Annotated[AdminSession, Depends(require_admin)],
    fernet: Annotated[MultiFernet, Depends(get_lead_fernet)],
) -> HTMLResponse:
    """Decrypted view. Writes an ``admin_actions`` audit row before
    rendering. A decryption failure (key rotation gap, corrupt
    ciphertext) renders the placeholder but STILL writes the audit
    row — the operator looked, even if the bytes wouldn't decode."""
    row = await _load_lead_with_site(session, lead_id)
    if row is None:
        raise HTTPException(status_code=404, detail="lead_not_found")
    lead, site = row

    name, name_ok = _try_decrypt(lead.name_enc, fernet=fernet)
    phone, phone_ok = _try_decrypt(lead.phone_enc, fernet=fernet)
    message, message_ok = (None, True)
    if lead.message_enc is not None:
        message, message_ok = _try_decrypt(lead.message_enc, fernet=fernet)

    session.add(
        AdminAction(
            admin_id=UUID(str(admin.admin_id)),
            action="lead_decrypted",
            target_type="lead",
            target_id=str(lead.id),
            params={
                "site_id": str(lead.site_id),
                "name_decryption_ok": name_ok,
                "phone_decryption_ok": phone_ok,
                "message_decryption_ok": message_ok,
            },
            ip=get_client_ip(request),
        )
    )
    await session.commit()

    _log.info(
        "lead_decrypted",
        lead_id=str(lead.id),
        site_id=str(lead.site_id),
        admin_id=str(admin.admin_id),
        all_ok=name_ok and phone_ok and message_ok,
    )

    return admin_templates.TemplateResponse(
        request,
        "lead_detail.html",
        {
            "lead": lead,
            "site": site,
            "decrypted": {
                "name": name,
                "phone": phone,
                "message": message,
            },
            "masked": {
                "name": mask_name(name),
                "phone": mask_phone(phone),
                "message": mask_message(message),
            },
        },
    )


# --- helpers --------------------------------------------------------------


async def _load_lead_with_site(session: AsyncSession, lead_id: UUID) -> tuple[Lead, Site] | None:
    row = (
        await session.execute(
            select(Lead, Site).join(Site, Site.id == Lead.site_id).where(Lead.id == lead_id)
        )
    ).one_or_none()
    if row is None:
        return None
    return row[0], row[1]


def _try_decrypt(ciphertext: bytes, *, fernet: MultiFernet) -> tuple[str, bool]:
    """Decrypt or return the placeholder + False flag."""
    try:
        return decrypt(ciphertext, fernet=fernet), True
    except LeadDecryptionError:
        _log.warning("lead_decryption_failed")
        return DECRYPTION_PLACEHOLDER, False
