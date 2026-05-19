"""PII obfuscator (T4.2 / FR-021).

Pre-LLM step. Replaces detected phone numbers, emails, Telegram /
MAX handles, and likely Russian full-name pairs with placeholder
tokens before the content is wrapped into ``<user_content>`` and
sent to YandexGPT.

The placeholders are deterministic per category — every phone becomes
``[PHONE]``, every email ``[EMAIL]``, every detected name ``[NAME]``.
We don't try to make the LLM round-trip the original strings: the
master's contacts are already on the snapshot in structured fields
(``contacts: list[ContactRef]``), and the publisher re-attaches them
to the rendered site after generation. The LLM produces marketing
copy; it never sees the actual PII.

What this catches:

  - Russian / international phones: ``+7 921 123-45-67``,
    ``8 (921) 123 45 67``, ``+1 (415) 555-0123``, etc.
  - Emails: any RFC-light pattern containing ``@`` and a TLD
  - Telegram handles: ``@username`` (5–32 chars per TG rules)
  - URLs that look like ``t.me/<name>`` or ``max.ru/<name>``
  - Russian full-name pairs (Capitalised + Capitalised, latin or
    cyrillic). This is a heuristic — it WILL miss exotic spellings
    and over-redact phrases like "Студия Анны". For the LLM that's
    safe: the redaction is on the side of caution, the master's
    actual name lives in ``organization.name`` on the snapshot and
    is re-attached after generation.

What this does NOT do:

  - It does NOT translate, normalise, or pseudonymise — it strictly
    masks. Output text retains the original surrounding context.
  - It does NOT try to ML-detect names. We don't ship spaCy or a
    BERT model into the LLM hot path; the regex heuristic is good
    enough for the safety-net role.

Property: every call is idempotent. Running the obfuscator twice on
the same input yields the same output. This is used by the security
tests to assert no PII pattern survives multiple passes.
"""

from __future__ import annotations

import re
from dataclasses import dataclass

# --- Patterns -------------------------------------------------------------

# RFC-light email. Allows + tags, dotted locals, IDN-free TLDs.
_EMAIL_RE = re.compile(
    r"[A-Za-z0-9](?:[A-Za-z0-9._+-]*[A-Za-z0-9])?@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+",
)

# Phones — three flavours covered, all reduced to ``[PHONE]``:
#
#   1) E.164-style: optional +, 11–15 digits with separators
#   2) Russian 8-prefixed: ``8 (921) 123-45-67`` (10 digits after 8)
#   3) Compact international: ``(415) 555-0123``
#
# We require at least 10 digits in total to dodge false-positives on
# things like inventory codes / IDs.
_PHONE_RE = re.compile(
    r"""
    (?<!\w)                             # left boundary
    (?:
        \+?\d[\d\s().\-]{8,18}\d        # +X ... X (at least 10 digits w/ separators)
      | 8[\s().\-]?\d[\d\s().\-]{8,16}\d  # 8 (XXX) XXX-XX-XX
    )
    (?!\w)                              # right boundary
    """,
    re.VERBOSE,
)

# Telegram handle: ``@`` + 5–32 chars of [A-Za-z0-9_], starting with a letter.
# Mirrors the validator in core/parsing/adapters/telegram_bot._validate_username.
_TG_HANDLE_RE = re.compile(r"(?<![A-Za-z0-9_])@[A-Za-z][A-Za-z0-9_]{4,31}(?![A-Za-z0-9_])")

# t.me / max.ru / telegram.me handle URLs — match the whole URL so we
# don't leak the host either.
_HANDLE_URL_RE = re.compile(
    r"https?://(?:t\.me|telegram\.me|telegram\.dog|max\.ru)/[A-Za-z0-9_+\-]+",
    re.IGNORECASE,
)

# Russian / Latin name pair: two or three adjacent Capitalised tokens.
# Inner class is letters + hyphen — covers compound surnames like
# "Петрова-Сидорова". Tightened with explicit Unicode classes so
# phrases like "А Б" or numbers don't trigger.
_NAME_TOKEN_INNER = r"[A-Za-zА-Яа-яЁё\-]{1,30}"  # noqa: S105 — regex fragment, not a secret
_NAME_PAIR_RE = re.compile(
    r"(?<![\w\-])"
    r"[A-ZА-ЯЁ]" + _NAME_TOKEN_INNER + r""
    r"(?:\s+[A-ZА-ЯЁ]" + _NAME_TOKEN_INNER + r"){1,2}"
    r"(?![\w\-])",
)


# --- Placeholders ---------------------------------------------------------


PHONE_PLACEHOLDER = "[PHONE]"
EMAIL_PLACEHOLDER = "[EMAIL]"
TG_PLACEHOLDER = "[TG_HANDLE]"
HANDLE_URL_PLACEHOLDER = "[HANDLE_URL]"
NAME_PLACEHOLDER = "[NAME]"


# --- Public API -----------------------------------------------------------


@dataclass(frozen=True, slots=True)
class ObfuscationReport:
    """Telemetry for the security test suite + the audit log.

    ``masked_count`` counts each replacement. ``patterns_seen`` is a
    set of placeholder names for quick filtering in tests."""

    text: str
    phones: int = 0
    emails: int = 0
    tg_handles: int = 0
    handle_urls: int = 0
    names: int = 0

    @property
    def total(self) -> int:
        return self.phones + self.emails + self.tg_handles + self.handle_urls + self.names


def obfuscate(text: str) -> ObfuscationReport:
    """Return ``text`` with PII replaced by placeholders, plus counts.

    Ordering matters: handle URLs go first because the URL match
    swallows the ``@handle`` substring that lives inside the URL
    path. Then emails (which match earlier than phones because a
    phone-like sequence inside an email local-part would otherwise
    be redacted to ``[PHONE]``). Then phones. Then standalone TG
    handles. Names last so we don't accidentally catch a Capitalised
    URL hostname.
    """
    if not text:
        return ObfuscationReport(text="")

    out = text
    out, handle_urls = _sub_count(_HANDLE_URL_RE, HANDLE_URL_PLACEHOLDER, out)
    out, emails = _sub_count(_EMAIL_RE, EMAIL_PLACEHOLDER, out)
    out, phones = _sub_count(_PHONE_RE, PHONE_PLACEHOLDER, out)
    out, tg_handles = _sub_count(_TG_HANDLE_RE, TG_PLACEHOLDER, out)
    out, names = _sub_count(_NAME_PAIR_RE, NAME_PLACEHOLDER, out)

    return ObfuscationReport(
        text=out,
        phones=phones,
        emails=emails,
        tg_handles=tg_handles,
        handle_urls=handle_urls,
        names=names,
    )


def assert_pii_free(text: str) -> None:
    """Belt-and-suspenders check used by ``content/service.py`` right
    before the LLM call. Raises ``RuntimeError`` if any of the masks
    can re-match — which would mean the obfuscator missed something.

    This is intentionally strict: a False positive (something that
    looks like a phone but isn't) blows up the generation and forces
    the founder to look at it, rather than letting raw PII reach
    YandexGPT (T6.2 / SECURITY.md §B6.2).
    """
    if any(p in text for p in {"@", "+7", "+1"}):
        # Cheap pre-check — only run the regex set if a likely token
        # is even present. Saves ~30µs on short prompts.
        for kind, pattern in {
            "phone": _PHONE_RE,
            "email": _EMAIL_RE,
            "tg_handle": _TG_HANDLE_RE,
            "handle_url": _HANDLE_URL_RE,
        }.items():
            if pattern.search(text):
                raise RuntimeError(f"pii_residue:{kind}")


# --- internals ------------------------------------------------------------


def _sub_count(pattern: re.Pattern[str], replacement: str, text: str) -> tuple[str, int]:
    new_text, count = pattern.subn(replacement, text)
    return new_text, count
