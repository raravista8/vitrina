"""Data-erasure + self-service service (T6.2, T6.5 / FR-071).

Two-step flow per SECURITY.md §9.3:

  1. ``request_erasure`` — accepts a contact, locates the matching User
     (if any), generates a single-use confirmation token (15 min TTL),
     persists a `deletion_requests` row with the SHA-256 hash of the
     token, returns the bare token so the caller (router) can email it.

     We never raise on "contact not found" — that would leak whether
     a given email has an account. Same flow runs to its logical end
     with no row materialised; the router returns the same 202 either
     way.

  2. ``confirm_erasure`` — looks up the row by token hash, validates
     the lifecycle (pending + not expired), then performs the erasure
     synchronously and writes an `admin_actions` audit row.

T6.5 piggy-backs on the same token surface: ``inspect_my_data`` looks
up a User by token (without consuming it) and returns a read-only
summary the dashboard renders. Same 15-minute TTL applies. This is
enough for the MVP "view-my-sites" page — full passwordless login
(magic-link sessions) is a later ticket.

The deletion itself touches:

  - sites      — CASCADE on FK
  - leads      — CASCADE on sites
  - events     — CASCADE on sites
  - sync_runs  — CASCADE on sites
  - feedback   — SET NULL on user_id; we additionally NULL the `email`
                 column to scrub the only PII feedback carries
  - applications — SET NULL on user_id; `contact_value` (which is PII)
                   stays so the founder can still distinguish dup
                   submissions — that's a documented trade-off; in
                   strict mode we can purge it too (toggle TODO)
  - consents   — RETAINED (legal evidence per §9.3)
  - users      — deleted last, after the cascades resolve

Encryption keys (Fernet at-rest leads) are NOT rotated here — leads
are removed by CASCADE before any decryption attempt.
"""

from __future__ import annotations

import hashlib
import secrets
import uuid
from dataclasses import dataclass
from datetime import UTC, datetime, timedelta

from sqlalchemy import delete, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.infrastructure.postgres.models import (
    AdminAction,
    Application,
    DeletionRequest,
    Feedback,
    Site,
    User,
)
from app.utils.logging import get_logger

LINK_TTL_MINUTES = 15
_log = get_logger("core.erasure.service")


# --- Request ---------------------------------------------------------------


@dataclass(frozen=True, slots=True)
class ErasureRequestOutcome:
    """What the router returns to the user. ``token`` is ``None`` when
    no matching user existed — the router still 202s so a bad-actor
    can't learn whether an email is registered."""

    token: str | None
    contact_type: str
    contact_value: str
    user_existed: bool


async def request_erasure(
    *,
    session: AsyncSession,
    contact_type: str,
    contact_value: str,
    ip: str | None,
    user_agent: str | None,
) -> ErasureRequestOutcome:
    user = (
        await session.execute(
            select(User).where(
                User.contact_type == contact_type,
                User.contact_value == contact_value,
            )
        )
    ).scalar_one_or_none()

    if user is None:
        _log.info(
            "erasure_request_no_match",
            contact_type=contact_type,
        )
        return ErasureRequestOutcome(
            token=None,
            contact_type=contact_type,
            contact_value=contact_value,
            user_existed=False,
        )

    raw_token = secrets.token_urlsafe(32)
    token_hash = _hash_token(raw_token)
    now = datetime.now(UTC)

    row = DeletionRequest(
        user_id=user.id,
        contact_type=contact_type,
        contact_value=contact_value,
        token_hash=token_hash,
        status="pending",
        expires_at=now + timedelta(minutes=LINK_TTL_MINUTES),
        ip=ip,
        user_agent=user_agent,
    )
    session.add(row)
    await session.flush()
    await session.commit()

    _log.info(
        "erasure_request_created",
        deletion_request_id=str(row.id),
        contact_type=contact_type,
    )
    return ErasureRequestOutcome(
        token=raw_token,
        contact_type=contact_type,
        contact_value=contact_value,
        user_existed=True,
    )


# --- Confirmation + erasure ------------------------------------------------


@dataclass(frozen=True, slots=True)
class ErasureCompletion:
    deletion_request_id: uuid.UUID
    user_id: uuid.UUID | None
    sites_deleted: int


class ErasureError(Exception):
    """Failure modes the router maps to 4xx."""


class ErasureTokenInvalidError(ErasureError):
    """Token doesn't match any pending request."""


class ErasureTokenExpiredError(ErasureError):
    """Token matched but lifecycle says expired/used."""


async def confirm_erasure(
    *,
    session: AsyncSession,
    raw_token: str,
    admin_id: uuid.UUID | None = None,
) -> ErasureCompletion:
    """Find by token hash → validate → erase → audit. Returns a summary
    object the router renders for the user."""
    token_hash = _hash_token(raw_token)
    row = (
        await session.execute(
            select(DeletionRequest).where(DeletionRequest.token_hash == token_hash)
        )
    ).scalar_one_or_none()
    if row is None:
        raise ErasureTokenInvalidError("token_not_found")

    now = datetime.now(UTC)
    if row.status not in {"pending", "confirmed"}:
        raise ErasureTokenExpiredError(f"already:{row.status}")
    if row.expires_at < now:
        row.status = "expired"
        await session.commit()
        raise ErasureTokenExpiredError("link_expired")

    user_id = row.user_id
    sites_deleted = 0

    if user_id is not None:
        # Sites cascade leads/events/sync_runs/seo_log entries.
        # We count first so we don't depend on Result.rowcount typing.
        site_ids = (
            (await session.execute(select(Site.id).where(Site.user_id == user_id))).scalars().all()
        )
        sites_deleted = len(site_ids)
        await session.execute(delete(Site).where(Site.user_id == user_id))

        # Feedback rows survive (anonymous waitlist signal stays useful)
        # but the email column gets nulled.
        await session.execute(
            update(Feedback).where(Feedback.user_id == user_id).values(email=None, user_id=None)
        )

        # Applications: drop the PII contact value, keep the row as a
        # historical conversion record (no user_id by SET NULL).
        await session.execute(
            update(Application)
            .where(Application.user_id == user_id)
            .values(user_id=None, contact_value="[erased]")
        )

        await session.execute(delete(User).where(User.id == user_id))

    row.status = "completed"
    row.confirmed_at = now
    row.completed_at = now

    session.add(
        AdminAction(
            admin_id=admin_id or _system_admin_uuid(),
            action="user_data_deleted",
            target_type="deletion_request",
            target_id=str(row.id),
            params={
                "sites_deleted": sites_deleted,
                "contact_type": row.contact_type,
            },
        )
    )

    await session.commit()

    _log.info(
        "erasure_completed",
        deletion_request_id=str(row.id),
        sites_deleted=sites_deleted,
    )

    return ErasureCompletion(
        deletion_request_id=row.id,
        user_id=user_id,
        sites_deleted=sites_deleted,
    )


# --- Read-only self-service inspection (T6.5) ------------------------------


@dataclass(frozen=True, slots=True)
class _SiteSummary:
    """Minimal site card the dashboard shows. Kept module-private so
    the API schema lives in `app.api.schemas.me`."""

    subdomain: str
    status: str
    source_type: str


@dataclass(frozen=True, slots=True)
class MyDataView:
    user_id: uuid.UUID
    contact_type: str
    contact_value: str
    sites: list[_SiteSummary]


async def inspect_my_data(
    *,
    session: AsyncSession,
    raw_token: str,
) -> MyDataView:
    """Read-only counterpart to ``confirm_erasure``: validates the same
    token (without consuming it) and returns a snapshot of the user's
    sites for the dashboard.

    Token has 15-min TTL; passing an expired token raises the same
    ``ErasureTokenExpiredError`` so the router maps to the same 400.
    """
    token_hash = _hash_token(raw_token)
    row = (
        await session.execute(
            select(DeletionRequest).where(DeletionRequest.token_hash == token_hash)
        )
    ).scalar_one_or_none()
    if row is None:
        raise ErasureTokenInvalidError("token_not_found")
    if row.status not in {"pending", "confirmed"}:
        raise ErasureTokenExpiredError(f"already:{row.status}")
    if row.expires_at < datetime.now(UTC):
        raise ErasureTokenExpiredError("link_expired")
    if row.user_id is None:
        # Shouldn't happen in practice — a pending row with NULL user_id
        # would mean the user was already erased. Treat as invalid.
        raise ErasureTokenInvalidError("user_missing")

    from app.infrastructure.postgres.models import Site as _Site

    sites_rows = (
        await session.execute(
            select(_Site.subdomain, _Site.status, _Site.source_type).where(
                _Site.user_id == row.user_id
            )
        )
    ).all()

    return MyDataView(
        user_id=row.user_id,
        contact_type=row.contact_type,
        contact_value=row.contact_value,
        sites=[
            _SiteSummary(subdomain=s.subdomain, status=s.status, source_type=s.source_type)
            for s in sites_rows
        ],
    )


# --- helpers --------------------------------------------------------------


def _hash_token(raw: str) -> str:
    return hashlib.sha256(raw.encode("utf-8")).hexdigest()


def _system_admin_uuid() -> uuid.UUID:
    """Stable sentinel UUID for self-service deletions where no admin
    triggered the action. The audit log can't have a NULL admin_id
    (BIGINT FK isn't on AdminAction but the column is non-null), so we
    pin a deterministic value the founder can recognise."""
    return uuid.UUID("00000000-0000-0000-0000-000000000001")
