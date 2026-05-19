"""Telegram web-view fallback parser (T3.5 — ADR-0005 Tier 2).

When the Bot API can't read post bodies (always, for any channel —
see T3.4) and the channel IS public, we fall back to scraping the
``t.me/s/<channel>`` HTML page. Telegram exposes the last ~20 posts
there in a stable, server-side-rendered layout — no Telegram ToS
violation (it's the publicly browsable web view).

Strategy:
  1. URL gate: validate against ``t.me`` allowlist with the standard
     SSRF guard. Web-view path is ``https://t.me/s/<channel>``.
  2. Fetch with httpx (timeout + size cap from CLAUDE.md hard rules).
  3. Parse with ``html.parser`` (stdlib — no new dep). Each post lives
     in ``<div class="tgme_widget_message">``; text under
     ``.tgme_widget_message_text``; photos as ``background-image`` on
     ``.tgme_widget_message_photo_wrap``.

What we extract: post text (up to MAX_POSTS), photo URLs (up to
MAX_PHOTOS), channel title/description from ``<meta>`` tags.

The web-view HTML is messy and Telegram tweaks it — the parser is
defensive (every accessor is wrapped) and the test suite uses captured
fixture HTML to lock in expectations.
"""

from __future__ import annotations

import re
from html.parser import HTMLParser
from typing import Protocol

from app.core.parsing.ports import (
    InvalidSourceUrlError,
    PhotoRef,
    ReviewRef,
    SourceSnapshot,
    SourceType,
    UpstreamUnavailableError,
)
from app.core.parsing.url_validator import validate_source_url
from app.utils.logging import get_logger

WEBVIEW_DOMAIN_ALLOWLIST: tuple[str, ...] = (r"t\.me", r"telegram\.me")
MAX_RESPONSE_BYTES = 2_500_000  # 2.5 MB — channel pages are ≤ ~1MB in practice
MAX_POSTS = 20
MAX_PHOTOS = 20


class HttpGateway(Protocol):
    """Plain HTTP fetcher for the web-view path. Implementations live
    in ``app.infrastructure.http`` (or wherever); the tests inject a
    fake without touching httpx.
    """

    async def get_text(self, *, url: str, timeout: float) -> str:  # noqa: ASYNC109
        # The implementation may use asyncio.timeout internally; we
        # keep the parameter explicit so adapters control the budget
        # per call site rather than per gateway instance.
        ...


class TelegramWebViewAdapter:
    source_type = SourceType.telegram

    def __init__(
        self,
        http: HttpGateway,
        *,
        allow_url_resolution: bool = True,
    ) -> None:
        self._http = http
        self._allow_resolution = allow_url_resolution
        self._log = get_logger("core.parsing.adapters.telegram_webview")

    def is_available(self) -> bool:
        # No credentials required — the web view is publicly served.
        return True

    async def parse(self, source_ref: str) -> SourceSnapshot:
        username = _extract_channel_username(source_ref)
        if username is None:
            raise InvalidSourceUrlError(f"unparseable_tg_webview_ref:{source_ref}")

        web_url = f"https://t.me/s/{username}"
        validate_source_url(
            web_url,
            domain_allowlist=WEBVIEW_DOMAIN_ALLOWLIST,
            allow_resolution=self._allow_resolution,
        )

        try:
            html = await self._http.get_text(url=web_url, timeout=10.0)
        except Exception as exc:
            raise UpstreamUnavailableError(
                f"tg_webview_fetch_failed:{exc.__class__.__name__}"
            ) from exc

        if len(html.encode("utf-8")) > MAX_RESPONSE_BYTES:
            raise UpstreamUnavailableError("tg_webview_response_too_large")

        parsed = _parse_html(html)
        title = parsed.title or username
        description = parsed.description
        photos = [
            PhotoRef(url=u, alt=title, photo_type="work") for u in parsed.photo_urls[:MAX_PHOTOS]
        ]
        reviews: list[ReviewRef] = []  # web view doesn't surface comments

        self._log.info(
            "tg_webview_snapshot",
            username=username,
            posts=len(parsed.post_texts),
            photos=len(photos),
        )

        return SourceSnapshot(
            source_type=SourceType.telegram,
            source_ref=source_ref,
            title=title,
            description=description,
            photos=photos,
            reviews=reviews,
            metadata={
                "chat_id": f"@{username}",
                "history_collected": True,
                "history_source": "tg_web_view",
                "post_count": len(parsed.post_texts),
                "posts": parsed.post_texts[:MAX_POSTS],
                "public_url": web_url,
            },
        )


# --- HTML parser ----------------------------------------------------------


class _ParsedView:
    title: str | None = None
    description: str | None = None
    post_texts: list[str]
    photo_urls: list[str]

    def __init__(self) -> None:
        self.post_texts = []
        self.photo_urls = []


def _parse_html(html: str) -> _ParsedView:
    """Stdlib-only HTML scrape. We don't use BeautifulSoup because that's
    a new dep for one adapter, and lxml is already in poetry for sanitiser
    fallback but isn't pleasant to use directly.
    """
    view = _ParsedView()
    scanner = _ChannelScanner()
    scanner.feed(html)
    scanner.close()

    view.title = scanner.og_title or scanner.dom_title
    view.description = scanner.og_description
    view.post_texts = [t.strip() for t in scanner.post_texts if t.strip()]
    view.photo_urls = list(dict.fromkeys(scanner.photo_urls))  # dedupe, preserve order
    return view


_BACKGROUND_URL_RE = re.compile(r"background-image:url\(['\"]?(?P<url>[^'\")]+)['\"]?\)")


class _ChannelScanner(HTMLParser):
    """SAX-style scanner over the t.me/s/<channel> HTML."""

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.og_title: str | None = None
        self.og_description: str | None = None
        self.dom_title: str | None = None
        self.post_texts: list[str] = []
        self.photo_urls: list[str] = []
        self._in_title = False
        self._in_post_text = False
        self._post_buffer: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attrs_dict = {k: v for k, v in attrs if v is not None}
        if tag == "title":
            self._in_title = True
            return
        if tag == "meta":
            prop = (attrs_dict.get("property") or attrs_dict.get("name") or "").lower()
            content = attrs_dict.get("content")
            if not content:
                return
            if prop == "og:title" and not self.og_title:
                self.og_title = content
            elif prop == "og:description" and not self.og_description:
                self.og_description = content
            return

        classes = (attrs_dict.get("class") or "").split()
        if "tgme_widget_message_text" in classes:
            self._in_post_text = True
            self._post_buffer = []
            return

        if "tgme_widget_message_photo_wrap" in classes:
            style = attrs_dict.get("style") or ""
            match = _BACKGROUND_URL_RE.search(style)
            if match:
                self.photo_urls.append(match.group("url"))

    def handle_endtag(self, tag: str) -> None:
        if tag == "title":
            self._in_title = False
        if tag == "div" and self._in_post_text:
            self._in_post_text = False
            text = "".join(self._post_buffer).strip()
            if text:
                self.post_texts.append(text)
            self._post_buffer = []

    def handle_data(self, data: str) -> None:
        if self._in_title and not self.dom_title:
            stripped = data.strip()
            if stripped:
                self.dom_title = stripped
        if self._in_post_text:
            self._post_buffer.append(data)


# --- helpers --------------------------------------------------------------


def _extract_channel_username(source_ref: str) -> str | None:
    """Reuse the same logic as the Bot API adapter but return the raw
    username (no @ prefix) so we can build the ``t.me/s/...`` URL."""
    from app.core.parsing.adapters.telegram_bot import _extract_chat_id

    chat_id = _extract_chat_id(source_ref)
    if chat_id is None or not chat_id.startswith("@"):
        return None
    return chat_id[1:]
