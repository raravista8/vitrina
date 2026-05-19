"""Unit tests for the Telegram Bot API parsing adapter (T3.4)."""

from __future__ import annotations

from typing import Any

import pytest

from app.core.parsing.adapters.telegram_bot import (
    TelegramBotAdapter,
    _extract_chat_id,
)
from app.core.parsing.ports import (
    AdapterDisabledError,
    InvalidSourceUrlError,
    SourceType,
    UpstreamUnavailableError,
)

# --- fakes ----------------------------------------------------------------


class _FakeTelegram:
    def __init__(
        self,
        *,
        chat: dict[str, Any] | None = None,
        cover_url: str | None = None,
        available: bool = True,
        raise_on_chat: Exception | None = None,
    ) -> None:
        self._chat = chat
        self._cover_url = cover_url
        self._available = available
        self._raise = raise_on_chat
        self.get_chat_calls: list[str] = []
        self.get_file_calls: list[str] = []

    def is_available(self) -> bool:
        return self._available

    async def get_chat(self, *, chat_id: str) -> dict[str, Any]:
        self.get_chat_calls.append(chat_id)
        if self._raise is not None:
            raise self._raise
        if self._chat is None:
            raise RuntimeError("chat_not_found")
        return self._chat

    async def get_file_url(self, *, file_id: str) -> str | None:
        self.get_file_calls.append(file_id)
        return self._cover_url


# --- chat-id extraction ---------------------------------------------------


@pytest.mark.unit
@pytest.mark.parametrize(
    ("source", "expected"),
    [
        ("@barbershop_samara", "@barbershop_samara"),
        ("t.me/barbershop_samara", "@barbershop_samara"),
        ("https://t.me/barbershop_samara", "@barbershop_samara"),
        ("https://telegram.me/barbershop_samara", "@barbershop_samara"),
        ("https://t.me/barbershop_samara/123", "@barbershop_samara"),
    ],
)
def test_chat_id_extraction_accepts_public_forms(source: str, expected: str) -> None:
    assert _extract_chat_id(source) == expected


@pytest.mark.unit
@pytest.mark.parametrize(
    "source",
    [
        "",
        "https://t.me/+abcDEF12345",  # private invite link
        "https://t.me/joinchat/AAAA",
        "https://t.me/",
        "https://yandex.ru/maps/org/1",
        "@x",  # too short
        "@" + "a" * 33,  # too long
        "@1invalid",  # must start with letter
        "@bad-name",  # hyphen not allowed
        "not-a-url-at-all",
    ],
)
def test_chat_id_extraction_rejects_bad_inputs(source: str) -> None:
    assert _extract_chat_id(source) is None


# --- adapter behaviour ----------------------------------------------------


@pytest.mark.unit
async def test_full_chat_metadata_becomes_snapshot() -> None:
    tg = _FakeTelegram(
        chat={
            "id": -100123,
            "type": "channel",
            "title": "Barbershop Samara",
            "username": "barbershop_samara",
            "description": "Лучший барбершоп Самары",
            "photo": {"big_file_id": "BIGPHOTO123"},
            "member_count": 842,
            "invite_link": "https://t.me/+abcd",
        },
        cover_url="https://api.telegram.org/file/bot.../photos/big.jpg",
    )
    adapter = TelegramBotAdapter(tg)
    snapshot = await adapter.parse("https://t.me/barbershop_samara")

    assert snapshot.source_type == SourceType.telegram
    assert snapshot.title == "Barbershop Samara"
    assert snapshot.description == "Лучший барбершоп Самары"
    assert len(snapshot.photos) == 1
    assert snapshot.photos[0].url is not None
    assert snapshot.photos[0].photo_type == "profile_screenshot"

    assert snapshot.metadata["chat_id"] == "@barbershop_samara"
    assert snapshot.metadata["chat_type"] == "channel"
    assert snapshot.metadata["member_count"] == 842
    assert snapshot.metadata["public_url"] == "https://t.me/barbershop_samara"
    assert snapshot.metadata["history_collected"] is False
    assert snapshot.metadata["history_source_hint"] == "tg_web_view"

    assert tg.get_chat_calls == ["@barbershop_samara"]
    assert tg.get_file_calls == ["BIGPHOTO123"]


@pytest.mark.unit
async def test_private_channel_hint_is_html_export() -> None:
    """No username → must come via TG Desktop HTML export (T3.6)."""
    tg = _FakeTelegram(
        chat={
            "id": -100456,
            "type": "channel",
            "title": "Closed group",
            # no `username`
            "invite_link": "https://t.me/+private",
        }
    )
    adapter = TelegramBotAdapter(tg)
    snapshot = await adapter.parse("@somepublicalias_that_resolves")
    assert snapshot.metadata["history_source_hint"] == "tg_html_export"
    assert "public_url" not in snapshot.metadata


@pytest.mark.unit
async def test_chat_without_photo_yields_no_photo() -> None:
    tg = _FakeTelegram(
        chat={"id": -100123, "type": "channel", "title": "No-cover channel"},
    )
    adapter = TelegramBotAdapter(tg)
    snapshot = await adapter.parse("@no_cover_test")
    assert snapshot.photos == []
    assert tg.get_file_calls == []


@pytest.mark.unit
async def test_cover_url_resolution_failure_is_soft() -> None:
    """get_file_url returning None must NOT raise — channel parsing
    succeeds with `photos=[]`."""
    tg = _FakeTelegram(
        chat={
            "id": -100123,
            "type": "channel",
            "title": "Big cover but resolution fails",
            "photo": {"big_file_id": "BIG"},
        },
        cover_url=None,
    )
    adapter = TelegramBotAdapter(tg)
    snapshot = await adapter.parse("@noresolve_test")
    assert snapshot.photos == []


@pytest.mark.unit
async def test_bad_url_rejected() -> None:
    tg = _FakeTelegram()
    adapter = TelegramBotAdapter(tg)
    with pytest.raises(InvalidSourceUrlError):
        await adapter.parse("https://yandex.ru/maps/org/1")
    assert tg.get_chat_calls == []


@pytest.mark.unit
async def test_adapter_disabled_without_bot_token() -> None:
    tg = _FakeTelegram(available=False)
    adapter = TelegramBotAdapter(tg)
    with pytest.raises(AdapterDisabledError, match="telegram_bot_unavailable"):
        await adapter.parse("@valid_channel_name")


@pytest.mark.unit
async def test_upstream_failure_becomes_upstream_unavailable() -> None:
    tg = _FakeTelegram(raise_on_chat=RuntimeError("chat_not_found"))
    adapter = TelegramBotAdapter(tg)
    with pytest.raises(UpstreamUnavailableError, match="telegram_get_chat_failed"):
        await adapter.parse("@some_valid_name")
