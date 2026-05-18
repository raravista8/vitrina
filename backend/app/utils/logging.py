"""Structlog setup with PII-redaction processor.

T0.1: configure JSON output, request_id contextvar, log-level from settings.
T1.2 will add the full PIIRedactor (phone, email, IP /16 truncation per
SECURITY.md §7).
"""

from __future__ import annotations

import logging
import re
from typing import Any

import structlog
from structlog.typing import EventDict, Processor

from app.config import LogLevel, get_settings

_PHONE_RE = re.compile(r"\+?\d{10,15}")
_EMAIL_RE = re.compile(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}")


def _mask_phone(value: str) -> str:
    if len(value) <= 4:
        return "***"
    return f"+7***{value[-4:]}"


def _mask_email(value: str) -> str:
    local, _, domain = value.partition("@")
    if not local:
        return "***"
    return f"{local[0]}***@{domain}"


def redact_pii(_logger: Any, _method: str, event_dict: EventDict) -> EventDict:
    """Replace phone/email patterns in every string value before serialization.

    Conservative: applies to top-level string values only. Structured nested
    payloads must explicitly mask before logging (see SECURITY.md §7).
    """
    for key, value in list(event_dict.items()):
        if isinstance(value, str):
            value = _PHONE_RE.sub(lambda m: _mask_phone(m.group()), value)
            value = _EMAIL_RE.sub(lambda m: _mask_email(m.group()), value)
            event_dict[key] = value
    return event_dict


def configure_logging() -> None:
    settings = get_settings()
    level = logging.getLevelName(LogLevel(settings.log_level).value)

    processors: list[Processor] = [
        structlog.contextvars.merge_contextvars,
        structlog.processors.add_log_level,
        structlog.processors.TimeStamper(fmt="iso", utc=True),
        redact_pii,
        structlog.processors.StackInfoRenderer(),
        structlog.processors.format_exc_info,
        structlog.processors.JSONRenderer(),
    ]

    structlog.configure(
        processors=processors,
        wrapper_class=structlog.make_filtering_bound_logger(level),
        context_class=dict,
        logger_factory=structlog.PrintLoggerFactory(),
        cache_logger_on_first_use=True,
    )


def get_logger(name: str | None = None) -> structlog.stdlib.BoundLogger:
    return structlog.get_logger(name)  # type: ignore[no-any-return]
