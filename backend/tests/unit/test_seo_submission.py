"""Unit tests for SEO submission service + adapters (T2.6)."""

from __future__ import annotations

import asyncio

import httpx
import pytest

from app.core.seo.adapters.google_search_console import GoogleSearchConsoleSubmitter
from app.core.seo.adapters.indexnow import IndexNowSubmitter
from app.core.seo.adapters.yandex_webmaster import YandexWebmasterSubmitter
from app.core.seo.ports import SeoEngine, SubmissionResult
from app.core.seo.service import SeoSubmissionService

SITE_URL = "https://test-master.vitrina.site"


# --- adapters: gating + HTTP roundtrip --------------------------------------


@pytest.mark.unit
async def test_yandex_webmaster_disabled_without_key() -> None:
    s = YandexWebmasterSubmitter(api_key=None)
    assert not s.is_available()
    result = await s.submit(SITE_URL)
    assert result.submitted is False
    assert result.reason == "adapter_disabled"


@pytest.mark.unit
async def test_yandex_webmaster_success(monkeypatch: pytest.MonkeyPatch) -> None:
    def handler(_: httpx.Request) -> httpx.Response:
        return httpx.Response(200, text="ok")

    _patch_httpx_client(monkeypatch, httpx.MockTransport(handler))

    s = YandexWebmasterSubmitter(api_key="test-key")  # pragma: allowlist secret
    result = await s.submit(SITE_URL)
    assert result.submitted is True
    assert result.engine == SeoEngine.yandex_webmaster
    assert result.upstream_status == 200


@pytest.mark.unit
async def test_yandex_webmaster_records_http_failure(monkeypatch: pytest.MonkeyPatch) -> None:
    def handler(_: httpx.Request) -> httpx.Response:
        return httpx.Response(503)

    _patch_httpx_client(monkeypatch, httpx.MockTransport(handler))

    s = YandexWebmasterSubmitter(api_key="test-key")  # pragma: allowlist secret
    result = await s.submit(SITE_URL)
    assert result.submitted is False
    assert result.upstream_status == 503
    assert result.reason == "http_503"


@pytest.mark.unit
async def test_indexnow_disabled_without_key() -> None:
    s = IndexNowSubmitter(site_key=None)
    assert not s.is_available()


@pytest.mark.unit
async def test_indexnow_success_uses_host_from_url(monkeypatch: pytest.MonkeyPatch) -> None:
    captured: dict = {}

    def handler(request: httpx.Request) -> httpx.Response:
        captured["payload"] = request.content.decode()
        return httpx.Response(200)

    _patch_httpx_client(monkeypatch, httpx.MockTransport(handler))

    s = IndexNowSubmitter(site_key="indexnow-key")  # pragma: allowlist secret
    result = await s.submit(SITE_URL)
    assert result.submitted is True
    assert "test-master.vitrina.site" in captured["payload"]
    assert "indexnow-key" in captured["payload"]


@pytest.mark.unit
async def test_gsc_is_disabled_pending_adr() -> None:
    s = GoogleSearchConsoleSubmitter(service_account_json_path=None)
    assert not s.is_available()
    result = await s.submit(SITE_URL)
    assert result.reason == "adapter_disabled_pending_adr"


# --- service orchestrator ---------------------------------------------------


class _StubSubmitter:
    def __init__(self, engine: SeoEngine, *, available: bool = True, succeeds: bool = True) -> None:
        self.engine = engine
        self._available = available
        self._succeeds = succeeds

    def is_available(self) -> bool:
        return self._available

    async def submit(self, site_url: str) -> SubmissionResult:
        return SubmissionResult(engine=self.engine, submitted=self._succeeds)


class _SlowSubmitter:
    engine = SeoEngine.indexnow

    def is_available(self) -> bool:
        return True

    async def submit(self, site_url: str) -> SubmissionResult:
        await asyncio.sleep(60)
        raise AssertionError("should never reach")


@pytest.mark.unit
async def test_service_parallelises_submitters() -> None:
    svc = SeoSubmissionService(
        submitters={
            SeoEngine.yandex_webmaster: _StubSubmitter(SeoEngine.yandex_webmaster),
            SeoEngine.indexnow: _StubSubmitter(SeoEngine.indexnow),
            SeoEngine.google_search_console: _StubSubmitter(SeoEngine.google_search_console),
        }
    )
    report = await svc.submit(SITE_URL)
    assert report.all_succeeded
    assert {r.engine for r in report.results} == {
        SeoEngine.yandex_webmaster,
        SeoEngine.indexnow,
        SeoEngine.google_search_console,
    }


@pytest.mark.unit
async def test_service_skips_unavailable_submitters() -> None:
    svc = SeoSubmissionService(
        submitters={
            SeoEngine.yandex_webmaster: _StubSubmitter(SeoEngine.yandex_webmaster, available=False),
            SeoEngine.indexnow: _StubSubmitter(SeoEngine.indexnow),
        }
    )
    report = await svc.submit(SITE_URL)
    engines = [r.engine for r in report.results]
    assert engines == [SeoEngine.indexnow]


@pytest.mark.unit
async def test_service_records_per_engine_failure() -> None:
    svc = SeoSubmissionService(
        submitters={
            SeoEngine.yandex_webmaster: _StubSubmitter(SeoEngine.yandex_webmaster, succeeds=False),
            SeoEngine.indexnow: _StubSubmitter(SeoEngine.indexnow, succeeds=True),
        }
    )
    report = await svc.submit(SITE_URL)
    assert not report.all_succeeded
    assert SeoEngine.indexnow in report.succeeded_engines
    assert SeoEngine.yandex_webmaster not in report.succeeded_engines


@pytest.mark.unit
async def test_service_times_out_individual_submitter(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    from app.core.seo import service as service_module

    monkeypatch.setattr(service_module, "SUBMIT_BUDGET_SECONDS", 0.05)

    svc = SeoSubmissionService(submitters={SeoEngine.indexnow: _SlowSubmitter()})
    report = await svc.submit(SITE_URL)
    assert len(report.results) == 1
    assert not report.results[0].submitted
    assert report.results[0].reason == "timeout"


# --- helpers ----------------------------------------------------------------


def _patch_httpx_client(monkeypatch: pytest.MonkeyPatch, transport: httpx.MockTransport) -> None:
    original = httpx.AsyncClient

    class _PatchedClient(original):
        def __init__(self, *args, **kwargs):
            kwargs["transport"] = transport
            super().__init__(*args, **kwargs)

    monkeypatch.setattr(httpx, "AsyncClient", _PatchedClient)
