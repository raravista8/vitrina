"""feedback_submission + feedback_vote + feedback_threshold_alert.

Revision ID: 0012
Revises: 0011
Create Date: 2026-05-29

Backs the canon 0.9.0 vote-first feedback modal (ADR-0009 rev.2 /
`docs/handoff/FEEDBACK_BACKEND.md`). One modal submit = one
`feedback_submission` row + N `feedback_vote` rows (one per ticked
option). The legacy `feedback` table (migration 0001) is untouched —
the old single-row callers (SourceDetectionBadge / WaitlistCapture) and
`own_source`/`own_feature` free-text keep using it.

`feedback_submission`
  - `contact` is PII-when-set, plaintext (same tier as `feedback.email`),
    masked in logs. `ip_hash` is a salted SHA-256 — raw IP is never stored.

`feedback_vote`
  - rolls up by `option_key`; `ix_feedback_vote_created_at` keeps the
    trailing-7d «за неделю» count cheap. ON DELETE CASCADE from the
    submission.

`feedback_threshold_alert`
  - idempotency marker: one row per `option_key` once it crossed 10
    distinct voters and the founder was alerted (INSERT … ON CONFLICT
    DO NOTHING → never re-alert).
"""

from __future__ import annotations

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

revision: str = "0012"
down_revision: str | Sequence[str] | None = "0011"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "feedback_submission",
        sa.Column(
            "id",
            postgresql.UUID(as_uuid=True),
            primary_key=True,
            server_default=sa.text("gen_random_uuid()"),
        ),
        sa.Column("name", sa.Text(), nullable=True),
        sa.Column("contact", sa.Text(), nullable=True),
        sa.Column("message", sa.Text(), nullable=True),
        sa.Column("ip_hash", sa.String(length=64), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.text("now()"),
        ),
    )
    op.create_index("ix_feedback_submission_ip_hash", "feedback_submission", ["ip_hash"])

    op.create_table(
        "feedback_vote",
        sa.Column(
            "id",
            postgresql.UUID(as_uuid=True),
            primary_key=True,
            server_default=sa.text("gen_random_uuid()"),
        ),
        sa.Column(
            "submission_id",
            postgresql.UUID(as_uuid=True),
            sa.ForeignKey("feedback_submission.id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column("kind", sa.String(length=16), nullable=False),
        sa.Column("option_key", sa.String(length=64), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.text("now()"),
        ),
        sa.CheckConstraint("kind IN ('source', 'feature')", name="feedback_vote_kind_valid"),
    )
    op.create_index("ix_feedback_vote_submission_id", "feedback_vote", ["submission_id"])
    op.create_index("ix_feedback_vote_option_key", "feedback_vote", ["option_key"])
    op.create_index("ix_feedback_vote_created_at", "feedback_vote", ["created_at"])

    op.create_table(
        "feedback_threshold_alert",
        sa.Column("option_key", sa.String(length=64), primary_key=True),
        sa.Column(
            "alerted_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.text("now()"),
        ),
    )


def downgrade() -> None:
    op.drop_table("feedback_threshold_alert")
    op.drop_index("ix_feedback_vote_created_at", table_name="feedback_vote")
    op.drop_index("ix_feedback_vote_option_key", table_name="feedback_vote")
    op.drop_index("ix_feedback_vote_submission_id", table_name="feedback_vote")
    op.drop_table("feedback_vote")
    op.drop_index("ix_feedback_submission_ip_hash", table_name="feedback_submission")
    op.drop_table("feedback_submission")
