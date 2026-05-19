"""Admin auth primitives (T2.1) — bcrypt password + TOTP + backup codes.

Pure-domain: no FastAPI, no Redis. The session machinery lives in
``sessions.py``; this module verifies credentials only.

SECURITY.md A07 / T7.1:
  - password: bcrypt cost=12 (~300 ms verify — balance security vs UX)
  - TOTP: pyotp, 30-second window, 1-step skew accepted (clock drift)
  - 8 backup codes, bcrypt-hashed at issue time, single-use (caller
    removes the consumed hash from the list after a successful match)
"""

from __future__ import annotations

import secrets

import bcrypt
import pyotp

_BCRYPT_ROUNDS = 12


def hash_password(plain: str) -> str:
    salt = bcrypt.gensalt(rounds=_BCRYPT_ROUNDS)
    return bcrypt.hashpw(plain.encode("utf-8"), salt).decode("ascii")


def verify_password(plain: str, password_hash: str) -> bool:
    try:
        return bcrypt.checkpw(plain.encode("utf-8"), password_hash.encode("ascii"))
    except (ValueError, UnicodeEncodeError):
        return False


def generate_totp_secret() -> str:
    """Return a fresh base32 TOTP secret. Same shape as Yandex Authenticator
    / Google Authenticator scan-in QR codes."""
    return pyotp.random_base32()


def build_totp_provisioning_uri(secret: str, *, account: str) -> str:
    """For QR-code rendering during ``make seed-admin``."""
    return pyotp.TOTP(secret).provisioning_uri(name=account, issuer_name="Vitrina")


def verify_totp(secret: str, code: str) -> bool:
    if not code.isdigit() or len(code) != 6:
        return False
    return pyotp.TOTP(secret).verify(code, valid_window=1)


def generate_backup_codes(count: int = 8) -> list[str]:
    """Return ``count`` URL-safe codes for the operator to copy down."""
    return [secrets.token_hex(4) for _ in range(count)]


def hash_backup_codes(codes: list[str]) -> list[str]:
    return [hash_password(c) for c in codes]


def find_and_consume_backup_code(code: str, hashes: list[str]) -> tuple[bool, list[str]]:
    """Returns ``(matched, remaining_hashes)``. Pop the matched hash so the
    code can't be reused."""
    for i, h in enumerate(hashes):
        if verify_password(code, h):
            return True, [*hashes[:i], *hashes[i + 1 :]]
    return False, hashes
