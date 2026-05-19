"""Notification primitives (T1.6).

Three ideas live here:

  - ``NotificationKind`` — what kind of event we're notifying about. The
    kind, not the recipient, decides which channels are eligible (FR-002c
    SMS-safety: ``application_received`` MUST NOT go via SMS to keep
    admin alerts cheap and avoid spam fines).
  - ``NotificationMessage`` — channel-agnostic payload (title + body in
    plain text; channels handle formatting). PII is the caller's
    responsibility: pass already-masked strings (SECURITY.md §7).
  - ``NotificationChannel`` — Protocol for a transport (TG / MAX / email
    / SMS). The dispatcher iterates a fallback chain and picks the first
    channel that is *available* and *allowed for the kind*.

This module is pure-domain: no FastAPI, no SQLAlchemy, no aiogram.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from enum import StrEnum
from typing import Protocol


class NotificationKind(StrEnum):
    """Why we're notifying. Determines which channels may carry the message.

    Each kind is mapped to ``ALLOWED_CHANNELS_FOR_KIND`` below. Adding a
    new kind without a mapping entry is a programming error — the
    dispatcher raises in that case.
    """

    application_received = "application_received"  # founder ← end user submitted
    application_approved = "application_approved"  # user ← founder accepted
    site_published = "site_published"  # user ← site is live
    lead_received = "lead_received"  # site owner ← visitor submitted lead
    subscription_expiring = "subscription_expiring"  # user ← billing
    magic_link = "magic_link"  # user ← auth flow (email only)


class ChannelType(StrEnum):
    """Identifier of a transport. Mirrors ``users.contact_type`` plus SMS."""

    telegram = "telegram"
    max = "max"
    email = "email"
    sms = "sms"


# FR-002b fallback chain (ADR-0008). The dispatcher walks the chain in
# order; each kind further filters by ``ALLOWED_CHANNELS_FOR_KIND``.
DEFAULT_FALLBACK_CHAIN: tuple[ChannelType, ...] = (
    ChannelType.telegram,
    ChannelType.max,
    ChannelType.email,
    ChannelType.sms,
)


# FR-002c: which channels each kind is allowed on. Notably,
# ``application_received`` excludes SMS (admin alerts only) and
# ``magic_link`` is email-only.
ALLOWED_CHANNELS_FOR_KIND: dict[NotificationKind, frozenset[ChannelType]] = {
    NotificationKind.application_received: frozenset(
        {
            ChannelType.telegram,
            ChannelType.max,
            ChannelType.email,
        }
    ),
    NotificationKind.application_approved: frozenset(
        {
            ChannelType.telegram,
            ChannelType.max,
            ChannelType.email,
            ChannelType.sms,
        }
    ),
    NotificationKind.site_published: frozenset(
        {
            ChannelType.telegram,
            ChannelType.max,
            ChannelType.email,
            ChannelType.sms,
        }
    ),
    NotificationKind.lead_received: frozenset(
        {
            ChannelType.telegram,
            ChannelType.max,
            ChannelType.email,
            ChannelType.sms,
        }
    ),
    NotificationKind.subscription_expiring: frozenset(
        {
            ChannelType.telegram,
            ChannelType.max,
            ChannelType.email,
            ChannelType.sms,
        }
    ),
    NotificationKind.magic_link: frozenset({ChannelType.email}),
}


@dataclass(frozen=True, slots=True)
class NotificationMessage:
    """Channel-agnostic message payload.

    `title` is the short summary line (TG/email subject; SMS truncates).
    `body` is the optional longer text (full email body, multi-line TG).
    `links` is an optional list of action URLs the channel renders as buttons
    when supported (TG inline keyboard, MD links in email).
    """

    title: str
    body: str = ""
    links: tuple[tuple[str, str], ...] = ()  # ((label, url), ...)
    metadata: dict[str, str] = field(default_factory=dict)


@dataclass(frozen=True, slots=True)
class DeliveryResult:
    delivered: bool
    channel: ChannelType
    recipient: str
    reason: str | None = None  # e.g. "channel_unavailable", "upstream_error:Timeout"


class NotificationChannel(Protocol):
    """A transport. Implementations live in ``app.core.notify.channels.*``
    and use concrete clients from ``app.infrastructure.{telegram,email,…}``.

    `is_available()` returns True only when the channel can actually
    deliver (e.g. SMTP host configured, TG bot token set). The dispatcher
    skips unavailable channels silently and falls back to the next link
    in the chain — no exceptions on a missing-config path.
    """

    channel_type: ChannelType

    def is_available(self) -> bool: ...

    async def send(
        self,
        *,
        recipient: str,
        message: NotificationMessage,
    ) -> DeliveryResult: ...
