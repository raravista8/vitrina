"""Yandex.Maps deep-parse adapter (T3.2).

Strategy:
  1. Validate the source URL against the YMaps allowlist + SSRF guard
     (`core/parsing/url_validator`).
  2. Fetch the business payload from the Yandex Geosearch API (which
     accepts a URL as its ``text`` parameter). Geosearch returns
     metadata: name, address, geo, phones, hours, category, url, +
     counts for reviews/photos.
  3. Map the payload into a canonical ``SourceSnapshot``. Photo URLs
     and review text are NOT exposed by Geosearch — those land later
     via a Playwright deep-scrape adapter (T3.2b, deferred). For MVP
     we surface the counts in ``metadata`` so the LLM in T4.x has
     something to talk about, and the master fills the gap via the
     photo-upload flow (S4) when the Geosearch result is thin.

The acceptance criteria call out a Playwright fallback "if API returns
no data"; in this MVP cut we mark the snapshot ``metadata["fallback_
needed"] = True`` instead — the worker logs that and the founder
manually requests photos from the user. Wiring Playwright responsibly
(anti-bot, rate limits, fingerprinting) is its own ticket.
"""

from __future__ import annotations

import contextlib
from typing import Any, Protocol

from app.core.parsing.ports import (
    ContactRef,
    InvalidSourceUrlError,
    SourceSnapshot,
    SourceType,
    SsrfBlockedError,
    UpstreamUnavailableError,
)
from app.core.parsing.url_validator import validate_source_url
from app.utils.logging import get_logger


class GeosearchGateway(Protocol):
    """Hexagonal port for Yandex Geosearch.

    The concrete implementation (``app.infrastructure.yandex.geosearch
    .YandexGeosearchClient``) is structurally compatible — we don't
    import it here so the hexagonal contract (.importlinter) holds.
    """

    def is_available(self) -> bool: ...

    async def fetch_business_payload(self, source_url: str) -> dict[str, Any] | None: ...


YMAPS_DOMAIN_ALLOWLIST: tuple[str, ...] = (
    r"yandex\.[a-z]+",
    r"maps\.yandex\.[a-z]+",
    r"yandex\.com\.[a-z]+",
)


class YandexMapsAdapter:
    source_type = SourceType.ymaps

    def __init__(
        self,
        geosearch: GeosearchGateway,
        *,
        allow_url_resolution: bool = True,
    ) -> None:
        self._geosearch = geosearch
        self._allow_resolution = allow_url_resolution
        self._log = get_logger("core.parsing.adapters.ymaps")

    def is_available(self) -> bool:
        return self._geosearch.is_available()

    async def parse(self, source_ref: str) -> SourceSnapshot:
        # 1. URL gate — never call the upstream without passing this.
        try:
            validate_source_url(
                source_ref,
                domain_allowlist=YMAPS_DOMAIN_ALLOWLIST,
                allow_resolution=self._allow_resolution,
            )
        except (InvalidSourceUrlError, SsrfBlockedError) as exc:
            # Propagate as-is — ParserService passes them through.
            raise exc

        # 2. Geosearch fetch.
        try:
            payload = await self._geosearch.fetch_business_payload(source_ref)
        except Exception as exc:
            raise UpstreamUnavailableError(f"geosearch_failed:{exc.__class__.__name__}") from exc

        if payload is None:
            # No match. Fall back to "ask the user for photos" path —
            # the snapshot still gets created so the publish flow can
            # show what little we have plus the human-fill prompt.
            self._log.warning("ymaps_no_match", source_ref=source_ref)
            return SourceSnapshot(
                source_type=SourceType.ymaps,
                source_ref=source_ref,
                metadata={"fallback_needed": True, "fallback_reason": "no_match"},
            )

        return _payload_to_snapshot(source_ref, payload)


def _payload_to_snapshot(source_ref: str, feature: dict[str, Any]) -> SourceSnapshot:
    properties = _dict(feature.get("properties"))
    company = _dict(properties.get("CompanyMetaData"))

    name = _str(company.get("name"))
    address = _str(company.get("address"))
    category_list = _list(company.get("Categories"))
    category_name = _str(category_list[0].get("name")) if category_list else None
    description = _str(company.get("description"))

    contacts: list[ContactRef] = []
    for phone in _list(company.get("Phones")):
        formatted = _str(phone.get("formatted")) or _str(phone.get("number"))
        if formatted:
            contacts.append(ContactRef(kind="phone", value=formatted))
    website = _str(company.get("url"))
    if website:
        contacts.append(ContactRef(kind="website", value=website))

    metadata: dict[str, Any] = {}
    if address:
        metadata["address"] = address
    if category_name:
        metadata["category"] = category_name
    geometry = _dict(feature.get("geometry"))
    coords = geometry.get("coordinates")
    if isinstance(coords, list) and len(coords) == 2:
        with contextlib.suppress(TypeError, ValueError):
            metadata["geo"] = {"lon": float(coords[0]), "lat": float(coords[1])}

    ratings = _dict(company.get("ratings"))
    rating_value = ratings.get("rate") or ratings.get("score")
    if isinstance(rating_value, (int | float)):
        metadata["rating"] = float(rating_value)
    review_count = _safe_int(ratings.get("reviewCount"))
    if review_count is not None:
        metadata["review_count"] = review_count
    photos_block = _dict(company.get("Photos"))
    photo_count = _safe_int(photos_block.get("count"))
    if photo_count is not None:
        metadata["photo_count"] = photo_count

    hours_block = _dict(company.get("Hours"))
    intervals = _list(hours_block.get("Availabilities"))
    if intervals:
        metadata["opening_hours"] = [
            {
                "days": _list_of_str(entry.get("Intervals", [])),
                "from": _str(entry.get("from")),
                "to": _str(entry.get("to")),
                "raw": entry,
            }
            for entry in intervals
        ]

    return SourceSnapshot(
        source_type=SourceType.ymaps,
        source_ref=source_ref,
        title=name,
        description=description,
        contacts=contacts,
        photos=[],  # filled by photo-upload (S4) or future Playwright scrape
        reviews=[],  # Geosearch exposes counts only; bodies need scraping
        services=[],  # not surfaced by Geosearch
        metadata=metadata,
    )


# --- payload helpers ------------------------------------------------------


def _dict(value: Any) -> dict[str, Any]:
    return value if isinstance(value, dict) else {}


def _list(value: Any) -> list[Any]:
    return value if isinstance(value, list) else []


def _str(value: Any) -> str | None:
    return value if isinstance(value, str) and value.strip() else None


def _list_of_str(value: Any) -> list[str]:
    if not isinstance(value, list):
        return []
    return [v for v in value if isinstance(v, str)]


def _safe_int(value: Any) -> int | None:
    if isinstance(value, int):
        return value
    if isinstance(value, str) and value.isdigit():
        return int(value)
    return None
