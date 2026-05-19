/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
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
};

export default nextConfig;
