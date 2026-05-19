"""Yandex.Maps preview adapter (T1.4b).

Calls the Geosearch API to enrich the badge with the business card name
+ optional review / photo counts when the Geocoder includes them in the
``CompanyMetaData`` block.

The full T3.2 parser will replay the Geosearch lookup at parse time;
this adapter is intentionally read-only and lightweight.
"""

from __future__ import annotations

from app.core.preview.ports import (
    PreviewCounts,
    PreviewResult,
    PreviewSourceType,
)
from app.infrastructure.yandex.geosearch import YandexGeosearchClient


class YMapsPreviewAdapter:
    source_type = PreviewSourceType.ymaps

    def __init__(self, client: YandexGeosearchClient) -> None:
        self._client = client

    def is_available(self) -> bool:
        return self._client.is_available()

    async def fetch(self, source_url: str) -> PreviewResult:
        place = await self._client.find_business_by_url(source_url)
        if place is None:
            raise ValueError(f"yandex geosearch returned no place for {source_url!r}")

        return PreviewResult(
            source_type=PreviewSourceType.ymaps,
            name=place.name,
            counts=PreviewCounts(reviews=place.reviews, photos=place.photos),
        )
