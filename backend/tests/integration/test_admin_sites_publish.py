"""Integration test for POST /admin/sites/{id}/publish (T2.3).

Hits the admin publish endpoint with the FastAPI app, a testcontainers
Postgres, and an in-memory uploader + recording dispatcher. Verifies:

  - Site row flips to status=published with timestamp + seo log
  - All three static files end up in the uploader
  - admin_actions row records the publish with target_id + params
  - Owner receives a site_published notification (recorded by fake channel)

A site that lacks generated_content is rejected with a `not_publishable`
flash, leaving status untouched — that guard belongs to the publisher
boundary, not the orchestrator.
"""

from __future__ import annotations

import uuid
from collections.abc import AsyncIterator
from datetime import UTC, datetime
from pathlib import Path

import httpx
import pytest
import pytest_asyncio
from fastapi import FastAPI
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies import get_session, require_admin
from app.core.auth.sessions import AdminSession
from app.core.notify.dispatcher import NotificationDispatcher
from app.core.notify.ports import (
    ChannelType,
    DeliveryResult,
    NotificationChannel,
    NotificationMessage,
)
from app.core.publishing.service import SitePublisher
from app.core.seo.ports import SeoEngine, SubmissionResult
from app.core.seo.service import SeoSubmissionService
from app.infrastructure.postgres.models import AdminAction, Site, User
from app.infrastructure.s3.uploader import InMemoryStaticUploader
from app.main import create_app

pytestmark = pytest.mark.integration

TEMPLATE_DIR = Path(__file__).resolve().parents[3] / "sites-template"


# --- fakes ------------------------------------------------------------------


class _StubChannel:
    channel_type = ChannelType.telegram

    def __init__(self) -> None:
        self.sends: list[tuple[str, NotificationMessage]] = []

    def is_available(self) -> bool:
        return True

    async def send(self, *, recipient: str, message: NotificationMessage) -> DeliveryResult:
        self.sends.append((recipient, message))
        return DeliveryResult(delivered=True, channel=self.channel_type, recipient=recipient)


class _AlwaysAvailableSeoSubmitter:
    def __init__(self, engine: SeoEngine) -> None:
        self.engine = engine

    def is_available(self) -> bool:
        return True

    async def submit(self, site_url: str) -> SubmissionResult:
        return SubmissionResult(engine=self.engine, submitted=True, upstream_status=200)


# --- fixtures ---------------------------------------------------------------


@pytest_asyncio.fixture
async def seeded_site_and_owner(
    db_session: AsyncSession,
) -> tuple[User, Site]:
    owner = User(
        contact_type="telegram",
        contact_value="123456789",
        plan="trial",
    )
    db_session.add(owner)
    await db_session.flush()

    site = Site(
        user_id=owner.id,
        subdomain="anna-test",
        source_type="ymaps",
        source_url="https://yandex.ru/maps/test",
        status="review",
        generated_content={
            "site_title": "Студия маникюра Анны",
            "site_description": "Маникюр в Петрозаводске.",
            "site_color": "#0f172a",
            "site_logo_url": None,
            "site_hero_photo": None,
            "site_category": "beauty.nails",
            "organization": {
                "name": "ИП Анна Иванова",
                "phone": "+7 921 123-45-67",
                "email": "anna@example.com",
                "address": "Петрозаводск",
                "geo": {"lat": 61.78, "lon": 34.34},
                "opening_hours": [],
            },
            "services": [],
            "gallery": [],
            "reviews": [],
        },
    )
    db_session.add(site)
    await db_session.flush()
    return owner, site


@pytest_asyncio.fixture
async def app_with_publisher(
    db_session: AsyncSession,
) -> AsyncIterator[tuple[FastAPI, InMemoryStaticUploader, _StubChannel]]:
    """FastAPI app with the publisher wired to in-memory fakes."""
    fastapi_app = create_app()

    async def _override_session() -> AsyncIterator[AsyncSession]:
        yield db_session

    # Short-circuit the cookie-based auth — we synthesise an AdminSession
    # directly so the publish route only exercises its own logic.
    admin_id = uuid.uuid4()
    fake_admin = AdminSession(
        session_id="test-session",
        admin_id=admin_id,
        created_at=datetime.now(UTC),
        last_seen_at=datetime.now(UTC),
    )

    uploader = InMemoryStaticUploader()
    channel = _StubChannel()
    channels: dict[ChannelType, NotificationChannel] = {channel.channel_type: channel}
    notifier = NotificationDispatcher(channels=channels)
    seo = SeoSubmissionService(
        submitters={
            SeoEngine.indexnow: _AlwaysAvailableSeoSubmitter(SeoEngine.indexnow),
        }
    )
    fastapi_app.state.site_publisher = SitePublisher(
        template_dir=TEMPLATE_DIR,
        uploader=uploader,
        seo=seo,
        notifier=notifier,
    )

    fastapi_app.dependency_overrides[get_session] = _override_session
    fastapi_app.dependency_overrides[require_admin] = lambda: fake_admin

    try:
        yield fastapi_app, uploader, channel
    finally:
        fastapi_app.dependency_overrides.clear()


@pytest_asyncio.fixture
async def client(
    app_with_publisher: tuple[FastAPI, InMemoryStaticUploader, _StubChannel],
) -> AsyncIterator[httpx.AsyncClient]:
    app, _, _ = app_with_publisher
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(
        transport=transport,
        base_url="http://test",
    ) as ac:
        yield ac


# --- tests ------------------------------------------------------------------


async def test_publish_flips_site_to_published(
    client: httpx.AsyncClient,
    db_session: AsyncSession,
    seeded_site_and_owner: tuple[User, Site],
    app_with_publisher: tuple[FastAPI, InMemoryStaticUploader, _StubChannel],
) -> None:
    _, site = seeded_site_and_owner
    _, uploader, channel = app_with_publisher

    resp = await client.post(
        f"/admin/sites/{site.id}/publish",
        follow_redirects=False,
    )
    assert resp.status_code == 303, resp.text
    assert resp.headers["location"] == f"/admin/sites/{site.id}?flash=published"

    await db_session.refresh(site)
    assert site.status == "published"
    assert site.published_at is not None
    assert "indexnow" in site.seo_submission_log
    assert site.seo_submission_log["indexnow"]["submitted"] is True

    assert "anna-test/index.html" in uploader.objects
    assert "anna-test/sitemap.xml" in uploader.objects
    assert "anna-test/robots.txt" in uploader.objects

    assert len(channel.sends) == 1
    recipient, message = channel.sends[0]
    assert recipient == "123456789"
    assert "anna-test.samosite.online" in message.body


async def test_publish_writes_audit_log(
    client: httpx.AsyncClient,
    db_session: AsyncSession,
    seeded_site_and_owner: tuple[User, Site],
) -> None:
    _, site = seeded_site_and_owner

    await client.post(f"/admin/sites/{site.id}/publish", follow_redirects=False)

    actions = (
        (
            await db_session.execute(
                select(AdminAction).where(
                    AdminAction.action == "site_published",
                    AdminAction.target_id == str(site.id),
                )
            )
        )
        .scalars()
        .all()
    )
    assert len(actions) == 1
    assert actions[0].target_type == "site"
    assert "anna-test.samosite.online" in actions[0].params["site_url"]
    assert "indexnow" in actions[0].params["seo_succeeded"]


async def test_publish_rejects_site_without_generated_content(
    client: httpx.AsyncClient,
    db_session: AsyncSession,
) -> None:
    owner = User(contact_type="email", contact_value="x@y.test", plan="trial")
    db_session.add(owner)
    await db_session.flush()
    site = Site(
        user_id=owner.id,
        subdomain="not-ready",
        source_type="ymaps",
        status="pending",
        generated_content=None,
    )
    db_session.add(site)
    await db_session.flush()

    resp = await client.post(f"/admin/sites/{site.id}/publish", follow_redirects=False)
    assert resp.status_code == 303
    assert resp.headers["location"].endswith("?flash=not_publishable")

    await db_session.refresh(site)
    assert site.status == "pending"
    assert site.published_at is None


async def test_publish_404_for_unknown_site(client: httpx.AsyncClient) -> None:
    resp = await client.post(
        f"/admin/sites/{uuid.uuid4()}/publish",
        follow_redirects=False,
    )
    assert resp.status_code == 404
