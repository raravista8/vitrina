"""Feedback persistence service (T1.7).

Layered MVC per ARCHITECTURE.md §9 — feedback is not on the
hexagonal-critical-path list, so the service may import SQLAlchemy
directly.

Three responsibilities:
  1. Validate consent_given.
  2. Stash source_url alongside checkboxes (the model has no
     source_url column on purpose — keeps JSONB the single place to
     evolve waitlist payloads without a migration per source).
  3. Insert one Feedback row.

Founder notification is the router's responsibility (consistent with
applications: side-effects live at the API boundary, persistence at the
service boundary).
"""

from __future__ import annotations

from typing import Any

from sqlalchemy.ext.asyncio import AsyncSession

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
) -> DomainResult[Feedback]:
    if not consent_given:
        return Err(DomainError(code="consent_required"))

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
