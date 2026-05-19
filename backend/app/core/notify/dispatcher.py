"""Notification dispatcher (T1.6).

Two public entry-points:

  - ``notify_user(user, kind, message)`` — multi-channel delivery
    following the FR-002b fallback chain. The user's
    ``contact_type`` puts that channel at the head of the chain; if it
    fails (channel unavailable, recipient not /start-ed, upstream
    error), the dispatcher falls through to the next channel that has
    an alternate contact for this user. SMS-safety (FR-002c) is
    enforced via ``ALLOWED_CHANNELS_FOR_KIND``.

  - ``notify_founder(kind, message)`` — admin alerts. Always Telegram,
    always to ``TG_ADMIN_CHAT_ID`` (from settings). Simpler path: no
    fallback chain, no User row needed.

The class accepts channels in its constructor — this is the composition
root pattern. Tests pass in fakes; production wires the real adapters in
``app.api.dependencies``.
"""

from __future__ import annotations

from dataclasses import dataclass

from app.core.notify.ports import (
    ALLOWED_CHANNELS_FOR_KIND,
    DEFAULT_FALLBACK_CHAIN,
    ChannelType,
    DeliveryResult,
    NotificationChannel,
    NotificationKind,
    NotificationMessage,
)
from app.utils.logging import get_logger


@dataclass(frozen=True, slots=True)
class UserContact:
    """Subset of the User row the dispatcher needs.

    Decoupled from SQLAlchemy so the dispatcher stays pure-domain and
    can be unit-tested without a DB session.
    """

    primary_type: ChannelType
    primary_value: str
    alt_type: ChannelType | None = None
    alt_value: str | None = None


class NotificationDispatcher:
    def __init__(
        self,
        channels: dict[ChannelType, NotificationChannel],
        *,
        founder_telegram_chat_id: str | None = None,
        fallback_chain: tuple[ChannelType, ...] = DEFAULT_FALLBACK_CHAIN,
    ) -> None:
        self._channels = channels
        self._founder_chat_id = founder_telegram_chat_id
        self._fallback_chain = fallback_chain
        self._log = get_logger("core.notify.dispatcher")

    # ---- founder ---------------------------------------------------------

    async def notify_founder(
        self, kind: NotificationKind, message: NotificationMessage
    ) -> DeliveryResult:
        """Best-effort admin alert. Logs (does not raise) when the bot
        token isn't configured or TG_ADMIN_CHAT_ID is missing — admin
        alerts must never crash a production code path."""
        tg = self._channels.get(ChannelType.telegram)
        if tg is None or not tg.is_available() or not self._founder_chat_id:
            self._log.warning(
                "founder_notify_skipped",
                kind=kind.value,
                reason="telegram_unavailable_or_chat_id_missing",
            )
            return DeliveryResult(
                delivered=False,
                channel=ChannelType.telegram,
                recipient=self._founder_chat_id or "",
                reason="founder_channel_unavailable",
            )

        result = await tg.send(recipient=self._founder_chat_id, message=message)
        self._log.info(
            "founder_notified",
            kind=kind.value,
            delivered=result.delivered,
            reason=result.reason,
        )
        return result

    # ---- end user --------------------------------------------------------

    async def notify_user(
        self,
        contact: UserContact,
        kind: NotificationKind,
        message: NotificationMessage,
    ) -> DeliveryResult:
        """Try channels in fallback-chain order until one delivers.

        Channels are filtered by ``ALLOWED_CHANNELS_FOR_KIND`` so an
        ``application_received`` kind never escapes to SMS regardless of
        the user's contact_type.

        Returns the last attempt's DeliveryResult (success or last
        failure). Caller is responsible for handling a False ``delivered``
        — typically by logging to a ``failed_deliveries`` table.
        """
        allowed = ALLOWED_CHANNELS_FOR_KIND[kind]

        # Build the ordered list: user's primary channel first (if it's in
        # the chain), then the rest of the chain in canonical order.
        head = (contact.primary_type,) if contact.primary_type in self._fallback_chain else ()
        ordered = head + tuple(c for c in self._fallback_chain if c not in head)

        last: DeliveryResult | None = None
        for channel_type in ordered:
            if channel_type not in allowed:
                continue
            channel = self._channels.get(channel_type)
            if channel is None or not channel.is_available():
                continue

            recipient = self._recipient_for(contact, channel_type)
            if recipient is None:
                continue

            last = await channel.send(recipient=recipient, message=message)
            self._log.info(
                "user_notify_attempt",
                kind=kind.value,
                channel=channel_type.value,
                delivered=last.delivered,
                reason=last.reason,
            )
            if last.delivered:
                return last

        if last is None:
            self._log.warning(
                "user_notify_no_channel",
                kind=kind.value,
                primary=contact.primary_type.value,
            )
            return DeliveryResult(
                delivered=False,
                channel=contact.primary_type,
                recipient=contact.primary_value,
                reason="no_eligible_channel",
            )
        return last

    @staticmethod
    def _recipient_for(contact: UserContact, channel: ChannelType) -> str | None:
        if channel == contact.primary_type:
            return contact.primary_value
        if channel == contact.alt_type and contact.alt_value:
            return contact.alt_value
        return None
