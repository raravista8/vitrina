"""``POST /api/leads/elektrik`` — extended customer-site lead intake.

The electrician landing (elektrik-spb.samosite.online) posts a multipart form
with richer fields than the base ``/api/leads`` (object_type / service /
address / call_time / comment) + up to 5 photos. Flow mirrors the base intake:

  1. Honeypot ``hp_company`` filled → silent 202 (no DB), bot stays fooled.
  2. Captcha **best-effort**: verified if a SmartCaptcha server key is
     configured; if it isn't (current prod), we proceed — honeypot + rate-limit
     still guard. A *configured* captcha that rejects → 400.
  3. Rate-limit by IP (3/h + 10/day, shared with base leads).
  4. Validate name / phone / consent; collect field errors → 400 {fields}.
  5. Photos validated by decode (Pillow = magic check), EXIF-stripped and
     re-encoded to JPEG at the API boundary.
  6. ``submit_elektrik_lead`` Fernet-encrypts PII + photo bytes and inserts.
  7. Best-effort owner notification (masked PII).
  8. 201 ``{lead_id}``.
"""

from __future__ import annotations

import io
import re
from typing import Annotated, Any
from uuid import UUID

from cryptography.fernet import MultiFernet
from fastapi import APIRouter, Depends, File, Form, Request, UploadFile
from fastapi.responses import JSONResponse
from PIL import Image, ImageOps
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
from app.core.captcha.verifier import CaptchaVerifier
from app.core.leads.pii_masking import mask_name, mask_phone
from app.core.leads.ports import ElektrikLeadDraft
from app.core.notify.dispatcher import NotificationDispatcher, UserContact
from app.core.notify.ports import ChannelType, NotificationKind, NotificationMessage
from app.infrastructure.leads.service import submit_elektrik_lead
from app.infrastructure.postgres.models import Site
from app.utils.logging import get_logger

router = APIRouter(prefix="/api", tags=["leads"])

_MAX_PHOTOS = 5
_MAX_DIM = 1600
_OBJECT_TYPES = {"Квартира", "Дом", "Офис", "Коммерция"}


def _process_photo(raw: bytes) -> tuple[str, bytes] | None:
    """Validate via decode (Pillow open = magic-byte check), honour EXIF
    orientation then strip it, re-encode to JPEG. Returns ``(mime, bytes)`` or
    ``None`` if the upload isn't a decodable image."""
    try:
        opened = Image.open(io.BytesIO(raw))
        img = (ImageOps.exif_transpose(opened) or opened).convert("RGB")
    except Exception:
        return None
    if max(img.size) > _MAX_DIM:
        img.thumbnail((_MAX_DIM, _MAX_DIM), Image.Resampling.LANCZOS)
    buf = io.BytesIO()
    img.save(buf, "JPEG", quality=82, optimize=True)
    return ("image/jpeg", buf.getvalue())


def _err(fields: list[str], message: str | None = None) -> JSONResponse:
    return JSONResponse(
        status_code=400,
        content={"ok": False, "error": "validation", "fields": fields, "message": message},
    )


@router.post("/leads/elektrik", status_code=201)
async def post_elektrik_lead(
    request: Request,
    session: Annotated[AsyncSession, Depends(get_session)],
    captcha: Annotated[CaptchaVerifier, Depends(get_captcha_verifier)],
    fernet: Annotated[MultiFernet, Depends(get_lead_fernet)],
    notifier: Annotated[NotificationDispatcher, Depends(get_notification_dispatcher)],
    _hourly: Annotated[None, Depends(leads_hourly_rate_limiter)],
    _daily: Annotated[None, Depends(leads_daily_rate_limiter)],
    site_id: Annotated[UUID, Form()],
    name: Annotated[str, Form()] = "",
    phone: Annotated[str, Form()] = "",
    object_type: Annotated[str, Form()] = "",
    service: Annotated[str, Form()] = "",
    address: Annotated[str, Form()] = "",
    call_time: Annotated[str, Form()] = "",
    comment: Annotated[str, Form()] = "",
    consent_v: Annotated[str, Form()] = "",
    captcha_token: Annotated[str, Form()] = "",
    hp_company: Annotated[str, Form()] = "",
    photos: Annotated[list[UploadFile], File()] = [],  # noqa: B006 — FastAPI sentinel
) -> JSONResponse:
    log = get_logger("api.leads.elektrik")
    ip = get_client_ip(request)

    # 1. Honeypot — silent success so the bot can't learn the trap.
    if hp_company.strip():
        log.info("elektrik_lead_honeypot", site_id=str(site_id))
        return JSONResponse(
            status_code=202, content={"ok": True, "data": {"lead_id": str(site_id)}}
        )

    # 2. Captcha — best-effort. The elektrik landing ships NO SmartCaptcha widget,
    # so the form sends an empty token → rely on honeypot + rate-limit. Only when
    # a token is actually present (widget added later) do we verify it: a real
    # rejection → 400; a not-configured server key still proceeds.
    if captcha_token.strip():
        result = await captcha.verify(captcha_token, ip=ip)
        if not result.is_valid and result.reason != "captcha_not_configured":
            log.info("elektrik_lead_captcha_rejected", reason=result.reason)
            return _err(
                [], "Не удалось подтвердить, что вы не робот. Обновите страницу и попробуйте снова."
            )

    # 4. Validate
    fields: list[str] = []
    if len(name.strip()) < 2:
        fields.append("name")
    digits = re.sub(r"\D", "", phone)
    if not (10 <= len(digits) <= 15):
        fields.append("phone")
    if not consent_v.strip():
        fields.append("consent")
    obj = object_type.strip() if object_type.strip() in _OBJECT_TYPES else "Квартира"
    if fields:
        return _err(fields)

    # 5. Photos — validate + EXIF-strip + re-encode (drop undecodable / overflow)
    processed: list[tuple[str, bytes]] = []
    for upload in photos[:_MAX_PHOTOS]:
        raw = await upload.read()
        if not raw:
            continue
        out = _process_photo(raw)
        if out is not None:
            processed.append(out)

    draft = ElektrikLeadDraft(
        site_id=site_id,
        name=name.strip(),
        phone=phone.strip(),
        object_type=obj,
        service=service.strip() or None,
        address=address.strip() or None,
        call_time=call_time.strip() or None,
        comment=comment.strip() or None,
        ip=ip,
        user_agent=request.headers.get("user-agent"),
        photos=processed,
    )
    outcome = await submit_elektrik_lead(session=session, draft=draft, fernet=fernet)
    if outcome.status == "site_not_found":
        return JSONResponse(status_code=404, content={"ok": False, "error": "site_not_found"})
    if outcome.status == "site_not_published":
        return _err([], "Сайт ещё не опубликован.")

    assert outcome.lead_id is not None
    log.info(
        "elektrik_lead_persisted",
        lead_id=str(outcome.lead_id),
        site_id=str(site_id),
        photos=len(processed),
    )
    await _notify_owner(
        session=session,
        notifier=notifier,
        site_id=site_id,
        lead_id=outcome.lead_id,
        name=draft.name,
        phone=draft.phone,
        service=draft.service,
        object_type=obj,
    )
    return JSONResponse(
        status_code=201, content={"ok": True, "data": {"lead_id": str(outcome.lead_id)}}
    )


async def _notify_owner(
    *,
    session: AsyncSession,
    notifier: NotificationDispatcher,
    site_id: UUID,
    lead_id: UUID,
    name: str,
    phone: str,
    service: str | None,
    object_type: str,
) -> None:
    """Masked-PII owner alert to the channel the owner set in their ЛК
    («Настройки → Контакты» + notification toggles). Sent from info@samosite.online
    (the SMTP sender). Masked preview only + a cabinet deep-link to the full lead
    (FR-050b / FZ-152 — no clear PII over email). Best-effort: the lead is already
    persisted, so a missing/dead channel never fails the request — it stays
    visible in the ЛК + admin. The owner gets nothing until they fill an email
    (or Telegram) in their cabinet."""
    log = get_logger("api.leads.elektrik.notify")
    row = (await session.execute(select(Site.settings).where(Site.id == site_id))).one_or_none()
    if row is None:
        log.warning("elektrik_lead_notify_owner_missing", site_id=str(site_id))
        return
    settings = row.settings or {}
    raw_contacts = settings.get("contacts")
    raw_notif = settings.get("notifications")
    contacts: dict[str, Any] = raw_contacts if isinstance(raw_contacts, dict) else {}
    notif: dict[str, Any] = raw_notif if isinstance(raw_notif, dict) else {}
    cab_email = str(contacts.get("email") or "").strip()
    cab_tg = str(contacts.get("telegram") or "").strip()
    email_on = bool(notif.get("email", True))
    tg_on = bool(notif.get("tg", True))

    # Route to the channel the owner configured in their cabinet. Email is the
    # live channel today (Telegram needs a proxy — OPERATIONS §4). No fallback to
    # the placeholder users.contact_value — don't email a dead address.
    if email_on and cab_email:
        channel, target = ChannelType.email, cab_email
    elif tg_on and cab_tg:
        channel, target = ChannelType.telegram, cab_tg
    else:
        log.info("elektrik_lead_notify_skipped_no_channel", site_id=str(site_id))
        return

    site_name = str(settings.get("display_name") or "сайт")
    body = "\n".join(
        [
            f"Услуга: {service or '—'}",
            f"Объект: {object_type}",
            f"Имя: {mask_name(name)}",
            f"Телефон: {mask_phone(phone)}",
            f"\nLead ID: {lead_id}",
            "Открыть в кабинете: https://samosite.online/lk",
        ]
    )
    delivery = await notifier.notify_user(
        contact=UserContact(primary_type=channel, primary_value=target),
        kind=NotificationKind.lead_received,
        message=NotificationMessage(title=f"📨 Новая заявка — {site_name}", body=body),
    )
    log.info(
        "elektrik_lead_owner_notified", delivered=delivery.delivered, channel=delivery.channel.value
    )
