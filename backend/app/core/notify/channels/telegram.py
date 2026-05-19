"""Telegram channel adapter.

Wraps :class:`app.infrastructure.telegram.bot_client.TelegramBotClient`
so the core layer doesn't depend on aiogram directly. Send semantics:

  - `recipient` is a chat_id (numeric string for users, ``@channelname``
    for public channels, ``-100…`` for supergroups).
  - HTML formatting is used so titles can be bold without leaking
    Markdown escape pitfalls (aiogram handles the entity encoding).
"""

from __future__ import annotations

from app.core.notify.ports import (
    ChannelType,
    DeliveryResult,
    NotificationMessage,
)
from app.infrastructure.telegram.bot_client import TelegramBotClient
from app.utils.logging import get_logger


class TelegramChannel:
    channel_type = ChannelType.telegram

    def __init__(self, client: TelegramBotClient) -> None:
        self._client = client
        self._log = get_logger("core.notify.channels.telegram")

    def is_available(self) -> bool:
        return self._client.is_available()

    async def send(
        self,
        *,
        recipient: str,
        message: NotificationMessage,
    ) -> DeliveryResult:
        text = _render(message)
        try:
            await self._client.send_message(chat_id=recipient, text=text, parse_mode="HTML")
        except Exception as exc:
            self._log.warning(
                "telegram_send_failed",
                recipient=recipient,
                error=exc.__class__.__name__,
            )
            return DeliveryResult(
                delivered=False,
                channel=ChannelType.telegram,
                recipient=recipient,
                reason=f"upstream_error:{exc.__class__.__name__}",
            )
        return DeliveryResult(delivered=True, channel=ChannelType.telegram, recipient=recipient)


def _render(message: NotificationMessage) -> str:
    lines: list[str] = [f"<b>{_escape(message.title)}</b>"]
    if message.body:
        lines.append("")
        lines.append(_escape(message.body))
    if message.links:
        lines.append("")
        for label, url in message.links:
            lines.append(f'<a href="{url}">{_escape(label)}</a>')
    return "\n".join(lines)


def _escape(value: str) -> str:
    """Minimal HTML escape — aiogram's parse_mode=HTML only respects
    <b>, <i>, <a> etc., so we escape ampersand/lt/gt in user content."""
    return value.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
