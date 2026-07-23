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


# ---------------------------------------------------------------------------
# Feedback v2 (CANON_FEEDBACK_V2_TZ, июль 2026): «Что останавливает?» +
# «Задать вопрос». Инварианты режимов проверяет core-сервис (400 с кодом);
# здесь — только форма полей.
# ---------------------------------------------------------------------------

FeedbackV2Mode = Literal["blocker", "question"]
FeedbackV2Trigger = Literal["exit", "scroll", "button"]
FeedbackV2Channel = Literal["telegram", "whatsapp", "email"]


class SubmitFeedbackV2Request(BaseModel):
    model_config = ConfigDict(extra="forbid")

    mode: FeedbackV2Mode
    trigger: FeedbackV2Trigger
    reason: Annotated[
        str | None,
        Field(default=None, max_length=32, description="Код причины (консьерж-таблица)"),
    ] = None
    note: Annotated[
        str | None,
        Field(default=None, max_length=500, description="«Почему — одним предложением»"),
    ] = None
    question: Annotated[
        str | None,
        Field(default=None, max_length=2000, description="Текст вопроса (mode=question)"),
    ] = None
    contact_channel: FeedbackV2Channel | None = None
    contact: Annotated[str | None, Field(default=None, max_length=200)] = None
    consent_given: bool = False
    captcha_token: Annotated[str, Field(min_length=1, max_length=4096)]


class SubmitFeedbackV2Data(BaseModel):
    feedback_id: uuid.UUID


class SubmitFeedbackV2Response(BaseModel):
    model_config = ConfigDict(extra="forbid")

    ok: Literal[True] = True
    data: SubmitFeedbackV2Data


class SubmitFeedbackData(BaseModel):
    feedback_id: uuid.UUID


class SubmitFeedbackResponse(BaseModel):
    model_config = ConfigDict(extra="forbid")

    ok: Literal[True] = True
    data: SubmitFeedbackData


# Vote-first schemas (canon 0.9.x smart-union on POST /api/feedback +
# GET /api/feedback/tally) were retired in July 2026 — the consumer moved
# to Feedback v2 above.

__all__ = [
    "WAITLIST_SOURCE_NAMES",
    "FeedbackType",
    "SubmitFeedbackData",
    "SubmitFeedbackRequest",
    "SubmitFeedbackResponse",
    "SubmitFeedbackV2Data",
    "SubmitFeedbackV2Request",
    "SubmitFeedbackV2Response",
]
