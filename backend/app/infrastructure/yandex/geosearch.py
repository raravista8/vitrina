"""Async Yandex Geosearch API client.

Endpoint docs: https://yandex.ru/dev/maps/geosearch/doc/concepts/about.html
We feed an arbitrary URL or query string; the API returns one or more
features each with a ``CompanyMetaData`` block we extract a few useful
fields from.

When the key is missing we surface ``is_available() = False`` so the
preview service skips this adapter cleanly (no exception).
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any

import httpx

GEOSEARCH_URL = "https://search-maps.yandex.ru/v1/"


@dataclass(frozen=True, slots=True)
class GeosearchPlace:
    name: str | None
    address: str | None
    reviews: int | None
    photos: int | None
    company_id: str | None


class YandexGeosearchClient:
    def __init__(self, *, api_key: str | None, timeout_seconds: float = 2.5) -> None:
        self._api_key = api_key
        self._timeout = timeout_seconds

    def is_available(self) -> bool:
        return bool(self._api_key)

    async def find_business_by_url(self, source_url: str) -> GeosearchPlace | None:
        """Search for the place referenced by a Yandex.Maps URL.

        The Geosearch API accepts a free-form ``text`` parameter, so we
        pass the source URL itself — Yandex parses the place identifier
        out of standard ``yandex.<tld>/maps/...`` links.
        """
        payload = await self._raw_search(source_url)
        return _parse_first_feature(payload)

    async def fetch_business_payload(self, source_url: str) -> dict[str, Any] | None:
        """Return the full Geosearch ``features[0]`` payload for the URL.

        Exposed so the T3.2 deep-parse adapter can pull the richer fields
        (Phones, Hours, geometry, CategoriesText, url) without us having
        to re-fetch. Returns ``None`` when the API reports no matches.
        """
        payload = await self._raw_search(source_url)
        if not isinstance(payload, dict):
            return None
        features = payload.get("features")
        if not isinstance(features, list) or not features:
            return None
        first = features[0]
        return first if isinstance(first, dict) else None

    async def search_businesses(self, query: str, *, results: int = 3) -> list[dict[str, Any]]:
        """Free-text TEXT search (instant-preview rev.2 «поиск по
        названию»). Returns the raw ``features[]`` dicts — the core
        layer parses them into candidates."""
        payload = await self._raw_search(query, results=results)
        if not isinstance(payload, dict):
            return []
        features = payload.get("features")
        if not isinstance(features, list):
            return []
        return [f for f in features if isinstance(f, dict)]

    async def _raw_search(self, text: str, *, results: int = 1) -> Any:
        if not self._api_key:
            raise RuntimeError("YandexGeosearchClient called without API key")
        params = {
            "apikey": self._api_key,
            "text": text,
            "type": "biz",
            "lang": "ru_RU",
            "results": str(results),
        }
        async with httpx.AsyncClient(timeout=self._timeout) as client:
            response = await client.get(GEOSEARCH_URL, params=params)
        response.raise_for_status()
        return response.json()


def _parse_first_feature(payload: Any) -> GeosearchPlace | None:
    if not isinstance(payload, dict):
        return None
    features = payload.get("features")
    if not isinstance(features, list) or not features:
        return None

    first = features[0]
    if not isinstance(first, dict):
        return None

    properties = first.get("properties") or {}
    company = (properties.get("CompanyMetaData") or {}) if isinstance(properties, dict) else {}

    return GeosearchPlace(
        name=company.get("name") if isinstance(company, dict) else None,
        address=company.get("address") if isinstance(company, dict) else None,
        reviews=_safe_int(company.get("ratings", {}).get("reviewCount"))
        if isinstance(company.get("ratings"), dict)
        else None,
        photos=_safe_int(company.get("Photos", {}).get("count"))
        if isinstance(company.get("Photos"), dict)
        else None,
        company_id=company.get("id") if isinstance(company, dict) else None,
    )


def _safe_int(value: Any) -> int | None:
    if isinstance(value, int):
        return value
    if isinstance(value, str) and value.isdigit():
        return int(value)
    return None
