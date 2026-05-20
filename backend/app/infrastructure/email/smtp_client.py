"""Async SMTP client backed by stdlib ``smtplib``.

We deliberately don't take a new runtime dependency on ``aiosmtplib`` —
the volume of email we send is admin-grade (a handful per minute even at
M3 scale), so the cost of running each send in a thread is negligible
and we keep the dependency surface small (CLAUDE.md hard rule: NEVER
add a runtime dep without an ADR).

The client is lifespan-singleton-ish: construction reads settings; every
``send_message`` opens a fresh SMTP connection. That trades a few ms
per send for not having to manage long-lived sockets across restarts.
"""

from __future__ import annotations

import asyncio
import smtplib
from email.message import EmailMessage

from app.utils.logging import get_logger


class SmtpClient:
    def __init__(
        self,
        *,
        host: str | None,
        port: int = 587,
        user: str | None = None,
        password: str | None = None,
        sender: str = "noreply@samosite.online",
        use_starttls: bool = True,
        timeout_seconds: float = 10.0,
    ) -> None:
        self._host = host
        self._port = port
        self._user = user
        self._password = password
        self._sender = sender
        self._use_starttls = use_starttls
        self._timeout = timeout_seconds
        self._log = get_logger("infrastructure.email.smtp")

    def is_available(self) -> bool:
        return bool(self._host)

    async def send_message(self, *, to: str, subject: str, body: str) -> None:
        if not self._host:
            raise RuntimeError("SmtpClient.send_message called without SMTP_HOST")
        # Narrow type for mypy: send_sync expects a concrete host.
        host = self._host
        await asyncio.to_thread(self._send_sync, host, to, subject, body)

    def _send_sync(self, host: str, to: str, subject: str, body: str) -> None:
        msg = EmailMessage()
        msg["From"] = self._sender
        msg["To"] = to
        msg["Subject"] = subject
        msg.set_content(body)

        # `smtplib.SMTP` raises on connection / auth failures; the channel
        # catches BaseException so the dispatcher can fall back cleanly.
        with smtplib.SMTP(host, self._port, timeout=self._timeout) as smtp:
            smtp.ehlo()
            if self._use_starttls:
                smtp.starttls()
                smtp.ehlo()
            if self._user and self._password:
                smtp.login(self._user, self._password)
            smtp.send_message(msg)
