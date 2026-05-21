/**
 * `<BigFeatures>` — landing v2 секция «4 ключевые фичи».
 *
 * Spec: docs/COPY.md §2.6 + `/tmp/samosite-canon/landing-samosite.jsx`.
 *
 * Заменяет старый `<BenefitsStack>` который был под Hero. В v2 этот блок
 * вынесен в самостоятельную секцию **с новым составом**:
 *
 * | # | Kicker (mono) | H3 | Body |
 * |---|---|---|---|
 * | 1 | САМ ОБНОВЛЯЕТСЯ | Каждую неделю — свежие посты, фото и цены | … |
 * | 2 | САМ ВЫБИРАЕТ ОТЗЫВЫ ⭐ | На сайте — только лучшие отзывы. Без ваших усилий | … |
 * | 3 | САМ ЛОВИТ ЗАЯВКИ | Заявки сразу в Telegram, MAX или почту | … |
 * | 4 | ВЫ — ХОЗЯИН | Можно поправить, поставить на паузу или удалить — за секунду | … |
 *
 * #2 — новая фича, требует backend-модуля `core/reviews/curator.py`
 * (ADR-0010), который реализуется в PR-E.
 * #4 — новая, продаёт control + analytics + ownership.
 *
 * «Сам находится в поиске» из v1 не дублируется — это обещание уже зашито
 * в Story §2.4 шаг 3 («индексация в Я+G из коробки»).
 */

import { BarChart3, Inbox, RefreshCw, Star } from "lucide-react";
import type { ReactNode } from "react";

interface Feature {
  kicker: string;
  title: string;
  body: string;
  glyph: ReactNode;
  /** При `accent` — body-фон `bg-accent-soft` (#2 + #4 чтобы развести визуально). */
  bg?: "default" | "accent";
}

const FEATURES: Feature[] = [
  {
    kicker: "САМ ОБНОВЛЯЕТСЯ",
    title: "Каждую неделю — свежие посты, фото и цены",
    body: "Сайт сам подтягивает новое из вашего Telegram-канала или Яндекс.Карт. А если выкатили новую услугу — пришлите фото в личный кабинет, сайт примет и обновится.",
    glyph: <RefreshCw className="h-12 w-12" strokeWidth={1.5} />,
  },
  {
    kicker: "САМ ВЫБИРАЕТ ОТЗЫВЫ",
    title: "На сайте — только лучшие отзывы. Без ваших усилий",
    body: "ИИ читает все отзывы из источника, отсеивает «норм», «-», тройки и троллей. На сайт ставит 4–6 самых тёплых и убедительных. Обновляется каждую неделю — если появился ещё круче, заменит.",
    glyph: <Star className="h-12 w-12" strokeWidth={1.5} />,
    bg: "accent",
  },
  {
    kicker: "САМ ЛОВИТ ЗАЯВКИ",
    title: "Заявки сразу в Telegram, MAX или почту",
    body: "Кнопка «Записаться» на сайте, форма с защитой от ботов и уведомление вам в нужный мессенджер. Никакого CRM.",
    glyph: <Inbox className="h-12 w-12" strokeWidth={1.5} />,
  },
  {
    kicker: "ВЫ — ХОЗЯИН",
    title: "Можно поправить, поставить на паузу или удалить — за секунду",
    body: "В личном кабинете видна аналитика посещений и заявок. Сайт принадлежит вам — в любой момент можете забрать или выключить.",
    glyph: <BarChart3 className="h-12 w-12" strokeWidth={1.5} />,
    bg: "accent",
  },
];

function BigFeatureCard({ kicker, title, body, glyph, bg = "default" }: Feature) {
  const isAccent = bg === "accent";
  return (
    <article
      className={[
        "flex flex-col gap-4 rounded-3xl border p-7 sm:p-10",
        isAccent
          ? "border-accent-soft bg-accent-soft text-accent-ink"
          : "border-line bg-white text-ink",
      ].join(" ")}
    >
      <div
        className={[
          "inline-flex h-16 w-16 items-center justify-center rounded-2xl",
          isAccent ? "bg-white/60 text-accent" : "bg-accent-soft text-accent",
        ].join(" ")}
      >
        {glyph}
      </div>

      <p
        className={[
          "font-mono text-[11px] uppercase tracking-widest",
          isAccent ? "text-accent" : "text-accent",
        ].join(" ")}
      >
        {kicker}
      </p>

      <h3 className="text-[22px] font-bold leading-tight sm:text-[28px]">{title}</h3>

      <p
        className={[
          "text-[15px] leading-relaxed sm:text-[17px]",
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
      aria-labelledby="big-features-title"
      className="bg-paper px-5 py-14 sm:px-16 sm:py-24"
    >
      <header className="mx-auto mb-10 max-w-[1100px] sm:mb-14 sm:text-center">
        <p className="font-mono text-[11px] uppercase tracking-widest text-accent">
          Что делает Самосайт
        </p>
        <h2
          id="big-features-title"
          className="mt-2 text-[32px] font-bold leading-[1.05] tracking-tight text-ink sm:text-[56px]"
        >
          Четыре «сам» — и ваше дело само растёт
        </h2>
      </header>

      <div className="mx-auto grid max-w-[1280px] gap-5 sm:grid-cols-2 sm:gap-6">
        {FEATURES.map((f) => (
          <BigFeatureCard key={f.kicker} {...f} />
        ))}
      </div>
    </section>
  );
}
