"""Auto-sync worker (T7.1).

T0.1 heartbeat placeholder. Real implementation cron-checks
`sites.last_synced_at` every 6 hours and re-parses sources older than 7 days.
"""

from __future__ import annotations

import time

from app.utils.logging import configure_logging, get_logger


def main() -> None:
    configure_logging()
    log = get_logger("workers.sync")
    log.info("sync_worker_started", note="T7.1 will replace heartbeat with RQ-scheduler")
    while True:  # pragma: no cover - heartbeat loop
        time.sleep(60)


if __name__ == "__main__":
    main()
