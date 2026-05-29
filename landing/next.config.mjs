/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // `@samosite/canon` is a workspace-vendored package (../packages/canon),
  // installed via `file:` which creates a symlink in node_modules. Turbopack
  // (Next 16 default bundler) doesn't follow symlinks for peer-dep resolution
  // out-of-the-box — its module loader looks for `react` from the canon
  // package's PHYSICAL location, where landing's node_modules isn't visible.
  // `transpilePackages` forces Next to inline-bundle the package the same
  // way it bundles local source, so peer deps (React 19) resolve from
  // landing's node_modules naturally. Same flag covers webpack fallback if
  // we ever drop turbopack.
  transpilePackages: ["@samosite/canon"],
  // Security headers applied at the edge in production (Caddy); also set here
  // so `next dev` and `next start` are consistent. CSP is intentionally
  // duplicated client-side via meta-tag in app/layout.tsx for static export
  // fallback.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "geolocation=(), microphone=(), camera=()",
          },
        ],
      },
    ];
  },
  // In dev, proxy backend paths to FastAPI so the admin Next.js shell can
  // share the same origin (and therefore the same admin_session cookie)
  // as the API. In production this routing is handled by Caddy.
  async rewrites() {
    const backend = process.env.BACKEND_ORIGIN || "http://localhost:8000";
    return [
      // Public landing endpoints.
      { source: "/api/:path*", destination: `${backend}/api/:path*` },
      // Admin JSON API (PR-E). The Next.js admin shell lives at /admin/*,
      // so we must only proxy /admin/api/*, NOT the whole /admin/* tree.
      { source: "/admin/api/:path*", destination: `${backend}/admin/api/:path*` },
    ];
  },
  // `/feedback` retired (canon 0.9.1 — feedback is now a modal over any page).
  // 301 the old standalone route home so stale links / search-index entries
  // don't 404. The modal's FAB + Footer link cover the entry points.
  async redirects() {
    return [{ source: "/feedback", destination: "/", permanent: true }];
  },
};

export default nextConfig;
