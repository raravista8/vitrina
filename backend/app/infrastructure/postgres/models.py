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
from datetime import date as date_type
from datetime import datetime
from typing import Any, Final

from sqlalchemy import (
    BigInteger,
    Boolean,
    CheckConstraint,
    Date,
    DateTime,
    ForeignKey,
    Index,
    Integer,
    LargeBinary,
    String,
    Text,
    UniqueConstraint,
    func,
    text,
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

    # Set by `POST /admin/api/waitlist/{source}/mark-in-development` when
    # a founder takes a source request into development. Filters the row
    # out of the public waitlist aggregation. Soft archive — keeps the
    # underlying vote for audit; no UI to unmark today (manual SQL only).
    marked_in_development_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), nullable=True
    )

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
# application_photos (PR-B #6 — multipart upload manifest)
# =============================================================================

APPLICATION_PHOTO_TYPES = (
    "work",
    "profile_screenshot",
    "business_card",
    "booklet",
    "unknown",
)


class ApplicationPhoto(UUIDPrimaryKey, Base):
    """One uploaded photo for a `source_type='photo'` Application.

    Bytes themselves live on disk under ``UPLOADS_DIR/<application_id>/``
    so this table stays cheap — magic-byte validation + size limits are
    enforced at the API boundary before any row lands here (FR-014/015).
    """

    __tablename__ = "application_photos"

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )

    application_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("applications.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    index: Mapped[int] = mapped_column(Integer, nullable=False)
    filename: Mapped[str] = mapped_column(Text, nullable=False)
    photo_type: Mapped[str] = mapped_column(String(32), nullable=False, server_default="unknown")
    mime: Mapped[str] = mapped_column(String(32), nullable=False)
    size_bytes: Mapped[int] = mapped_column(BigInteger, nullable=False)
    disk_path: Mapped[str] = mapped_column(Text, nullable=False)

    __table_args__ = (
        CheckConstraint("index >= 0", name="application_photos_index_nonneg"),
        CheckConstraint(
            f"photo_type IN {APPLICATION_PHOTO_TYPES!r}",
            name="application_photos_photo_type_enum",
        ),
        CheckConstraint("size_bytes > 0", name="application_photos_size_positive"),
        UniqueConstraint(
            "application_id",
            "index",
            name="uq_application_photos_app_index",
        ),
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


# =============================================================================
# generation_audits (T4.5 — full prompt+response for the first 100 sites)
# =============================================================================

GENERATION_AUDIT_STATUSES = ("success", "failed", "flagged")


class GenerationAudit(UUIDPrimaryKey, Base):
    """Audit log for LLM generation runs.

    For the first 100 rows: ``system_prompt`` / ``user_prompt`` /
    ``response_text`` carry the full strings. After row 100 the worker
    switches to truncated logging (these columns are NULL) and only
    token counts + flags survive — see SECURITY.md §B6.3.
    """

    site_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("sites.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    prompt_version: Mapped[int] = mapped_column(Integer, nullable=False)
    model_name: Mapped[str] = mapped_column(String(64), nullable=False)

    system_prompt: Mapped[str | None] = mapped_column(Text, nullable=True)
    user_prompt: Mapped[str | None] = mapped_column(Text, nullable=True)
    response_text: Mapped[str | None] = mapped_column(Text, nullable=True)

    tokens_in: Mapped[int] = mapped_column(Integer, nullable=False, server_default="0")
    tokens_out: Mapped[int] = mapped_column(Integer, nullable=False, server_default="0")
    pii_masked_count: Mapped[int] = mapped_column(Integer, nullable=False, server_default="0")

    safety_flags: Mapped[list[Any]] = mapped_column(JSONB, nullable=False, server_default="[]")
    status: Mapped[str] = mapped_column(String(16), nullable=False, server_default="success")
    error_message: Mapped[str | None] = mapped_column(Text, nullable=True)

    __table_args__ = (
        CheckConstraint(
            f"status IN {GENERATION_AUDIT_STATUSES!r}",
            name="generation_audits_status_valid",
        ),
    )


# =============================================================================
# deletion_requests (T6.2 — ФЗ-152 right-to-erasure)
# =============================================================================

DELETION_REQUEST_STATUSES = (
    "pending",
    "confirmed",
    "completed",
    "expired",
    "rejected",
)


class DeletionRequest(UUIDPrimaryKey, Base):
    """Lifecycle of an erasure request per FR-071 / SECURITY.md §9.3.

    The row itself is retained 3 years after ``completed_at`` so the
    operator can prove the request was honoured. Only the linked PII
    (User + Sites + Leads + Feedback + Applications) gets purged.
    """

    user_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("users.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )

    contact_type: Mapped[str] = mapped_column(String(16), nullable=False)
    contact_value: Mapped[str] = mapped_column(Text, nullable=False)  # PII at-request-time
    token_hash: Mapped[str] = mapped_column(Text, nullable=False, unique=True)

    status: Mapped[str] = mapped_column(String(16), nullable=False, server_default="pending")
    confirmed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    completed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)

    ip: Mapped[str | None] = mapped_column(INET, nullable=True)
    user_agent: Mapped[str | None] = mapped_column(Text, nullable=True)

    __table_args__ = (
        CheckConstraint(
            f"status IN {DELETION_REQUEST_STATUSES!r}",
            name="deletion_requests_status_valid",
        ),
        CheckConstraint(
            f"contact_type IN {CONTACT_TYPES!r}",
            name="deletion_requests_contact_type_valid",
        ),
    )


# =============================================================================
# subscriptions + billing_events (T9.1 ЮKassa)
# =============================================================================

SUBSCRIPTION_STATUSES = ("trial", "active", "past_due", "cancelled", "refunded")


class Subscription(UUIDPrimaryKey, Timestamped, Base):
    """One row per user — `user_id` is unique. State machine: trial →
    active → past_due → cancelled / refunded. ``trial_ends_at`` is set
    at creation to ``now() + 30d``; the worker flips to ``active`` on
    the first successful ``payment.succeeded`` webhook."""

    user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    status: Mapped[str] = mapped_column(String(16), nullable=False, server_default="trial")
    plan_code: Mapped[str] = mapped_column(String(32), nullable=False, server_default="pro")
    amount_kopeks: Mapped[int] = mapped_column(Integer, nullable=False, server_default="99000")
    currency: Mapped[str] = mapped_column(String(3), nullable=False, server_default="RUB")

    # ЮKassa "saved card" id — needed to charge recurring payments without
    # re-asking the user for card details. NULL until the first charge.
    payment_method_id: Mapped[str | None] = mapped_column(Text, nullable=True)

    trial_ends_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    current_period_end: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    cancelled_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    cancel_reason: Mapped[str | None] = mapped_column(String(64), nullable=True)
    last_payment_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    failed_charge_count: Mapped[int] = mapped_column(Integer, nullable=False, server_default="0")

    __table_args__ = (
        CheckConstraint(
            f"status IN {SUBSCRIPTION_STATUSES!r}",
            name="subscriptions_status_valid",
        ),
        UniqueConstraint("user_id", name="subscriptions_user_uq"),
    )


BILLING_EVENT_PROVIDERS = ("yookassa",)


class BillingEvent(UUIDPrimaryKey, Base):
    """Append-only log of provider webhooks. Each event is processed
    exactly once thanks to the ``provider_event_id`` unique index —
    ЮKassa retries the same event with the same ID, so dup inserts
    fail loudly instead of double-charging."""

    subscription_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("subscriptions.id", ondelete="CASCADE"),
        nullable=True,
        index=True,
    )
    provider: Mapped[str] = mapped_column(String(16), nullable=False, server_default="yookassa")
    event_type: Mapped[str] = mapped_column(String(64), nullable=False)
    provider_event_id: Mapped[str | None] = mapped_column(Text, nullable=True, unique=True)
    amount_kopeks: Mapped[int | None] = mapped_column(Integer, nullable=True)
    payload: Mapped[dict[str, Any]] = mapped_column(JSONB, nullable=False, server_default="{}")
    processed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    processing_error: Mapped[str | None] = mapped_column(Text, nullable=True)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
        index=True,
    )

    __table_args__ = (
        CheckConstraint(
            f"provider IN {BILLING_EVENT_PROVIDERS!r}",
            name="billing_events_provider_valid",
        ),
    )


# --- Phase 7b — Analytics aggregation -------------------------------------


# Channels через которые отправляется weekly digest. Source of truth — это
# `users.contact_type` enum (`telegram`/`max`/`email` plus `sms` fallback).
ANALYTICS_DIGEST_CHANNELS: Final[tuple[str, ...]] = ("telegram", "max", "email", "sms")


class SiteAnalytics(Base):
    """Daily aggregated counts per site — нагрузка query'ев аналитики
    из `events` table становится unbounded когда site накапливает млн
    pageview's. Pre-aggregation в nightly job + индексированный
    range-scan для `GET /api/admin/analytics?range=30d`.

    Idempotency: composite PK (site_id, date) — повторный run aggregation
    job over the same day генерит `INSERT ... ON CONFLICT DO UPDATE`.
    """

    __tablename__ = "site_analytics"

    site_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("sites.id", ondelete="CASCADE"),
        primary_key=True,
        nullable=False,
    )
    date: Mapped[date_type] = mapped_column(Date, primary_key=True, nullable=False)
    visits: Mapped[int] = mapped_column(Integer, nullable=False, server_default="0")
    unique_visitors: Mapped[int] = mapped_column(Integer, nullable=False, server_default="0")
    leads: Mapped[int] = mapped_column(Integer, nullable=False, server_default="0")
    source_breakdown: Mapped[dict[str, Any]] = mapped_column(
        JSONB,
        nullable=False,
        server_default=text("'{}'::jsonb"),
    )


class SiteAnalyticsDigestLog(Base):
    """Append-only delivery log для cron `weekly_analytics_digest`.

    Используется чтобы избежать double-send при cron-overlap или
    manual re-trigger из admin UI. Cron job делает
    `WHERE NOT EXISTS (... sent_at > now() - interval '6 days')`
    перед каждым delivery.
    """

    __tablename__ = "site_analytics_digest_log"

    site_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("sites.id", ondelete="CASCADE"),
        primary_key=True,
        nullable=False,
    )
    sent_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        primary_key=True,
        nullable=False,
        server_default=func.now(),
    )
    channel: Mapped[str] = mapped_column(String(16), nullable=False)

    __table_args__ = (
        CheckConstraint(
            f"channel IN {ANALYTICS_DIGEST_CHANNELS!r}",
            name="site_analytics_digest_log_channel_valid",
        ),
    )


__all__ = [
    "AdminAction",
    "AdminCredentials",
    "Application",
    "Base",
    "BillingEvent",
    "Consent",
    "DeletionRequest",
    "Event",
    "Feedback",
    "GenerationAudit",
    "Lead",
    "Site",
    "SiteAnalytics",
    "SiteAnalyticsDigestLog",
    "Subscription",
    "SyncRun",
    "User",
]
