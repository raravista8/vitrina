"""Unit tests for admin auth primitives (T2.1)."""

from __future__ import annotations

import pyotp
import pytest

from app.core.auth.admin import (
    find_and_consume_backup_code,
    generate_backup_codes,
    generate_totp_secret,
    hash_backup_codes,
    hash_password,
    verify_password,
    verify_totp,
)


@pytest.mark.unit
class TestPassword:
    def test_hash_then_verify_round_trip(self) -> None:
        h = hash_password("correct horse battery staple")
        assert verify_password("correct horse battery staple", h)

    def test_wrong_password_rejected(self) -> None:
        h = hash_password("right one")
        assert not verify_password("wrong one", h)

    def test_malformed_hash_rejected_safely(self) -> None:
        # Not a valid bcrypt hash — must NOT raise.
        assert not verify_password("anything", "not-a-bcrypt-hash")


@pytest.mark.unit
class TestTotp:
    def test_correct_code_accepted(self) -> None:
        secret = generate_totp_secret()
        code = pyotp.TOTP(secret).now()
        assert verify_totp(secret, code)

    def test_wrong_code_rejected(self) -> None:
        secret = generate_totp_secret()
        assert not verify_totp(secret, "000000")

    @pytest.mark.parametrize("code", ["abcdef", "12345", "1234567", ""])
    def test_malformed_code_rejected(self, code: str) -> None:
        secret = generate_totp_secret()
        assert not verify_totp(secret, code)


@pytest.mark.unit
class TestBackupCodes:
    def test_codes_have_expected_shape(self) -> None:
        codes = generate_backup_codes(count=8)
        assert len(codes) == 8
        # Eight hex chars = 32 bits of entropy — enough for one-shot codes.
        assert all(len(c) == 8 and all(ch in "0123456789abcdef" for ch in c) for c in codes)

    def test_consume_removes_matched_hash(self) -> None:
        codes = generate_backup_codes(count=3)
        hashes = hash_backup_codes(codes)

        matched, remaining = find_and_consume_backup_code(codes[1], hashes)
        assert matched
        assert len(remaining) == 2

        # Reusing the same code now fails.
        matched_again, _ = find_and_consume_backup_code(codes[1], remaining)
        assert not matched_again

    def test_unknown_code_does_not_change_hashes(self) -> None:
        codes = generate_backup_codes(count=2)
        hashes = hash_backup_codes(codes)
        matched, remaining = find_and_consume_backup_code("00000000", hashes)
        assert not matched
        assert remaining == hashes
