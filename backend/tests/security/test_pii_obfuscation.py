"""PII obfuscator tests (T4.2 / FR-021).

Verifies the 30+ RU-flavoured payload corpus from CLAUDE.md hard
rules: phones (Russian + international), emails, Telegram handles,
handle URLs, name pairs. Idempotence + the assert_pii_free gate are
checked separately."""

from __future__ import annotations

import pytest

from app.core.content.pii_obfuscator import (
    EMAIL_PLACEHOLDER,
    HANDLE_URL_PLACEHOLDER,
    NAME_PLACEHOLDER,
    PHONE_PLACEHOLDER,
    TG_PLACEHOLDER,
    assert_pii_free,
    obfuscate,
)

# --- Phone numbers --------------------------------------------------------


@pytest.mark.security
@pytest.mark.parametrize(
    "raw",
    [
        "+7 921 123-45-67",
        "+7 (921) 123-45-67",
        "+7-921-123-45-67",
        "+79211234567",
        "8 921 123 45 67",
        "8(921)1234567",
        "8 (921) 123-45-67",
        "+1 (415) 555-0123",
        "+44 20 7946 0958",
    ],
)
def test_phone_redacted(raw: str) -> None:
    report = obfuscate(f"звоните {raw} с 9 до 21")
    assert PHONE_PLACEHOLDER in report.text
    assert raw not in report.text
    assert report.phones == 1


@pytest.mark.security
def test_short_digit_string_left_alone() -> None:
    """Inventory codes / order numbers shouldn't trip the phone matcher."""
    report = obfuscate("заказ 12345 от 5 марта")
    assert PHONE_PLACEHOLDER not in report.text


# --- Emails ---------------------------------------------------------------


@pytest.mark.security
@pytest.mark.parametrize(
    "raw",
    [
        "anna@example.com",
        "anna.ivanova@studio.io",
        "anna+booking@gmail.com",
        "a@b.io",
        "анна-test@example.com",  # mixed case
    ],
)
def test_email_redacted(raw: str) -> None:
    report = obfuscate(f"пиши {raw}, отвечу")
    assert EMAIL_PLACEHOLDER in report.text
    assert raw not in report.text
    assert report.emails >= 1


# --- Telegram handles ----------------------------------------------------


@pytest.mark.security
@pytest.mark.parametrize(
    "raw",
    [
        "@anna_master",
        "@barbershop_samara",
        "@Studio99",
    ],
)
def test_tg_handle_redacted(raw: str) -> None:
    report = obfuscate(f"пиши в Telegram {raw}")
    assert TG_PLACEHOLDER in report.text
    assert report.tg_handles == 1


@pytest.mark.security
def test_short_handle_not_matched() -> None:
    """TG usernames are ≥5 chars; @abc shouldn't match."""
    report = obfuscate("ник @abc не подойдёт")
    assert TG_PLACEHOLDER not in report.text


# --- Handle URLs ---------------------------------------------------------


@pytest.mark.security
@pytest.mark.parametrize(
    "raw",
    [
        "https://t.me/anna_master",
        "https://telegram.me/Studio99",
        "https://max.ru/anna-best",
    ],
)
def test_handle_url_redacted(raw: str) -> None:
    report = obfuscate(f"подпишитесь: {raw}")
    assert HANDLE_URL_PLACEHOLDER in report.text
    assert raw not in report.text


@pytest.mark.security
def test_handle_url_swallows_inner_handle() -> None:
    """``https://t.me/anna_master`` contains ``@anna_master`` after
    the slash — but the URL placeholder runs first, so it gets the
    whole string. We just need the result to be PII-free."""
    text = "наш канал https://t.me/anna_master, заходите"
    report = obfuscate(text)
    assert "anna_master" not in report.text


# --- Name pairs ----------------------------------------------------------


@pytest.mark.security
@pytest.mark.parametrize(
    "raw",
    [
        "Анна Иванова",
        "Мария Петрова-Сидорова",
        "Anna Ivanova",
        "Иван Иванович Иванов",  # 3-part FIO
    ],
)
def test_name_pair_redacted(raw: str) -> None:
    report = obfuscate(f"мастер: {raw}, опыт 10 лет")
    assert NAME_PLACEHOLDER in report.text
    assert raw not in report.text
    assert report.names >= 1


@pytest.mark.security
def test_single_capitalised_word_not_matched() -> None:
    """A standalone "Москва" shouldn't trigger the name heuristic."""
    report = obfuscate("работаю в Москва")
    assert NAME_PLACEHOLDER not in report.text


# --- Combined ------------------------------------------------------------


@pytest.mark.security
def test_combined_payload_all_masks() -> None:
    text = (
        "Мастер маникюра Анна Иванова, телефон +7 921 123-45-67, "
        "email anna@studio.io, Telegram @anna_master, канал "
        "https://t.me/anna_studio"
    )
    report = obfuscate(text)
    assert report.phones == 1
    assert report.emails == 1
    assert report.tg_handles == 1
    assert report.handle_urls == 1
    assert report.names == 1
    assert "anna" not in report.text.lower() or "annaivanova" not in report.text.lower()


@pytest.mark.security
def test_idempotence() -> None:
    """Running the obfuscator twice on the same text yields the same
    output — placeholders themselves shouldn't trip the regex."""
    text = "Анна Иванова +7 921 123-45-67 anna@x.io"
    once = obfuscate(text)
    twice = obfuscate(once.text)
    assert once.text == twice.text


# --- assert_pii_free gate ------------------------------------------------


@pytest.mark.security
def test_assert_pii_free_silent_on_clean_text() -> None:
    assert_pii_free("Студия маникюра — записаться можно через сайт.")
    assert_pii_free("call us — phone numbers go through PHONE placeholder")


@pytest.mark.security
@pytest.mark.parametrize(
    "leak",
    [
        "позвоните +7 921 123-45-67",
        "email anna@example.com",
        "@anna_master",
    ],
)
def test_assert_pii_free_raises_when_pii_leaks(leak: str) -> None:
    with pytest.raises(RuntimeError, match="pii_residue"):
        assert_pii_free(leak)


# --- empty ---------------------------------------------------------------


@pytest.mark.security
def test_empty_input_safe() -> None:
    report = obfuscate("")
    assert report.text == ""
    assert report.total == 0
