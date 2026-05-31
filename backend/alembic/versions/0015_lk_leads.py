"""Client ЛК: leads.note_enc + widen status enum for the customer workflow.

Revision ID: 0015
Revises: 0014
Create Date: 2026-05-31

The client ЛК (owner's cabinet) needs:
- ``leads.note_enc`` — the owner's private internal note per lead (Fernet PII).
- the lead status to support the owner workflow ``new / in_progress / done /
  declined``. The existing operator set (``new/seen/contacted/archived/spam``)
  stays valid — we **widen** the CHECK to the union rather than rewrite it, so
  the operator admin keeps working and no existing rows need remapping. New
  customer-site leads start ``new`` and move within the 4-state owner set; the
  ЛК maps any legacy value for display only.
"""

from __future__ import annotations

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op

revision: str = "0015"
down_revision: str | Sequence[str] | None = "0014"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None

_OLD = "status IN ('new', 'seen', 'contacted', 'archived', 'spam')"
_NEW = (
    "status IN ('new', 'seen', 'contacted', 'archived', 'spam', "
    "'in_progress', 'done', 'declined')"
)


def upgrade() -> None:
    op.add_column("leads", sa.Column("note_enc", sa.LargeBinary(), nullable=True))
    op.drop_constraint("leads_status_valid", "leads", type_="check")
    op.create_check_constraint("leads_status_valid", "leads", _NEW)


def downgrade() -> None:
    op.drop_constraint("leads_status_valid", "leads", type_="check")
    op.create_check_constraint("leads_status_valid", "leads", _OLD)
    op.drop_column("leads", "note_enc")
