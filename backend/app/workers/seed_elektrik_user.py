"""Set the elektrik-spb customer-ЛК password (one-off, run at provision time).

The owner ``users`` row (login ``elektrik-spb``) is created by
``infra/scripts/provision-elektrik.sql`` with ``password_hash`` NULL. This
sets/rotates it so the master can log in at ``samosite.online/login`` →
``/lk``. Auth is verified by ``POST /api/auth/login`` against the bcrypt hash.

Password from the ``ELEKTRIK_PASSWORD`` env var — **never** hard-coded/committed:

    ELEKTRIK_PASSWORD='<the password>' python -m app.workers.seed_elektrik_user

Idempotent: re-running rotates the password. The row must already exist
(run the provisioning SQL first); we never create it here (keeps the site_id
↔ user binding in one place — the SQL).
"""

from __future__ import annotations

import asyncio
import os

from sqlalchemy import select

from app.core.auth.admin import hash_password
from app.infrastructure.postgres.engine import get_sessionmaker
from app.infrastructure.postgres.models import User
from app.utils.logging import get_logger

LOGIN = "elektrik-spb"


async def seed(password: str) -> str:
    sessionmaker = await get_sessionmaker()
    async with sessionmaker() as session:
        existing = (
            await session.execute(select(User).where(User.login == LOGIN))
        ).scalar_one_or_none()
        if existing is None:
            raise SystemExit(
                f"users row login='{LOGIN}' not found — run "
                "infra/scripts/provision-elektrik.sql first."
            )
        existing.password_hash = hash_password(password)
        await session.commit()
    return "rotated"


def main() -> None:
    password = os.environ.get("ELEKTRIK_PASSWORD")
    if not password:
        raise SystemExit(
            "Set ELEKTRIK_PASSWORD (the initial password) — never commit it.\n"
            "  ELEKTRIK_PASSWORD='…' python -m app.workers.seed_elektrik_user"
        )
    action = asyncio.run(seed(password))
    get_logger("workers.seed_elektrik_user").info("elektrik_user_seeded", action=action)
    print(f"elektrik login {action}: login='{LOGIN}'")


if __name__ == "__main__":
    main()
