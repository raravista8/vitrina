"""End-to-end tests for the /admin/api/* JSON router (PR-E + downstream).

The router exposes login → challenge → TOTP, plus paginated reads and
the leads bulk-decrypt. Each test acquires its own DB session that
rolls back at teardown; Redis is replaced with an in-memory fake so
the rate limiter + session store + challenge store behave the same
way they would in prod.

Coverage:
  - login step 1 + step 2 happy path → cookie issued
  - login step 1 invalid creds → 401
  - login step 2 expired/missing challenge → 401
  - login step 2 invalid TOTP → 401
  - /me without cookie → 303 to /admin/login (existing dep)
  - /dashboard returns counters + 14-day series
  - /apps listing with status filter
  - /apps/{id}/approve advances status; non-pending → 409
  - /leads list masks IPs; decrypt-bulk requires TOTP
  - /waitlist aggregates by source_name
  - /feedback list + filter
  - /settings echoes config flags without secret values
"""

from __future__ import annotations

from collections.abc import AsyncIterator

import httpx
import pyotp
import pytest
import pytest_asyncio
from cryptography.fernet import Fernet, MultiFernet
from fastapi import FastAPI

from app.api.dependencies import get_lead_fernet, get_session
from app.core.auth.admin import (
    generate_backup_codes,
    generate_totp_secret,
    hash_backup_codes,
    hash_password,
)
from app.core.auth.login_challenge import LoginChallengeStore
from app.core.auth.sessions import AdminSessionStore
from app.core.leads.encryption import encrypt
from app.infrastructure.postgres.models import (
    AdminCredentials,
    Application,
    Feedback,
    Lead,
    Site,
    User,
)
from app.main import create_app

pytestmark = pytest.mark.integration


# --------------------------------------------------------------------------- #
# Fake Redis covering all surfaces used by the admin API
# --------------------------------------------------------------------------- #


class _FakeRedis:
    """Single Redis stand-in serving the rate limiter, session store,
    AND login challenge store. Real Redis already covers this contract
    elsewhere; for these tests we want determinism + no Docker."""

    def __init__(self) -> None:
        self.kv: dict[str, bytes] = {}
        self.counts: dict[str, int] = {}
        self.ttls: dict[str, int] = {}

    # ---- rate limiter primitives ----
    def pipeline(self) -> _FakePipeline:
        return _FakePipeline(self)

    async def expire(self, key: str, seconds: int) -> bool:
        self.ttls[key] = seconds
        return True

    async def ping(self) -> bool:
        return True

    # ---- AdminSessionStore + LoginChallengeStore use these ----
    async def set(self, key: str, value: str | bytes, ex: int | None = None) -> bool:
        self.kv[key] = value.encode() if isinstance(value, str) else value
        if ex is not None:
            self.ttls[key] = ex
        return True

    async def get(self, key: str) -> bytes | None:
        return self.kv.get(key)

    async def delete(self, key: str) -> int:
        return 1 if self.kv.pop(key, None) is not None else 0


class _FakePipeline:
    def __init__(self, redis: _FakeRedis) -> None:
        self._redis = redis
        self._ops: list[tuple[str, str, int]] = []

    def incr(self, key: str, amount: int = 1) -> _FakePipeline:
        self._ops.append(("incr", key, amount))
        return self

    def ttl(self, key: str) -> _FakePipeline:
        self._ops.append(("ttl", key, 0))
        return self

    async def execute(self) -> list[int]:
        results: list[int] = []
        for op, key, _ in self._ops:
            if op == "incr":
                new_value = self._redis.counts.get(key, 0) + 1
                self._redis.counts[key] = new_value
                results.append(new_value)
            elif op == "ttl":
                results.append(self._redis.ttls.get(key, -1))
        return results


# --------------------------------------------------------------------------- #
# Fixtures
# --------------------------------------------------------------------------- #


@pytest_asyncio.fixture
async def fernet() -> MultiFernet:
    return MultiFernet([Fernet(Fernet.generate_key())])


@pytest_asyncio.fixture
async def admin_creds(db_session) -> tuple[AdminCredentials, str, str]:  # type: ignore[no-untyped-def]
    """Seed one AdminCredentials row + return ``(creds, password, totp_secret)``
    so tests can submit known-good values."""
    password = "correct-horse-battery-staple"  # nosec  # pragma: allowlist secret
    totp_secret = generate_totp_secret()
    backup_codes_plain = generate_backup_codes(count=3)
    backup_codes_hashes = hash_backup_codes(backup_codes_plain)
    creds = AdminCredentials(
        username="founder",
        password_hash=hash_password(password),
        totp_secret=totp_secret,
        backup_codes_hashes=backup_codes_hashes,
    )
    db_session.add(creds)
    await db_session.commit()
    # Stash plain backup codes on the row for tests that want them.
    creds.__test_backup_codes_plain__ = backup_codes_plain  # type: ignore[attr-defined]
    return creds, password, totp_secret


@pytest_asyncio.fixture
async def app(db_session, fernet: MultiFernet) -> AsyncIterator[FastAPI]:  # type: ignore[no-untyped-def]
    fastapi_app = create_app()

    async def _override_session():
        yield db_session

    fastapi_app.dependency_overrides[get_session] = _override_session
    fastapi_app.dependency_overrides[get_lead_fernet] = lambda: fernet

    fake_redis = _FakeRedis()
    fastapi_app.state.redis = fake_redis
    fastapi_app.state.admin_session_store = AdminSessionStore(
        fake_redis,  # type: ignore[arg-type]
        secret_key="test-secret",  # pragma: allowlist secret
    )
    fastapi_app.state.login_challenge_store = LoginChallengeStore(fake_redis)  # type: ignore[arg-type]
    fastapi_app.state.lead_fernet = fernet
    try:
        yield fastapi_app
    finally:
        fastapi_app.dependency_overrides.clear()


@pytest_asyncio.fixture
async def client(app: FastAPI) -> AsyncIterator[httpx.AsyncClient]:
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac


async def _login_and_get_cookie(
    client: httpx.AsyncClient,
    password: str,
    totp_secret: str,
) -> str:
    """Walk the 2-step login flow and return the admin_session cookie value."""
    r1 = await client.post("/admin/api/login", json={"username": "founder", "password": password})
    assert r1.status_code == 200, r1.text
    challenge_id = r1.json()["data"]["challenge_id"]
    code = pyotp.TOTP(totp_secret).now()
    r2 = await client.post(
        "/admin/api/login/totp",
        json={"challenge_id": challenge_id, "code": code},
    )
    assert r2.status_code == 200, r2.text
    cookie = r2.cookies.get("admin_session")
    assert cookie is not None
    return cookie


# --------------------------------------------------------------------------- #
# Login flow
# --------------------------------------------------------------------------- #


async def test_login_two_step_happy_path(
    client: httpx.AsyncClient,
    admin_creds,  # type: ignore[no-untyped-def]
) -> None:
    _, password, totp_secret = admin_creds
    r1 = await client.post("/admin/api/login", json={"username": "founder", "password": password})
    assert r1.status_code == 200
    body1 = r1.json()
    assert body1["ok"] is True
    assert "challenge_id" in body1["data"]
    assert body1["data"]["expires_in"] > 0

    code = pyotp.TOTP(totp_secret).now()
    r2 = await client.post(
        "/admin/api/login/totp",
        json={"challenge_id": body1["data"]["challenge_id"], "code": code},
    )
    assert r2.status_code == 200, r2.text
    assert r2.json()["ok"] is True
    assert r2.cookies.get("admin_session") is not None


# detect-secrets flags `password:"..."` literals; use a named constant so
# the test stays readable and the secret-scanner allowlist sits on one line.
_WRONG_PW = "definitely-not-right"  # pragma: allowlist secret


async def test_login_invalid_password_returns_401(client: httpx.AsyncClient, admin_creds) -> None:  # type: ignore[no-untyped-def]
    payload = {"username": "founder", "password": _WRONG_PW}
    r = await client.post("/admin/api/login", json=payload)
    assert r.status_code == 401
    assert r.json()["error"] == "invalid_credentials"


async def test_login_unknown_user_returns_401(client: httpx.AsyncClient, admin_creds) -> None:  # type: ignore[no-untyped-def]
    # Identical envelope to wrong-password — anti-enumeration.
    payload = {"username": "ghost", "password": _WRONG_PW}
    r = await client.post("/admin/api/login", json=payload)
    assert r.status_code == 401
    assert r.json()["error"] == "invalid_credentials"


async def test_login_step2_invalid_challenge_returns_401(
    client: httpx.AsyncClient,
    admin_creds,  # type: ignore[no-untyped-def]
) -> None:
    r = await client.post(
        "/admin/api/login/totp",
        json={"challenge_id": "x" * 40, "code": "123456"},
    )
    assert r.status_code == 401
    assert r.json()["error"] == "invalid_challenge"


async def test_login_step2_invalid_totp_returns_401(
    client: httpx.AsyncClient,
    admin_creds,  # type: ignore[no-untyped-def]
) -> None:
    _, password, _ = admin_creds
    r1 = await client.post("/admin/api/login", json={"username": "founder", "password": password})
    cid = r1.json()["data"]["challenge_id"]
    r2 = await client.post(
        "/admin/api/login/totp",
        json={"challenge_id": cid, "code": "000000"},
    )
    assert r2.status_code == 401
    assert r2.json()["error"] == "invalid_code"


async def test_login_step2_consumes_challenge_single_use(
    client: httpx.AsyncClient,
    admin_creds,  # type: ignore[no-untyped-def]
) -> None:
    """Second consume with the same challenge_id must fail — even with
    a perfectly valid TOTP — because step 2 always burns the key."""
    _, password, totp_secret = admin_creds
    r1 = await client.post("/admin/api/login", json={"username": "founder", "password": password})
    cid = r1.json()["data"]["challenge_id"]
    code = pyotp.TOTP(totp_secret).now()
    ok = await client.post("/admin/api/login/totp", json={"challenge_id": cid, "code": code})
    assert ok.status_code == 200
    again = await client.post("/admin/api/login/totp", json={"challenge_id": cid, "code": code})
    assert again.status_code == 401
    assert again.json()["error"] == "invalid_challenge"


async def test_login_backup_code_path(client: httpx.AsyncClient, admin_creds) -> None:  # type: ignore[no-untyped-def]
    creds, password, _ = admin_creds
    r1 = await client.post("/admin/api/login", json={"username": "founder", "password": password})
    cid = r1.json()["data"]["challenge_id"]
    plain = creds.__test_backup_codes_plain__[0]  # type: ignore[attr-defined]
    r2 = await client.post("/admin/api/login/backup", json={"challenge_id": cid, "code": plain})
    assert r2.status_code == 200, r2.text
    assert r2.json()["data"]["backup_codes_remaining"] == 2


async def test_me_requires_session(client: httpx.AsyncClient) -> None:
    r = await client.get("/admin/api/me")
    assert r.status_code == 303


async def test_me_returns_admin_after_login(
    client: httpx.AsyncClient,
    admin_creds,  # type: ignore[no-untyped-def]
) -> None:
    _, password, totp_secret = admin_creds
    cookie = await _login_and_get_cookie(client, password, totp_secret)
    r = await client.get("/admin/api/me", cookies={"admin_session": cookie})
    assert r.status_code == 200
    assert "admin_id" in r.json()["data"]


# --------------------------------------------------------------------------- #
# Dashboard + Apps
# --------------------------------------------------------------------------- #


async def test_dashboard_aggregates_counters(
    client: httpx.AsyncClient,
    admin_creds,
    db_session,  # type: ignore[no-untyped-def]
) -> None:
    _, password, totp_secret = admin_creds
    # Seed one row of each kind for the counters to move.
    user = User(contact_type="email", contact_value="a@b.c")
    db_session.add(user)
    await db_session.flush()
    db_session.add(
        Application(
            source_type="telegram",
            source_url=None,
            contact_type="email",
            contact_value="a@b.c",
            user_id=user.id,
            status="pending",
        )
    )
    db_session.add(Site(user_id=user.id, subdomain="x", source_type="telegram", status="published"))
    await db_session.commit()

    cookie = await _login_and_get_cookie(client, password, totp_secret)
    r = await client.get("/admin/api/dashboard", cookies={"admin_session": cookie})
    assert r.status_code == 200, r.text
    data = r.json()["data"]
    assert data["counters"]["apps_total"] >= 1
    assert data["counters"]["apps_pending"] >= 1
    assert data["counters"]["sites_published"] >= 1
    assert isinstance(data["applications_series_14d"], list)


async def test_apps_list_and_approve(
    client: httpx.AsyncClient,
    admin_creds,
    db_session,  # type: ignore[no-untyped-def]
) -> None:
    _, password, totp_secret = admin_creds
    user = User(contact_type="email", contact_value="approve@b.c")
    db_session.add(user)
    await db_session.flush()
    app_row = Application(
        source_type="telegram",
        source_url=None,
        contact_type="email",
        contact_value="approve@b.c",
        user_id=user.id,
        status="pending",
    )
    db_session.add(app_row)
    await db_session.commit()

    cookie = await _login_and_get_cookie(client, password, totp_secret)
    listing = await client.get("/admin/api/apps?status=pending", cookies={"admin_session": cookie})
    assert listing.status_code == 200
    ids = [item["id"] for item in listing.json()["data"]["items"]]
    assert str(app_row.id) in ids

    approve = await client.post(
        f"/admin/api/apps/{app_row.id}/approve", cookies={"admin_session": cookie}
    )
    assert approve.status_code == 200, approve.text
    assert approve.json()["data"]["status"] == "approved"

    # Approving an already-approved row is idempotent; rejecting one isn't.
    reject = await client.post(
        f"/admin/api/apps/{app_row.id}/reject", cookies={"admin_session": cookie}
    )
    assert reject.status_code == 409
    assert reject.json()["error"].startswith("cannot_transition_from_")


# --------------------------------------------------------------------------- #
# Sites + Leads
# --------------------------------------------------------------------------- #


async def test_sites_list_and_detail(
    client: httpx.AsyncClient,
    admin_creds,
    db_session,  # type: ignore[no-untyped-def]
) -> None:
    _, password, totp_secret = admin_creds
    user = User(contact_type="email", contact_value="site@b.c")
    db_session.add(user)
    await db_session.flush()
    site = Site(user_id=user.id, subdomain="zeta", source_type="ymaps", status="published")
    db_session.add(site)
    await db_session.commit()

    cookie = await _login_and_get_cookie(client, password, totp_secret)
    listing = await client.get("/admin/api/sites", cookies={"admin_session": cookie})
    assert listing.status_code == 200
    assert str(site.id) in {item["id"] for item in listing.json()["data"]["items"]}
    detail = await client.get(f"/admin/api/sites/{site.id}", cookies={"admin_session": cookie})
    assert detail.status_code == 200
    assert detail.json()["data"]["site"]["subdomain"] == "zeta"


async def test_leads_list_masks_and_decrypt_requires_totp(
    client: httpx.AsyncClient,
    admin_creds,
    db_session,
    fernet: MultiFernet,  # type: ignore[no-untyped-def]
) -> None:
    _, password, totp_secret = admin_creds
    user = User(contact_type="email", contact_value="lead@b.c")
    db_session.add(user)
    await db_session.flush()
    site = Site(user_id=user.id, subdomain="lambda", source_type="ymaps", status="published")
    db_session.add(site)
    await db_session.flush()
    lead = Lead(
        site_id=site.id,
        name_enc=encrypt("Маша Петрова", fernet=fernet),
        phone_enc=encrypt("+7 921 999-99-99", fernet=fernet),
        message_enc=encrypt("Запишите", fernet=fernet),
        ip="85.140.1.2",
    )
    db_session.add(lead)
    await db_session.commit()

    cookie = await _login_and_get_cookie(client, password, totp_secret)
    listing = await client.get("/admin/api/leads", cookies={"admin_session": cookie})
    assert listing.status_code == 200
    row = next(item for item in listing.json()["data"]["items"] if item["id"] == str(lead.id))
    assert row["ip_prefix"] == "85.140.0.0/16"
    assert "name" not in row  # masked list shall never carry plaintext

    # decrypt with bad TOTP → 401
    bad = await client.post(
        "/admin/api/leads/decrypt-bulk",
        json={"lead_ids": [str(lead.id)], "totp_code": "000000"},
        cookies={"admin_session": cookie},
    )
    assert bad.status_code == 401

    # decrypt with good TOTP → plaintext
    code = pyotp.TOTP(totp_secret).now()
    ok = await client.post(
        "/admin/api/leads/decrypt-bulk",
        json={"lead_ids": [str(lead.id)], "totp_code": code},
        cookies={"admin_session": cookie},
    )
    assert ok.status_code == 200, ok.text
    decrypted = ok.json()["data"]["leads"]
    assert decrypted[0]["name"] == "Маша Петрова"
    assert decrypted[0]["phone"] == "+7 921 999-99-99"


# --------------------------------------------------------------------------- #
# Waitlist + Feedback + Settings
# --------------------------------------------------------------------------- #


async def test_waitlist_aggregates_by_source_name(
    client: httpx.AsyncClient,
    admin_creds,
    db_session,  # type: ignore[no-untyped-def]
) -> None:
    _, password, totp_secret = admin_creds
    for i in range(3):
        db_session.add(
            Feedback(
                type="source_request",
                source_name="instagram",
                email=f"user{i}@example.com",
                message=None,
                checkboxes={},
            )
        )
    db_session.add(
        Feedback(
            type="source_request",
            source_name="2gis",
            email="other@example.com",
            message=None,
            checkboxes={},
        )
    )
    await db_session.commit()

    cookie = await _login_and_get_cookie(client, password, totp_secret)
    r = await client.get("/admin/api/waitlist", cookies={"admin_session": cookie})
    assert r.status_code == 200
    items = {item["source_name"]: item for item in r.json()["data"]["items"]}
    assert items["instagram"]["votes"] == 3
    assert items["2gis"]["votes"] == 1
    assert items["instagram"]["ready"] is False  # threshold 10
    assert r.json()["data"]["threshold"] == 10


async def test_feedback_list_filters(
    client: httpx.AsyncClient,
    admin_creds,
    db_session,  # type: ignore[no-untyped-def]
) -> None:
    _, password, totp_secret = admin_creds
    db_session.add(
        Feedback(
            type="feature_request",
            source_name=None,
            email="picky@example.com",
            message="нужна вкладка YCLIENTS",
            checkboxes={},
        )
    )
    db_session.add(
        Feedback(
            type="bug",
            source_name=None,
            email=None,
            message="страница падает",
            checkboxes={},
        )
    )
    await db_session.commit()

    cookie = await _login_and_get_cookie(client, password, totp_secret)
    r = await client.get(
        "/admin/api/feedback?type_filter=feature_request", cookies={"admin_session": cookie}
    )
    assert r.status_code == 200
    items = r.json()["data"]["items"]
    assert all(it["type"] == "feature_request" for it in items)


async def test_settings_echoes_flags_without_secrets(
    client: httpx.AsyncClient,
    admin_creds,  # type: ignore[no-untyped-def]
) -> None:
    _, password, totp_secret = admin_creds
    cookie = await _login_and_get_cookie(client, password, totp_secret)
    r = await client.get("/admin/api/settings", cookies={"admin_session": cookie})
    assert r.status_code == 200
    data = r.json()["data"]
    # Boolean fields — no actual secret values in the payload.
    for key in (
        "captcha_configured",
        "tg_bot_configured",
        "yandexgpt_configured",
        "yookassa_configured",
        "s3_configured",
        "fernet_keys_configured",
    ):
        assert isinstance(data[key], bool), key
    # Sanity-check no secret strings leak.
    raw = r.text
    assert "TG_BOT_TOKEN" not in raw
    assert "FERNET" not in raw


async def test_logout_clears_cookie(
    client: httpx.AsyncClient,
    admin_creds,  # type: ignore[no-untyped-def]
) -> None:
    _, password, totp_secret = admin_creds
    cookie = await _login_and_get_cookie(client, password, totp_secret)
    r = await client.post("/admin/api/logout", cookies={"admin_session": cookie})
    assert r.status_code == 200
    # Subsequent /me must be unauthorised even with the (now-deleted) cookie.
    follow = await client.get("/admin/api/me", cookies={"admin_session": cookie})
    assert follow.status_code == 303


# --------------------------------------------------------------------------- #
# Site lifecycle actions (PR #129) — pause_sync / resume_sync / archive / unarchive
# --------------------------------------------------------------------------- #


async def test_site_pause_sync_then_resume(
    client: httpx.AsyncClient,
    admin_creds,
    db_session,  # type: ignore[no-untyped-def]
) -> None:
    """published → pause_sync → sync_paused → resume_sync → published."""
    _, password, totp_secret = admin_creds
    user = User(contact_type="email", contact_value="pause@b.c")
    db_session.add(user)
    await db_session.flush()
    site = Site(user_id=user.id, subdomain="pi", source_type="ymaps", status="published")
    db_session.add(site)
    await db_session.commit()
    site_id = site.id

    cookie = await _login_and_get_cookie(client, password, totp_secret)

    # published → sync_paused
    r1 = await client.post(
        f"/admin/api/sites/{site_id}/pause_sync", cookies={"admin_session": cookie}
    )
    assert r1.status_code == 200, r1.text
    assert r1.json()["data"]["status"] == "sync_paused"

    # Idempotent re-pause should 409 — already not published. Error
    # envelope per app.api.middleware.error_handler: {ok:false, error:<code>}.
    r2 = await client.post(
        f"/admin/api/sites/{site_id}/pause_sync", cookies={"admin_session": cookie}
    )
    assert r2.status_code == 409
    assert r2.json()["error"] == "cannot_pause_sync_from_sync_paused"

    # sync_paused → published
    r3 = await client.post(
        f"/admin/api/sites/{site_id}/resume_sync", cookies={"admin_session": cookie}
    )
    assert r3.status_code == 200, r3.text
    assert r3.json()["data"]["status"] == "published"


async def test_site_archive_then_unarchive(
    client: httpx.AsyncClient,
    admin_creds,
    db_session,  # type: ignore[no-untyped-def]
) -> None:
    """published → archive → archived → unarchive → published."""
    _, password, totp_secret = admin_creds
    user = User(contact_type="email", contact_value="archive@b.c")
    db_session.add(user)
    await db_session.flush()
    site = Site(user_id=user.id, subdomain="omega", source_type="ymaps", status="published")
    db_session.add(site)
    await db_session.commit()
    site_id = site.id

    cookie = await _login_and_get_cookie(client, password, totp_secret)

    # any → archived (allowed from any state except already archived)
    r1 = await client.post(f"/admin/api/sites/{site_id}/archive", cookies={"admin_session": cookie})
    assert r1.status_code == 200, r1.text
    assert r1.json()["data"]["status"] == "archived"

    # archive a second time → 409 already_archived
    r2 = await client.post(f"/admin/api/sites/{site_id}/archive", cookies={"admin_session": cookie})
    assert r2.status_code == 409
    assert r2.json()["error"] == "already_archived"

    # archived → published (unarchive default)
    r3 = await client.post(
        f"/admin/api/sites/{site_id}/unarchive", cookies={"admin_session": cookie}
    )
    assert r3.status_code == 200, r3.text
    assert r3.json()["data"]["status"] == "published"


async def test_site_action_404_on_missing_site(
    client: httpx.AsyncClient,
    admin_creds,  # type: ignore[no-untyped-def]
) -> None:
    _, password, totp_secret = admin_creds
    cookie = await _login_and_get_cookie(client, password, totp_secret)
    r = await client.post(
        "/admin/api/sites/00000000-0000-0000-0000-000000000000/archive",
        cookies={"admin_session": cookie},
    )
    assert r.status_code == 404
    assert r.json()["error"] == "site_not_found"


async def test_site_action_requires_auth(
    client: httpx.AsyncClient,
    db_session,  # type: ignore[no-untyped-def]
) -> None:
    user = User(contact_type="email", contact_value="anon@b.c")
    db_session.add(user)
    await db_session.flush()
    site = Site(user_id=user.id, subdomain="psi", source_type="ymaps", status="published")
    db_session.add(site)
    await db_session.commit()
    site_id = site.id

    # No cookie — require_admin dep redirects to /admin/login (303).
    r = await client.post(f"/admin/api/sites/{site_id}/archive")
    assert r.status_code == 303


async def test_site_pause_sync_rejects_non_published(
    client: httpx.AsyncClient,
    admin_creds,
    db_session,  # type: ignore[no-untyped-def]
) -> None:
    _, password, totp_secret = admin_creds
    user = User(contact_type="email", contact_value="bad@b.c")
    db_session.add(user)
    await db_session.flush()
    # status=pending — not allowed to pause_sync (matrix requires published)
    site = Site(user_id=user.id, subdomain="phi", source_type="ymaps", status="pending")
    db_session.add(site)
    await db_session.commit()
    site_id = site.id

    cookie = await _login_and_get_cookie(client, password, totp_secret)
    r = await client.post(
        f"/admin/api/sites/{site_id}/pause_sync", cookies={"admin_session": cookie}
    )
    assert r.status_code == 409
    assert r.json()["error"] == "cannot_pause_sync_from_pending"


# --------------------------------------------------------------------------- #
# Waitlist mark-in-development (PR #129)
# --------------------------------------------------------------------------- #


async def test_waitlist_mark_in_development_filters_out_source(
    client: httpx.AsyncClient,
    admin_creds,
    db_session,  # type: ignore[no-untyped-def]
) -> None:
    """Marking a source as in-dev removes it from the next /waitlist
    aggregation but keeps the underlying feedback rows."""
    _, password, totp_secret = admin_creds
    # 3 votes for instagram, 1 for vk
    for i in range(3):
        db_session.add(
            Feedback(
                type="source_request",
                source_name="instagram",
                email=f"voter{i}@example.com",
                message=None,
                checkboxes={},
            )
        )
    db_session.add(
        Feedback(
            type="source_request",
            source_name="vk",
            email="someone@example.com",
            message=None,
            checkboxes={},
        )
    )
    await db_session.commit()

    cookie = await _login_and_get_cookie(client, password, totp_secret)

    # Sanity — both sources present pre-mark
    pre = await client.get("/admin/api/waitlist", cookies={"admin_session": cookie})
    sources = {item["source_name"] for item in pre.json()["data"]["items"]}
    assert sources == {"instagram", "vk"}

    # Mark instagram in dev
    mark = await client.post(
        "/admin/api/waitlist/instagram/mark-in-development",
        cookies={"admin_session": cookie},
    )
    assert mark.status_code == 200, mark.text
    body = mark.json()["data"]
    assert body["source_name"] == "instagram"
    assert body["marked"] == 3
    assert body["idempotent"] is False

    # Aggregation excludes the marked source
    post = await client.get("/admin/api/waitlist", cookies={"admin_session": cookie})
    sources_after = {item["source_name"] for item in post.json()["data"]["items"]}
    assert sources_after == {"vk"}

    # Re-mark → idempotent (marked=0)
    again = await client.post(
        "/admin/api/waitlist/instagram/mark-in-development",
        cookies={"admin_session": cookie},
    )
    assert again.status_code == 200
    body = again.json()["data"]
    assert body["marked"] == 0
    assert body["idempotent"] is True


async def test_waitlist_mark_in_development_404_unknown_source(
    client: httpx.AsyncClient,
    admin_creds,  # type: ignore[no-untyped-def]
) -> None:
    _, password, totp_secret = admin_creds
    cookie = await _login_and_get_cookie(client, password, totp_secret)
    r = await client.post(
        "/admin/api/waitlist/never_seen_source/mark-in-development",
        cookies={"admin_session": cookie},
    )
    assert r.status_code == 404
    assert r.json()["error"] == "source_not_found"


async def test_waitlist_mark_in_development_requires_auth(
    client: httpx.AsyncClient,  # type: ignore[no-untyped-def]
) -> None:
    r = await client.post("/admin/api/waitlist/instagram/mark-in-development")
    assert r.status_code == 303
