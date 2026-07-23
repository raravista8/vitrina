"""Feedback persistence service (T1.7 + T6.1 consent polish).

Layered MVC per ARCHITECTURE.md §9 — feedback is not on the
hexagonal-critical-path list, so the service may import SQLAlchemy
directly.

Responsibilities:
  1. Validate consent_given.
  2. Record a row in the consent ledger (FR-070). Feedback comes in
     anonymously (no User row), so the consent is stored with
     ``user_id = NULL`` — the ON DELETE SET NULL on `consents.user_id`
     keeps the legal evidence intact even if the subject is later
     materialised + erased.
  3. Stash source_url alongside checkboxes (the model has no
     source_url column on purpose — keeps JSONB the single place to
     evolve waitlist payloads without a migration per source).
  4. Insert one Feedback row.

Founder notification is the router's responsibility (consistent with
applications: side-effects live at the API boundary, persistence at the
service boundary).
"""

from __future__ import annotations

import re
from dataclasses import dataclass
from datetime import UTC, datetime, timedelta
from typing import Any

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.consent.ledger import record_consent
from app.core.contact.auto_detect import validate_channel_value
from app.infrastructure.postgres.models import (
    Feedback,
    FeedbackSubmission,
    FeedbackVote,
)
from app.utils.errors import DomainError, DomainResult, Err, Ok


async def submit_feedback(
    *,
    session: AsyncSession,
    type_: str,
    email: str | None,
    source_name: str | None,
    source_url: str | None,
    message: str | None,
    checkboxes: dict[str, bool],
    consent_given: bool,
    ip: str | None = None,
    user_agent: str | None = None,
) -> DomainResult[Feedback]:
    if not consent_given:
        return Err(DomainError(code="consent_required"))

    await record_consent(
        session=session,
        user_id=None,  # anonymous waitlist signup; ON DELETE SET NULL preserves the row
        ip=ip,
        user_agent=user_agent,
    )

    payload: dict[str, Any] = dict(checkboxes)
    if source_url:
        # Stuff into the JSONB rather than adding a column. Aggregation
        # queries on /admin/waitlist (T1.7b) look at `source_name`, not URL.
        payload["_source_url"] = source_url

    feedback = Feedback(
        type=type_,
        email=email,
        source_name=source_name,
        message=message,
        checkboxes=payload,
    )
    session.add(feedback)
    await session.flush()
    await session.commit()
    return Ok(feedback)


# ===========================================================================
# Feedback v2 (CANON_FEEDBACK_V2_TZ, июль 2026)
# ===========================================================================

# Причины отказа — ЗАМОРОЖЕННЫЙ enum консьерж-таблицы founder'а (ТЗ §4,
# 23.07.2026). Один enum живёт в трёх местах 1:1: форма (canon 0.13.0),
# БД/Метрика (CHECK в миграции 0021), консьерж-таблица. Менять — только
# синхронно во всех трёх.
FEEDBACK_V2_REASON_CODES: tuple[str, ...] | None = (
    "enough_maps",  # Мне хватает Яндекс.Карт и 2ГИС
    "booking_covers",  # Запись уже в Dikidi/YClients — зачем ещё сайт?
    "unclear_value",  # Не понял, что именно получу
    "price",  # Дорого
    "no_trust",  # Не доверяю: непонятно, кто вы
    "not_now",  # Пока просто смотрю — вернусь позже
    "other",  # Другое — напишу словами (note обязательна)
)
# Зарезервировано ТОЛЬКО для консьерж-канала («молчание»): в БД-CHECK входит,
# из формы всегда 400 invalid_reason (нет в кортеже выше).
FEEDBACK_V2_RESERVED_CODES: tuple[str, ...] = ("no_reply",)
_REASON_SLUG_RE = re.compile(r"^[a-z0-9][a-z0-9_-]{1,31}$")

_FEEDBACK_V2_CONSENT_TEXT = (
    "Согласие на обработку контакта для ответа на обращение (Самосайт, "
    "форма обратной связи). Контакт не передаётся третьим лицам и не "
    "используется для рассылок."
)


async def submit_feedback_v2(
    *,
    session: AsyncSession,
    mode: str,
    trigger: str,
    reason: str | None,
    note: str | None,
    question: str | None,
    contact_channel: str | None,
    contact: str | None,
    consent_given: bool,
    ip: str | None = None,
    user_agent: str | None = None,
) -> DomainResult[Feedback]:
    """«Что останавливает?» (blocker) / «Задать вопрос» (question).

    Инварианты режимов (ТЗ §2/§3):
      - blocker: reason обязателен (слаг консьерж-таблицы), question запрещён,
        контакт опционален («Просто отправить ответ» — ценен и без лида);
      - question: question обязателен, reason запрещён, контакт обязателен
        (иначе отвечать некуда).
    Контакт = PII → при контакте обязательны канал, валидность значения
    (нормализация ``validate_channel_value``) и согласие; согласие пишется
    в consent-ledger (FR-070).
    """
    contact = contact.strip() if contact else None
    note = note.strip() if note else None
    question = question.strip() if question else None

    if mode == "blocker":
        if not reason:
            return Err(DomainError(code="reason_required"))
        if not _REASON_SLUG_RE.match(reason) or (
            FEEDBACK_V2_REASON_CODES is not None and reason not in FEEDBACK_V2_REASON_CODES
        ):
            return Err(DomainError(code="invalid_reason"))
        # «other» без текста — мусорная корзина без содержимого (ТЗ §4):
        # для остальных причин note опциональна.
        if reason == "other" and not note:
            return Err(DomainError(code="note_required_for_other"))
        if question:
            return Err(DomainError(code="question_not_allowed"))
    else:  # question
        if not question:
            return Err(DomainError(code="question_required"))
        if reason:
            return Err(DomainError(code="reason_not_allowed"))
        if not contact:
            return Err(DomainError(code="contact_required"))

    normalized_contact: str | None = None
    if contact:
        if not contact_channel:
            return Err(DomainError(code="channel_required"))
        normalized_contact = validate_channel_value(contact_channel, contact)
        if normalized_contact is None:
            return Err(DomainError(code="invalid_contact_for_channel"))
        if not consent_given:
            return Err(DomainError(code="consent_required"))
        await record_consent(
            session=session,
            user_id=None,
            ip=ip,
            user_agent=user_agent,
            consent_text=_FEEDBACK_V2_CONSENT_TEXT,
        )

    feedback = Feedback(
        type=mode,
        trigger=trigger,
        reason=reason,
        message=note if mode == "blocker" else question,
        contact_channel=contact_channel if normalized_contact else None,
        contact=normalized_contact,
    )
    session.add(feedback)
    await session.flush()
    await session.commit()
    return Ok(feedback)


# ===========================================================================
# Vote-first modal (canon 0.9.x / ADR-0009 rev.2) — RETIRED July 2026
# ===========================================================================
#
# The public write path (`submit_votes`, per-IP cap, dedupe, 10-vote
# threshold alert) was removed when the consumer switched to Feedback v2
# (canon 0.13.0). `get_tally` stays: the admin rollup
# `/admin/api/feedback/votes` still reads the historical
# `feedback_submission`/`feedback_vote` rows.


@dataclass(frozen=True)
class TallyResult:
    items: dict[str, int]  # option_key → distinct-voter count
    total_week: int


# Distinct voter = the contact (lower-cased) if given, else the ip_hash.
_VOTER_KEY = func.coalesce(func.lower(FeedbackSubmission.contact), FeedbackSubmission.ip_hash)


async def get_tally(session: AsyncSession) -> TallyResult:
    """Distinct-voter count per option_key + total votes in the trailing 7d.
    Historical data only — no new votes are written since the July 2026
    retire, so `total_week` decays to 0."""
    rows = (
        await session.execute(
            select(FeedbackVote.option_key, func.count(func.distinct(_VOTER_KEY)))
            .select_from(FeedbackVote)
            .join(FeedbackSubmission, FeedbackVote.submission_id == FeedbackSubmission.id)
            .group_by(FeedbackVote.option_key)
        )
    ).all()
    items = {key: int(count) for key, count in rows}

    week_ago = datetime.now(UTC) - timedelta(days=7)
    total_week = (
        await session.scalar(
            select(func.count())
            .select_from(FeedbackVote)
            .where(FeedbackVote.created_at >= week_ago)
        )
    ) or 0
    return TallyResult(items=items, total_week=int(total_week))
