"""change_request table — client ЛК «Изменения» → founder inbox (PR-LK2).

Revision ID: 0016
Revises: 0015
Create Date: 2026-05-31

A client's edit request from the ЛК «Изменения» tab. Own table (the existing
``feedback`` lacks ``site_id`` + ``status``): the client creates rows
(``status=new``), the founder moves status from the admin inbox
(``new → in_progress → done``), and the client sees the progress. ``source`` is
fixed to ``lk_change_request`` so the founder inbox can tag/filter them.
"""

from __future__ import annotations

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

revision: str = "0016"
down_revision: str | Sequence[str] | None = "0015"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "change_request",
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
            "site_id",
            postgresql.UUID(as_uuid=True),
            sa.ForeignKey("sites.id", ondelete="CASCADE"),
            nullable=False,
            index=True,
        ),
        sa.Column("text", sa.Text, nullable=False),
        sa.Column("status", sa.String(16), nullable=False, server_default="new"),
        sa.Column("source", sa.String(32), nullable=False, server_default="lk_change_request"),
        sa.CheckConstraint(
            "status IN ('new', 'in_progress', 'done')",
            name="change_request_status_valid",
        ),
    )
    op.create_index("change_request_created_at_idx", "change_request", ["created_at"])


def downgrade() -> None:
    op.drop_index("change_request_created_at_idx", table_name="change_request")
    op.drop_table("change_request")
