"""Tests for review curation service + PII filter (E13 / ADR-0010)."""

from __future__ import annotations

import pytest

from app.core.reviews import (
    CuratedReview,
    CurationInput,
    drop_reviews_with_pii,
)
from app.core.reviews.pii_filter import contains_pii
from app.core.reviews.service import curate


def _r(
    *,
    id: str = "1",
    author: str = "Анна",
    text: str = "Отличный мастер, рекомендую всем своим друзьям!",
    rating: int = 5,
    date_iso: str = "2026-04-12",
) -> CuratedReview:
    return CuratedReview(
        id=id,
        author=author,
        text=text,
        rating=rating,
        date_iso=date_iso,
        is_top_pick=False,
    )


@pytest.mark.unit
class TestCurateService:
    @pytest.mark.asyncio
    async def test_returns_all_when_fewer_than_min(self) -> None:
        """ADR-0010 edge: <4 reviews → show all, no is_top_pick flag."""
        result = await curate(
            CurationInput(reviews=[_r(id="a"), _r(id="b")], category="маникюр"),
        )
        assert len(result.reviews) == 2
        assert all(not r.is_top_pick for r in result.reviews)
        assert result.reasoning == "below_min_threshold_no_curation"
        assert result.model_version == "fallback"

    @pytest.mark.asyncio
    async def test_empty_when_all_low_rating(self) -> None:
        """ADR-0010 edge: all reviews ≤3★ → return empty, caller hides + alerts."""
        low_rated = [
            _r(id=str(i), rating=3, text="нормально, ничего особенного " * 2) for i in range(8)
        ]
        result = await curate(CurationInput(reviews=low_rated, category="маникюр"))
        assert result.reviews == []
        assert "alert_founder" in result.reasoning

    @pytest.mark.asyncio
    async def test_fallback_to_top_n_when_no_curator(self) -> None:
        """No curator wired → ORDER BY rating DESC, length(text) DESC LIMIT 6."""
        reviews = [
            _r(id=f"r{i}", rating=5 if i < 3 else 4, text="хорошо " * (10 - i)) for i in range(8)
        ]
        result = await curate(CurationInput(reviews=reviews, category="маникюр"))
        # ≤6 returned
        assert len(result.reviews) <= 6
        # All are decent (rating ≥ 4)
        assert all(r.rating >= 4 for r in result.reviews)
        # No is_top_pick because we don't have LLM reasoning to back it
        assert all(not r.is_top_pick for r in result.reviews)
        assert result.reasoning == "fallback_top_n_by_rating"

    @pytest.mark.asyncio
    async def test_filters_out_low_rated_then_falls_back(self) -> None:
        """Mix of 5★, 4★, 3★ — only 5★+4★ should survive the pre-filter."""
        mixed = [
            _r(id="a", rating=5),
            _r(id="b", rating=4),
            _r(id="c", rating=3),
            _r(id="d", rating=5),
            _r(id="e", rating=4),
        ]
        result = await curate(CurationInput(reviews=mixed, category="маникюр"))
        ids = {r.id for r in result.reviews}
        assert "c" not in ids  # 3★ excluded
        assert {"a", "b", "d", "e"}.issubset(ids)


@pytest.mark.unit
class TestPIIFilter:
    @pytest.mark.parametrize(
        "text",
        [
            "Отличный мастер! Звоните 8 (916) 555-12-34, не пожалеете",
            "Контакт: +7 916 738 86 89",
            "Связь: 9167388689",
            "Пишите на anna@example.com",
            "Мастер — Иван Иванович Петров, лучший в городе",
            "Найдёте на улице Ленина 5",
            "Мастер находится на пр-кт Мира 7",
        ],
    )
    def test_detects_pii(self, text: str) -> None:
        assert contains_pii(text), f"Should flag PII: {text!r}"

    @pytest.mark.parametrize(
        "text",
        [
            "Анна — настоящий мастер. 8 лет опыта, не пожалела ни разу!",
            "Хожу к Анне три года, рекомендую всем подругам.",
            "Сделала ровно так, как я хотела. Спасибо!",
            "Стоит каждой потраченной минуты — придёшь в 9 утра, выйдешь радостной",
        ],
    )
    def test_clean_text_passes(self, text: str) -> None:
        assert not contains_pii(text), f"False positive on: {text!r}"

    def test_drop_filters_only_pii_ones(self) -> None:
        reviews = [
            _r(id="ok1", text="Лучший мастер, спасибо!"),
            _r(id="leak1", text="Звоните 8 916 555 12 34"),
            _r(id="ok2", text="Очень хороший салон, тёплая атмосфера."),
            _r(id="leak2", text="Контакт: maria@test.ru"),
        ]
        cleaned = drop_reviews_with_pii(reviews)
        assert {r.id for r in cleaned} == {"ok1", "ok2"}
