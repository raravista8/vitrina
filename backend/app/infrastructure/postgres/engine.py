"""Async SQLAlchemy engine + session factory.

The app runs as ``vitrina_app`` (DML only). Alembic uses a separate sync
connection as ``vitrina_migrator`` — that engine is configured in
``backend/alembic/env.py``.

``get_engine()`` is module-singleton-ish: we lazily create one engine per
event loop start. Tests that need a fresh engine call ``reset_engine()``.
"""

from __future__ import annotations

import asyncio
from collections.abc import AsyncIterator

from sqlalchemy.ext.asyncio import (
    AsyncEngine,
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)

from app.config import get_settings

_engine: AsyncEngine | None = None
_sessionmaker: async_sessionmaker[AsyncSession] | None = None
_lock = asyncio.Lock()


def _build_engine() -> AsyncEngine:
    settings = get_settings()
    return create_async_engine(
        settings.database_url,
        echo=False,
        pool_pre_ping=True,
        pool_size=5,
        max_overflow=10,
    )


async def get_engine() -> AsyncEngine:
    """Singleton accessor — created on first use, reused after."""
    global _engine, _sessionmaker
    if _engine is None:
        async with _lock:
            if _engine is None:
                _engine = _build_engine()
                _sessionmaker = async_sessionmaker(
                    _engine, class_=AsyncSession, expire_on_commit=False
                )
    return _engine


async def get_sessionmaker() -> async_sessionmaker[AsyncSession]:
    await get_engine()
    assert _sessionmaker is not None
    return _sessionmaker


async def session_scope() -> AsyncIterator[AsyncSession]:
    """FastAPI dependency: yield a session and ensure it's closed.

    Transactions are managed by the caller — use ``session.begin()`` /
    ``async with session.begin(): ...`` inside the route handler or service.
    This keeps the dependency itself transparent to commit semantics.
    """
    sessionmaker = await get_sessionmaker()
    async with sessionmaker() as session:
        yield session


async def reset_engine() -> None:
    """Disposes the singleton — required between integration tests that swap
    the underlying connection (e.g. testcontainers fixtures)."""
    global _engine, _sessionmaker
    if _engine is not None:
        await _engine.dispose()
    _engine = None
    _sessionmaker = None
