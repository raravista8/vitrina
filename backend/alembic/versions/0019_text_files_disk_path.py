"""application_text_files: добить дрейф модель↔БД из 0010.

Миграция 0010 создала таблицу без ``disk_path`` и без констрейнтов,
объявленных в модели ``ApplicationTextFile`` (index_nonneg, size_positive,
uq app+index). Любой INSERT из photo-режима с текстовыми вложениями падал
UndefinedColumnError — латентно с 0.3.0, всплыло при добавлении admin-вьюхи
файлов заявки (июль 2026). Таблица на проде пуста, добавление NOT NULL
безопасно.
"""

from __future__ import annotations

import sqlalchemy as sa
from alembic import op

revision = "0019"
down_revision = "0018"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column(
        "application_text_files",
        sa.Column("disk_path", sa.Text(), nullable=False),
    )
    op.create_check_constraint(
        "application_text_files_index_nonneg",
        "application_text_files",
        "index >= 0",
    )
    op.create_check_constraint(
        "application_text_files_size_positive",
        "application_text_files",
        "size_bytes > 0",
    )
    op.create_unique_constraint(
        "uq_application_text_files_app_index",
        "application_text_files",
        ["application_id", "index"],
    )


def downgrade() -> None:
    op.drop_constraint(
        "uq_application_text_files_app_index",
        "application_text_files",
        type_="unique",
    )
    op.drop_constraint(
        "application_text_files_size_positive",
        "application_text_files",
        type_="check",
    )
    op.drop_constraint(
        "application_text_files_index_nonneg",
        "application_text_files",
        type_="check",
    )
    op.drop_column("application_text_files", "disk_path")
