"""SQLAlchemy 2.0 declarative base + reusable mixins.

Conventions:
  - UUIDs are generated server-side via `gen_random_uuid()` (built-in since
    Postgres 13 — no `pgcrypto` extension needed on Postgres 16).
  - All timestamps are `TIMESTAMPTZ` in the database (UTC at rest) — the
    `Timestamped` mixin sets `created_at` via `now()`.
  - Snake_case `__tablename__` is auto-derived from CamelCase class names.
"""

from __future__ import annotations

import re
import uuid
from datetime import datetime
from typing import Any, ClassVar

from sqlalchemy import DateTime, func, text
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.orm import DeclarativeBase, Mapped, declared_attr, mapped_column

_CAMEL_TO_SNAKE = re.compile(r"(?<!^)(?=[A-Z])")


class Base(DeclarativeBase):
    """Project-wide declarative base. All ORM models inherit from this."""

    # Common type substitutions if we ever need them (e.g. JSONB defaults).
    type_annotation_map: ClassVar[dict[Any, Any]] = {}

    @declared_attr.directive
    def __tablename__(cls) -> str:  # noqa: N805 — SQLAlchemy convention
        # User -> users, AdminAction -> admin_actions, SyncRun -> sync_runs
        snake = _CAMEL_TO_SNAKE.sub("_", cls.__name__).lower()
        # Pluralise crude-but-effective.
        if snake.endswith("s"):
            return snake
        if snake.endswith("y"):
            return snake[:-1] + "ies"
        return snake + "s"


class UUIDPrimaryKey:
    """Mixin: surrogate UUID primary key, server-generated."""

    id: Mapped[uuid.UUID] = mapped_column(
        PG_UUID(as_uuid=True),
        primary_key=True,
        server_default=text("gen_random_uuid()"),
    )


class Timestamped:
    """Mixin: `created_at` populated by Postgres `now()` on insert."""

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )
