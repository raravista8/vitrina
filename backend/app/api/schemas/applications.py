"""Pydantic schemas for ``POST /api/submit-application``.

``model_config = ConfigDict(extra="forbid")`` on every input model per
CLAUDE.md §Conventions — reject unexpected fields rather than silently
ignoring them.
"""

from __future__ import annotations

import uuid
from typing import Annotated, Literal

from pydantic import BaseModel, ConfigDict, Field, HttpUrl


class SubmitApplicationRequest(BaseModel):
    """Body for ``POST /api/submit-application``.

    The ``contact`` field is intentionally a free-form ``str`` rather than
    a discriminated union — server-side auto-detection in
    ``app.core.contact.auto_detect`` decides the actual contact_type. This
    keeps the wire shape identical to the landing form (T1.5) where the
    user types into one box.
    """

    model_config = ConfigDict(extra="forbid")

    source_url: Annotated[HttpUrl, Field(description="Source-of-truth URL")] | None = None
    source_type: Annotated[
        Literal["ymaps", "telegram", "photo"],
        Field(description="MVP source classes per ADR-0009"),
    ]
    contact: Annotated[
        str,
        Field(
            min_length=2,
            max_length=320,  # max email length per RFC
            description="Free-form contact; type is auto-detected server-side",
        ),
    ]
    consent_given: Annotated[
        bool,
        Field(description="Must be true; otherwise 400 consent_required"),
    ]


class SubmitApplicationData(BaseModel):
    application_id: uuid.UUID
    contact_type: Literal["email", "phone", "telegram", "max"]


class SubmitApplicationResponse(BaseModel):
    model_config = ConfigDict(extra="forbid")

    ok: Literal[True] = True
    data: SubmitApplicationData
