"""Postgres infrastructure layer.

Re-exports `Base` (declarative metadata target for Alembic) and every model.
Importing this package ensures all models register with `Base.metadata`,
which is what `alembic/env.py` reads.
"""

from app.infrastructure.postgres.base import Base, Timestamped, UUIDPrimaryKey
from app.infrastructure.postgres.models import (
    AdminAction,
    Application,
    Consent,
    Event,
    Feedback,
    Lead,
    Site,
    SyncRun,
    User,
)

__all__ = [
    "AdminAction",
    "Application",
    "Base",
    "Consent",
    "Event",
    "Feedback",
    "Lead",
    "Site",
    "SyncRun",
    "Timestamped",
    "UUIDPrimaryKey",
    "User",
]
