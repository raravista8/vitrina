"""Generation-audit writer (T4.5).

First ``FULL_CAPTURE_LIMIT`` rows persist the complete prompt +
response so the founder can review what YandexGPT is producing. After
that the writer switches to truncated logging — only token counts +
safety flags survive. This keeps the table bounded and the
``response_text`` column out of any bulk-export path.

Retention policy: rows are kept 30 days OR until row
``FULL_CAPTURE_LIMIT``, whichever later. A scheduled cleanup job
lives in T7.x ops; for MVP the founder can drop rows by hand.

Lives under ``app.infrastructure`` because it imports SQLAlchemy
models — the hexagonal contract (.importlinter) forbids ``core/``
from doing that. The ``GenerationOutcome`` it takes is a pure-domain
dataclass from ``app.core.content.service``.
"""

from __future__ import annotations

import uuid

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.content.service import GenerationOutcome
from app.infrastructure.postgres.models import GenerationAudit

FULL_CAPTURE_LIMIT = 100


async def write_audit_row(
    *,
    session: AsyncSession,
    site_id: uuid.UUID,
    outcome: GenerationOutcome,
) -> GenerationAudit:
    """Insert one ``generation_audits`` row.

    Looks at the existing row count to decide whether to persist the
    full prompt/response or only the truncated telemetry. The caller
    owns the transaction; this function flushes but doesn't commit.
    """
    existing = (
        await session.execute(select(func.count()).select_from(GenerationAudit))
    ).scalar_one()
    full_capture = existing < FULL_CAPTURE_LIMIT

    row = GenerationAudit(
        site_id=site_id,
        prompt_version=outcome.prompt_version,
        model_name=outcome.model_name,
        system_prompt=outcome.system_prompt if full_capture else None,
        user_prompt=outcome.user_prompt if full_capture else None,
        response_text=outcome.response_text if full_capture else None,
        tokens_in=outcome.tokens_in,
        tokens_out=outcome.tokens_out,
        pii_masked_count=outcome.pii_masked_count,
        safety_flags=list(outcome.safety_flags),
        status=outcome.status,
        error_message=outcome.error_message,
    )
    session.add(row)
    await session.flush()
    return row
