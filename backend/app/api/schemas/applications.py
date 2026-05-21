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
    # v2 (PR-D / E12 / ADR-0008 v2): explicit `channel` plus `contact`. Old
    # v1 callers (sans `channel`) still work — when omitted, server falls
    # back to auto-detect on `contact` (compat layer). Once все frontend'ы
    # обновятся, можно убрать optional и сделать обязательным.
    channel: Annotated[
        Literal["email", "phone", "telegram", "max"] | None,
        Field(
            default=None,
            description=(
                "Explicit channel picked by the user via radio (v2). Server validates "
                "`contact` matches the shape of this channel; 400 invalid_contact_for_channel "
                "if not. When None, falls back to auto-detect on `contact` (v1 compat)."
            ),
        ),
    ] = None
    contact: Annotated[
        str,
        Field(
            min_length=2,
            max_length=320,  # max email length per RFC
            description=(
                "Contact value. Validated against `channel` shape when `channel` is set "
                "(v2); otherwise auto-detected via core/contact/auto_detect.py (v1 compat)."
            ),
        ),
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
            description="Yandex SmartCaptcha token (invisible mode); 'DEV_TOKEN' in dev",
        ),
    ]


class SubmitApplicationData(BaseModel):
    application_id: uuid.UUID
    contact_type: Literal["email", "phone", "telegram", "max"]


class SubmitApplicationResponse(BaseModel):
    model_config = ConfigDict(extra="forbid")

    ok: Literal[True] = True
    data: SubmitApplicationData
