"""admin_credentials table (T2.1).

Revision ID: 0002
Revises: 0001
Create Date: 2026-05-19
"""

from __future__ import annotations

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

revision: str = "0002"
down_revision: str | Sequence[str] | None = "0001"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "admin_credentials",
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
        sa.Column("username", sa.String(64), nullable=False),
        sa.Column("password_hash", sa.Text, nullable=False),
        sa.Column("totp_secret", sa.Text, nullable=False),
        sa.Column(
            "backup_codes_hashes", postgresql.JSONB, nullable=False, server_default="[]"
        ),
        sa.Column("last_login_at", sa.DateTime(timezone=True), nullable=True),
        sa.UniqueConstraint("username", name="admin_credentials_username_uq"),
    )

    # vitrina_app SELECT + UPDATE only — INSERT is reserved for the seed CLI
    # which connects as vitrina_migrator (SECURITY.md T7.1).
    op.execute(
        """
        DO $$
        BEGIN
            IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'vitrina_app') THEN
                GRANT SELECT, UPDATE ON admin_credentials TO vitrina_app;
                REVOKE INSERT, DELETE ON admin_credentials FROM vitrina_app;
            END IF;
        END
        $$;
        """
    )


def downgrade() -> None:
    op.drop_table("admin_credentials")
