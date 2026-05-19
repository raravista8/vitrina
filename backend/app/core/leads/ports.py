"""Lead intake value-objects (T5.2).

The orchestrator that turns a ``LeadDraft`` into a persisted row
lives in ``app.infrastructure.leads.service`` because it imports
SQLAlchemy. Pure-domain types stay here so the API router + tests can
construct them without touching the DB.
"""

from __future__ import annotations

import uuid
from dataclasses import dataclass


@dataclass(frozen=True, slots=True)
class LeadDraft:
    """Cleartext payload as it enters the intake flow. Held in memory
    only for the duration of the request — never persisted in
    cleartext."""

    site_id: uuid.UUID
    name: str
    phone: str
    message: str | None
    ip: str | None
    user_agent: str | None


@dataclass(frozen=True, slots=True)
class LeadIntakeResult:
    """Service return shape. ``status`` is the discriminator the
    router maps to HTTP codes."""

    status: str  # "accepted" | "site_not_found" | "site_not_published"
    lead_id: uuid.UUID | None = None
    site_id: uuid.UUID | None = None
