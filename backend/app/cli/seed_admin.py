"""Interactive admin seeding (T2.1).

Run via ``poetry run python -m app.cli.seed_admin`` — prompts for a
username + password, generates a TOTP secret + 8 backup codes, and
INSERTs/UPDATEs the ``admin_credentials`` row. The CLI connects with
the migrator credentials (ALEMBIC_DATABASE_URL → DDL/INSERT-capable).

Output:
  - Provisioning URI for Yandex / Google Authenticator QR
  - 8 backup codes (printed ONCE — they're bcrypt-hashed in the DB)
"""

from __future__ import annotations

import getpass
import os
import sys
from datetime import UTC, datetime

from sqlalchemy import create_engine
from sqlalchemy.orm import Session

from app.core.auth.admin import (
    build_totp_provisioning_uri,
    generate_backup_codes,
    generate_totp_secret,
    hash_backup_codes,
    hash_password,
)
from app.infrastructure.postgres.models import AdminCredentials


def main() -> None:
    dsn = os.environ.get("ALEMBIC_DATABASE_URL") or os.environ.get("DATABASE_URL")
    if not dsn:
        sys.stderr.write("ALEMBIC_DATABASE_URL not set\n")
        sys.exit(2)

    sync_dsn = dsn.replace("+asyncpg", "+psycopg")

    username = input("Username [founder]: ").strip() or "founder"
    while True:
        password = getpass.getpass("Password (≥16 chars): ")
        if len(password) < 16:
            sys.stderr.write("Too short — at least 16 characters.\n")
            continue
        confirm = getpass.getpass("Confirm password: ")
        if password != confirm:
            sys.stderr.write("Mismatch — try again.\n")
            continue
        break

    secret = generate_totp_secret()
    backups = generate_backup_codes()

    engine = create_engine(sync_dsn, echo=False, future=True)
    with Session(engine) as session, session.begin():
        existing = (
            session.query(AdminCredentials)
            .filter(AdminCredentials.username == username)
            .one_or_none()
        )
        if existing is not None:
            existing.password_hash = hash_password(password)
            existing.totp_secret = secret
            existing.backup_codes_hashes = hash_backup_codes(backups)
            existing.last_login_at = None
        else:
            session.add(
                AdminCredentials(
                    username=username,
                    password_hash=hash_password(password),
                    totp_secret=secret,
                    backup_codes_hashes=hash_backup_codes(backups),
                    last_login_at=datetime.now(UTC).replace(microsecond=0),
                )
            )

    print()
    print("Admin seeded.")
    print()
    print("TOTP provisioning URI (scan in Authenticator):")
    print(build_totp_provisioning_uri(secret, account=username))
    print()
    print("Backup codes — store somewhere safe; they're hashed in the DB:")
    for code in backups:
        print(f"  {code}")


if __name__ == "__main__":
    main()
