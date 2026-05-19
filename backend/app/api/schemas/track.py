"""Pydantic schemas for `POST /api/track` (T5.1).

Customer-site analytics events. ``payload`` is a free-form JSON
object but we cap its serialised size in the router so a malicious
embed can't bloat the events table."""

from __future__ import annotations

from typing import Any, Literal
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field

# The event_type whitelist mirrors EVENT_TYPES in
# app.infrastructure.postgres.models. Keeping it as a Literal lets
# Pydantic reject typos at the validation layer — no DB CHECK
# constraint round-trip needed.
EventType = Literal[
    "pageview",
    "click_phone",
    "click_tg",
    "click_wa",
    "form_view",
    "form_submit",
]


class _StrictModel(BaseModel):
    model_config = ConfigDict(extra="forbid")


class TrackEventRequest(_StrictModel):
    site_id: UUID
    event_type: EventType
    payload: dict[str, Any] = Field(default_factory=dict)


class TrackEventData(_StrictModel):
    event_id: int


class TrackEventResponse(_StrictModel):
    ok: bool = True
    data: TrackEventData
