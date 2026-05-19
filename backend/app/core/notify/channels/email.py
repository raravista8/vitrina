"""Email channel adapter.

Wraps :class:`app.infrastructure.email.smtp_client.SmtpClient`. The
underlying SMTP transport uses stdlib ``smtplib`` wrapped in
``asyncio.to_thread`` so we don't take a new runtime dependency on
``aiosmtplib`` (per CLAUDE.md "NEVER add new runtime dependency without
ADR").

Send semantics:

  - ``recipient`` is an email address.
  - The body becomes the plain-text body; the title becomes the Subject.
  - Links are rendered as ``label: url`` lines at the bottom — plain
    text only, no HTML body for now (T6.3 may add MJML templates).
"""

from __future__ import annotations

from app.core.notify.ports import (
    ChannelType,
    DeliveryResult,
    NotificationMessage,
)
from app.infrastructure.email.smtp_client import SmtpClient
from app.utils.logging import get_logger


class EmailChannel:
    channel_type = ChannelType.email

    def __init__(self, client: SmtpClient) -> None:
        self._client = client
        self._log = get_logger("core.notify.channels.email")

    def is_available(self) -> bool:
        return self._client.is_available()

    async def send(
        self,
        *,
        recipient: str,
        message: NotificationMessage,
    ) -> DeliveryResult:
        body = _render(message)
        try:
            await self._client.send_message(
                to=recipient,
                subject=message.title,
                body=body,
            )
        except Exception as exc:
            self._log.warning(
                "email_send_failed",
                recipient_domain=_mask_domain(recipient),
                error=exc.__class__.__name__,
            )
            return DeliveryResult(
                delivered=False,
                channel=ChannelType.email,
                recipient=recipient,
                reason=f"upstream_error:{exc.__class__.__name__}",
            )
        return DeliveryResult(delivered=True, channel=ChannelType.email, recipient=recipient)


def _render(message: NotificationMessage) -> str:
    parts: list[str] = []
    if message.body:
        parts.append(message.body)
    if message.links:
        if parts:
            parts.append("")
        for label, url in message.links:
            parts.append(f"{label}: {url}")
    return "\n".join(parts) if parts else message.title


def _mask_domain(email: str) -> str:
    """Logs include only the domain — no local-part PII per SECURITY.md §7."""
    _, _, domain = email.partition("@")
    return domain or "unknown"
