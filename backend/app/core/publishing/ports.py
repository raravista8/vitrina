"""Publishing ports (T2.3).

The site publisher renders Jinja2 templates and hands the result to a
``StaticUploader`` for the bytes-to-CDN step. Keeping uploader behind a
Protocol lets us drop the S3 client in tests (we use an in-memory fake)
and swap CDN backends without touching domain code.
"""

from __future__ import annotations

from typing import Protocol


class StaticUploader(Protocol):
    """Upload static assets to CDN-fronted object storage.

    Implementations live in ``app.infrastructure.s3.*``. The MVP only
    needs to upload UTF-8 text — image assets travel through a separate
    path (parser-worker → S3 directly) per ARCHITECTURE.md §10.
    """

    async def upload_text(
        self,
        *,
        key: str,
        content: str,
        content_type: str,
    ) -> str:
        """Upload ``content`` at ``key`` and return its public URL.

        Implementations MUST be idempotent for the same key (overwrite,
        not append) so re-publishing a site replaces the previous build.
        """
        ...

    async def invalidate(self, *, keys: list[str]) -> None:
        """Best-effort CDN cache flush. Implementations may no-op in dev."""
        ...
