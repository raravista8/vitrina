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

from typing import Any

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.consent.ledger import record_consent
from app.infrastructure.postgres.models import Feedback
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
