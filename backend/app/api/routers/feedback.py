"""``POST /api/feedback`` (legacy single-row) + ``POST /api/feedback/v2``.

  - **legacy** (`SubmitFeedbackRequest`) — T1.7 single-row waitlist /
    feature / bug / general. Still used by SourceDetectionBadge +
    WaitlistCapture. Validation → captcha → service → 202 founder alert.
    Unchanged contract.
  - **v2** (`SubmitFeedbackV2Request`) — canon 0.13.0 «Что останавливает?»
    (blocker) + «Задать вопрос» (question). See `CANON_FEEDBACK_V2_TZ.md`.

The canon-0.9.x vote-first surface (``GET /api/feedback/tally`` + the
votes-branch of ``POST /api/feedback``) was retired in July 2026 after the
consumer switched to v2 — historical `feedback_submission`/`feedback_vote`
rows stay readable in the admin inbox + ``/admin/api/feedback/votes``.
"""

from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import JSONResponse
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
    SubmitFeedbackV2Data,
    SubmitFeedbackV2Request,
    SubmitFeedbackV2Response,
)
from app.core.captcha.verifier import CaptchaVerifier
from app.core.feedback.service import submit_feedback, submit_feedback_v2
from app.core.notify.dispatcher import NotificationDispatcher
from app.core.notify.ports import NotificationKind, NotificationMessage
from app.utils.logging import get_logger

router = APIRouter(prefix="/api", tags=["feedback"])


# ---------------------------------------------------------------------------
# POST /api/feedback  (legacy single-row)
# ---------------------------------------------------------------------------


@router.post("/feedback", status_code=202)
async def post_feedback(
    body: SubmitFeedbackRequest,
    request: Request,
    session: Annotated[AsyncSession, Depends(get_session)],
    captcha: Annotated[CaptchaVerifier, Depends(get_captcha_verifier)],
    notifier: Annotated[NotificationDispatcher, Depends(get_notification_dispatcher)],
    _ratelimit: Annotated[None, Depends(feedback_rate_limiter)],
) -> JSONResponse:
    return await _handle_legacy(body, request, session, captcha, notifier)


# ---------------------------------------------------------------------------
# POST /api/feedback/v2 — «Что останавливает?» + «Задать вопрос»
# (CANON_FEEDBACK_V2_TZ, июль 2026)
# ---------------------------------------------------------------------------


@router.post("/feedback/v2", response_model=SubmitFeedbackV2Response, status_code=202)
async def post_feedback_v2(
    body: SubmitFeedbackV2Request,
    request: Request,
    session: Annotated[AsyncSession, Depends(get_session)],
    captcha: Annotated[CaptchaVerifier, Depends(get_captcha_verifier)],
    notifier: Annotated[NotificationDispatcher, Depends(get_notification_dispatcher)],
    _ratelimit: Annotated[None, Depends(feedback_rate_limiter)],
) -> JSONResponse:
    log = get_logger("api.feedback")
    ip = get_client_ip(request)

    captcha_result = await captcha.verify(body.captcha_token, ip=ip)
    if not captcha_result.is_valid:
        log.info("captcha_rejected", reason=captcha_result.reason)
        raise HTTPException(status_code=400, detail="invalid_captcha")

    result = await submit_feedback_v2(
        session=session,
        mode=body.mode,
        trigger=body.trigger,
        reason=body.reason,
        note=body.note,
        question=body.question,
        contact_channel=body.contact_channel,
        contact=body.contact,
        consent_given=body.consent_given,
        ip=ip,
        user_agent=request.headers.get("user-agent"),
    )
    if result.is_err():
        err = result.unwrap_err()
        log.info("feedback_v2_rejected", code=err.code)
        raise HTTPException(status_code=400, detail=err.code)

    feedback = result.unwrap()
    log.info(
        "feedback_v2_accepted",
        feedback_id=str(feedback.id),
        mode=feedback.type,
        trigger=feedback.trigger,
        reason=feedback.reason,
        has_contact=bool(feedback.contact),
    )

    # Founder-тикет: источник «feedback», причина/вопрос, контакт — маской.
    if feedback.type == "blocker":
        title = f"🧱 Фидбек: {feedback.reason}"
        lines = [f"Причина: {feedback.reason}"]
        if feedback.message:
            lines.append(f"Почему: {feedback.message[:300]}")
        if feedback.contact:
            lines.append(
                "Оставил контакт на бесплатный черновик — отвечать как заявке: "
                f"{_mask_v2_contact(feedback.contact, feedback.contact_channel)} "
                f"({feedback.contact_channel})"
            )
        subject = f"фидбек: {feedback.reason}"
    else:
        title = "❓ Вопрос с сайта"
        lines = [f"Вопрос: {(feedback.message or '')[:500]}"]
        lines.append(
            f"Контакт: {_mask_v2_contact(feedback.contact or '', feedback.contact_channel)} "
            f"({feedback.contact_channel})"
        )
        subject = "вопрос с сайта"
    lines.append(f"Источник: feedback · триггер {feedback.trigger}")

    await notifier.notify_founder(
        kind=NotificationKind.application_received,  # same admin alert kind as legacy
        message=NotificationMessage(
            title=title,
            body="\n".join(lines),
            metadata={"email_subject": subject},
        ),
    )

    payload = SubmitFeedbackV2Response(data=SubmitFeedbackV2Data(feedback_id=feedback.id))
    return JSONResponse(status_code=202, content=payload.model_dump(mode="json"))


def _mask_v2_contact(value: str, channel: str | None) -> str:
    """Маска PII для founder-алерта (политика _mask_contact из applications)."""
    if channel == "email":
        local, _, domain = value.partition("@")
        return f"{local[:1]}***@{domain}" if local else "***"
    if channel == "whatsapp":
        return f"+7***{value[-4:]}" if len(value) >= 4 else "***"
    if channel == "telegram":
        prefix, tg_body = (value[:1], value[1:]) if value.startswith("@") else ("", value)
        if len(tg_body) <= 4:
            return f"{prefix}***"
        return f"{prefix}{tg_body[:2]}***{tg_body[-2:]}"
    return "***"


async def _handle_legacy(
    body: SubmitFeedbackRequest,
    request: Request,
    session: AsyncSession,
    captcha: CaptchaVerifier,
    notifier: NotificationDispatcher,
) -> JSONResponse:
    log = get_logger("api.feedback")
    ip = get_client_ip(request)

    captcha_result = await captcha.verify(body.captcha_token, ip=ip)
    if not captcha_result.is_valid:
        log.info("captcha_rejected", reason=captcha_result.reason)
        raise HTTPException(status_code=400, detail="invalid_captcha")

    user_agent = request.headers.get("user-agent")
    result = await submit_feedback(
        session=session,
        type_=body.type,
        email=body.email,
        source_name=body.source_name,
        source_url=body.source_url,
        message=body.message,
        checkboxes=body.checkboxes,
        consent_given=body.consent_given,
        ip=ip,
        user_agent=user_agent,
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

    payload = SubmitFeedbackResponse(data=SubmitFeedbackData(feedback_id=feedback.id))
    # Preserve the legacy 202 contract for the single-row callers.
    return JSONResponse(status_code=202, content=payload.model_dump(mode="json"))


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
