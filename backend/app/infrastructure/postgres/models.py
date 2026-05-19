"""ORM models — SQLAlchemy 2.0 declarative.

This module is the canonical source of truth for the relational schema.
`backend/alembic/versions/0001_init.py` reflects the state defined here.

PII-bearing columns are marked in inline comments. Encrypted fields use the
`_enc` suffix and `LargeBinary` (BYTEA) — Fernet ciphertext is written by
the application layer (T5.2). Decryption is audit-logged (T5.3).

Cascade strategy (ФЗ-152 right-to-erasure compatible):
  - users → sites, feedback, applications, consents — `ON DELETE CASCADE`
    on the legal-evidence consents we instead SET NULL so the consent
    ledger survives the user record (SECURITY.md §9.3).
  - sites → leads, events, sync_runs — `ON DELETE CASCADE`.
  - admin_actions has no FK to users — the audit log is independent and
    retained for 1 year regardless of subject deletion.
"""

from __future__ import annotations

import uuid
from datetime import datetime
from typing import Any

from sqlalchemy import (
    BigInteger,
    Boolean,
    CheckConstraint,
    DateTime,
    ForeignKey,
    Index,
    Integer,
    LargeBinary,
    String,
    Text,
    UniqueConstraint,
    func,
)
from sqlalchemy.dialects.postgresql import INET, JSONB
from sqlalchemy.orm import Mapped, mapped_column

from app.infrastructure.postgres.base import Base, Timestamped, UUIDPrimaryKey

# =============================================================================
# users
# =============================================================================

CONTACT_TYPES = ("email", "phone", "telegram", "max")
USER_PLANS = ("trial", "pro", "expired", "cancelled")


class User(UUIDPrimaryKey, Timestamped, Base):
    """Mastered user / site owner. Identified by a single primary contact
    of one of four types (ADR-0008)."""

    contact_type: Mapped[str] = mapped_column(String(16), nullable=False)
    contact_value: Mapped[str] = mapped_column(Text, nullable=False)  # PII (Fernet for phone)
    contact_value_alt: Mapped[str | None] = mapped_column(Text, nullable=True)  # optional fallback
    contact_verified_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    plan: Mapped[str] = mapped_column(String(16), nullable=False, server_default="trial")
    plan_until: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    __table_args__ = (
        CheckConstraint(
            f"contact_type IN {CONTACT_TYPES!r}",
            name="users_contact_type_valid",
        ),
        CheckConstraint(
            f"plan IN {USER_PLANS!r}",
            name="users_plan_valid",
        ),
        UniqueConstraint("contact_type", "contact_value", name="users_contact_uq"),
    )


# =============================================================================
# sites
# =============================================================================

SOURCE_TYPES = ("ymaps", "telegram", "photo")  # extend per ADR-0009 waitlist
SITE_STATUSES = (
    "pending",  # application submitted, not yet processed
    "parsing",  # parser-worker running
    "generating",  # content-worker running
    "review",  # awaiting founder approval
    "published",  # live
    "sync_paused",  # 3 consecutive sync failures (FR-041)
    "archived",
)


class Site(UUIDPrimaryKey, Timestamped, Base):
    user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    subdomain: Mapped[str] = mapped_column(String(63), nullable=False)
    custom_domain: Mapped[str | None] = mapped_column(String(253), nullable=True)

    source_type: Mapped[str] = mapped_column(String(16), nullable=False)
    source_url: Mapped[str | None] = mapped_column(Text, nullable=True)

    status: Mapped[str] = mapped_column(String(16), nullable=False, server_default="pending")
    source_snapshot: Mapped[dict[str, Any] | None] = mapped_column(JSONB, nullable=True)
    generated_content: Mapped[dict[str, Any] | None] = mapped_column(JSONB, nullable=True)
    settings: Mapped[dict[str, Any]] = mapped_column(JSONB, nullable=False, server_default="{}")
    seo_submission_log: Mapped[dict[str, Any]] = mapped_column(  # T2.6
        JSONB, nullable=False, server_default="{}"
    )

    last_synced_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    published_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    __table_args__ = (
        CheckConstraint(
            f"source_type IN {SOURCE_TYPES!r}",
            name="sites_source_type_valid",
        ),
        CheckConstraint(
            f"status IN {SITE_STATUSES!r}",
            name="sites_status_valid",
        ),
        UniqueConstraint("subdomain", name="sites_subdomain_uq"),
        UniqueConstraint("custom_domain", name="sites_custom_domain_uq"),
    )


# =============================================================================
# leads
# =============================================================================

LEAD_STATUSES = ("new", "seen", "contacted", "archived", "spam")


class Lead(UUIDPrimaryKey, Timestamped, Base):
    """End-visitor lead. All PII fields are Fernet-encrypted application-side
    (ADR-0006); the column type is BYTEA so SQL injection on a read endpoint
    yields ciphertext, not plaintext."""

    site_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("sites.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    name_enc: Mapped[bytes] = mapped_column(LargeBinary, nullable=False)
    phone_enc: Mapped[bytes] = mapped_column(LargeBinary, nullable=False)
    message_enc: Mapped[bytes | None] = mapped_column(LargeBinary, nullable=True)

    status: Mapped[str] = mapped_column(String(16), nullable=False, server_default="new")

    ip: Mapped[str | None] = mapped_column(INET, nullable=True)  # PII — masked in logs
    user_agent: Mapped[str | None] = mapped_column(Text, nullable=True)

    __table_args__ = (
        CheckConstraint(
            f"status IN {LEAD_STATUSES!r}",
            name="leads_status_valid",
        ),
        Index("leads_created_at_idx", "created_at"),
    )


# =============================================================================
# events (analytics ingest, FR-? high-volume; BIGSERIAL not UUID)
# =============================================================================

EVENT_TYPES = ("pageview", "click_phone", "click_tg", "click_wa", "form_view", "form_submit")


class Event(Base):
    __tablename__ = "events"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    site_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("sites.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    event_type: Mapped[str] = mapped_column(String(32), nullable=False)
    payload: Mapped[dict[str, Any]] = mapped_column(JSONB, nullable=False, server_default="{}")
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
        index=True,
    )

    __table_args__ = (
        CheckConstraint(
            f"event_type IN {EVENT_TYPES!r}",
            name="events_event_type_valid",
        ),
    )


# =============================================================================
# consents (legal-evidence ledger; SET NULL on user delete per §9.3)
# =============================================================================


class Consent(UUIDPrimaryKey, Timestamped, Base):
    user_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("users.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )
    policy_version: Mapped[int] = mapped_column(Integer, nullable=False)
    consent_text: Mapped[str] = mapped_column(Text, nullable=False)
    ip: Mapped[str | None] = mapped_column(INET, nullable=True)  # PII evidence
    user_agent: Mapped[str | None] = mapped_column(Text, nullable=True)


# =============================================================================
# feedback (waitlist + general; ADR-0009)
# =============================================================================

FEEDBACK_TYPES = ("source_request", "feature_request", "bug", "general")


class Feedback(UUIDPrimaryKey, Timestamped, Base):
    __tablename__ = "feedback"  # uncountable; override Base's auto-pluralisation

    user_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("users.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )
    email: Mapped[str | None] = mapped_column(Text, nullable=True)  # PII when set
    type: Mapped[str] = mapped_column(String(32), nullable=False)
    source_name: Mapped[str | None] = mapped_column(  # waitlist canonical key (vk/ig/2gis/...)
        String(64), nullable=True, index=True
    )
    message: Mapped[str | None] = mapped_column(Text, nullable=True)
    checkboxes: Mapped[dict[str, Any]] = mapped_column(JSONB, nullable=False, server_default="{}")

    __table_args__ = (
        CheckConstraint(
            f"type IN {FEEDBACK_TYPES!r}",
            name="feedback_type_valid",
        ),
    )


# =============================================================================
# sync_runs (FR-040)
# =============================================================================

SYNC_STATUSES = ("running", "success", "no_change", "failure")


class SyncRun(UUIDPrimaryKey, Base):
    site_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("sites.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    status: Mapped[str] = mapped_column(String(16), nullable=False)
    diff_summary: Mapped[dict[str, Any] | None] = mapped_column(JSONB, nullable=True)
    started_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )
    finished_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    __table_args__ = (
        CheckConstraint(
            f"status IN {SYNC_STATUSES!r}",
            name="sync_runs_status_valid",
        ),
    )


# =============================================================================
# admin_actions (INSERT-only audit log; no UPDATE/DELETE granted to anyone)
# =============================================================================


class AdminAction(Base):
    """Immutable audit trail. `vitrina_audit_writer` is the only role with
    INSERT; nobody (including superuser of the app DB role) has UPDATE or
    DELETE on this table per SECURITY.md §7."""

    __tablename__ = "admin_actions"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    admin_id: Mapped[uuid.UUID] = mapped_column(nullable=False, index=True)
    action: Mapped[str] = mapped_column(String(64), nullable=False)
    target_type: Mapped[str | None] = mapped_column(String(32), nullable=True)
    target_id: Mapped[str | None] = mapped_column(String(64), nullable=True)
    params: Mapped[dict[str, Any]] = mapped_column(JSONB, nullable=False, server_default="{}")
    ip: Mapped[str | None] = mapped_column(INET, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
        index=True,
    )


# =============================================================================
# applications (FR-002 form submissions, before user is materialised)
# =============================================================================

APPLICATION_STATUSES = ("pending", "approved", "rejected", "fulfilled")


class Application(UUIDPrimaryKey, Timestamped, Base):
    source_url: Mapped[str | None] = mapped_column(Text, nullable=True)
    source_type: Mapped[str] = mapped_column(String(16), nullable=False)

    contact_type: Mapped[str] = mapped_column(String(16), nullable=False)
    contact_value: Mapped[str] = mapped_column(Text, nullable=False)  # PII

    consent_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("consents.id", ondelete="SET NULL"),
        nullable=True,
    )
    user_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("users.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )

    status: Mapped[str] = mapped_column(String(16), nullable=False, server_default="pending")
    rejection_reason: Mapped[str | None] = mapped_column(Text, nullable=True)
    is_manual_review: Mapped[bool] = mapped_column(Boolean, nullable=False, server_default="true")

    ip: Mapped[str | None] = mapped_column(INET, nullable=True)
    user_agent: Mapped[str | None] = mapped_column(Text, nullable=True)

    __table_args__ = (
        CheckConstraint(
            f"contact_type IN {CONTACT_TYPES!r}",
            name="applications_contact_type_valid",
        ),
        CheckConstraint(
            f"source_type IN {SOURCE_TYPES!r}",
            name="applications_source_type_valid",
        ),
        CheckConstraint(
            f"status IN {APPLICATION_STATUSES!r}",
            name="applications_status_valid",
        ),
        Index("applications_created_at_idx", "created_at"),
    )


# =============================================================================
# admin_credentials (single-row table — founder account; bcrypt + TOTP)
# =============================================================================


class AdminCredentials(UUIDPrimaryKey, Timestamped, Base):
    """Admin login material. Single row in MVP (founder). SECURITY.md §A07,
    T7.1: bcrypt cost=12 for password, base32 TOTP secret, eight bcrypt-
    hashed backup codes for TOTP-device-loss recovery."""

    __tablename__ = "admin_credentials"

    username: Mapped[str] = mapped_column(String(64), nullable=False)
    password_hash: Mapped[str] = mapped_column(Text, nullable=False)
    totp_secret: Mapped[str] = mapped_column(Text, nullable=False)  # base32
    backup_codes_hashes: Mapped[list[str]] = mapped_column(
        JSONB, nullable=False, server_default="[]"
    )
    last_login_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    __table_args__ = (UniqueConstraint("username", name="admin_credentials_username_uq"),)


__all__ = [
    "AdminAction",
    "AdminCredentials",
    "Application",
    "Base",
    "Consent",
    "Event",
    "Feedback",
    "Lead",
    "Site",
    "SyncRun",
    "User",
]
