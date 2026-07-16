"""Server-side contact auto-detection.

Mirrors the client-side regex in ``landing/lib/contact-detect.ts`` (T1.5).
The four types supported per ADR-0008 / PRD §4:

    email     — ``user@host.tld``
    phone     — E.164 after normalisation; input accepts ``+``, digits,
                spaces, parentheses and hyphens
    telegram  — ``@name`` / bare ``name`` / ``t.me/name`` / ``telegram.me/name``
                (5–32 chars, ``[a-z0-9_]``)
    max       — ``max.ru/<name>`` or ``max://contact?id=...``

``detect_contact(raw) -> DetectedContact | None`` returns the normalised
canonical form alongside the type, or ``None`` when nothing matches —
which the API turns into a 400 ``invalid_contact``.

Order of evaluation matters because some inputs overlap (e.g. ``12345`` is a
valid TG username AND a too-short phone). The order below prefers the more
specific match first.
"""

from __future__ import annotations

import re
from dataclasses import dataclass
from enum import StrEnum

import phonenumbers
from phonenumbers import NumberParseException


class ContactType(StrEnum):
    email = "email"
    phone = "phone"
    telegram = "telegram"
    max = "max"
    # intake v2: WhatsApp — явный канал формы (значение — телефон). Авто-детект
    # его НЕ возвращает (телефонная строка неотличима от phone) — только
    # validate_channel_value с явным каналом.
    whatsapp = "whatsapp"


@dataclass(frozen=True, slots=True)
class DetectedContact:
    contact_type: ContactType
    value: str


# ----------------------------------------------------------------------------
# Regexes
# ----------------------------------------------------------------------------

# Permissive email (RFC-light, matches PRD §4 table).
_EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[a-z]{2,}$", re.IGNORECASE)

# Phone shape PRE-normalisation: + plus digits/spaces/parens/dashes. Wide
# length range so formatted RU numbers like "+7 (916) 555-12-34" (18 chars)
# fit; phonenumbers does the real digit-count + carrier-prefix check.
_PHONE_SHAPE_RE = re.compile(r"^\+?[0-9\s()\-]{10,25}$")

# Additional guard so a "phone-shaped" string actually contains at least 10
# digits (rules out e.g. "((((((((((  ").
_PHONE_MIN_DIGITS = 10
_PHONE_MAX_DIGITS = 15

# Telegram username on its own (bare or @-prefixed).
_TG_NAME_RE = re.compile(r"^@?(?P<name>[a-z][a-z0-9_]{4,31})$", re.IGNORECASE)

# Telegram via URL — scheme optional so bare "t.me/name" works too.
_TG_URL_RE = re.compile(
    r"^(?:https?://)?(?:www\.)?(?:t|telegram)\.me/(?P<name>[a-z][a-z0-9_]{4,31})/?$",
    re.IGNORECASE,
)

# MAX via URL or deep-link — scheme optional for the URL variant.
_MAX_URL_RE = re.compile(
    r"^(?:(?:https?://)?(?:www\.)?max\.ru/(?:u/)?(?P<u>[a-z0-9_]{3,32})/?"
    r"|max://contact\?id=(?P<i>[a-z0-9_]{3,64}))$",
    re.IGNORECASE,
)


# ----------------------------------------------------------------------------
# Public API
# ----------------------------------------------------------------------------


def detect_contact(raw: str | None, *, default_region: str = "RU") -> DetectedContact | None:
    """Identify the contact type of ``raw`` and return its canonical form.

    Returns ``None`` when no type matches — the caller should respond
    400 ``invalid_contact``. ``default_region`` is passed to phonenumbers
    so that local-format phones like ``8 (495) 123-45-67`` parse for RU.
    """
    if not raw:
        return None
    cleaned = raw.strip()
    if not cleaned:
        return None

    # 1. Email — `@` is highly disambiguating.
    if "@" in cleaned and _EMAIL_RE.match(cleaned):
        local, _, domain = cleaned.partition("@")
        return DetectedContact(ContactType.email, f"{local}@{domain.lower()}")

    # 2. MAX URL / deep-link.
    if m := _MAX_URL_RE.match(cleaned):
        name = (m.group("u") or m.group("i") or "").lower()
        return DetectedContact(ContactType.max, f"max://{name}")

    # 3. Telegram URL.
    if m := _TG_URL_RE.match(cleaned):
        return DetectedContact(ContactType.telegram, "@" + m.group("name").lower())

    # 4. Phone — try parser when shape AND digit-count both match, before
    # checking bare-TG. A shaped-but-rejected phone does NOT fall through to
    # telegram detection: a 10+-digit string is unambiguously a phone attempt.
    if _PHONE_SHAPE_RE.match(cleaned):
        digit_count = sum(1 for ch in cleaned if ch.isdigit())
        if _PHONE_MIN_DIGITS <= digit_count <= _PHONE_MAX_DIGITS:
            normalised = _try_normalise_phone(cleaned, default_region)
            if normalised is not None:
                return DetectedContact(ContactType.phone, normalised)
            return None

    # 5. Bare Telegram username (with or without @).
    if m := _TG_NAME_RE.match(cleaned):
        return DetectedContact(ContactType.telegram, "@" + m.group("name").lower())

    return None


def _try_normalise_phone(raw: str, region: str) -> str | None:
    try:
        parsed = phonenumbers.parse(raw, region)
    except NumberParseException:
        return None
    if not phonenumbers.is_valid_number(parsed):
        return None
    return phonenumbers.format_number(parsed, phonenumbers.PhoneNumberFormat.E164)


def validate_channel_value(channel: str, raw: str | None) -> str | None:
    """Intake v2: канал задан формой ЯВНО (чипы Telegram · MAX · WhatsApp ·
    Email · Телефон/SMS) — авто-детект не нужен, нужна проверка «значение
    соответствует каналу» + нормализация. Возвращает канонизированное
    значение или ``None`` (→ 400 ``invalid_contact_for_channel``).

    - telegram: ``@name`` / ``name`` / ``t.me/name``  → ``@name``
    - max:      ``max.ru/<name>`` / deep-link         → ``max://<name>``
    - email:    RFC-light                             → нижний регистр домена
    - phone / whatsapp: телефон                       → E.164 (+7…)
    """
    if not raw:
        return None
    cleaned = raw.strip()
    if not cleaned:
        return None

    if channel == "email":
        if _EMAIL_RE.match(cleaned):
            local, _, domain = cleaned.partition("@")
            return f"{local}@{domain.lower()}"
        return None

    if channel in ("phone", "whatsapp"):
        if _PHONE_SHAPE_RE.match(cleaned):
            digit_count = sum(1 for ch in cleaned if ch.isdigit())
            if _PHONE_MIN_DIGITS <= digit_count <= _PHONE_MAX_DIGITS:
                return _try_normalise_phone(cleaned, "RU")
        return None

    if channel == "telegram":
        if m := _TG_URL_RE.match(cleaned):
            return "@" + m.group("name").lower()
        if m := _TG_NAME_RE.match(cleaned):
            return "@" + m.group("name").lower()
        return None

    if channel == "max":
        if m := _MAX_URL_RE.match(cleaned):
            name = (m.group("u") or m.group("i") or "").lower()
            return f"max://{name}"
        # Разрешаем и голый ник (форма подсказывает «логин или номер»).
        if m := _TG_NAME_RE.match(cleaned):
            return f"max://{m.group('name').lower()}"
        return None

    return None
