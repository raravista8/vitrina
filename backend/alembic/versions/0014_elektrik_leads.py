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
- Seeds the owner ``User`` + published ``Site`` so leads have a valid FK and
  pass the ``status='published'`` gate. The owner contact is a site-scoped
  placeholder (``owner@elektrik-spb.samosite.online``) until the client provides
  a real notify channel — see site.json.
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

_USER_ID = "e1ec0a17-0000-4000-8000-000000000002"
_SITE_ID = (
    "e1ec0a17-0000-4000-8000-000000000001"  # matches sites-template/elektrik/content/site.json
)


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

    # — seed owner User + published Site (idempotent) —
    op.execute(
        sa.text(
            """
            INSERT INTO users (id, contact_type, contact_value, plan, login)
            VALUES (CAST(:uid AS uuid), 'email', 'owner@elektrik-spb.samosite.online',
                    'pro', 'elektrik-spb')
            ON CONFLICT (id) DO NOTHING
            """
        ).bindparams(uid=_USER_ID)
    )
    op.execute(
        sa.text(
            """
            INSERT INTO sites
                (id, user_id, subdomain, source_type, source_url, status,
                 settings, seo_submission_log, published_at)
            VALUES
                (CAST(:sid AS uuid), CAST(:uid AS uuid), 'elektrik-spb', 'website',
                 'https://www.avito.ru/brands/i173924916', 'published',
                 '{}'::jsonb, '{}'::jsonb, now())
            ON CONFLICT (id) DO NOTHING
            """
        ).bindparams(sid=_SITE_ID, uid=_USER_ID)
    )


def downgrade() -> None:
    op.execute(sa.text("DELETE FROM sites WHERE id = CAST(:sid AS uuid)").bindparams(sid=_SITE_ID))
    op.execute(sa.text("DELETE FROM users WHERE id = CAST(:uid AS uuid)").bindparams(uid=_USER_ID))
    op.drop_table("lead_photo")
    op.drop_column("leads", "address_enc")
    op.drop_column("leads", "call_time")
    op.drop_column("leads", "service")
    op.drop_column("leads", "object_type")
