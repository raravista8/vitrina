"""Thin async aiogram Bot wrapper for outbound messages.

Lifespan-managed: the FastAPI app creates one ``TelegramBotClient`` on
startup and tears it down on shutdown. Concrete API surface is small —
the only outbound op for T1.6 is ``send_message`` — so the wrapper stays
trivially testable.

When ``TG_BOT_TOKEN`` is empty we keep the object alive but
``is_available()`` returns False; channels that depend on it skip with a
clean log line instead of raising.
"""

from __future__ import annotations

from aiogram import Bot
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode

from app.utils.logging import get_logger


class TelegramBotClient:
    def __init__(self, token: str | None) -> None:
        self._token = token
        self._bot: Bot | None = None
        self._log = get_logger("infrastructure.telegram.bot_client")

    def is_available(self) -> bool:
        return bool(self._token)

    async def start(self) -> None:
        if not self._token:
            self._log.warning("telegram_bot_disabled", reason="TG_BOT_TOKEN not set")
            return
        self._bot = Bot(
            token=self._token,
            default=DefaultBotProperties(parse_mode=ParseMode.HTML),
        )
        self._log.info("telegram_bot_started")

    async def shutdown(self) -> None:
        if self._bot is not None:
            await self._bot.session.close()
            self._bot = None

    async def send_message(
        self,
        *,
        chat_id: str,
        text: str,
        parse_mode: str = "HTML",
    ) -> None:
        if self._bot is None:
            raise RuntimeError("TelegramBotClient.send_message called before start()")
        await self._bot.send_message(chat_id=chat_id, text=text, parse_mode=parse_mode)
