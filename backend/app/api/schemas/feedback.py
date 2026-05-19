"""Pydantic schemas for ``POST /api/feedback``.

One unified payload covers four kinds of feedback the public landing
collects (ADR-0009 + FR-090..093):

  - ``source_request`` — Hero waitlist for sources we don't parse yet
    (Instagram / VK / 2GIS / etc.). ``source_name`` is the canonical
    identifier (used for ≥10-vote aggregation on /admin/waitlist).
  - ``feature_request`` — landing's "хочу фичу" section.
  - ``bug`` — bug reports.
  - ``general`` — anything else.

All inputs use ``extra='forbid'`` per CLAUDE.md.
"""

from __future__ import annotations

import uuid
from typing import Annotated, Literal

from pydantic import BaseModel, ConfigDict, EmailStr, Field

FeedbackType = Literal["source_request", "feature_request", "bug", "general"]

# Canonical names recognised on the waitlist aggregation view. Keep aligned
# with `landing/lib/source-detect.ts::WaitlistSource`.
WAITLIST_SOURCE_NAMES: tuple[str, ...] = (
    "instagram",
    "vkontakte",
    "twogis",
    "avito",
    "ozon",
    "wildberries",
    "whatsapp",
    "youtube",
    "dzen",
    "max",
    "max-channel",  # MAX as a content source, not a notify channel
    "own-site",
)


class SubmitFeedbackRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    type: Annotated[FeedbackType, Field(description="Kind of feedback")]
    email: Annotated[
        EmailStr | None,
        Field(default=None, description="Optional follow-up email"),
    ] = None
    source_name: Annotated[
        str | None,
        Field(default=None, max_length=64, description="Canonical waitlist source"),
    ] = None
    source_url: Annotated[
        str | None,
        Field(default=None, max_length=2048, description="Original URL the user pasted"),
    ] = None
    message: Annotated[
        str | None,
        Field(default=None, max_length=4096, description="Free-form text"),
    ] = None
    checkboxes: Annotated[
        dict[str, bool],
        Field(default_factory=dict, description="Sources / features the user ticked"),
    ]
    consent_given: Annotated[
        bool,
        Field(description="Must be true; otherwise 400 consent_required"),
    ]
    captcha_token: Annotated[
        str,
        Field(
            min_length=1,
            max_length=4096,
            description="Yandex SmartCaptcha token; 'DEV_TOKEN' in dev",
        ),
    ]


class SubmitFeedbackData(BaseModel):
    feedback_id: uuid.UUID


class SubmitFeedbackResponse(BaseModel):
    model_config = ConfigDict(extra="forbid")

    ok: Literal[True] = True
    data: SubmitFeedbackData


__all__ = [
    "WAITLIST_SOURCE_NAMES",
    "FeedbackType",
    "SubmitFeedbackData",
    "SubmitFeedbackRequest",
    "SubmitFeedbackResponse",
]
