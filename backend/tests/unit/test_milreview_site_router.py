"""Unit tests for the Host-guarded milreview content-site serving router."""

from __future__ import annotations

from fastapi import FastAPI
from fastapi.testclient import TestClient

from app.api.routers.static_sites import router

HOST = "milreview.samosite.online"
FILES: dict[str, tuple[str, str]] = {
    "index.html": ("<html>home</html>", "text/html; charset=utf-8"),
    "station-1706.html": ("<html>Северобайкальск</html>", "text/html; charset=utf-8"),
    "sitemap.xml": ("<urlset/>", "application/xml; charset=utf-8"),
    "styles.css": ("body{color:red}", "text/css; charset=utf-8"),
}


def _client(files: dict[str, tuple[str, str]] | None = FILES, host: str = HOST) -> TestClient:
    app = FastAPI()
    app.state.milreview_host = host
    app.state.milreview_files = files
    app.include_router(router)
    return TestClient(app)


def test_serves_index_at_root() -> None:
    r = _client().get("/", headers={"host": HOST})
    assert r.status_code == 200
    assert "home" in r.text
    assert r.headers["content-type"].startswith("text/html")
    assert "default-src 'self'" in r.headers["content-security-policy"]
    assert r.headers["cache-control"] == "public, max-age=300"


def test_serves_named_file() -> None:
    r = _client().get("/station-1706.html", headers={"host": HOST})
    assert r.status_code == 200
    assert "Северобайкальск" in r.text


def test_css_content_type() -> None:
    r = _client().get("/styles.css", headers={"host": HOST})
    assert r.status_code == 200
    assert r.headers["content-type"].startswith("text/css")


def test_unknown_path_is_404() -> None:
    r = _client().get("/does-not-exist.html", headers={"host": HOST})
    assert r.status_code == 404


def test_wrong_host_is_404() -> None:
    # Same files, but a non-milreview Host must never be served — guards against
    # this catch-all shadowing the main domain / admin / api surfaces.
    r = _client().get("/", headers={"host": "samosite.online"})
    assert r.status_code == 404


def test_no_files_loaded_is_404() -> None:
    r = _client(files={}).get("/", headers={"host": HOST})
    assert r.status_code == 404


# ── multi-host dispatch (elektrik + cross-host isolation) ──────────────────────

ELEKTRIK_HOST = "elektrik-spb.samosite.online"
ELEKTRIK_FILES: dict[str, tuple[str | bytes, str]] = {
    "index.html": ("<html>Электромонтаж</html>", "text/html; charset=utf-8"),
    "hero.webp": (b"RIFF\x00\x00\x00\x00WEBP", "image/webp"),
}


def _multi_client() -> TestClient:
    app = FastAPI()
    app.state.milreview_host = HOST
    app.state.milreview_files = FILES
    app.state.elektrik_host = ELEKTRIK_HOST
    app.state.elektrik_files = ELEKTRIK_FILES
    app.include_router(router)
    return TestClient(app)


def test_elektrik_host_served_with_its_csp() -> None:
    r = _multi_client().get("/", headers={"host": ELEKTRIK_HOST})
    assert r.status_code == 200
    assert "Электромонтаж" in r.text
    csp = r.headers["content-security-policy"]
    assert "form-action 'self'" in csp  # customer-site CSP, not milreview's
    assert "smartcaptcha.yandexcloud.net" in csp


def test_elektrik_binary_asset() -> None:
    r = _multi_client().get("/hero.webp", headers={"host": ELEKTRIK_HOST})
    assert r.status_code == 200
    assert r.headers["content-type"] == "image/webp"
    assert r.content == b"RIFF\x00\x00\x00\x00WEBP"


def test_cross_host_isolation() -> None:
    c = _multi_client()
    # milreview-only file must not be reachable on the elektrik host, and v.v.
    assert c.get("/station-1706.html", headers={"host": ELEKTRIK_HOST}).status_code == 404
    assert c.get("/hero.webp", headers={"host": HOST}).status_code == 404
    # milreview still served on its own host (no regression)
    assert c.get("/", headers={"host": HOST}).status_code == 200
