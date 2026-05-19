"""Unit tests for the Yandex.Maps deep-parse adapter (T3.2).

Geosearch is mocked via a fake ``YandexGeosearchClient`` — three fixture
payloads cover the canonical happy path (full metadata), a thin payload
(rating + counts only), and a no-match.
"""

from __future__ import annotations

from typing import Any

import pytest

from app.core.parsing.adapters.ymaps import YandexMapsAdapter
from app.core.parsing.ports import (
    InvalidSourceUrlError,
    SourceType,
    SsrfBlockedError,
    UpstreamUnavailableError,
)

YMAPS_URL = "https://yandex.ru/maps/org/12345"


# --- fakes ----------------------------------------------------------------


class _FakeGeosearch:
    def __init__(self, *, payload: dict[str, Any] | None, available: bool = True) -> None:
        self.payload = payload
        self._available = available
        self.calls: list[str] = []

    def is_available(self) -> bool:
        return self._available

    async def fetch_business_payload(self, source_url: str) -> dict[str, Any] | None:
        self.calls.append(source_url)
        return self.payload


class _BrokenGeosearch:
    def is_available(self) -> bool:
        return True

    async def fetch_business_payload(self, source_url: str) -> dict[str, Any] | None:
        raise RuntimeError("upstream is down")


# --- fixtures -------------------------------------------------------------


@pytest.fixture
def full_payload() -> dict[str, Any]:
    return {
        "geometry": {"type": "Point", "coordinates": [34.3469, 61.7849]},
        "properties": {
            "CompanyMetaData": {
                "id": "12345",
                "name": "Студия маникюра Анны",
                "address": "Россия, Петрозаводск, ул. Ленина, 1",
                "url": "https://example.com",
                "description": "Маникюр и педикюр в центре города.",
                "Categories": [{"name": "Маникюр"}],
                "Phones": [
                    {"type": "phone", "formatted": "+7 (921) 123-45-67", "number": "+79211234567"},
                ],
                "Hours": {
                    "Availabilities": [
                        {
                            "Intervals": ["Mo", "Tu", "We", "Th", "Fr"],
                            "from": "10:00:00",
                            "to": "20:00:00",
                        }
                    ]
                },
                "ratings": {"rate": 4.8, "reviewCount": 47},
                "Photos": {"count": 18},
            }
        },
    }


@pytest.fixture
def thin_payload() -> dict[str, Any]:
    """Just-the-essentials payload: no phones, no description, no hours."""
    return {
        "properties": {
            "CompanyMetaData": {
                "id": "999",
                "name": "Минимальный пример",
                "address": "Россия, Москва",
            }
        }
    }


# --- happy path -----------------------------------------------------------


@pytest.mark.unit
async def test_full_payload_maps_to_snapshot(full_payload: dict[str, Any]) -> None:
    adapter = YandexMapsAdapter(
        _FakeGeosearch(payload=full_payload),
        allow_url_resolution=False,
    )
    snapshot = await adapter.parse(YMAPS_URL)

    assert snapshot.source_type == SourceType.ymaps
    assert snapshot.title == "Студия маникюра Анны"
    assert snapshot.description == "Маникюр и педикюр в центре города."
    assert any(c.kind == "phone" and "921" in c.value for c in snapshot.contacts)
    assert any(c.kind == "website" for c in snapshot.contacts)

    assert snapshot.metadata["category"] == "Маникюр"
    assert "Петрозаводск" in snapshot.metadata["address"]
    assert snapshot.metadata["rating"] == pytest.approx(4.8)
    assert snapshot.metadata["review_count"] == 47
    assert snapshot.metadata["photo_count"] == 18
    assert snapshot.metadata["geo"] == {
        "lon": pytest.approx(34.3469),
        "lat": pytest.approx(61.7849),
    }
    assert snapshot.metadata["opening_hours"][0]["from"] == "10:00:00"


@pytest.mark.unit
async def test_thin_payload_still_returns_snapshot(thin_payload: dict[str, Any]) -> None:
    adapter = YandexMapsAdapter(
        _FakeGeosearch(payload=thin_payload),
        allow_url_resolution=False,
    )
    snapshot = await adapter.parse(YMAPS_URL)
    assert snapshot.title == "Минимальный пример"
    assert snapshot.contacts == []
    assert "rating" not in snapshot.metadata
    assert "photo_count" not in snapshot.metadata


@pytest.mark.unit
async def test_no_match_falls_back_to_human_fill() -> None:
    adapter = YandexMapsAdapter(
        _FakeGeosearch(payload=None),
        allow_url_resolution=False,
    )
    snapshot = await adapter.parse(YMAPS_URL)
    assert snapshot.title is None
    assert snapshot.metadata["fallback_needed"] is True
    assert snapshot.metadata["fallback_reason"] == "no_match"


# --- failure modes --------------------------------------------------------


@pytest.mark.unit
async def test_invalid_domain_rejected_before_upstream() -> None:
    fake = _FakeGeosearch(payload=None)
    adapter = YandexMapsAdapter(fake, allow_url_resolution=False)
    with pytest.raises(InvalidSourceUrlError):
        await adapter.parse("https://evil.com/maps/org/1")
    assert fake.calls == []  # upstream never invoked


@pytest.mark.unit
async def test_ip_literal_rejected_before_upstream() -> None:
    fake = _FakeGeosearch(payload=None)
    adapter = YandexMapsAdapter(fake, allow_url_resolution=False)
    with pytest.raises(InvalidSourceUrlError):
        await adapter.parse("https://127.0.0.1/maps/org/1")
    assert fake.calls == []


@pytest.mark.unit
async def test_dns_to_private_ip_rejected(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    import socket as _socket

    def fake_getaddrinfo(*_args, **_kwargs):
        return [(0, 0, 0, "", ("169.254.169.254", 0))]

    monkeypatch.setattr(_socket, "getaddrinfo", fake_getaddrinfo)
    fake = _FakeGeosearch(payload=None)
    adapter = YandexMapsAdapter(fake)
    with pytest.raises(SsrfBlockedError):
        await adapter.parse(YMAPS_URL)
    assert fake.calls == []


@pytest.mark.unit
async def test_upstream_exception_becomes_upstream_unavailable() -> None:
    adapter = YandexMapsAdapter(_BrokenGeosearch(), allow_url_resolution=False)
    with pytest.raises(UpstreamUnavailableError, match="geosearch_failed"):
        await adapter.parse(YMAPS_URL)


@pytest.mark.unit
def test_adapter_is_unavailable_without_api_key() -> None:
    adapter = YandexMapsAdapter(_FakeGeosearch(payload=None, available=False))
    assert adapter.is_available() is False
