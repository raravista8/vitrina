/**
 * `<BigFeatures>` — landing v2 секция «Восемь "сам". Поэтому он Самосайт».
 *
 * Spec: docs/COPY.md §2.6 + `/tmp/samosite-canon/landing-samosite.jsx`.
 *
 * Expanded from 4 cards to **8 «сам»-cards + 1 closer** because the name
 * «Самосайт» = «сам» + «сайт» — and the central feature block should
 * make the brand promise visible at scale. Each card title starts with
 * «Сам …» (or implicit), reinforcing the contract: «product does X — you
 * don't».
 *
 * The closer card («А вы — хозяин») is rendered last in a distinct
 * accent variant — flips the «product does it» rhythm to «what stays
 * with you»: control, ownership, ability to leave.
 *
 * v1 → v2 (PR-G): расширил с 4 → 8 + closer per user feedback (see
 * docs/COPY.md). Из старого набора:
 *   - САМ ОБНОВЛЯЕТСЯ          → САМ ОБНОВИТСЯ (#2)
 *   - САМ ВЫБИРАЕТ ОТЗЫВЫ ⭐    → САМ ОТБЕРЁТ ОТЗЫВЫ (#3)
 *   - САМ ЛОВИТ ЗАЯВКИ          → САМ ПОЙМАЕТ ЗАЯВКУ (#4)
 *   - ВЫ — ХОЗЯИН               → выделен в `CLOSER` ниже
 * Добавлены:
 *   - САМ СОБЕРЁТСЯ (#1, opening — собирает всё в первый раз)
 *   - САМ ПОСЧИТАЕТ АНАЛИТИКУ (#5)
 *   - САМ ПОПАДЁТ В ПОИСК (#6)
 *   - САМ ПОДСТРОИТСЯ ПОД ТЕЛЕФОН (#7)
 *   - САМ ЗАЩИТИТСЯ ОТ СПАМА (#8)
 * #6 поглощает обещание «сам находится в поиске» из v1 Story step 3.
 */

import {
  BarChart3,
  Inbox,
  RefreshCw,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
} from "lucide-react";
import type { ReactNode } from "react";

interface Feature {
  heading: string;
  subtitle: string;
  body: string;
  glyph: ReactNode;
  /** Чередуем default / accent для визуальной ритмики 4×2 grid. */
  bg?: "default" | "accent";
}

// Eight «сам» cards — see top-of-file rationale for naming.
const FEATURES: Feature[] = [
  {
    heading: "Сам соберётся",
    subtitle: "Дайте ссылку — соберётся за 2 часа",
    body: "Дайте ссылку на Яндекс.Карты, Telegram-канал или фото буклета или меню — Самосайт за 2 часа найдёт услуги, цены, отзывы и фото. Сам напишет тексты и подберёт оформление.",
    glyph: <Sparkles className="h-12 w-12" strokeWidth={1.5} />,
  },
  {
    heading: "Сам обновится",
    subtitle: "Каждую неделю — свежие посты, фото и цены",
    body: "Каждую неделю забирает свежие посты, новые цены и фото из источника. Поменяли прайс в Яндекс.Картах — на сайте уже новый.",
    glyph: <RefreshCw className="h-12 w-12" strokeWidth={1.5} />,
    bg: "accent",
  },
  {
    heading: "Сам отберёт отзывы",
    subtitle: "На сайте — только лучшие отзывы",
    body: "Прочитает все отзывы клиентов, отсеет «норм», тройки и троллей. Поставит на сайт 4–6 самых тёплых и убедительных. Появился отзыв сильнее — заменит.",
    glyph: <Star className="h-12 w-12" strokeWidth={1.5} />,
    bg: "accent",
  },
  {
    heading: "Сам поймает заявку",
    subtitle: "Заявка падает в Telegram, MAX или почту",
    body: "Клиент жмёт «Записаться» — уведомление падает вам в Telegram, MAX или на почту. Без CRM, без личных кабинетов клиентов, без забытых заявок.",
    glyph: <Inbox className="h-12 w-12" strokeWidth={1.5} />,
  },
  {
    heading: "Сам посчитает",
    subtitle: "Короткая сводка раз в неделю",
    body: "Сколько людей зашли, откуда пришли, сколько оставили заявок. Раз в неделю присылает короткую сводку — без графиков, на человеческом языке.",
    glyph: <BarChart3 className="h-12 w-12" strokeWidth={1.5} />,
  },
  {
    heading: "Сам попадёт в поиск",
    subtitle: "Клиенты найдут вас в Яндексе и Google",
    body: "Сам отправляет сайт в Яндекс и Google, чтобы вас находили в поиске. Защищённый https и разметка для карт — из коробки. Ничего настраивать не нужно.",
    glyph: <Search className="h-12 w-12" strokeWidth={1.5} />,
    bg: "accent",
  },
  {
    heading: "Сам подстроится под телефон",
    subtitle: "80% клиентов зайдут с мобильного — и всё сработает",
    body: "Самосайт сразу собирается так, чтобы на телефоне всё было удобно. Никаких отдельных мобильных версий, никаких «настройте под смартфон».",
    glyph: <Smartphone className="h-12 w-12" strokeWidth={1.5} />,
    bg: "accent",
  },
  {
    heading: "Сам защитится от спама",
    subtitle: "Только живые заявки — без ботов",
    body: "Форма с антибот-проверкой, которую настоящий клиент даже не замечает. Боты получают тишину, вам приходят только заявки от людей.",
    glyph: <ShieldCheck className="h-12 w-12" strokeWidth={1.5} />,
  },
];

/**
 * Carded feature item. v2.1.3 §1.4 added decorative numbers 01-08 — 96px
 * JetBrains Mono weight 800, opacity 0.22, absolute-positioned top-right
 * as background watermark. Numbers reinforce «восемь сам» counting
 * implicitly without taking visual real estate from kicker/title/body.
 */
function BigFeatureCard({
  heading,
  subtitle,
  body,
  glyph,
  bg = "default",
  decorativeIndex,
}: Feature & { decorativeIndex: string }) {
  const isAccent = bg === "accent";
  return (
    <article
      className={[
        "ss-card-lift relative flex flex-col gap-4 overflow-hidden rounded-3xl border p-6 sm:p-8",
        isAccent
          ? "border-accent-soft bg-accent-soft text-accent-ink"
          : "border-line bg-white text-ink",
      ].join(" ")}
    >
      {/* Decorative number 01-08 — fontFamily JetBrains Mono via tailwind
          font-mono token, weight 800. Opacity 0.22 на accent / 0.10 на
          default чтобы numerals не конкурировали с body text но всё-таки
          читались как watermark counting. pointer-events-none + aria-hidden
          — accessibility-tree игнорирует. */}
      <span
        aria-hidden="true"
        className={[
          "pointer-events-none absolute right-4 top-2 select-none font-mono leading-none tracking-tight",
          isAccent ? "text-accent/30" : "text-ink-faint/40",
        ].join(" ")}
        style={{ fontWeight: 800, fontSize: 80 }}
      >
        {decorativeIndex}
      </span>

      <div
        className={[
          "relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-2xl",
          isAccent ? "bg-white/60 text-accent" : "bg-accent-soft text-accent",
        ].join(" ")}
      >
        {glyph}
      </div>

      <h3 className="relative z-10 mt-1.5 text-[24px] font-extrabold leading-[1.05] tracking-[-0.032em] text-ink sm:text-[28px]">
        {heading}
      </h3>

      <p className="relative z-10 text-[14.5px] font-bold leading-snug tracking-tight text-accent sm:text-[15.5px]">
        {subtitle}
      </p>

      <p
        className={[
          "relative z-10 text-[15px] leading-relaxed",
          isAccent ? "text-accent-ink/85" : "text-ink-soft",
        ].join(" ")}
      >
        {body}
      </p>
    </article>
  );
}

export function BigFeatures() {
  return (
    <section
      id="features"
      data-section="big-features"
      aria-labelledby="big-features-title"
      className="bg-paper pb-0 pt-14 sm:pb-0 sm:pt-24"
    >
      <div data-section-body="big-features" className="px-5 sm:px-16">
        <header className="mx-auto mb-10 max-w-[1100px] sm:mb-14 sm:text-center">
          <p className="font-mono text-[11px] uppercase tracking-widest text-accent">
            Что делает Самосайт
          </p>
          {/* v2.1.3 §3.1 — H2 без точек в обоих частях, тире вместо точки
            между fragment'ами. Typography: H2 из 1-2 ёмких фраз — без
            trailing periods. */}
          <h2
            id="big-features-title"
            className="mt-2 text-[32px] font-bold leading-[1.05] tracking-tight text-ink sm:text-[56px]"
          >
            Восемь «сам» — поэтому он Самосайт
          </h2>
          <p className="mt-3 max-w-[680px] text-[16px] leading-relaxed text-ink-soft sm:mx-auto sm:mt-4 sm:text-[18px]">
            Каждая функция начинается с «сам» — потому что мастер не должен ничего настраивать,
            поддерживать или вспоминать. Самосайт всё делает за вас
          </p>
        </header>

        {/* 4×2 grid of «сам» cards */}
        <div className="mx-auto grid max-w-[1280px] gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {FEATURES.map((f, idx) => (
            <BigFeatureCard
              key={f.heading}
              {...f}
              // v2.1.3 §1.4 decorative numbers — zero-padded 01..08 в углу
              // карточки. Padding до 2 цифр чтобы «01» и «08» имели одинаковую
              // ширину для visual rhythm.
              decorativeIndex={String(idx + 1).padStart(2, "0")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
