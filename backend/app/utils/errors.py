"""Domain error hierarchy + `Result[T, DomainError]` alias.

Per CLAUDE.md §Conventions: domain functions return `Result`; exceptions are
raised only at the API boundary. The API exception handler maps DomainError
codes to HTTP responses.
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import TypeAlias, TypeVar

from result import Err, Ok, Result

T = TypeVar("T")


@dataclass(frozen=True, slots=True)
class DomainError(Exception):
    """Base for all domain-layer errors. `code` is the stable wire identifier
    surfaced to clients; `message` is human-readable diagnostic context for
    logs and admin UI (never shown verbatim to end users)."""

    code: str
    message: str = ""

    def __str__(self) -> str:
        return f"{self.code}: {self.message}" if self.message else self.code


# Convenience alias: domain functions return `DomainResult[Foo]`.
DomainResult: TypeAlias = Result[T, DomainError]

__all__ = ["DomainError", "DomainResult", "Err", "Ok", "Result"]
