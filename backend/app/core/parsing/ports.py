"""Parser ports + canonical snapshot value-object (T3.1).

Every concrete adapter (`core/parsing/adapters/ymaps`, `.../telegram_*`,
`.../photos`) implements ``SourceParser`` and returns a
``SourceSnapshot`` — a normalised view of whatever the upstream source
gave us, ready to be sanitised (T3.9) and fed to the LLM (T4.x).

Hexagonal rule (CLAUDE.md / .importlinter): this module MUST NOT import
from ``app.infrastructure.*``. Adapters depend on infrastructure clients
themselves; this file only describes shapes.

Out of scope per ADR-0009: VK + Instagram + 2GIS + ... — these go
through the photo flow (S4) with ``SourceType.photo`` snapshots built
from user uploads of screenshots.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime
from enum import StrEnum
from typing import Any, Protocol


class SourceType(StrEnum):
    """Canonical source identifiers. Mirrors `sites.source_type` CHECK
    constraint in 0001_init.py."""

    ymaps = "ymaps"
    telegram = "telegram"
    photo = "photo"


@dataclass(frozen=True, slots=True)
class ContactRef:
    """A contact discovered in the source (phone, email, website)."""

    kind: str  # "phone" | "email" | "website" | "telegram"
    value: str


@dataclass(frozen=True, slots=True)
class PhotoRef:
    """Pointer to a photo. ``url`` is the upstream URL if the source
    exposes one (YMaps Photos array, TG file_id resolved via getFile);
    ``upload_key`` is set for user-uploaded photos that already live in
    our Object Storage."""

    url: str | None = None
    upload_key: str | None = None
    alt: str | None = None
    photo_type: str = "work"  # "work" | "profile_screenshot" | "business_card" | "booklet"


@dataclass(frozen=True, slots=True)
class ReviewRef:
    author: str | None
    text: str
    rating: int | None = None


@dataclass(frozen=True, slots=True)
class ServiceItem:
    title: str
    description: str | None = None
    price_label: str | None = None


@dataclass(frozen=True, slots=True)
class SourceSnapshot:
    """Normalised parse result. Stored as JSON in ``sites.source_snapshot``."""

    source_type: SourceType
    source_ref: str  # URL or upload-batch-id
    title: str | None = None
    description: str | None = None
    contacts: list[ContactRef] = field(default_factory=list)
    photos: list[PhotoRef] = field(default_factory=list)
    reviews: list[ReviewRef] = field(default_factory=list)
    services: list[ServiceItem] = field(default_factory=list)
    metadata: dict[str, Any] = field(default_factory=dict)
    extracted_at: datetime | None = None


# --- Domain errors ---------------------------------------------------------


class ParsingError(Exception):
    """Base for everything that can go wrong inside an adapter."""


class InvalidSourceUrlError(ParsingError):
    """URL failed regex / scheme / domain-allowlist validation."""


class SsrfBlockedError(ParsingError):
    """URL resolved to a private/loopback/link-local address."""


class UpstreamUnavailableError(ParsingError):
    """Source API returned non-success or timed out — bubbled up so the
    worker can decide whether to retry."""


class AdapterDisabledError(ParsingError):
    """Adapter cannot run (missing credentials, feature flag off)."""


# Backwards-compat aliases — keep imports tidy at call-sites while the
# linter (N818) is satisfied with the canonical Error-suffixed names.
InvalidSourceUrl = InvalidSourceUrlError
SsrfBlocked = SsrfBlockedError
UpstreamUnavailable = UpstreamUnavailableError
AdapterDisabled = AdapterDisabledError


# --- Port -----------------------------------------------------------------


class SourceParser(Protocol):
    """The hexagonal port every adapter implements.

    ``is_available()`` mirrors the pattern from notify/seo: an adapter
    returns False instead of raising when its credentials/config are
    absent. The dispatcher in ``workers/parser.py`` skips disabled
    adapters with a clean log line, not an exception.
    """

    source_type: SourceType

    def is_available(self) -> bool: ...

    async def parse(self, source_ref: str) -> SourceSnapshot: ...
