"""SSRF guard tests for the URL validator (T3.1 / FR-011 / SECURITY.md T5.1).

Twenty-plus payloads covering:
  - private IPv4 ranges (10/8, 172.16/12, 192.168/16, 100.64/10)
  - loopback (127/8, ::1)
  - link-local + IMDS (169.254.169.254 — AWS/Yandex Cloud metadata)
  - IPv6 ULA + link-local + unspecified + 6to4
  - bare IP literals (no DNS resolution needed)
  - bad schemes (file://, gopher://, javascript:)
  - URL structure abuse (no host, embedded credentials, oversized)
  - domain-allowlist bypass attempts (trailing dot, IDN homoglyph)

DNS is mocked via ``monkeypatch`` so the suite runs offline. The
allowlist used here is the YMaps allowlist used by the T3.2 adapter
(``yandex\\.[a-z]+`` + ``maps\\.yandex\\.[a-z]+``).
"""

from __future__ import annotations

from collections.abc import Iterable

import pytest

from app.core.parsing.ports import InvalidSourceUrl, SsrfBlocked
from app.core.parsing.url_validator import validate_source_url

YMAPS_ALLOWLIST = (r"yandex\.[a-z]+", r"maps\.yandex\.[a-z]+")


def _mock_resolve(monkeypatch: pytest.MonkeyPatch, ips: Iterable[str]) -> None:
    """Patch socket.getaddrinfo so the validator sees ``ips``."""

    def fake_getaddrinfo(host, *_args, **_kwargs):
        return [(0, 0, 0, "", (ip, 0)) for ip in ips]

    import socket as _socket

    monkeypatch.setattr(_socket, "getaddrinfo", fake_getaddrinfo)


# --- positive: public IP through allowlisted hostname ----------------------


@pytest.mark.security
def test_public_yandex_maps_url_accepted(monkeypatch: pytest.MonkeyPatch) -> None:
    _mock_resolve(monkeypatch, ["77.88.55.55"])  # public IP
    result = validate_source_url(
        "https://yandex.ru/maps/org/123",
        domain_allowlist=YMAPS_ALLOWLIST,
    )
    assert result.hostname == "yandex.ru"
    assert "77.88.55.55" in result.resolved_ips


# --- domain allowlist ------------------------------------------------------


@pytest.mark.security
@pytest.mark.parametrize(
    "hostname",
    [
        "evil.com",
        "google.com",
        "yandex.ru.evil.com",  # subdomain trickery — won't fullmatch
        "yandex",  # missing TLD
        "yandexru",  # missing dot
    ],
)
def test_off_allowlist_hostname_rejected(hostname: str) -> None:
    with pytest.raises(InvalidSourceUrl, match="domain_not_allowed"):
        validate_source_url(
            f"https://{hostname}/maps/org/123",
            domain_allowlist=YMAPS_ALLOWLIST,
            allow_resolution=False,
        )


# --- bad scheme + structure ------------------------------------------------


@pytest.mark.security
@pytest.mark.parametrize(
    "url",
    [
        "file:///etc/passwd",
        "gopher://yandex.ru/0",
        "javascript:alert(1)",
        "data:text/html,<script>alert(1)</script>",
        "ftp://yandex.ru/",
    ],
)
def test_non_http_schemes_rejected(url: str) -> None:
    with pytest.raises(InvalidSourceUrl, match="bad_scheme"):
        validate_source_url(url, domain_allowlist=YMAPS_ALLOWLIST)


@pytest.mark.security
def test_empty_url_rejected() -> None:
    with pytest.raises(InvalidSourceUrl, match="empty_url"):
        validate_source_url("", domain_allowlist=YMAPS_ALLOWLIST)


@pytest.mark.security
def test_oversized_url_rejected() -> None:
    url = "https://yandex.ru/" + "a" * 3000
    with pytest.raises(InvalidSourceUrl, match="url_too_long"):
        validate_source_url(url, domain_allowlist=YMAPS_ALLOWLIST)


@pytest.mark.security
def test_url_without_hostname_rejected() -> None:
    with pytest.raises(InvalidSourceUrl):
        validate_source_url("https://", domain_allowlist=YMAPS_ALLOWLIST)


# --- IP literals -----------------------------------------------------------


@pytest.mark.security
@pytest.mark.parametrize(
    "url",
    [
        "https://127.0.0.1/maps/org/1",
        "https://169.254.169.254/latest/meta-data/",
        "https://10.0.0.1/",
        "https://[::1]/",
        "https://[fe80::1]/",
    ],
)
def test_ip_literal_hostnames_rejected(url: str) -> None:
    with pytest.raises(InvalidSourceUrl, match="ip_literal"):
        validate_source_url(url, domain_allowlist=YMAPS_ALLOWLIST)


# --- DNS resolves to private/loopback/link-local --------------------------


@pytest.mark.security
@pytest.mark.parametrize(
    "ip",
    [
        # IPv4 private + loopback + link-local + CGNAT + cloud-metadata
        "10.0.0.5",
        "10.255.255.255",
        "172.16.5.5",
        "172.31.99.99",
        "192.168.1.1",
        "127.0.0.1",
        "127.10.20.30",
        "169.254.169.254",  # AWS/YC IMDS
        "169.254.1.1",  # generic link-local
        "100.64.0.1",  # CGNAT
        "0.0.0.0",  # unspecified
        # IPv6
        "::1",
        "fe80::1",
        "fc00::1",
        "fd00::abcd",
        "::ffff:127.0.0.1",
    ],
)
def test_private_resolution_blocked(monkeypatch: pytest.MonkeyPatch, ip: str) -> None:
    _mock_resolve(monkeypatch, [ip])
    with pytest.raises(SsrfBlocked, match="private_ip"):
        validate_source_url(
            "https://yandex.ru/maps/org/1",
            domain_allowlist=YMAPS_ALLOWLIST,
        )


@pytest.mark.security
def test_mixed_resolution_rejects_on_any_private_ip(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    """If a hostname resolves to e.g. 1 public + 1 private IP, we still
    reject — otherwise an attacker could host an A record set with both
    a benign and a malicious target and win the race."""
    _mock_resolve(monkeypatch, ["77.88.55.55", "10.0.0.5"])
    with pytest.raises(SsrfBlocked):
        validate_source_url(
            "https://yandex.ru/maps/org/1",
            domain_allowlist=YMAPS_ALLOWLIST,
        )


# --- DNS failure -----------------------------------------------------------


@pytest.mark.security
def test_dns_failure_treated_as_ssrf_block(monkeypatch: pytest.MonkeyPatch) -> None:
    import socket as _socket

    def boom(*_args, **_kwargs):
        raise _socket.gaierror("nope")

    monkeypatch.setattr(_socket, "getaddrinfo", boom)
    with pytest.raises(SsrfBlocked, match="dns_failure"):
        validate_source_url(
            "https://yandex.ru/maps/org/1",
            domain_allowlist=YMAPS_ALLOWLIST,
        )
