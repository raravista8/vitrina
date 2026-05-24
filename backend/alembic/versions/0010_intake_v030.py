"""intake v0.3.0 — application mode discriminator + photo-branch fields + text files.

Revision ID: 0010
Revises: 0009
Create Date: 2026-05-24

Schema migration for canon 0.3.0 intake rewrite (PR #137-ish).

Two branches of `POST /api/submit-application` now share one table:
- mode='link'  — existing fields (source_url, source_type) carry the data
- mode='photo' — new fields (description, city, customer_contact_*)
                  + multipart-uploaded photos (existing application_photos)
                  + NEW text files (application_text_files — this migration)

`customer_contact_value_enc` is Fernet-encrypted at write — it's a public-on-site
contact (the masters render it as their booking phone/TG), distinct from
`contact_value` which is the private notify channel for us → master.

Existing rows backfill: all pre-0.3.0 rows had implicit mode='link' (the only
flow). server_default='link' on the new column captures that without a backfill
job.
"""

from __future__ import annotations

import sqlalchemy as sa
from alembic import op

revision = "0010"
down_revision = "0009"
branch_labels = None
depends_on = None


APPLICATION_MODES = ("link", "photo")
CUSTOMER_CONTACT_TYPES = ("phone", "telegram")


def upgrade() -> None:
    # --- applications.mode + photo-branch fields -----------------------------
    op.add_column(
        "applications",
        sa.Column(
            "mode",
            sa.String(length=16),
            nullable=False,
            server_default="link",
        ),
    )
    op.add_column("applications", sa.Column("description", sa.Text(), nullable=True))
    op.add_column("applications", sa.Column("city", sa.Text(), nullable=True))
    op.add_column(
        "applications",
        sa.Column("customer_contact_type", sa.String(length=16), nullable=True),
    )
    # Fernet-encrypted PII (rendered publicly on customer-site CTA so consent
    # text covers both notify and public-display purposes).
    op.add_column(
        "applications",
        sa.Column("customer_contact_value_enc", sa.LargeBinary(), nullable=True),
    )

    op.create_check_constraint(
        "applications_mode_valid",
        "applications",
        sa.text(f"mode IN {APPLICATION_MODES!r}"),
    )
    op.create_check_constraint(
        "applications_customer_contact_type_valid",
        "applications",
        sa.text(
            "customer_contact_type IS NULL OR customer_contact_type IN "
            f"{CUSTOMER_CONTACT_TYPES!r}"
        ),
    )
    # Photo-mode invariant: every photo row has the trio (description, city,
    # customer_contact_*). DB-level guard so partial submits can't happen even
    # if the API layer is bypassed.
    op.create_check_constraint(
        "applications_photo_mode_required_fields",
        "applications",
        sa.text(
            "(mode = 'link') OR ("
            "  description IS NOT NULL"
            "  AND city IS NOT NULL"
            "  AND customer_contact_type IS NOT NULL"
            "  AND customer_contact_value_enc IS NOT NULL"
            ")"
        ),
    )

    # --- application_text_files (mirror of application_photos) ---------------
    op.create_table(
        "application_text_files",
        sa.Column(
            "id",
            sa.dialects.postgresql.UUID(as_uuid=True),
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
            "application_id",
            sa.dialects.postgresql.UUID(as_uuid=True),
            sa.ForeignKey("applications.id", ondelete="CASCADE"),
            nullable=False,
            index=True,
        ),
        sa.Column("index", sa.Integer(), nullable=False),
        sa.Column("filename", sa.Text(), nullable=False),
        sa.Column("mime", sa.String(length=64), nullable=False),
        sa.Column("size_bytes", sa.BigInteger(), nullable=False),
    )
    op.create_index(
        "ix_application_text_files_application_id",
        "application_text_files",
        ["application_id"],
    )


def downgrade() -> None:
    op.drop_index(
        "ix_application_text_files_application_id",
        table_name="application_text_files",
    )
    op.drop_table("application_text_files")
    op.drop_constraint(
        "applications_photo_mode_required_fields",
        "applications",
        type_="check",
    )
    op.drop_constraint(
        "applications_customer_contact_type_valid",
        "applications",
        type_="check",
    )
    op.drop_constraint("applications_mode_valid", "applications", type_="check")
    op.drop_column("applications", "customer_contact_value_enc")
    op.drop_column("applications", "customer_contact_type")
    op.drop_column("applications", "city")
    op.drop_column("applications", "description")
    op.drop_column("applications", "mode")
