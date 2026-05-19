"""Integration-test fixtures backed by testcontainers Postgres.

Runs only when Docker is reachable. On a machine without Docker (or in a
CI runner with the daemon disabled) the postgres fixture skips and any
test depending on it is reported as ``skipped``.

Concurrency model: the container + alembic migration run once per session
(both purely synchronous, so no event-loop is captured). The async engine
+ session are recreated per-test, because asyncpg connection pools bind
to the event loop they were opened on and pytest-asyncio creates a fresh
loop per function-scoped test.
"""

from __future__ import annotations

import os
import shutil
import subprocess
from collections.abc import AsyncIterator, Iterator
from pathlib import Path

import pytest
import pytest_asyncio
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

BACKEND_DIR = Path(__file__).resolve().parents[2]


def _docker_available() -> bool:
    if not shutil.which("docker"):
        return False
    try:
        result = subprocess.run(
            ["docker", "info"],
            capture_output=True,
            timeout=3,
            check=False,
        )
    except (OSError, subprocess.TimeoutExpired):
        return False
    return result.returncode == 0


@pytest.fixture(scope="session")
def _postgres_container() -> Iterator[str]:
    """Spawn a Postgres 16 container, apply alembic, yield the async DSN."""
    if not _docker_available():
        pytest.skip("Docker not available — integration tests require testcontainers")

    # Lazy import so test collection on machines without testcontainers
    # still works (just skips).
    from testcontainers.postgres import PostgresContainer

    with PostgresContainer("postgres:16-alpine") as container:
        sync_dsn = container.get_connection_url()  # postgresql+psycopg2://...
        # Normalise: alembic wants psycopg (v3); app uses asyncpg.
        base = sync_dsn.replace("postgresql+psycopg2://", "postgresql://")
        alembic_dsn = base.replace("postgresql://", "postgresql+psycopg://")
        async_dsn = base.replace("postgresql://", "postgresql+asyncpg://")

        os.environ["DATABASE_URL"] = async_dsn
        os.environ["ALEMBIC_DATABASE_URL"] = alembic_dsn

        # Clear the cached Settings so the new env vars are picked up.
        from app.config import get_settings

        get_settings.cache_clear()

        # Apply alembic upgrade head. Run from backend/ so the relative
        # `script_location = alembic` in alembic.ini resolves. Pure sync —
        # no event-loop captured here.
        cwd = Path.cwd()
        try:
            os.chdir(BACKEND_DIR)
            from alembic import command
            from alembic.config import Config

            cfg = Config(str(BACKEND_DIR / "alembic.ini"))
            command.upgrade(cfg, "head")
        finally:
            os.chdir(cwd)

        yield async_dsn


@pytest_asyncio.fixture
async def db_session(_postgres_container: str) -> AsyncIterator[AsyncSession]:
    """Per-test session in its own connection-pool-of-one.

    A fresh engine is built per test so asyncpg's connection lives on the
    current event loop (pytest-asyncio re-creates the loop per function-
    scoped test). Outer transaction is rolled back at teardown so writes
    from one test never leak into the next.
    """
    engine = create_async_engine(_postgres_container, pool_pre_ping=True)
    sessionmaker = async_sessionmaker(engine, expire_on_commit=False)
    try:
        async with engine.connect() as conn:
            trans = await conn.begin()
            try:
                async with sessionmaker(bind=conn) as session:
                    yield session
            finally:
                await trans.rollback()
    finally:
        await engine.dispose()
