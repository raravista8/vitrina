"""GET /admin/feedback — инбокс обращений (Feedback v2 + legacy)."""

from __future__ import annotations

import uuid
from collections.abc import AsyncIterator
from datetime import UTC, datetime

import httpx
import pytest
import pytest_asyncio
from fastapi import FastAPI
from sqlalchemy import select

from app.api.dependencies import get_session, require_admin
from app.core.auth.sessions import AdminSession
from app.infrastructure.postgres.models import Feedback
from app.main import create_app

pytestmark = pytest.mark.integration


@pytest_asyncio.fixture
async def seeded(db_session):  # type: ignore[no-untyped-def]
    rows = [
        Feedback(
            type="blocker",
            trigger="exit",
            reason="price",
            message="дороговато",
            contact_channel="telegram",
            contact="@anna_nails",
        ),
        Feedback(
            type="question",
            trigger="button",
            message="Можно свой домен?",
            contact_channel="email",
            contact="anna@example.com",
        ),
        Feedback(type="source_request", source_name="instagram", email="old@example.com"),
    ]
    db_session.add_all(rows)
    await db_session.commit()
    return rows


@pytest_asyncio.fixture
async def app(db_session) -> AsyncIterator[FastAPI]:  # type: ignore[no-untyped-def]
    fastapi_app = create_app()

    async def _override_session():
        yield db_session

    fake_admin = AdminSession(
        session_id="test-session",
        admin_id=uuid.uuid4(),
        created_at=datetime.now(UTC),
        last_seen_at=datetime.now(UTC),
    )
    fastapi_app.dependency_overrides[get_session] = _override_session
    fastapi_app.dependency_overrides[require_admin] = lambda: fake_admin
    try:
        yield fastapi_app
    finally:
        fastapi_app.dependency_overrides.clear()


@pytest_asyncio.fixture
async def client(app: FastAPI) -> AsyncIterator[httpx.AsyncClient]:
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac


async def test_list_shows_v2_and_legacy_rows(client, seeded) -> None:  # type: ignore[no-untyped-def]
    resp = await client.get("/admin/feedback")
    assert resp.status_code == 200
    html = resp.text
    # v2-блокер: причина, триггер, текст, контакт открыт (политика applications)
    assert "price" in html
    assert "exit-intent" in html
    assert "дороговато" in html
    assert "@anna_nails" in html
    # v2-вопрос
    assert "Можно свой домен?" in html
    assert "anna@example.com" in html
    # legacy-строка тоже видна
    assert "instagram" in html
    assert "old@example.com" in html


async def test_type_filter(client, seeded) -> None:  # type: ignore[no-untyped-def]
    resp = await client.get("/admin/feedback?type=blocker")
    assert resp.status_code == 200
    assert "price" in resp.text
    assert "Можно свой домен?" not in resp.text
    # мусорный фильтр игнорируется (показывает всё), не 500
    resp = await client.get("/admin/feedback?type=%27--")
    assert resp.status_code == 200


async def test_requires_admin(db_session, seeded) -> None:  # type: ignore[no-untyped-def]
    from app.core.auth.sessions import AdminSessionStore

    class _NullRedis:
        async def get(self, key: str) -> bytes | None:
            return None

    fastapi_app = create_app()

    async def _override_session():
        yield db_session

    fastapi_app.dependency_overrides[get_session] = _override_session
    fastapi_app.state.admin_session_store = AdminSessionStore(
        _NullRedis(),  # type: ignore[arg-type]
        secret_key="test-secret",  # pragma: allowlist secret
    )
    transport = httpx.ASGITransport(app=fastapi_app)
    try:
        async with httpx.AsyncClient(transport=transport, base_url="http://test") as ac:
            resp = await ac.get("/admin/feedback")
            assert resp.status_code in (302, 303, 401, 403)
            # PII не утекла на login-редиректе
            assert "@anna_nails" not in resp.text
    finally:
        fastapi_app.dependency_overrides.clear()


async def test_seed_rows_present(db_session, seeded) -> None:  # type: ignore[no-untyped-def]
    rows = (await db_session.execute(select(Feedback))).scalars().all()
    assert len(rows) == 3
