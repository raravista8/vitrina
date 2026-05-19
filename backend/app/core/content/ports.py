"""LLM content-generation ports (T4.x).

Concrete adapter is YandexGPT 5 Pro (ADR-0003). No other LLM provider is
permitted — see CLAUDE.md hard rules and `.importlinter`.

The ports here describe ONLY the LLM transport contract — the
domain-side pipeline (PII obfuscation → prompt build → output sanitise)
lives in pure-domain modules:

  - ``core/content/pii_obfuscator``  — T4.2 / FR-021
  - ``core/content/prompt_builder``  — T4.3 / FR-020
  - ``core/content/output_validator`` — T4.4 / FR-022 / FR-024
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Protocol


@dataclass(frozen=True, slots=True)
class LlmCallResult:
    """Plain bytes-in / bytes-out around the LLM transport. The
    adapter doesn't try to parse JSON — that's the output validator's
    job. ``tokens_in`` / ``tokens_out`` come from the provider's
    usage block for cost accounting (FR-023)."""

    text: str
    tokens_in: int
    tokens_out: int
    model_name: str


class AdapterDisabledError(Exception):
    """Adapter cannot run (missing credentials or feature-flag off)."""


class LlmCallError(Exception):
    """Upstream LLM call failed in a recoverable way (timeout, 5xx).
    The service layer maps to a domain error the worker logs."""


class LlmClient(Protocol):
    """One adapter per LLM provider. Production = YandexGPT
    (``app.infrastructure.yandex.gpt``); tests use fakes."""

    model_name: str

    def is_available(self) -> bool: ...

    async def complete(
        self,
        *,
        system_prompt: str,
        user_prompt: str,
        max_tokens: int,
    ) -> LlmCallResult: ...
