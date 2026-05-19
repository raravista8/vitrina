"""application_photos table (PR-B #6, Design canvas screen #6).

Revision ID: 0006
Revises: 0005
Create Date: 2026-05-19

Stores per-application uploaded photo references for the photo flow (S4).
Bytes themselves live on disk under ``UPLOADS_DIR/<application_id>/`` so
this table stays cheap; we only keep filename + photo_type + mime + size
+ disk path so the founder admin can list and the parser worker (T3.3)
can pick them up for vision-LLM routing.

EXIF, magic-byte validation, and size limits (FR-014/015) happen at the
API boundary in ``app.api.routers.applications`` before any row lands
here.
"""

from __future__ import annotations

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

revision: str = "0006"
down_revision: str | Sequence[str] | None = "0005"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "application_photos",
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
            "application_id",
            postgresql.UUID(as_uuid=True),
            sa.ForeignKey("applications.id", ondelete="CASCADE"),
            nullable=False,
            index=True,
        ),
        sa.Column("index", sa.Integer, nullable=False),
        sa.Column("filename", sa.Text, nullable=False),
        sa.Column(
            "photo_type",
            sa.String(32),
            nullable=False,
            server_default="unknown",
        ),
        sa.Column("mime", sa.String(32), nullable=False),
        sa.Column("size_bytes", sa.BigInteger, nullable=False),
        sa.Column("disk_path", sa.Text, nullable=False),
        sa.CheckConstraint("index >= 0", name="application_photos_index_nonneg"),
        sa.CheckConstraint(
            "photo_type IN ('work', 'profile_screenshot', 'business_card', 'booklet', 'unknown')",
            name="application_photos_photo_type_enum",
        ),
        sa.CheckConstraint("size_bytes > 0", name="application_photos_size_positive"),
        sa.UniqueConstraint(
            "application_id",
            "index",
            name="uq_application_photos_app_index",
        ),
    )


def downgrade() -> None:
    op.drop_table("application_photos")
