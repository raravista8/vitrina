"""Tests for the Telegram web-view fallback parser (T3.5)."""

from __future__ import annotations

import pytest

from app.core.parsing.adapters.telegram_webview import TelegramWebViewAdapter
from app.core.parsing.ports import (
    InvalidSourceUrlError,
    UpstreamUnavailableError,
)

CHANNEL = "https://t.me/barbershop_samara"

SAMPLE_HTML = """
<html>
  <head>
    <title>Barbershop Samara — telegram channel</title>
    <meta property="og:title" content="Barbershop Samara">
    <meta property="og:description" content="Лучший барбершоп Самары">
  </head>
  <body>
    <div class="tgme_widget_message">
      <div class="tgme_widget_message_text">Стрижка сегодня в 18:00.</div>
      <a class="tgme_widget_message_photo_wrap"
         style="background-image:url('https://cdn.telegram.org/file/abc.jpg')"></a>
    </div>
    <div class="tgme_widget_message">
      <div class="tgme_widget_message_text">Запись по телефону.</div>
    </div>
    <div class="tgme_widget_message">
      <a class="tgme_widget_message_photo_wrap"
         style="background-image:url('https://cdn.telegram.org/file/abc.jpg')"></a>
    </div>
    <div class="tgme_widget_message">
      <a class="tgme_widget_message_photo_wrap"
         style="background-image:url('https://cdn.telegram.org/file/xyz.jpg')"></a>
    </div>
  </body>
</html>
"""


class _FakeHttp:
    def __init__(self, *, body: str = "", raise_exc: Exception | None = None) -> None:
        self.body = body
        self._raise = raise_exc
        self.calls: list[str] = []

    async def get_text(self, *, url: str, timeout: float) -> str:  # noqa: ASYNC109
        _ = timeout
        self.calls.append(url)
        if self._raise is not None:
            raise self._raise
        return self.body


# --- happy path -----------------------------------------------------------


@pytest.mark.unit
async def test_webview_parses_title_description_posts_photos() -> None:
    http = _FakeHttp(body=SAMPLE_HTML)
    adapter = TelegramWebViewAdapter(http, allow_url_resolution=False)

    snapshot = await adapter.parse(CHANNEL)

    assert snapshot.title == "Barbershop Samara"
    assert snapshot.description == "Лучший барбершоп Самары"

    # 2 distinct post texts
    assert snapshot.metadata["post_count"] == 2
    assert "Стрижка" in snapshot.metadata["posts"][0]

    # 2 unique photo URLs (third reference is deduped)
    assert len(snapshot.photos) == 2

    # web-view always builds the t.me/s/<channel> URL
    assert http.calls == ["https://t.me/s/barbershop_samara"]
    assert snapshot.metadata["history_collected"] is True
    assert snapshot.metadata["history_source"] == "tg_web_view"


@pytest.mark.unit
async def test_webview_at_username_shorthand_resolves() -> None:
    http = _FakeHttp(body=SAMPLE_HTML)
    adapter = TelegramWebViewAdapter(http, allow_url_resolution=False)
    snapshot = await adapter.parse("@barbershop_samara")
    assert snapshot.metadata["chat_id"] == "@barbershop_samara"


@pytest.mark.unit
async def test_webview_html_without_meta_falls_back_to_username() -> None:
    http = _FakeHttp(body="<html><body></body></html>")
    adapter = TelegramWebViewAdapter(http, allow_url_resolution=False)
    snapshot = await adapter.parse(CHANNEL)
    assert snapshot.title == "barbershop_samara"
    assert snapshot.description is None
    assert snapshot.metadata["post_count"] == 0
    assert snapshot.photos == []


# --- failure modes --------------------------------------------------------


@pytest.mark.unit
async def test_invalid_ref_rejected() -> None:
    http = _FakeHttp()
    adapter = TelegramWebViewAdapter(http, allow_url_resolution=False)
    with pytest.raises(InvalidSourceUrlError):
        await adapter.parse("https://yandex.ru/maps/org/1")
    assert http.calls == []


@pytest.mark.unit
async def test_private_invite_link_rejected() -> None:
    http = _FakeHttp()
    adapter = TelegramWebViewAdapter(http, allow_url_resolution=False)
    with pytest.raises(InvalidSourceUrlError):
        await adapter.parse("https://t.me/+abcDEF12345")
    assert http.calls == []


@pytest.mark.unit
async def test_upstream_failure_propagated_as_unavailable() -> None:
    http = _FakeHttp(raise_exc=RuntimeError("upstream broken"))
    adapter = TelegramWebViewAdapter(http, allow_url_resolution=False)
    with pytest.raises(UpstreamUnavailableError, match="tg_webview_fetch_failed"):
        await adapter.parse(CHANNEL)


@pytest.mark.unit
async def test_oversized_response_rejected() -> None:
    huge = "a" * 3_000_000  # 3 MB, > MAX_RESPONSE_BYTES
    http = _FakeHttp(body=huge)
    adapter = TelegramWebViewAdapter(http, allow_url_resolution=False)
    with pytest.raises(UpstreamUnavailableError, match="too_large"):
        await adapter.parse(CHANNEL)
