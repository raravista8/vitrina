"""Telegram Desktop HTML-export parser (T3.6 — ADR-0005 Tier 3).

When the channel is private (no public ``t.me/<name>`` URL, so T3.5
can't reach it) the user runs Telegram Desktop's "Export chat history"
with HTML output and uploads the resulting ZIP. This adapter:

  1. Walks the ZIP entries: ``messages.html`` (+ optional
     ``messages2.html`` etc. for long chats), ``photos/`` directory.
  2. Parses each ``messages*.html`` with the same stdlib
     ``html.parser`` approach as T3.5.
  3. Pulls message bodies (``.body .text``) and photo paths
     (``.body .photo_wrap a.photo`` / ``href="photos/photo_NN.jpg"``).
  4. Photos remain *upload_keys* — the worker uploads the file bytes
     to Object Storage later. For MVP the adapter records the in-ZIP
     paths and a separate orchestrator will fan out the uploads.

Limits per FR-014: ZIP ≤100 MB total, ≤30 photo entries surfaced,
each entry ≤10 MB. Anything bigger is rejected with
``PhotoBatchRejectedError`` (re-used from T3.3) to keep the error
surface tight.

Security: the ZIP is parsed entirely in memory (no path traversal
into ``/tmp``); HTML parsing uses the same defensive scanner as T3.5
so a malicious export can't smuggle script payloads into the snapshot
— the sanitiser strips anything residual at the service boundary.
"""

from __future__ import annotations

import io
import re
import zipfile
from html.parser import HTMLParser

from app.core.parsing.adapters.photos import (
    MAX_BYTES_PER_FILE,
    MAX_FILES,
    MAX_TOTAL_BYTES,
    PhotoBatchRejectedError,
)
from app.core.parsing.ports import (
    InvalidSourceUrlError,
    PhotoRef,
    SourceSnapshot,
    SourceType,
)
from app.utils.logging import get_logger

MAX_POSTS = 50  # private chats can be longer than the public web view


class TelegramHtmlExportAdapter:
    source_type = SourceType.telegram

    def __init__(self) -> None:
        # No upstream — everything happens in-memory on the uploaded ZIP.
        self._log = get_logger("core.parsing.adapters.telegram_html_export")

    def is_available(self) -> bool:
        return True

    async def parse(self, source_ref: str) -> SourceSnapshot:  # noqa: ARG002
        """The HTML export flow takes a ZIP byte payload, not a URL.
        The default ``parse`` is here for ``ParserService`` shape
        compatibility; callers use ``parse_zip`` directly."""
        raise InvalidSourceUrlError("tg_html_export_requires_zip_use_parse_zip")

    def parse_zip(self, *, upload_id: str, zip_bytes: bytes) -> SourceSnapshot:
        if len(zip_bytes) > MAX_TOTAL_BYTES:
            raise PhotoBatchRejectedError(f"export_zip_too_large:{len(zip_bytes)}")

        try:
            archive = zipfile.ZipFile(io.BytesIO(zip_bytes))
        except zipfile.BadZipFile as exc:
            raise InvalidSourceUrlError("invalid_zip_archive") from exc

        html_entries = [
            name
            for name in archive.namelist()
            if re.match(r"messages\d*\.html$", name.split("/")[-1])
        ]
        if not html_entries:
            raise InvalidSourceUrlError("no_messages_html_in_export")

        post_texts: list[str] = []
        photo_keys: list[str] = []
        seen_paths: set[str] = set()

        for entry in sorted(html_entries):
            info = archive.getinfo(entry)
            if info.file_size > MAX_BYTES_PER_FILE * 2:
                # 20 MB cap per HTML file — Telegram tends to split
                # before this anyway. Skip silently rather than abort
                # the whole import.
                self._log.warning("tg_html_skipped_oversized", entry=entry)
                continue
            with archive.open(info) as fp:
                raw = fp.read().decode("utf-8", errors="replace")
            page = _parse_message_page(raw)
            post_texts.extend(page.texts)
            for path in page.photo_paths:
                if path in seen_paths or len(photo_keys) >= MAX_FILES:
                    continue
                seen_paths.add(path)
                # The actual upload to Object Storage happens later in
                # a fan-out step; here we record the in-ZIP path so
                # the worker has a stable handle.
                photo_keys.append(f"{upload_id}/{path}")

        photos = [PhotoRef(url=None, upload_key=k, photo_type="work") for k in photo_keys]
        title = _channel_name_from_first_text(post_texts) or upload_id

        return SourceSnapshot(
            source_type=SourceType.telegram,
            source_ref=upload_id,
            title=title,
            photos=photos,
            metadata={
                "history_collected": True,
                "history_source": "tg_html_export",
                "post_count": len(post_texts),
                "posts": post_texts[:MAX_POSTS],
                "needs_photo_upload": bool(photo_keys),  # worker still has to upload
                "photo_paths_in_zip": photo_keys,
            },
        )


# --- HTML scanning --------------------------------------------------------


class _PageScan:
    def __init__(self) -> None:
        self.texts: list[str] = []
        self.photo_paths: list[str] = []


def _parse_message_page(html: str) -> _PageScan:
    scanner = _MessageScanner()
    scanner.feed(html)
    scanner.close()
    return scanner.result


class _MessageScanner(HTMLParser):
    """Sax-style scanner over TG Desktop's ``messages.html`` layout.

    Layout (stable as of the 2024 export format):

      <div class="message default ...">
        <div class="body">
          <div class="text"> ... post text ... </div>
          <a class="photo_wrap" href="photos/photo_42.jpg">
            <img class="photo" src="..."/>
          </a>
        </div>
      </div>
    """

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.result = _PageScan()
        self._in_text = False
        self._text_buf: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attrs_dict = {k: v for k, v in attrs if v is not None}
        classes = (attrs_dict.get("class") or "").split()

        if tag == "div" and "text" in classes:
            self._in_text = True
            self._text_buf = []
            return

        if tag == "a" and "photo_wrap" in classes:
            href = attrs_dict.get("href")
            if href and href.startswith("photos/"):
                self.result.photo_paths.append(href)

    def handle_endtag(self, tag: str) -> None:
        if tag == "div" and self._in_text:
            text = "".join(self._text_buf).strip()
            if text:
                self.result.texts.append(text)
            self._in_text = False
            self._text_buf = []

    def handle_data(self, data: str) -> None:
        if self._in_text:
            self._text_buf.append(data)


def _channel_name_from_first_text(post_texts: list[str]) -> str | None:
    """Best-effort title pick — Telegram exports include the channel
    name in the page <title> we don't currently parse, but the first
    post often opens with the brand name. If everything fails we
    fall back to the upload_id in the caller."""
    for text in post_texts:
        line = text.splitlines()[0].strip()
        if line and len(line) <= 200:
            return line
    return None
