"""``POST /api/feedback`` + ``GET /api/feedback/tally``.

One endpoint, two payload shapes (routed by a Pydantic smart-union):

  - **legacy** (`SubmitFeedbackRequest`) — T1.7 single-row waitlist /
    feature / bug / general. Still used by SourceDetectionBadge +
    WaitlistCapture. Validation → captcha → service → 202 founder alert.
    Unchanged contract.
  - **votes** (`SubmitVotesRequest`) — canon 0.9.0 vote-first modal
    (ADR-0009 rev.2). A batch of votes + optional contact → 200 with the
    fresh tally. Honeypot + per-IP cap + dedupe; founder alert when an
    option crosses 10 distinct voters. See `docs/handoff/FEEDBACK_BACKEND.md`.

``GET /api/feedback/tally`` powers the modal's X/10 counters (cached ~45s).
"""

from __future__ import annotations

import contextlib
import json
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies import (
    feedback_rate_limiter,
    feedback_tally_rate_limiter,
    get_captcha_verifier,
    get_client_ip,
    get_notification_dispatcher,
    get_session,
)
from app.api.schemas.feedback import (
    FeedbackTallyData,
    FeedbackTallyResponse,
    SubmitFeedbackData,
    SubmitFeedbackRequest,
    SubmitFeedbackResponse,
    SubmitVotesData,
    SubmitVotesRequest,
    SubmitVotesResponse,
)
from app.core.captcha.verifier import CaptchaVerifier
from app.core.feedback.service import (
    TallyResult,
    get_tally,
    submit_feedback,
    submit_votes,
)
from app.core.notify.dispatcher import NotificationDispatcher
from app.core.notify.ports import NotificationKind, NotificationMessage
from app.utils.logging import get_logger

router = APIRouter(prefix="/api", tags=["feedback"])

_TALLY_CACHE_KEY = "feedback:tally"
_TALLY_CACHE_TTL = 45  # seconds — read on every modal open; cheap aggregate.


def _tally_data(tally: TallyResult) -> FeedbackTallyData:
    return FeedbackTallyData(items=tally.items, total_week=tally.total_week)


# Tally cache is best-effort: any Redis hiccup falls back to a live DB read
# (cheap aggregate) rather than erroring the public endpoint.
async def _cache_get(redis: object) -> str | None:
    if redis is None:
        return None
    with contextlib.suppress(Exception):
        value = await redis.get(_TALLY_CACHE_KEY)  # type: ignore[attr-defined]
        if isinstance(value, bytes):
            return value.decode()
        if isinstance(value, str):
            return value
    return None


async def _cache_set(redis: object, value: str) -> None:
    if redis is None:
        return
    with contextlib.suppress(Exception):
        await redis.set(_TALLY_CACHE_KEY, value, ex=_TALLY_CACHE_TTL)  # type: ignore[attr-defined]


async def _cache_del(redis: object) -> None:
    if redis is None:
        return
    with contextlib.suppress(Exception):
        await redis.delete(_TALLY_CACHE_KEY)  # type: ignore[attr-defined]


# ---------------------------------------------------------------------------
# GET /api/feedback/tally
# ---------------------------------------------------------------------------


@router.get("/feedback/tally", response_model=FeedbackTallyResponse, status_code=200)
async def get_feedback_tally(
    request: Request,
    session: Annotated[AsyncSession, Depends(get_session)],
    _ratelimit: Annotated[None, Depends(feedback_tally_rate_limiter)],
) -> FeedbackTallyResponse:
    redis = getattr(request.app.state, "redis", None)

    cached = await _cache_get(redis)
    if cached:
        return FeedbackTallyResponse(data=FeedbackTallyData(**json.loads(cached)))

    data = _tally_data(await get_tally(session))
    await _cache_set(redis, data.model_dump_json())
    return FeedbackTallyResponse(data=data)


# ---------------------------------------------------------------------------
# POST /api/feedback  (votes | legacy)
# ---------------------------------------------------------------------------


@router.post("/feedback", status_code=200)
async def post_feedback(
    body: SubmitVotesRequest | SubmitFeedbackRequest,
    request: Request,
    session: Annotated[AsyncSession, Depends(get_session)],
    captcha: Annotated[CaptchaVerifier, Depends(get_captcha_verifier)],
    notifier: Annotated[NotificationDispatcher, Depends(get_notification_dispatcher)],
    _ratelimit: Annotated[None, Depends(feedback_rate_limiter)],
) -> JSONResponse:
    if isinstance(body, SubmitVotesRequest):
        return await _handle_votes(body, request, session, captcha, notifier)
    return await _handle_legacy(body, request, session, captcha, notifier)


async def _handle_votes(
    body: SubmitVotesRequest,
    request: Request,
    session: AsyncSession,
    captcha: CaptchaVerifier,
    notifier: NotificationDispatcher,
) -> JSONResponse:
    log = get_logger("api.feedback")
    ip = get_client_ip(request)

    # Honeypot — a filled value is a bot. Silently accept (no write, no error).
    if body.honeypot:
        log.info("feedback_votes_honeypot")
        tally = await get_tally(session)
        return _votes_response(accepted=0, tally=tally)

    # Captcha is optional in the vote-first modal (no UI). Verify only if a
    # real token was supplied; abuse is otherwise covered by rate-limit +
    # per-IP cap + dedupe in the service.
    if body.captcha_token and body.captcha_token != "DEV_TOKEN":  # noqa: S105
        captcha_result = await captcha.verify(body.captcha_token, ip=ip)
        if not captcha_result.is_valid:
            log.info("captcha_rejected", reason=captcha_result.reason)
            raise HTTPException(status_code=400, detail="invalid_captcha")

    result = await submit_votes(
        session=session,
        votes=[(v.kind, v.key) for v in body.votes],
        own_source=body.own_source,
        own_feature=body.own_feature,
        message=body.message,
        name=body.name,
        contact=body.contact,
        ip=ip,
        user_agent=request.headers.get("user-agent"),
    )

    log.info(
        "feedback_votes_accepted",
        accepted=result.accepted,
        crossed=result.crossed_keys,
        has_contact=bool(body.contact),
    )

    # Founder heads-up on EVERY new submission (the threshold loop below is an
    # extra, louder ping when an option hits 10 votes). Skip pure-duplicate
    # submits that recorded nothing new. Full contact/message live in the admin
    # Отзывы inbox — the alert is a teaser, not a PII dump.
    if result.accepted or body.message or body.own_source or body.own_feature or body.contact:
        picks = ", ".join(v.key for v in body.votes) or "—"
        lines = [f"Голосов: {len(body.votes)} ({picks})"]
        if body.message and body.message.strip():
            lines.append(f"Сообщение: {body.message.strip()[:300]}")
        for own in (body.own_source, body.own_feature):
            if own and own.strip():
                lines.append(f"Свой вариант: {own.strip()[:120]}")
        lines.append("Контакт оставлен" if body.contact else "Без контакта")
        lines.append("Подробнее: админка → Отзывы")
        await notifier.notify_founder(
            kind=NotificationKind.application_received,
            message=NotificationMessage(
                title="💬 Новый фидбек на сайте",
                body="\n".join(lines),
                metadata={"email_subject": "новый фидбек на сайте"},
            ),
        )

    # Founder alert when an option just crossed the 10-vote threshold.
    for key in result.crossed_keys:
        await notifier.notify_founder(
            kind=NotificationKind.application_received,  # same admin alert kind
            message=NotificationMessage(
                title=f"🔥 10 голосов: {key}",
                body=f"Опция «{key}» набрала 10 голосов в форме «Чего не хватает?» — пора брать в работу.",
            ),
        )

    # Bust the tally cache so the next GET reflects the new votes immediately.
    await _cache_del(getattr(request.app.state, "redis", None))

    return _votes_response(accepted=result.accepted, tally=result.tally)


def _votes_response(*, accepted: int, tally: TallyResult) -> JSONResponse:
    payload = SubmitVotesResponse(data=SubmitVotesData(accepted=accepted, tally=_tally_data(tally)))
    return JSONResponse(status_code=200, content=payload.model_dump(mode="json"))


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
