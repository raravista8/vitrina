"""httpx-backed text fetcher for the instant-preview draft builder.

Implements the ``HtmlFetcher`` / T3.5 ``HttpGateway`` protocol shape
(``get_text(*, url, timeout) -> str``). Hardening:

  - ``follow_redirects=False`` — a redirect would dodge the SSRF
    validation the caller ran against the ORIGINAL host. A page that
    redirects degrades to a failed draft, which is the honest outcome.
  - streamed read with a hard 2 MB cap (SECURITY.md size limits) —
    a tarpit / giant response aborts instead of OOM-ing the api.
  - per-call timeout supplied by the caller (≤5 s in the builder).
"""

from __future__ import annotations

import httpx

MAX_RESPONSE_BYTES = 2_000_000  # 2 MB
_USER_AGENT = "SamositePreview/1.0 (+https://samosite.online)"


class ResponseTooLargeError(Exception):
    pass


class HttpxTextFetcher:
    def __init__(self, *, max_bytes: int = MAX_RESPONSE_BYTES) -> None:
        self._max_bytes = max_bytes

    async def get_text(self, *, url: str, timeout: float) -> str:  # noqa: ASYNC109
        async with (
            httpx.AsyncClient(
                timeout=timeout,
                follow_redirects=False,
                headers={"User-Agent": _USER_AGENT},
            ) as client,
            client.stream("GET", url) as response,
        ):
            response.raise_for_status()
            chunks: list[bytes] = []
            total = 0
            async for chunk in response.aiter_bytes():
                total += len(chunk)
                if total > self._max_bytes:
                    raise ResponseTooLargeError(f"response_over_{self._max_bytes}_bytes")
                chunks.append(chunk)
            encoding = response.encoding or "utf-8"
        return b"".join(chunks).decode(encoding, errors="replace")
