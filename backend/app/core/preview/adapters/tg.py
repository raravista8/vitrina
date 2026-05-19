"""Telegram preview adapter (T1.4b).

Calls Bot API `getChat` to confirm the channel exists and pulls its
title. Post-count via Bot API requires bot admin membership in the
channel; we don't have that on a cold paste, so the count is left
``None`` and the frontend renders the static ``✓ Telegram`` badge.

When `T1.6d` lands the `/start` deep-link flow we can revisit using
`getChatMemberCount` for groups; for channel post counts there's no
public Bot API endpoint and we'd have to scrape `t.me/s/<channel>` —
not in T1.4b scope.
"""

from __future__ import annotations

import re

from app.core.preview.ports import (
    PreviewCounts,
    PreviewResult,
    PreviewSourceType,
)
from app.infrastructure.telegram.bot_client import TelegramBotClient

# Accept full URL ("https://t.me/foo"), bare URL, or @-handle form.
_TG_RE = re.compile(
    r"(?:^@|^https?://(?:www\.)?(?:t|telegram)\.me/(?:s/)?)(?P<name>[a-z][a-z0-9_]{4,31})",
    re.IGNORECASE,
)


class TelegramPreviewAdapter:
    source_type = PreviewSourceType.telegram

    def __init__(self, client: TelegramBotClient) -> None:
        self._client = client

    def is_available(self) -> bool:
        return self._client.is_available()

    async def fetch(self, source_url: str) -> PreviewResult:
        name = _extract_handle(source_url)
        if name is None:
            raise ValueError(f"unrecognised telegram url: {source_url!r}")

        chat = await self._client.get_chat(chat_id=f"@{name}")
        title = chat.get("title") if isinstance(chat, dict) else None

        return PreviewResult(
            source_type=PreviewSourceType.telegram,
            name=title or f"@{name}",
            counts=PreviewCounts(),  # all None — see module docstring
        )


def _extract_handle(source_url: str) -> str | None:
    match = _TG_RE.search(source_url.strip())
    if match is None:
        return None
    return match.group("name").lower()
