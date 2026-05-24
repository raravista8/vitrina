"""Customer (master) auth primitives — canon 0.4.0.

Mirror of ``admin.py`` for the customer-side login flow. Pre-launch
fake-door:

- Founder provisions ``users.login`` (= subdomain) and
  ``users.password_hash`` (bcrypt cost=12) when publishing a site
- Master logs in at ``/login`` with those credentials
- Backend verifies via ``verify_password`` (same primitive as admin)
- Session created in ``CustomerSessionStore`` (Redis-backed), cookie
  ``samosite_session`` signed with ``SESSION_SECRET_KEY``

Distinct cookie + Redis prefix from admin so master / founder sessions
never collide. Same security floor (httpOnly + Secure + SameSite=Strict
applied at the FastAPI router level when setting the cookie).

Pure-domain: no SQLAlchemy, no FastAPI imports.
"""

from __future__ import annotations

import secrets
import uuid
from dataclasses import dataclass
from datetime import UTC, datetime

from itsdangerous import BadSignature, URLSafeSerializer
from redis.asyncio import Redis

# 30 days — masters log in rarely, no need for short TTL. SECURITY.md §A07
# `remember-me` window.
CUSTOMER_SESSION_TTL_SECONDS = 60 * 60 * 24 * 30

_SESSION_KEY_PREFIX = "customer_session:"
_COOKIE_SALT = "vitrina.customer.session"  # rotate independently of admin


@dataclass(frozen=True, slots=True)
class CustomerSession:
    session_id: str
    user_id: uuid.UUID
    created_at: datetime
    last_seen_at: datetime


class CustomerSessionStore:
    """Redis-backed customer-session store. Same protocol as
    ``AdminSessionStore`` but keyed on ``user_id`` and using a separate
    cookie/prefix."""

    def __init__(self, redis: Redis[bytes], *, secret_key: str) -> None:
        self._redis = redis
        self._serializer = URLSafeSerializer(secret_key, salt=_COOKIE_SALT)

    def sign_cookie(self, session_id: str) -> str:
        return self._serializer.dumps(session_id)

    def unsign_cookie(self, value: str) -> str | None:
        try:
            return str(self._serializer.loads(value))
        except BadSignature:
            return None

    async def create(self, user_id: uuid.UUID) -> CustomerSession:
        session_id = secrets.token_urlsafe(32)
        now = datetime.now(UTC)
        record = CustomerSession(
            session_id=session_id,
            user_id=user_id,
            created_at=now,
            last_seen_at=now,
        )
        await self._redis.set(
            _redis_key(session_id),
            _dump(record),
            ex=CUSTOMER_SESSION_TTL_SECONDS,
        )
        return record

    async def load(self, session_id: str) -> CustomerSession | None:
        raw = await self._redis.get(_redis_key(session_id))
        if raw is None:
            return None
        return _load(raw if isinstance(raw, bytes) else raw.encode())

    async def delete(self, session_id: str) -> None:
        await self._redis.delete(_redis_key(session_id))


def _redis_key(session_id: str) -> str:
    return f"{_SESSION_KEY_PREFIX}{session_id}"


def _dump(record: CustomerSession) -> bytes:
    import json

    return json.dumps(
        {
            "session_id": record.session_id,
            "user_id": str(record.user_id),
            "created_at": record.created_at.isoformat(),
            "last_seen_at": record.last_seen_at.isoformat(),
        }
    ).encode("utf-8")


def _load(raw: bytes) -> CustomerSession:
    import json

    data = json.loads(raw.decode("utf-8"))
    return CustomerSession(
        session_id=data["session_id"],
        user_id=uuid.UUID(data["user_id"]),
        created_at=datetime.fromisoformat(data["created_at"]),
        last_seen_at=datetime.fromisoformat(data["last_seen_at"]),
    )
