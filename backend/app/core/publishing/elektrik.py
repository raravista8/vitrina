"""Static-site renderer for the *elektrik-spb* customer site
(«Электромонтаж под ключ», served at ``elektrik-spb.samosite.online``).

Like ``milreview.py`` (and for the same reason — this prod has no Object
Storage write path), the site is rendered once at api startup and served by the
shared Host-dispatching catch-all (``app.api.routers.static_sites``); Caddy
proxies ``elektrik-spb.samosite.online/*`` → ``api:8000``.

Content lives in ``sites-template/elektrik/content/site.json`` (the per-site
config — NOT hard-coded in markup), the layout in ``index.html.j2``, and the
design CSS/JS + optimised WebP assets next to it. ``render_all`` returns a
``{key: (content, content_type)}`` map; binary assets carry ``bytes``.

SEO: per-page ``<title>``/description/canonical/OG + a JSON-LD ``Electrician``
``LocalBusiness`` with aggregateRating, sitemap.xml, robots.txt. The lead form
posts to ``POST /api/leads/elektrik`` (see ``app.api.routers.leads_elektrik``);
the visit-counter-free footer carries the «Сделано на Самосайт» platform badge.
"""

from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any

from markupsafe import Markup

from app.core.publishing.render import make_environment

_HTML = "text/html; charset=utf-8"
_CSS = "text/css; charset=utf-8"
_JS = "application/javascript; charset=utf-8"
_XML = "application/xml; charset=utf-8"
_TXT = "text/plain; charset=utf-8"
_WEBP = "image/webp"

# Service-card icons (inline SVG from the design canon). Kept here, not in the
# JSON config, because they are presentation, not content.
_SERVICE_ICONS: dict[str, str] = {
    "panel": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 4h16v16H4z"/><path d="M4 9h16M9 4v16" stroke-linecap="round"/></svg>',
    "wire": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 12h4l3-8 4 16 3-8h4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    "shield-box": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 7h6M9 11h6M9 15h3" stroke-linecap="round"/></svg>',
    "socket": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" stroke-linecap="round"/></svg>',
    "bulb": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 18h6M10 21h4" stroke-linecap="round"/><path d="M12 3a6 6 0 0 0-3 11v1h6v-1a6 6 0 0 0-3-11Z"/></svg>',
    "diag": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2a9 9 0 0 1 9 9c0 6-9 11-9 11S3 17 3 11a9 9 0 0 1 9-9Z"/><path d="m9 11 2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
}


def resolve_elektrik_dir(sites_template_dir: str | None = None) -> Path:
    """Locate ``sites-template/elektrik/`` in both the monorepo and the Docker
    image layouts (same dual-candidate approach as ``resolve_milreview_dir``)."""
    if sites_template_dir:
        return Path(sites_template_dir) / "elektrik"
    here = Path(__file__).resolve()
    candidates = (
        here.parents[4] / "sites-template",  # monorepo root
        here.parents[3] / "sites-template",  # Docker /app
    )
    for root in candidates:
        if (root / "elektrik").is_dir():
            return root / "elektrik"
    return candidates[0] / "elektrik"


def _phone_tel(phone: str) -> str:
    return re.sub(r"[^\d+]", "", phone)


def _jsonld(site: dict[str, Any], base_url: str) -> dict[str, Any]:
    seo = site.get("seo", {})
    reviews = site.get("reviews", {})
    geo = seo.get("geo", {})
    rating = str(reviews.get("score", "4,9")).replace(",", ".")
    review_count = str((reviews.get("dist") and sum(d["count"] for d in reviews["dist"])) or 89)

    # services → an OfferCatalog so search engines see the priced offering list
    offers = []
    for s in site.get("services", {}).get("items", []):
        offers.append(
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": s["title"],
                    "description": s.get("body", ""),
                },
                "priceCurrency": "RUB",
                "price": "".join(ch for ch in s.get("price", "") if ch.isdigit()) or None,
                "description": s.get("price", ""),
            }
        )

    ld: dict[str, Any] = {
        "@context": "https://schema.org",
        "@type": "Electrician",
        "name": site["brand_name"],
        "description": seo.get("description", ""),
        "url": f"{base_url}/",
        "telephone": _phone_tel(site["phone"]),
        "image": f"{base_url}/{site['hero']['photo']}",
        "priceRange": seo.get("price_range", "от 500 ₽"),
        "currenciesAccepted": "RUB",
        "sameAs": [site["avito_url"]] if site.get("avito_url") else [],
        "areaServed": [
            {"@type": "City", "name": "Санкт-Петербург"},
            {"@type": "State", "name": "Ленинградская область"},
        ],
        "address": {
            "@type": "PostalAddress",
            "addressLocality": geo.get("locality", "Санкт-Петербург"),
            "addressRegion": geo.get("region", "Санкт-Петербург и Ленинградская область"),
            "addressCountry": "RU",
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
            ],
            "opens": "08:00",
            "closes": "22:00",
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": rating,
            "reviewCount": review_count,
            "bestRating": "5",
            "worstRating": "1",
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Электромонтажные работы",
            "itemListElement": offers,
        },
    }
    if geo.get("lat") and geo.get("lon"):
        ld["geo"] = {"@type": "GeoCoordinates", "latitude": geo["lat"], "longitude": geo["lon"]}
    return ld


def _sitemap(base_url: str, lastmod: str) -> str:
    return (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f"  <url><loc>{base_url}/</loc><lastmod>{lastmod}</lastmod>"
        "<changefreq>weekly</changefreq><priority>1.0</priority></url>\n"
        f"  <url><loc>{base_url}/privacy</loc><lastmod>{lastmod}</lastmod>"
        "<changefreq>yearly</changefreq><priority>0.3</priority></url>\n"
        "</urlset>\n"
    )


def _robots(base_url: str) -> str:
    return f"User-agent: *\nAllow: /\nSitemap: {base_url}/sitemap.xml\n"


def render_all(
    *,
    base_dir: Path | None = None,
    base_url: str,
    lastmod: str = "2026-05-31",
) -> dict[str, tuple[str | bytes, str]]:
    """Render the elektrik customer site → ``{key: (content, content_type)}``.

    ``key`` is the path relative to the site root (``index.html``,
    ``privacy`` / ``privacy.html``, ``styles.css``, ``app.js``, ``hero.webp``,
    ``photos/work-1.webp`` …, ``sitemap.xml``, ``robots.txt``). Image values
    are ``bytes``.
    """
    base_dir = base_dir or resolve_elektrik_dir()
    base_url = base_url.rstrip("/")

    content = json.loads((base_dir / "content" / "site.json").read_text(encoding="utf-8"))
    env = make_environment(base_dir)
    # nosec B704 — `_SERVICE_ICONS` is a hard-coded constant dict of design SVGs
    # (not user/runtime data); marking it safe is the sanctioned pattern, not an
    # XSS sink. The key arg only selects an entry; an unknown key yields "".
    env.globals["service_icon"] = lambda key: Markup(  # nosec B704
        _SERVICE_ICONS.get(key, "")
    )

    out: dict[str, tuple[str | bytes, str]] = {}
    out["index.html"] = (
        env.get_template("index.html.j2").render(
            site=content,
            base_url=base_url,
            phone_tel=_phone_tel(content["phone"]),
            jsonld=_jsonld(content, base_url),
        ),
        _HTML,
    )
    # Privacy policy — served at /privacy (canonical) + /privacy.html (alias).
    # The lead form's consent checkbox links to /privacy; the static router keys
    # on the exact path, so register both spellings.
    privacy_html = env.get_template("privacy.html.j2").render(
        site=content,
        base_url=base_url,
        phone_tel=_phone_tel(content["phone"]),
    )
    out["privacy"] = (privacy_html, _HTML)
    out["privacy.html"] = (privacy_html, _HTML)
    out["styles.css"] = ((base_dir / "styles.css").read_text(encoding="utf-8"), _CSS)
    out["app.js"] = ((base_dir / "app.js").read_text(encoding="utf-8"), _JS)
    out["hero.webp"] = ((base_dir / "hero.webp").read_bytes(), _WEBP)
    for p in sorted((base_dir / "photos").glob("*.webp")):
        out[f"photos/{p.name}"] = (p.read_bytes(), _WEBP)
    out["sitemap.xml"] = (_sitemap(base_url, lastmod), _XML)
    out["robots.txt"] = (_robots(base_url), _TXT)
    return out
