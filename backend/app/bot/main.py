"""Telegram bot entrypoint (aiogram 3.x).

T0.1: heartbeat placeholder. T1.6 wires the admin notifier; T3.4 wires the
parser intake bot (`@VitrinaIntakeBot`); T5.4 wires lead notifications to
end-users.
"""

from __future__ import annotations

import time

from app.utils.logging import configure_logging, get_logger


def main() -> None:
    configure_logging()
    log = get_logger("bot.main")
    log.info("bot_started", note="T1.6 will replace heartbeat with aiogram dispatcher")
    while True:  # pragma: no cover - heartbeat loop
        time.sleep(60)


if __name__ == "__main__":
    main()
