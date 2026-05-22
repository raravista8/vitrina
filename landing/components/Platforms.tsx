/**
 * `<Platforms>` — landing v2 секция «Что поддерживаем».
 *
 * Spec: docs/COPY.md §2.5 + `/tmp/samosite-canon/landing-samosite.jsx`
 * + CLAUDE_CODE_TZ_session_v2.1.3.md §1.4 (brand SVG logos).
 *
 * Два явных списка чипов — снимает «а у меня X, подойдёт?» страх.
 *   - ДОСТУПНО СЕЙЧАС (зелёные / accent chips): 7 платформ tier=ok
 *   - СКОРО ПОДКЛЮЧИМ (warn-soft / амбер): 3 платформы tier=soon
 *
 * Источники синхронизированы с `landing/lib/source-detect.ts` и backend
 * `core/parsing/adapters/`. См. также ADR-0009 (waitlist) для tier=soon
 * аккумулирующего сигнал «когда строить какую интеграцию».
 *
 * v2.1.3 §1.4 — brand SVG logos: Я.Карты / 2ГИС / Avito заменены с
 * generic «🗺️»/«📍»/«🅰️» эмодзи на inline SVG с реальными бренд-цветами
 * и узнаваемыми shape'ами (red pin / green «2» / blue+orange «A»).
 * Остальные платформы остаются на эмодзи — для них brand-recognition
 * не критичен (Telegram, Instagram уже узнаваемы по эмодзи).
 */

import type { ReactNode } from "react";

import { AvitoGlyph, TwoGisGlyph, YandexMapsGlyph } from "./brand-glyphs";

interface Platform {
  name: string;
  /**
   * Visual marker — либо текстовый glyph (эмодзи / буква), либо SVG-нода
   * для бренд-логотипов. Когда передан `ReactNode`, рендерится в полную
   * ширину контейнера (~20px); когда строка — рендерится внутри
   * white-circle pill как раньше.
   */
  glyph: string | ReactNode;
  status: "ok" | "soon";
}

// v2.1.3 §1.4 — PLATFORMS_OK расширены до 7: добавлен Instagram (через
// photo-upload screenshot flow, не auto-parse) + переименования:
//   • «Avito-профиль» → «Avito» (короче, чистый бренд)
//   • «Свой сайт» → «Ваш старый сайт» (контекст: «дайте старый, мы
//     заменим лучшим»)
//   • «Фото визитки или буклета» → «Фото буклета или меню» (визитка —
//     слишком мало контента для AI; меню/буклет даёт услуги + цены)
// PLATFORMS_SOON свёрнуты до 3: WhatsApp удалён (нет публичного каталога
// API в РФ), VK + Ozon (new) + YouTube остались.
//
// Brand SVG для Я.Карт / 2ГИС / Avito — v2.1.3 §1.4. Остальные платформы
// keep эмодзи — telegram/instagram уже узнаваемы, для site/photo бренд
// неприменим.
const PLATFORMS: Platform[] = [
  // tier=ok — parser работает (либо через screenshot-flow для IG)
  { name: "Яндекс.Карты", glyph: <YandexMapsGlyph />, status: "ok" },
  { name: "Telegram-канал", glyph: "✈️", status: "ok" },
  { name: "Instagram", glyph: "📷", status: "ok" },
  { name: "2ГИС", glyph: <TwoGisGlyph />, status: "ok" },
  { name: "Avito", glyph: <AvitoGlyph />, status: "ok" },
  { name: "Ваш старый сайт", glyph: "🌐", status: "ok" },
  { name: "Фото буклета или меню", glyph: "🪪", status: "ok" },
  // tier=soon — waitlist (ADR-0009)
  { name: "VK-страница", glyph: "V", status: "soon" },
  { name: "Ozon", glyph: "🛒", status: "soon" },
  { name: "YouTube-канал", glyph: "▶️", status: "soon" },
];

function PlatformChip({ name, glyph, status }: Platform) {
  const ok = status === "ok";
  // SVG glyphs (object — не string) рендерятся «в полную ширину» (20×20),
  // text glyphs (эмодзи/буква) — внутри white-circle pill 20×20.
  const isSvg = typeof glyph !== "string";
  return (
    <li
      className={[
        "flex items-center gap-2 rounded-full border px-3 py-2 text-[13px]",
        ok
          ? "border-success/30 bg-success-soft text-success"
          : "border-warn/30 bg-warn-soft text-warn",
      ].join(" ")}
    >
      {isSvg ? (
        glyph
      ) : (
        <span
          aria-hidden="true"
          className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-[12px] font-bold"
        >
          {glyph}
        </span>
      )}
      <span className="font-medium">{name}</span>
      {!ok ? (
        <span className="ml-1 rounded-md bg-white/60 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider">
          скоро
        </span>
      ) : null}
    </li>
  );
}

export function Platforms() {
  const okPlatforms = PLATFORMS.filter((p) => p.status === "ok");
  const soonPlatforms = PLATFORMS.filter((p) => p.status === "soon");

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
          Работает с тем, что у вас уже есть
        </h2>
      </header>

      <div className="mx-auto grid max-w-[1200px] gap-10 sm:grid-cols-2 sm:gap-16">
        <div>
          <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-success">
            Доступно сейчас
          </p>
          <ul className="flex flex-wrap gap-2">
            {okPlatforms.map((p) => (
              <PlatformChip key={p.name} {...p} />
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-warn">
            Скоро подключим
          </p>
          <ul className="flex flex-wrap gap-2">
            {soonPlatforms.map((p) => (
              <PlatformChip key={p.name} {...p} />
            ))}
          </ul>
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-[680px] text-center text-[14px] text-ink-soft sm:mt-12 sm:text-[15px]">
        Не нашли свою площадку?{" "}
        <a
          href="#top"
          className="decoration-accent/50 font-medium text-accent underline underline-offset-4 hover:decoration-accent"
        >
          Загрузить фото →
        </a>
      </p>
    </section>
  );
}
