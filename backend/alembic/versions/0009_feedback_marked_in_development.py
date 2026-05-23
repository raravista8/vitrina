"""feedback.marked_in_development_at column.

Revision ID: 0009
Revises: 0008
Create Date: 2026-05-23

Adds a nullable TIMESTAMPTZ column to the `feedback` table so a founder
can mark a source request (type='source_request') as «taken into
development» from the admin /waitlist view. Once set, the row is
filtered out of `GET /admin/api/waitlist` aggregation.

Why not a separate table:
  The mark is a per-row attribute (which feedback row triggered «in
  dev» decision) and we never need to query «list of marked sources»
  outside the waitlist UI. A new table would have been overengineered
  — a nullable column with an INDEX gives us the same query plan.

Why not delete the row:
  We keep the feedback row for audit (who voted on what, when). The
  mark is a soft archive — admin can unset it manually via SQL if
  needed (no UI for unmark today).

Index strategy:
  Partial index ON (source_name) WHERE marked_in_development_at IS NULL
  — the waitlist query has WHERE marked_in_development_at IS NULL AND
  type='source_request', so the partial covers the hot path without
  cluttering the index with the «already done» rows.
"""

from __future__ import annotations

import sqlalchemy as sa
from alembic import op

revision = "0009"
down_revision = "0008"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column(
        "feedback",
        sa.Column(
            "marked_in_development_at",
            sa.DateTime(timezone=True),
            nullable=True,
        ),
    )
    # Partial index: waitlist query filters `WHERE marked_in_development_at IS NULL
    # AND type='source_request'`. The partial keeps the index small even as the
    # «done» pile grows over time.
    op.create_index(
        "ix_feedback_source_pending_in_dev",
        "feedback",
        ["source_name"],
        postgresql_where=sa.text("marked_in_development_at IS NULL"),
    )


def downgrade() -> None:
    op.drop_index("ix_feedback_source_pending_in_dev", table_name="feedback")
    op.drop_column("feedback", "marked_in_development_at")
