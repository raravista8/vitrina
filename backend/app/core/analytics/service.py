"""Analytics aggregation service (Phase 7b / v2.1.3 §2.2).

Computes the `/api/admin/analytics?range=30d` payload that powers the
customer-site владельца dashboard (the same UI shown demo'д on the
landing AnalyticsSection).

Two responsibilities:

1. **Daily nightly aggregation** — `aggregate_day_for_site` consumes
   the `events` table for a single (site, day) pair and produces a
   row для `site_analytics`. Idempotent — `INSERT ... ON CONFLICT DO
   UPDATE` пере-aggregate'ит if events appeared late.

2. **Range query** — `build_dashboard_payload` reads pre-aggregated
   `site_analytics` rows for the last N days and returns the
   structured payload matching v2.1.3 §2.2 schema. UI code (frontend
   AnalyticsSection) знает exact field names.

Pure domain — no HTTP, no Jinja. The admin endpoint wraps this and
adds AuthZ + rate-limit. Cron worker calls `aggregate_day_for_site` in
a loop over published sites.
"""

from __future__ import annotations

from dataclasses import dataclass
from datetime import UTC, datetime, time, timedelta
from datetime import date as date_type
from typing import Any
from uuid import UUID

from sqlalchemy import Select, case, func, literal_column, select, text
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy.ext.asyncio import AsyncSession

from app.infrastructure.postgres.models import Event, SiteAnalytics

# Source mapping: tag pageview/click events с `payload.source` (set by
# tracking pixel from query-param `?utm_source=...` или referrer parse).
# Unknown / direct visits — fallback bucket «direct».
_KNOWN_SOURCES: dict[str, str] = {
    "yandex_maps": "Я.Карты",
    "yandex": "Я.Карты",
    "telegram": "Telegram",
    "tg": "Telegram",
    "twogis": "2ГИС",
    "2gis": "2ГИС",
    "google": "Google",
    "direct": "Прямые",
}


# ──────────────────────────────────────────────────────────────────────────
# Daily aggregation (cron-side)
# ──────────────────────────────────────────────────────────────────────────


async def aggregate_day_for_site(
    *,
    session: AsyncSession,
    site_id: UUID,
    day: date_type,
) -> SiteAnalytics:
    """Aggregate `events` for one (site, day) и upsert `site_analytics`.

    Computes:
      • visits — count of `pageview` events
      • leads  — count of `form_submit` events
      • unique_visitors — `COUNT(DISTINCT payload->>'ip_hash')` для
        pageview (Tracking pixel hashes IP server-side per PRD privacy
        — мы не храним raw IPs длиннее минуты).
      • source_breakdown — `{source_label: count}` для pageview,
        normalized to percentages.

    Idempotent: upserts через ON CONFLICT, повторный run за тот же day
    пере-записывает row.
    """
    start = datetime.combine(day, time.min, tzinfo=UTC)
    end = start + timedelta(days=1)

    # Single query — visits/leads/unique counts. Postgres `FILTER` clause
    # позволяет conditional aggregation без 3 раздельных queries.
    stats_q = select(
        func.count().filter(Event.event_type == "pageview").label("visits"),
        func.count().filter(Event.event_type == "form_submit").label("leads"),
        func.count(func.distinct(literal_column("payload->>'ip_hash'")))
        .filter(Event.event_type == "pageview")
        .label("unique_visitors"),
    ).where(
        Event.site_id == site_id,
        Event.created_at >= start,
        Event.created_at < end,
    )
    stats_row = (await session.execute(stats_q)).one()
    visits = int(stats_row.visits or 0)
    leads = int(stats_row.leads or 0)
    unique = int(stats_row.unique_visitors or 0)

    # Source breakdown — group pageview events by `payload.source`.
    sources_q: Select[Any] = (
        select(
            func.coalesce(literal_column("payload->>'source'"), literal_column("'direct'")).label(
                "source"
            ),
            func.count().label("hits"),
        )
        .where(
            Event.site_id == site_id,
            Event.event_type == "pageview",
            Event.created_at >= start,
            Event.created_at < end,
        )
        .group_by(literal_column("payload->>'source'"))
    )
    rows = (await session.execute(sources_q)).all()
    breakdown_raw: dict[str, int] = {
        _KNOWN_SOURCES.get(str(r.source or "").lower(), "Другое"): int(r.hits or 0) for r in rows
    }
    # Normalize to integer percentages (sum-to-100 caveat: rounding can
    # produce 99 or 101 — UI sums into stacked bar where 1pp drift is
    # invisible). Skip if zero traffic.
    total_hits = sum(breakdown_raw.values())
    breakdown_pct: dict[str, int] = (
        {k: round(v * 100 / total_hits) for k, v in breakdown_raw.items()} if total_hits > 0 else {}
    )

    stmt = insert(SiteAnalytics).values(
        site_id=site_id,
        date=day,
        visits=visits,
        unique_visitors=unique,
        leads=leads,
        source_breakdown=breakdown_pct,
    )
    stmt = stmt.on_conflict_do_update(
        index_elements=["site_id", "date"],
        set_={
            "visits": stmt.excluded.visits,
            "unique_visitors": stmt.excluded.unique_visitors,
            "leads": stmt.excluded.leads,
            "source_breakdown": stmt.excluded.source_breakdown,
        },
    )
    await session.execute(stmt)
    await session.flush()

    return (
        await session.execute(
            select(SiteAnalytics).where(SiteAnalytics.site_id == site_id, SiteAnalytics.date == day)
        )
    ).scalar_one()


# ──────────────────────────────────────────────────────────────────────────
# Range query (endpoint-side)
# ──────────────────────────────────────────────────────────────────────────


@dataclass(frozen=True, slots=True)
class StatCard:
    total: int
    delta_pct: float
    sparkline: list[int]


@dataclass(frozen=True, slots=True)
class ConversionStat:
    value_pct: float  # e.g. 2.7 means 2.7%
    delta_pp: float  # percentage points delta
    sparkline: list[float]


@dataclass(frozen=True, slots=True)
class RatingStat:
    value: float  # e.g. 4.9
    delta: float
    sparkline: list[float]


@dataclass(frozen=True, slots=True)
class TrafficSeries:
    days: int
    visits: list[int]
    leads: list[int]


@dataclass(frozen=True, slots=True)
class SourceShare:
    name: str
    share: int  # percent integer
    color: str  # hex/oklch для UI


@dataclass(frozen=True, slots=True)
class DashboardPayload:
    stats_visits: StatCard
    stats_leads: StatCard
    stats_conversion: ConversionStat
    stats_rating: RatingStat
    traffic: TrafficSeries
    sources: list[SourceShare]

    def to_dict(self) -> dict[str, Any]:
        return {
            "stats": {
                "visits": {
                    "total": self.stats_visits.total,
                    "delta_pct": self.stats_visits.delta_pct,
                    "sparkline": self.stats_visits.sparkline,
                },
                "leads": {
                    "total": self.stats_leads.total,
                    "delta_pct": self.stats_leads.delta_pct,
                    "sparkline": self.stats_leads.sparkline,
                },
                "conversion": {
                    "value": f"{self.stats_conversion.value_pct:.1f}%",
                    "delta_pp": self.stats_conversion.delta_pp,
                    "sparkline": self.stats_conversion.sparkline,
                },
                "rating": {
                    "value": self.stats_rating.value,
                    "delta": self.stats_rating.delta,
                    "sparkline": self.stats_rating.sparkline,
                },
            },
            "traffic": {
                "days": self.traffic.days,
                "visits": self.traffic.visits,
                "leads": self.traffic.leads,
            },
            "sources": [{"name": s.name, "share": s.share, "color": s.color} for s in self.sources],
        }


# Source colors — mirror frontend AnalyticsSection.tsx const for visual
# consistency. Falls back to grey for unknown sources.
_SOURCE_COLORS: dict[str, str] = {
    "Я.Карты": "#FFCC00",
    "Telegram": "#229ED9",
    "Прямые": "var(--accent, #c66333)",
    "2ГИС": "#19BB4F",
    "Google": "#EA4335",
    "Другое": "#9C8F82",
}


async def build_dashboard_payload(
    *,
    session: AsyncSession,
    site_id: UUID,
    range_days: int = 30,
    rating: float = 0.0,
    rating_prev: float = 0.0,
) -> DashboardPayload:
    """Read `site_analytics` rows для последних `range_days` and build
    structured payload for the admin dashboard / customer-site owner UI.

    Compares to **previous equal-length period** для delta computation
    (e.g. last 30 days vs preceding 30). If нет данных в previous
    period — delta_pct = 0.

    `rating` / `rating_prev` are passed by the caller (admin endpoint
    pulls them from `sites.average_rating` history table — out of scope
    этого PR'а, stub `0.0` для smoke).
    """
    today = datetime.now(UTC).date()
    start_curr = today - timedelta(days=range_days - 1)
    start_prev = start_curr - timedelta(days=range_days)
    end_prev = start_curr - timedelta(days=1)

    # Current range — daily series.
    rows_curr = (
        (
            await session.execute(
                select(SiteAnalytics)
                .where(
                    SiteAnalytics.site_id == site_id,
                    SiteAnalytics.date >= start_curr,
                    SiteAnalytics.date <= today,
                )
                .order_by(SiteAnalytics.date.asc())
            )
        )
        .scalars()
        .all()
    )

    # Previous range — totals only (for delta computation).
    prev_q = select(
        func.coalesce(func.sum(SiteAnalytics.visits), 0).label("visits"),
        func.coalesce(func.sum(SiteAnalytics.leads), 0).label("leads"),
    ).where(
        SiteAnalytics.site_id == site_id,
        SiteAnalytics.date >= start_prev,
        SiteAnalytics.date <= end_prev,
    )
    prev = (await session.execute(prev_q)).one()
    prev_visits = int(prev.visits or 0)
    prev_leads = int(prev.leads or 0)

    # Pad zero-fill для отсутствующих дней (sparkline должен иметь
    # range_days entries для стабильного UI rendering).
    by_date: dict[date_type, SiteAnalytics] = {r.date: r for r in rows_curr}
    visits_series: list[int] = []
    leads_series: list[int] = []
    for offset in range(range_days):
        d = start_curr + timedelta(days=offset)
        row = by_date.get(d)
        visits_series.append(int(row.visits) if row else 0)
        leads_series.append(int(row.leads) if row else 0)

    total_visits = sum(visits_series)
    total_leads = sum(leads_series)

    delta_visits = _pct_delta(total_visits, prev_visits)
    delta_leads = _pct_delta(total_leads, prev_leads)

    conv_curr = (total_leads / total_visits * 100) if total_visits else 0.0
    conv_prev = (prev_leads / prev_visits * 100) if prev_visits else 0.0
    conv_series: list[float] = [
        round((leads_series[i] / visits_series[i] * 100), 2) if visits_series[i] else 0.0
        for i in range(range_days)
    ]

    # Sources — sum breakdown over the range, re-normalize to percent.
    sources_acc: dict[str, int] = {}
    for r in rows_curr:
        for k, v in (r.source_breakdown or {}).items():
            sources_acc[k] = sources_acc.get(k, 0) + int(v)
    total_share = sum(sources_acc.values()) or 1
    sources_list = sorted(
        (
            SourceShare(
                name=k,
                share=round(v * 100 / total_share),
                color=_SOURCE_COLORS.get(k, "#9C8F82"),
            )
            for k, v in sources_acc.items()
        ),
        key=lambda s: -s.share,
    )

    # Sparkline для visits/leads — re-use raw daily series (мы не
    # делаем moving-average т.к. recharts AreaChart smoothes by `type
    # ="monotone"`).
    rating_series: list[float] = [rating] * range_days  # stub

    return DashboardPayload(
        stats_visits=StatCard(total=total_visits, delta_pct=delta_visits, sparkline=visits_series),
        stats_leads=StatCard(total=total_leads, delta_pct=delta_leads, sparkline=leads_series),
        stats_conversion=ConversionStat(
            value_pct=round(conv_curr, 1),
            delta_pp=round(conv_curr - conv_prev, 2),
            sparkline=conv_series,
        ),
        stats_rating=RatingStat(
            value=round(rating, 1),
            delta=round(rating - rating_prev, 2),
            sparkline=rating_series,
        ),
        traffic=TrafficSeries(
            days=range_days,
            visits=visits_series,
            leads=leads_series,
        ),
        sources=sources_list,
    )


def _pct_delta(curr: int, prev: int) -> float:
    """Compute (curr − prev) / prev × 100. Returns 0.0 если prev = 0."""
    if prev == 0:
        return 0.0
    return round((curr - prev) * 100 / prev, 1)


# Suppress unused imports — `case`, `text` reserved для future SQL helpers.
_ = (case, text)
