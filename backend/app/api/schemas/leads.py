"""Pydantic schemas for `POST /api/leads` (T5.2).

Extra=forbid per CLAUDE.md convention. ``honeypot`` is a hidden field
that the customer-site template renders with ``display:none``; humans
leave it empty, bots fill it. The router silently 202s on a filled
honeypot so the bot doesn't learn it was caught.
"""

from __future__ import annotations

from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class _StrictModel(BaseModel):
    model_config = ConfigDict(extra="forbid")


class SubmitLeadRequest(_StrictModel):
    site_id: UUID
    name: str = Field(min_length=1, max_length=128)
    phone: str = Field(min_length=4, max_length=64)
    message: str | None = Field(default=None, max_length=2000)
    captcha_token: str
    # Honeypot — must be empty. Bots fill it.
    honeypot: str | None = Field(default=None, max_length=128)


class SubmitLeadData(_StrictModel):
    lead_id: UUID


class SubmitLeadResponse(_StrictModel):
    ok: bool = True
    data: SubmitLeadData
