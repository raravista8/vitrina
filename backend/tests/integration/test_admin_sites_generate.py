"""Integration test for POST /admin/sites/{id}/generate (T4.1 + T4.5).

Wires the real admin router against testcontainers Postgres + a fake
LlmClient. Verifies:

  - Snapshot → LLM → generated_content + status=review + audit row
  - LLM failure → status unchanged, audit row records error
  - Flagged generation → content kept, audit reflects flags
  - Missing snapshot → flash banner only, no LLM call
"""

from __future__ import annotations

import json
import uuid
from collections.abc import AsyncIterator
from datetime import UTC, datetime

import httpx
import pytest
import pytest_asyncio
from fastapi import FastAPI
from sqlalchemy import select

from app.api.dependencies import get_content_llm, get_session, require_admin
from app.core.auth.sessions import AdminSession
from app.core.content.ports import LlmCallError, LlmCallResult
from app.infrastructure.postgres.models import (
    AdminAction,
    GenerationAudit,
    Site,
    User,
)
from app.main import create_app

pytestmark = pytest.mark.integration


# --- fake LLM -------------------------------------------------------------


class _FakeLlm:
    model_name = "fake-gpt"

    def __init__(
        self,
        *,
        text: str = "",
        available: bool = True,
        raise_exc: Exception | None = None,
    ) -> None:
        self._text = text
        self._available = available
        self._raise = raise_exc
        self.calls: int = 0

    def is_available(self) -> bool:
        return self._available

    async def complete(
        self,
        *,
        system_prompt: str,
        user_prompt: str,
        max_tokens: int,
    ) -> LlmCallResult:
        self.calls += 1
        if self._raise is not None:
            raise self._raise
        return LlmCallResult(
            text=self._text,
            tokens_in=200,
            tokens_out=400,
            model_name=self.model_name,
        )


def _good_payload() -> str:
    return json.dumps(
        {
            "site_title": "Студия Анны",
            "site_description": "Маникюр в Петрозаводске.",
            "site_category": "beauty.nails",
            "site_color": "#0f172a",
            "site_hero_photo": "",
            "services": [{"title": "Маникюр", "description": "30 мин.", "price_label": "1500 ₽"}],
            "gallery": [],
            "reviews": [],
        }
    )


# --- fixtures -------------------------------------------------------------


@pytest_asyncio.fixture
async def seeded_site(db_session):  # type: ignore[no-untyped-def]
    user = User(contact_type="email", contact_value="anna@example.com")
    db_session.add(user)
    await db_session.flush()

    site = Site(
        user_id=user.id,
        subdomain="anna",
        source_type="ymaps",
        source_url="https://yandex.ru/maps/org/1",
        status="pending",
        source_snapshot={
            "source_type": "ymaps",
            "source_ref": "https://yandex.ru/maps/org/1",
            "title": "Студия Анны",
            "description": "Маникюр",
            "contacts": [],
            "photos": [],
            "reviews": [],
            "services": [{"title": "Маникюр", "description": None, "price_label": None}],
            "metadata": {},
        },
    )
    db_session.add(site)
    await db_session.commit()
    return site


@pytest_asyncio.fixture
async def app_with_llm(db_session) -> AsyncIterator[tuple[FastAPI, _FakeLlm]]:  # type: ignore[no-untyped-def]
    fastapi_app = create_app()

    async def _override_session():
        yield db_session

    fake_admin = AdminSession(
        session_id="test-session",
        admin_id=uuid.uuid4(),
        created_at=datetime.now(UTC),
        last_seen_at=datetime.now(UTC),
    )
    llm = _FakeLlm(text=_good_payload())
    fastapi_app.dependency_overrides[get_session] = _override_session
    fastapi_app.dependency_overrides[require_admin] = lambda: fake_admin
    fastapi_app.dependency_overrides[get_content_llm] = lambda: llm

    try:
        yield fastapi_app, llm
    finally:
        fastapi_app.dependency_overrides.clear()


@pytest_asyncio.fixture
async def client(app_with_llm) -> AsyncIterator[httpx.AsyncClient]:  # type: ignore[no-untyped-def]
    app, _ = app_with_llm
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac


# --- happy path -----------------------------------------------------------


async def test_generate_success_writes_content_audit_and_status(
    client: httpx.AsyncClient,
    db_session,  # type: ignore[no-untyped-def]
    seeded_site,  # type: ignore[no-untyped-def]
    app_with_llm,  # type: ignore[no-untyped-def]
) -> None:
    _, llm = app_with_llm
    resp = await client.post(f"/admin/sites/{seeded_site.id}/generate", follow_redirects=False)
    assert resp.status_code == 303
    assert resp.headers["location"].endswith("?flash=generated_success")
    assert llm.calls == 1

    await db_session.refresh(seeded_site)
    assert seeded_site.status == "review"
    assert seeded_site.generated_content is not None
    assert seeded_site.generated_content["site_title"] == "Студия Анны"

    audits = (await db_session.execute(select(GenerationAudit))).scalars().all()
    assert len(audits) == 1
    audit = audits[0]
    assert audit.status == "success"
    assert audit.tokens_in == 200
    assert audit.tokens_out == 400
    # First 100 rows capture full prompt + response
    assert audit.user_prompt is not None
    assert "<user_content>" in audit.user_prompt
    assert audit.response_text == _good_payload()

    actions = (await db_session.execute(select(AdminAction))).scalars().all()
    assert any(a.action == "content_generated" for a in actions)


# --- failure paths --------------------------------------------------------


async def test_llm_transport_failure_records_failed_audit(
    client: httpx.AsyncClient,
    db_session,  # type: ignore[no-untyped-def]
    seeded_site,  # type: ignore[no-untyped-def]
    app_with_llm,  # type: ignore[no-untyped-def]
) -> None:
    _, llm = app_with_llm
    llm._raise = LlmCallError("upstream_5xx")

    resp = await client.post(f"/admin/sites/{seeded_site.id}/generate", follow_redirects=False)
    assert resp.status_code == 303
    assert resp.headers["location"].endswith("?flash=generated_failed")

    await db_session.refresh(seeded_site)
    assert seeded_site.generated_content is None  # nothing written
    assert seeded_site.status == "pending"  # unchanged

    audits = (await db_session.execute(select(GenerationAudit))).scalars().all()
    assert len(audits) == 1
    assert audits[0].status == "failed"
    assert "LlmCallError" in (audits[0].error_message or "")


async def test_garbage_response_flagged_failed(
    client: httpx.AsyncClient,
    db_session,  # type: ignore[no-untyped-def]
    seeded_site,  # type: ignore[no-untyped-def]
    app_with_llm,  # type: ignore[no-untyped-def]
) -> None:
    _, llm = app_with_llm
    llm._text = "totally not json"

    resp = await client.post(f"/admin/sites/{seeded_site.id}/generate", follow_redirects=False)
    assert resp.status_code == 303
    assert resp.headers["location"].endswith("?flash=generated_failed")
    await db_session.refresh(seeded_site)
    assert seeded_site.generated_content is None


async def test_off_allowlist_url_flags_but_keeps_content(
    client: httpx.AsyncClient,
    db_session,  # type: ignore[no-untyped-def]
    seeded_site,  # type: ignore[no-untyped-def]
    app_with_llm,  # type: ignore[no-untyped-def]
) -> None:
    _, llm = app_with_llm
    llm._text = json.dumps(
        {
            "site_title": "Студия",
            "site_description": "Click https://evil.com/x",
            "site_category": "beauty",
            "site_color": "#000",
            "site_hero_photo": "",
            "services": [{"title": "X", "description": "", "price_label": ""}],
            "gallery": [],
            "reviews": [],
        }
    )

    resp = await client.post(f"/admin/sites/{seeded_site.id}/generate", follow_redirects=False)
    assert resp.status_code == 303
    assert resp.headers["location"].endswith("?flash=generated_flagged")

    await db_session.refresh(seeded_site)
    assert seeded_site.generated_content is not None  # content kept
    assert seeded_site.status == "review"

    audits = (await db_session.execute(select(GenerationAudit))).scalars().all()
    assert audits[0].status == "flagged"
    assert any("url_off_allowlist" in f for f in audits[0].safety_flags)


async def test_missing_snapshot_does_not_call_llm(
    client: httpx.AsyncClient,
    db_session,  # type: ignore[no-untyped-def]
    app_with_llm,  # type: ignore[no-untyped-def]
) -> None:
    _, llm = app_with_llm
    user = User(contact_type="email", contact_value="x@y.test")
    db_session.add(user)
    await db_session.flush()
    site = Site(
        user_id=user.id,
        subdomain="empty",
        source_type="ymaps",
        status="pending",
        source_snapshot=None,
    )
    db_session.add(site)
    await db_session.commit()

    resp = await client.post(f"/admin/sites/{site.id}/generate", follow_redirects=False)
    assert resp.status_code == 303
    assert resp.headers["location"].endswith("?flash=no_snapshot")
    assert llm.calls == 0
