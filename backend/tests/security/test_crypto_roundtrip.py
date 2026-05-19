"""Fernet roundtrip + key rotation tests (T5.2 / SECURITY.md A04)."""

from __future__ import annotations

import pytest
from cryptography.fernet import Fernet

from app.core.leads.encryption import (
    LeadCryptoError,
    LeadDecryptionError,
    build_fernet,
    decrypt,
    encrypt,
)


def _new_key() -> str:
    return Fernet.generate_key().decode("ascii")


# --- happy path -----------------------------------------------------------


@pytest.mark.security
def test_roundtrip_preserves_unicode() -> None:
    fernet = build_fernet([_new_key()])
    cipher = encrypt("Анна Иванова +7 921 123-45-67", fernet=fernet)
    assert isinstance(cipher, bytes)
    assert b"\xff\xd8\xff" not in cipher  # not a magic image marker
    assert decrypt(cipher, fernet=fernet) == "Анна Иванова +7 921 123-45-67"


@pytest.mark.security
def test_roundtrip_long_message() -> None:
    fernet = build_fernet([_new_key()])
    payload = "Очень длинное сообщение от клиента " * 50  # ~1.7 KB
    cipher = encrypt(payload, fernet=fernet)
    assert decrypt(cipher, fernet=fernet) == payload


@pytest.mark.security
def test_ciphertext_changes_per_call() -> None:
    """Fernet uses a random IV; same plaintext → different ciphertext.
    Protects against pattern analysis on the BYTEA column."""
    fernet = build_fernet([_new_key()])
    a = encrypt("phone", fernet=fernet)
    b = encrypt("phone", fernet=fernet)
    assert a != b
    assert decrypt(a, fernet=fernet) == "phone"
    assert decrypt(b, fernet=fernet) == "phone"


# --- key rotation ---------------------------------------------------------


@pytest.mark.security
def test_rotation_old_ciphertext_decryptable_after_new_key_added() -> None:
    """Issue legacy ciphertext with old key, then rotate: new key
    encrypts new writes, old key still decrypts legacy."""
    old_key = _new_key()
    new_key = _new_key()
    legacy_fernet = build_fernet([old_key])
    legacy_cipher = encrypt("legacy phone", fernet=legacy_fernet)

    # Rotation: new key first, old key second.
    rotated = build_fernet([new_key, old_key])
    assert decrypt(legacy_cipher, fernet=rotated) == "legacy phone"

    # New writes use the new key — old-only Fernet can't decrypt them.
    new_cipher = encrypt("new phone", fernet=rotated)
    new_only = build_fernet([new_key])
    assert decrypt(new_cipher, fernet=new_only) == "new phone"
    old_only = build_fernet([old_key])
    with pytest.raises(LeadDecryptionError):
        decrypt(new_cipher, fernet=old_only)


@pytest.mark.security
def test_decrypt_with_wrong_key_raises() -> None:
    fernet_a = build_fernet([_new_key()])
    fernet_b = build_fernet([_new_key()])
    cipher = encrypt("secret", fernet=fernet_a)
    with pytest.raises(LeadDecryptionError, match="invalid_token"):
        decrypt(cipher, fernet=fernet_b)


# --- error modes ----------------------------------------------------------


@pytest.mark.security
def test_empty_key_list_fails_fast() -> None:
    with pytest.raises(LeadCryptoError, match="no_fernet_keys"):
        build_fernet([])


@pytest.mark.security
def test_malformed_key_rejected() -> None:
    with pytest.raises(LeadCryptoError, match="invalid_fernet_key"):
        build_fernet(["not-a-real-fernet-key"])


@pytest.mark.security
def test_decrypt_non_bytes_input_raises() -> None:
    fernet = build_fernet([_new_key()])
    with pytest.raises(LeadDecryptionError, match="expected_bytes"):
        decrypt("not bytes", fernet=fernet)  # type: ignore[arg-type]


@pytest.mark.security
def test_decrypt_garbage_bytes_raises() -> None:
    fernet = build_fernet([_new_key()])
    with pytest.raises(LeadDecryptionError):
        decrypt(b"random non-fernet bytes", fernet=fernet)


@pytest.mark.security
def test_encrypt_non_str_input_raises() -> None:
    fernet = build_fernet([_new_key()])
    with pytest.raises(LeadCryptoError, match="encrypt_expects_str"):
        encrypt(b"already bytes", fernet=fernet)  # type: ignore[arg-type]


# --- PII masking helpers --------------------------------------------------


@pytest.mark.security
def test_pii_masking_phone() -> None:
    from app.core.leads.pii_masking import mask_phone

    assert mask_phone("+7 921 123-45-67") == "+***-***-45-67"
    assert mask_phone("+79211234567") == "+***-***-45-67"
    assert mask_phone("123") == "123"  # too short to mask sensibly
    assert mask_phone("") == ""


@pytest.mark.security
def test_pii_masking_email() -> None:
    from app.core.leads.pii_masking import mask_email

    assert mask_email("anna@example.com") == "a***@example.com"
    assert mask_email("a@b.io") == "a***@b.io"
    assert mask_email("not-an-email") == "***"
    assert mask_email("") == ""


@pytest.mark.security
def test_pii_masking_name() -> None:
    from app.core.leads.pii_masking import mask_name

    assert mask_name("Анна Иванова") == "Анна И."
    assert mask_name("Анна") == "Анна"
    assert mask_name("") == ""
    assert mask_name("Иван Иванович Иванов") == "Иван И."
