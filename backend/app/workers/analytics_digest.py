"""Weekly analytics digest worker (Phase 7b / v2.1.3 §2.2).

Cron schedule: вторник 09:00 МСК (06:00 UTC). Iterates published sites,
computes 7-day analytics summary, sends via owner's contact channel.

Idempotent through `site_analytics_digest_log`: если sent_at >
now() - 6 days для (site_id) — skip. Защита от double-send при
cron-overlap или manual re-trigger из admin UI.

Stub heartbeat для T0.1 deploy parity — real cron loop wires up to
RQ-scheduler when Phase 7b backend ships fully (this PR scaffolds
the service; scheduler glue follows in deploy-phase iteration).

Manual invocation для testing:
    poetry run python -m app.workers.analytics_digest --once --site-id <uuid>
"""

from __future__ import annotations

import asyncio
import time
from datetime import UTC, datetime, timedelta
from uuid import UUID

from sqlalchemy import exists, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.analytics.service import build_dashboard_payload
from app.core.notify.dispatcher import NotificationDispatcher, UserContact
from app.core.notify.ports import (
    ChannelType,
    NotificationKind,
    NotificationMessage,
)
from app.infrastructure.postgres.models import (
    Site,
    SiteAnalyticsDigestLog,
    User,
)
from app.utils.logging import configure_logging, get_logger

_log = get_logger("workers.analytics_digest")

# Skip-window: не отправлять digest если предыдущий < 6 дней назад.
# Cron runs weekly, но manual trigger / RQ retry должны быть idempotent.
_RECENT_DIGEST_WINDOW = timedelta(days=6)


async def send_weekly_digest_for_site(
    *,
    session: AsyncSession,
    dispatcher: NotificationDispatcher,
    site: Site,
    owner: User,
) -> bool:
    """Process a single site. Returns True if digest was sent, False if
    skipped (already-sent в окне или zero traffic за неделю).

    Caller responsible for committing the session — на cron-run всех
    sites коммит идёт после успешного delivery loop'а каждые N сайтов,
    чтобы partial failures не блокировали весь run.
    """
    # Skip if already sent recently (idempotency).
    cutoff = datetime.now(UTC) - _RECENT_DIGEST_WINDOW
    skip_q = select(
        exists().where(
            SiteAnalyticsDigestLog.site_id == site.id,
            SiteAnalyticsDigestLog.sent_at >= cutoff,
        )
    )
    if (await session.execute(skip_q)).scalar():
        _log.info("digest_skip_already_sent", site_id=str(site.id))
        return False

    # Compute 7-day stats. Re-uses range-query function shared с endpoint.
    payload = await build_dashboard_payload(
        session=session,
        site_id=site.id,
        range_days=7,
        rating=0.0,
        rating_prev=0.0,
    )
    visits = payload.stats_visits.total
    leads = payload.stats_leads.total
    delta_pct = payload.stats_visits.delta_pct

    # Zero-traffic skip — no point spamming мастера тишиной.
    if visits == 0:
        _log.info("digest_skip_zero_traffic", site_id=str(site.id))
        return False

    # Best-day peak — argmax над daily series.
    best_day_offset = (
        max(range(len(payload.traffic.visits)), key=lambda i: payload.traffic.visits[i])
        if payload.traffic.visits
        else 0
    )
    best_day_date = datetime.now(UTC).date() - timedelta(days=6 - best_day_offset)
    best_day_ru = _format_weekday_ru(best_day_date.weekday())

    body = (
        f"За неделю — {visits} посещений ({_signed_pct(delta_pct)}), "
        f"{leads} заявок, лучший день — {best_day_ru}"
    )

    contact = _owner_contact(owner)
    delivery = await dispatcher.notify_user(
        contact=contact,
        kind=NotificationKind.weekly_digest,
        message=NotificationMessage(
            title="Сводка за неделю",
            body=body,
            links=(),
        ),
    )
    if not delivery.delivered:
        _log.warning(
            "digest_delivery_failed",
            site_id=str(site.id),
            channel=delivery.channel.value,
            reason=delivery.reason,
        )
        return False

    # Audit log — successful delivery.
    session.add(
        SiteAnalyticsDigestLog(
            site_id=site.id,
            channel=delivery.channel.value,
        )
    )
    _log.info(
        "digest_sent",
        site_id=str(site.id),
        channel=delivery.channel.value,
        visits=visits,
        leads=leads,
    )
    return True


def _signed_pct(value: float) -> str:
    """`+18%` или `-22%` для display."""
    sign = "+" if value >= 0 else ""
    return f"{sign}{value:.0f}%"


_WEEKDAY_RU = ("понедельник", "вторник", "среда", "четверг", "пятница", "суббота", "воскресенье")


def _format_weekday_ru(weekday_idx: int) -> str:
    return _WEEKDAY_RU[weekday_idx]


def _owner_contact(owner: User) -> UserContact:
    primary = ChannelType(owner.contact_type)
    return UserContact(
        primary_type=primary,
        primary_value=owner.contact_value,
        alt_type=None,
        alt_value=None,
    )


# ──────────────────────────────────────────────────────────────────────────
# Heartbeat entrypoint
# ──────────────────────────────────────────────────────────────────────────


def main() -> None:
    """T0.1 heartbeat placeholder.

    Real cron loop wires up to RQ-scheduler с trigger
    `0 6 * * 2` (вторник 06:00 UTC = 09:00 МСК). When scheduler glue
    lands, this `main()` becomes the entrypoint that iterates published
    sites через `send_weekly_digest_for_site`.
    """
    configure_logging()
    log = get_logger("workers.analytics_digest")
    log.info(
        "analytics_digest_started",
        note="Phase 7b heartbeat — scheduler glue в follow-up PR",
    )
    while True:  # pragma: no cover — heartbeat loop
        time.sleep(60)


# Suppress unused import warnings — UUID, asyncio kept для main() expansion
# when scheduler-driven run-once flow lands.
_ = (asyncio, UUID)


if __name__ == "__main__":  # pragma: no cover
    main()
