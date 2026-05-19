"""Photo-upload parsing adapter (T3.3).

Receives a batch of user-uploaded files + per-file ``photo_type``
labels (``work`` | ``profile_screenshot`` | ``business_card`` |
``booklet`` | ``unknown``) and produces a ``SourceSnapshot`` ready
for the vision-LLM stage (T4).

Hard guarantees enforced at this layer (FR-014, FR-015):

  - magic-byte verification (NEVER extension-based) — see
    ``app.core.parsing.adapters.photo_magic``
  - 30 file max, 10 MB per file max, 100 MB combined max
  - EXIF stripped except orientation (keeps the upload pipeline from
    leaking geo-coordinates buried inside JPEG headers)
  - resize to ≤1920×1920 (long edge) before storage to control cost

Per-photo_type processing downstream (T4):
  - ``work``                — gallery + alt-text generation
  - ``profile_screenshot``  — vision LLM extracts bio + service list
                              + social-proof counters from the screenshot
  - ``business_card``       — vision LLM extracts brand + contacts
  - ``booklet``             — vision LLM extracts services + prices
  - ``unknown``             — vision LLM auto-classifies into one of
                              the above before downstream prompting

The adapter itself does NOT call the LLM. It produces the snapshot.
The content worker (T4.1) picks `photos[].photo_type` and routes to
the right prompt template.
"""

from __future__ import annotations

import io
from dataclasses import dataclass
from typing import Any, Protocol

from PIL import ExifTags, Image, ImageOps

from app.core.parsing.ports import (
    InvalidSourceUrlError,
    PhotoRef,
    SourceSnapshot,
    SourceType,
)
from app.utils.logging import get_logger

# --- Constants per FR-014 / FR-015 -----------------------------------------

MAX_FILES = 30
MAX_BYTES_PER_FILE = 10 * 1024 * 1024  # 10 MB
MAX_TOTAL_BYTES = 100 * 1024 * 1024  # 100 MB
MAX_LONG_EDGE_PX = 1920

ALLOWED_PHOTO_TYPES: tuple[str, ...] = (
    "work",
    "profile_screenshot",
    "business_card",
    "booklet",
    "unknown",
)

# Magic-byte signatures we trust. JPEG/PNG/WebP/HEIC per FR-015. The
# ``python-magic`` package would also work but we keep the dependency
# surface tight — these four prefixes catch the canonical encodings.
_MAGIC_SIGNATURES: tuple[tuple[bytes, str], ...] = (
    (b"\xff\xd8\xff", "image/jpeg"),
    (b"\x89PNG\r\n\x1a\n", "image/png"),
    (b"RIFF", "image/webp"),  # plus "WEBP" at offset 8 — see _detect_mime
    (b"\x00\x00\x00", "image/heic"),  # checks ftypheic/heix at offset 4
)

ALLOWED_MIME_TYPES: frozenset[str] = frozenset(
    {"image/jpeg", "image/png", "image/webp", "image/heic"}
)


# --- Errors ---------------------------------------------------------------


class PhotoBatchRejectedError(InvalidSourceUrlError):
    """Family of upload-validation failures. Subclass of
    ``InvalidSourceUrlError`` so the parser-service treats them like
    any other adapter rejection (no manual fanout)."""


# Back-compat alias so call sites can use either form.
PhotoBatchRejected = PhotoBatchRejectedError


# --- Inputs --------------------------------------------------------------


@dataclass(frozen=True, slots=True)
class UploadedPhoto:
    """A single uploaded file as it enters the adapter.

    ``content`` is the raw bytes (the FastAPI endpoint has already
    streamed it); ``photo_type`` defaults to ``"unknown"`` and the
    vision-LLM in T4 will classify it.
    """

    filename: str
    content: bytes
    photo_type: str = "unknown"
    alt: str | None = None


# --- Output --------------------------------------------------------------


@dataclass(frozen=True, slots=True)
class StoredPhoto:
    """What we stored after sanitising. The uploader (Object Storage)
    returns the key the file lives under."""

    upload_key: str
    photo_type: str
    width: int
    height: int
    mime: str
    size_bytes: int
    alt: str | None = None


# --- Storage port --------------------------------------------------------


class PhotoStorage(Protocol):
    """Bytes → storage key. The concrete S3 implementation lives in
    ``app.infrastructure.s3.*``; this Protocol keeps `core/parsing/`
    free of infrastructure imports (hexagonal contract)."""

    async def store_photo(
        self,
        *,
        upload_id: str,
        index: int,
        content: bytes,
        content_type: str,
    ) -> str: ...


# --- Adapter -------------------------------------------------------------


class PhotoUploadAdapter:
    source_type = SourceType.photo

    def __init__(self, storage: PhotoStorage) -> None:
        self._storage = storage
        self._log = get_logger("core.parsing.adapters.photos")

    def is_available(self) -> bool:
        # Storage is always wired — the in-memory fallback in
        # ``app.main`` lifespan substitutes for S3 when credentials
        # are missing.
        return True

    async def parse(self, source_ref: str) -> SourceSnapshot:  # noqa: ARG002
        """Default ``parse`` for the SourceParser Protocol — photos
        don't have a meaningful URL. Routers / workers use
        ``parse_uploads`` directly; this method exists so the adapter
        slots cleanly into ``ParserService`` for diagnostic dispatch.
        """
        raise InvalidSourceUrlError("photo_adapter_requires_uploads_use_parse_uploads")

    async def parse_uploads(
        self,
        *,
        upload_id: str,
        uploads: list[UploadedPhoto],
    ) -> SourceSnapshot:
        validate_batch(uploads)

        stored: list[StoredPhoto] = []
        photos: list[PhotoRef] = []
        for index, upload in enumerate(uploads):
            mime = _detect_mime(upload.content)
            if mime not in ALLOWED_MIME_TYPES:
                raise PhotoBatchRejectedError(f"bad_magic_bytes:{upload.filename}")
            photo_type = _canonical_photo_type(upload.photo_type)
            processed = _process_image(upload.content, mime)
            key = await self._storage.store_photo(
                upload_id=upload_id,
                index=index,
                content=processed.content,
                content_type="image/jpeg",  # always normalised to JPEG
            )
            stored_entry = StoredPhoto(
                upload_key=key,
                photo_type=photo_type,
                width=processed.width,
                height=processed.height,
                mime="image/jpeg",
                size_bytes=len(processed.content),
                alt=upload.alt,
            )
            stored.append(stored_entry)
            photos.append(
                PhotoRef(
                    url=None,
                    upload_key=key,
                    alt=upload.alt,
                    photo_type=photo_type,
                )
            )

        self._log.info(
            "photos_stored",
            upload_id=upload_id,
            count=len(stored),
            by_type=_count_by_type(stored),
        )

        return SourceSnapshot(
            source_type=SourceType.photo,
            source_ref=upload_id,
            photos=photos,
            metadata={
                "upload_id": upload_id,
                "photo_count": len(photos),
                "by_type": _count_by_type(stored),
                "needs_vision_classification": any(s.photo_type == "unknown" for s in stored),
            },
        )


# --- Validation -----------------------------------------------------------


def validate_batch(uploads: list[UploadedPhoto]) -> None:
    """FR-014 limit enforcement. Raises ``PhotoBatchRejectedError``."""
    if not uploads:
        raise PhotoBatchRejectedError("empty_batch")
    if len(uploads) > MAX_FILES:
        raise PhotoBatchRejectedError(f"too_many_files:{len(uploads)}")

    total = 0
    for u in uploads:
        size = len(u.content)
        if size == 0:
            raise PhotoBatchRejectedError(f"empty_file:{u.filename}")
        if size > MAX_BYTES_PER_FILE:
            raise PhotoBatchRejectedError(f"file_too_large:{u.filename}:{size}")
        total += size
    if total > MAX_TOTAL_BYTES:
        raise PhotoBatchRejectedError(f"batch_too_large:{total}")


# --- Magic-byte detection -------------------------------------------------


def _detect_mime(content: bytes) -> str | None:
    """Return one of ALLOWED_MIME_TYPES based on a magic-byte sniff, or
    ``None`` if no signature matches. Per FR-015 we never trust the
    Content-Type header or filename extension."""
    if content.startswith(b"\xff\xd8\xff"):
        return "image/jpeg"
    if content.startswith(b"\x89PNG\r\n\x1a\n"):
        return "image/png"
    if content[:4] == b"RIFF" and content[8:12] == b"WEBP":
        return "image/webp"
    # HEIC: bytes 4..12 contain "ftypheic" / "ftypheix" / "ftypmif1"
    if (
        len(content) >= 12
        and content[4:8] == b"ftyp"
        and content[8:12]
        in {
            b"heic",
            b"heix",
            b"mif1",
            b"msf1",
        }
    ):
        return "image/heic"
    return None


# --- Image processing -----------------------------------------------------


@dataclass(frozen=True, slots=True)
class _Processed:
    content: bytes
    width: int
    height: int


def _process_image(raw: bytes, mime: str) -> _Processed:  # noqa: ARG001
    """Strip EXIF (except orientation), resize ≤1920px long edge,
    re-encode as JPEG. HEIC is converted to JPEG so customer browsers
    that lack HEIC support still render the gallery.

    ``mime`` is unused today — Pillow infers the codec from the raw
    bytes — but is kept in the signature so a future code path that
    branches on input type (e.g. HEIC needing pillow-heif) doesn't
    require touching every call site.
    """
    try:
        opened = Image.open(io.BytesIO(raw))
        # ImageOps.exif_transpose honours EXIF orientation, then we
        # drop the EXIF block entirely by saving without ``exif=``.
        img: Image.Image = ImageOps.exif_transpose(opened) or opened
    except Exception as exc:  # pragma: no cover — Pillow surfaces many subclasses
        raise PhotoBatchRejectedError(f"unreadable_image:{exc.__class__.__name__}") from exc

    if img.mode in {"RGBA", "P", "LA"}:
        img = img.convert("RGB")

    img.thumbnail((MAX_LONG_EDGE_PX, MAX_LONG_EDGE_PX), Image.Resampling.LANCZOS)
    width, height = img.size

    out = io.BytesIO()
    img.save(out, format="JPEG", quality=85, optimize=True)
    _strip_exif_attrs(img)
    return _Processed(content=out.getvalue(), width=width, height=height)


def _strip_exif_attrs(img: Image.Image) -> None:
    """Best-effort: blank the in-memory EXIF dict so any caller that
    holds the PIL object after this function doesn't pick up GPS or
    capture-time metadata. The persisted bytes already omit EXIF."""
    if hasattr(img, "_getexif"):
        try:
            exif = img._getexif()
        except Exception:  # pragma: no cover
            return
        if exif is None:
            return
        for tag_id in list(exif):
            if ExifTags.TAGS.get(tag_id) == "Orientation":
                continue
            exif[tag_id] = None


# --- Misc helpers --------------------------------------------------------


def _canonical_photo_type(raw: str | None) -> str:
    if raw not in ALLOWED_PHOTO_TYPES:
        return "unknown"
    return raw


def _count_by_type(stored: list[StoredPhoto]) -> dict[str, Any]:
    counts: dict[str, int] = {}
    for s in stored:
        counts[s.photo_type] = counts.get(s.photo_type, 0) + 1
    return dict(counts)
