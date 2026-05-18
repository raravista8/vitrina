"""Content worker entrypoint (LLM generation via YandexGPT).

T0.1: heartbeat placeholder. T4.1 will replace with RQ consumer for
`generation_queue`, with PII obfuscation (T4.2) and output sanitization (T4.4).
"""

from __future__ import annotations

import time

from app.utils.logging import configure_logging, get_logger


def main() -> None:
    configure_logging()
    log = get_logger("workers.content")
    log.info("content_worker_started", note="T4.1 will replace heartbeat with RQ consumer")
    while True:  # pragma: no cover - heartbeat loop
        time.sleep(60)


if __name__ == "__main__":
    main()
