"""Parser ports (hexagonal).

T3.x will implement concrete adapters for Yandex.Maps, Telegram, and photo
uploads. Per ADR-0002 and import-linter rules, this module must not import
from `app.infrastructure.*`.

Note: VK and Instagram adapters are explicitly out of scope per ADR-0009 and
ADR-0004 — users from those sources go through the photo-upload path (S4).
"""

from __future__ import annotations

from typing import Protocol


class SourceParser(Protocol):
    """Generic source parser. Concrete impls live in `core/parsing/adapters/`."""

    # Signatures defined alongside the snapshot/value-object types in T3.1.
    ...
