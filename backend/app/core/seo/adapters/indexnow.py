"""IndexNow submitter (T2.6).

Spec: https://www.indexnow.org/documentation
One endpoint covers Yandex + Bing simultaneously. Authentication is by
a per-host secret file (``<host>/<key>.txt``) that we generate at
publish time alongside the static HTML (the Site row carries the key).

Without a key the adapter is disabled.
"""

from __future__ import annotations

from urllib.parse import urlparse

import httpx

from app.core.seo.ports import SeoEngine, SubmissionResult

INDEXNOW_URL = "https://api.indexnow.org/indexnow"


class IndexNowSubmitter:
    engine = SeoEngine.indexnow

    def __init__(
        self,
        *,
        site_key: str | None,
        host_override: str | None = None,
        timeout_seconds: float = 5.0,
    ) -> None:
        """``site_key`` is the per-host secret. ``host_override`` is the
        host name that should match the file we expose at ``/<key>.txt``;
        when None we derive it from the site URL at submit time."""
        self._site_key = site_key
        self._host = host_override
        self._timeout = timeout_seconds

    def is_available(self) -> bool:
        return bool(self._site_key)

    async def submit(self, site_url: str) -> SubmissionResult:
        if not self._site_key:
            return SubmissionResult(engine=self.engine, submitted=False, reason="adapter_disabled")

        host = self._host or urlparse(site_url).hostname or ""
        if not host:
            return SubmissionResult(engine=self.engine, submitted=False, reason="no_host_in_url")

        payload = {
            "host": host,
            "key": self._site_key,
            "urlList": [site_url],
        }
        async with httpx.AsyncClient(timeout=self._timeout) as client:
            response = await client.post(INDEXNOW_URL, json=payload)
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
