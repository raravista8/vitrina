"""Customer-site lead intake service (T5.2, FR-050).

Three-step orchestrator the ``POST /api/leads`` router calls:

  1. Site lookup — must exist and be ``status='published'`` (we don't
     accept leads against draft / archived sites). 404 otherwise.
  2. Captcha verify — token already validated by the router, this
     layer assumes truth.
  3. Encrypt + insert. ``name``/``phone``/``message`` → Fernet
     ciphertext into the BYTEA columns. ``ip`` + ``user_agent``
     persisted in cleartext (operational data, not the lead's PII).

The function never raises non-domain exceptions — every failure path
returns a ``LeadIntakeResult`` so the router can map to the canonical
4xx envelope.

The notification fan-out (T5.4) is the router's responsibility, not
the service's: it composes the masked TG message from the cleartext
``LeadDraft`` BEFORE the encryption call, so the dispatcher never
sees plain ciphertext.

Lives under ``app.infrastructure`` because it imports SQLAlchemy
models — the hexagonal contract (.importlinter) forbids ``core/leads``
from doing that. The pure-domain dataclasses live in
``app.core.leads.ports``.
"""

from __future__ import annotations

from cryptography.fernet import MultiFernet
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.leads.encryption import encrypt
from app.core.leads.ports import ElektrikLeadDraft, LeadDraft, LeadIntakeResult
from app.infrastructure.postgres.models import Lead, LeadPhoto, Site
from app.utils.logging import get_logger

_log = get_logger("infrastructure.leads.service")


async def submit_lead(
    *,
    session: AsyncSession,
    draft: LeadDraft,
    fernet: MultiFernet,
) -> LeadIntakeResult:
    """Encrypt + persist a lead. Returns success/failure shape — no
    raises on the not-found path so the router can 404 cleanly."""
    site = (
        await session.execute(select(Site).where(Site.id == draft.site_id))
    ).scalar_one_or_none()
    if site is None:
        return LeadIntakeResult(status="site_not_found")
    if site.status != "published":
        return LeadIntakeResult(status="site_not_published")

    name_enc = encrypt(draft.name, fernet=fernet)
    phone_enc = encrypt(draft.phone, fernet=fernet)
    message_enc = encrypt(draft.message, fernet=fernet) if draft.message else None

    lead = Lead(
        site_id=site.id,
        name_enc=name_enc,
        phone_enc=phone_enc,
        message_enc=message_enc,
        ip=draft.ip,
        user_agent=draft.user_agent,
    )
    session.add(lead)
    await session.flush()
    await session.commit()

    _log.info(
        "lead_accepted",
        lead_id=str(lead.id),
        site_id=str(site.id),
        has_message=draft.message is not None,
    )
    return LeadIntakeResult(status="accepted", lead_id=lead.id, site_id=site.id)


async def submit_elektrik_lead(
    *,
    session: AsyncSession,
    draft: ElektrikLeadDraft,
    fernet: MultiFernet,
) -> LeadIntakeResult:
    """Persist an extended (elektrik-spb) lead + its photos.

    Same site-published gate as ``submit_lead``. PII (name / phone / address /
    comment) and every already-processed photo's bytes are Fernet-encrypted
    here — the router hands cleartext + re-encoded image bytes, never touching
    the ciphertext. Category fields (object_type / service / call_time) are
    plaintext."""
    site = (
        await session.execute(select(Site).where(Site.id == draft.site_id))
    ).scalar_one_or_none()
    if site is None:
        return LeadIntakeResult(status="site_not_found")
    if site.status != "published":
        return LeadIntakeResult(status="site_not_published")

    lead = Lead(
        site_id=site.id,
        name_enc=encrypt(draft.name, fernet=fernet),
        phone_enc=encrypt(draft.phone, fernet=fernet),
        message_enc=encrypt(draft.comment, fernet=fernet) if draft.comment else None,
        address_enc=encrypt(draft.address, fernet=fernet) if draft.address else None,
        object_type=draft.object_type,
        service=draft.service,
        call_time=draft.call_time,
        ip=draft.ip,
        user_agent=draft.user_agent,
    )
    session.add(lead)
    await session.flush()  # assign lead.id before photo rows reference it

    for idx, (mime, data) in enumerate(draft.photos):
        session.add(
            LeadPhoto(
                lead_id=lead.id,
                index=idx,
                mime=mime,
                size_bytes=len(data),
                data_enc=fernet.encrypt(data),
            )
        )

    await session.commit()
    _log.info(
        "elektrik_lead_accepted",
        lead_id=str(lead.id),
        site_id=str(site.id),
        photos=len(draft.photos),
        has_address=draft.address is not None,
    )
    return LeadIntakeResult(status="accepted", lead_id=lead.id, site_id=site.id)
