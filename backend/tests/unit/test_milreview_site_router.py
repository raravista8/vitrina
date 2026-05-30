"""Unit tests for the Host-guarded milreview content-site serving router."""

from __future__ import annotations

from fastapi import FastAPI
from fastapi.testclient import TestClient

from app.api.routers.milreview_site import router

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
