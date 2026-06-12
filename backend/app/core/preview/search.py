"""Search-by-name for the instant-preview flow (ТЗ rev.2 §7).

``GET /api/preview/search?q=<название>&city=<город>`` → ≤3 candidates,
Yandex Geosearch TEXT search only (no other catalogs per ТЗ §11).

Budget: 3 s hard (same shape as the rev.2 state machine's
``source-searching`` → ``source-error`` transition). The router maps
the failure reasons to the 502 envelope codes:

  - ``not_configured`` → ``search_not_configured`` (Geosearch key unset)
  - ``timeout`` / ``upstream_error`` → ``upstream_unavailable``

Every returned candidate is persisted in the ``CandidateStore`` so the
opaque ``id`` can be resolved back at ``POST /api/preview/draft`` time
without a second upstream call.
"""

from __future__ import annotations

import asyncio
from dataclasses import dataclass
from typing import Any, Protocol

from app.core.preview.draft import (
    MAX_ADDRESS_LEN,
    MAX_CATEGORY_LEN,
    MAX_NAME_LEN,
    CandidatePayload,
    CandidateStore,
    DraftRating,
    clean_text,
)
from app.utils.logging import get_logger

SEARCH_BUDGET_SECONDS = 3.0
MAX_CANDIDATES = 3


class GeosearchGateway(Protocol):
    """Hexagonal port for Yandex Geosearch. The concrete implementation
    (``app.infrastructure.yandex.geosearch.YandexGeosearchClient``) is
    structurally compatible — not imported here so core stays clean."""

    def is_available(self) -> bool: ...

    async def search_businesses(self, query: str, *, results: int = 3) -> list[dict[str, Any]]: ...

    async def fetch_business_payload(self, source_url: str) -> dict[str, Any] | None: ...


@dataclass(frozen=True, slots=True)
class SourceCandidate:
    """Mirrors the frozen frontend type (canon rev.2 §6)."""

    id: str
    name: str
    address: str
    rating: DraftRating | None
    photo: str | None


@dataclass(frozen=True, slots=True)
class SearchOutcome:
    candidates: list[SourceCandidate] | None = None
    reason: str | None = None  # 'not_configured' | 'timeout' | 'upstream_error'


class PreviewSearchService:
    def __init__(self, *, gateway: GeosearchGateway, candidates: CandidateStore) -> None:
        self._gateway = gateway
        self._candidates = candidates
        self._log = get_logger("core.preview.search")

    async def search(self, *, q: str, city: str | None) -> SearchOutcome:
        if not self._gateway.is_available():
            self._log.info("preview_search_not_configured")
            return SearchOutcome(reason="not_configured")

        query = f"{q}, {city}" if city else q
        try:
            features = await asyncio.wait_for(
                self._gateway.search_businesses(query, results=MAX_CANDIDATES),
                timeout=SEARCH_BUDGET_SECONDS,
            )
        except TimeoutError:
            self._log.info("preview_search_timeout", budget=SEARCH_BUDGET_SECONDS)
            return SearchOutcome(reason="timeout")
        except Exception as exc:
            self._log.warning("preview_search_upstream_error", error=exc.__class__.__name__)
            return SearchOutcome(reason="upstream_error")

        candidates: list[SourceCandidate] = []
        for feature in features[:MAX_CANDIDATES]:
            payload = parse_candidate_feature(feature)
            if payload is None:
                continue
            candidate_id = await self._candidates.save(payload)
            candidates.append(
                SourceCandidate(
                    id=candidate_id,
                    name=payload.name,
                    address=payload.address,
                    rating=payload.rating,
                    photo=payload.photo,
                )
            )

        self._log.info("preview_search_ok", found=len(candidates))
        return SearchOutcome(candidates=candidates)


def parse_candidate_feature(feature: Any) -> CandidatePayload | None:
    """Map one Geosearch ``features[]`` entry to a ``CandidatePayload``.

    Geosearch exposes no photo URLs (only counts), so ``photo`` stays
    ``None`` — the frontend renders the initial-placeholder per ТЗ §3.4.
    Entries without a usable name are dropped.
    """
    if not isinstance(feature, dict):
        return None
    properties = feature.get("properties")
    properties = properties if isinstance(properties, dict) else {}
    company = properties.get("CompanyMetaData")
    company = company if isinstance(company, dict) else {}

    name = clean_text(company.get("name"), limit=MAX_NAME_LEN)
    if name is None:
        return None

    address = clean_text(company.get("address"), limit=MAX_ADDRESS_LEN) or clean_text(
        properties.get("description"), limit=MAX_ADDRESS_LEN
    )

    category: str | None = None
    categories = company.get("Categories")
    if isinstance(categories, list) and categories and isinstance(categories[0], dict):
        category = clean_text(categories[0].get("name"), limit=MAX_CATEGORY_LEN)

    return CandidatePayload(
        name=name,
        address=address or "",
        category=category,
        rating=parse_rating(company.get("ratings")),
        photo=None,  # Geosearch has counts only, no photo URLs
    )


def parse_rating(ratings: Any) -> DraftRating | None:
    if not isinstance(ratings, dict):
        return None
    value = ratings.get("rate") or ratings.get("score")
    count = ratings.get("reviewCount")
    if isinstance(count, str) and count.isdigit():
        count = int(count)
    if not isinstance(value, int | float) or not isinstance(count, int):
        return None
    return DraftRating(value=float(value), count=count)
