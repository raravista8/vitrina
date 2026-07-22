"""Feedback v2 (CANON_FEEDBACK_V2_TZ): «Что останавливает?» + «Задать вопрос».

Расширение существующей таблицы ``feedback``:

- ``type`` CHECK дополнен значениями ``blocker`` / ``question``;
- новые nullable-колонки ``trigger`` / ``reason`` / ``contact_channel`` /
  ``contact`` — живут только на v2-строках, исторические строки не трогаем.

Enum причин (``reason``) — коды консьерж-таблицы founder'а; в БД без CHECK
(замораживается на api-слое, паттерн intake v2 из 0018).
"""

from __future__ import annotations

import sqlalchemy as sa
from alembic import op

revision = "0020"
down_revision = "0019"
branch_labels = None
depends_on = None

_OLD_TYPES = ("source_request", "feature_request", "bug", "general")
_NEW_TYPES = (*_OLD_TYPES, "blocker", "question")
_TRIGGERS = ("exit", "scroll", "button")
_CHANNELS = ("telegram", "whatsapp", "email")


def upgrade() -> None:
    op.add_column("feedback", sa.Column("trigger", sa.String(16), nullable=True))
    op.add_column("feedback", sa.Column("reason", sa.String(32), nullable=True))
    op.add_column("feedback", sa.Column("contact_channel", sa.String(16), nullable=True))
    op.add_column("feedback", sa.Column("contact", sa.Text(), nullable=True))

    op.drop_constraint("feedback_type_valid", "feedback", type_="check")
    op.create_check_constraint(
        "feedback_type_valid",
        "feedback",
        f"type IN {_NEW_TYPES!r}",
    )
    op.create_check_constraint(
        "feedback_trigger_valid",
        "feedback",
        f"trigger IS NULL OR trigger IN {_TRIGGERS!r}",
    )
    op.create_check_constraint(
        "feedback_contact_channel_valid",
        "feedback",
        f"contact_channel IS NULL OR contact_channel IN {_CHANNELS!r}",
    )


def downgrade() -> None:
    op.drop_constraint("feedback_contact_channel_valid", "feedback", type_="check")
    op.drop_constraint("feedback_trigger_valid", "feedback", type_="check")
    op.drop_constraint("feedback_type_valid", "feedback", type_="check")
    op.create_check_constraint(
        "feedback_type_valid",
        "feedback",
        f"type IN {_OLD_TYPES!r}",
    )
    op.drop_column("feedback", "contact")
    op.drop_column("feedback", "contact_channel")
    op.drop_column("feedback", "reason")
    op.drop_column("feedback", "trigger")
