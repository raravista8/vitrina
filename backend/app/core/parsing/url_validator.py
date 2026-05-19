"""SSRF-hardened URL validator (T3.1).

Adapters call ``validate_source_url(url, allowlist)`` before opening any
HTTP connection. Validation runs in three stages:

  1. **Scheme + structure.** Must be ``http``/``https``, must parse,
     hostname must be present.
  2. **Domain allowlist.** Hostname must match one of the regex
     fragments the caller passes in (per-adapter — YMaps allows
     ``yandex.\\w+``, TG allows ``t\\.me``, etc.).
  3. **DNS resolution.** Hostname is resolved to one or more IPs; if
     ANY of them falls in a private/loopback/link-local/CGNAT range the
     request is rejected as a ``SsrfBlocked`` (FR-011, SECURITY.md T5.1).

The validator returns the resolved IP list on success — adapters that
care about DNS-rebinding can pin the connection to that IP for the
actual fetch (httpx ``transport`` hook in T3.2+).

Coverage: ``tests/security/test_ssrf.py`` exercises 20+ payload kinds
including RFC1918 / 127.0.0.0/8 / 169.254.0.0/16 / IPv6 loopback /
ULA / link-local / metadata service / CGNAT.
"""

from __future__ import annotations

import ipaddress
import re
import socket
from dataclasses import dataclass
from urllib.parse import urlparse

from app.core.parsing.ports import InvalidSourceUrl, SsrfBlocked


@dataclass(frozen=True, slots=True)
class ValidatedUrl:
    """Successful validation result.

    The caller uses ``resolved_ips`` to pin the actual HTTP connection
    when DNS-rebinding is a concern (a benign first lookup followed by
    a malicious second one for the real fetch).
    """

    url: str
    scheme: str
    hostname: str
    resolved_ips: tuple[str, ...]


def validate_source_url(
    raw_url: str,
    *,
    domain_allowlist: tuple[str, ...],
    allow_resolution: bool = True,
) -> ValidatedUrl:
    """Validate ``raw_url`` against scheme + allowlist + DNS-IP rules.

    ``domain_allowlist`` is a tuple of regex *fragments* — each is
    matched with ``re.fullmatch`` against the lowercase hostname. The
    fragments are written close to the call site (per adapter) so each
    adapter declares its own surface area explicitly.

    ``allow_resolution=False`` skips the DNS check — used only by tests
    that want to assert the regex layer in isolation.

    Raises:
        InvalidSourceUrl: scheme/structure/allowlist failure.
        SsrfBlocked: DNS resolved to a non-public address.
    """
    if not raw_url or not isinstance(raw_url, str):
        raise InvalidSourceUrl("empty_url")
    if len(raw_url) > 2048:
        raise InvalidSourceUrl("url_too_long")

    parsed = urlparse(raw_url.strip())
    scheme = parsed.scheme.lower()
    if scheme not in {"http", "https"}:
        raise InvalidSourceUrl(f"bad_scheme:{scheme or 'empty'}")

    hostname = (parsed.hostname or "").lower()
    if not hostname:
        raise InvalidSourceUrl("missing_hostname")

    # Reject obviously-IP hostnames before DNS — they can't legitimately
    # be in the allowlist (which is domain regex). The DNS branch below
    # also catches them, this is a fast-path + clearer error.
    if _is_ip_literal(hostname):
        raise InvalidSourceUrl(f"ip_literal:{hostname}")

    if not _matches_any(hostname, domain_allowlist):
        raise InvalidSourceUrl(f"domain_not_allowed:{hostname}")

    resolved_ips: tuple[str, ...] = ()
    if allow_resolution:
        resolved_ips = _resolve(hostname)
        for ip in resolved_ips:
            if _is_private_ip(ip):
                raise SsrfBlocked(f"private_ip:{ip}")

    return ValidatedUrl(
        url=raw_url,
        scheme=scheme,
        hostname=hostname,
        resolved_ips=resolved_ips,
    )


# --- helpers ---------------------------------------------------------------


def _matches_any(hostname: str, fragments: tuple[str, ...]) -> bool:
    return any(re.fullmatch(f, hostname) for f in fragments)


def _is_ip_literal(hostname: str) -> bool:
    try:
        ipaddress.ip_address(hostname.strip("[]"))
    except ValueError:
        return False
    return True


def _resolve(hostname: str) -> tuple[str, ...]:
    """Resolve to all A/AAAA records. Raises ``SsrfBlocked`` on lookup
    failure (a hostname that doesn't resolve at all is not necessarily
    malicious but is definitely unparseable, so we bail early)."""
    try:
        infos = socket.getaddrinfo(hostname, None)
    except socket.gaierror as exc:
        raise SsrfBlocked(f"dns_failure:{hostname}") from exc
    return tuple({str(info[4][0]) for info in infos})  # dedupe


def _is_private_ip(ip_str: str) -> bool:
    """True iff the address is in any non-public range.

    Covers the full RFC 6890 unrouteable set plus the 169.254.169.254
    cloud-metadata service:
      - 0.0.0.0/8, 127.0.0.0/8 (loopback), 10/8, 172.16/12, 192.168/16
      - 169.254/16 (link-local + AWS/Yandex Cloud IMDS)
      - 100.64/10 (CGNAT)
      - ::1, fc00::/7 (ULA), fe80::/10 (link-local IPv6), ::ffff:127.0.0.0/104
    """
    try:
        ip = ipaddress.ip_address(ip_str)
    except ValueError:
        return True  # un-parseable → treat as suspicious, block
    return (
        ip.is_private
        or ip.is_loopback
        or ip.is_link_local
        or ip.is_multicast
        or ip.is_reserved
        or ip.is_unspecified
        or _is_cgnat(ip)
    )


def _is_cgnat(ip: ipaddress.IPv4Address | ipaddress.IPv6Address) -> bool:
    """100.64.0.0/10 — carrier-grade NAT, not strictly "private" per
    Python's stdlib but still unrouteable from the public internet."""
    if isinstance(ip, ipaddress.IPv4Address):
        return ip in ipaddress.ip_network("100.64.0.0/10")
    return False
