"""Snapshot sanitizer tests (T3.9, FR-022).

Adapters can emit anything; the sanitizer is the last hop before the
LLM and the DB see the data. Tests verify:

  - HTML/script payloads are stripped (no `<script>` reaches storage)
  - Per-field length caps fire correctly
  - List-length caps fire correctly
  - Empty fields are dropped (no zero-text reviews surviving)
  - Oversized snapshots raise ``SnapshotTooLarge``
  - Metadata scrubbing recurses into nested dicts/lists
"""

from __future__ import annotations

import pytest

from app.core.parsing.ports import (
    ContactRef,
    PhotoRef,
    ReviewRef,
    ServiceItem,
    SourceSnapshot,
    SourceType,
)
from app.core.parsing.sanitizer import (
    MAX_DESCRIPTION_LEN,
    MAX_PHOTOS,
    MAX_REVIEWS,
    SnapshotTooLarge,
    sanitize_snapshot,
)


def _bare(**overrides: object) -> SourceSnapshot:
    base = SourceSnapshot(
        source_type=SourceType.ymaps,
        source_ref="https://yandex.ru/maps/org/1",
    )
    from dataclasses import replace

    return replace(base, **overrides)  # type: ignore[arg-type]


@pytest.mark.security
def test_html_tags_stripped_from_title() -> None:
    s = sanitize_snapshot(_bare(title="<script>alert(1)</script>Анна"))
    assert s.title == "alert(1)Анна"  # tag stripped, text kept
    assert "<" not in (s.title or "")


@pytest.mark.security
def test_html_tags_stripped_from_review_text() -> None:
    s = sanitize_snapshot(
        _bare(reviews=[ReviewRef(author="X", text="<img src=x onerror=alert(1)>")])
    )
    # Without text after stripping the bare tag, review is dropped.
    assert s.reviews == []


@pytest.mark.security
def test_review_with_text_survives_after_strip() -> None:
    s = sanitize_snapshot(
        _bare(reviews=[ReviewRef(author="Маша", text="<b>Отлично!</b>", rating=5)])
    )
    assert len(s.reviews) == 1
    assert s.reviews[0].text == "Отлично!"
    assert s.reviews[0].rating == 5


@pytest.mark.security
def test_invalid_rating_dropped() -> None:
    s = sanitize_snapshot(
        _bare(
            reviews=[
                ReviewRef(author="A", text="ok", rating=99),
                ReviewRef(author="B", text="ok2", rating=-3),
                ReviewRef(author="C", text="ok3", rating=4),
            ]
        )
    )
    assert [r.rating for r in s.reviews] == [None, None, 4]


@pytest.mark.security
def test_description_truncated_at_cap() -> None:
    s = sanitize_snapshot(_bare(description="x" * (MAX_DESCRIPTION_LEN + 500)))
    assert s.description is not None
    assert len(s.description) == MAX_DESCRIPTION_LEN


@pytest.mark.security
def test_photo_list_capped() -> None:
    photos = [PhotoRef(url=f"https://x.example/{i}.jpg") for i in range(MAX_PHOTOS + 5)]
    s = sanitize_snapshot(_bare(photos=photos))
    assert len(s.photos) == MAX_PHOTOS


@pytest.mark.security
def test_review_list_capped() -> None:
    reviews = [ReviewRef(author=None, text=f"r{i}") for i in range(MAX_REVIEWS + 10)]
    s = sanitize_snapshot(_bare(reviews=reviews))
    assert len(s.reviews) == MAX_REVIEWS


@pytest.mark.security
def test_unknown_contact_kind_dropped() -> None:
    s = sanitize_snapshot(
        _bare(
            contacts=[
                ContactRef(kind="phone", value="+7 921 123-45-67"),
                ContactRef(kind="rocket-mail", value="x@y"),  # unknown — dropped
            ]
        )
    )
    assert [c.kind for c in s.contacts] == ["phone"]


@pytest.mark.security
def test_unknown_photo_type_defaulted_to_work() -> None:
    s = sanitize_snapshot(_bare(photos=[PhotoRef(url="https://x/1.jpg", photo_type="exploit")]))
    assert s.photos[0].photo_type == "work"


@pytest.mark.security
def test_empty_photo_record_dropped() -> None:
    """A PhotoRef with neither url nor upload_key has nothing usable."""
    s = sanitize_snapshot(_bare(photos=[PhotoRef(url=None, upload_key=None)]))
    assert s.photos == []


@pytest.mark.security
def test_metadata_html_scrubbed_recursively() -> None:
    s = sanitize_snapshot(
        _bare(
            metadata={
                "hours": [{"day": "<b>Mo</b>", "opens": "10:00"}],
                "rating": 4.8,
            }
        )
    )
    assert s.metadata["hours"][0]["day"] == "Mo"
    assert s.metadata["rating"] == 4.8


@pytest.mark.security
def test_unknown_metadata_types_dropped() -> None:
    class Custom:
        pass

    s = sanitize_snapshot(_bare(metadata={"foo": Custom()}))
    assert s.metadata == {"foo": None}


@pytest.mark.security
def test_oversized_snapshot_raises(monkeypatch: pytest.MonkeyPatch) -> None:
    """The per-field caps almost-always keep us under the 500KB global
    cap — that's the layered defence the sanitizer is supposed to give.
    To exercise the cap-enforcement path itself we lower it via monkey-
    patch and stuff in enough content to breach the tightened limit."""
    from app.core.parsing import sanitizer

    monkeypatch.setattr(sanitizer, "MAX_SNAPSHOT_BYTES", 1_000)

    services = [ServiceItem(title=f"svc{i}", description="x" * 500) for i in range(30)]
    with pytest.raises(SnapshotTooLarge):
        sanitize_snapshot(_bare(services=services))
