/**
 * Auto-generated Open Graph image (1200×630) for samosite.online.
 *
 * Next.js 14 App Router convention: this file at `app/opengraph-image.tsx`
 * is picked up automatically as the `og:image` for the root route. Next
 * generates the PNG at build time and serves it from `/opengraph-image`.
 *
 * Why dynamic (TSX), not a static PNG asset:
 *   - keeps the brand-mark (canonical terracotta «С») in sync with
 *     `landing/components/BrandMark.tsx` — single source of truth.
 *   - copy lives next to the component, easy to update.
 *   - no `next/image` optimisation overhead for a one-shot OG asset.
 *
 * The Twitter `summary_large_image` card uses the same image
 * (via Next's `twitter.images` metadata fallback to `og:image`).
 */

import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Самосайт — сайт, который сам себя соберёт, сам обновит и сам приведёт клиентов";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        // oklch isn't yet supported by satori (the renderer Next uses
        // under `next/og`); the closest sRGB hex is #c66333 (terracotta).
        background: "#fff8f0",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {/* Brand-mark + wordmark */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 20,
            background: "#c66333",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 48,
            fontWeight: 800,
            letterSpacing: -2,
            paddingBottom: 4,
          }}
        >
          С
        </div>
        <span style={{ fontSize: 40, fontWeight: 700, color: "#2d1b14" }}>Самосайт</span>
      </div>

      {/* H1 — v2.1 «три сам» pattern, synced with Hero.tsx visible H1.
          Без trailing period (visible H1 тоже без точки), терракотовая
          фраза = visual anchor. */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 76,
          fontWeight: 700,
          lineHeight: 1.06,
          letterSpacing: -3,
          color: "#2d1b14",
        }}
      >
        <span>Сайт, который</span>
        <span>
          <span style={{ color: "#c66333" }}>сам себя соберёт,</span>
        </span>
        <span>
          <span style={{ color: "#c66333" }}>сам обновит</span> и
        </span>
        <span>
          <span style={{ color: "#c66333" }}>сам приведёт клиентов</span>
        </span>
      </div>

      {/* Bottom microcopy */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 24,
          color: "#5c4a3a",
        }}
      >
        <span>samosite.online</span>
        <span>Первый месяц бесплатно — карта не нужна</span>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
