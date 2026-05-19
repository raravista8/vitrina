"""``POST /api/submit-application`` — first user-facing endpoint (T1.3).

Validates input via Pydantic, runs the rate limiter, delegates to the
``core.applications.service`` for persistence, returns the canonical
success envelope ``{"ok": true, "data": {...}}``. Errors flow through the
T1.2 exception handler chain — a ``DomainError`` from the service becomes
HTTPException(400, detail=<code>) which the handler turns into the
``{"ok": false, "error": "<code>", "request_id": "..."}`` envelope.
"""

from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies import (
    application_rate_limiter,
    get_captcha_verifier,
    get_client_ip,
    get_notification_dispatcher,
    get_session,
)
from app.api.schemas.applications import (
    SubmitApplicationData,
    SubmitApplicationRequest,
    SubmitApplicationResponse,
)
from app.core.applications.service import submit_application
from app.core.captcha.verifier import CaptchaVerifier
from app.core.notify.dispatcher import NotificationDispatcher
from app.core.notify.ports import NotificationKind, NotificationMessage
from app.utils.logging import get_logger

router = APIRouter(prefix="/api", tags=["applications"])


@router.post(
    "/submit-application",
    response_model=SubmitApplicationResponse,
    status_code=202,
)
async def post_submit_application(
    body: SubmitApplicationRequest,
    request: Request,
    session: Annotated[AsyncSession, Depends(get_session)],
    captcha: Annotated[CaptchaVerifier, Depends(get_captcha_verifier)],
    notifier: Annotated[NotificationDispatcher, Depends(get_notification_dispatcher)],
    _ratelimit: Annotated[None, Depends(application_rate_limiter)],
) -> SubmitApplicationResponse:
    log = get_logger("api.applications")
    ip = get_client_ip(request)
    user_agent = request.headers.get("User-Agent")

    captcha_result = await captcha.verify(body.captcha_token, ip=ip)
    if not captcha_result.is_valid:
        log.info("captcha_rejected", reason=captcha_result.reason)
        raise HTTPException(status_code=400, detail="invalid_captcha")

    result = await submit_application(
        session=session,
        source_url=str(body.source_url) if body.source_url else None,
        source_type=body.source_type,
        contact=body.contact,
        consent_given=body.consent_given,
        ip=ip,
        user_agent=user_agent,
    )

    if result.is_err():
        err = result.unwrap_err()
        log.info("application_rejected", code=err.code)
        raise HTTPException(status_code=400, detail=err.code)

    application = result.unwrap()
    log.info(
        "application_accepted",
        application_id=str(application.id),
        source_type=application.source_type,
        contact_type=application.contact_type,
    )

    # Founder admin alert. Best-effort: NotificationDispatcher swallows
    # delivery failures and logs them — the user has already received a
    # 202 in any case (FR-002 "respond 202 within 1s").
    await notifier.notify_founder(
        kind=NotificationKind.application_received,
        message=NotificationMessage(
            title=f"🆕 Заявка #{str(application.id)[:8]}",
            body=(
                f"Источник: {application.source_type}"
                f"\nКонтакт: {_mask_contact(application.contact_value, application.contact_type)} "
                f"({application.contact_type})"
                f"\nURL: {application.source_url or '—'}"
            ),
        ),
    )

    return SubmitApplicationResponse(
        data=SubmitApplicationData(
            application_id=application.id,
            contact_type=application.contact_type,  # type: ignore[arg-type]
        )
    )


def _mask_contact(value: str, contact_type: str) -> str:
    """Mask PII for the founder-facing alert.

    Same rule as app/utils/logging.py PIIRedactor but applied per
    contact_type so the admin gets a useful hint without seeing the full
    phone / email.
    """
    if contact_type == "email":
        local, _, domain = value.partition("@")
        return f"{local[:1]}***@{domain}" if local else "***"
    if contact_type == "phone":
        return f"+7***{value[-4:]}" if len(value) >= 4 else "***"
    if contact_type in {"telegram", "max"}:
        # Keep leading "@" / "max://", mask the body.
        prefix, body = (value[:1], value[1:]) if value.startswith("@") else value.split("//", 1)
        if isinstance(prefix, str) and isinstance(body, str):
            if len(body) <= 4:
                return f"{prefix}***"
            return f"{prefix}{body[:2]}***{body[-2:]}"
    return "***"
