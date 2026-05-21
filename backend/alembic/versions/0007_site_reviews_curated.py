"""site_reviews_curated table (E13 / PR-E / ADR-0010).

Revision ID: 0007
Revises: 0006
Create Date: 2026-05-21

For the v2 «Сам выбирает отзывы» feature: weekly cron asks YandexGPT
to pick 4–6 best reviews per published site (criteria in ADR-0010 §«Промпт»),
result persisted here. Customer-site template reads from this table to
render the «★ ЛУЧШИЙ» badges per COPY.md §4.3.

Each run produces a single row. Old rows kept for 90 days for audit
(see ADR-0010 §«Audit log»).
"""

from __future__ import annotations

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

revision: str = "0007"
down_revision: str | Sequence[str] | None = "0006"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "site_reviews_curated",
        sa.Column(
            "id",
            postgresql.UUID(as_uuid=True),
            primary_key=True,
            server_default=sa.text("gen_random_uuid()"),
        ),
        sa.Column(
            "site_id",
            postgresql.UUID(as_uuid=True),
            sa.ForeignKey("sites.id", ondelete="CASCADE"),
            nullable=False,
            index=True,
        ),
        sa.Column(
            "picked_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.func.now(),
            index=True,
        ),
        # Versioning so we can compare quality between prompt iterations
        # and roll back if a new prompt regresses curation taste.
        sa.Column("model_version", sa.Text(), nullable=False),
        sa.Column("prompt_version", sa.Text(), nullable=False),
        # The IDs of reviews from `sites.source_snapshot` that the
        # curator chose. Stored as text[] (not int[]) because review IDs
        # are source-specific strings — Я.Карты gives uuid-strings,
        # Telegram gives message-ids as ints stringified, 2GIS gives
        # path-style identifiers. Cleaner to keep them opaque.
        sa.Column(
            "curated_review_ids",
            postgresql.ARRAY(sa.Text()),
            nullable=False,
            server_default="{}",
        ),
        # Free-form one-liner the LLM produced explaining its choices.
        # Used only for human audit / debug; never shown to customers.
        sa.Column("reasoning", sa.Text(), nullable=False, server_default=""),
        # Full audit payload — tokens_in, tokens_out, latency_ms, raw
        # response, prompt template snapshot. Stored as JSONB so we can
        # query (e.g. find runs where the LLM took >30s).
        sa.Column(
            "audit_payload",
            postgresql.JSONB(),
            nullable=False,
            server_default="{}",
        ),
    )
    # Cron queries «is this site overdue for re-curation?» — fast with
    # composite index on (site_id, picked_at DESC).
    op.create_index(
        "ix_site_reviews_curated_site_id_picked_at",
        "site_reviews_curated",
        ["site_id", sa.text("picked_at DESC")],
    )


def downgrade() -> None:
    op.drop_index(
        "ix_site_reviews_curated_site_id_picked_at",
        table_name="site_reviews_curated",
    )
    op.drop_table("site_reviews_curated")
