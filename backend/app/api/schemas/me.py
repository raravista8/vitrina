"""Pydantic schemas for `/api/me/*` (T6.2)."""

from __future__ import annotations

from pydantic import BaseModel, ConfigDict


class _StrictModel(BaseModel):
    model_config = ConfigDict(extra="forbid")


class DeleteDataRequest(_StrictModel):
    """Body of `POST /api/me/delete-data`. Contact format mirrors the
    application form: a free-form string the server side auto-detects
    into one of {email, phone, telegram, max}."""

    contact: str


class DeleteDataConfirmedData(_StrictModel):
    deletion_request_id: str
    sites_deleted: int


class DeleteDataConfirmedResponse(_StrictModel):
    ok: bool = True
    data: DeleteDataConfirmedData


class DeleteDataRequestedResponse(_StrictModel):
    """202 envelope returned by `POST /api/me/delete-data`. We don't
    leak whether a matching user existed — the response is identical."""

    ok: bool = True
    data: dict[str, str]
