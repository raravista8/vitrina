"""site_analytics + site_analytics_digest_log (Phase 7b / v2.1.3 §2.2).

Revision ID: 0008
Revises: 0007
Create Date: 2026-05-22

Adds daily aggregation table and digest delivery log для feature
«Аналитика в личном кабинете + еженедельная сводка».

`site_analytics` — pre-aggregated daily counts per site. Источник
данных — `events` table (pageview / form_submit / click_*). Aggregation
job runs nightly, заполняя строку за прошедший день. Composite primary
key (site_id, date) гарантирует idempotency cron retries.

`site_analytics_digest_log` — track-table для cron `weekly_analytics_
digest`. Каждое успешное delivery пишет строку (site_id, sent_at,
channel). Используется чтобы skip already-sent digests при cron
overlap'ах.

Source-breakdown JSON shape:
  {"yandex_maps": 45, "telegram": 28, "direct": 15, "twogis": 8, "google": 4}
Percentages, не absolute counts (UI вычисляет share над всем traffic).

Retention:
  site_analytics              — 2 года (730 строк × N sites)
  site_analytics_digest_log   — 1 год (audit trail)
"""

from __future__ import annotations

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

revision: str = "0008"
down_revision: str | Sequence[str] | None = "0007"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "site_analytics",
        sa.Column(
            "site_id",
            postgresql.UUID(as_uuid=True),
            sa.ForeignKey("sites.id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column("date", sa.Date(), nullable=False),
        sa.Column(
            "visits",
            sa.Integer(),
            nullable=False,
            server_default="0",
            comment="Total pageview events count for the day.",
        ),
        sa.Column(
            "unique_visitors",
            sa.Integer(),
            nullable=False,
            server_default="0",
            comment="Distinct IP-hash count для дневной дедупликации.",
        ),
        sa.Column(
            "leads",
            sa.Integer(),
            nullable=False,
            server_default="0",
            comment="form_submit events count.",
        ),
        sa.Column(
            "source_breakdown",
            postgresql.JSONB(),
            nullable=False,
            server_default=sa.text("'{}'::jsonb"),
            comment="{source_name: percentage} dict for the day's traffic.",
        ),
        sa.PrimaryKeyConstraint("site_id", "date", name="site_analytics_pkey"),
    )
    # Index for range queries `WHERE site_id = ? AND date >= ?`. Without
    # this descending-on-date queries для last-30-days widget were doing
    # a sort over the PK btree which is unordered-by-second-key for
    # range scans.
    op.create_index(
        "ix_site_analytics_site_id_date_desc",
        "site_analytics",
        ["site_id", sa.text("date DESC")],
    )

    op.create_table(
        "site_analytics_digest_log",
        sa.Column(
            "site_id",
            postgresql.UUID(as_uuid=True),
            sa.ForeignKey("sites.id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column(
            "sent_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.func.now(),
        ),
        sa.Column(
            "channel",
            sa.String(length=16),
            nullable=False,
            comment="One of: telegram, max, email, sms.",
        ),
        sa.PrimaryKeyConstraint("site_id", "sent_at", name="site_analytics_digest_log_pkey"),
        sa.CheckConstraint(
            "channel IN ('telegram', 'max', 'email', 'sms')",
            name="site_analytics_digest_log_channel_valid",
        ),
    )


def downgrade() -> None:
    op.drop_table("site_analytics_digest_log")
    op.drop_index("ix_site_analytics_site_id_date_desc", table_name="site_analytics")
    op.drop_table("site_analytics")
