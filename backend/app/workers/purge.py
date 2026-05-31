"""Hard-purge owner-deleted sites after the grace window (LK4).

When an owner deletes their site from the ЛК (``DELETE /api/lk/site``) the row
is soft-deleted: ``status='pending_purge'`` + ``deleted_at=now``. This worker
hard-deletes any such site whose grace window has elapsed — the ``sites`` row,
which **cascades** its ``leads`` / ``lead_photo`` / ``change_request`` children
(FK ``ondelete=CASCADE``), so all the owner's lead PII is gone for good.

Run on a schedule (daily is plenty — the window is 10 days):

    python -m app.workers.purge

Idempotent: a no-op when nothing is past its window. The owner ``users`` row is
**left in place** (a founder cleans accounts up separately); only the site and
its lead data are purged. Each purge is logged to structlog for audit.
"""

from __future__ import annotations

import asyncio
from datetime import UTC, datetime, timedelta

from sqlalchemy import delete, func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.infrastructure.postgres.engine import get_sessionmaker
from app.infrastructure.postgres.models import Lead, Site
from app.utils.logging import get_logger

GRACE_DAYS = 10


async def purge_expired_sites(
    session: AsyncSession,
    *,
    now: datetime | None = None,
    grace_days: int = GRACE_DAYS,
) -> list[str]:
    """Hard-delete sites soft-deleted longer than ``grace_days`` ago.

    Returns the subdomains purged. Pure-ish (takes a session) so the integration
    test can drive it against a real DB.
    """
    log = get_logger("workers.purge")
    cutoff = (now or datetime.now(UTC)) - timedelta(days=grace_days)

    rows = (
        await session.execute(
            select(Site.id, Site.subdomain).where(
                Site.status == "pending_purge",
                Site.deleted_at.is_not(None),
                Site.deleted_at < cutoff,
            )
        )
    ).all()
    if not rows:
        return []

    purged: list[str] = []
    for site_id, subdomain in rows:
        lead_count = (
            await session.execute(select(func.count(Lead.id)).where(Lead.site_id == site_id))
        ).scalar_one()
        # DELETE the site row → DB cascades leads / lead_photo / change_request.
        await session.execute(delete(Site).where(Site.id == site_id))
        log.info(
            "site_purged",
            site_id=str(site_id),
            subdomain=subdomain,
            leads_purged=int(lead_count),
        )
        purged.append(subdomain)

    await session.commit()
    return purged


async def run(grace_days: int = GRACE_DAYS) -> list[str]:
    sessionmaker = await get_sessionmaker()
    async with sessionmaker() as session:
        return await purge_expired_sites(session, grace_days=grace_days)


def main() -> None:
    purged = asyncio.run(run())
    get_logger("workers.purge").info("purge_run_complete", count=len(purged))
    print(f"purged {len(purged)} site(s): {', '.join(purged) or '—'}")


if __name__ == "__main__":
    main()
