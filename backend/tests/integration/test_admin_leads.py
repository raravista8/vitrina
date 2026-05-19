"""Admin lead views (T5.3): masked list + decrypted detail with audit."""

from __future__ import annotations

import uuid
from collections.abc import AsyncIterator
from datetime import UTC, datetime

import httpx
import pytest
import pytest_asyncio
from cryptography.fernet import Fernet, MultiFernet
from fastapi import FastAPI
from sqlalchemy import select

from app.api.dependencies import get_lead_fernet, get_session, require_admin
from app.core.auth.sessions import AdminSession
from app.core.leads.encryption import encrypt
from app.infrastructure.postgres.models import AdminAction, Lead, Site, User
from app.main import create_app

pytestmark = pytest.mark.integration


@pytest_asyncio.fixture
async def fernet() -> MultiFernet:
    return MultiFernet([Fernet(Fernet.generate_key())])


@pytest_asyncio.fixture
async def seeded(db_session, fernet: MultiFernet):  # type: ignore[no-untyped-def]
    user = User(contact_type="email", contact_value="owner@example.com")
    db_session.add(user)
    await db_session.flush()
    site = Site(
        user_id=user.id,
        subdomain="anna",
        source_type="ymaps",
        status="published",
    )
    db_session.add(site)
    await db_session.flush()
    lead = Lead(
        site_id=site.id,
        name_enc=encrypt("Анна Иванова", fernet=fernet),
        phone_enc=encrypt("+7 921 123-45-67", fernet=fernet),
        message_enc=encrypt("Запишите на маникюр", fernet=fernet),
        ip="85.140.1.2",
        user_agent="Mozilla/5.0",
    )
    db_session.add(lead)
    await db_session.commit()
    return site, lead


@pytest_asyncio.fixture
async def app(db_session, fernet: MultiFernet) -> AsyncIterator[FastAPI]:  # type: ignore[no-untyped-def]
    fastapi_app = create_app()

    async def _override_session():
        yield db_session

    fake_admin = AdminSession(
        session_id="test-session",
        admin_id=uuid.uuid4(),
        created_at=datetime.now(UTC),
        last_seen_at=datetime.now(UTC),
    )
    fastapi_app.dependency_overrides[get_session] = _override_session
    fastapi_app.dependency_overrides[require_admin] = lambda: fake_admin
    fastapi_app.dependency_overrides[get_lead_fernet] = lambda: fernet
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


# --- masked list ---------------------------------------------------------


async def test_lead_list_renders_without_decryption(
    client: httpx.AsyncClient,
    seeded,  # type: ignore[no-untyped-def]
    db_session,  # type: ignore[no-untyped-def]
) -> None:
    site, _ = seeded
    resp = await client.get(f"/admin/sites/{site.id}/leads")
    assert resp.status_code == 200
    html = resp.text
    # The list page must NOT contain cleartext PII — the listing is
    # the masked surface; cleartext only appears on the detail view.
    assert "Анна Иванова" not in html
    assert "+7 921 123-45-67" not in html
    # IP is operational data + visible
    assert "85.140.1.2" in html
    # No audit row written for the list view
    actions = (await db_session.execute(select(AdminAction))).scalars().all()
    assert actions == []


async def test_unknown_site_returns_404(client: httpx.AsyncClient) -> None:
    resp = await client.get(f"/admin/sites/{uuid.uuid4()}/leads")
    assert resp.status_code == 404


# --- decrypted detail ----------------------------------------------------


async def test_lead_detail_decrypts_and_writes_audit(
    client: httpx.AsyncClient,
    seeded,  # type: ignore[no-untyped-def]
    db_session,  # type: ignore[no-untyped-def]
) -> None:
    _, lead = seeded
    resp = await client.get(f"/admin/leads/{lead.id}")
    assert resp.status_code == 200
    html = resp.text

    # Cleartext is rendered on the detail view (founder needs to see it
    # to action the lead).
    assert "Анна Иванова" in html
    assert "+7 921 123-45-67" in html
    assert "Запишите на маникюр" in html

    # Audit row written
    actions = (
        (
            await db_session.execute(
                select(AdminAction).where(AdminAction.action == "lead_decrypted")
            )
        )
        .scalars()
        .all()
    )
    assert len(actions) == 1
    assert actions[0].target_id == str(lead.id)
    assert actions[0].params["name_decryption_ok"] is True
    assert actions[0].params["phone_decryption_ok"] is True
    assert actions[0].params["message_decryption_ok"] is True


async def test_lead_detail_with_wrong_key_shows_placeholder_but_audits(
    db_session,  # type: ignore[no-untyped-def]
    seeded,  # type: ignore[no-untyped-def]
) -> None:
    """Simulate key rotation gap: serve the route with a different
    Fernet than the one that encrypted the ciphertext. Decryption
    fails → placeholder rendered, but the audit row STILL lands —
    the operator looked, even if the bytes didn't decode."""
    _, lead = seeded
    wrong_fernet = MultiFernet([Fernet(Fernet.generate_key())])

    fastapi_app = create_app()

    async def _override_session():
        yield db_session

    fake_admin = AdminSession(
        session_id="test-session",
        admin_id=uuid.uuid4(),
        created_at=datetime.now(UTC),
        last_seen_at=datetime.now(UTC),
    )
    fastapi_app.dependency_overrides[get_session] = _override_session
    fastapi_app.dependency_overrides[require_admin] = lambda: fake_admin
    fastapi_app.dependency_overrides[get_lead_fernet] = lambda: wrong_fernet
    fastapi_app.state.lead_fernet = wrong_fernet

    transport = httpx.ASGITransport(app=fastapi_app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as c:
        resp = await c.get(f"/admin/leads/{lead.id}")
    assert resp.status_code == 200
    assert "[decryption_failed]" in resp.text

    actions = (
        (
            await db_session.execute(
                select(AdminAction).where(AdminAction.action == "lead_decrypted")
            )
        )
        .scalars()
        .all()
    )
    assert len(actions) == 1
    assert actions[0].params["name_decryption_ok"] is False


async def test_unknown_lead_returns_404(client: httpx.AsyncClient) -> None:
    resp = await client.get(f"/admin/leads/{uuid.uuid4()}")
    assert resp.status_code == 404
