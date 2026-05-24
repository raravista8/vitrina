"""users.login + users.password_hash for customer auth.

Revision ID: 0011
Revises: 0010
Create Date: 2026-05-24

Canon 0.4.0 — customer master login. Adds two nullable columns:
- ``login`` (TEXT, unique) — provisioned by founder = subdomain
  (e.g. ``studia-anna``)
- ``password_hash`` (TEXT) — bcrypt(plaintext_password) generated
  at site-publish time by the founder

Both nullable because User rows exist from intake BEFORE any site is
published (mode='link' user has contact_type/contact_value but no
login yet). After founder publishes their site via the runbook,
both columns get populated.

Unique constraint on ``login`` (partial — only where NOT NULL —
Postgres-native partial-index semantics via WHERE clause).
"""

from __future__ import annotations

import sqlalchemy as sa
from alembic import op

revision = "0011"
down_revision = "0010"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column("users", sa.Column("login", sa.Text(), nullable=True))
    op.add_column("users", sa.Column("password_hash", sa.Text(), nullable=True))
    # Partial unique index: only rows with a login participate. Two NULL
    # logins coexist freely (default Postgres behaviour for NULL anyway,
    # but explicit WHERE keeps the index smaller).
    op.create_index(
        "users_login_uq",
        "users",
        ["login"],
        unique=True,
        postgresql_where=sa.text("login IS NOT NULL"),
    )


def downgrade() -> None:
    op.drop_index("users_login_uq", table_name="users")
    op.drop_column("users", "password_hash")
    op.drop_column("users", "login")
