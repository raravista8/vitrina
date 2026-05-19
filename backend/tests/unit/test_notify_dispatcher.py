"""Unit tests for NotificationDispatcher (T1.6).

Cover the FR-002b fallback chain, the FR-002c SMS-safety filter, the
founder-notify path, and the channel-unavailable / no-eligible-channel
fallthroughs. No infra; channels are tiny fakes.
"""

from __future__ import annotations

import pytest

from app.core.notify.dispatcher import (
    NotificationDispatcher,
    UserContact,
)
from app.core.notify.ports import (
    ChannelType,
    DeliveryResult,
    NotificationKind,
    NotificationMessage,
)


class _FakeChannel:
    """Records each `send` call and resolves with a configurable outcome."""

    def __init__(
        self,
        channel_type: ChannelType,
        *,
        available: bool = True,
        delivers: bool = True,
    ) -> None:
        self.channel_type = channel_type
        self._available = available
        self._delivers = delivers
        self.calls: list[tuple[str, NotificationMessage]] = []

    def is_available(self) -> bool:
        return self._available

    async def send(self, *, recipient: str, message: NotificationMessage) -> DeliveryResult:
        self.calls.append((recipient, message))
        return DeliveryResult(
            delivered=self._delivers,
            channel=self.channel_type,
            recipient=recipient,
            reason=None if self._delivers else "test_forced_failure",
        )


MSG = NotificationMessage(title="t", body="b")


@pytest.mark.unit
class TestFounder:
    async def test_founder_notified_via_telegram(self) -> None:
        tg = _FakeChannel(ChannelType.telegram)
        dispatcher = NotificationDispatcher(
            channels={ChannelType.telegram: tg},
            founder_telegram_chat_id="-1001",
        )
        result = await dispatcher.notify_founder(NotificationKind.application_received, MSG)
        assert result.delivered
        assert tg.calls == [("-1001", MSG)]

    async def test_founder_skipped_when_chat_id_missing(self) -> None:
        tg = _FakeChannel(ChannelType.telegram)
        dispatcher = NotificationDispatcher(
            channels={ChannelType.telegram: tg},
            founder_telegram_chat_id=None,
        )
        result = await dispatcher.notify_founder(NotificationKind.application_received, MSG)
        assert not result.delivered
        assert result.reason == "founder_channel_unavailable"
        assert tg.calls == []

    async def test_founder_skipped_when_telegram_unavailable(self) -> None:
        tg = _FakeChannel(ChannelType.telegram, available=False)
        dispatcher = NotificationDispatcher(
            channels={ChannelType.telegram: tg},
            founder_telegram_chat_id="-1001",
        )
        result = await dispatcher.notify_founder(NotificationKind.application_received, MSG)
        assert not result.delivered
        assert tg.calls == []


@pytest.mark.unit
class TestFallbackChain:
    async def test_uses_primary_channel_when_available(self) -> None:
        tg = _FakeChannel(ChannelType.telegram)
        email = _FakeChannel(ChannelType.email)
        dispatcher = NotificationDispatcher(
            channels={ChannelType.telegram: tg, ChannelType.email: email},
        )
        contact = UserContact(
            primary_type=ChannelType.telegram,
            primary_value="@alice",
            alt_type=ChannelType.email,
            alt_value="alice@example.com",
        )
        result = await dispatcher.notify_user(contact, NotificationKind.site_published, MSG)
        assert result.delivered
        assert result.channel == ChannelType.telegram
        assert tg.calls
        assert not email.calls

    async def test_falls_back_when_primary_fails(self) -> None:
        tg = _FakeChannel(ChannelType.telegram, delivers=False)
        email = _FakeChannel(ChannelType.email)
        dispatcher = NotificationDispatcher(
            channels={ChannelType.telegram: tg, ChannelType.email: email},
        )
        contact = UserContact(
            primary_type=ChannelType.telegram,
            primary_value="@alice",
            alt_type=ChannelType.email,
            alt_value="alice@example.com",
        )
        result = await dispatcher.notify_user(contact, NotificationKind.site_published, MSG)
        assert result.delivered
        assert result.channel == ChannelType.email
        assert tg.calls
        assert email.calls

    async def test_skips_unavailable_channels(self) -> None:
        tg = _FakeChannel(ChannelType.telegram, available=False)
        email = _FakeChannel(ChannelType.email)
        dispatcher = NotificationDispatcher(
            channels={ChannelType.telegram: tg, ChannelType.email: email},
        )
        contact = UserContact(
            primary_type=ChannelType.telegram,
            primary_value="@alice",
            alt_type=ChannelType.email,
            alt_value="alice@example.com",
        )
        result = await dispatcher.notify_user(contact, NotificationKind.site_published, MSG)
        assert result.delivered
        assert result.channel == ChannelType.email
        # Unavailable channel must not have been called.
        assert tg.calls == []

    async def test_returns_failure_when_no_eligible_channel(self) -> None:
        # Only SMS registered, kind disallows SMS.
        class _ShouldNotCallSms(_FakeChannel):
            pass

        sms = _ShouldNotCallSms(ChannelType.sms)
        dispatcher = NotificationDispatcher(channels={ChannelType.sms: sms})
        contact = UserContact(primary_type=ChannelType.sms, primary_value="+79261234567")
        result = await dispatcher.notify_user(contact, NotificationKind.application_received, MSG)
        assert not result.delivered
        assert sms.calls == []


@pytest.mark.unit
class TestSmsSafety:
    async def test_application_received_never_uses_sms(self) -> None:
        sms = _FakeChannel(ChannelType.sms)
        dispatcher = NotificationDispatcher(channels={ChannelType.sms: sms})
        contact = UserContact(primary_type=ChannelType.sms, primary_value="+79261234567")
        result = await dispatcher.notify_user(contact, NotificationKind.application_received, MSG)
        assert not result.delivered
        assert sms.calls == []

    async def test_magic_link_is_email_only(self) -> None:
        tg = _FakeChannel(ChannelType.telegram)
        email = _FakeChannel(ChannelType.email)
        dispatcher = NotificationDispatcher(
            channels={ChannelType.telegram: tg, ChannelType.email: email},
        )
        # Even when user prefers TG, magic-link kind escapes to email.
        contact = UserContact(
            primary_type=ChannelType.telegram,
            primary_value="@alice",
            alt_type=ChannelType.email,
            alt_value="alice@example.com",
        )
        result = await dispatcher.notify_user(contact, NotificationKind.magic_link, MSG)
        assert result.delivered
        assert result.channel == ChannelType.email
        assert tg.calls == []  # TG skipped entirely
