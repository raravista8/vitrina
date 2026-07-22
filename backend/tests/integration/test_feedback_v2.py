"""POST /api/feedback/v2 — «Что останавливает?» (blocker) + «Задать вопрос»
(question), CANON_FEEDBACK_V2_TZ (июль 2026).

Покрывает: оба режима, инварианты режимов, валидацию контакта по каналу,
согласие при контакте (и его НЕобязательность без контакта), персист
v2-колонок, founder-тикет с причиной/пометкой источника и маской контакта.
"""

from __future__ import annotations

from collections.abc import AsyncIterator

import httpx
import pytest
import pytest_asyncio
from fastapi import FastAPI
from sqlalchemy import select

from app.api.dependencies import (
    feedback_rate_limiter,
    get_captcha_verifier,
    get_notification_dispatcher,
    get_session,
)
from app.core.captcha.verifier import CaptchaResult
from app.core.notify.dispatcher import NotificationDispatcher
from app.core.notify.ports import ChannelType, DeliveryResult
from app.infrastructure.postgres.models import Consent, Feedback
from app.main import create_app

pytestmark = pytest.mark.integration


class _AcceptingCaptcha:
    async def verify(self, token: str, *, ip: str | None) -> CaptchaResult:
        return CaptchaResult(is_valid=True)


class _RecordingDispatcher(NotificationDispatcher):
    def __init__(self) -> None:
        super().__init__(channels={}, founder_telegram_chat_id=None)
        self.founder_msgs: list[tuple[str, str, str | None]] = []  # (title, body, subject)

    async def notify_founder(self, kind, message):  # type: ignore[override,no-untyped-def]
        self.founder_msgs.append(
            (message.title, message.body, (message.metadata or {}).get("email_subject"))
        )
        return DeliveryResult(delivered=True, channel=ChannelType.telegram, recipient="t")


@pytest_asyncio.fixture
async def app(db_session) -> AsyncIterator[FastAPI]:  # type: ignore[no-untyped-def]
    fastapi_app = create_app()

    async def _override_session():
        yield db_session

    dispatcher = _RecordingDispatcher()
    fastapi_app.state.test_dispatcher = dispatcher
    fastapi_app.dependency_overrides[get_session] = _override_session
    fastapi_app.dependency_overrides[get_captcha_verifier] = lambda: _AcceptingCaptcha()
    fastapi_app.dependency_overrides[get_notification_dispatcher] = lambda: dispatcher
    fastapi_app.dependency_overrides[feedback_rate_limiter] = lambda: None
    try:
        yield fastapi_app
    finally:
        fastapi_app.dependency_overrides.clear()


@pytest_asyncio.fixture
async def client(app: FastAPI) -> AsyncIterator[httpx.AsyncClient]:
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac


def _blocker(**over):  # type: ignore[no-untyped-def]
    body = {
        "mode": "blocker",
        "trigger": "exit",
        "reason": "too_expensive",
        "note": "дороговато для старта",
        "contact_channel": "telegram",
        "contact": "@anna_nails",
        "consent_given": True,
        "captcha_token": "tok",
    }
    body.update(over)
    return {k: v for k, v in body.items() if v is not None}


def _question(**over):  # type: ignore[no-untyped-def]
    body = {
        "mode": "question",
        "trigger": "button",
        "question": "А можно подключить свой домен?",
        "contact_channel": "email",
        "contact": "anna@example.com",
        "consent_given": True,
        "captcha_token": "tok",
    }
    body.update(over)
    return {k: v for k, v in body.items() if v is not None}


# ── happy paths ──────────────────────────────────────────────────────────────


async def test_blocker_with_contact(client, db_session, app) -> None:  # type: ignore[no-untyped-def]
    resp = await client.post("/api/feedback/v2", json=_blocker())
    assert resp.status_code == 202, resp.text
    row = (await db_session.execute(select(Feedback))).scalar_one()
    assert row.type == "blocker"
    assert row.trigger == "exit"
    assert row.reason == "too_expensive"
    assert row.message == "дороговато для старта"
    assert row.contact_channel == "telegram"
    assert row.contact == "@anna_nails"
    # согласие записано в ledger
    consents = (await db_session.execute(select(Consent))).scalars().all()
    assert len(consents) == 1
    # founder-тикет: причина + пометка источника + мини-лид + маска (не клиртекст)
    title, body, subject = app.state.test_dispatcher.founder_msgs[0]
    assert "too_expensive" in title
    assert "Источник: feedback" in body
    assert "черновик" in body
    assert "@anna_nails" not in body
    assert subject == "фидбек: too_expensive"


async def test_blocker_without_contact_needs_no_consent(client, db_session) -> None:  # type: ignore[no-untyped-def]
    resp = await client.post(
        "/api/feedback/v2",
        json=_blocker(contact=None, contact_channel=None, consent_given=False, note=None),
    )
    assert resp.status_code == 202, resp.text
    row = (await db_session.execute(select(Feedback))).scalar_one()
    assert row.contact is None
    assert row.contact_channel is None
    consents = (await db_session.execute(select(Consent))).scalars().all()
    assert consents == []


async def test_question_happy(client, db_session, app) -> None:  # type: ignore[no-untyped-def]
    resp = await client.post("/api/feedback/v2", json=_question())
    assert resp.status_code == 202, resp.text
    row = (await db_session.execute(select(Feedback))).scalar_one()
    assert row.type == "question"
    assert row.trigger == "button"
    assert row.message == "А можно подключить свой домен?"
    assert row.contact == "anna@example.com"
    title, body, subject = app.state.test_dispatcher.founder_msgs[0]
    assert "Вопрос" in title
    assert "anna@example.com" not in body  # только маска
    assert subject == "вопрос с сайта"


async def test_whatsapp_contact_normalized(client, db_session) -> None:  # type: ignore[no-untyped-def]
    resp = await client.post(
        "/api/feedback/v2",
        json=_blocker(contact_channel="whatsapp", contact="+7 921 794-78-88"),
    )
    assert resp.status_code == 202, resp.text
    row = (await db_session.execute(select(Feedback))).scalar_one()
    assert row.contact == "+79217947888"


# ── инварианты режимов и валидации ───────────────────────────────────────────


@pytest.mark.parametrize(
    ("payload", "code"),
    [
        (_blocker(reason=None), "reason_required"),
        (_blocker(reason="НЕ СЛАГ!"), "invalid_reason"),
        (_blocker(question="лишнее"), "question_not_allowed"),
        (_question(question=None), "question_required"),
        (_question(reason="too_expensive"), "reason_not_allowed"),
        (_question(contact=None, contact_channel=None), "contact_required"),
        (_blocker(contact_channel=None), "channel_required"),
        (_blocker(contact_channel="email", contact="это не почта"), "invalid_contact_for_channel"),
        (_blocker(consent_given=False), "consent_required"),
    ],
)
async def test_validation_errors(client, payload, code) -> None:  # type: ignore[no-untyped-def]
    resp = await client.post("/api/feedback/v2", json=payload)
    assert resp.status_code == 400, resp.text
    assert resp.json()["error"] == code


async def test_unknown_field_rejected_422(client) -> None:  # type: ignore[no-untyped-def]
    resp = await client.post("/api/feedback/v2", json={**_blocker(), "hacker": "x"})
    assert resp.status_code == 422
