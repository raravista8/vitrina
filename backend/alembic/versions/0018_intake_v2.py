"""intake v2 — «ниша → источник → запись → контакты» (июль 2026)

Новые поля заявки (все nullable, живут на mode='v2'): source_path, niche,
business_name, booking_platform, booking_url, booking_phone_enc (Fernet —
телефон записи публикуется на сайте, но это PII at rest).

Расширение CHECK-констрейнтов:
  - contact_type (users + applications): + 'whatsapp'
  - applications.mode: + 'v2'
  - applications.source_type: + 'twogis', 'avito', 'vk' (путь «ссылка»
    принимает эти платформы — исполнение заявок ручное)
  - photo_mode_required_fields: mode='v2' освобождён от photo-инвариантов
  - новые: source_path IN (...), booking_platform IN (...)

Downgrade безопасен только при отсутствии v2-строк (иначе упадёт на
recreate старых CHECK'ов) — это ожидаемо для отката «фичи без данных».

Revision ID: 0018
Revises: 0017
"""

from __future__ import annotations

import sqlalchemy as sa

from alembic import op

revision = "0018"
down_revision = "0017"
branch_labels = None
depends_on = None

_CONTACT_TYPES_OLD = "('email', 'phone', 'telegram', 'max')"
_CONTACT_TYPES_NEW = "('email', 'phone', 'telegram', 'max', 'whatsapp')"
_SOURCE_TYPES_OLD = "('ymaps', 'telegram', 'photo', 'website')"
_SOURCE_TYPES_NEW = "('ymaps', 'telegram', 'photo', 'website', 'twogis', 'avito', 'vk')"
_MODES_OLD = "('link', 'photo')"
_MODES_NEW = "('link', 'photo', 'v2')"
_SOURCE_PATHS = "('name', 'screenshot', 'link', 'photo')"
_BOOKING_PLATFORMS = "('dikidi', 'yclients', 'phone', 'none')"

_PHOTO_REQ_OLD = (
    "(mode = 'link') OR ("
    "  description IS NOT NULL"
    "  AND city IS NOT NULL"
    "  AND customer_contact_type IS NOT NULL"
    "  AND customer_contact_value_enc IS NOT NULL"
    ")"
)
_PHOTO_REQ_NEW = (
    "(mode IN ('link', 'v2')) OR ("
    "  description IS NOT NULL"
    "  AND city IS NOT NULL"
    "  AND customer_contact_type IS NOT NULL"
    "  AND customer_contact_value_enc IS NOT NULL"
    ")"
)


def upgrade() -> None:
    # ── новые колонки ────────────────────────────────────────────────────
    op.add_column("applications", sa.Column("source_path", sa.String(16), nullable=True))
    op.add_column("applications", sa.Column("niche", sa.String(32), nullable=True))
    op.add_column("applications", sa.Column("business_name", sa.Text(), nullable=True))
    op.add_column("applications", sa.Column("booking_platform", sa.String(16), nullable=True))
    op.add_column("applications", sa.Column("booking_url", sa.Text(), nullable=True))
    op.add_column("applications", sa.Column("booking_phone_enc", sa.LargeBinary(), nullable=True))

    # ── расширенные CHECK'и (drop + recreate) ────────────────────────────
    op.drop_constraint("users_contact_type_valid", "users", type_="check")
    op.create_check_constraint(
        "users_contact_type_valid", "users", f"contact_type IN {_CONTACT_TYPES_NEW}"
    )

    op.drop_constraint("applications_contact_type_valid", "applications", type_="check")
    op.create_check_constraint(
        "applications_contact_type_valid",
        "applications",
        f"contact_type IN {_CONTACT_TYPES_NEW}",
    )

    op.drop_constraint("applications_source_type_valid", "applications", type_="check")
    op.create_check_constraint(
        "applications_source_type_valid",
        "applications",
        f"source_type IN {_SOURCE_TYPES_NEW}",
    )

    op.drop_constraint("applications_mode_valid", "applications", type_="check")
    op.create_check_constraint("applications_mode_valid", "applications", f"mode IN {_MODES_NEW}")

    op.drop_constraint("applications_photo_mode_required_fields", "applications", type_="check")
    op.create_check_constraint(
        "applications_photo_mode_required_fields", "applications", _PHOTO_REQ_NEW
    )

    # ── новые CHECK'и ────────────────────────────────────────────────────
    op.create_check_constraint(
        "applications_source_path_valid",
        "applications",
        f"source_path IS NULL OR source_path IN {_SOURCE_PATHS}",
    )
    op.create_check_constraint(
        "applications_booking_platform_valid",
        "applications",
        f"booking_platform IS NULL OR booking_platform IN {_BOOKING_PLATFORMS}",
    )


def downgrade() -> None:
    op.drop_constraint("applications_booking_platform_valid", "applications", type_="check")
    op.drop_constraint("applications_source_path_valid", "applications", type_="check")

    op.drop_constraint("applications_photo_mode_required_fields", "applications", type_="check")
    op.create_check_constraint(
        "applications_photo_mode_required_fields", "applications", _PHOTO_REQ_OLD
    )

    op.drop_constraint("applications_mode_valid", "applications", type_="check")
    op.create_check_constraint("applications_mode_valid", "applications", f"mode IN {_MODES_OLD}")

    op.drop_constraint("applications_source_type_valid", "applications", type_="check")
    op.create_check_constraint(
        "applications_source_type_valid",
        "applications",
        f"source_type IN {_SOURCE_TYPES_OLD}",
    )

    op.drop_constraint("applications_contact_type_valid", "applications", type_="check")
    op.create_check_constraint(
        "applications_contact_type_valid",
        "applications",
        f"contact_type IN {_CONTACT_TYPES_OLD}",
    )

    op.drop_constraint("users_contact_type_valid", "users", type_="check")
    op.create_check_constraint(
        "users_contact_type_valid", "users", f"contact_type IN {_CONTACT_TYPES_OLD}"
    )

    op.drop_column("applications", "booking_phone_enc")
    op.drop_column("applications", "booking_url")
    op.drop_column("applications", "booking_platform")
    op.drop_column("applications", "business_name")
    op.drop_column("applications", "niche")
    op.drop_column("applications", "source_path")
