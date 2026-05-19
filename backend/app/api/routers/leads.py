"""``POST /api/leads`` — customer-site lead intake (T5.2, FR-050).

Cross-site CORS surface: any ``<subdomain>.vitrina.site`` page posts
here. Caddy strips CORS at the edge (same origin via wildcard cert);
no `Origin` checks in the handler.

Flow:

  1. Validate body (pydantic, ``extra=forbid``).
  2. Honeypot — if the hidden field is filled, silently 202 so bots
     don't learn the trap exists. NO DB write.
  3. Rate-limit by IP: 3/h + 10/day (FR-052).
  4. Verify SmartCaptcha. 400 if invalid.
  5. Encrypt + insert via ``submit_lead`` (Fernet, T5.2 service).
  6. 202 with ``{lead_id}``.

The router never decrypts. The admin lead view (T5.3) is the only
place that calls ``decrypt()`` — and only after an audit-log row is
written.
"""

from __future__ import annotations

from typing import Annotated
from uuid import UUID

from cryptography.fernet import MultiFernet
from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies import (
    get_captcha_verifier,
    get_client_ip,
    get_lead_fernet,
    get_notification_dispatcher,
    get_session,
    leads_daily_rate_limiter,
    leads_hourly_rate_limiter,
)
from app.api.schemas.leads import (
    SubmitLeadData,
    SubmitLeadRequest,
    SubmitLeadResponse,
)
from app.core.captcha.verifier import CaptchaVerifier
from app.core.leads.pii_masking import mask_message, mask_name, mask_phone
from app.core.leads.ports import LeadDraft
from app.core.notify.dispatcher import NotificationDispatcher, UserContact
from app.core.notify.ports import ChannelType, NotificationKind, NotificationMessage
from app.infrastructure.leads.service import submit_lead
from app.infrastructure.postgres.models import Site, User
from app.utils.logging import get_logger

router = APIRouter(prefix="/api", tags=["leads"])


@router.post(
    "/leads",
    response_model=SubmitLeadResponse,
    status_code=202,
)
async def post_lead(
    body: SubmitLeadRequest,
    request: Request,
    session: Annotated[AsyncSession, Depends(get_session)],
    captcha: Annotated[CaptchaVerifier, Depends(get_captcha_verifier)],
    fernet: Annotated[MultiFernet, Depends(get_lead_fernet)],
    notifier: Annotated[NotificationDispatcher, Depends(get_notification_dispatcher)],
    _hourly: Annotated[None, Depends(leads_hourly_rate_limiter)],
    _daily: Annotated[None, Depends(leads_daily_rate_limiter)],
) -> SubmitLeadResponse:
    log = get_logger("api.leads")
    ip = get_client_ip(request)

    # Honeypot — silently 202 to keep the bot guessing.
    if body.honeypot:
        log.info(
            "lead_honeypot_triggered",
            site_id=str(body.site_id),
            ip_prefix=_ip_prefix(ip),
        )
        # We don't reach the DB, but the response must look like a
        # success. ``lead_id`` is a synthetic zero-UUID so the client
        # can't infer the trap from the response shape.
        return SubmitLeadResponse(
            data=SubmitLeadData(
                lead_id=body.site_id,  # echo back; not a real lead row
            )
        )

    captcha_result = await captcha.verify(body.captcha_token, ip=ip)
    if not captcha_result.is_valid:
        log.info("lead_captcha_rejected", reason=captcha_result.reason)
        raise HTTPException(status_code=400, detail="invalid_captcha")

    draft = LeadDraft(
        site_id=body.site_id,
        name=body.name,
        phone=body.phone,
        message=body.message,
        ip=ip,
        user_agent=request.headers.get("user-agent"),
    )
    result = await submit_lead(session=session, draft=draft, fernet=fernet)

    if result.status == "site_not_found":
        raise HTTPException(status_code=404, detail="site_not_found")
    if result.status == "site_not_published":
        raise HTTPException(status_code=400, detail="site_not_published")

    assert result.lead_id is not None  # narrowed by status check
    log.info(
        "lead_persisted",
        lead_id=str(result.lead_id),
        site_id=str(body.site_id),
        ip_prefix=_ip_prefix(ip),
    )

    # T5.4: notify the site owner with masked PII preview. The cleartext
    # ``draft`` is still in scope; the dispatcher never sees the
    # ciphertext. Failure to deliver is logged but doesn't fail the
    # request — the lead is already persisted, the owner can find it in
    # the admin even if the TG channel is down.
    await _notify_site_owner(
        session=session,
        notifier=notifier,
        site_id=body.site_id,
        lead_id=result.lead_id,
        draft=draft,
    )

    return SubmitLeadResponse(data=SubmitLeadData(lead_id=result.lead_id))


async def _notify_site_owner(
    *,
    session: AsyncSession,
    notifier: NotificationDispatcher,
    site_id: UUID,
    lead_id: UUID,
    draft: LeadDraft,
) -> None:
    """Send the site owner a masked-PII summary of the lead. Looks up
    the User via the Site row; if anything's missing, logs a warning
    and returns — the persisted lead is the source of truth."""
    log = get_logger("api.leads.notify")
    row = (
        await session.execute(
            select(User.id, User.contact_type, User.contact_value)
            .join(Site, Site.user_id == User.id)
            .where(Site.id == site_id)
        )
    ).one_or_none()
    if row is None:
        log.warning("lead_notify_owner_missing", site_id=str(site_id))
        return

    try:
        channel = ChannelType(row.contact_type)
    except ValueError:
        log.warning(
            "lead_notify_bad_channel",
            site_id=str(site_id),
            contact_type=row.contact_type,
        )
        return

    title = "📨 Новая заявка на сайте"
    body_lines = [
        f"Имя: {mask_name(draft.name)}",
        f"Телефон: {mask_phone(draft.phone)}",
    ]
    if draft.message:
        body_lines.append(f"Сообщение: {mask_message(draft.message)}")
    body_lines.append(f"\nLead ID: {lead_id}")
    body_lines.append("Открыть в кабинете: /admin/leads/" + str(lead_id))

    delivery = await notifier.notify_user(
        contact=UserContact(primary_type=channel, primary_value=row.contact_value),
        kind=NotificationKind.lead_received,
        message=NotificationMessage(title=title, body="\n".join(body_lines)),
    )
    log.info(
        "lead_owner_notified",
        site_id=str(site_id),
        delivered=delivery.delivered,
        channel=delivery.channel.value,
        reason=delivery.reason,
    )


def _ip_prefix(ip: str | None) -> str:
    """PII masking per SECURITY.md §7 — keep the /16."""
    if not ip:
        return ""
    parts = ip.split(".")
    if len(parts) != 4:
        return "***"
    return f"{parts[0]}.{parts[1]}.0.0/16"
