"""Thin async aiogram Bot wrapper for outbound messages + chat metadata.

Lifespan-managed: the FastAPI app creates one ``TelegramBotClient`` on
startup and tears it down on shutdown. Two outbound surfaces today:

  - ``send_message`` (T1.6) — admin alerts to the founder
  - ``get_chat``    (T1.4b) — read-only chat info for the Hero preview

When ``TG_BOT_TOKEN`` is empty we keep the object alive but
``is_available()`` returns False; consumers skip with a clean log line.
"""

from __future__ import annotations

from typing import Any

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

    async def get_chat(self, *, chat_id: str) -> dict[str, Any]:
        """Look up chat metadata. For public channels this works without the
        bot being a member. Returns the aiogram ``ChatFullInfo`` dumped to a
        plain dict so the preview adapter doesn't take an aiogram dep."""
        if self._bot is None:
            raise RuntimeError("TelegramBotClient.get_chat called before start()")
        chat = await self._bot.get_chat(chat_id=chat_id)
        return chat.model_dump()

    async def get_file_url(self, *, file_id: str) -> str | None:
        """Resolve a Telegram ``file_id`` to a downloadable URL via the
        Bot API ``getFile`` method. Returns ``None`` if the token isn't
        set or the file cannot be resolved (e.g. file >20MB which the
        Bot API rejects)."""
        if self._bot is None or not self._token:
            return None
        try:
            tg_file = await self._bot.get_file(file_id=file_id)
        except Exception:
            return None
        path = tg_file.file_path
        if not path:
            return None
        return f"https://api.telegram.org/file/bot{self._token}/{path}"
