"""Unit tests for contact auto-detection (T1.3).

Pure logic — no DB, no I/O. The same patterns will also be exercised on
the client side by ``landing/__tests__/contact-detect.test.ts`` in T1.5.
"""

from __future__ import annotations

import pytest

from app.core.contact.auto_detect import ContactType, detect_contact


@pytest.mark.unit
class TestEmail:
    @pytest.mark.parametrize(
        ("raw", "expected"),
        [
            ("alice@example.com", "alice@example.com"),
            ("Alice@Example.COM", "Alice@example.com"),
            ("user+tag@sub.domain.io", "user+tag@sub.domain.io"),
            ("кириллица@xn--example.рф", None),  # cyrillic local part is rejected by PRD regex
        ],
    )
    def test_email_detection(self, raw: str, expected: str | None) -> None:
        result = detect_contact(raw)
        if expected is None:
            # Either rejected outright or detected as something other than email
            assert result is None or result.contact_type is not ContactType.email
        else:
            assert result is not None
            assert result.contact_type is ContactType.email
            assert result.value == expected


@pytest.mark.unit
class TestPhone:
    @pytest.mark.parametrize(
        ("raw", "e164"),
        [
            ("+79261234567", "+79261234567"),  # already E.164
            ("89261234567", "+79261234567"),  # RU local form (leading 8)
            ("8 (926) 123-45-67", "+79261234567"),
            ("+7 (916) 555 12 34", "+79165551234"),
        ],
    )
    def test_phone_detection(self, raw: str, e164: str) -> None:
        result = detect_contact(raw)
        assert result is not None
        assert result.contact_type is ContactType.phone
        assert result.value == e164

    def test_invalid_phone_shape_is_rejected(self) -> None:
        # Matches phone shape regex (digits + dashes) but phonenumbers will
        # reject it as not a real number — must NOT silently fall through
        # to telegram detection.
        result = detect_contact("0000000000")
        assert result is None


@pytest.mark.unit
class TestTelegram:
    @pytest.mark.parametrize(
        ("raw", "canonical"),
        [
            ("@alice", "@alice"),
            ("alice_doe", "@alice_doe"),
            ("Alice_DOE", "@alice_doe"),  # lowercased
            ("t.me/master_barber", "@master_barber"),
            ("https://t.me/master_barber", "@master_barber"),
            ("https://telegram.me/master_barber", "@master_barber"),
        ],
    )
    def test_telegram_detection(self, raw: str, canonical: str) -> None:
        result = detect_contact(raw)
        assert result is not None
        assert result.contact_type is ContactType.telegram
        assert result.value == canonical

    def test_too_short_username_rejected(self) -> None:
        # Telegram usernames are 5-32 chars per TG rules.
        assert detect_contact("ab") is None
        assert detect_contact("@abc") is None

    def test_username_starting_with_digit_rejected(self) -> None:
        # TG requires the first char to be a letter.
        assert detect_contact("@1abcd") is None


@pytest.mark.unit
class TestMax:
    @pytest.mark.parametrize(
        ("raw", "canonical"),
        [
            ("https://max.ru/alice_master", "max://alice_master"),
            ("https://max.ru/u/alice_master", "max://alice_master"),
            ("max://contact?id=alice_master", "max://alice_master"),
        ],
    )
    def test_max_detection(self, raw: str, canonical: str) -> None:
        result = detect_contact(raw)
        assert result is not None
        assert result.contact_type is ContactType.max
        assert result.value == canonical


@pytest.mark.unit
class TestRejection:
    @pytest.mark.parametrize(
        "raw",
        [
            "",
            "   ",
            "not a contact",
            "just spaces and words",
            "@",  # bare at
            "@@alice",  # double-prefixed
            "alice@",  # incomplete email
            "@example.com",  # leading @ followed by domain, not username
            "<script>alert(1)</script>",
        ],
    )
    def test_garbage_rejected(self, raw: str) -> None:
        assert detect_contact(raw) is None

    def test_none_rejected(self) -> None:
        assert detect_contact(None) is None  # type: ignore[arg-type]
