"""Integration tests for the instant-preview draft endpoints.

  - POST /api/preview/draft           (url | candidate_id → 202 draft_id)
  - GET  /api/preview/draft/{id}      (poll: building → ready/failed)

No Postgres needed — the endpoints live entirely on Redis (faked) +
injected fake gateways, same approach as ``test_preview.py``.
"""

from __future__ import annotations

import asyncio
from collections.abc import AsyncIterator
from typing import Any

import httpx
import pytest
import pytest_asyncio
from fastapi import FastAPI

from app.core.preview.draft import (
    CandidatePayload,
    CandidateStore,
    DraftRating,
    DraftStore,
)
from app.core.preview.draft_builder import (
    DraftFetchers,
    PreviewDraftService,
)
from app.main import create_app

pytestmark = pytest.mark.integration


# --- fakes --------------------------------------------------------------------


class _FakeRedis:
    """Covers what the rate limiter (pipeline incr/ttl + expire) and the
    draft/candidate stores (get/set ex=) use."""

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

    async def delete(self, key: str) -> int:
        return 1 if self.kv.pop(key, None) is not None else 0


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


_TG_CHANNEL_HTML = """
<html><head>
<title>fallback title</title>
<meta property="og:title" content="Студия маникюра Анны">
<meta property="og:description" content="Маникюр и педикюр в Петроградском районе">
</head><body>
<div class="tgme_widget_message">
  <a class="tgme_widget_message_photo_wrap"
     style="width:100%;background-image:url('https://cdn-telegram.org/file/photo1.jpg')"></a>
  <div class="tgme_widget_message_text">Свежие работы за неделю</div>
</div>
<div class="tgme_widget_message">
  <a class="tgme_widget_message_photo_wrap"
     style="background-image:url('https://cdn-telegram.org/file/photo2.jpg')"></a>
  <div class="tgme_widget_message_text">Запись открыта</div>
</div>
</body></html>
"""

_OG_PAGE_HTML = """
<html><head>
<meta property="og:title" content="Барбершоп «Усы»  <script>x</script>">
<meta property="og:image" content="https://example.com/hero.jpg">
<meta property="og:description" content="Барбершоп в центре">
</head><body></body></html>
"""

_YMAPS_FEATURE: dict[str, Any] = {
    "properties": {
        "CompanyMetaData": {
            "name": "Студия маникюра Анны",
            "address": "Санкт-Петербург, Большой пр. П.С., 25",
            "Categories": [{"name": "Ногтевая студия"}],
            "ratings": {"rate": 4.9, "reviewCount": 38},
            "Photos": {"count": 12},
        }
    },
    "geometry": {"coordinates": [30.3, 59.96]},
}


class _FakeGeosearch:
    def __init__(
        self,
        *,
        available: bool = True,
        feature: dict[str, Any] | None = None,
        features: list[dict[str, Any]] | None = None,
    ) -> None:
        self._available = available
        self._feature = feature
        self._features = features or []

    def is_available(self) -> bool:
        return self._available

    async def search_businesses(self, query: str, *, results: int = 3) -> list[dict[str, Any]]:
        return self._features[:results]

    async def fetch_business_payload(self, source_url: str) -> dict[str, Any] | None:
        return self._feature


class _FakeHtmlFetcher:
    """Serves canned HTML; optionally blocks on an event so tests can
    observe the intermediate ``building/fetching`` poll state."""

    def __init__(self, html: str, *, gate: asyncio.Event | None = None) -> None:
        self._html = html
        self._gate = gate
        self.requested_urls: list[str] = []

    async def get_text(self, *, url: str, timeout: float) -> str:  # noqa: ASYNC109
        self.requested_urls.append(url)
        if self._gate is not None:
            await self._gate.wait()
        return self._html


class _FailingHtmlFetcher:
    async def get_text(self, *, url: str, timeout: float) -> str:  # noqa: ASYNC109
        raise RuntimeError("connection refused")


# --- fixtures -------------------------------------------------------------------


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


def _bind_draft_service(
    app: FastAPI,
    *,
    geosearch: _FakeGeosearch | None = None,
    html_fetcher: Any | None = None,
) -> PreviewDraftService:
    redis = app.state.redis
    candidate_store = CandidateStore(redis)
    service = PreviewDraftService(
        store=DraftStore(redis),
        candidates=candidate_store,
        fetchers=DraftFetchers(
            geosearch=geosearch or _FakeGeosearch(),
            html_fetcher=html_fetcher or _FakeHtmlFetcher(_TG_CHANNEL_HTML),
            # Tests must not hit real DNS — the regex/IP-literal layer
            # still runs; the private-range test patches the resolver.
            allow_url_resolution=False,
        ),
    )
    app.state.preview_draft_service = service
    return service


async def _wait_for_terminal_state(
    client: httpx.AsyncClient, draft_id: str, *, attempts: int = 50
) -> dict[str, Any]:
    for _ in range(attempts):
        resp = await client.get(f"/api/preview/draft/{draft_id}")
        assert resp.status_code == 200
        data: dict[str, Any] = resp.json()["data"]
        if data["status"] != "building":
            return data
        await asyncio.sleep(0.02)
    raise AssertionError("draft never reached a terminal state")


# --- lifecycle: building → ready -------------------------------------------------


async def test_draft_lifecycle_telegram_building_then_ready(
    app: FastAPI, client: httpx.AsyncClient
) -> None:
    gate = asyncio.Event()
    fetcher = _FakeHtmlFetcher(_TG_CHANNEL_HTML, gate=gate)
    _bind_draft_service(app, html_fetcher=fetcher)

    resp = await client.post("/api/preview/draft", json={"url": "https://t.me/anna_nails"})
    assert resp.status_code == 202
    body = resp.json()
    assert body["ok"] is True
    draft_id = body["data"]["draft_id"]

    # While the fetch is gated the poll shows the live building state.
    poll = await client.get(f"/api/preview/draft/{draft_id}")
    assert poll.status_code == 200
    in_flight = poll.json()["data"]
    assert in_flight["status"] == "building"
    assert in_flight["stage"] == "fetching"
    assert in_flight["counts"] == {"photos": 0, "reviews": 0}
    assert in_flight["draft"] is None

    gate.set()
    final = await _wait_for_terminal_state(client, draft_id)

    assert final["status"] == "ready"
    assert final["stage"] == "styling"
    assert final["counts"] == {"photos": 2, "reviews": 0}

    draft = final["draft"]
    assert draft["source"] == "telegram"
    assert draft["name"] == "Студия маникюра Анны"
    assert draft["photos"] == [
        "https://cdn-telegram.org/file/photo1.jpg",
        "https://cdn-telegram.org/file/photo2.jpg",
    ]
    assert draft["reviews"] == []
    # Frozen-contract shape: all keys present, nothing extra.
    assert set(draft) == {
        "source",
        "name",
        "category",
        "district",
        "rating",
        "photos",
        "reviews",
        "services",
        "theme_id",
        "family_id",
    }
    # Adapter fetched the public web view, not the raw channel URL.
    assert fetcher.requested_urls == ["https://t.me/s/anna_nails"]


async def test_draft_from_ymaps_url_sparse_with_theme(
    app: FastAPI, client: httpx.AsyncClient
) -> None:
    _bind_draft_service(app, geosearch=_FakeGeosearch(feature=_YMAPS_FEATURE))

    resp = await client.post(
        "/api/preview/draft",
        json={"url": "https://yandex.ru/maps/org/studiya_anny/123456/"},
    )
    assert resp.status_code == 202
    draft_id = resp.json()["data"]["draft_id"]

    final = await _wait_for_terminal_state(client, draft_id)
    assert final["status"] == "ready"
    draft = final["draft"]
    assert draft["source"] == "yandex_maps"
    assert draft["name"] == "Студия маникюра Анны"
    assert draft["category"] == "Ногтевая студия"
    assert draft["rating"] == {"value": 4.9, "count": 38}
    assert draft["photos"] == []  # Geosearch exposes no photo URLs → sparse
    # Category-driven theme pick lands on a real canon preset id.
    assert draft["theme_id"] == "display-soft"
    assert draft["family_id"] == "display"


async def test_draft_from_website_og_tags_sanitised(
    app: FastAPI, client: httpx.AsyncClient
) -> None:
    _bind_draft_service(app, html_fetcher=_FakeHtmlFetcher(_OG_PAGE_HTML))

    resp = await client.post("/api/preview/draft", json={"url": "https://usy-barber.ru/"})
    assert resp.status_code == 202
    final = await _wait_for_terminal_state(client, resp.json()["data"]["draft_id"])

    assert final["status"] == "ready"
    draft = final["draft"]
    assert draft["source"] == "website"
    # HTML stripped by bleach, whitespace collapsed.
    assert draft["name"] == "Барбершоп «Усы» x"
    assert draft["photos"] == ["https://example.com/hero.jpg"]


# --- lifecycle: candidate path -----------------------------------------------------


async def test_draft_from_candidate_id(app: FastAPI, client: httpx.AsyncClient) -> None:
    _bind_draft_service(app)
    candidate_store = CandidateStore(app.state.redis)
    candidate_id = await candidate_store.save(
        CandidatePayload(
            name="Студия маникюра Анны",
            address="Санкт-Петербург, Большой пр. П.С., 25",
            category="Ногтевая студия",
            rating=DraftRating(value=4.9, count=38),
            photo=None,
        )
    )

    resp = await client.post("/api/preview/draft", json={"candidate_id": candidate_id})
    assert resp.status_code == 202

    final = await _wait_for_terminal_state(client, resp.json()["data"]["draft_id"])
    assert final["status"] == "ready"
    draft = final["draft"]
    assert draft["source"] == "yandex_maps"
    assert draft["name"] == "Студия маникюра Анны"
    assert draft["rating"] == {"value": 4.9, "count": 38}
    assert draft["theme_id"] == "display-soft"


async def test_draft_unknown_candidate_id_404(app: FastAPI, client: httpx.AsyncClient) -> None:
    _bind_draft_service(app)
    resp = await client.post(
        "/api/preview/draft",
        json={"candidate_id": "00000000-0000-4000-8000-000000000000"},
    )
    assert resp.status_code == 404
    assert resp.json()["error"] == "candidate_not_found"


# --- failure paths ------------------------------------------------------------------


async def test_draft_failed_when_fetch_errors(app: FastAPI, client: httpx.AsyncClient) -> None:
    _bind_draft_service(app, html_fetcher=_FailingHtmlFetcher())

    resp = await client.post("/api/preview/draft", json={"url": "https://t.me/broken_channel"})
    assert resp.status_code == 202

    final = await _wait_for_terminal_state(client, resp.json()["data"]["draft_id"])
    assert final["status"] == "failed"
    assert final["draft"] is None
    assert final["counts"] == {"photos": 0, "reviews": 0}


async def test_draft_unknown_id_404(app: FastAPI, client: httpx.AsyncClient) -> None:
    _bind_draft_service(app)
    resp = await client.get("/api/preview/draft/00000000-0000-4000-8000-000000000001")
    assert resp.status_code == 404
    assert resp.json()["error"] == "draft_not_found"


# --- request validation ---------------------------------------------------------------


async def test_draft_requires_exactly_one_of_url_or_candidate(
    app: FastAPI, client: httpx.AsyncClient
) -> None:
    _bind_draft_service(app)

    neither = await client.post("/api/preview/draft", json={})
    assert neither.status_code == 422

    both = await client.post(
        "/api/preview/draft",
        json={
            "url": "https://t.me/x",
            "candidate_id": "00000000-0000-4000-8000-000000000000",
        },
    )
    assert both.status_code == 422

    extra = await client.post(
        "/api/preview/draft",
        json={"url": "https://t.me/x", "evil": "<script>"},
    )
    assert extra.status_code == 422


# --- SSRF ------------------------------------------------------------------------------


async def test_draft_rejects_private_ip_literal_url(
    app: FastAPI, client: httpx.AsyncClient
) -> None:
    _bind_draft_service(app)
    for evil in (
        "http://169.254.169.254/latest/meta-data/",
        "http://127.0.0.1:6379/",
        "http://10.0.0.5/admin",
        "http://[::1]/",
    ):
        resp = await client.post("/api/preview/draft", json={"url": evil})
        assert resp.status_code == 400, evil
        assert resp.json()["error"] == "invalid_url"


async def test_draft_fails_when_hostname_resolves_private(
    app: FastAPI, client: httpx.AsyncClient, monkeypatch: pytest.MonkeyPatch
) -> None:
    """A hostname passing the regex layer but resolving into RFC1918 is
    blocked by the in-builder DNS gate → honest ``failed`` draft, and
    the fetcher is never called."""
    fetcher = _FakeHtmlFetcher(_OG_PAGE_HTML)
    redis = app.state.redis
    service = PreviewDraftService(
        store=DraftStore(redis),
        candidates=CandidateStore(redis),
        fetchers=DraftFetchers(
            geosearch=_FakeGeosearch(),
            html_fetcher=fetcher,
            allow_url_resolution=True,  # exercise the real DNS gate
        ),
    )
    app.state.preview_draft_service = service

    from app.core.parsing import url_validator

    monkeypatch.setattr(url_validator, "_resolve", lambda hostname: ("10.0.0.5",))

    resp = await client.post("/api/preview/draft", json={"url": "https://rebound.example/"})
    assert resp.status_code == 202

    final = await _wait_for_terminal_state(client, resp.json()["data"]["draft_id"])
    assert final["status"] == "failed"
    assert fetcher.requested_urls == []


# --- rate limit -------------------------------------------------------------------------


async def test_draft_create_rate_limited(app: FastAPI, client: httpx.AsyncClient) -> None:
    from app.config import get_settings

    _bind_draft_service(app)
    redis = app.state.redis
    limit = get_settings().rate_limit_preview_draft_per_ip_per_hour

    last = None
    for _ in range(limit + 1):
        last = await client.post("/api/preview/draft", json={"url": "https://t.me/spam"})
    assert last is not None
    assert last.status_code == 429
    assert last.json()["error"] == "rate_limited"
    assert "Retry-After" in last.headers
    assert any(key.startswith("ratelimit:preview_draft:") for key in redis.counts)
