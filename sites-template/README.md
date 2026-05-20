# sites-template — Jinja2 + Tailwind

Single universal template for customer sites (`<subdomain>.samosite.online`).
Rendered to static HTML and uploaded to Yandex Object Storage; served via
Selectel CDN.

Acceptance bar (T2.5): Lighthouse ≥90 mobile on Performance / SEO /
Accessibility, with Schema.org LocalBusiness JSON-LD, OG tags,
`sitemap.xml`, `robots.txt`, and a strict CSP.

T0.1 only puts placeholders in place; T2.5 writes the real template.
