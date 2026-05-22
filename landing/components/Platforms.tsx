/**
 * `<Platforms>` — landing v2 секция «Что подойдёт для создания Самосайта».
 *
 * Spec: docs/COPY.md §2.5 + canon `PlatformsSection`
 * (landing-samosite.jsx line 1218) + CLAUDE_CODE_TZ_session_v2.1.3.md §1.4.
 *
 * Canon bento layout (replaces the previous 2-column-of-chips layout):
 *   • Row 1 — featured «Я.Карты» tile (full width, slightly bigger logo)
 *   • Row 2 — 3-col grid (Telegram-канал / Instagram / 2ГИС)
 *   • Row 3 — 2-col grid wrapping (Avito + Ваш старый сайт on first row,
 *             Фото буклета или меню alone on second)
 *   • Row 4 — dashed «СКОРО ПОДКЛЮЧИМ» card with 3 soon-pills + a
 *             «Нет вашей? Напишите →» link to /feedback
 *
 * Each tile: brand logo block (44-60 px square, rounded ~27 %) + name in
 * bold + «забираем: ...» mono caps list of what we extract from that
 * source. Corner accent — soft 80-px circle with brand color at low
 * opacity, decorative only.
 *
 * Brand SVG glyphs (`./brand-glyphs`) carry the actual logos for
 * Я.Карты / 2ГИС / Avito. Others use a circled-letter or icon glyph in
 * a brand-colored box, per `PlatformLogo` in canon.
 */

import type { ReactNode } from "react";

import { AvitoGlyph, TwoGisGlyph, YandexMapsGlyph } from "./brand-glyphs";

interface Platform {
  id: string;
  name: string;
  /** Brand-colored square box (logo). For Я.Карты / 2ГИС / Avito the
   *  brand-glyphs SVG already includes its own bg shape, so the wrapper
   *  uses `transparent` and the SVG just sits inside.
   *  For text glyphs (Telegram, Instagram, etc.) the wrapper colors
   *  the box with `bg` and renders the glyph in `fg`. */
  glyph: ReactNode;
  bg: string;
  fg?: string;
  /** Mono caps caption: what Самосайт extracts from this source.
   *  Free-form text after «забираем:» — see canon line 559. */
  pull: string;
}

interface SoonPlatform {
  id: string;
  name: string;
  /** Hex / oklch for the logo box bg. */
  bg: string;
  /** Single-letter or icon glyph inside the box. */
  logo: ReactNode;
}

const FEATURED: Platform = {
  id: "yandex",
  name: "Яндекс.Карты",
  glyph: <YandexMapsGlyph size={26} />,
  bg: "transparent",
  pull: "отзывы · услуги · цены · фото · режим работы",
};

const SECONDARY: Platform[] = [
  {
    id: "telegram",
    name: "Telegram-канал",
    glyph: <PlaneIcon />,
    bg: "#229ED9",
    fg: "#fff",
    pull: "посты · фото работ · контакты",
  },
  {
    id: "instagram",
    name: "Instagram",
    glyph: <CameraIcon />,
    /* Instagram brand gradient — diagonal from peach through magenta to
     * deep purple. Hex stops match canon `PLATFORMS_OK.instagram.bg`. */
    bg: "linear-gradient(135deg, #FEDA77 0%, #F58529 30%, #DD2A7B 60%, #8134AF 100%)",
    fg: "#fff",
    pull: "скриншот профиля",
  },
  {
    id: "2gis",
    name: "2ГИС",
    glyph: <TwoGisGlyph size={26} />,
    bg: "transparent",
    pull: "услуги · отзывы · контакты",
  },
];

const TERTIARY: Platform[] = [
  {
    id: "avito",
    name: "Avito",
    glyph: <AvitoGlyph size={26} />,
    bg: "transparent",
    pull: "услуги · цены · отзывы",
  },
  {
    id: "site",
    name: "Ваш старый сайт",
    glyph: <GlobeIcon />,
    bg: "oklch(0.42 0.04 250)",
    fg: "#fff",
    pull: "тексты · фото · услуги",
  },
  {
    id: "card",
    name: "Фото буклета или меню",
    glyph: <CardIcon />,
    bg: "oklch(0.78 0.07 70)",
    fg: "#3a2410",
    pull: "распознаем услуги · контакты",
  },
];

const SOON: SoonPlatform[] = [
  { id: "vk", name: "VK-страница", bg: "#0077FF", logo: "V" },
  { id: "ozon", name: "Ozon-витрина", bg: "#005BFF", logo: "O" },
  { id: "youtube", name: "YouTube-канал", bg: "#FF0033", logo: <PlayIcon /> },
];

// ── Icon helpers (inline SVG so they pick up `currentColor` from the box) ──

function PlaneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
      <path d="M22 3 L1.5 11 L8 13.5 L17 7 L11 14 L11.5 20 L15 16 L20 19 Z" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="6" width="18" height="14" rx="2" />
      <circle cx="12" cy="13" r="4" />
      <path d="M9 6l1-2h4l1 2" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <ellipse cx="12" cy="12" rx="4" ry="9" />
      <path d="M3 12h18" />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M7 11h6M7 14h4" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
      <path d="M7 4 L20 12 L7 20 Z" />
    </svg>
  );
}

// ── Cards ──────────────────────────────────────────────────────────────────

function PlatformCard({ platform, featured = false }: { platform: Platform; featured?: boolean }) {
  /* Logo block size:
   *   • featured (Я.Карты, full width): 52 px mobile / 60 px desktop
   *   • secondary/tertiary tiles: 44 px mobile / 50 px desktop */
  const logoBoxMobile = featured ? "h-[52px] w-[52px]" : "h-[44px] w-[44px]";
  const logoBoxDesktop = featured ? "sm:h-[60px] sm:w-[60px]" : "sm:h-[50px] sm:w-[50px]";
  const titleSize = featured ? "text-[17px] sm:text-[19px]" : "text-[15.5px] sm:text-[17px]";
  const padding = featured ? "p-4 sm:px-6 sm:py-[22px]" : "p-4 sm:px-5 sm:py-[18px]";

  return (
    <div
      className={`ss-card-lift relative flex items-center gap-3.5 overflow-hidden rounded-[18px] border border-line bg-white sm:gap-[18px] ${padding}`}
    >
      {/* Logo box — borderRadius 27% of size (canon PlatformLogo line 528) */}
      <span
        aria-hidden
        className={`inline-flex shrink-0 items-center justify-center rounded-[14px] shadow-[0_1px_0_rgba(0,0,0,0.04)] ${logoBoxMobile} ${logoBoxDesktop}`}
        style={{ background: platform.bg, color: platform.fg ?? "#fff" }}
      >
        {platform.glyph}
      </span>

      <div className="min-w-0 flex-1">
        <div className={`font-bold leading-tight tracking-tight text-ink ${titleSize}`}>
          {platform.name}
        </div>
        <div className="mt-1 font-mono text-[11px] leading-snug tracking-wide text-ink-soft sm:text-[12px]">
          забираем: {platform.pull}
        </div>
      </div>

      {/* Corner accent — soft 80 px circle in the platform's brand color
          at 7 % opacity. Decorative; pointer-events disabled. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[30px] -top-[30px] h-[80px] w-[80px] rounded-full opacity-[0.07]"
        style={{ background: platform.bg }}
      />
    </div>
  );
}

function PlatformSoonPill({ platform }: { platform: SoonPlatform }) {
  return (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white py-[10px] pl-[10px] pr-[14px]">
      <span
        aria-hidden
        className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[14px] font-bold text-white"
        style={{ background: platform.bg }}
      >
        {platform.logo}
      </span>
      <span className="text-[13.5px] font-medium tracking-tight text-ink">{platform.name}</span>
      <span className="rounded-md bg-paper-soft px-1.5 py-0.5 font-mono text-[9.5px] uppercase tracking-wider text-ink-faint">
        скоро
      </span>
    </div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────

export function Platforms() {
  return (
    <section
      id="platforms"
      aria-labelledby="platforms-title"
      className="bg-paper-soft px-5 py-14 sm:px-16 sm:py-24"
    >
      <header className="mx-auto mb-10 max-w-[1100px] sm:mb-14 sm:text-center">
        <p className="font-mono text-[11px] uppercase tracking-widest text-accent">Площадки</p>
        <h2
          id="platforms-title"
          className="mt-2 text-[28px] font-bold leading-[1.05] tracking-tight text-ink sm:text-[44px]"
        >
          {/* v2.2 canon (финал 2) — shift from «работает с тем» (passive
              capability) to «что подойдёт для создания Самосайта» (user-
              directed selection). Subhead added to soften the criterion list. */}
          Что подойдёт
          <br className="hidden sm:block" /> для создания Самосайта
        </h2>
        <p className="mt-3 max-w-[640px] text-[16px] leading-relaxed text-ink-soft sm:mx-auto sm:mt-4 sm:text-[18px]">
          Подойдёт любая ссылка, где про вас уже что-то написано или показано
        </p>
      </header>

      <div className="mx-auto mt-7 max-w-[1080px] sm:mt-14">
        {/* Featured platform — Я.Карты full-width */}
        <PlatformCard platform={FEATURED} featured />

        {/* Secondary row — Telegram / Instagram / 2ГИС */}
        <div className="mt-2.5 grid gap-2.5 sm:mt-[14px] sm:grid-cols-3 sm:gap-[14px]">
          {SECONDARY.map((p) => (
            <PlatformCard key={p.id} platform={p} />
          ))}
        </div>

        {/* Tertiary row — Avito / Ваш старый сайт / Фото буклета или меню.
            2-col grid with 3 items: row 1 has Avito + Ваш старый сайт,
            row 2 has Фото буклета или меню spanning one column. */}
        <div className="mt-2.5 grid gap-2.5 sm:mt-[14px] sm:grid-cols-2 sm:gap-[14px]">
          {TERTIARY.map((p) => (
            <PlatformCard key={p.id} platform={p} />
          ))}
        </div>

        {/* СКОРО ПОДКЛЮЧИМ — dashed-border card with 3 soon-pills and a
            small «Нет вашей? Напишите →» CTA to /feedback. */}
        <div className="mt-7 rounded-[18px] border border-dashed border-line bg-paper-soft px-[18px] py-5 sm:mt-9 sm:px-6 sm:py-[22px]">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <div className="font-mono text-[11.5px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
              Скоро подключим
            </div>
            <a
              href="/feedback"
              className="text-[13px] text-accent underline decoration-1 underline-offset-[3px] hover:decoration-2"
            >
              Нет вашей? Напишите →
            </a>
          </div>
          <div className="mt-3.5 flex flex-wrap gap-2">
            {SOON.map((p) => (
              <PlatformSoonPill key={p.id} platform={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
