"""deletion_requests table (T6.2 — ФЗ-152 right-to-erasure).

Revision ID: 0003
Revises: 0002
Create Date: 2026-05-19

Stores the lifecycle of a data-deletion request:

  pending      — created by `POST /api/me/delete-data`, email sent
  confirmed    — user clicked the magic link
  completed    — worker finished erasure
  expired      — link expired (15 min TTL) without a click
  rejected     — manual rejection (e.g. suspicious bulk attempts)

Per SECURITY.md §9.3 the row itself is RETAINED for 3 years after
completion as legal evidence; only the linked PII (User row, Sites,
Leads, Feedback, Applications) is purged.
"""

from __future__ import annotations

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

revision: str = "0003"
down_revision: str | Sequence[str] | None = "0002"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "deletion_requests",
        sa.Column(
            "id",
            postgresql.UUID(as_uuid=True),
            primary_key=True,
            server_default=sa.text("gen_random_uuid()"),
        ),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.func.now(),
        ),
        sa.Column(
            "user_id",
            postgresql.UUID(as_uuid=True),
            sa.ForeignKey("users.id", ondelete="SET NULL"),
            nullable=True,
            index=True,
        ),
        # We capture the contact at request time even when there's no
        # matching User — lets us tell whether a bad-actor is poking
        # at the endpoint with random emails.
        sa.Column("contact_type", sa.String(16), nullable=False),
        sa.Column("contact_value", sa.Text, nullable=False),
        sa.Column("token_hash", sa.Text, nullable=False, unique=True),
        sa.Column("status", sa.String(16), nullable=False, server_default="pending"),
        sa.Column(
            "confirmed_at", sa.DateTime(timezone=True), nullable=True
        ),
        sa.Column(
            "completed_at", sa.DateTime(timezone=True), nullable=True
        ),
        sa.Column(
            "expires_at", sa.DateTime(timezone=True), nullable=False
        ),
        sa.Column("ip", postgresql.INET, nullable=True),
        sa.Column("user_agent", sa.Text, nullable=True),
        sa.CheckConstraint(
            "status IN ('pending', 'confirmed', 'completed', 'expired', 'rejected')",
            name="deletion_requests_status_valid",
        ),
        sa.CheckConstraint(
            "contact_type IN ('email', 'phone', 'telegram', 'max')",
            name="deletion_requests_contact_type_valid",
        ),
    )

    # Grants happen automatically via the DEFAULT PRIVILEGES set up in
    # the 0001 baseline (`ALTER DEFAULT PRIVILEGES ... GRANT SELECT,
    # INSERT, UPDATE, DELETE ON TABLES TO vitrina_app`). No manual
    # GRANT needed here.


def downgrade() -> None:
    op.drop_table("deletion_requests")
