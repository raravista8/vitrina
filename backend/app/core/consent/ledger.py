"""Consent ledger (T6.1, FR-070).

Single source of truth for the ``consents`` table writes. Every form
that collects PII (applications, feedback, customer-site leads) routes
through ``record_consent`` so the captured fields stay uniform:

  - ``policy_version`` (int) — bumped any time the canon text changes
  - ``consent_text``  — the exact wording shown to the user
  - ``ip`` / ``user_agent`` — evidence captured by the API middleware
  - ``user_id`` — nullable; anonymous feedback records consent against
                  NULL user, which the ORM model permits (ON DELETE
                  SET NULL keeps the legal evidence alive after a
                  data-erasure request — see SECURITY.md §9.3)

When the policy text drifts (T6.3 lawyer-reviewed update) the version
is bumped here and the migration adds the new constant; old rows still
reference the version they were collected under, so the row alone is
a defensible legal record.
"""

from __future__ import annotations

import uuid
from typing import Final

from sqlalchemy.ext.asyncio import AsyncSession

from app.infrastructure.postgres.models import Consent

# --- Policy text registry --------------------------------------------------
#
# Append-only: every new version stays here forever so older Consent rows
# can still be rendered with the exact text the subject saw. The current
# version is exposed as ``CURRENT_POLICY_VERSION``.

POLICY_TEXTS: Final[dict[int, str]] = {
    1: (
        "Я согласен(а) на обработку моих персональных данных оператором "
        "ИП «Vitrina» в соответствии с политикой конфиденциальности, "
        "опубликованной на samosite.online/privacy, в целях создания и "
        "поддержания моего сайта на поддомене *.samosite.online и передачи "
        "мне заявок от посетителей сайта."
    ),
}
CURRENT_POLICY_VERSION: Final[int] = 1
CURRENT_POLICY_TEXT: Final[str] = POLICY_TEXTS[CURRENT_POLICY_VERSION]


async def record_consent(
    *,
    session: AsyncSession,
    user_id: uuid.UUID | None,
    ip: str | None,
    user_agent: str | None,
    policy_version: int = CURRENT_POLICY_VERSION,
    consent_text: str | None = None,
) -> Consent:
    """Insert one Consent row, return the persisted instance.

    The caller is responsible for transaction boundaries. The function
    calls ``session.flush()`` so the row gets an ``id`` if the caller
    needs to link it (Applications.consent_id), but never
    ``session.commit()`` — that stays with the orchestrator.

    Passing ``consent_text=None`` records the canonical text for the
    given ``policy_version``. Passing an explicit string is reserved
    for tests / replays that need to lock in historical wording.
    """
    text = consent_text if consent_text is not None else POLICY_TEXTS[policy_version]
    consent = Consent(
        user_id=user_id,
        policy_version=policy_version,
        consent_text=text,
        ip=ip,
        user_agent=user_agent,
    )
    session.add(consent)
    await session.flush()
    return consent
