"""POST /api/submit-application/v2 — intake v2 «ниша → источник → запись →
контакты» (июль 2026, ручное исполнение заявок).

Покрывает: 4 пути источника, валидации по путям, запись (dikidi/phone/none),
явные каналы контакта включая whatsapp, Fernet телефона записи, персист
скриншота как profile_screenshot, founder-тикет со всеми полями, ack.
"""

from __future__ import annotations

import io
from collections.abc import AsyncIterator

import httpx
import pytest
import pytest_asyncio
from fastapi import FastAPI
from PIL import Image
from sqlalchemy import select

from app.api.dependencies import (
    application_rate_limiter,
    get_captcha_verifier,
    get_lead_fernet,
    get_notification_dispatcher,
    get_session,
)
from app.core.captcha.verifier import CaptchaResult
from app.core.leads.encryption import decrypt
from app.core.notify.dispatcher import NotificationDispatcher
from app.core.notify.ports import ChannelType, DeliveryResult
from app.infrastructure.postgres.models import Application, ApplicationPhoto
from app.main import create_app

pytestmark = pytest.mark.integration


class _AcceptingCaptcha:
    async def verify(self, token: str, *, ip: str | None) -> CaptchaResult:
        return CaptchaResult(is_valid=True)


class _RecordingDispatcher(NotificationDispatcher):
    def __init__(self) -> None:
        super().__init__(channels={}, founder_telegram_chat_id=None)
        self.founder_bodies: list[str] = []
        self.user_calls: list[tuple[str, str]] = []

    async def notify_founder(self, kind, message):  # type: ignore[override,no-untyped-def]
        self.founder_bodies.append(message.body)
        return DeliveryResult(delivered=True, channel=ChannelType.telegram, recipient="t")

    async def notify_user(self, contact, kind, message):  # type: ignore[override,no-untyped-def]
        self.user_calls.append((contact.primary_type.value, contact.primary_value))
        return DeliveryResult(
            delivered=True, channel=contact.primary_type, recipient=contact.primary_value
        )


def _png() -> bytes:
    buf = io.BytesIO()
    Image.new("RGB", (32, 32), (200, 100, 50)).save(buf, format="PNG")
    return buf.getvalue()


@pytest_asyncio.fixture
async def app(db_session) -> AsyncIterator[FastAPI]:  # type: ignore[no-untyped-def]
    from cryptography.fernet import Fernet

    from app.core.leads.encryption import build_fernet

    fastapi_app = create_app()

    async def _override_session():
        yield db_session

    dispatcher = _RecordingDispatcher()
    fernet = build_fernet([Fernet.generate_key().decode("ascii")])
    fastapi_app.state.test_dispatcher = dispatcher
    fastapi_app.state.test_fernet = fernet
    fastapi_app.dependency_overrides[get_session] = _override_session
    fastapi_app.dependency_overrides[get_captcha_verifier] = lambda: _AcceptingCaptcha()
    fastapi_app.dependency_overrides[get_lead_fernet] = lambda: fernet
    fastapi_app.dependency_overrides[get_notification_dispatcher] = lambda: dispatcher
    fastapi_app.dependency_overrides[application_rate_limiter] = lambda: None
    try:
        yield fastapi_app
    finally:
        fastapi_app.dependency_overrides.clear()


@pytest_asyncio.fixture
async def client(app: FastAPI) -> AsyncIterator[httpx.AsyncClient]:
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac


def _base(**over):  # type: ignore[no-untyped-def]
    data = {
        "source_path": "name",
        "niche": "manicure",
        "business_name": "Студия Анны",
        "city": "Екатеринбург",
        "booking_platform": "dikidi",
        "booking_url": "https://dikidi.net/anna",
        "contact_channel": "telegram",
        "contact": "@anna_nails",
        "consent_given": "true",
        "captcha_token": "tok",
    }
    data.update(over)
    return data


# ── happy paths ──────────────────────────────────────────────────────────────


async def test_v2_name_path_happy(client, db_session, app) -> None:  # type: ignore[no-untyped-def]
    resp = await client.post("/api/submit-application/v2", data=_base())
    assert resp.status_code == 202, resp.text
    a = (await db_session.execute(select(Application))).scalar_one()
    assert a.mode == "v2"
    assert a.source_path == "name"
    assert a.source_type == "ymaps"
    assert a.niche == "manicure"
    assert a.business_name == "Студия Анны"
    assert a.booking_platform == "dikidi"
    assert a.booking_url == "https://dikidi.net/anna"
    assert a.contact_type == "telegram"
    assert a.contact_value == "@anna_nails"
    # founder-тикет несёт все поля ручной сборки
    body = app.state.test_dispatcher.founder_bodies[0]
    for marker in ("name", "manicure", "Студия Анны", "Екатеринбург", "dikidi"):
        assert marker in body
    # ack ушёл заявителю
    assert app.state.test_dispatcher.user_calls == [("telegram", "@anna_nails")]


async def test_v2_link_path_detects_source(client, db_session) -> None:  # type: ignore[no-untyped-def]
    resp = await client.post(
        "/api/submit-application/v2",
        data=_base(source_path="link", source_url="https://2gis.ru/spb/firm/123"),
    )
    assert resp.status_code == 202, resp.text
    a = (await db_session.execute(select(Application))).scalar_one()
    assert a.source_path == "link"
    assert a.source_type == "twogis"
    assert a.source_url == "https://2gis.ru/spb/firm/123"


async def test_v2_screenshot_path_persists_profile_screenshot(client, db_session) -> None:  # type: ignore[no-untyped-def]
    resp = await client.post(
        "/api/submit-application/v2",
        data=_base(source_path="screenshot", business_name=""),
        files=[("files", ("card.png", _png(), "image/png"))],
    )
    assert resp.status_code == 202, resp.text
    photo = (await db_session.execute(select(ApplicationPhoto))).scalar_one()
    assert photo.photo_type == "profile_screenshot"


async def test_v2_photo_path_up_to_five(client, db_session) -> None:  # type: ignore[no-untyped-def]
    files = [("files", (f"w{i}.png", _png(), "image/png")) for i in range(3)]
    resp = await client.post(
        "/api/submit-application/v2",
        data=_base(source_path="photo", business_name=""),
        files=files,
    )
    assert resp.status_code == 202, resp.text
    rows = (await db_session.execute(select(ApplicationPhoto))).scalars().all()
    assert len(rows) == 3
    assert all(r.photo_type == "work" for r in rows)


async def test_v2_whatsapp_channel_and_booking_phone_fernet(client, db_session, app) -> None:  # type: ignore[no-untyped-def]
    resp = await client.post(
        "/api/submit-application/v2",
        data=_base(
            contact_channel="whatsapp",
            contact="+7 921 794-78-88",
            booking_platform="phone",
            booking_url="",
            booking_phone="+7 (921) 794-78-88",
        ),
    )
    assert resp.status_code == 202, resp.text
    a = (await db_session.execute(select(Application))).scalar_one()
    assert a.contact_type == "whatsapp"
    assert a.contact_value == "+79217947888"
    # телефон записи зашифрован и раскрывается Fernet'ом
    assert a.booking_phone_enc is not None
    assert decrypt(bytes(a.booking_phone_enc), fernet=app.state.test_fernet) == "+79217947888"
    # полный номер не светится в founder-тикете (маска)
    body = app.state.test_dispatcher.founder_bodies[0]
    assert "+79217947888" not in body
    assert "7888" in body


# ── валидации ────────────────────────────────────────────────────────────────


async def test_v2_name_path_requires_business_name(client) -> None:  # type: ignore[no-untyped-def]
    resp = await client.post("/api/submit-application/v2", data=_base(business_name=""))
    assert resp.status_code == 400
    assert resp.json()["error"] == "business_name_required"


async def test_v2_link_path_rejects_garbage_url(client) -> None:  # type: ignore[no-untyped-def]
    resp = await client.post(
        "/api/submit-application/v2",
        data=_base(source_path="link", source_url="просто текст"),
    )
    assert resp.status_code == 400
    assert resp.json()["error"] == "invalid_source_url"


async def test_v2_screenshot_requires_exactly_one_file(client) -> None:  # type: ignore[no-untyped-def]
    resp = await client.post("/api/submit-application/v2", data=_base(source_path="screenshot"))
    assert resp.status_code == 400
    assert resp.json()["error"] == "screenshot_requires_one_file"


async def test_v2_photo_rejects_more_than_five(client) -> None:  # type: ignore[no-untyped-def]
    files = [("files", (f"w{i}.png", _png(), "image/png")) for i in range(6)]
    resp = await client.post(
        "/api/submit-application/v2",
        data=_base(source_path="photo", business_name=""),
        files=files,
    )
    assert resp.status_code == 400
    assert resp.json()["error"] == "photo_count_out_of_range"


async def test_v2_booking_url_garbage_blocked(client) -> None:  # type: ignore[no-untyped-def]
    resp = await client.post("/api/submit-application/v2", data=_base(booking_url="не ссылка"))
    assert resp.status_code == 400
    assert resp.json()["error"] == "invalid_booking_url"


async def test_v2_contact_channel_mismatch(client) -> None:  # type: ignore[no-untyped-def]
    resp = await client.post(
        "/api/submit-application/v2",
        data=_base(contact_channel="email", contact="это не почта"),
    )
    assert resp.status_code == 400
    assert resp.json()["error"] == "invalid_contact_for_channel"


async def test_v2_consent_required(client) -> None:  # type: ignore[no-untyped-def]
    resp = await client.post("/api/submit-application/v2", data=_base(consent_given="false"))
    assert resp.status_code == 400
    assert resp.json()["error"] == "consent_required"


async def test_v2_booking_none_is_not_dead_end(client, db_session) -> None:  # type: ignore[no-untyped-def]
    resp = await client.post(
        "/api/submit-application/v2",
        data=_base(booking_platform="none", booking_url=""),
    )
    assert resp.status_code == 202, resp.text
    a = (await db_session.execute(select(Application))).scalar_one()
    assert a.booking_platform == "none"
    assert a.booking_url is None
