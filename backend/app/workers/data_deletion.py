"""Data deletion worker (T6.2 — ФЗ-152 right-to-erasure).

T0.1 heartbeat placeholder. Real implementation processes confirmed
`deletion_requests` rows, removes user data within the 10-day SLA, and writes
an immutable record to `admin_actions`.
"""

from __future__ import annotations

import time

from app.utils.logging import configure_logging, get_logger


def main() -> None:
    configure_logging()
    log = get_logger("workers.data_deletion")
    log.info("data_deletion_worker_started", note="T6.2 will replace heartbeat with RQ consumer")
    while True:  # pragma: no cover - heartbeat loop
        time.sleep(60)


if __name__ == "__main__":
    main()
