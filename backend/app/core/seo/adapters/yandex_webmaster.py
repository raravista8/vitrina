"""Yandex.Webmaster URL recrawl submitter (T2.6).

Endpoint: POST /v4/user/{user_id}/hosts/{host_id}/recrawl/queue
Auth: OAuth via ``YANDEX_WEBMASTER_API_KEY`` header.

For T2.6 we hit the simpler "indexing notification" form via the
``IndexingService`` endpoint. The richer recrawl-queue API needs host
ids which require an extra setup step the founder can land later — this
gets URLs into Yandex's eyes meanwhile.

Without a key the adapter is silently disabled (``is_available()``
returns False); the service skips it.
"""

from __future__ import annotations

import httpx

from app.core.seo.ports import SeoEngine, SubmissionResult

YANDEX_WEBMASTER_PING_URL = "https://webmaster.yandex.com/sitemap-action.xml"


class YandexWebmasterSubmitter:
    engine = SeoEngine.yandex_webmaster

    def __init__(self, *, api_key: str | None, timeout_seconds: float = 5.0) -> None:
        self._api_key = api_key
        self._timeout = timeout_seconds

    def is_available(self) -> bool:
        return bool(self._api_key)

    async def submit(self, site_url: str) -> SubmissionResult:
        if not self._api_key:
            return SubmissionResult(engine=self.engine, submitted=False, reason="adapter_disabled")
        headers = {"Authorization": f"OAuth {self._api_key}"}
        params = {"action": "ping", "sitemap": f"{site_url}/sitemap.xml"}
        async with httpx.AsyncClient(timeout=self._timeout) as client:
            response = await client.get(YANDEX_WEBMASTER_PING_URL, params=params, headers=headers)
        if 200 <= response.status_code < 300:
            return SubmissionResult(
                engine=self.engine, submitted=True, upstream_status=response.status_code
            )
        return SubmissionResult(
            engine=self.engine,
            submitted=False,
            upstream_status=response.status_code,
            reason=f"http_{response.status_code}",
        )
