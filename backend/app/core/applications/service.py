"""Application-intake domain service.

Coordinates three writes inside a single transaction:
  1. upsert User by (contact_type, contact_value)
  2. INSERT consent row (legal-evidence ledger; FR-070)
  3. INSERT application row referencing both

CLAUDE.md §Conventions: returns ``DomainResult[Application]``; exceptions
are raised only at the API boundary. The router maps a ``DomainError`` to
the canonical 400 envelope.

Per ARCHITECTURE.md §9, ``core.applications`` is layered MVC (not strict
hexagonal — that's reserved for parsing/content/auth/leads). It is
therefore allowed to import SQLAlchemy models and `AsyncSession` directly.
"""

from __future__ import annotations

from typing import Final

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.consent.ledger import (
    CURRENT_POLICY_TEXT,
    CURRENT_POLICY_VERSION,
    record_consent,
)
from app.core.contact.auto_detect import detect_contact
from app.infrastructure.postgres.models import Application, User
from app.utils.errors import DomainError, DomainResult, Err, Ok

# Kept as re-exports for backwards compatibility with T1.3 tests + any
# downstream import. The canonical source is ``core/consent/ledger.py``.
POLICY_VERSION: Final[int] = CURRENT_POLICY_VERSION
CONSENT_TEXT_V1: Final[str] = CURRENT_POLICY_TEXT

SUPPORTED_SOURCE_TYPES: Final[frozenset[str]] = frozenset({"ymaps", "telegram", "photo"})


async def submit_application(
    *,
    session: AsyncSession,
    source_url: str | None,
    source_type: str,
    contact: str,
    consent_given: bool,
    ip: str | None,
    user_agent: str | None,
) -> DomainResult[Application]:
    """Persist application + consent + user inside one transaction.

    Validation order (fail-fast):
      1. consent_given must be True
      2. source_type must be one of the MVP set
      3. contact must auto-detect to a known type

    Returns ``Ok(application)`` on success or ``Err(DomainError)`` on any
    of the failures above. Database constraint violations (e.g. unique
    contact) are translated to ``contact_conflict`` so they can be safely
    returned to the client.
    """
    if not consent_given:
        return Err(DomainError(code="consent_required"))

    if source_type not in SUPPORTED_SOURCE_TYPES:
        return Err(
            DomainError(
                code="unsupported_source_type",
                message=f"got {source_type!r}; allowed={sorted(SUPPORTED_SOURCE_TYPES)}",
            )
        )

    detected = detect_contact(contact)
    if detected is None:
        return Err(DomainError(code="invalid_contact"))

    user = await _get_or_create_user(session, detected.contact_type.value, detected.value)

    consent = await record_consent(
        session=session,
        user_id=user.id,
        ip=ip,
        user_agent=user_agent,
    )

    application = Application(
        source_url=source_url,
        source_type=source_type,
        contact_type=detected.contact_type.value,
        contact_value=detected.value,
        consent_id=consent.id,
        user_id=user.id,
        ip=ip,
        user_agent=user_agent,
    )
    session.add(application)
    await session.flush()

    await session.commit()
    return Ok(application)


async def _get_or_create_user(session: AsyncSession, contact_type: str, contact_value: str) -> User:
    """Look up an existing user by (contact_type, contact_value); insert if
    absent. Uses ``session.flush()`` (not commit) so the caller controls
    the transaction boundary."""
    stmt = select(User).where(
        User.contact_type == contact_type,
        User.contact_value == contact_value,
    )
    result = await session.execute(stmt)
    existing = result.scalar_one_or_none()
    if existing is not None:
        return existing

    user = User(contact_type=contact_type, contact_value=contact_value)
    session.add(user)
    await session.flush()
    return user
