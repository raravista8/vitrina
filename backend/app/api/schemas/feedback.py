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


# ---------------------------------------------------------------------------
# Vote-first modal (canon 0.9.0 / ADR-0009 rev.2). One submit carries a batch
# of votes + an optional contact. Routed on `POST /api/feedback` alongside the
# legacy `SubmitFeedbackRequest` via a Pydantic smart-union — the two models
# have disjoint required fields, so each payload matches exactly one.
# See `docs/handoff/FEEDBACK_BACKEND.md`.
# ---------------------------------------------------------------------------

VoteKind = Literal["source", "feature"]

# option_key is a frontend-supplied slug (vk / yclients / custom_domain / …).
# Not constrained to a fixed list — canon adds options over time; we only
# enforce a safe slug shape so it can't carry markup / injection.
_OPTION_KEY = r"^[a-z0-9_-]{1,64}$"


class FeedbackVoteIn(BaseModel):
    model_config = ConfigDict(extra="forbid")

    kind: VoteKind
    key: Annotated[str, Field(pattern=_OPTION_KEY, max_length=64)]


class SubmitVotesRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    votes: Annotated[
        list[FeedbackVoteIn],
        Field(min_length=1, max_length=40, description="Ticked options (≥1)"),
    ]
    own_source: Annotated[str | None, Field(default=None, max_length=200)] = None
    own_feature: Annotated[str | None, Field(default=None, max_length=200)] = None
    message: Annotated[str | None, Field(default=None, max_length=4096)] = None
    name: Annotated[str | None, Field(default=None, max_length=200)] = None
    contact: Annotated[str | None, Field(default=None, max_length=320)] = None
    # Honeypot — must stay empty; a filled value means a bot (silently 200).
    honeypot: Annotated[str | None, Field(default=None, max_length=512)] = None
    # The vote-first modal has no captcha UI, but if a token is supplied
    # (e.g. a future interactive variant wires SmartCaptcha) we verify it.
    captcha_token: Annotated[str | None, Field(default=None, max_length=4096)] = None


class FeedbackTallyData(BaseModel):
    model_config = ConfigDict(extra="forbid")

    # option_key → distinct-voter count (real number; the UI clamps to 10).
    items: dict[str, int]
    total_week: int


class FeedbackTallyResponse(BaseModel):
    model_config = ConfigDict(extra="forbid")

    ok: Literal[True] = True
    data: FeedbackTallyData


class SubmitVotesData(BaseModel):
    model_config = ConfigDict(extra="forbid")

    accepted: int
    tally: FeedbackTallyData


class SubmitVotesResponse(BaseModel):
    model_config = ConfigDict(extra="forbid")

    ok: Literal[True] = True
    data: SubmitVotesData


__all__ = [
    "WAITLIST_SOURCE_NAMES",
    "FeedbackTallyData",
    "FeedbackTallyResponse",
    "FeedbackType",
    "FeedbackVoteIn",
    "SubmitFeedbackData",
    "SubmitFeedbackRequest",
    "SubmitFeedbackResponse",
    "SubmitVotesData",
    "SubmitVotesRequest",
    "SubmitVotesResponse",
    "VoteKind",
]
