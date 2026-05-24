"""Magic-byte validators for text-file attachments on photo-mode applications.

FR-015 extension for canon 0.3.0 — the photo flow can attach price-lists,
service descriptions, and FAQs as PDF / DOCX / TXT / RTF files. Each format
is validated by reading the first bytes; extension/Content-Type alone are
NOT trusted (the user-supplied filename can lie).

Pure-domain module: no SQLAlchemy, no FastAPI, no settings imports. The
caller passes ``bytes``; this module classifies + rejects.
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Final

# Public allowlist — single source of truth used by the API layer to
# build error messages and by `tests/security/test_text_file_magic_bytes.py`
# to enumerate fixtures.
ALLOWED_TEXT_FILE_MIMES: Final[frozenset[str]] = frozenset(
    {
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
        "application/rtf",
    }
)

# Soft per-file size cap for text attachments. PDFs can balloon to many
# megabytes when scanned-page-based, but a price-list / service-description
# in the photo-branch should be small. Cap at 15 MB (same as image limit
# in 0.3.0 PHOTO_LIMITS) — anything bigger is suspicious for fake-door.
MAX_TEXT_FILE_BYTES: Final[int] = 15 * 1024 * 1024

# Soft batch caps — per canon 0.3.0 README §FORM_LIMITS.
MAX_TEXT_FILES_COUNT: Final[int] = 10


# Magic-byte signatures. Keep this minimal — no false positives matter
# more than catching every format variant.
_PDF_MAGIC = b"%PDF-"
_ZIP_MAGIC = b"PK\x03\x04"  # DOCX is a ZIP with `word/` entries
_RTF_MAGIC = b"{\\rtf1"


@dataclass(frozen=True)
class TextFileValidationError(Exception):
    """Raised for any per-file validation failure. The ``code`` field is
    the canonical short-string error code returned to the client."""

    code: str
    detail: str = ""

    def __str__(self) -> str:  # pragma: no cover — trivial
        return f"{self.code}: {self.detail}" if self.detail else self.code


def detect_text_file_mime(content: bytes, filename: str) -> str:
    """Sniff the MIME type from the first bytes.

    Returns one of ``ALLOWED_TEXT_FILE_MIMES`` or raises
    ``TextFileValidationError`` with code ``bad_magic_bytes`` if no
    signature matches.

    `filename` is used as a secondary signal for ZIP-based DOCX (since
    plain ZIP and DOCX share the PK\\x03\\x04 magic) and for TXT
    classification (TXT has no magic — we fall back to extension + UTF
    decodability).
    """
    if not content:
        raise TextFileValidationError(code="empty_file")

    head = content[:8]

    # PDF — %PDF-
    if head.startswith(_PDF_MAGIC):
        return "application/pdf"

    # RTF — {\rtf1
    if content[:6] == _RTF_MAGIC:
        return "application/rtf"

    # ZIP-based DOCX
    if head.startswith(_ZIP_MAGIC):
        # A DOCX ZIP contains a `word/` directory entry within the first
        # few KB — scan a bounded window so we don't pay for unpacking
        # the whole archive in tests.
        scan = content[:4096]
        if b"word/" in scan:
            return "application/vnd.openxmlformats-officedocument." "wordprocessingml.document"
        raise TextFileValidationError(
            code="bad_magic_bytes",
            detail="zip without word/ entry — not a docx",
        )

    # TXT — no magic bytes. Fall back to extension hint + UTF
    # decodability. If filename has `.txt` and the first 4 KB decode
    # cleanly as UTF-8 OR Windows-1251 with no NUL bytes, accept.
    lower_name = filename.lower()
    if lower_name.endswith(".txt"):
        sample = content[:4096]
        if b"\x00" in sample:
            raise TextFileValidationError(
                code="bad_magic_bytes",
                detail="txt contains NUL byte — binary content",
            )
        try:
            sample.decode("utf-8")
            return "text/plain"
        except UnicodeDecodeError:
            try:
                sample.decode("windows-1251")
                return "text/plain"
            except UnicodeDecodeError as exc:
                raise TextFileValidationError(
                    code="bad_magic_bytes",
                    detail="txt not utf-8 or windows-1251",
                ) from exc

    raise TextFileValidationError(
        code="bad_magic_bytes",
        detail=f"unrecognised header for {filename!r}",
    )


def validate_text_file(content: bytes, filename: str) -> str:
    """Public single-file validator. Returns the detected MIME on success;
    raises ``TextFileValidationError`` otherwise."""
    if len(content) > MAX_TEXT_FILE_BYTES:
        raise TextFileValidationError(code="file_too_large")
    mime = detect_text_file_mime(content, filename)
    if mime not in ALLOWED_TEXT_FILE_MIMES:
        raise TextFileValidationError(code="bad_magic_bytes", detail=mime)
    return mime


def validate_text_file_batch(
    files: list[tuple[str, bytes]],
) -> list[tuple[str, bytes, str]]:
    """Validate a batch of (filename, content) pairs.

    Returns ``(filename, content, mime)`` triples on success. Raises
    ``TextFileValidationError`` with code ``too_many_files`` if count
    exceeds the cap; per-file validation errors propagate as-is from
    ``validate_text_file``.
    """
    if len(files) > MAX_TEXT_FILES_COUNT:
        raise TextFileValidationError(
            code="too_many_files",
            detail=f"got {len(files)}, max {MAX_TEXT_FILES_COUNT}",
        )
    return [
        (filename, content, validate_text_file(content, filename)) for filename, content in files
    ]
