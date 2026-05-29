import type { MetadataRoute } from "next";

// Next.js 14 App Router emits this at `/sitemap.xml` automatically.
//
// Scope: public landing pages only. Customer subdomains
// (`*.samosite.online`) ship their own sitemap via the Jinja2 template
// in `sites-template/sitemap.xml.j2` — that one is per-site and
// per-tenant, served from S3, not from Next.

const SITE_URL = process.env["NEXT_PUBLIC_SITE_URL"] ?? "https://samosite.online";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    // `/feedback` retired (canon 0.9.1 — feedback is a modal over any page;
    // the route 301-redirects to `/`). Dropped from the sitemap so crawlers
    // don't index a redirect.
    {
      url: `${SITE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/offer`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
