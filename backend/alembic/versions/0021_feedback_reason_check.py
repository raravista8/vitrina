"""feedback.reason: CHECK по замороженному enum консьерж-таблицы.

Founder заморозил 7 кодов причин (CANON_FEEDBACK_V2_TZ §4, 23.07.2026) —
0020 сознательно шёл без CHECK до заморозки. Восьмое значение ``no_reply``
резервируется сразу: оно существует только в консьерж-канале («молчание»),
форма его не рендерит и API его отклоняет — но когда консьерж-данные поедут
в ту же аналитику, enum не придётся мигрировать.

Существующие строки: на проде одна тестовая с reason='test_smoke' — чистим
до навешивания CHECK (это мой прод-смоук, не данные).
"""

from __future__ import annotations

import sqlalchemy as sa
from alembic import op

revision = "0021"
down_revision = "0020"
branch_labels = None
depends_on = None

REASONS = (
    "enough_maps",
    "booking_covers",
    "unclear_value",
    "price",
    "no_trust",
    "not_now",
    "other",
    "no_reply",  # reserved: консьерж-канал, в форме не рендерится
)


def upgrade() -> None:
    # Строки вне enum (прод-смоук 'test_smoke') — reason обнуляем, сами
    # строки не трогаем.
    op.execute(
        sa.text("UPDATE feedback SET reason = NULL WHERE reason IS NOT NULL AND reason NOT IN :allowed").bindparams(
            sa.bindparam("allowed", value=list(REASONS), expanding=True)
        )
    )
    op.create_check_constraint(
        "feedback_reason_enum",
        "feedback",
        sa.column("reason").in_(REASONS) | sa.column("reason").is_(None),
    )


def downgrade() -> None:
    op.drop_constraint("feedback_reason_enum", "feedback", type_="check")
