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
export const alt =
  "Самосайт — соберём за 2 часа сайт, который ловит заявки, и дальше он сам становится лучше";
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

      {/* H1 — canon 0.6.0, synced with Hero.tsx visible H1. Two
          terracotta accent phrases («2 часа», «сам становится лучше»),
          period at the end matches visible H1. */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 64,
          fontWeight: 700,
          lineHeight: 1.06,
          letterSpacing: -2.5,
          color: "#2d1b14",
        }}
      >
        <span>
          Соберём за <span style={{ color: "#c66333" }}>2 часа</span>
        </span>
        <span>сайт, который ловит заявки.</span>
        <span>
          Дальше он <span style={{ color: "#c66333" }}>сам становится лучше</span>
        </span>
        <span>каждую неделю.</span>
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
        <span>Первый месяц бесплатно</span>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
