"""Provision the milreview customer login (one-off, run at publish time).

Creates (or rotates the password of) the ``users`` row the master logs in with
at ``samosite.online/login`` → ``/admin-demo``. The platform's customer auth
(``POST /api/auth/login``) verifies ``{login, password}`` against this row's
bcrypt ``password_hash`` (canon 0.4.0).

The password is read from the ``MILREVIEW_PASSWORD`` env var — **never** hard-coded
or committed. Run inside the api container:

    MILREVIEW_PASSWORD='<the password>' python -m app.workers.seed_milreview_user

Idempotent: re-running with the row present rotates the password (and re-marks
the plan ``pro``); the contact identity (``email`` / ``info@milreview.ru``) is
left untouched.

milreview is served as static files from S3 (see ``publish_milreview``), so this
row is all the DB needs — there is intentionally **no** ``sites`` row (the
content site never goes through the LLM booking-site publish/sync pipeline).
"""

from __future__ import annotations

import asyncio
import os

from sqlalchemy import select

from app.core.auth.admin import hash_password
from app.infrastructure.postgres.engine import get_sessionmaker
from app.infrastructure.postgres.models import User
from app.utils.logging import get_logger

LOGIN = "milreview"
CONTACT_TYPE = "email"
CONTACT_VALUE = "info@milreview.ru"
PLAN = "pro"  # content client — full plan, no «Сделано на Самосайте» watermark


async def seed(password: str) -> str:
    sessionmaker = await get_sessionmaker()
    async with sessionmaker() as session:
        existing = (
            await session.execute(select(User).where(User.login == LOGIN))
        ).scalar_one_or_none()
        if existing is not None:
            existing.password_hash = hash_password(password)
            existing.plan = PLAN
            action = "rotated"
        else:
            session.add(
                User(
                    contact_type=CONTACT_TYPE,
                    contact_value=CONTACT_VALUE,
                    plan=PLAN,
                    login=LOGIN,
                    password_hash=hash_password(password),
                )
            )
            action = "created"
        await session.commit()
    return action


def main() -> None:
    password = os.environ.get("MILREVIEW_PASSWORD")
    if not password:
        raise SystemExit(
            "Set MILREVIEW_PASSWORD (the initial password) — never commit it.\n"
            "  MILREVIEW_PASSWORD='…' python -m app.workers.seed_milreview_user"
        )
    action = asyncio.run(seed(password))
    get_logger("workers.seed_milreview_user").info("milreview_user_seeded", action=action)
    print(f"milreview login {action}: login='{LOGIN}', plan='{PLAN}'")


if __name__ == "__main__":
    main()
