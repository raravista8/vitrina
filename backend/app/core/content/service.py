"""Content generation orchestrator (T4.1 + T4.5).

Single entry point for the snapshot → generated_content flow. The
admin "Generate" action (and later the worker) calls
``generate_for_snapshot`` with a snapshot; the service:

  1. Builds the prompt via T4.3 (PII obfuscation + user_content
     tagging happen inside).
  2. assert_pii_free() — belt-and-suspenders re-check the obfuscator
     didn't miss anything before bytes leave the VPS.
  3. Calls the LlmClient (production = YandexGPT).
  4. Runs the response through T4.4 (validate_and_clean).
  5. Returns the cleaned content + flags + token usage.

Audit log (T4.5) is written by the caller (admin router / worker)
because the row needs ``site_id`` which the service doesn't take.
We return everything the audit row needs in ``GenerationOutcome``.

The service NEVER raises non-domain exceptions: every failure path
returns a ``GenerationOutcome`` with ``status != success`` so the
caller can write the audit row + flip the site to ``review`` for
manual handling.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any

from app.core.content.output_validator import (
    LlmOutputRejectedError,
    validate_and_clean,
)
from app.core.content.pii_obfuscator import assert_pii_free
from app.core.content.ports import (
    AdapterDisabledError,
    LlmCallError,
    LlmClient,
)
from app.core.content.prompt_builder import build_prompt
from app.core.parsing.ports import SourceSnapshot
from app.utils.logging import get_logger

DEFAULT_MAX_TOKENS = 2_000


@dataclass(frozen=True, slots=True)
class GenerationOutcome:
    """Everything the caller needs to write the audit row + decide
    what to do with the site row."""

    status: str  # "success" | "flagged" | "failed"
    content: dict[str, Any] | None
    safety_flags: list[str]
    pii_masked_count: int
    prompt_version: int
    model_name: str
    system_prompt: str
    user_prompt: str
    response_text: str | None
    tokens_in: int
    tokens_out: int
    error_message: str | None = None

    # Audit retention helper: callers count existing rows in
    # `generation_audits` and pass ``record_full=True`` when count <
    # 100 to persist the prompt/response. Otherwise truncated logging.
    _full_capture: bool = field(default=True)

    @property
    def needs_review(self) -> bool:
        return self.status != "success"


async def generate_for_snapshot(
    *,
    snapshot: SourceSnapshot,
    llm: LlmClient,
    max_tokens: int = DEFAULT_MAX_TOKENS,
) -> GenerationOutcome:
    log = get_logger("core.content.service")

    if not llm.is_available():
        return _failed_outcome(
            model_name=getattr(llm, "model_name", "unknown"),
            error="llm_unavailable",
        )

    built = build_prompt(snapshot)

    # FR-021 belt-and-suspenders: bail if PII leaked through the
    # obfuscator. We DO NOT call the LLM in this case.
    try:
        assert_pii_free(built.user_prompt)
    except RuntimeError as exc:
        log.warning(
            "pii_residue_blocked",
            reason=str(exc),
            source_ref=snapshot.source_ref,
        )
        return GenerationOutcome(
            status="failed",
            content=None,
            safety_flags=[],
            pii_masked_count=built.pii_masked,
            prompt_version=built.prompt_version,
            model_name=llm.model_name,
            system_prompt=built.system_prompt,
            user_prompt=built.user_prompt,
            response_text=None,
            tokens_in=0,
            tokens_out=0,
            error_message=f"pii_residue:{exc}",
        )

    try:
        call = await llm.complete(
            system_prompt=built.system_prompt,
            user_prompt=built.user_prompt,
            max_tokens=max_tokens,
        )
    except (AdapterDisabledError, LlmCallError) as exc:
        log.warning(
            "llm_call_failed",
            error_class=exc.__class__.__name__,
            error=str(exc),
        )
        return GenerationOutcome(
            status="failed",
            content=None,
            safety_flags=[],
            pii_masked_count=built.pii_masked,
            prompt_version=built.prompt_version,
            model_name=llm.model_name,
            system_prompt=built.system_prompt,
            user_prompt=built.user_prompt,
            response_text=None,
            tokens_in=0,
            tokens_out=0,
            error_message=f"{exc.__class__.__name__}:{exc}",
        )

    try:
        validated = validate_and_clean(call.text)
    except LlmOutputRejectedError as exc:
        log.warning(
            "llm_output_rejected",
            reason=str(exc),
            tokens_out=call.tokens_out,
        )
        return GenerationOutcome(
            status="failed",
            content=None,
            safety_flags=[],
            pii_masked_count=built.pii_masked,
            prompt_version=built.prompt_version,
            model_name=call.model_name,
            system_prompt=built.system_prompt,
            user_prompt=built.user_prompt,
            response_text=call.text,
            tokens_in=call.tokens_in,
            tokens_out=call.tokens_out,
            error_message=f"output_rejected:{exc}",
        )

    status = "flagged" if validated.needs_manual_review else "success"
    log.info(
        "content_generated",
        status=status,
        flags=validated.safety_flags,
        tokens_in=call.tokens_in,
        tokens_out=call.tokens_out,
    )
    return GenerationOutcome(
        status=status,
        content=validated.content,
        safety_flags=validated.safety_flags,
        pii_masked_count=built.pii_masked,
        prompt_version=built.prompt_version,
        model_name=call.model_name,
        system_prompt=built.system_prompt,
        user_prompt=built.user_prompt,
        response_text=call.text,
        tokens_in=call.tokens_in,
        tokens_out=call.tokens_out,
    )


def _failed_outcome(*, model_name: str, error: str) -> GenerationOutcome:
    return GenerationOutcome(
        status="failed",
        content=None,
        safety_flags=[],
        pii_masked_count=0,
        prompt_version=0,
        model_name=model_name,
        system_prompt="",
        user_prompt="",
        response_text=None,
        tokens_in=0,
        tokens_out=0,
        error_message=error,
    )
