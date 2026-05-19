"""Billing API (T9.1).

Three endpoints cover the MVP scope:

  POST /api/billing/checkout          — user kicks off upgrade
  POST /api/billing/webhook           — ЮKassa pushes events
  POST /api/billing/cancel            — one-click cancel

Auth: ``checkout`` + ``cancel`` require a verified user identity. MVP
takes the user contact in the body (the same self-service-via-token
pattern as ``/api/me/delete-data``) — full passwordless login lands
in a later ticket. The webhook is **unauthenticated** but verifies
the source IP against ``YOOKASSA_WEBHOOK_IP_ALLOWLIST`` and the body
against the optional ``YOOKASSA_WEBHOOK_SECRET`` (HMAC-SHA256).
"""

from __future__ import annotations

import hashlib
import hmac
import ipaddress
from typing import Annotated, Any

from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel, ConfigDict
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies import (
    application_rate_limiter,
    get_client_ip,
    get_payment_gateway,
    get_session,
)
from app.config import get_settings
from app.core.billing.ports import (
    PaymentGateway,
    PaymentGatewayDisabledError,
)
from app.core.billing.service import (
    BillingError,
    cancel_subscription,
    record_webhook_event,
    start_checkout,
)
from app.core.contact.auto_detect import detect_contact
from app.infrastructure.postgres.models import User
from app.utils.logging import get_logger

router = APIRouter(prefix="/api/billing", tags=["billing"])
_log = get_logger("api.billing")


# --- request shapes ------------------------------------------------------


class _StrictModel(BaseModel):
    model_config = ConfigDict(extra="forbid")


class CheckoutRequest(_StrictModel):
    """Body of ``POST /api/billing/checkout``.

    ``contact`` is the same free-form string the application form
    accepts — server auto-detects email/phone/telegram/max. Look-up
    is exact; anonymous "ghost" contacts that don't resolve to a
    User get a clean 404 so a bad actor can't enumerate users by
    POSTing random contacts to checkout."""

    contact: str
    return_url: str


class CheckoutResponseData(_StrictModel):
    confirmation_url: str
    subscription_id: str


class CheckoutResponse(_StrictModel):
    ok: bool = True
    data: CheckoutResponseData


class CancelRequest(_StrictModel):
    contact: str
    reason: str | None = None


class CancelResponseData(_StrictModel):
    subscription_id: str
    status: str


class CancelResponse(_StrictModel):
    ok: bool = True
    data: CancelResponseData


# --- checkout ------------------------------------------------------------


@router.post(
    "/checkout",
    response_model=CheckoutResponse,
    status_code=200,
)
async def post_checkout(
    body: CheckoutRequest,
    session: Annotated[AsyncSession, Depends(get_session)],
    gateway: Annotated[PaymentGateway, Depends(get_payment_gateway)],
    _ratelimit: Annotated[None, Depends(application_rate_limiter)],
) -> CheckoutResponse:
    user = await _lookup_user(session, body.contact)
    if user is None:
        # Anti-enumeration: no_user looks like a regular 404 rather
        # than a separate "this contact has no account" message.
        raise HTTPException(status_code=404, detail="user_not_found")

    try:
        result = await start_checkout(
            session=session,
            gateway=gateway,
            user_id=user.id,
            return_url=body.return_url,
        )
    except PaymentGatewayDisabledError:
        raise HTTPException(status_code=503, detail="billing_unavailable") from None
    except BillingError as exc:
        raise HTTPException(status_code=409, detail=str(exc)) from None

    return CheckoutResponse(
        data=CheckoutResponseData(
            confirmation_url=result.confirmation_url,
            subscription_id=str(result.subscription_id),
        )
    )


# --- cancel --------------------------------------------------------------


@router.post(
    "/cancel",
    response_model=CancelResponse,
    status_code=200,
)
async def post_cancel(
    body: CancelRequest,
    session: Annotated[AsyncSession, Depends(get_session)],
    _ratelimit: Annotated[None, Depends(application_rate_limiter)],
) -> CancelResponse:
    user = await _lookup_user(session, body.contact)
    if user is None:
        raise HTTPException(status_code=404, detail="user_not_found")
    try:
        sub = await cancel_subscription(
            session=session,
            user_id=user.id,
            reason=body.reason,
        )
    except BillingError as exc:
        raise HTTPException(status_code=409, detail=str(exc)) from None

    return CancelResponse(
        data=CancelResponseData(
            subscription_id=str(sub.id),
            status=sub.status,
        )
    )


# --- webhook -------------------------------------------------------------


# Documented ЮKassa egress range as of 2025: the founder updates this
# from .env when ЮKassa publishes a new block. Empty allowlist = no
# IP gate (acceptable in dev; production setting forces a non-empty
# list).
def _allowlist() -> tuple[str, ...]:
    raw = get_settings().yookassa_webhook_ip_allowlist
    return tuple(part.strip() for part in raw.split(",") if part.strip()) if raw else ()


@router.post("/webhook", include_in_schema=False)
async def post_webhook(
    request: Request,
    session: Annotated[AsyncSession, Depends(get_session)],
) -> dict[str, Any]:
    """Receives ЮKassa events. Always 200s on a verified event so the
    provider doesn't retry. Failures inside the state machine log + 200
    too — they don't roll back the event record; the founder reviews
    via ``billing_events.processing_error``."""
    raw_body = await request.body()
    ip = get_client_ip(request)

    if not _ip_allowed(ip):
        _log.warning("yookassa_webhook_ip_rejected", ip=ip)
        raise HTTPException(status_code=403, detail="forbidden")

    if not _signature_ok(request, raw_body):
        _log.warning("yookassa_webhook_signature_bad")
        raise HTTPException(status_code=403, detail="bad_signature")

    try:
        payload = await request.json()
    except Exception:  # pragma: no cover — body already read above
        raise HTTPException(status_code=400, detail="invalid_json") from None
    if not isinstance(payload, dict):
        raise HTTPException(status_code=400, detail="payload_not_object")

    outcome = await record_webhook_event(session=session, raw_payload=payload)
    return {
        "ok": True,
        "data": {
            "handled": outcome.handled,
            "duplicate": outcome.duplicate,
            "new_status": outcome.new_status.value if outcome.new_status else None,
        },
    }


# --- helpers -------------------------------------------------------------


async def _lookup_user(session: AsyncSession, raw_contact: str) -> User | None:
    detected = detect_contact(raw_contact)
    if detected is None:
        return None
    stmt = select(User).where(
        User.contact_type == detected.contact_type.value,
        User.contact_value == detected.value,
    )
    return (await session.execute(stmt)).scalar_one_or_none()


def _ip_allowed(ip: str | None) -> bool:
    allowlist = _allowlist()
    if not allowlist:
        return True
    if ip is None:
        return False
    try:
        parsed_ip = ipaddress.ip_address(ip)
    except ValueError:
        return False
    for entry in allowlist:
        try:
            if "/" in entry:
                if parsed_ip in ipaddress.ip_network(entry, strict=False):
                    return True
            elif parsed_ip == ipaddress.ip_address(entry):
                return True
        except ValueError:
            continue
    return False


def _signature_ok(request: Request, raw_body: bytes) -> bool:
    """Optional HMAC verification. ЮKassa doesn't sign webhooks by
    default, but exposes a "Подпись" custom header when configured.
    When ``YOOKASSA_WEBHOOK_SECRET`` is empty we skip — the IP
    allowlist is the primary gate."""
    secret = get_settings().yookassa_webhook_secret
    if not secret:
        return True
    received = request.headers.get("Content-Signature") or request.headers.get(
        "X-Yookassa-Signature"
    )
    if not received:
        return False
    expected = hmac.new(secret.encode("utf-8"), raw_body, hashlib.sha256).hexdigest()
    return hmac.compare_digest(received, expected)
