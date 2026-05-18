"""Smoke tests: confirm imports work and the scaffold is wired up.

These tests are intentionally trivial; they exist so `pytest` exits 0 on a
fresh checkout and `make test` is a meaningful green/red signal.
"""

from __future__ import annotations

import pytest


@pytest.mark.unit
def test_app_version_present() -> None:
    from app import __version__

    assert isinstance(__version__, str)
    assert len(__version__) > 0


@pytest.mark.unit
def test_settings_load_without_env() -> None:
    """Settings must instantiate with safe defaults in development mode."""
    from app.config import Settings

    settings = Settings(_env_file=None)  # type: ignore[call-arg]
    assert settings.environment.value == "development"
    assert settings.debug is True


@pytest.mark.unit
def test_create_app_returns_fastapi_instance() -> None:
    from fastapi import FastAPI

    from app.main import create_app

    app = create_app()
    assert isinstance(app, FastAPI)


@pytest.mark.unit
def test_healthz_endpoint() -> None:
    from fastapi.testclient import TestClient

    from app.main import create_app

    client = TestClient(create_app())
    response = client.get("/healthz")
    assert response.status_code == 200
    body = response.json()
    assert body["ok"] is True
    assert body["data"]["status"] == "alive"


@pytest.mark.unit
def test_domain_result_alias_round_trip() -> None:
    from app.utils.errors import DomainError, Err, Ok

    ok = Ok(42)
    assert ok.unwrap() == 42

    err = Err(DomainError(code="not_found", message="missing"))
    assert err.is_err()
    assert err.unwrap_err().code == "not_found"
