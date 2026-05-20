"""LLM-output sanitiser + safety gate (T4.4 / FR-022 / FR-024).

What the LLM returns is a JSON object — but YandexGPT (like any LLM)
sometimes wraps it in ``` blocks, prepends commentary, or smuggles
HTML / scripts / off-allowlist URLs into the text fields. This module
is the last safety hop before the value lands in
``sites.generated_content`` and the publisher writes it to the
customer site.

The pipeline:

  1. **Strip code fences.** `````json\\n{...}\\n`````
     → ``{...}``. Common LLM habit despite the system-prompt forbidding it.
  2. **Parse JSON.** A failure is fatal — the service kicks the
     generation to manual review.
  3. **Bleach every text field.** No tags, no attributes, strip-mode.
     The customer-site template has autoescape ON, but the LLM should
     never even emit ``<script>`` in the first place (defence in depth).
  4. **URL allowlist check.** Every URL anywhere in the payload must
     match the per-site allowlist (``samosite.online``, ``yandex.\\w+``,
     ``storage.yandexcloud.net``, ``t.me``) OR be an empty string. URLs
     outside the allowlist + any ``javascript:`` / ``data:`` /
     ``vbscript:`` schemes raise the safety flag — the orchestrator
     persists the flagged payload but marks the generation
     ``needs_manual_review = True``.
  5. **Shape gate.** Required top-level keys (``site_title``,
     ``site_description``, ``services``, …) must exist; otherwise the
     output is rejected.

The function returns a ``ValidatedOutput`` carrying both the cleaned
dict and a ``safety_flags`` list — the service writes the flags into
the audit log without dropping the generation, so the founder can
inspect what the LLM tried to do.
"""

from __future__ import annotations

import json
import re
from dataclasses import dataclass, field
from typing import Any

import bleach

# Allowed URL hosts in the output. Empty string is also allowed (for
# fields where we don't have a value to fill yet).
_HOST_ALLOWLIST: tuple[re.Pattern[str], ...] = (
    re.compile(r"samosite\.online"),
    re.compile(r"[a-z0-9-]+\.samosite\.online"),
    re.compile(r"yandex\.[a-z]+"),
    re.compile(r"maps\.yandex\.[a-z]+"),
    re.compile(r"storage\.yandexcloud\.net"),
    re.compile(r"t\.me"),
    re.compile(r"telegram\.me"),
    re.compile(r"smartcaptcha\.yandexcloud\.net"),
    re.compile(r"mc\.yandex\.ru"),
)

_DANGEROUS_SCHEMES = ("javascript:", "data:", "vbscript:", "file:")

_REQUIRED_KEYS = ("site_title", "site_description", "services")


# --- Errors + outputs ----------------------------------------------------


class LlmOutputRejectedError(ValueError):
    """Raised when the output can't even be parsed or is structurally
    invalid. The service maps to a generation_failure that the
    founder reviews manually."""


@dataclass(frozen=True, slots=True)
class ValidatedOutput:
    """What ``validate_and_clean`` returns. The orchestrator persists
    ``content`` into ``sites.generated_content`` and the
    ``safety_flags`` into the audit log."""

    content: dict[str, Any]
    safety_flags: list[str] = field(default_factory=list)

    @property
    def needs_manual_review(self) -> bool:
        return bool(self.safety_flags)


# --- Public API ----------------------------------------------------------


def validate_and_clean(raw_llm_text: str) -> ValidatedOutput:
    """Parse → sanitise → safety-check. Returns ``ValidatedOutput`` on
    success; raises ``LlmOutputRejectedError`` only when the output
    is structurally broken (unparseable JSON or missing required
    keys). Allowlist + script violations DON'T raise — they flag.

    Why: a flagged generation is still useful for the founder to read
    and patch by hand. Raising would lose the LLM's work for a single
    bad URL.
    """
    if not raw_llm_text or not raw_llm_text.strip():
        raise LlmOutputRejectedError("empty_output")

    text = _strip_code_fences(raw_llm_text.strip())

    try:
        parsed: Any = json.loads(text)
    except json.JSONDecodeError as exc:
        raise LlmOutputRejectedError(f"json_parse_failed:{exc.msg}") from exc

    if not isinstance(parsed, dict):
        raise LlmOutputRejectedError(f"not_a_dict:{type(parsed).__name__}")

    missing = [k for k in _REQUIRED_KEYS if k not in parsed]
    if missing:
        raise LlmOutputRejectedError(f"missing_required_keys:{','.join(missing)}")

    flags: list[str] = []
    cleaned = _scrub_recursive(parsed, flags=flags)
    return ValidatedOutput(content=cleaned, safety_flags=flags)


# --- internals ------------------------------------------------------------


_FENCE_RE = re.compile(r"^```(?:json|JSON)?\s*\n(.*?)\n```\s*$", re.DOTALL)


def _strip_code_fences(text: str) -> str:
    match = _FENCE_RE.match(text)
    if match:
        return match.group(1).strip()
    return text


def _scrub_recursive(value: Any, *, flags: list[str]) -> Any:
    if isinstance(value, str):
        return _scrub_string(value, flags=flags)
    if isinstance(value, list):
        return [_scrub_recursive(item, flags=flags) for item in value]
    if isinstance(value, dict):
        return {k: _scrub_recursive(v, flags=flags) for k, v in value.items()}
    # Numbers, bools, None — pass through.
    return value


def _scrub_string(value: str, *, flags: list[str]) -> str:
    # 1. Bleach: strip ALL HTML. Output should be plain text.
    cleaned = bleach.clean(value, tags=[], attributes={}, strip=True)
    if cleaned != value:
        flags.append("html_stripped")

    # 2. Dangerous schemes — if any survive, flag and blank them out.
    for scheme in _DANGEROUS_SCHEMES:
        if scheme in cleaned.lower():
            flags.append(f"dangerous_scheme:{scheme.rstrip(':')}")
            cleaned = re.sub(re.escape(scheme), "[blocked-scheme]", cleaned, flags=re.IGNORECASE)

    # 3. URL allowlist check. We don't strip the URL — just flag for
    #    manual review. The Jinja2 template's autoescape stops any
    #    actual XSS at render time.
    for url in _extract_urls(cleaned):
        if not _url_in_allowlist(url):
            flags.append(f"url_off_allowlist:{url}")

    return cleaned


_URL_RE = re.compile(r"https?://[^\s'\"<>]+", re.IGNORECASE)


def _extract_urls(text: str) -> list[str]:
    return _URL_RE.findall(text)


def _url_in_allowlist(url: str) -> bool:
    try:
        from urllib.parse import urlparse

        host = urlparse(url).hostname or ""
    except ValueError:
        return False
    host = host.lower()
    return any(pattern.fullmatch(host) for pattern in _HOST_ALLOWLIST)
