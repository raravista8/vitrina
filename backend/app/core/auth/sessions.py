"""Redis-backed admin session store (T2.1).

Cookie carries the session id (an unguessable token). Session payload
lives in Redis with TTL = ``ADMIN_SESSION_TTL_SECONDS``. The cookie
value is signed via ``itsdangerous`` using ``SESSION_SECRET_KEY`` so
swapping it for a guessed id requires the secret.

SECURITY.md A07: server-side store (easy to invalidate), httpOnly +
Secure + SameSite=Strict cookie, 4 h TTL for admin (extend logic lives
in the dependency that calls ``touch``).
"""

from __future__ import annotations

import json
import secrets
import uuid
from dataclasses import dataclass
from datetime import UTC, datetime

from itsdangerous import BadSignature, URLSafeSerializer
from redis.asyncio import Redis

ADMIN_SESSION_TTL_SECONDS = 60 * 60 * 4  # 4h per SECURITY.md A07

_SESSION_KEY_PREFIX = "admin_session:"
_COOKIE_SALT = "vitrina.admin.session"  # rotate independently of master secret


@dataclass(frozen=True, slots=True)
class AdminSession:
    session_id: str
    admin_id: uuid.UUID
    created_at: datetime
    last_seen_at: datetime


class AdminSessionStore:
    def __init__(self, redis: Redis[bytes], *, secret_key: str) -> None:
        self._redis = redis
        self._serializer = URLSafeSerializer(secret_key, salt=_COOKIE_SALT)

    # ---- cookie value <-> session_id ------------------------------------

    def sign_cookie(self, session_id: str) -> str:
        return self._serializer.dumps(session_id)

    def unsign_cookie(self, value: str) -> str | None:
        try:
            return str(self._serializer.loads(value))
        except BadSignature:
            return None

    # ---- create / read / delete -----------------------------------------

    async def create(self, admin_id: uuid.UUID) -> AdminSession:
        session_id = secrets.token_urlsafe(32)
        now = datetime.now(UTC)
        record = AdminSession(
            session_id=session_id, admin_id=admin_id, created_at=now, last_seen_at=now
        )
        await self._redis.set(
            _redis_key(session_id),
            _dump(record),
            ex=ADMIN_SESSION_TTL_SECONDS,
        )
        return record

    async def load(self, session_id: str) -> AdminSession | None:
        raw = await self._redis.get(_redis_key(session_id))
        if raw is None:
            return None
        return _load(raw if isinstance(raw, bytes) else raw.encode())

    async def touch(self, session: AdminSession) -> AdminSession:
        """Refresh ``last_seen_at`` and reset TTL."""
        now = datetime.now(UTC)
        refreshed = AdminSession(
            session_id=session.session_id,
            admin_id=session.admin_id,
            created_at=session.created_at,
            last_seen_at=now,
        )
        await self._redis.set(
            _redis_key(session.session_id),
            _dump(refreshed),
            ex=ADMIN_SESSION_TTL_SECONDS,
        )
        return refreshed

    async def delete(self, session_id: str) -> None:
        await self._redis.delete(_redis_key(session_id))


def _redis_key(session_id: str) -> str:
    return f"{_SESSION_KEY_PREFIX}{session_id}"


def _dump(record: AdminSession) -> str:
    return json.dumps(
        {
            "session_id": record.session_id,
            "admin_id": str(record.admin_id),
            "created_at": record.created_at.isoformat(),
            "last_seen_at": record.last_seen_at.isoformat(),
        }
    )


def _load(raw: bytes) -> AdminSession:
    payload = json.loads(raw.decode())
    return AdminSession(
        session_id=payload["session_id"],
        admin_id=uuid.UUID(payload["admin_id"]),
        created_at=datetime.fromisoformat(payload["created_at"]),
        last_seen_at=datetime.fromisoformat(payload["last_seen_at"]),
    )
