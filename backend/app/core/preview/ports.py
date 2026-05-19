"""Live-preview ports (T1.4b).

The Hero on the landing fires a preview request as soon as the user
pastes an MVP source URL. The endpoint queries the source's own API
with a tight budget (3 s) and returns lightweight metadata — name +
optional `posts`/`photos`/`reviews` counts. The frontend either renders
``✓ Telegram — нашли 47 постов и 12 фото`` or falls back to the static
``✓ Telegram`` badge when the upstream is slow / unavailable.

Per FR-005a:
  - 3-second hard budget per call
  - No DB writes — preview is ephemeral
  - Endpoint rate-limited 10 req/min/IP to prevent recon abuse
  - Waitlist sources (VK/IG/etc) get NO preview call — Hero shows the
    inline waitlist-capture immediately
"""

from __future__ import annotations

from dataclasses import dataclass
from enum import StrEnum
from typing import Protocol


class PreviewSourceType(StrEnum):
    """Sources for which a preview adapter exists. Mirrors the MVP list."""

    telegram = "telegram"
    ymaps = "ymaps"


@dataclass(frozen=True, slots=True)
class PreviewCounts:
    """Optional counts the frontend renders alongside the badge.
    Fields are ``None`` when the upstream didn't return that signal."""

    posts: int | None = None
    photos: int | None = None
    reviews: int | None = None


@dataclass(frozen=True, slots=True)
class PreviewResult:
    """Successful preview payload. The adapter raises (or the service
    catches the timeout) when something goes wrong — the router maps a
    failure to a 503 the frontend treats as a fallback signal."""

    source_type: PreviewSourceType
    name: str | None
    counts: PreviewCounts


class PreviewAdapter(Protocol):
    """Each MVP source has one adapter. Adapters MUST NOT cache."""

    source_type: PreviewSourceType

    def is_available(self) -> bool: ...

    async def fetch(self, source_url: str) -> PreviewResult: ...
