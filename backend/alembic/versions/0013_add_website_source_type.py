"""Add "website" to the source_type CHECK on applications + sites.

Revision ID: 0013
Revises: 0012
Create Date: 2026-05-30

Pasted links to unrecognised sites (e.g. a master's own site / portfolio)
were previously shoehorned into ``source_type='photo'`` by the frontend
fallback — they showed a misleading "Photo" badge in the admin with no
files behind them. ``website`` is the truthful type: a link captured for
manual founder review (no parser yet; same manual-review path as the rest
pre-launch). This widens the allow-list CHECK on both tables that share
``SOURCE_TYPES``; no row currently violates it (all are ymaps/telegram/photo),
so the migration is a safe constraint-widening with no data backfill.
"""

from __future__ import annotations

from alembic import op

revision = "0013"
down_revision = "0012"
branch_labels = None
depends_on = None

# Point-in-time values (migrations don't import the live SOURCE_TYPES tuple).
_OLD = "('ymaps', 'telegram', 'photo')"
_NEW = "('ymaps', 'telegram', 'photo', 'website')"

_TABLES = (
    ("applications", "applications_source_type_valid"),
    ("sites", "sites_source_type_valid"),
)


def upgrade() -> None:
    for table, name in _TABLES:
        op.drop_constraint(name, table, type_="check")
        op.create_check_constraint(name, table, f"source_type IN {_NEW}")


def downgrade() -> None:
    # Reverts to the 3-value allow-list. Fails if any row already uses
    # 'website' — acceptable: downgrade is a dev-only escape hatch.
    for table, name in _TABLES:
        op.drop_constraint(name, table, type_="check")
        op.create_check_constraint(name, table, f"source_type IN {_OLD}")
