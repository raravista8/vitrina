"""subscriptions table (T9.1).

Revision ID: 0005
Revises: 0004
Create Date: 2026-05-19

ЮKassa-backed recurring subscriptions. Per-user lifecycle:

  trial      — first month after registration, no card required
  active     — recurring 990 ₽/mo via ЮKassa
  past_due   — last charge failed, retry window open
  cancelled  — user clicked "Отменить" or three retries exhausted
  refunded   — manual refund (founder action)

The Pro tariff is the only paid SKU in MVP. Future SKUs add rows to
``subscription_plans`` (next migration when we have a second tariff).

Webhook events from ЮKassa land in ``billing_events`` for audit; the
state-machine reads them to advance the subscription row.
"""

from __future__ import annotations

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

revision: str = "0005"
down_revision: str | Sequence[str] | None = "0004"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "subscriptions",
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
            "updated_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.func.now(),
        ),
        sa.Column(
            "user_id",
            postgresql.UUID(as_uuid=True),
            sa.ForeignKey("users.id", ondelete="CASCADE"),
            nullable=False,
            index=True,
        ),
        sa.Column("status", sa.String(16), nullable=False, server_default="trial"),
        sa.Column("plan_code", sa.String(32), nullable=False, server_default="pro"),
        sa.Column("amount_kopeks", sa.Integer, nullable=False, server_default="99000"),
        sa.Column("currency", sa.String(3), nullable=False, server_default="RUB"),
        # ЮKassa payment-method id (recurring token); NULL during trial
        # before the first successful charge.
        sa.Column("payment_method_id", sa.Text, nullable=True),
        sa.Column("trial_ends_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("current_period_end", sa.DateTime(timezone=True), nullable=True),
        sa.Column("cancelled_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("cancel_reason", sa.String(64), nullable=True),
        sa.Column("last_payment_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("failed_charge_count", sa.Integer, nullable=False, server_default="0"),
        sa.CheckConstraint(
            "status IN ('trial','active','past_due','cancelled','refunded')",
            name="subscriptions_status_valid",
        ),
        sa.UniqueConstraint("user_id", name="subscriptions_user_uq"),
    )

    op.create_table(
        "billing_events",
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
            "subscription_id",
            postgresql.UUID(as_uuid=True),
            sa.ForeignKey("subscriptions.id", ondelete="CASCADE"),
            nullable=True,
            index=True,
        ),
        sa.Column("provider", sa.String(16), nullable=False, server_default="yookassa"),
        # `payment.succeeded`, `payment.canceled`, `refund.succeeded`,
        # `payment.waiting_for_capture` — store the raw event type so
        # the founder can grep with one regex.
        sa.Column("event_type", sa.String(64), nullable=False),
        # ЮKassa idempotency / event id (deduplicates retries).
        sa.Column("provider_event_id", sa.Text, nullable=True, unique=True),
        sa.Column("amount_kopeks", sa.Integer, nullable=True),
        sa.Column("payload", postgresql.JSONB, nullable=False, server_default="{}"),
        sa.Column("processed_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("processing_error", sa.Text, nullable=True),
        sa.CheckConstraint(
            "provider IN ('yookassa')",
            name="billing_events_provider_valid",
        ),
    )


def downgrade() -> None:
    op.drop_table("billing_events")
    op.drop_table("subscriptions")
