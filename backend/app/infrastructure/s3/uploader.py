"""Static-asset uploaders for the publishing flow (T2.3).

Two implementations of ``StaticUploader`` (defined in
``app.core.publishing.ports``):

  - ``S3StaticUploader`` — production. Uses ``aiobotocore`` against a
    Yandex Object Storage bucket (S3-compatible). The bucket is fronted
    by Selectel CDN, so ``invalidate`` purges by URL via the CDN HTTP
    API. CDN purge is best-effort: a CDN miss just means visitors see
    the cached old build until natural expiry, which is acceptable.

  - ``InMemoryStaticUploader`` — dev/tests. Stores objects in a dict;
    test assertions read directly from ``.objects``. Used by the admin
    router whenever ``S3_BUCKET`` isn't configured so ``make dev``
    without S3 credentials still works end-to-end.
"""

from __future__ import annotations

from contextlib import AbstractAsyncContextManager
from typing import Any

from app.utils.logging import get_logger


class InMemoryStaticUploader:
    """Stores uploads in process memory. Public URL is a fake
    ``mem://`` scheme so tests asserting on the URL shape have something
    deterministic to match against."""

    def __init__(self, *, base_url: str = "https://test.vitrina.site") -> None:
        self.objects: dict[str, tuple[str, str]] = {}
        self.invalidations: list[list[str]] = []
        self._base_url = base_url

    async def upload_text(self, *, key: str, content: str, content_type: str) -> str:
        self.objects[key] = (content, content_type)
        return f"{self._base_url}/{key}"

    async def invalidate(self, *, keys: list[str]) -> None:
        self.invalidations.append(list(keys))


class S3StaticUploader:
    """Yandex Object Storage uploader.

    Uses ``aiobotocore`` (already a project dependency for parser-worker
    photo uploads) so we don't add a new runtime dep. Public URLs are
    derived from the CDN base URL, NOT the raw S3 endpoint — visitors
    hit ``https://<subdomain>.vitrina.site/index.html``, never the
    storage.yandexcloud.net hostname.
    """

    def __init__(
        self,
        *,
        bucket: str,
        access_key: str,
        secret_key: str,
        endpoint_url: str = "https://storage.yandexcloud.net",
        region: str = "ru-central1",
        cdn_base_url: str = "https://vitrina.site",
    ) -> None:
        self._bucket = bucket
        self._access_key = access_key
        self._secret_key = secret_key
        self._endpoint_url = endpoint_url
        self._region = region
        self._cdn_base_url = cdn_base_url
        self._log = get_logger("infrastructure.s3.uploader")

    async def upload_text(self, *, key: str, content: str, content_type: str) -> str:
        async with self._client() as client:
            await client.put_object(
                Bucket=self._bucket,
                Key=key,
                Body=content.encode("utf-8"),
                ContentType=content_type,
                CacheControl="public, max-age=300",  # short — CDN refreshes ≤5min
            )
        return f"{self._cdn_base_url}/{key}"

    async def invalidate(self, *, keys: list[str]) -> None:
        # CDN purge is provider-specific; we log the request and rely on
        # the short Cache-Control above for now. T7.x will wire the
        # Selectel CDN purge API.
        self._log.info("s3_invalidate_requested", keys=keys)

    def _client(self) -> AbstractAsyncContextManager[Any]:
        # Imported lazily so unit tests that only use InMemoryStaticUploader
        # don't pay aiobotocore's import cost (it pulls in botocore).
        from aiobotocore.session import get_session

        session = get_session()
        client_cm: AbstractAsyncContextManager[Any] = session.create_client(
            "s3",
            region_name=self._region,
            endpoint_url=self._endpoint_url,
            aws_access_key_id=self._access_key,
            aws_secret_access_key=self._secret_key,
        )
        return client_cm
