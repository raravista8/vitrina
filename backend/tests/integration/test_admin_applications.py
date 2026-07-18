"""Admin application views — v2/photo поля, маскировка Fernet-контактов,
reveal с аудитом, отдача файлов заявки (июль 2026).

Покрывает: список (v2-строка с названием/нишей), карточку v2 (booking
маской по умолчанию, без аудита), ?reveal=1 (клиртекст + admin_actions),
photo-роут (200 + байты, чужой application_id → 404, disk_path вне
uploads-корня → 404), auth negative.
"""

from __future__ import annotations

import uuid
from collections.abc import AsyncIterator
from datetime import UTC, datetime

import httpx
import pytest
import pytest_asyncio
from cryptography.fernet import Fernet, MultiFernet
from fastapi import FastAPI
from sqlalchemy import select

from app.api.dependencies import get_lead_fernet, get_session, require_admin
from app.api.routers.applications import resolve_uploads_dir
from app.core.auth.sessions import AdminSession
from app.core.leads.encryption import encrypt
from app.infrastructure.postgres.models import (
    AdminAction,
    Application,
    ApplicationPhoto,
)
from app.main import create_app

pytestmark = pytest.mark.integration

_PNG = (  # минимальный валидный 1×1 PNG
    b"\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01"
    b"\x08\x06\x00\x00\x00\x1f\x15\xc4\x89\x00\x00\x00\rIDATx\x9cc\xfc\xff"
    b"\xff?\x00\x05\xfe\x02\xfe\xa75\x81\x84\x00\x00\x00\x00IEND\xaeB`\x82"
)


@pytest_asyncio.fixture
async def fernet() -> MultiFernet:
    return MultiFernet([Fernet(Fernet.generate_key())])


@pytest_asyncio.fixture
async def seeded_v2(db_session, fernet: MultiFernet):  # type: ignore[no-untyped-def]
    """v2-заявка «по названию» + скриншот-фото на диске + Fernet-телефон записи."""
    application = Application(
        mode="v2",
        source_path="name",
        source_type="ymaps",
        niche="Маникюр",
        business_name="Студия Анны",
        city="Екатеринбург",
        booking_platform="phone",
        booking_phone_enc=encrypt("+79217947888", fernet=fernet),
        contact_type="telegram",
        contact_value="@anna_nails",
        ip="85.140.1.2",
        user_agent="Mozilla/5.0",
    )
    db_session.add(application)
    await db_session.flush()

    target_dir = resolve_uploads_dir() / str(application.id)
    target_dir.mkdir(parents=True, exist_ok=True)
    disk_path = target_dir / "00.png"
    disk_path.write_bytes(_PNG)
    photo = ApplicationPhoto(
        application_id=application.id,
        index=0,
        filename="скриншот профиля.png",
        photo_type="profile_screenshot",
        mime="image/png",
        size_bytes=len(_PNG),
        disk_path=str(disk_path),
    )
    db_session.add(photo)
    await db_session.commit()
    return application, photo


@pytest_asyncio.fixture
async def app(db_session, fernet: MultiFernet) -> AsyncIterator[FastAPI]:  # type: ignore[no-untyped-def]
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
    fastapi_app.dependency_overrides[get_lead_fernet] = lambda: fernet
    try:
        yield fastapi_app
    finally:
        fastapi_app.dependency_overrides.clear()


@pytest_asyncio.fixture
async def client(app: FastAPI) -> AsyncIterator[httpx.AsyncClient]:
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac


# ── список ───────────────────────────────────────────────────────────────────


async def test_list_shows_v2_summary(client: httpx.AsyncClient, seeded_v2) -> None:  # type: ignore[no-untyped-def]
    resp = await client.get("/admin/applications")
    assert resp.status_code == 200
    html = resp.text
    assert "Студия Анны" in html
    assert "Маникюр" in html
    assert "Екатеринбург" in html
    assert ">v2<" in html  # пилюля режима


# ── карточка: маска по умолчанию ─────────────────────────────────────────────


async def test_detail_masks_booking_phone_without_audit(
    client: httpx.AsyncClient,
    seeded_v2,  # type: ignore[no-untyped-def]
    db_session,  # type: ignore[no-untyped-def]
) -> None:
    application, _ = seeded_v2
    resp = await client.get(f"/admin/applications/{application.id}")
    assert resp.status_code == 200
    html = resp.text
    # v2-поля видны
    assert "Студия Анны" in html
    assert "Маникюр" in html
    assert "по названию" in html
    # телефон записи — только маской, клиртекста нет
    assert "+79217947888" not in html
    assert "78-88" in html  # mask_phone: '+***-***-78-88'
    # ссылка на reveal предложена
    assert "reveal=1" in html
    # маскированный рендер аудита не пишет
    actions = (await db_session.execute(select(AdminAction))).scalars().all()
    assert actions == []


async def test_detail_reveal_shows_cleartext_and_writes_audit(
    client: httpx.AsyncClient,
    seeded_v2,  # type: ignore[no-untyped-def]
    db_session,  # type: ignore[no-untyped-def]
) -> None:
    application, _ = seeded_v2
    resp = await client.get(f"/admin/applications/{application.id}?reveal=1")
    assert resp.status_code == 200
    assert "+79217947888" in resp.text
    action = (await db_session.execute(select(AdminAction))).scalar_one()
    assert action.action == "application_contact_decrypted"
    assert action.target_type == "application"
    assert action.target_id == str(application.id)
    assert action.params["booking_phone_decryption_ok"] is True


async def test_detail_renders_photo_preview(client: httpx.AsyncClient, seeded_v2) -> None:  # type: ignore[no-untyped-def]
    application, photo = seeded_v2
    resp = await client.get(f"/admin/applications/{application.id}")
    assert f"/admin/applications/{application.id}/photos/{photo.id}" in resp.text
    assert "profile_screenshot" in resp.text


# ── отдача файлов ────────────────────────────────────────────────────────────


async def test_photo_route_serves_bytes(client: httpx.AsyncClient, seeded_v2) -> None:  # type: ignore[no-untyped-def]
    application, photo = seeded_v2
    resp = await client.get(f"/admin/applications/{application.id}/photos/{photo.id}")
    assert resp.status_code == 200
    assert resp.headers["content-type"] == "image/png"
    assert resp.content == _PNG


async def test_photo_route_wrong_application_404(
    client: httpx.AsyncClient,
    seeded_v2,  # type: ignore[no-untyped-def]
) -> None:
    _, photo = seeded_v2
    resp = await client.get(f"/admin/applications/{uuid.uuid4()}/photos/{photo.id}")
    assert resp.status_code == 404


async def test_photo_route_path_outside_uploads_root_404(
    client: httpx.AsyncClient,
    seeded_v2,  # type: ignore[no-untyped-def]
    db_session,  # type: ignore[no-untyped-def]
) -> None:
    application, photo = seeded_v2
    photo.disk_path = "/etc/passwd"
    await db_session.commit()
    resp = await client.get(f"/admin/applications/{application.id}/photos/{photo.id}")
    assert resp.status_code == 404


# ── auth negative ────────────────────────────────────────────────────────────


class _NullRedis:
    """Достаточно для require_admin без cookie: сессия не ищется вовсе."""

    async def get(self, key: str) -> bytes | None:
        return None


async def test_detail_and_photo_require_admin(db_session, seeded_v2, fernet) -> None:  # type: ignore[no-untyped-def]
    application, photo = seeded_v2
    fastapi_app = create_app()

    async def _override_session():
        yield db_session

    # session и fernet подменяем, require_admin — НЕТ: реальная проверка сессии.
    # ASGITransport не гоняет lifespan → session store кладём в state руками.
    from app.core.auth.sessions import AdminSessionStore

    fastapi_app.dependency_overrides[get_session] = _override_session
    fastapi_app.dependency_overrides[get_lead_fernet] = lambda: fernet
    fastapi_app.state.admin_session_store = AdminSessionStore(
        _NullRedis(),  # type: ignore[arg-type]
        secret_key="test-secret",  # pragma: allowlist secret
    )
    transport = httpx.ASGITransport(app=fastapi_app)
    try:
        async with httpx.AsyncClient(transport=transport, base_url="http://test") as ac:
            for url in (
                f"/admin/applications/{application.id}",
                f"/admin/applications/{application.id}/photos/{photo.id}",
            ):
                resp = await ac.get(url)
                assert resp.status_code in (302, 303, 401, 403), url
    finally:
        fastapi_app.dependency_overrides.clear()
