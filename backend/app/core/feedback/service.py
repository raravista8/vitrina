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

import hashlib
import re
from dataclasses import dataclass, field
from datetime import UTC, datetime, timedelta
from typing import Any

from sqlalchemy import func, select
from sqlalchemy.dialects.postgresql import insert as pg_insert
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import get_settings
from app.core.consent.ledger import record_consent
from app.core.contact.auto_detect import validate_channel_value
from app.infrastructure.postgres.models import (
    Feedback,
    FeedbackSubmission,
    FeedbackThresholdAlert,
    FeedbackVote,
)
from app.utils.errors import DomainError, DomainResult, Err, Ok

# Vote-first modal abuse limits (ADR-0009 rev.2 / FEEDBACK_BACKEND.md §2).
VOTE_PER_IP_HOURLY_CAP = 20  # votes (not requests) per IP per hour
VOTE_DEDUPE_DAYS = 30  # ignore a (voter, option_key) repeat within this window
VOTE_THRESHOLD = 10  # distinct voters that trigger the founder alert

# Consent basis snapshot recorded when a voter leaves a contact (the modal
# shows this promise next to the optional contact block — canon 0.9.0).
_VOTE_CONSENT_TEXT = (
    "Согласие на обработку контакта для уведомления о запуске запрошенного "
    "пункта (Самосайт, форма «Чего не хватает?»). Контакт не передаётся "
    "третьим лицам и не используется для рассылок."
)


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

# Причина отказа — слаг из консьерж-таблицы founder'а. Пока таблица не
# заморожена, принимаем любой слаг корректной формы; после заморозки —
# сузить до кортежа кодов (одно место правки).
# TODO(founder): заменить None на кортеж кодов консьерж-таблицы (ТЗ §4).
FEEDBACK_V2_REASON_CODES: tuple[str, ...] | None = None
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
# Vote-first modal (canon 0.9.0 / ADR-0009 rev.2)
# ===========================================================================
#
# Returns plain dataclasses (not api schemas) — the router maps them to the
# Pydantic response. Keeps core/ from importing api/ (import-linter).


@dataclass(frozen=True)
class TallyResult:
    items: dict[str, int]  # option_key → distinct-voter count
    total_week: int


@dataclass(frozen=True)
class VotesResult:
    accepted: int
    crossed_keys: list[str] = field(default_factory=list)  # keys that just hit 10
    tally: TallyResult = field(default_factory=lambda: TallyResult({}, 0))


def hash_ip(ip: str | None) -> str | None:
    """Salted SHA-256 of the client IP — stable per IP for dedupe/cap, but
    not reversible to the raw address. Salt = the always-present session
    secret (no new config). Raw IP is never persisted."""
    if not ip:
        return None
    salt = get_settings().session_secret_key
    return hashlib.sha256(f"{salt}:{ip}".encode()).hexdigest()


# Distinct voter = the contact (lower-cased) if given, else the ip_hash.
_VOTER_KEY = func.coalesce(func.lower(FeedbackSubmission.contact), FeedbackSubmission.ip_hash)


async def get_tally(session: AsyncSession) -> TallyResult:
    """Distinct-voter count per option_key + total votes in the trailing 7d.
    Cheap + cacheable (router caches in Redis)."""
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


async def _distinct_voters_for_key(session: AsyncSession, option_key: str) -> int:
    count = (
        await session.scalar(
            select(func.count(func.distinct(_VOTER_KEY)))
            .select_from(FeedbackVote)
            .join(FeedbackSubmission, FeedbackVote.submission_id == FeedbackSubmission.id)
            .where(FeedbackVote.option_key == option_key)
        )
    ) or 0
    return int(count)


async def submit_votes(
    *,
    session: AsyncSession,
    votes: list[tuple[str, str]],  # (kind, option_key)
    own_source: str | None = None,
    own_feature: str | None = None,
    message: str | None = None,
    name: str | None = None,
    contact: str | None = None,
    ip: str | None = None,
    user_agent: str | None = None,
) -> VotesResult:
    """Persist one modal submit: a `feedback_submission` + N `feedback_vote`
    rows. Idempotent + abuse-resistant per FEEDBACK_BACKEND.md §2:

      - per-IP cap: ≤ ``VOTE_PER_IP_HOURLY_CAP`` *votes*/hour/IP — excess
        silently dropped (still counts as a success; never an error).
      - dedupe: a (voter, option_key) already voted within
        ``VOTE_DEDUPE_DAYS`` is not re-inserted, but still reported accepted
        (idempotent — the user never sees an error).
      - own_source/own_feature free-text → legacy `feedback` rows so they
        flow into the existing admin inbox + waitlist aggregation.
      - consent recorded only when a contact is supplied (PII).
      - crossing ``VOTE_THRESHOLD`` distinct voters on an option_key is
        reported in ``crossed_keys`` exactly once (idempotency table).

    Never returns an error for a well-formed batch — the modal is a
    foot-in-the-door, so we always 200.
    """
    now = datetime.now(UTC)
    ip_hash = hash_ip(ip)
    contact_norm = contact.strip() if contact and contact.strip() else None
    voter_key = (contact_norm.lower() if contact_norm else None) or ip_hash

    # Per-IP hourly cap — count votes already cast from this IP in the window.
    remaining = VOTE_PER_IP_HOURLY_CAP
    if ip_hash:
        recent = (
            await session.scalar(
                select(func.count())
                .select_from(FeedbackVote)
                .join(FeedbackSubmission, FeedbackVote.submission_id == FeedbackSubmission.id)
                .where(FeedbackSubmission.ip_hash == ip_hash)
                .where(FeedbackVote.created_at >= now - timedelta(hours=1))
            )
        ) or 0
        remaining = max(0, VOTE_PER_IP_HOURLY_CAP - int(recent))

    submission = FeedbackSubmission(
        name=(name.strip() if name and name.strip() else None),
        contact=contact_norm,
        message=(message.strip() if message and message.strip() else None),
        ip_hash=ip_hash,
    )
    session.add(submission)
    await session.flush()  # assign submission.id

    accepted = 0
    inserted = 0
    affected: set[str] = set()
    for kind, key in votes:
        affected.add(key)
        # Dedupe against prior submissions (not the current one — the modal
        # never sends the same key twice in one batch).
        if voter_key:
            dup = (
                await session.scalar(
                    select(func.count())
                    .select_from(FeedbackVote)
                    .join(
                        FeedbackSubmission,
                        FeedbackVote.submission_id == FeedbackSubmission.id,
                    )
                    .where(FeedbackVote.option_key == key)
                    .where(FeedbackVote.created_at >= now - timedelta(days=VOTE_DEDUPE_DAYS))
                    .where(_VOTER_KEY == voter_key)  # noqa: SIM300 — SQLAlchemy column op, not a bool
                )
            ) or 0
            if dup:
                accepted += 1  # idempotent — count it, don't double-insert
                continue
        if inserted >= remaining:
            continue  # over per-IP cap → silently drop (still 200)
        session.add(FeedbackVote(submission_id=submission.id, kind=kind, option_key=key))
        inserted += 1
        accepted += 1

    # Free-text «+ свой вариант» → legacy feedback rows (existing inbox/waitlist).
    if own_source and own_source.strip():
        session.add(
            Feedback(type="source_request", message=own_source.strip()[:4096], checkboxes={})
        )
        accepted += 1
    if own_feature and own_feature.strip():
        session.add(
            Feedback(type="feature_request", message=own_feature.strip()[:4096], checkboxes={})
        )
        accepted += 1

    # Consent — only when PII (a contact) is collected.
    if contact_norm:
        await record_consent(
            session=session,
            user_id=None,
            ip=ip,
            user_agent=user_agent,
            consent_text=_VOTE_CONSENT_TEXT,
        )

    await session.flush()

    # Threshold: report each key that just reached VOTE_THRESHOLD distinct
    # voters, exactly once (ON CONFLICT DO NOTHING on the alert table).
    crossed: list[str] = []
    for key in affected:
        if await _distinct_voters_for_key(session, key) >= VOTE_THRESHOLD:
            # RETURNING distinguishes a real insert (just crossed) from an
            # ON CONFLICT no-op (already alerted) — concurrency-safe + typed.
            inserted_key = await session.scalar(
                pg_insert(FeedbackThresholdAlert)
                .values(option_key=key)
                .on_conflict_do_nothing(index_elements=["option_key"])
                .returning(FeedbackThresholdAlert.option_key)
            )
            if inserted_key is not None:
                crossed.append(key)

    await session.commit()
    tally = await get_tally(session)
    return VotesResult(accepted=accepted, crossed_keys=crossed, tally=tally)
