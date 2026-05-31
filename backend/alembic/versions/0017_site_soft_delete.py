"""Client ЛК: site soft-delete + pending_purge status (PR-LK4).

Revision ID: 0017
Revises: 0016
Create Date: 2026-05-31

The owner can delete their own site from the ЛК. Deletion is **soft**: the row
gets ``deleted_at`` + ``status='pending_purge'`` and stops serving immediately;
a cron worker hard-deletes it (cascading leads/photos/change_requests) after a
grace window. Until then the owner can still download an archive ZIP.

Adds:
- ``sites.deleted_at`` (TIMESTAMPTZ NULL) — set on deletion request.
- widens the ``sites_status_valid`` CHECK to include ``pending_purge`` (union,
  no existing rows change).
"""

from __future__ import annotations

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op

revision: str = "0017"
down_revision: str | Sequence[str] | None = "0016"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None

_OLD = (
    "status IN ('pending', 'parsing', 'generating', 'review', "
    "'published', 'sync_paused', 'archived')"
)
_NEW = (
    "status IN ('pending', 'parsing', 'generating', 'review', "
    "'published', 'sync_paused', 'archived', 'pending_purge')"
)


def upgrade() -> None:
    op.add_column("sites", sa.Column("deleted_at", sa.DateTime(timezone=True), nullable=True))
    op.drop_constraint("sites_status_valid", "sites", type_="check")
    op.create_check_constraint("sites_status_valid", "sites", _NEW)


def downgrade() -> None:
    op.drop_constraint("sites_status_valid", "sites", type_="check")
    op.create_check_constraint("sites_status_valid", "sites", _OLD)
    op.drop_column("sites", "deleted_at")
