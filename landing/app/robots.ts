import type { MetadataRoute } from "next";

// Next.js 14 App Router emits this at `/robots.txt` automatically.
//
// Crawl policy:
//   - Allow:    everything under `/` (the public landing) for all bots.
//   - Disallow: `/admin/*` and `/api/*` for everyone — admin surface is
//               behind 2FA but there's no reason to advertise it to
//               crawlers, and `/api/*` is JSON for the SPA, not pages.
//   - Sitemap:  reference the Next-generated /sitemap.xml.
//
// Customer subdomains under `*.samosite.online` ship their own
// robots.txt via the Jinja2 template in `sites-template/robots.txt.j2`
// — that one is per-tenant and points at the customer's sitemap.

const SITE_URL = process.env["NEXT_PUBLIC_SITE_URL"] ?? "https://samosite.online";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
