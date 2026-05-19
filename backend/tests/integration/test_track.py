"""Integration tests for POST /api/track (T5.1)."""

from __future__ import annotations

import uuid
from collections.abc import AsyncIterator

import httpx
import pytest
import pytest_asyncio
from fastapi import FastAPI
from sqlalchemy import select

from app.api.dependencies import get_session, track_rate_limiter
from app.infrastructure.postgres.models import Event, Site, User
from app.main import create_app

pytestmark = pytest.mark.integration


@pytest_asyncio.fixture
async def published_site(db_session):  # type: ignore[no-untyped-def]
    user = User(contact_type="email", contact_value="owner@example.com")
    db_session.add(user)
    await db_session.flush()
    site = Site(
        user_id=user.id,
        subdomain="anna",
        source_type="ymaps",
        status="published",
    )
    db_session.add(site)
    await db_session.commit()
    return site


@pytest_asyncio.fixture
async def app(db_session) -> AsyncIterator[FastAPI]:  # type: ignore[no-untyped-def]
    fastapi_app = create_app()

    async def _override_session():
        yield db_session

    fastapi_app.dependency_overrides[get_session] = _override_session
    fastapi_app.dependency_overrides[track_rate_limiter] = lambda: None
    try:
        yield fastapi_app
    finally:
        fastapi_app.dependency_overrides.clear()


@pytest_asyncio.fixture
async def client(app: FastAPI) -> AsyncIterator[httpx.AsyncClient]:
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac


# --- happy path -----------------------------------------------------------


@pytest.mark.parametrize(
    "event_type",
    ["pageview", "click_phone", "click_tg", "click_wa", "form_view", "form_submit"],
)
async def test_event_persisted(
    client: httpx.AsyncClient,
    db_session,  # type: ignore[no-untyped-def]
    published_site,  # type: ignore[no-untyped-def]
    event_type: str,
) -> None:
    resp = await client.post(
        "/api/track",
        json={
            "site_id": str(published_site.id),
            "event_type": event_type,
            "payload": {"ts": 1700000000},
        },
    )
    assert resp.status_code == 202, resp.text
    body = resp.json()
    assert body["ok"] is True
    event_id = body["data"]["event_id"]

    row = (await db_session.execute(select(Event).where(Event.id == event_id))).scalar_one()
    assert row.event_type == event_type
    assert row.site_id == published_site.id
    assert row.payload == {"ts": 1700000000}


# --- failure modes --------------------------------------------------------


async def test_unknown_site_returns_404(client: httpx.AsyncClient) -> None:
    resp = await client.post(
        "/api/track",
        json={
            "site_id": str(uuid.uuid4()),
            "event_type": "pageview",
            "payload": {},
        },
    )
    assert resp.status_code == 404


async def test_unpublished_site_treated_as_unknown(
    client: httpx.AsyncClient,
    db_session,  # type: ignore[no-untyped-def]
) -> None:
    """Don't reveal that a draft subdomain exists — same 404 as a
    fully missing site."""
    user = User(contact_type="email", contact_value="x@y.test")
    db_session.add(user)
    await db_session.flush()
    site = Site(
        user_id=user.id,
        subdomain="draft",
        source_type="ymaps",
        status="review",
    )
    db_session.add(site)
    await db_session.commit()

    resp = await client.post(
        "/api/track",
        json={"site_id": str(site.id), "event_type": "pageview", "payload": {}},
    )
    assert resp.status_code == 404


async def test_bad_event_type_rejected(
    client: httpx.AsyncClient,
    published_site,  # type: ignore[no-untyped-def]
) -> None:
    resp = await client.post(
        "/api/track",
        json={
            "site_id": str(published_site.id),
            "event_type": "definitely_not_a_real_event",
            "payload": {},
        },
    )
    assert resp.status_code == 422


async def test_extra_fields_rejected(
    client: httpx.AsyncClient,
    published_site,  # type: ignore[no-untyped-def]
) -> None:
    resp = await client.post(
        "/api/track",
        json={
            "site_id": str(published_site.id),
            "event_type": "pageview",
            "payload": {},
            "evil": "marker",
        },
    )
    assert resp.status_code == 422


async def test_oversized_payload_rejected(
    client: httpx.AsyncClient,
    published_site,  # type: ignore[no-untyped-def]
) -> None:
    big_payload = {"k": "x" * 5000}  # > 4 KB once serialised
    resp = await client.post(
        "/api/track",
        json={
            "site_id": str(published_site.id),
            "event_type": "pageview",
            "payload": big_payload,
        },
    )
    assert resp.status_code == 413
