"""Initial schema: users, sites, leads, events, consents, feedback,
sync_runs, admin_actions, applications + per-role GRANTs.

Revision ID: 0001
Revises:
Create Date: 2026-05-19

The schema is the single source of truth at `app.infrastructure.postgres.models`.
This migration mirrors that state verbatim. Subsequent migrations land as
delta files in this directory.
"""

from __future__ import annotations

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = "0001"
down_revision: str | Sequence[str] | None = None
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


# --- enum-equivalent CHECK constraint values (kept in sync with models.py) ---
CONTACT_TYPES = ("email", "phone", "telegram", "max")
USER_PLANS = ("trial", "pro", "expired", "cancelled")
SOURCE_TYPES = ("ymaps", "telegram", "photo")
SITE_STATUSES = (
    "pending",
    "parsing",
    "generating",
    "review",
    "published",
    "sync_paused",
    "archived",
)
LEAD_STATUSES = ("new", "seen", "contacted", "archived", "spam")
EVENT_TYPES = ("pageview", "click_phone", "click_tg", "click_wa", "form_view", "form_submit")
FEEDBACK_TYPES = ("source_request", "feature_request", "bug", "general")
SYNC_STATUSES = ("running", "success", "no_change", "failure")
APPLICATION_STATUSES = ("pending", "approved", "rejected", "fulfilled")


def _uuid_pk() -> sa.Column[postgresql.UUID]:
    return sa.Column(
        "id",
        postgresql.UUID(as_uuid=True),
        primary_key=True,
        server_default=sa.text("gen_random_uuid()"),
    )


def _created_at(*, index: bool = False) -> sa.Column[sa.DateTime]:
    return sa.Column(
        "created_at",
        sa.DateTime(timezone=True),
        nullable=False,
        server_default=sa.func.now(),
        index=index,
    )


def upgrade() -> None:
    # ---- users -------------------------------------------------------------
    op.create_table(
        "users",
        _uuid_pk(),
        _created_at(),
        sa.Column("contact_type", sa.String(16), nullable=False),
        sa.Column("contact_value", sa.Text, nullable=False),
        sa.Column("contact_value_alt", sa.Text, nullable=True),
        sa.Column("contact_verified_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("plan", sa.String(16), nullable=False, server_default="trial"),
        sa.Column("plan_until", sa.DateTime(timezone=True), nullable=True),
        sa.CheckConstraint(
            f"contact_type IN {CONTACT_TYPES!r}", name="users_contact_type_valid"
        ),
        sa.CheckConstraint(f"plan IN {USER_PLANS!r}", name="users_plan_valid"),
        sa.UniqueConstraint("contact_type", "contact_value", name="users_contact_uq"),
    )

    # ---- sites -------------------------------------------------------------
    op.create_table(
        "sites",
        _uuid_pk(),
        _created_at(),
        sa.Column(
            "user_id",
            postgresql.UUID(as_uuid=True),
            sa.ForeignKey("users.id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column("subdomain", sa.String(63), nullable=False),
        sa.Column("custom_domain", sa.String(253), nullable=True),
        sa.Column("source_type", sa.String(16), nullable=False),
        sa.Column("source_url", sa.Text, nullable=True),
        sa.Column("status", sa.String(16), nullable=False, server_default="pending"),
        sa.Column("source_snapshot", postgresql.JSONB, nullable=True),
        sa.Column("generated_content", postgresql.JSONB, nullable=True),
        sa.Column("settings", postgresql.JSONB, nullable=False, server_default="{}"),
        sa.Column("seo_submission_log", postgresql.JSONB, nullable=False, server_default="{}"),
        sa.Column("last_synced_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("published_at", sa.DateTime(timezone=True), nullable=True),
        sa.CheckConstraint(
            f"source_type IN {SOURCE_TYPES!r}", name="sites_source_type_valid"
        ),
        sa.CheckConstraint(f"status IN {SITE_STATUSES!r}", name="sites_status_valid"),
        sa.UniqueConstraint("subdomain", name="sites_subdomain_uq"),
        sa.UniqueConstraint("custom_domain", name="sites_custom_domain_uq"),
    )
    op.create_index("ix_sites_user_id", "sites", ["user_id"])

    # ---- leads -------------------------------------------------------------
    op.create_table(
        "leads",
        _uuid_pk(),
        _created_at(),
        sa.Column(
            "site_id",
            postgresql.UUID(as_uuid=True),
            sa.ForeignKey("sites.id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column("name_enc", sa.LargeBinary, nullable=False),
        sa.Column("phone_enc", sa.LargeBinary, nullable=False),
        sa.Column("message_enc", sa.LargeBinary, nullable=True),
        sa.Column("status", sa.String(16), nullable=False, server_default="new"),
        sa.Column("ip", postgresql.INET, nullable=True),
        sa.Column("user_agent", sa.Text, nullable=True),
        sa.CheckConstraint(f"status IN {LEAD_STATUSES!r}", name="leads_status_valid"),
    )
    op.create_index("ix_leads_site_id", "leads", ["site_id"])
    op.create_index("leads_created_at_idx", "leads", ["created_at"])

    # ---- events (BIGSERIAL) -----------------------------------------------
    op.create_table(
        "events",
        sa.Column("id", sa.BigInteger, primary_key=True, autoincrement=True),
        sa.Column(
            "site_id",
            postgresql.UUID(as_uuid=True),
            sa.ForeignKey("sites.id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column("event_type", sa.String(32), nullable=False),
        sa.Column("payload", postgresql.JSONB, nullable=False, server_default="{}"),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.func.now(),
        ),
        sa.CheckConstraint(
            f"event_type IN {EVENT_TYPES!r}", name="events_event_type_valid"
        ),
    )
    op.create_index("ix_events_site_id", "events", ["site_id"])
    op.create_index("ix_events_created_at", "events", ["created_at"])

    # ---- consents ----------------------------------------------------------
    op.create_table(
        "consents",
        _uuid_pk(),
        _created_at(),
        sa.Column(
            "user_id",
            postgresql.UUID(as_uuid=True),
            sa.ForeignKey("users.id", ondelete="SET NULL"),
            nullable=True,
        ),
        sa.Column("policy_version", sa.Integer, nullable=False),
        sa.Column("consent_text", sa.Text, nullable=False),
        sa.Column("ip", postgresql.INET, nullable=True),
        sa.Column("user_agent", sa.Text, nullable=True),
    )
    op.create_index("ix_consents_user_id", "consents", ["user_id"])

    # ---- feedback ----------------------------------------------------------
    op.create_table(
        "feedback",
        _uuid_pk(),
        _created_at(),
        sa.Column(
            "user_id",
            postgresql.UUID(as_uuid=True),
            sa.ForeignKey("users.id", ondelete="SET NULL"),
            nullable=True,
        ),
        sa.Column("email", sa.Text, nullable=True),
        sa.Column("type", sa.String(32), nullable=False),
        sa.Column("source_name", sa.String(64), nullable=True),
        sa.Column("message", sa.Text, nullable=True),
        sa.Column("checkboxes", postgresql.JSONB, nullable=False, server_default="{}"),
        sa.CheckConstraint(f"type IN {FEEDBACK_TYPES!r}", name="feedback_type_valid"),
    )
    op.create_index("ix_feedback_user_id", "feedback", ["user_id"])
    op.create_index("ix_feedback_source_name", "feedback", ["source_name"])

    # ---- sync_runs ---------------------------------------------------------
    op.create_table(
        "sync_runs",
        _uuid_pk(),
        sa.Column(
            "site_id",
            postgresql.UUID(as_uuid=True),
            sa.ForeignKey("sites.id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column("status", sa.String(16), nullable=False),
        sa.Column("diff_summary", postgresql.JSONB, nullable=True),
        sa.Column(
            "started_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.func.now(),
        ),
        sa.Column("finished_at", sa.DateTime(timezone=True), nullable=True),
        sa.CheckConstraint(
            f"status IN {SYNC_STATUSES!r}", name="sync_runs_status_valid"
        ),
    )
    op.create_index("ix_sync_runs_site_id", "sync_runs", ["site_id"])

    # ---- admin_actions (INSERT-only audit log; no FK to users) -------------
    op.create_table(
        "admin_actions",
        sa.Column("id", sa.BigInteger, primary_key=True, autoincrement=True),
        sa.Column("admin_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("action", sa.String(64), nullable=False),
        sa.Column("target_type", sa.String(32), nullable=True),
        sa.Column("target_id", sa.String(64), nullable=True),
        sa.Column("params", postgresql.JSONB, nullable=False, server_default="{}"),
        sa.Column("ip", postgresql.INET, nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.func.now(),
        ),
    )
    op.create_index("ix_admin_actions_admin_id", "admin_actions", ["admin_id"])
    op.create_index("ix_admin_actions_created_at", "admin_actions", ["created_at"])

    # ---- applications ------------------------------------------------------
    op.create_table(
        "applications",
        _uuid_pk(),
        _created_at(),
        sa.Column("source_url", sa.Text, nullable=True),
        sa.Column("source_type", sa.String(16), nullable=False),
        sa.Column("contact_type", sa.String(16), nullable=False),
        sa.Column("contact_value", sa.Text, nullable=False),
        sa.Column(
            "consent_id",
            postgresql.UUID(as_uuid=True),
            sa.ForeignKey("consents.id", ondelete="SET NULL"),
            nullable=True,
        ),
        sa.Column(
            "user_id",
            postgresql.UUID(as_uuid=True),
            sa.ForeignKey("users.id", ondelete="SET NULL"),
            nullable=True,
        ),
        sa.Column("status", sa.String(16), nullable=False, server_default="pending"),
        sa.Column("rejection_reason", sa.Text, nullable=True),
        sa.Column("is_manual_review", sa.Boolean, nullable=False, server_default="true"),
        sa.Column("ip", postgresql.INET, nullable=True),
        sa.Column("user_agent", sa.Text, nullable=True),
        sa.CheckConstraint(
            f"contact_type IN {CONTACT_TYPES!r}",
            name="applications_contact_type_valid",
        ),
        sa.CheckConstraint(
            f"source_type IN {SOURCE_TYPES!r}",
            name="applications_source_type_valid",
        ),
        sa.CheckConstraint(
            f"status IN {APPLICATION_STATUSES!r}", name="applications_status_valid"
        ),
    )
    op.create_index("ix_applications_user_id", "applications", ["user_id"])
    op.create_index("applications_created_at_idx", "applications", ["created_at"])

    # ---- Role grants -------------------------------------------------------
    # The roles themselves are created by `infra/postgres/init/01_roles.sql`
    # on the very first `docker-entrypoint`. This block grants table-level
    # privileges per SECURITY.md T4.2:
    #
    #   - vitrina_app          SELECT/INSERT/UPDATE/DELETE on app tables
    #   - vitrina_readonly     SELECT on every table (for analytics views)
    #   - vitrina_audit_writer INSERT only on admin_actions
    op.execute(
        """
        DO $$
        BEGIN
            IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'vitrina_app') THEN
                GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public
                    TO vitrina_app;
                GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO vitrina_app;
                ALTER DEFAULT PRIVILEGES IN SCHEMA public
                    GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO vitrina_app;
                ALTER DEFAULT PRIVILEGES IN SCHEMA public
                    GRANT USAGE, SELECT ON SEQUENCES TO vitrina_app;

                -- admin_actions is INSERT-only even for the main app role.
                REVOKE UPDATE, DELETE ON admin_actions FROM vitrina_app;
            END IF;

            IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'vitrina_readonly') THEN
                GRANT SELECT ON ALL TABLES IN SCHEMA public TO vitrina_readonly;
                ALTER DEFAULT PRIVILEGES IN SCHEMA public
                    GRANT SELECT ON TABLES TO vitrina_readonly;
            END IF;

            IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'vitrina_audit_writer') THEN
                GRANT INSERT ON admin_actions TO vitrina_audit_writer;
                GRANT USAGE, SELECT ON SEQUENCE admin_actions_id_seq
                    TO vitrina_audit_writer;
            END IF;
        END
        $$;
        """
    )


def downgrade() -> None:
    op.drop_index("applications_created_at_idx", table_name="applications")
    op.drop_index("ix_applications_user_id", table_name="applications")
    op.drop_table("applications")

    op.drop_index("ix_admin_actions_created_at", table_name="admin_actions")
    op.drop_index("ix_admin_actions_admin_id", table_name="admin_actions")
    op.drop_table("admin_actions")

    op.drop_index("ix_sync_runs_site_id", table_name="sync_runs")
    op.drop_table("sync_runs")

    op.drop_index("ix_feedback_source_name", table_name="feedback")
    op.drop_index("ix_feedback_user_id", table_name="feedback")
    op.drop_table("feedback")

    op.drop_index("ix_consents_user_id", table_name="consents")
    op.drop_table("consents")

    op.drop_index("ix_events_created_at", table_name="events")
    op.drop_index("ix_events_site_id", table_name="events")
    op.drop_table("events")

    op.drop_index("leads_created_at_idx", table_name="leads")
    op.drop_index("ix_leads_site_id", table_name="leads")
    op.drop_table("leads")

    op.drop_index("ix_sites_user_id", table_name="sites")
    op.drop_table("sites")

    op.drop_table("users")
