"""Pydantic schemas for ``POST /api/submit-application`` (canon 0.3.0).

``model_config = ConfigDict(extra="forbid")`` on every input model per
CLAUDE.md §Conventions — reject unexpected fields rather than silently
ignoring them.

Two branches:

- ``mode='link'`` — legacy fields (source_url + source_type) — used by the
  Hero link input + StickyHeader CTA. ``contact``/``channel`` carry the
  notify channel (how WE reach the master).

- ``mode='photo'`` — photo flow. Photos are uploaded out-of-band via
  ``POST /api/applications/{id}/photo`` (multipart, called after the JSON
  application is persisted with mode='photo' + the photo-branch text
  fields). ``description``, ``city``, ``customer_contact_*`` are required
  on the JSON body itself.
"""

from __future__ import annotations

import uuid
from typing import Annotated, Literal

from pydantic import BaseModel, ConfigDict, Field, HttpUrl


# Reused base — shared fields across link and photo branches.
class _SharedSubmitFields(BaseModel):
    model_config = ConfigDict(extra="forbid")

    # v2 (PR-D / E12 / ADR-0008 v2): explicit `channel` plus `contact`. Old
    # v1 callers (sans `channel`) still work — when omitted, server falls
    # back to auto-detect on `contact` (compat layer).
    channel: Annotated[
        Literal["email", "phone", "telegram", "max", "whatsapp"] | None,
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
                "Notify-channel contact (how WE reach the master). Validated against "
                "`channel` shape when `channel` is set (v2); otherwise auto-detected."
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


class SubmitApplicationLinkRequest(_SharedSubmitFields):
    """``mode='link'`` — URL-driven application. Legacy path."""

    mode: Literal["link"] = "link"
    source_url: Annotated[HttpUrl | None, Field(description="Source-of-truth URL")] = None
    source_type: Annotated[
        Literal["ymaps", "telegram", "photo", "website"],
        Field(
            description="MVP source classes per ADR-0009 (+ 'website' = pasted link to an unrecognised site, manual review)"
        ),
    ]


class SubmitApplicationPhotoRequest(_SharedSubmitFields):
    """``mode='photo'`` — photo flow with required business-description fields.

    Photos themselves uploaded separately via the existing
    ``POST /api/applications/{id}/photo`` multipart endpoint, after this
    JSON body creates the application row with `status='pending'` +
    `mode='photo'`. The frontend chains the two calls.

    Text files (PDF / DOCX / TXT / RTF) uploaded via the analogous
    ``POST /api/applications/{id}/text-file`` (FR-015 extension).
    """

    mode: Literal["photo"]
    # min 30 chars of meaningful text — the description IS the LLM-input
    # for site-content generation; anything shorter is unusable.
    description: Annotated[
        str,
        Field(
            min_length=30,
            max_length=4000,
            description="What the business does — required free-text from the master.",
        ),
    ]
    city: Annotated[
        str,
        Field(
            min_length=1,
            max_length=128,
            description="City (rendered on the customer-site).",
        ),
    ]
    customer_contact_type: Annotated[
        Literal["phone", "telegram"],
        Field(
            description=(
                "Type of the PUBLIC contact rendered on the customer-site CTA. "
                "Distinct from notify `channel`."
            ),
        ),
    ]
    customer_contact_value: Annotated[
        str,
        Field(
            min_length=2,
            max_length=64,
            description=(
                "Public contact value (phone E.164 or @telegram). "
                "Fernet-encrypted at write — PII."
            ),
        ),
    ]


# Discriminated union — Pydantic picks the right model based on `mode`.
SubmitApplicationRequest = Annotated[
    SubmitApplicationLinkRequest | SubmitApplicationPhotoRequest,
    Field(discriminator="mode"),
]


class SubmitApplicationData(BaseModel):
    application_id: uuid.UUID
    contact_type: Literal["email", "phone", "telegram", "max", "whatsapp"]


class SubmitApplicationResponse(BaseModel):
    model_config = ConfigDict(extra="forbid")

    ok: Literal[True] = True
    data: SubmitApplicationData
