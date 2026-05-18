"""Parser worker entrypoint.

T0.1: minimal heartbeat loop so the container has a runnable command in
docker-compose. T3.1 will replace this with the real RQ worker bound to
`parse_queue`, with URL validation and SSRF guards.
"""

from __future__ import annotations

import time

from app.utils.logging import configure_logging, get_logger


def main() -> None:
    configure_logging()
    log = get_logger("workers.parser")
    log.info("parser_worker_started", note="T3.1 will replace heartbeat with RQ consumer")
    while True:  # pragma: no cover - heartbeat loop
        time.sleep(60)


if __name__ == "__main__":
    main()
