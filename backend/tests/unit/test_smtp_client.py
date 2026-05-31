"""Transport selection for the SMTP client.

Port 465 (Yandex 360 / SMTPS) must use implicit TLS (`SMTP_SSL`, no STARTTLS);
587 / 25 must use plain connect + STARTTLS. Auth + the RFC-5322 From header are
asserted on both paths. smtplib is mocked — no network.
"""

from __future__ import annotations

from unittest.mock import patch

from app.infrastructure.email.smtp_client import SmtpClient

_SSL = "app.infrastructure.email.smtp_client.smtplib.SMTP_SSL"
_PLAIN = "app.infrastructure.email.smtp_client.smtplib.SMTP"


def _ctx(mock_cls):  # type: ignore[no-untyped-def]
    # `with smtplib.X(...) as smtp:` → the entered object
    return mock_cls.return_value.__enter__.return_value


def test_port_465_uses_implicit_ssl_no_starttls() -> None:
    client = SmtpClient(
        host="smtp.yandex.ru",
        port=465,
        user="info@samosite.online",
        password="app-pw",  # pragma: allowlist secret
        sender="Самосайт <info@samosite.online>",
    )
    with patch(_SSL) as ssl_cls, patch(_PLAIN) as plain_cls:
        client._send_sync("smtp.yandex.ru", "lead@example.ru", "Тема", "Текст")

    ssl_cls.assert_called_once()
    plain_cls.assert_not_called()
    smtp = _ctx(ssl_cls)
    smtp.starttls.assert_not_called()  # SMTPS is already encrypted
    smtp.login.assert_called_once_with("info@samosite.online", "app-pw")
    sent = smtp.send_message.call_args[0][0]
    assert sent["From"] == "Самосайт <info@samosite.online>"
    assert sent["To"] == "lead@example.ru"
    assert sent["Subject"] == "Тема"


def test_port_587_uses_starttls() -> None:
    client = SmtpClient(host="smtp.example.ru", port=587, user="u", password="p")
    with patch(_SSL) as ssl_cls, patch(_PLAIN) as plain_cls:
        client._send_sync("smtp.example.ru", "to@x.ru", "s", "b")

    plain_cls.assert_called_once()
    ssl_cls.assert_not_called()
    smtp = _ctx(plain_cls)
    smtp.starttls.assert_called_once()
    smtp.login.assert_called_once_with("u", "p")


def test_use_ssl_override_forces_ssl_on_587() -> None:
    client = SmtpClient(host="h", port=587, use_ssl=True)
    with patch(_SSL) as ssl_cls, patch(_PLAIN) as plain_cls:
        client._send_sync("h", "to@x.ru", "s", "b")
    ssl_cls.assert_called_once()
    plain_cls.assert_not_called()


def test_no_login_without_credentials() -> None:
    client = SmtpClient(host="h", port=587)  # anonymous relay
    with patch(_SSL), patch(_PLAIN) as plain_cls:
        client._send_sync("h", "to@x.ru", "s", "b")
    _ctx(plain_cls).login.assert_not_called()


def test_is_available_reflects_host() -> None:
    assert SmtpClient(host=None).is_available() is False
    assert SmtpClient(host="smtp.yandex.ru", port=465).is_available() is True
