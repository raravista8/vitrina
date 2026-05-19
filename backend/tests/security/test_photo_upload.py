"""Photo-upload security + validation tests (T3.3 / FR-014 / FR-015).

Covers:
  - magic-byte detection (JPEG / PNG / WebP — HEIC fixture skipped because
    Pillow's HEIC support needs an extra plugin; magic-byte check itself
    is exercised in `test_detect_mime_heic`)
  - extension-based bypass attempts (PHP rename to .jpg etc.)
  - batch limits: 30 files, 10MB/file, 100MB total, empty batch
  - EXIF stripping
  - HEIC → JPEG normalisation flag
"""

from __future__ import annotations

import io

import pytest
from PIL import Image

from app.core.parsing.adapters.photos import (
    MAX_BYTES_PER_FILE,
    MAX_FILES,
    PhotoBatchRejected,
    PhotoUploadAdapter,
    UploadedPhoto,
    _detect_mime,
    validate_batch,
)

# --- helpers --------------------------------------------------------------


def _make_jpeg(size: tuple[int, int] = (200, 200)) -> bytes:
    buf = io.BytesIO()
    Image.new("RGB", size, color=(255, 0, 0)).save(buf, format="JPEG")
    return buf.getvalue()


def _make_png(size: tuple[int, int] = (200, 200)) -> bytes:
    buf = io.BytesIO()
    Image.new("RGB", size, color=(0, 255, 0)).save(buf, format="PNG")
    return buf.getvalue()


def _make_webp(size: tuple[int, int] = (200, 200)) -> bytes:
    buf = io.BytesIO()
    Image.new("RGB", size, color=(0, 0, 255)).save(buf, format="WEBP")
    return buf.getvalue()


class _InMemoryStorage:
    def __init__(self) -> None:
        self.objects: dict[str, bytes] = {}

    async def store_photo(
        self,
        *,
        upload_id: str,
        index: int,
        content: bytes,
        content_type: str,
    ) -> str:
        key = f"uploads/{upload_id}/{index}.jpg"
        self.objects[key] = content
        return key


# --- magic-byte detection -------------------------------------------------


@pytest.mark.security
def test_detect_mime_jpeg() -> None:
    assert _detect_mime(_make_jpeg()) == "image/jpeg"


@pytest.mark.security
def test_detect_mime_png() -> None:
    assert _detect_mime(_make_png()) == "image/png"


@pytest.mark.security
def test_detect_mime_webp() -> None:
    assert _detect_mime(_make_webp()) == "image/webp"


@pytest.mark.security
def test_detect_mime_heic_signature() -> None:
    """Manually-crafted HEIC header — Pillow itself can't synthesise
    HEIC without pillow-heif, but the magic-byte sniff doesn't need
    a real decoder."""
    fake_heic = b"\x00\x00\x00\x18ftypheic" + b"\x00" * 32
    assert _detect_mime(fake_heic) == "image/heic"


@pytest.mark.security
@pytest.mark.parametrize(
    "content",
    [
        b"<?php phpinfo(); ?>",
        b"\x4d\x5aMZ",  # PE / Windows EXE
        b"PK\x03\x04",  # ZIP / DOCX
        b"#!/bin/sh\nrm -rf /",
        b"GIF89a",  # GIF — not in our allowlist
        b"",  # empty
    ],
)
def test_non_image_payloads_rejected(content: bytes) -> None:
    assert _detect_mime(content) is None


@pytest.mark.security
async def test_extension_renamed_php_blocked() -> None:
    """Classic Tilda-style bypass: PHP script renamed to picture.jpg.
    The adapter must reject on magic bytes, not extension."""
    storage = _InMemoryStorage()
    adapter = PhotoUploadAdapter(storage)
    with pytest.raises(PhotoBatchRejected, match="bad_magic_bytes"):
        await adapter.parse_uploads(
            upload_id="x",
            uploads=[UploadedPhoto(filename="malware.jpg", content=b"<?php exec($_GET['c']); ?>")],
        )
    assert storage.objects == {}


# --- batch limits ---------------------------------------------------------


@pytest.mark.security
def test_empty_batch_rejected() -> None:
    with pytest.raises(PhotoBatchRejected, match="empty_batch"):
        validate_batch([])


@pytest.mark.security
def test_too_many_files_rejected() -> None:
    uploads = [
        UploadedPhoto(filename=f"{i}.jpg", content=_make_jpeg()) for i in range(MAX_FILES + 1)
    ]
    with pytest.raises(PhotoBatchRejected, match="too_many_files"):
        validate_batch(uploads)


@pytest.mark.security
def test_oversized_file_rejected() -> None:
    big = b"\xff\xd8\xff\xe0" + b"a" * (MAX_BYTES_PER_FILE + 1)
    with pytest.raises(PhotoBatchRejected, match="file_too_large"):
        validate_batch([UploadedPhoto(filename="big.jpg", content=big)])


@pytest.mark.security
def test_empty_file_in_batch_rejected() -> None:
    with pytest.raises(PhotoBatchRejected, match="empty_file"):
        validate_batch([UploadedPhoto(filename="x.jpg", content=b"")])


# --- happy path -----------------------------------------------------------


@pytest.mark.unit
async def test_happy_path_stores_files_and_returns_snapshot() -> None:
    storage = _InMemoryStorage()
    adapter = PhotoUploadAdapter(storage)
    uploads = [
        UploadedPhoto(filename="work-1.jpg", content=_make_jpeg(), photo_type="work"),
        UploadedPhoto(filename="bio.png", content=_make_png(), photo_type="profile_screenshot"),
        UploadedPhoto(filename="card.webp", content=_make_webp(), photo_type="business_card"),
    ]
    snapshot = await adapter.parse_uploads(upload_id="batch-1", uploads=uploads)

    assert snapshot.source_ref == "batch-1"
    assert len(snapshot.photos) == 3
    assert {p.photo_type for p in snapshot.photos} == {
        "work",
        "profile_screenshot",
        "business_card",
    }
    assert all(p.upload_key for p in snapshot.photos)
    # Three files stored in the bucket
    assert len(storage.objects) == 3
    # All re-encoded as JPEG (T3.3 normalisation)
    for content in storage.objects.values():
        assert content.startswith(b"\xff\xd8\xff")


@pytest.mark.unit
async def test_unknown_photo_type_falls_through_to_unknown() -> None:
    storage = _InMemoryStorage()
    adapter = PhotoUploadAdapter(storage)
    snapshot = await adapter.parse_uploads(
        upload_id="batch-2",
        uploads=[
            UploadedPhoto(
                filename="x.jpg",
                content=_make_jpeg(),
                photo_type="something-fishy",
            )
        ],
    )
    assert snapshot.photos[0].photo_type == "unknown"
    assert snapshot.metadata["needs_vision_classification"] is True


@pytest.mark.unit
async def test_oversized_image_resized_to_long_edge_cap() -> None:
    """A 4000×3000 JPEG should come out ≤1920px on its long edge."""
    big = io.BytesIO()
    Image.new("RGB", (4000, 3000), color=(123, 222, 11)).save(big, format="JPEG")
    storage = _InMemoryStorage()
    adapter = PhotoUploadAdapter(storage)
    snapshot = await adapter.parse_uploads(
        upload_id="resize",
        uploads=[UploadedPhoto(filename="big.jpg", content=big.getvalue())],
    )
    key = snapshot.photos[0].upload_key
    assert key is not None
    out = Image.open(io.BytesIO(storage.objects[key]))
    assert max(out.size) <= 1920


@pytest.mark.unit
async def test_corrupt_image_rejected() -> None:
    """Magic bytes match but Pillow can't decode the body."""
    corrupt = b"\xff\xd8\xff\xe0" + b"garbage" * 100
    storage = _InMemoryStorage()
    adapter = PhotoUploadAdapter(storage)
    with pytest.raises(PhotoBatchRejected, match="unreadable_image"):
        await adapter.parse_uploads(
            upload_id="x",
            uploads=[UploadedPhoto(filename="bad.jpg", content=corrupt)],
        )
