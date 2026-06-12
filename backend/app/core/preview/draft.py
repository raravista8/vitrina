"""Instant-preview draft contract + Redis-backed state stores.

Implements the FROZEN backend contract from
``docs/handoff/CANON_INSTANT_PREVIEW_TZ.md §6`` (PreviewDraft + poll
response shape) and ``CANON_INSTANT_PREVIEW_REV2_TZ.md §7`` (search
candidates + the ``candidate_id`` draft entry point).

Shapes only — no network. Fetching lives in
``core/preview/draft_builder.py``; the Geosearch search path in
``core/preview/search.py``. State lives in Redis:

  - ``preview_draft:<uuid4>``      → JSON ``DraftState``, TTL 15 min
  - ``preview_candidate:<uuid4>``  → JSON ``CandidatePayload``, TTL 30 min

Like ``core/auth/sessions.py``, the stores type against the external
``redis`` package directly (allowed by the hexagonal contract — only
``app.infrastructure`` imports are forbidden in core).
"""

from __future__ import annotations

import json
import re
import uuid
from dataclasses import dataclass, field
from enum import StrEnum
from typing import TYPE_CHECKING, Any
from urllib.parse import urlparse

import bleach

if TYPE_CHECKING:
    from redis.asyncio import Redis

DRAFT_TTL_SECONDS = 15 * 60  # poll window is ≤40 s; 15 min covers slow modals
CANDIDATE_TTL_SECONDS = 30 * 60  # search → pick happens within the modal session

MAX_NAME_LEN = 80
MAX_CATEGORY_LEN = 60
MAX_DISTRICT_LEN = 60
MAX_ADDRESS_LEN = 160
MAX_REVIEW_AUTHOR_LEN = 60
MAX_REVIEW_TEXT_LEN = 300
MAX_SERVICE_TITLE_LEN = 80
MAX_SERVICE_PRICE_LEN = 24
MAX_PHOTO_URL_LEN = 2048
MAX_PHOTOS = 9
MAX_REVIEWS = 4
MAX_SERVICES = 6


class DraftSourceType(StrEnum):
    """``PreviewDraft.source`` values — frozen in ТЗ rev.1 §6."""

    yandex_maps = "yandex_maps"
    telegram = "telegram"
    twogis = "twogis"
    avito = "avito"
    website = "website"


class DraftStatus(StrEnum):
    building = "building"
    ready = "ready"
    failed = "failed"


class BuildStage(StrEnum):
    fetching = "fetching"
    photos = "photos"
    reviews = "reviews"
    styling = "styling"


@dataclass(frozen=True, slots=True)
class DraftRating:
    value: float
    count: int


@dataclass(frozen=True, slots=True)
class DraftReview:
    author: str
    text: str
    rating: int


@dataclass(frozen=True, slots=True)
class DraftServiceItem:
    title: str
    price: str | None


@dataclass(frozen=True, slots=True)
class PreviewDraft:
    """The frozen ТЗ rev.1 §6 contract — field names match 1:1."""

    source: DraftSourceType
    name: str
    category: str | None
    district: str | None
    rating: DraftRating | None
    photos: list[str] = field(default_factory=list)  # 0..9 absolute https
    reviews: list[DraftReview] = field(default_factory=list)  # 0..4
    services: list[DraftServiceItem] = field(default_factory=list)  # 0..6
    theme_id: str = "editorial-mono"
    family_id: str = "editorial"


@dataclass(frozen=True, slots=True)
class DraftCounts:
    photos: int = 0
    reviews: int = 0


@dataclass(frozen=True, slots=True)
class DraftState:
    """What the poll endpoint returns (wrapped in the api envelope)."""

    status: DraftStatus
    stage: BuildStage
    counts: DraftCounts
    draft: PreviewDraft | None = None


@dataclass(frozen=True, slots=True)
class CandidatePayload:
    """What we remember about a Geosearch candidate between
    ``GET /api/preview/search`` and ``POST /api/preview/draft``.

    Enough to build a (sparse) draft without re-querying the upstream.
    """

    name: str
    address: str
    category: str | None = None
    rating: DraftRating | None = None
    photo: str | None = None


class DraftBuildError(Exception):
    """Raised by fetchers when a draft can't be built (no name, upstream
    down, SSRF-blocked, …). The builder maps it to ``status=failed``."""


# --- theme auto-pick (mirrors canon NICHE_LIB, packages/canon/src/intake/rev2.tsx)


GENERIC_THEME: tuple[str, str] = ("editorial-mono", "editorial")

# (keywords, theme_id, family_id) — first match wins, order follows
# NICHE_LIB so e.g. «мастер маникюра» hits manicure before «мастер».
_THEME_BY_KEYWORDS: tuple[tuple[tuple[str, ...], str, str], ...] = (
    (("маникюр", "ногт", "гель-лак", "педикюр", "нейл"), "display-soft", "display"),
    (("бров", "ресниц", "ламинирован", "наращиван"), "display-bold", "display"),
    (("барбер", "борода"), "display-noir", "display"),
    (("стрижк", "парикмахер", "окрашиван", "волос"), "stacked-cream", "stacked"),
    (
        ("косметолог", "чистка лица", "уход за кожей", "визаж", "салон красоты"),
        "bento-clay",
        "bento",
    ),
    (("массаж", "спа", "остеопат"), "split-product", "split"),
    (("тату", "пирсинг"), "display-ink", "display"),
    (("фотограф", "фотосесс", "фотостуди", "видеограф"), "split-teal", "split"),
    (("психолог", "психотерап", "коуч"), "stacked-corporate", "stacked"),
    (("электрик", "сантехник", "ремонт", "монтаж", "мастер"), "bento-noir", "bento"),
)


def pick_theme(category: str | None) -> tuple[str, str]:
    """Map a source category string to a valid canon ``(theme_id,
    family_id)`` pair. Unknown / missing category → generic editorial
    (same fallback the canon's ``demoDraftFor`` uses)."""
    if not category:
        return GENERIC_THEME
    lowered = category.lower()
    for keywords, theme_id, family_id in _THEME_BY_KEYWORDS:
        if any(k in lowered for k in keywords):
            return theme_id, family_id
    return GENERIC_THEME


# --- sanitisation helpers ---------------------------------------------------

_WHITESPACE_RE = re.compile(r"\s+")


def clean_text(value: Any, *, limit: int) -> str | None:
    """Strip HTML (bleach), collapse whitespace, truncate. ``None`` for
    non-strings / empty results — parser and upstream output is
    untrusted (SECURITY.md A05)."""
    if not isinstance(value, str):
        return None
    stripped = bleach.clean(value, tags=[], strip=True)
    collapsed = _WHITESPACE_RE.sub(" ", stripped).strip()
    if not collapsed:
        return None
    return collapsed[:limit].strip()


def clean_photo_urls(urls: list[Any]) -> list[str]:
    """Keep absolute https URLs only, dedupe preserving order, cap at 9."""
    seen: set[str] = set()
    result: list[str] = []
    for raw in urls:
        if not isinstance(raw, str) or len(raw) > MAX_PHOTO_URL_LEN:
            continue
        candidate = raw.strip()
        parsed = urlparse(candidate)
        if parsed.scheme != "https" or not parsed.hostname:
            continue
        if candidate in seen:
            continue
        seen.add(candidate)
        result.append(candidate)
        if len(result) >= MAX_PHOTOS:
            break
    return result


# --- JSON (de)serialisation for Redis ----------------------------------------


def state_to_json(state: DraftState) -> str:
    payload: dict[str, Any] = {
        "status": state.status.value,
        "stage": state.stage.value,
        "counts": {"photos": state.counts.photos, "reviews": state.counts.reviews},
        "draft": _draft_to_dict(state.draft) if state.draft is not None else None,
    }
    return json.dumps(payload, ensure_ascii=False)


def state_from_json(raw: bytes | str) -> DraftState:
    data = json.loads(raw)
    counts = data.get("counts") or {}
    draft_data = data.get("draft")
    return DraftState(
        status=DraftStatus(data["status"]),
        stage=BuildStage(data["stage"]),
        counts=DraftCounts(
            photos=int(counts.get("photos", 0)),
            reviews=int(counts.get("reviews", 0)),
        ),
        draft=_draft_from_dict(draft_data) if draft_data is not None else None,
    )


def _draft_to_dict(draft: PreviewDraft) -> dict[str, Any]:
    return {
        "source": draft.source.value,
        "name": draft.name,
        "category": draft.category,
        "district": draft.district,
        "rating": (
            {"value": draft.rating.value, "count": draft.rating.count}
            if draft.rating is not None
            else None
        ),
        "photos": list(draft.photos),
        "reviews": [
            {"author": r.author, "text": r.text, "rating": r.rating} for r in draft.reviews
        ],
        "services": [{"title": s.title, "price": s.price} for s in draft.services],
        "theme_id": draft.theme_id,
        "family_id": draft.family_id,
    }


def _draft_from_dict(data: dict[str, Any]) -> PreviewDraft:
    rating_data = data.get("rating")
    return PreviewDraft(
        source=DraftSourceType(data["source"]),
        name=str(data["name"]),
        category=data.get("category"),
        district=data.get("district"),
        rating=(
            DraftRating(value=float(rating_data["value"]), count=int(rating_data["count"]))
            if isinstance(rating_data, dict)
            else None
        ),
        photos=[str(p) for p in data.get("photos", [])],
        reviews=[
            DraftReview(author=str(r["author"]), text=str(r["text"]), rating=int(r["rating"]))
            for r in data.get("reviews", [])
        ],
        services=[
            DraftServiceItem(title=str(s["title"]), price=s.get("price"))
            for s in data.get("services", [])
        ],
        theme_id=str(data["theme_id"]),
        family_id=str(data["family_id"]),
    )


def _candidate_to_json(payload: CandidatePayload) -> str:
    return json.dumps(
        {
            "name": payload.name,
            "address": payload.address,
            "category": payload.category,
            "rating": (
                {"value": payload.rating.value, "count": payload.rating.count}
                if payload.rating is not None
                else None
            ),
            "photo": payload.photo,
        },
        ensure_ascii=False,
    )


def _candidate_from_json(raw: bytes | str) -> CandidatePayload:
    data = json.loads(raw)
    rating_data = data.get("rating")
    return CandidatePayload(
        name=str(data["name"]),
        address=str(data.get("address") or ""),
        category=data.get("category"),
        rating=(
            DraftRating(value=float(rating_data["value"]), count=int(rating_data["count"]))
            if isinstance(rating_data, dict)
            else None
        ),
        photo=data.get("photo"),
    )


# --- Redis stores ------------------------------------------------------------

_DRAFT_KEY_PREFIX = "preview_draft:"
_CANDIDATE_KEY_PREFIX = "preview_candidate:"


class DraftStore:
    """``preview_draft:<id>`` → JSON ``DraftState`` with a 15-min TTL.

    Every ``save`` refreshes the TTL — the key dies 15 min after the
    LAST state transition, which comfortably outlives the ≤40 s build.
    """

    def __init__(self, redis: Redis[bytes], *, ttl_seconds: int = DRAFT_TTL_SECONDS) -> None:
        self._redis = redis
        self._ttl = ttl_seconds

    async def save(self, draft_id: str, state: DraftState) -> None:
        await self._redis.set(f"{_DRAFT_KEY_PREFIX}{draft_id}", state_to_json(state), ex=self._ttl)

    async def load(self, draft_id: str) -> DraftState | None:
        raw = await self._redis.get(f"{_DRAFT_KEY_PREFIX}{draft_id}")
        if raw is None:
            return None
        return state_from_json(raw)


class CandidateStore:
    """``preview_candidate:<uuid4>`` → JSON ``CandidatePayload``.

    The uuid IS the opaque ``SourceCandidate.id`` the frontend echoes
    back in ``POST /api/preview/draft`` — unguessable, self-expiring,
    and resolvable without a second Geosearch call. Not deleted on
    read: the user may legitimately retry the same candidate.
    """

    def __init__(self, redis: Redis[bytes], *, ttl_seconds: int = CANDIDATE_TTL_SECONDS) -> None:
        self._redis = redis
        self._ttl = ttl_seconds

    async def save(self, payload: CandidatePayload) -> str:
        candidate_id = str(uuid.uuid4())
        await self._redis.set(
            f"{_CANDIDATE_KEY_PREFIX}{candidate_id}",
            _candidate_to_json(payload),
            ex=self._ttl,
        )
        return candidate_id

    async def load(self, candidate_id: str) -> CandidatePayload | None:
        raw = await self._redis.get(f"{_CANDIDATE_KEY_PREFIX}{candidate_id}")
        if raw is None:
            return None
        return _candidate_from_json(raw)
