"""Snapshot sanitizer (T3.9, FR-022).

Every adapter routes its result through ``sanitize_snapshot`` before
the worker writes ``sites.source_snapshot`` to the DB. The sanitizer:

  - strips all HTML from text fields via ``bleach.clean`` (no tags, no
    attributes — adapter output is plain text by contract; anything
    HTML-ish is parser leakage we don't trust)
  - truncates strings to a per-field maximum (defence-in-depth against
    a compromised adapter generating multi-MB payloads)
  - enforces a hard overall ≤500 KB cap on the serialised JSON
  - drops empty entries (an empty review with no text becomes nothing)

Defence-in-depth: even if a parser is compromised through a malicious
TG post or YMaps response, the LLM never sees raw scraped HTML and the
template's autoescape would catch any residue.
"""

from __future__ import annotations

import json
from dataclasses import asdict, replace

import bleach

from app.core.parsing.ports import (
    ContactRef,
    PhotoRef,
    ReviewRef,
    ServiceItem,
    SourceSnapshot,
)

# Per-field caps. Numbers picked so the per-snapshot JSON sits well
# under the overall MAX_SNAPSHOT_BYTES even at max field counts.
MAX_TITLE_LEN = 200
MAX_DESCRIPTION_LEN = 2_000
MAX_REVIEW_LEN = 2_000
MAX_SERVICE_DESC_LEN = 500
MAX_CONTACT_VALUE_LEN = 256
MAX_PHOTOS = 20
MAX_REVIEWS = 20
MAX_SERVICES = 30
MAX_CONTACTS = 10
MAX_SNAPSHOT_BYTES = 500_000


class SnapshotTooLargeError(ValueError):
    """Raised when the post-sanitize JSON still exceeds the cap. The
    worker logs this and marks the application for manual review."""


# Back-compat alias so call sites can import either name.
SnapshotTooLarge = SnapshotTooLargeError


def sanitize_snapshot(snapshot: SourceSnapshot) -> SourceSnapshot:
    """Return a new snapshot with all text scrubbed + lists capped.

    Pure function — input snapshot is not mutated. Use ``replace`` so
    the dataclass-frozen contract holds.
    """
    cleaned = replace(
        snapshot,
        title=_clean_text(snapshot.title, MAX_TITLE_LEN),
        description=_clean_text(snapshot.description, MAX_DESCRIPTION_LEN),
        contacts=_clean_contacts(snapshot.contacts),
        photos=_clean_photos(snapshot.photos),
        reviews=_clean_reviews(snapshot.reviews),
        services=_clean_services(snapshot.services),
        metadata=_clean_metadata(snapshot.metadata),
    )
    _enforce_size(cleaned)
    return cleaned


# --- per-field cleaners ----------------------------------------------------


def _clean_text(value: str | None, cap: int) -> str | None:
    if value is None:
        return None
    # bleach with empty tag list strips all HTML. ``strip=True`` removes
    # the tags rather than escaping them, which is the right move for
    # data destined for the LLM (we don't want literal "<p>" tokens
    # influencing generation).
    cleaned = bleach.clean(value, tags=[], attributes={}, strip=True)
    # Normalise whitespace — preserve newlines but collapse runs.
    cleaned = "\n".join(line.strip() for line in cleaned.splitlines())
    cleaned = cleaned.strip()
    if not cleaned:
        return None
    return cleaned[:cap]


def _clean_contacts(contacts: list[ContactRef]) -> list[ContactRef]:
    out: list[ContactRef] = []
    for c in contacts[:MAX_CONTACTS]:
        value = _clean_text(c.value, MAX_CONTACT_VALUE_LEN)
        if value is None:
            continue
        if c.kind not in {"phone", "email", "website", "telegram"}:
            continue
        out.append(ContactRef(kind=c.kind, value=value))
    return out


def _clean_photos(photos: list[PhotoRef]) -> list[PhotoRef]:
    out: list[PhotoRef] = []
    for p in photos[:MAX_PHOTOS]:
        url = _clean_text(p.url, 1024) if p.url else None
        upload_key = _clean_text(p.upload_key, 512) if p.upload_key else None
        if url is None and upload_key is None:
            continue
        alt = _clean_text(p.alt, 256)
        photo_type = (
            p.photo_type
            if p.photo_type in {"work", "profile_screenshot", "business_card", "booklet"}
            else "work"
        )
        out.append(PhotoRef(url=url, upload_key=upload_key, alt=alt, photo_type=photo_type))
    return out


def _clean_reviews(reviews: list[ReviewRef]) -> list[ReviewRef]:
    out: list[ReviewRef] = []
    for r in reviews[:MAX_REVIEWS]:
        text = _clean_text(r.text, MAX_REVIEW_LEN)
        if text is None:
            continue
        rating = r.rating if isinstance(r.rating, int) and 1 <= r.rating <= 5 else None
        out.append(
            ReviewRef(
                author=_clean_text(r.author, 100),
                text=text,
                rating=rating,
            )
        )
    return out


def _clean_services(services: list[ServiceItem]) -> list[ServiceItem]:
    out: list[ServiceItem] = []
    for s in services[:MAX_SERVICES]:
        title = _clean_text(s.title, 200)
        if title is None:
            continue
        out.append(
            ServiceItem(
                title=title,
                description=_clean_text(s.description, MAX_SERVICE_DESC_LEN),
                price_label=_clean_text(s.price_label, 64),
            )
        )
    return out


def _clean_metadata(metadata: dict[str, object]) -> dict[str, object]:
    """Metadata is source-specific (rating, geo, hours). We allow
    primitives + nested dicts/lists of primitives but scrub any strings.
    """
    return _scrub(metadata, depth=0)  # type: ignore[return-value]


def _scrub(value: object, *, depth: int) -> object:
    if depth > 4:
        return None
    if isinstance(value, str):
        return _clean_text(value, 2_000)
    if isinstance(value, int | float | bool) or value is None:
        return value
    if isinstance(value, list):
        return [_scrub(v, depth=depth + 1) for v in value[:50]]
    if isinstance(value, dict):
        return {str(k)[:128]: _scrub(v, depth=depth + 1) for k, v in list(value.items())[:50]}
    return None  # drop anything we don't understand


def _enforce_size(snapshot: SourceSnapshot) -> None:
    """Last-ditch cap. The per-field truncation usually keeps us well
    below this, but a snapshot with 20 maxed-out reviews + 30 maxed-out
    services could still bust the limit."""

    def _as_dict(s: SourceSnapshot) -> dict[str, object]:
        return {
            "source_type": s.source_type.value,
            "source_ref": s.source_ref,
            "title": s.title,
            "description": s.description,
            "contacts": [asdict(c) for c in s.contacts],
            "photos": [asdict(p) for p in s.photos],
            "reviews": [asdict(r) for r in s.reviews],
            "services": [asdict(svc) for svc in s.services],
            "metadata": s.metadata,
        }

    payload = json.dumps(_as_dict(snapshot), ensure_ascii=False)
    if len(payload.encode("utf-8")) > MAX_SNAPSHOT_BYTES:
        raise SnapshotTooLargeError(f"snapshot_exceeds_{MAX_SNAPSHOT_BYTES}_bytes")
