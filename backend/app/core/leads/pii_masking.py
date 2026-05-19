"""PII masking helpers (T5.4 / SECURITY.md §7).

Used by the founder + owner TG notifications and admin previews. The
admin "view full lead" path is the only code that calls
``decrypt()`` — masked previews are produced from the cleartext
inside that same handler, never from a separate fetch.

Rules:

  - Phone: keep last 4 digits, mask the rest. ``+7 921 123-45-67`` →
    ``+7 ***-***-45-67``.
  - Email: keep first letter of local part + full domain. ``alice@
    example.com`` → ``a***@example.com``.
  - Name: keep first character + last name initial. ``Анна
    Иванова`` → ``Анна И.``.
  - Message: first 80 chars, ellipsis if truncated.

These run AFTER decryption — they never see the ciphertext.
"""

from __future__ import annotations

import re

_DIGIT_RE = re.compile(r"\d")
_EMAIL_RE = re.compile(r"^([^@]+)@(.+)$")


def mask_phone(phone: str) -> str:
    """Keep the last 4 digits and the leading ``+``/country code; mask
    everything in between with ``*``. Non-digit punctuation in the
    middle is replaced with ``*`` too so the result reads cleanly."""
    if not phone:
        return ""
    digits = _DIGIT_RE.findall(phone)
    if len(digits) <= 4:
        return phone
    keep_tail = "".join(digits[-4:])
    head = "+" if phone.startswith("+") else ""
    return f"{head}***-***-{keep_tail[:2]}-{keep_tail[2:]}"


def mask_email(email: str) -> str:
    if not email:
        return ""
    match = _EMAIL_RE.match(email)
    if match is None:
        return "***"
    local, domain = match.group(1), match.group(2)
    if len(local) < 1:
        return f"***@{domain}"
    return f"{local[0]}***@{domain}"


def mask_name(name: str) -> str:
    """``Анна Иванова`` → ``Анна И.``. Single-token names ``Анна`` →
    ``Анна``. Empty input → empty string."""
    if not name:
        return ""
    parts = name.strip().split()
    if not parts:
        return ""
    if len(parts) == 1:
        return parts[0]
    first, last = parts[0], parts[-1]
    return f"{first} {last[:1]}."


def mask_message(message: str | None, *, limit: int = 80) -> str:
    if not message:
        return ""
    snippet = message.strip()
    if len(snippet) <= limit:
        return snippet
    return snippet[: limit - 1] + "…"
