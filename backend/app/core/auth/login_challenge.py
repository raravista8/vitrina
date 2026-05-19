"""Two-step admin login challenge store (PR-E).

The 2-step flow:

  1. ``POST /admin/api/login`` validates username + password and, on
     success, mints a short-lived ``challenge_id`` keyed in Redis. The
     response is ``{ok:true, data:{challenge_id, expires_in}}`` — no
     cookie set yet.
  2. ``POST /admin/api/login/totp`` (or ``/backup``) consumes the
     challenge_id + TOTP code; on success the existing AdminSessionStore
     issues the signed cookie exactly like the legacy Jinja flow.

Challenge payload carries only ``admin_id`` (UUID). TTL = 5 minutes so a
stalled second step expires harmlessly; once consumed the key is
deleted regardless of TOTP verdict to prevent replay.

The store is intentionally separate from AdminSessionStore so the
challenge layer can be reasoned about in isolation — different TTL,
different rotation semantics, single-use.
"""

from __future__ import annotations

import secrets
import uuid

from redis.asyncio import Redis

CHALLENGE_TTL_SECONDS = 60 * 5  # 5 minutes per SECURITY.md A07 (short window)
_CHALLENGE_KEY_PREFIX = "admin_login_challenge:"


class LoginChallengeStore:
    """Mint + consume single-use login challenges keyed in Redis."""

    def __init__(self, redis: Redis[bytes]) -> None:
        self._redis = redis

    async def mint(self, admin_id: uuid.UUID) -> tuple[str, int]:
        """Create a fresh challenge for ``admin_id``.

        Returns ``(challenge_id, ttl_seconds)``. The id is 32 bytes of
        url-safe randomness — unguessable in the same league as the
        session cookie.
        """
        challenge_id = secrets.token_urlsafe(32)
        await self._redis.set(
            _key(challenge_id),
            str(admin_id),
            ex=CHALLENGE_TTL_SECONDS,
        )
        return challenge_id, CHALLENGE_TTL_SECONDS

    async def consume(self, challenge_id: str) -> uuid.UUID | None:
        """Pop the challenge. Returns the admin_id if valid; ``None``
        if it's missing, expired, or already used. Always deletes —
        single-use guarantee.
        """
        key = _key(challenge_id)
        raw = await self._redis.get(key)
        # Always best-effort delete: prevents replay even if the caller
        # rejects the TOTP code further down (the user must restart from
        # step 1).
        await self._redis.delete(key)
        if raw is None:
            return None
        try:
            return uuid.UUID(raw.decode() if isinstance(raw, bytes) else str(raw))
        except (ValueError, AttributeError):
            return None


def _key(challenge_id: str) -> str:
    return f"{_CHALLENGE_KEY_PREFIX}{challenge_id}"
