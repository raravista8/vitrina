"""Integration tests for POST /api/preview (T1.4b).

The endpoint doesn't touch Postgres, so we run it against the FastAPI
app directly with fake adapters injected via `app.state.preview_service`.
The dependency lookup in `get_preview_service` reads from app.state, so
overriding the state is enough — no DI override needed.
"""

from __future__ import annotations

import asyncio
from collections.abc import AsyncIterator

import httpx
import pytest
import pytest_asyncio
from fastapi import FastAPI

from app.core.preview.ports import (
    PreviewCounts,
    PreviewResult,
    PreviewSourceType,
)
from app.core.preview.service import PreviewService
from app.main import create_app

pytestmark = pytest.mark.integration


class _FakeRedis:
    def __init__(self) -> None:
        self.counts: dict[str, int] = {}
        self.ttls: dict[str, int] = {}
        self.kv: dict[str, bytes] = {}

    def pipeline(self) -> _FakePipeline:
        return _FakePipeline(self)

    async def expire(self, key: str, seconds: int) -> bool:
        self.ttls[key] = seconds
        return True

    async def ping(self) -> bool:
        return True

    async def set(self, key: str, value: str | bytes, ex: int | None = None) -> bool:
        self.kv[key] = value.encode() if isinstance(value, str) else value
        if ex is not None:
            self.ttls[key] = ex
        return True

    async def get(self, key: str) -> bytes | None:
        return self.kv.get(key)


class _FakePipeline:
    def __init__(self, redis: _FakeRedis) -> None:
        self._redis = redis
        self._ops: list[tuple[str, str, int]] = []

    def incr(self, key: str, amount: int = 1) -> _FakePipeline:
        self._ops.append(("incr", key, amount))
        return self

    def ttl(self, key: str) -> _FakePipeline:
        self._ops.append(("ttl", key, 0))
        return self

    async def execute(self) -> list[int]:
        results: list[int] = []
        for op, key, _ in self._ops:
            if op == "incr":
                v = self._redis.counts.get(key, 0) + 1
                self._redis.counts[key] = v
                results.append(v)
            elif op == "ttl":
                results.append(self._redis.ttls.get(key, -1))
        return results


class _SuccessAdapter:
    def __init__(self, source_type: PreviewSourceType, result: PreviewResult) -> None:
        self.source_type = source_type
        self._result = result

    def is_available(self) -> bool:
        return True

    async def fetch(self, source_url: str) -> PreviewResult:
        return self._result


class _TimeoutAdapter:
    def __init__(self, source_type: PreviewSourceType) -> None:
        self.source_type = source_type

    def is_available(self) -> bool:
        return True

    async def fetch(self, source_url: str) -> PreviewResult:
        await asyncio.sleep(10)  # well past the 3s service budget
        raise AssertionError("should never reach here")


class _ErrorAdapter:
    def __init__(self, source_type: PreviewSourceType) -> None:
        self.source_type = source_type

    def is_available(self) -> bool:
        return True

    async def fetch(self, source_url: str) -> PreviewResult:
        raise RuntimeError("upstream is grumpy")


@pytest_asyncio.fixture
async def app() -> AsyncIterator[FastAPI]:
    fastapi_app = create_app()
    fastapi_app.state.redis = _FakeRedis()
    yield fastapi_app


@pytest_asyncio.fixture
async def client(app: FastAPI) -> AsyncIterator[httpx.AsyncClient]:
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac


def _bind_service(app: FastAPI, adapters: dict) -> None:
    app.state.preview_service = PreviewService(adapters=adapters)


# --- happy path per source type ---------------------------------------------


async def test_preview_telegram_success(app: FastAPI, client: httpx.AsyncClient) -> None:
    _bind_service(
        app,
        {
            PreviewSourceType.telegram: _SuccessAdapter(
                PreviewSourceType.telegram,
                PreviewResult(
                    source_type=PreviewSourceType.telegram,
                    name="@cool_channel",
                    counts=PreviewCounts(),
                ),
            ),
        },
    )
    resp = await client.post(
        "/api/preview",
        json={
            "source_url": "https://t.me/cool_channel",
            "source_type": "telegram",
        },
    )
    assert resp.status_code == 200
    body = resp.json()
    assert body["ok"] is True
    assert body["data"]["source_type"] == "telegram"
    assert body["data"]["name"] == "@cool_channel"
    assert body["data"]["counts"] == {"posts": None, "photos": None, "reviews": None}


async def test_preview_ymaps_success(app: FastAPI, client: httpx.AsyncClient) -> None:
    _bind_service(
        app,
        {
            PreviewSourceType.ymaps: _SuccessAdapter(
                PreviewSourceType.ymaps,
                PreviewResult(
                    source_type=PreviewSourceType.ymaps,
                    name="Студия маникюра Анна",
                    counts=PreviewCounts(reviews=24, photos=18),
                ),
            ),
        },
    )
    resp = await client.post(
        "/api/preview",
        json={
            "source_url": "https://yandex.ru/maps/213/moscow/biz/123",
            "source_type": "ymaps",
        },
    )
    assert resp.status_code == 200
    body = resp.json()
    assert body["data"]["counts"] == {"posts": None, "photos": 18, "reviews": 24}


# --- failure modes -----------------------------------------------------------


async def test_preview_timeout_returns_503(
    app: FastAPI, client: httpx.AsyncClient, monkeypatch: pytest.MonkeyPatch
) -> None:
    # Slash the budget so the timeout fires in <100 ms instead of 3 s.
    from app.core.preview import service as service_module

    monkeypatch.setattr(service_module, "PREVIEW_BUDGET_SECONDS", 0.05)

    _bind_service(app, {PreviewSourceType.telegram: _TimeoutAdapter(PreviewSourceType.telegram)})

    resp = await client.post(
        "/api/preview",
        json={"source_url": "https://t.me/slow_channel", "source_type": "telegram"},
    )
    assert resp.status_code == 503
    assert resp.json()["error"] == "preview_unavailable"


async def test_preview_upstream_error_returns_503(app: FastAPI, client: httpx.AsyncClient) -> None:
    _bind_service(app, {PreviewSourceType.ymaps: _ErrorAdapter(PreviewSourceType.ymaps)})

    resp = await client.post(
        "/api/preview",
        json={
            "source_url": "https://yandex.ru/maps/213/moscow/biz/123",
            "source_type": "ymaps",
        },
    )
    assert resp.status_code == 503
    assert resp.json()["error"] == "preview_unavailable"


async def test_preview_no_adapter_returns_503(app: FastAPI, client: httpx.AsyncClient) -> None:
    # Service has neither telegram nor ymaps adapter.
    _bind_service(app, {})

    resp = await client.post(
        "/api/preview",
        json={"source_url": "https://t.me/foo", "source_type": "telegram"},
    )
    assert resp.status_code == 503


async def test_preview_extra_fields_rejected(app: FastAPI, client: httpx.AsyncClient) -> None:
    _bind_service(
        app,
        {
            PreviewSourceType.telegram: _SuccessAdapter(
                PreviewSourceType.telegram,
                PreviewResult(
                    source_type=PreviewSourceType.telegram,
                    name="x",
                    counts=PreviewCounts(),
                ),
            ),
        },
    )
    resp = await client.post(
        "/api/preview",
        json={
            "source_url": "https://t.me/foo",
            "source_type": "telegram",
            "evil_extra": "<script>",
        },
    )
    assert resp.status_code == 422


# --- GET /api/preview/search (instant-preview rev.2 §7) ------------------------


_SEARCH_FEATURES: list[dict] = [
    {
        "properties": {
            "CompanyMetaData": {
                "name": "Студия маникюра Анны",
                "address": "Санкт-Петербург, Большой пр. П.С., 25",
                "Categories": [{"name": "Ногтевая студия"}],
                "ratings": {"rate": 4.9, "reviewCount": 38},
            }
        }
    },
    {
        "properties": {
            "CompanyMetaData": {
                "name": "Anna Nails <b>Studio</b>",
                "address": "Санкт-Петербург, Невский пр., 1",
            }
        }
    },
    # No usable name → must be dropped from the candidates.
    {"properties": {"CompanyMetaData": {"address": "somewhere"}}},
]


class _FakeSearchGateway:
    def __init__(
        self,
        *,
        available: bool = True,
        features: list[dict] | None = None,
        delay: float = 0.0,
    ) -> None:
        self._available = available
        self._features = features if features is not None else []
        self._delay = delay

    def is_available(self) -> bool:
        return self._available

    async def search_businesses(self, query: str, *, results: int = 3) -> list[dict]:
        if self._delay:
            await asyncio.sleep(self._delay)
        return self._features[:results]

    async def fetch_business_payload(self, source_url: str) -> dict | None:
        return None


def _bind_search_service(app: FastAPI, gateway: _FakeSearchGateway) -> None:
    from app.core.preview.draft import CandidateStore
    from app.core.preview.search import PreviewSearchService

    app.state.preview_search_service = PreviewSearchService(
        gateway=gateway, candidates=CandidateStore(app.state.redis)
    )


async def test_preview_search_happy_path(app: FastAPI, client: httpx.AsyncClient) -> None:
    _bind_search_service(app, _FakeSearchGateway(features=_SEARCH_FEATURES))

    resp = await client.get(
        "/api/preview/search",
        params={"q": "студия маникюра анны", "city": "Санкт-Петербург"},
    )
    assert resp.status_code == 200
    body = resp.json()
    assert body["ok"] is True
    candidates = body["data"]["candidates"]
    # The nameless third feature is dropped.
    assert len(candidates) == 2

    first = candidates[0]
    assert first["name"] == "Студия маникюра Анны"
    assert first["address"] == "Санкт-Петербург, Большой пр. П.С., 25"
    assert first["rating"] == {"value": 4.9, "count": 38}
    assert first["photo"] is None  # Geosearch exposes no photo URLs

    second = candidates[1]
    assert second["name"] == "Anna Nails Studio"  # HTML stripped
    assert second["rating"] is None

    # Each candidate is resolvable later: opaque uuid key in Redis.
    redis = app.state.redis
    for candidate in candidates:
        assert f"preview_candidate:{candidate['id']}" in redis.kv


async def test_preview_search_empty_results(app: FastAPI, client: httpx.AsyncClient) -> None:
    _bind_search_service(app, _FakeSearchGateway(features=[]))
    resp = await client.get("/api/preview/search", params={"q": "несуществующее дело"})
    assert resp.status_code == 200
    assert resp.json()["data"]["candidates"] == []


async def test_preview_search_key_unset_returns_502(
    app: FastAPI, client: httpx.AsyncClient
) -> None:
    _bind_search_service(app, _FakeSearchGateway(available=False))
    resp = await client.get("/api/preview/search", params={"q": "анна"})
    assert resp.status_code == 502
    body = resp.json()
    assert body["ok"] is False
    assert body["error"] == "search_not_configured"
    assert "request_id" in body


async def test_preview_search_upstream_timeout_returns_502(
    app: FastAPI, client: httpx.AsyncClient, monkeypatch: pytest.MonkeyPatch
) -> None:
    from app.core.preview import search as search_module

    monkeypatch.setattr(search_module, "SEARCH_BUDGET_SECONDS", 0.05)
    _bind_search_service(app, _FakeSearchGateway(features=_SEARCH_FEATURES, delay=10.0))

    resp = await client.get("/api/preview/search", params={"q": "анна"})
    assert resp.status_code == 502
    assert resp.json()["error"] == "upstream_unavailable"


async def test_preview_search_rate_limited_429(app: FastAPI, client: httpx.AsyncClient) -> None:
    from app.config import get_settings

    _bind_search_service(app, _FakeSearchGateway(features=_SEARCH_FEATURES))
    limit = get_settings().rate_limit_preview_search_per_ip_per_min

    last = None
    for _ in range(limit + 1):
        last = await client.get("/api/preview/search", params={"q": "анна"})
    assert last is not None
    assert last.status_code == 429
    assert last.json()["error"] == "rate_limited"
    assert "Retry-After" in last.headers


async def test_preview_search_missing_q_rejected(app: FastAPI, client: httpx.AsyncClient) -> None:
    _bind_search_service(app, _FakeSearchGateway(features=_SEARCH_FEATURES))
    resp = await client.get("/api/preview/search")
    assert resp.status_code == 422
