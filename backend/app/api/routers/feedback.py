"""``POST /api/feedback`` — waitlist + general feedback intake (T1.7).

Same shape as ``submit-application``: Pydantic validation → rate-limit
→ captcha → service. The 202 response triggers a founder admin alert
via the T1.6 NotificationDispatcher.
"""

from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies import (
    feedback_rate_limiter,
    get_captcha_verifier,
    get_client_ip,
    get_notification_dispatcher,
    get_session,
)
from app.api.schemas.feedback import (
    SubmitFeedbackData,
    SubmitFeedbackRequest,
    SubmitFeedbackResponse,
)
from app.core.captcha.verifier import CaptchaVerifier
from app.core.feedback.service import submit_feedback
from app.core.notify.dispatcher import NotificationDispatcher
from app.core.notify.ports import NotificationKind, NotificationMessage
from app.utils.logging import get_logger

router = APIRouter(prefix="/api", tags=["feedback"])


@router.post(
    "/feedback",
    response_model=SubmitFeedbackResponse,
    status_code=202,
)
async def post_feedback(
    body: SubmitFeedbackRequest,
    request: Request,
    session: Annotated[AsyncSession, Depends(get_session)],
    captcha: Annotated[CaptchaVerifier, Depends(get_captcha_verifier)],
    notifier: Annotated[NotificationDispatcher, Depends(get_notification_dispatcher)],
    _ratelimit: Annotated[None, Depends(feedback_rate_limiter)],
) -> SubmitFeedbackResponse:
    log = get_logger("api.feedback")
    ip = get_client_ip(request)

    captcha_result = await captcha.verify(body.captcha_token, ip=ip)
    if not captcha_result.is_valid:
        log.info("captcha_rejected", reason=captcha_result.reason)
        raise HTTPException(status_code=400, detail="invalid_captcha")

    result = await submit_feedback(
        session=session,
        type_=body.type,
        email=body.email,
        source_name=body.source_name,
        source_url=body.source_url,
        message=body.message,
        checkboxes=body.checkboxes,
        consent_given=body.consent_given,
    )

    if result.is_err():
        err = result.unwrap_err()
        log.info("feedback_rejected", code=err.code)
        raise HTTPException(status_code=400, detail=err.code)

    feedback = result.unwrap()
    log.info(
        "feedback_accepted",
        feedback_id=str(feedback.id),
        type=feedback.type,
        source_name=feedback.source_name,
    )

    await notifier.notify_founder(
        kind=NotificationKind.application_received,  # same admin alert kind
        message=NotificationMessage(
            title=_title_for(feedback),
            body=_body_for(feedback, body),
        ),
    )

    return SubmitFeedbackResponse(data=SubmitFeedbackData(feedback_id=feedback.id))


def _title_for(feedback: object) -> str:
    type_ = getattr(feedback, "type", "general")
    source_name = getattr(feedback, "source_name", None)
    if type_ == "source_request" and source_name:
        return f"📋 Waitlist: {source_name}"
    if type_ == "feature_request":
        return "💡 Feature request"
    if type_ == "bug":
        return "🐞 Bug report"
    return "📨 Feedback"


def _body_for(feedback: object, body: SubmitFeedbackRequest) -> str:
    lines: list[str] = []
    type_ = getattr(feedback, "type", "general")
    lines.append(f"Type: {type_}")
    source_name = getattr(feedback, "source_name", None)
    if source_name:
        lines.append(f"Source: {source_name}")
    if body.source_url:
        lines.append(f"URL: {body.source_url}")
    if body.email:
        # `email` is the only PII we have here; mask same way the
        # applications router does (SECURITY.md §7).
        local, _, domain = body.email.partition("@")
        masked = f"{local[:1]}***@{domain}" if local else "***"
        lines.append(f"Email: {masked}")
    if body.message:
        snippet = body.message[:200] + ("…" if len(body.message) > 200 else "")
        lines.append(f"Message: {snippet}")
    ticked = [k for k, v in body.checkboxes.items() if v and not k.startswith("_")]
    if ticked:
        lines.append(f"Ticked: {', '.join(sorted(ticked))}")
    return "\n".join(lines)
