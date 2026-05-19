"""Unit tests for the SitePublisher orchestrator (T2.3).

Tests live at the domain layer: render + upload + seo + notify composed
together, with fakes for every port. The admin-router integration is
covered separately in tests/integration/test_admin_sites_publish.py.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path

import pytest

from app.core.notify.dispatcher import UserContact
from app.core.notify.ports import (
    ChannelType,
    DeliveryResult,
    NotificationChannel,
    NotificationMessage,
)
from app.core.publishing.service import PublishContext, SitePublisher
from app.core.seo.ports import SeoEngine, SubmissionResult
from app.core.seo.service import SeoSubmissionService
from app.infrastructure.s3.uploader import InMemoryStaticUploader

TEMPLATE_DIR = Path(__file__).resolve().parents[3] / "sites-template"


# --- fakes ------------------------------------------------------------------


@dataclass
class _RecordingChannel:
    """Captures every send for assertions; honours availability flag."""

    channel_type: ChannelType
    available: bool = True
    delivered: bool = True
    sends: list[tuple[str, NotificationMessage]] = field(default_factory=list)

    def is_available(self) -> bool:
        return self.available

    async def send(self, *, recipient: str, message: NotificationMessage) -> DeliveryResult:
        self.sends.append((recipient, message))
        return DeliveryResult(
            delivered=self.delivered,
            channel=self.channel_type,
            recipient=recipient,
            reason=None if self.delivered else "test_failure",
        )


class _StubSeoSubmitter:
    def __init__(self, engine: SeoEngine, *, succeeds: bool = True) -> None:
        self.engine = engine
        self._succeeds = succeeds

    def is_available(self) -> bool:
        return True

    async def submit(self, site_url: str) -> SubmissionResult:
        return SubmissionResult(engine=self.engine, submitted=self._succeeds)


# --- fixtures ---------------------------------------------------------------


@pytest.fixture
def render_context() -> dict[str, object]:
    """Minimal payload sufficient to render the canonical T2.5 template."""
    return {
        "site_url": "https://anna.vitrina.site",
        "site_title": "Студия маникюра Анны",
        "site_description": "Маникюр в Петрозаводске.",
        "site_locale": "ru_RU",
        "site_category": "beauty.nails",
        "site_color": "#0f172a",
        "site_logo_url": None,
        "site_hero_photo": None,
        "organization": {
            "name": "ИП Анна Иванова",
            "phone": "+7 921 123-45-67",
            "email": "anna@example.com",
            "address": "Петрозаводск, ул. Ленина 1",
            "geo": {"lat": 61.7849, "lon": 34.3469},
            "opening_hours": [{"day": "Mo,Tu,We,Th,Fr", "opens": "10:00", "closes": "20:00"}],
        },
        "services": [{"title": "Маникюр", "description": "30 мин.", "price_label": "от 1500 ₽"}],
        "gallery": [],
        "reviews": [],
        "contact_url": "/api/leads",
        "captcha_client_key": "test-key",  # pragma: allowlist secret
        "year": 2026,
    }


def _make_publisher(
    *,
    uploader: InMemoryStaticUploader,
    channel: _RecordingChannel,
    seo_succeeds: bool = True,
) -> SitePublisher:
    dispatcher_module_channels: dict[ChannelType, NotificationChannel] = {
        channel.channel_type: channel,
    }
    from app.core.notify.dispatcher import NotificationDispatcher

    notifier = NotificationDispatcher(channels=dispatcher_module_channels)
    seo = SeoSubmissionService(
        submitters={
            SeoEngine.indexnow: _StubSeoSubmitter(SeoEngine.indexnow, succeeds=seo_succeeds),
        }
    )
    return SitePublisher(
        template_dir=TEMPLATE_DIR,
        uploader=uploader,
        seo=seo,
        notifier=notifier,
    )


def _make_context(render_context: dict[str, object]) -> PublishContext:
    return PublishContext(
        site_id="00000000-0000-0000-0000-000000000001",
        subdomain="anna",
        site_url="https://anna.vitrina.site",
        render_context=render_context,
        owner_contact=UserContact(
            primary_type=ChannelType.telegram,
            primary_value="123456789",
        ),
    )


# --- tests ------------------------------------------------------------------


@pytest.mark.unit
async def test_publish_uploads_three_files(render_context: dict) -> None:
    uploader = InMemoryStaticUploader()
    channel = _RecordingChannel(ChannelType.telegram)
    publisher = _make_publisher(uploader=uploader, channel=channel)

    result = await publisher.publish(_make_context(render_context))

    assert set(uploader.objects.keys()) == {
        "anna/index.html",
        "anna/sitemap.xml",
        "anna/robots.txt",
    }
    assert result.uploaded_keys == [
        "anna/index.html",
        "anna/sitemap.xml",
        "anna/robots.txt",
    ]
    assert uploader.invalidations == [result.uploaded_keys]


@pytest.mark.unit
async def test_publish_renders_h1_into_index(render_context: dict) -> None:
    uploader = InMemoryStaticUploader()
    channel = _RecordingChannel(ChannelType.telegram)
    publisher = _make_publisher(uploader=uploader, channel=channel)

    await publisher.publish(_make_context(render_context))

    index_html, _ = uploader.objects["anna/index.html"]
    assert "<h1>" in index_html
    assert "Студия маникюра Анны" in index_html


@pytest.mark.unit
async def test_publish_fires_seo_submission(render_context: dict) -> None:
    uploader = InMemoryStaticUploader()
    channel = _RecordingChannel(ChannelType.telegram)
    publisher = _make_publisher(uploader=uploader, channel=channel)

    result = await publisher.publish(_make_context(render_context))

    assert SeoEngine.indexnow in result.seo_report.succeeded_engines
    assert result.seo_log == {
        "indexnow": {
            "submitted": True,
            "reason": None,
            "upstream_status": None,
        }
    }


@pytest.mark.unit
async def test_publish_records_seo_failure_without_raising(render_context: dict) -> None:
    uploader = InMemoryStaticUploader()
    channel = _RecordingChannel(ChannelType.telegram)
    publisher = _make_publisher(uploader=uploader, channel=channel, seo_succeeds=False)

    result = await publisher.publish(_make_context(render_context))

    assert not result.seo_report.all_succeeded
    assert result.seo_log["indexnow"]["submitted"] is False
    # Site still considered uploaded — the publish path remains green.
    assert "anna/index.html" in uploader.objects


@pytest.mark.unit
async def test_publish_notifies_owner_on_success(render_context: dict) -> None:
    uploader = InMemoryStaticUploader()
    channel = _RecordingChannel(ChannelType.telegram)
    publisher = _make_publisher(uploader=uploader, channel=channel)

    result = await publisher.publish(_make_context(render_context))

    assert result.notification_delivered is True
    assert len(channel.sends) == 1
    recipient, message = channel.sends[0]
    assert recipient == "123456789"
    assert "anna.vitrina.site" in message.body


@pytest.mark.unit
async def test_publish_reports_undelivered_notification_without_raising(
    render_context: dict,
) -> None:
    uploader = InMemoryStaticUploader()
    channel = _RecordingChannel(ChannelType.telegram, delivered=False)
    publisher = _make_publisher(uploader=uploader, channel=channel)

    result = await publisher.publish(_make_context(render_context))

    assert result.notification_delivered is False
    assert result.notification_reason == "test_failure"
    # Site still uploaded — notification failure does NOT roll back publish.
    assert "anna/index.html" in uploader.objects
