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
export const alt = "Самосайт — сайт для бьюти-мастера за 2 часа: с записью и заявками";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// v5 «Фарфор и лак» (canon 0.12.0): bone / ink / bordeaux, радиус 0 —
// железное правило дизайн-системы держим и в OG-картинке.
const BONE = "#F2EEE6";
const INK = "#1B1712";
const INK_70 = "#4C463C";
const BORDEAUX = "#7A2B34";

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
        background: BONE,
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {/* Brand-mark + wordmark */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 72,
            height: 72,
            background: BORDEAUX,
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
        <span style={{ fontSize: 40, fontWeight: 700, color: INK }}>Самосайт</span>
      </div>

      {/* H1 — synced with V5Landing visible H1 (canon 0.12.0 V5_Hero):
          «Сайт для бьюти-мастера за 2 часа», бордо-акцент на «за 2 часа». */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 72,
          fontWeight: 700,
          lineHeight: 1.06,
          letterSpacing: -2.5,
          color: INK,
        }}
      >
        <span>Сайт для бьюти-мастера</span>
        <span>
          {/*  : satori схлопывает обычный пробел между span и текстом */}
          <span style={{ color: BORDEAUX }}>за 2 часа</span>
          {" — с записью"}
        </span>
        <span>и заявками.</span>
      </div>

      {/* Bottom microcopy */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 24,
          color: INK_70,
        }}
      >
        <span>samosite.online</span>
        <span>Первый месяц бесплатно без карты</span>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
