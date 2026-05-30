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

from cryptography.fernet import MultiFernet
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.consent.ledger import (
    CURRENT_POLICY_TEXT,
    CURRENT_POLICY_VERSION,
    record_consent,
)
from app.core.contact.auto_detect import detect_contact
from app.core.leads.encryption import encrypt as fernet_encrypt
from app.infrastructure.postgres.models import Application, User
from app.utils.errors import DomainError, DomainResult, Err, Ok

# Kept as re-exports for backwards compatibility with T1.3 tests + any
# downstream import. The canonical source is ``core/consent/ledger.py``.
POLICY_VERSION: Final[int] = CURRENT_POLICY_VERSION
CONSENT_TEXT_V1: Final[str] = CURRENT_POLICY_TEXT

SUPPORTED_SOURCE_TYPES: Final[frozenset[str]] = frozenset({"ymaps", "telegram", "photo", "website"})


async def submit_application(
    *,
    session: AsyncSession,
    source_url: str | None,
    source_type: str,
    contact: str,
    consent_given: bool,
    ip: str | None,
    user_agent: str | None,
    mode: str = "link",
    description: str | None = None,
    city: str | None = None,
    customer_contact_type: str | None = None,
    customer_contact_value: str | None = None,
    fernet: MultiFernet | None = None,
) -> DomainResult[Application]:
    """Persist application + consent + user inside one transaction.

    Validation order (fail-fast):
      1. consent_given must be True
      2. source_type must be one of the MVP set
      3. contact must auto-detect to a known type
      4. mode='photo' → description (≥30), city, customer_contact_* all required

    Returns ``Ok(application)`` on success or ``Err(DomainError)`` on any
    of the failures above. Database constraint violations (e.g. unique
    contact) are translated to ``contact_conflict`` so they can be safely
    returned to the client.

    canon 0.3.0 — `mode` discriminates the two intake branches. For photo
    mode, the photo-branch fields are persisted alongside; the actual
    photo / text-file bytes are uploaded via the multipart sibling
    endpoints AFTER this service returns Ok(application).
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

    if mode not in ("link", "photo"):
        return Err(DomainError(code="invalid_mode"))

    # Photo-mode invariants: all four fields must be present.
    if mode == "photo":
        if not description or len(description.strip()) < 30:
            return Err(DomainError(code="description_too_short"))
        if not city:
            return Err(DomainError(code="city_required"))
        if customer_contact_type not in ("phone", "telegram"):
            return Err(DomainError(code="invalid_customer_contact_type"))
        if not customer_contact_value:
            return Err(DomainError(code="customer_contact_required"))

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

    # Fernet-encrypt the public customer_contact_value (PII; rendered on
    # the customer-site CTA so consent text covers both purposes). Reuses
    # the same MultiFernet as leads — single FERNET_KEYS env across the app.
    customer_contact_enc: bytes | None = None
    if mode == "photo" and customer_contact_value:
        if fernet is None:
            return Err(DomainError(code="fernet_not_initialised"))
        customer_contact_enc = fernet_encrypt(customer_contact_value, fernet=fernet)

    application = Application(
        mode=mode,
        source_url=source_url,
        source_type=source_type,
        description=description,
        city=city,
        customer_contact_type=customer_contact_type,
        customer_contact_value_enc=customer_contact_enc,
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
