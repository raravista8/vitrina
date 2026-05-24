"""``POST /api/auth/login`` — customer/master login endpoint (canon 0.4.0).

Mirror of admin login, simpler — no TOTP, no challenge step. Master sends
``{login, password}`` JSON, backend verifies via ``verify_password`` (same
bcrypt primitive as admin), creates a ``CustomerSession`` in Redis, sets
the ``samosite_session`` cookie.

Wire contract per
``docs/handoff/CANON_CODE_TZ_customer_login_v0.4.0.md §2.2``:

- 200 OK + Set-Cookie → success
- 401 Unauthorized → ``invalid_credentials``
- 429 Too Many Requests + ``Retry-After: <seconds>`` → ``rate_limited``
- 5xx → frontend maps to ``unknown_error``
- Network/timeout → frontend maps to ``network_error``

Rate limit (per §2.2):
- 5 неудачных попыток на ``login`` за 15 мин → 429 на 5 мин
- Track per-login (NOT per-IP — мастер логинится с разных сетей)
- Success → counter reset
"""

from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Request, Response
from pydantic import BaseModel, ConfigDict, Field
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies import (
    get_client_ip,
    get_customer_session_store,
    get_session,
)
from app.core.auth.admin import verify_password
from app.core.auth.customer import CUSTOMER_SESSION_TTL_SECONDS, CustomerSessionStore
from app.infrastructure.postgres.models import User
from app.utils.logging import get_logger

router = APIRouter(prefix="/api/auth", tags=["auth"])

CUSTOMER_SESSION_COOKIE = "samosite_session"

# Rate limit: 5 неудачных подряд → 5 мин блокировки per-login.
_FAIL_LIMIT = 5
_FAIL_WINDOW_SECONDS = 15 * 60
_LOCKOUT_SECONDS = 5 * 60
_FAIL_KEY_PREFIX = "customer_login_fails:"
_LOCKOUT_KEY_PREFIX = "customer_login_lockout:"

# Sentinel bcrypt hash used when the requested login doesn't exist —
# verify_password() still runs (constant-time response, mitigates
# user-enumeration via timing). The cleartext for this hash is unknown
# so no real password will ever match.
_DUMMY_PASSWORD_HASH = "$2b$12$KIXuiUyQVgkkMqXSVvxQ/uDr4F8AlqMOpjVfYpC2YyN3LzG6dvz.6"  # noqa: S105


class LoginRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    login: Annotated[
        str,
        Field(
            min_length=1,
            max_length=64,
            description="Master login (= subdomain provisioned by founder).",
        ),
    ]
    password: Annotated[
        str,
        Field(
            min_length=1,
            max_length=256,
            description="Plaintext password from the message we sent the master.",
        ),
    ]


@router.post("/login", status_code=200)
async def post_customer_login(
    body: LoginRequest,
    request: Request,
    response: Response,
    session: Annotated[AsyncSession, Depends(get_session)],
    store: Annotated[CustomerSessionStore, Depends(get_customer_session_store)],
) -> dict[str, bool]:
    log = get_logger("api.auth.customer")
    ip = get_client_ip(request)
    redis = request.app.state.redis

    # 1. Lockout check (per-login key).
    lockout_key = f"{_LOCKOUT_KEY_PREFIX}{body.login}"
    ttl = await redis.ttl(lockout_key)
    if ttl > 0:
        log.info("customer_login_rate_limited", login=body.login, ip=ip, retry_after=ttl)
        # NB: `response.headers[...]` doesn't survive `raise HTTPException(...)`
        # — FastAPI builds a fresh JSONResponse from the exception. Headers
        # must be passed via the constructor for them to reach the client.
        raise HTTPException(
            status_code=429,
            detail="rate_limited",
            headers={"Retry-After": str(ttl)},
        )

    # 2. Look up user by login.
    row = (await session.execute(select(User).where(User.login == body.login))).scalar_one_or_none()

    # 3. Verify password. Always run bcrypt even on missing user — constant-
    #    time response (see _DUMMY_PASSWORD_HASH note above).
    expected_hash = row.password_hash if row and row.password_hash else _DUMMY_PASSWORD_HASH
    ok = verify_password(body.password, expected_hash) and row is not None and row.password_hash

    if not ok:
        # 4a. Increment per-login fail counter, set window TTL on first miss.
        fail_key = f"{_FAIL_KEY_PREFIX}{body.login}"
        # Use a transaction-ish increment so we set TTL only on first hit.
        new_count = await redis.incr(fail_key)
        if new_count == 1:
            await redis.expire(fail_key, _FAIL_WINDOW_SECONDS)
        log.info(
            "customer_login_failed",
            login=body.login,
            ip=ip,
            fail_count=new_count,
        )
        # If we crossed the threshold, install lockout.
        if new_count >= _FAIL_LIMIT:
            await redis.set(lockout_key, "1", ex=_LOCKOUT_SECONDS)
            log.info("customer_login_locked_out", login=body.login, ip=ip)
            # Reset fails so when lockout expires user starts fresh.
            await redis.delete(fail_key)
        raise HTTPException(status_code=401, detail="invalid_credentials")

    # 4b. Success — reset fail counter, create session, set cookie.
    assert row is not None  # mypy/narrowing
    await redis.delete(f"{_FAIL_KEY_PREFIX}{body.login}")
    record = await store.create(row.id)

    response.set_cookie(
        key=CUSTOMER_SESSION_COOKIE,
        value=store.sign_cookie(record.session_id),
        max_age=CUSTOMER_SESSION_TTL_SECONDS,
        httponly=True,
        secure=request.url.scheme == "https",
        samesite="strict",
        path="/",
    )
    log.info("customer_login_success", login=body.login, ip=ip, user_id=str(row.id))
    return {"ok": True}


@router.post("/logout", status_code=200)
async def post_customer_logout(
    request: Request,
    response: Response,
    store: Annotated[CustomerSessionStore, Depends(get_customer_session_store)],
) -> dict[str, bool]:
    """Clear the customer-session cookie + delete the Redis record."""
    raw = request.cookies.get(CUSTOMER_SESSION_COOKIE)
    if raw:
        session_id = store.unsign_cookie(raw)
        if session_id:
            await store.delete(session_id)
    response.delete_cookie(key=CUSTOMER_SESSION_COOKIE, path="/")
    return {"ok": True}
