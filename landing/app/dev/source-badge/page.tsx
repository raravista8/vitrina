/**
 * `/dev/source-badge` — visual demo-grid for `<SourceDetectionBadge>` in all
 * 9 canonical states (see `canon/screen-02-source.jsx`).
 *
 * Purpose:
 *   1. Visual regression — `landing/tests/visual/intake.spec.ts` (Tier 2b
 *      follow-up) screenshots `[data-state="..."]` for each state at
 *      1440 / 768 / 390 viewports and compares against canon baselines.
 *   2. Manual QA — open the page in dev to see all states side-by-side
 *      without typing 9 different URLs into Hero.
 *
 * Production gate:
 *   The page renders content only when `NEXT_PUBLIC_E2E === '1'`. In normal
 *   production builds (env unset) the page returns a 404-style stub —
 *   keeps the URL space clean from dev-only chrome while still letting
 *   the spec opt-in via `NEXT_PUBLIC_E2E=1 npm run build && npm run start`.
 *   Page also wears `<meta name="robots" content="noindex">` so even an
 *   accidental deploy with the env flag wouldn't get indexed.
 *
 * Layout:
 *   Stacked column of 9 cards, each with a sticky `<data-state>` label and
 *   the actual `<SourceDetectionBadge>` rendered with hand-crafted state.
 *   Each badge wrapped in a `[data-state="<id>"]` div so the spec can pick
 *   one at a time.
 */
import type { Metadata } from "next";

import { SourceDetectionBadge, type PreviewPhase } from "@/components/SourceDetectionBadge";
import type { SourceDetection } from "@/lib/source-detect";

export const metadata: Metadata = {
  title: "SourceDetectionBadge — dev grid",
  robots: { index: false, follow: false },
};

interface BadgeFixture {
  id: string;
  label: string;
  rawInput: string;
  detection: SourceDetection;
  preview: PreviewPhase;
}

/* Fixtures cover all 9 states from canon `screen-02-source.jsx`. Each
   `rawInput` + `detection` + `preview` triple is chosen so the badge
   renders ONE deterministic visual — no race conditions or async
   loading affects the screenshot. */
const FIXTURES: BadgeFixture[] = [
  {
    id: "mvp-loading-tg",
    label: "MVP / loading — Telegram",
    rawInput: "https://t.me/studia_anny",
    detection: { kind: "mvp", type: "telegram", canonical: "https://t.me/studia_anny" },
    preview: { phase: "loading" },
  },
  {
    id: "mvp-ready-tg-counts",
    label: "MVP / ready + counts — Telegram",
    rawInput: "https://t.me/studia_anny",
    detection: { kind: "mvp", type: "telegram", canonical: "https://t.me/studia_anny" },
    preview: {
      phase: "ready",
      data: {
        sourceType: "telegram",
        name: "Студия Анны",
        counts: { posts: 47, photos: 12, reviews: null },
      },
    },
  },
  {
    id: "mvp-ready-ymaps-counts",
    label: "MVP / ready + counts — Я.Карты",
    rawInput: "https://yandex.ru/maps/213/moscow/?org=12345",
    detection: {
      kind: "mvp",
      type: "ymaps",
      canonical: "https://yandex.ru/maps/213/moscow/?org=12345",
    },
    preview: {
      phase: "ready",
      data: {
        sourceType: "ymaps",
        name: "Студия маникюра Анны",
        counts: { posts: null, photos: 24, reviews: 38 },
      },
    },
  },
  {
    id: "mvp-fallback-tg",
    label: "MVP / fallback (preview timeout)",
    rawInput: "https://t.me/studia_anny",
    detection: { kind: "mvp", type: "telegram", canonical: "https://t.me/studia_anny" },
    preview: { phase: "fallback" },
  },
  {
    id: "waitlist-instagram",
    label: "Waitlist — Instagram",
    rawInput: "https://instagram.com/studia_anny",
    detection: {
      kind: "waitlist",
      source: "instagram",
      canonical: "https://instagram.com/studia_anny",
    },
    preview: { phase: "idle" },
  },
  {
    id: "waitlist-vkontakte",
    label: "Waitlist — ВКонтакте",
    rawInput: "https://vk.com/studia_anny",
    detection: {
      kind: "waitlist",
      source: "vkontakte",
      canonical: "https://vk.com/studia_anny",
    },
    preview: { phase: "idle" },
  },
  {
    id: "waitlist-twogis",
    label: "Waitlist — 2ГИС",
    rawInput: "https://2gis.ru/moscow/firm/12345",
    detection: {
      kind: "waitlist",
      source: "twogis",
      canonical: "https://2gis.ru/moscow/firm/12345",
    },
    preview: { phase: "idle" },
  },
  {
    id: "unknown-url",
    label: "Unknown URL",
    rawInput: "https://example.com/my-business",
    detection: { kind: "unknown_url", url: "https://example.com/my-business" },
    preview: { phase: "idle" },
  },
  {
    id: "not-url",
    label: "Not a URL",
    rawInput: "просто текст без ссылки",
    detection: { kind: "not_url" },
    preview: { phase: "idle" },
  },
];

export default function SourceBadgeDevGrid() {
  /* Hard gate: only render when explicitly opted-in via
     `NEXT_PUBLIC_E2E=1`. Read at build time (env var baked into bundle
     by Next.js for `NEXT_PUBLIC_*`). In normal prod builds the variable
     is undefined → return a 404 stub. */
  if (process.env.NEXT_PUBLIC_E2E !== "1") {
    return (
      <main className="flex min-h-screen items-center justify-center p-12 text-ink-soft">
        <p className="font-mono text-sm">
          Not available. Set <code>NEXT_PUBLIC_E2E=1</code> at build time to enable.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[680px] space-y-8 bg-paper-soft px-6 py-12">
      <header>
        <h1 className="font-mono text-[12px] uppercase tracking-widest text-accent">
          /dev/source-badge
        </h1>
        <p className="mt-2 text-2xl font-bold text-ink">SourceDetectionBadge — 9 состояний</p>
        <p className="mt-2 text-sm text-ink-soft">
          Каждое состояние из canon{" "}
          <code className="rounded bg-paper px-1 py-0.5">screen-02-source.jsx</code> в собственном
          контейнере с <code>data-state=&quot;...&quot;</code> для visual-spec.
        </p>
      </header>

      {FIXTURES.map((fx) => (
        <section
          key={fx.id}
          data-state={fx.id}
          className="space-y-2 rounded-xl border border-line bg-paper p-5"
        >
          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-ink-faint">
            <span>{fx.label}</span>
            <code className="text-accent">{fx.id}</code>
          </div>
          <SourceDetectionBadge
            detection={fx.detection}
            rawInput={fx.rawInput}
            preview={fx.preview}
          />
        </section>
      ))}
    </main>
  );
}
