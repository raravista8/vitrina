"""Telegram Bot API parsing adapter (T3.4 — Tier 1 of ADR-0005).

The user adds ``@VitrinaIntakeBot`` as an admin to their channel. The
adapter reads what the Bot API exposes for the chat:

  - title, username, description
  - channel cover photo (resolved file_id → downloadable URL)
  - member count (where allowed)
  - invite link (if the bot has the permission)

What the Bot API does NOT expose: historical messages. There is no
``getChatHistory`` for bots — channel post history has to come from
new messages arriving via the Updates stream after the bot joins, OR
from the web-view fallback (T3.5) for public channels, OR from a TG
Desktop HTML export (T3.6) for private channels.

For MVP that's fine: the adapter produces a snapshot with the title /
description / cover photo and marks ``metadata.history_collected =
False``. The founder either:
  - asks the user to upload photos via the photo flow (S4) to fill
    the gallery; or
  - the worker enqueues a T3.5 web-view scrape for public channels.
"""

from __future__ import annotations

from typing import Any, Protocol
from urllib.parse import urlparse

from app.core.parsing.ports import (
    AdapterDisabledError,
    InvalidSourceUrlError,
    PhotoRef,
    SourceSnapshot,
    SourceType,
    UpstreamUnavailableError,
)
from app.utils.logging import get_logger


class TelegramGateway(Protocol):
    """Hexagonal port for the Bot API surface this adapter needs.

    ``TelegramBotClient`` (``app.infrastructure.telegram.bot_client``)
    is structurally compatible so the wiring in ``app.main`` lifespan
    composes them without `core/` importing infrastructure.
    """

    def is_available(self) -> bool: ...

    async def get_chat(self, *, chat_id: str) -> dict[str, Any]: ...

    async def get_file_url(self, *, file_id: str) -> str | None: ...


class TelegramBotAdapter:
    source_type = SourceType.telegram

    def __init__(self, telegram: TelegramGateway) -> None:
        self._telegram = telegram
        self._log = get_logger("core.parsing.adapters.telegram_bot")

    def is_available(self) -> bool:
        return self._telegram.is_available()

    async def parse(self, source_ref: str) -> SourceSnapshot:
        if not self.is_available():
            raise AdapterDisabledError("telegram_bot_unavailable")

        chat_id = _extract_chat_id(source_ref)
        if chat_id is None:
            raise InvalidSourceUrlError(f"unparseable_tg_ref:{source_ref}")

        try:
            chat = await self._telegram.get_chat(chat_id=chat_id)
        except Exception as exc:
            raise UpstreamUnavailableError(
                f"telegram_get_chat_failed:{exc.__class__.__name__}"
            ) from exc

        title = _str(chat.get("title")) or _str(chat.get("username"))
        description = _str(chat.get("description"))
        cover_url = await self._resolve_cover_photo(chat)

        photos: list[PhotoRef] = []
        if cover_url:
            photos.append(
                PhotoRef(
                    url=cover_url,
                    alt=title or "Telegram channel cover",
                    photo_type="profile_screenshot",
                )
            )

        metadata: dict[str, Any] = {
            "chat_id": chat_id,
            "chat_type": chat.get("type"),
            "history_collected": False,
            "history_source_hint": ("tg_web_view" if chat.get("username") else "tg_html_export"),
        }
        username = _str(chat.get("username"))
        if username:
            metadata["public_url"] = f"https://t.me/{username}"
        member_count = chat.get("member_count")
        if isinstance(member_count, int):
            metadata["member_count"] = member_count
        invite_link = _str(chat.get("invite_link"))
        if invite_link:
            metadata["invite_link"] = invite_link

        self._log.info(
            "tg_chat_snapshot",
            chat_id=chat_id,
            has_description=description is not None,
            cover_photo=cover_url is not None,
        )

        return SourceSnapshot(
            source_type=SourceType.telegram,
            source_ref=source_ref,
            title=title,
            description=description,
            photos=photos,
            metadata=metadata,
        )

    async def _resolve_cover_photo(self, chat: dict[str, Any]) -> str | None:
        """Channel cover photo (the round profile picture). Bot API
        returns it under ``photo.big_file_id``. The big variant is
        ≤640×640 which is ideal for the hero block."""
        photo = chat.get("photo")
        if not isinstance(photo, dict):
            return None
        file_id = _str(photo.get("big_file_id")) or _str(photo.get("small_file_id"))
        if not file_id:
            return None
        try:
            return await self._telegram.get_file_url(file_id=file_id)
        except Exception:
            return None


# --- helpers -------------------------------------------------------------


_TG_HOSTS = {"t.me", "telegram.me", "telegram.dog"}


def _extract_chat_id(source_ref: str) -> str | None:
    """Accept ``t.me/<channel>`` / ``https://t.me/<channel>`` /
    ``@channel`` and return what aiogram's ``get_chat`` accepts as
    ``chat_id`` (a numeric ID or ``"@channel"``).

    Public channels live under ``t.me/<name>``. Private channel
    invite-only links live under ``t.me/+<token>``; we currently
    reject those because the Bot API can't read them via username
    — the user has to add the bot directly (a UX clarification in
    the upcoming onboarding step).
    """
    if not source_ref:
        return None
    candidate = source_ref.strip()

    if candidate.startswith("@"):
        return _validate_username(candidate)

    parsed = urlparse(candidate if "://" in candidate else f"https://{candidate}")
    if parsed.scheme not in {"http", "https"}:
        return None
    host = (parsed.hostname or "").lower()
    if host not in _TG_HOSTS:
        return None

    path = (parsed.path or "").strip("/").split("/", 1)[0]
    if not path:
        return None
    if path.startswith("+") or path == "joinchat":
        return None  # private invite — not addressable via @username

    return _validate_username(f"@{path}")


def _validate_username(value: str) -> str | None:
    """Telegram usernames: 5-32 chars, [a-zA-Z0-9_], must start with a
    letter. Returns ``None`` for invalid usernames so the adapter can
    raise ``InvalidSourceUrlError`` upstream."""
    if not value.startswith("@"):
        return None
    name = value[1:]
    if not (5 <= len(name) <= 32):
        return None
    if not name[0].isalpha():
        return None
    if not all(ch.isalnum() or ch == "_" for ch in name):
        return None
    return f"@{name}"


def _str(value: Any) -> str | None:
    return value if isinstance(value, str) and value.strip() else None
