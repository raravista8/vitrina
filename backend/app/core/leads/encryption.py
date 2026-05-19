"""Lead PII encryption (T5.2, FR-050, SECURITY.md A04).

Fernet (AES-128-CBC + HMAC-SHA256) at-rest encryption for the
``leads.{name_enc,phone_enc,message_enc}`` BYTEA columns. The key is
read from the ``FERNET_KEY`` env var via Pydantic Settings — never
hard-coded, never logged.

Key rotation (SECURITY.md §5): when a new key is issued, set
``FERNET_KEYS`` to a comma-separated list with the new key FIRST and
the old keys following. ``MultiFernet`` accepts old ciphertext but
encrypts new writes with the leading key. A lazy re-encryption job
(T7.x) walks the table and re-writes with the leading key on a
30-day cadence; old keys can be retired after that.

Pure-domain module: no SQLAlchemy, no FastAPI, no settings import.
The caller hands in the ``MultiFernet`` instance (constructed at
lifespan-startup from settings) so this file stays trivially
unit-testable.
"""

from __future__ import annotations

from cryptography.fernet import Fernet, InvalidToken, MultiFernet


class LeadCryptoError(Exception):
    """Base for encryption / decryption failures."""


class LeadDecryptionError(LeadCryptoError):
    """Ciphertext didn't validate against any current/legacy key.
    Either the key was rotated and the old key purged before
    re-encryption finished, or the ciphertext is corrupt. The admin
    UI surfaces this as `[decryption_failed]`."""


def build_fernet(keys: list[str]) -> MultiFernet:
    """Build a ``MultiFernet`` from the configured key list. The first
    key is used for new encryption; remaining keys decrypt legacy
    ciphertext during the rotation window.

    Raises ``LeadCryptoError`` if the list is empty or any key is
    malformed (wrong length / non-base64). Fail-fast at startup is
    SECURITY.md §A10 "fail-secure": no key = no Fernet = lifespan
    refuses to boot.
    """
    if not keys:
        raise LeadCryptoError("no_fernet_keys_configured")
    try:
        fernets = [Fernet(k.encode("ascii") if isinstance(k, str) else k) for k in keys]
    except (ValueError, TypeError) as exc:
        raise LeadCryptoError(f"invalid_fernet_key:{exc}") from exc
    return MultiFernet(fernets)


def encrypt(value: str, *, fernet: MultiFernet) -> bytes:
    """Encrypt a Unicode string. Returns the ciphertext bytes ready
    for the BYTEA column."""
    if not isinstance(value, str):
        raise LeadCryptoError(f"encrypt_expects_str:got:{type(value).__name__}")
    return fernet.encrypt(value.encode("utf-8"))


def decrypt(ciphertext: bytes, *, fernet: MultiFernet) -> str:
    """Decrypt + UTF-8 decode. Raises ``LeadDecryptionError`` on any
    failure — caller decides whether to log + return the
    ``[decryption_failed]`` placeholder or to bail out."""
    if not isinstance(ciphertext, bytes | bytearray):
        raise LeadDecryptionError(f"expected_bytes:got:{type(ciphertext).__name__}")
    try:
        return fernet.decrypt(bytes(ciphertext)).decode("utf-8")
    except InvalidToken as exc:
        raise LeadDecryptionError("invalid_token") from exc
    except UnicodeDecodeError as exc:
        raise LeadDecryptionError("not_utf8") from exc
