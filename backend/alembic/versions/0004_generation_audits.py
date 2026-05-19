"""generation_audits table (T4.5).

Revision ID: 0004
Revises: 0003
Create Date: 2026-05-19

For the first 100 generations we capture the full prompt + response
so the founder can review what the LLM is producing. After 100 rows
the worker switches to truncated logging (just token counts + flags)
to keep the table small.

Retention: 30 days OR until row 100, whichever later.
"""

from __future__ import annotations

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

revision: str = "0004"
down_revision: str | Sequence[str] | None = "0003"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "generation_audits",
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
            index=True,
        ),
        sa.Column(
            "site_id",
            postgresql.UUID(as_uuid=True),
            sa.ForeignKey("sites.id", ondelete="CASCADE"),
            nullable=False,
            index=True,
        ),
        sa.Column("prompt_version", sa.Integer, nullable=False),
        sa.Column("model_name", sa.String(64), nullable=False),
        sa.Column(
            "system_prompt",
            sa.Text,
            nullable=True,
            comment="Full system prompt — recorded for the first 100 rows only.",
        ),
        sa.Column(
            "user_prompt",
            sa.Text,
            nullable=True,
            comment="Full user prompt — recorded for the first 100 rows only.",
        ),
        sa.Column(
            "response_text",
            sa.Text,
            nullable=True,
            comment="Raw LLM response — recorded for the first 100 rows only.",
        ),
        sa.Column("tokens_in", sa.Integer, nullable=False, server_default="0"),
        sa.Column("tokens_out", sa.Integer, nullable=False, server_default="0"),
        sa.Column("pii_masked_count", sa.Integer, nullable=False, server_default="0"),
        sa.Column(
            "safety_flags",
            postgresql.JSONB,
            nullable=False,
            server_default="[]",
        ),
        sa.Column("status", sa.String(16), nullable=False, server_default="success"),
        sa.Column("error_message", sa.Text, nullable=True),
        sa.CheckConstraint(
            "status IN ('success', 'failed', 'flagged')",
            name="generation_audits_status_valid",
        ),
    )


def downgrade() -> None:
    op.drop_table("generation_audits")
