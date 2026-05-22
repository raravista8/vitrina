/**
 * `<Platforms>` — landing v2 секция «Что поддерживаем».
 *
 * Spec: docs/COPY.md §2.5 + `/tmp/samosite-canon/landing-samosite.jsx`.
 *
 * Два явных списка чипов — снимает «а у меня X, подойдёт?» страх.
 *   - ДОСТУПНО СЕЙЧАС (зелёные / accent chips): 6 платформ tier=ok
 *   - СКОРО ПОДКЛЮЧИМ (warn-soft / амбер): 4 платформы tier=soon
 *
 * Источники синхронизированы с `landing/lib/source-detect.ts` и backend
 * `core/parsing/adapters/`. См. также ADR-0009 (waitlist) для tier=soon
 * аккумулирующего сигнал «когда строить какую интеграцию».
 */

interface Platform {
  name: string;
  glyph: string;
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
const PLATFORMS: Platform[] = [
  // tier=ok — parser работает (либо через screenshot-flow для IG)
  { name: "Яндекс.Карты", glyph: "🗺️", status: "ok" },
  { name: "Telegram-канал", glyph: "✈️", status: "ok" },
  { name: "Instagram", glyph: "📷", status: "ok" },
  { name: "2ГИС", glyph: "📍", status: "ok" },
  { name: "Avito", glyph: "🅰️", status: "ok" },
  { name: "Ваш старый сайт", glyph: "🌐", status: "ok" },
  { name: "Фото буклета или меню", glyph: "🪪", status: "ok" },
  // tier=soon — waitlist (ADR-0009)
  { name: "VK-страница", glyph: "V", status: "soon" },
  { name: "Ozon", glyph: "🛒", status: "soon" },
  { name: "YouTube-канал", glyph: "▶️", status: "soon" },
];

function PlatformChip({ name, glyph, status }: Platform) {
  const ok = status === "ok";
  return (
    <li
      className={[
        "flex items-center gap-2 rounded-full border px-3 py-2 text-[13px]",
        ok
          ? "border-success/30 bg-success-soft text-success"
          : "border-warn/30 bg-warn-soft text-warn",
      ].join(" ")}
    >
      <span
        aria-hidden="true"
        className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-[12px] font-bold"
      >
        {glyph}
      </span>
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
  const okList = PLATFORMS.filter((p) => p.status === "ok");
  const soonList = PLATFORMS.filter((p) => p.status === "soon");

  return (
    <section
      id="platforms"
      aria-labelledby="platforms-title"
      className="bg-paper-soft px-5 py-14 sm:px-16 sm:py-20"
    >
      <header className="mx-auto mb-8 max-w-[1100px] sm:mb-10 sm:text-center">
        <p className="font-mono text-[11px] uppercase tracking-widest text-accent">Площадки</p>
        <h2
          id="platforms-title"
          className="mt-2 text-[28px] font-bold leading-[1.05] tracking-tight text-ink sm:text-[44px]"
        >
          Работает с тем, что у вас уже есть
        </h2>
      </header>

      <div className="mx-auto grid max-w-[1100px] gap-8 sm:grid-cols-2 sm:gap-12">
        <div>
          <h3 className="mb-4 font-mono text-[11px] uppercase tracking-widest text-success">
            ДОСТУПНО СЕЙЧАС
          </h3>
          <ul className="flex flex-wrap gap-2">
            {okList.map((p) => (
              <PlatformChip key={p.name} {...p} />
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-mono text-[11px] uppercase tracking-widest text-warn">
            СКОРО ПОДКЛЮЧИМ
          </h3>
          <ul className="flex flex-wrap gap-2">
            {soonList.map((p) => (
              <PlatformChip key={p.name} {...p} />
            ))}
          </ul>
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-[1100px] text-center text-[14px] text-ink-soft">
        Не нашли свою площадку?{" "}
        <a
          href="#photo-upload"
          className="font-medium text-ink underline decoration-line decoration-1 underline-offset-4 hover:decoration-ink"
        >
          Загрузите фото →
        </a>
      </p>
    </section>
  );
}
