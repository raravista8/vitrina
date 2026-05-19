"""Tests for the Telegram Desktop HTML-export parser (T3.6)."""

from __future__ import annotations

import io
import zipfile

import pytest

from app.core.parsing.adapters.photos import PhotoBatchRejectedError
from app.core.parsing.adapters.telegram_html_export import TelegramHtmlExportAdapter
from app.core.parsing.ports import InvalidSourceUrlError

MESSAGES_HTML = """
<html>
  <body>
    <div class="message default">
      <div class="body">
        <div class="text">Стрижка сегодня в 18:00.</div>
        <a class="photo_wrap" href="photos/photo_1.jpg">
          <img class="photo" src="photos/photo_1.jpg"/>
        </a>
      </div>
    </div>
    <div class="message default">
      <div class="body">
        <div class="text">Запись по телефону.</div>
        <a class="photo_wrap" href="photos/photo_2.jpg">
          <img class="photo" src="photos/photo_2.jpg"/>
        </a>
        <a class="photo_wrap" href="photos/photo_3.jpg">
          <img class="photo" src="photos/photo_3.jpg"/>
        </a>
      </div>
    </div>
  </body>
</html>
"""


def _make_export_zip(*, messages_pages: dict[str, str]) -> bytes:
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, mode="w", compression=zipfile.ZIP_DEFLATED) as zf:
        for name, html in messages_pages.items():
            zf.writestr(name, html)
        # Tiny placeholder for photos so the ZIP listing has the dir
        zf.writestr("photos/photo_1.jpg", b"\xff\xd8\xff" + b"x" * 100)
        zf.writestr("photos/photo_2.jpg", b"\xff\xd8\xff" + b"x" * 100)
        zf.writestr("photos/photo_3.jpg", b"\xff\xd8\xff" + b"x" * 100)
    return buf.getvalue()


# --- happy path -----------------------------------------------------------


@pytest.mark.unit
def test_parses_post_text_and_photos() -> None:
    zip_bytes = _make_export_zip(messages_pages={"messages.html": MESSAGES_HTML})
    adapter = TelegramHtmlExportAdapter()

    snapshot = adapter.parse_zip(upload_id="batch-7", zip_bytes=zip_bytes)

    assert snapshot.metadata["history_collected"] is True
    assert snapshot.metadata["history_source"] == "tg_html_export"
    assert snapshot.metadata["post_count"] == 2
    assert "Стрижка" in snapshot.metadata["posts"][0]

    # 3 distinct photo paths, each with the upload_id prefix
    assert len(snapshot.photos) == 3
    assert all(p.upload_key and p.upload_key.startswith("batch-7/photos/") for p in snapshot.photos)
    assert snapshot.metadata["needs_photo_upload"] is True


@pytest.mark.unit
def test_multi_page_export_concatenates() -> None:
    zip_bytes = _make_export_zip(
        messages_pages={
            "messages.html": MESSAGES_HTML,
            "messages2.html": MESSAGES_HTML.replace("18:00", "20:00"),
        }
    )
    snapshot = TelegramHtmlExportAdapter().parse_zip(upload_id="batch-multi", zip_bytes=zip_bytes)
    assert snapshot.metadata["post_count"] == 4
    # First photo of page2 == photos/photo_1.jpg (deduped against page1)
    assert sum(1 for p in snapshot.photos if p.upload_key and "photo_1.jpg" in p.upload_key) == 1


# --- failure modes --------------------------------------------------------


@pytest.mark.unit
def test_oversized_zip_rejected() -> None:
    big = b"x" * (200 * 1024 * 1024 + 1)  # > 100 MB cap
    with pytest.raises(PhotoBatchRejectedError, match="export_zip_too_large"):
        TelegramHtmlExportAdapter().parse_zip(upload_id="x", zip_bytes=big)


@pytest.mark.unit
def test_corrupt_zip_rejected() -> None:
    with pytest.raises(InvalidSourceUrlError, match="invalid_zip_archive"):
        TelegramHtmlExportAdapter().parse_zip(upload_id="x", zip_bytes=b"not a zip")


@pytest.mark.unit
def test_zip_without_messages_html_rejected() -> None:
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, mode="w") as zf:
        zf.writestr("other.html", "<html></html>")
        zf.writestr("photos/photo_1.jpg", b"\xff\xd8\xff")
    with pytest.raises(InvalidSourceUrlError, match="no_messages_html_in_export"):
        TelegramHtmlExportAdapter().parse_zip(upload_id="x", zip_bytes=buf.getvalue())


@pytest.mark.unit
def test_title_falls_back_to_first_post_line() -> None:
    html = """
    <html><body>
      <div class="message default">
        <div class="body">
          <div class="text">Студия маникюра Анны
вторая строка</div>
        </div>
      </div>
    </body></html>
    """
    zip_bytes = _make_export_zip(messages_pages={"messages.html": html})
    snapshot = TelegramHtmlExportAdapter().parse_zip(upload_id="anna", zip_bytes=zip_bytes)
    assert snapshot.title == "Студия маникюра Анны"


@pytest.mark.unit
async def test_parse_default_method_rejects_url_style_ref() -> None:
    """The Protocol-shape ``parse`` exists so the adapter slots into
    ParserService; using it with a URL must surface a clear error."""
    adapter = TelegramHtmlExportAdapter()
    with pytest.raises(InvalidSourceUrlError, match="tg_html_export_requires_zip"):
        await adapter.parse("https://t.me/anything")
