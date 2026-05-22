"""Unit tests для Phase 7b analytics service.

`build_dashboard_payload` — deterministic given pre-aggregated rows.
Tests use in-memory SQLite **NOT** возможна (модели требуют Postgres-
specific JSONB, ON CONFLICT). Тесты integration-grade — против real
Postgres контейнера (CI provides one). Здесь — pure unit для shape
+ delta arithmetic через `to_dict()` round-trip.
"""

from __future__ import annotations

from app.core.analytics.service import (
    ConversionStat,
    DashboardPayload,
    RatingStat,
    SourceShare,
    StatCard,
    TrafficSeries,
    _pct_delta,
)


def test_pct_delta_zero_previous_returns_zero() -> None:
    # Division-by-zero guard: новый сайт, previous period 0 visits.
    assert _pct_delta(100, 0) == 0.0


def test_pct_delta_basic_growth() -> None:
    # 100 → 134 = +34%
    assert _pct_delta(134, 100) == 34.0


def test_pct_delta_basic_decline() -> None:
    # 100 → 78 = -22%
    assert _pct_delta(78, 100) == -22.0


def test_to_dict_shape_matches_v213_spec() -> None:
    """Payload structure должна matchить v2.1.3 §2.2:
    {stats: {visits, leads, conversion, rating}, traffic, sources}."""
    payload = DashboardPayload(
        stats_visits=StatCard(total=2847, delta_pct=18.0, sparkline=[100] * 30),
        stats_leads=StatCard(total=78, delta_pct=34.0, sparkline=[2] * 30),
        stats_conversion=ConversionStat(value_pct=2.7, delta_pp=0.4, sparkline=[2.5] * 30),
        stats_rating=RatingStat(value=4.9, delta=0.1, sparkline=[4.9] * 30),
        traffic=TrafficSeries(days=30, visits=[100] * 30, leads=[2] * 30),
        sources=[
            SourceShare(name="Я.Карты", share=45, color="#FFCC00"),
            SourceShare(name="Telegram", share=28, color="#229ED9"),
            SourceShare(name="Прямые", share=15, color="var(--accent, #c66333)"),
            SourceShare(name="2ГИС", share=8, color="#19BB4F"),
            SourceShare(name="Google", share=4, color="#EA4335"),
        ],
    )

    out = payload.to_dict()

    # Top-level keys
    assert set(out.keys()) == {"stats", "traffic", "sources"}

    # stats.* shape — must match frontend AnalyticsSection consumption
    stats = out["stats"]
    assert set(stats.keys()) == {"visits", "leads", "conversion", "rating"}
    assert stats["visits"]["total"] == 2847
    assert stats["visits"]["delta_pct"] == 18.0
    assert len(stats["visits"]["sparkline"]) == 30

    # conversion — string with % suffix
    assert stats["conversion"]["value"] == "2.7%"
    assert stats["conversion"]["delta_pp"] == 0.4

    # rating — float, not string
    assert stats["rating"]["value"] == 4.9

    # traffic
    assert out["traffic"]["days"] == 30
    assert len(out["traffic"]["visits"]) == 30
    assert len(out["traffic"]["leads"]) == 30

    # sources — list of {name, share, color}, sorted by share desc (in
    # production это produce'ит build_dashboard_payload; здесь
    # provider дал уже sorted).
    assert len(out["sources"]) == 5
    assert out["sources"][0]["name"] == "Я.Карты"
    assert out["sources"][0]["share"] == 45
    assert out["sources"][0]["color"] == "#FFCC00"
