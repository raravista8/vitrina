"""elektrik-spb customer site: extended lead fields + lead_photo + seed User/Site.

Revision ID: 0014
Revises: 0013
Create Date: 2026-05-31

The electrician customer site (elektrik-spb.samosite.online) collects richer
leads than the base form: object_type / service / call_time (non-PII category
data, plaintext) + address (PII → Fernet ``address_enc``) + up to 5 photos.

- ``leads`` gains 4 nullable columns (existing rows + base-form leads stay
  valid: all NULL).
- ``lead_photo`` stores each uploaded image **Fernet-encrypted in the DB**
  (``data_enc``) — this prod has no Object Storage write path, and a handful of
  photos per lead at one small site is fine in Postgres; bytes are encrypted at
  rest like every other lead PII (the image may show the customer's interior).

The owner ``User`` + published ``Site`` (whose ``site_id`` the landing posts
with) are **provisioned separately**, NOT seeded here — seeding business rows in
a migration pollutes the shared test DB (other tests assert global row counts).
Provisioning is an idempotent prod step: ``infra/scripts/provision-elektrik.sql``
(run once after ``alembic upgrade head``).
"""

from __future__ import annotations

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

revision: str = "0014"
down_revision: str | Sequence[str] | None = "0013"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    # — extended lead fields —
    op.add_column("leads", sa.Column("object_type", sa.String(32), nullable=True))
    op.add_column("leads", sa.Column("service", sa.String(80), nullable=True))
    op.add_column("leads", sa.Column("call_time", sa.String(40), nullable=True))
    op.add_column("leads", sa.Column("address_enc", sa.LargeBinary(), nullable=True))

    # — lead_photo (Fernet-encrypted image bytes in-DB) —
    op.create_table(
        "lead_photo",
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
            "lead_id",
            postgresql.UUID(as_uuid=True),
            sa.ForeignKey("leads.id", ondelete="CASCADE"),
            nullable=False,
            index=True,
        ),
        sa.Column("index", sa.Integer, nullable=False),
        sa.Column("mime", sa.String(32), nullable=False),
        sa.Column("size_bytes", sa.BigInteger, nullable=False),
        sa.Column("data_enc", sa.LargeBinary(), nullable=False),
        sa.CheckConstraint("index >= 0", name="lead_photo_index_nonneg"),
        sa.CheckConstraint("size_bytes > 0", name="lead_photo_size_positive"),
        sa.UniqueConstraint("lead_id", "index", name="uq_lead_photo_lead_index"),
    )


def downgrade() -> None:
    op.drop_table("lead_photo")
    op.drop_column("leads", "address_enc")
    op.drop_column("leads", "call_time")
    op.drop_column("leads", "service")
    op.drop_column("leads", "object_type")
