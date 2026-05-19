"""Per-endpoint rate limiter (Redis-backed, INCR + EXPIRE pattern).

Designed as a FastAPI dependency rather than a global middleware so each
endpoint sets its own limit (FR-004 applications: 3/h per IP; FR-052
leads: 3/h and 10/day; etc.). On a cache miss / Redis outage we fail
SECURE — deny the request — per SECURITY.md A10 fail-secure defaults.

Identification of the client uses the leftmost `X-Forwarded-For` value when
present (Caddy adds it), falling back to ``request.client.host``. The
rate-limit key incorporates the endpoint identifier so different endpoints
maintain independent counters.

Usage:

    limiter = RateLimiter(limit=3, window_seconds=3600, scope="applications")

    @router.post("/api/submit-application")
    async def submit(_: Annotated[None, Depends(limiter)]) -> ...:
        ...

Returns HTTPException(429, detail="rate_limited") with a Retry-After header
when the limit is hit.
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import TYPE_CHECKING

from fastapi import HTTPException, Request

if TYPE_CHECKING:
    from redis.asyncio import Redis


@dataclass(frozen=True, slots=True)
class RateLimitDecision:
    allowed: bool
    retry_after_seconds: int
    current_count: int
    limit: int


class RateLimiter:
    """Configurable, dependency-injectable token-bucket-like limiter.

    The check pattern is ``INCR <key>``; if the resulting value is 1 (key
    was just created), set ``EXPIRE <key> <window_seconds>``. If the value
    exceeds ``limit``, deny and report ``TTL <key>`` as Retry-After.
    """

    def __init__(self, *, limit: int, window_seconds: int, scope: str) -> None:
        if limit <= 0:
            raise ValueError("limit must be positive")
        if window_seconds <= 0:
            raise ValueError("window_seconds must be positive")
        self.limit = limit
        self.window_seconds = window_seconds
        self.scope = scope

    async def __call__(self, request: Request) -> None:
        # `request.app.state.redis` is set by app.main on startup. In tests
        # without Redis we expect to see the limiter swapped out via
        # FastAPI's `dependency_overrides`.
        redis: Redis[bytes] | None = getattr(request.app.state, "redis", None)
        client_id = self._identify_client(request)

        if redis is None:
            # Fail-secure: SECURITY.md A10. If Redis is unavailable and the
            # endpoint required a limiter, we refuse rather than allow.
            raise HTTPException(
                status_code=503,
                detail="rate_limiter_unavailable",
            )

        decision = await self._check(redis, client_id)
        if not decision.allowed:
            raise HTTPException(
                status_code=429,
                detail="rate_limited",
                headers={"Retry-After": str(decision.retry_after_seconds)},
            )

    async def _check(self, redis: Redis[bytes], client_id: str) -> RateLimitDecision:
        key = f"ratelimit:{self.scope}:{client_id}"
        pipeline = redis.pipeline()
        pipeline.incr(key, amount=1)
        pipeline.ttl(key)
        result = await pipeline.execute()
        count = int(result[0])
        ttl = int(result[1])

        if ttl < 0:
            # New key (or expired): set the window.
            await redis.expire(key, self.window_seconds)
            ttl = self.window_seconds

        allowed = count <= self.limit
        return RateLimitDecision(
            allowed=allowed,
            retry_after_seconds=ttl,
            current_count=count,
            limit=self.limit,
        )

    @staticmethod
    def _identify_client(request: Request) -> str:
        forwarded = request.headers.get("X-Forwarded-For")
        if forwarded:
            return forwarded.split(",", 1)[0].strip()
        if request.client is not None:
            return request.client.host
        return "unknown"
