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
  kicker: string;
  title: string;
  body: string;
  glyph: ReactNode;
  /** Чередуем default / accent для визуальной ритмики 4×2 grid. */
  bg?: "default" | "accent";
}

// Eight «сам» cards — see top-of-file rationale for naming.
const FEATURES: Feature[] = [
  {
    kicker: "САМ СОБЕРЁТСЯ",
    title: "Дайте ссылку — соберётся за две минуты",
    body: "Дайте ссылку на Яндекс.Карты, Telegram-канал или просто фото визитки — Самосайт за две минуты найдёт услуги, цены, отзывы и фото. Сам напишет тексты и подберёт оформление.",
    glyph: <Sparkles className="h-12 w-12" strokeWidth={1.5} />,
  },
  {
    kicker: "САМ ОБНОВИТСЯ",
    title: "Каждую неделю — свежие посты, фото и цены",
    body: "Каждую неделю забирает свежие посты, новые цены и фото из источника. Поменяли прайс в Яндекс.Картах — на сайте уже новый.",
    glyph: <RefreshCw className="h-12 w-12" strokeWidth={1.5} />,
    bg: "accent",
  },
  {
    kicker: "САМ ОТБЕРЁТ ОТЗЫВЫ",
    title: "На сайте — только лучшие отзывы",
    body: "Прочитает все отзывы клиентов, отсеет «норм», тройки и троллей. Поставит на сайт 4–6 самых тёплых и убедительных. Появился отзыв сильнее — заменит.",
    glyph: <Star className="h-12 w-12" strokeWidth={1.5} />,
    bg: "accent",
  },
  {
    kicker: "САМ ПОЙМАЕТ ЗАЯВКУ",
    title: "Заявка падает в Telegram, MAX или почту",
    body: "Клиент жмёт «Записаться» — уведомление падает вам в Telegram, MAX или на почту. Без CRM, без личных кабинетов клиентов, без забытых заявок.",
    glyph: <Inbox className="h-12 w-12" strokeWidth={1.5} />,
  },
  {
    kicker: "САМ ПОСЧИТАЕТ АНАЛИТИКУ",
    title: "Короткая сводка раз в неделю",
    body: "Сколько людей зашли, откуда пришли, сколько оставили заявок. Раз в неделю присылает короткую сводку — без графиков, на человеческом языке.",
    glyph: <BarChart3 className="h-12 w-12" strokeWidth={1.5} />,
  },
  {
    kicker: "САМ ПОПАДЁТ В ПОИСК",
    title: "Клиенты найдут вас в Яндексе и Google",
    body: "Сам отправляет сайт в Яндекс и Google, чтобы вас находили в поиске. Защищённый https и разметка для карт — из коробки. Ничего настраивать не нужно.",
    glyph: <Search className="h-12 w-12" strokeWidth={1.5} />,
    bg: "accent",
  },
  {
    kicker: "САМ ПОДСТРОИТСЯ ПОД ТЕЛЕФОН",
    title: "80% клиентов зайдут с мобильного — и всё сработает",
    body: "Самосайт сразу собирается так, чтобы на телефоне всё было удобно. Никаких отдельных мобильных версий, никаких «настройте под смартфон».",
    glyph: <Smartphone className="h-12 w-12" strokeWidth={1.5} />,
    bg: "accent",
  },
  {
    kicker: "САМ ЗАЩИТИТСЯ ОТ СПАМА",
    title: "Только живые заявки — без ботов",
    body: "Форма с антибот-проверкой, которую настоящий клиент даже не замечает. Боты получают тишину, вам приходят только заявки от людей.",
    glyph: <ShieldCheck className="h-12 w-12" strokeWidth={1.5} />,
  },
];

// Closer — flips the rhythm. After eight «сам»-cards in 4×2 grid,
// one full-width card reframes from «product does it» to «what stays
// with you»: ownership, control, ability to leave. Visually distinct
// (full width, darker accent treatment) so it reads as a section
// closer, not as a 9th feature.
const CLOSER = {
  kicker: "А ВЫ — ХОЗЯИН",
  title: "Можно поправить, поставить на паузу или удалить — за секунду",
  body: "В личном кабинете видна аналитика посещений и заявок. Самосайт принадлежит вам — заберёте файлы или унесёте на другой домен в любой момент.",
};

function BigFeatureCard({ kicker, title, body, glyph, bg = "default" }: Feature) {
  const isAccent = bg === "accent";
  return (
    <article
      className={[
        "flex flex-col gap-4 rounded-3xl border p-6 sm:p-8",
        isAccent
          ? "border-accent-soft bg-accent-soft text-accent-ink"
          : "border-line bg-white text-ink",
      ].join(" ")}
    >
      <div
        className={[
          "inline-flex h-14 w-14 items-center justify-center rounded-2xl",
          isAccent ? "bg-white/60 text-accent" : "bg-accent-soft text-accent",
        ].join(" ")}
      >
        {glyph}
      </div>

      <p className="font-mono text-[11px] uppercase tracking-widest text-accent">{kicker}</p>

      <h3 className="text-[20px] font-bold leading-tight sm:text-[24px]">{title}</h3>

      <p
        className={[
          "text-[15px] leading-relaxed",
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
          Восемь «сам». Поэтому он Самосайт.
        </h2>
        <p className="mt-3 max-w-[680px] text-[16px] leading-relaxed text-ink-soft sm:mx-auto sm:mt-4 sm:text-[18px]">
          Каждая функция начинается с «сам» — потому что мастер не должен ничего настраивать,
          поддерживать или вспоминать. Самосайт всё делает за вас.
        </p>
      </header>

      {/* 4×2 grid of «сам» cards */}
      <div className="mx-auto grid max-w-[1280px] gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {FEATURES.map((f) => (
          <BigFeatureCard key={f.kicker} {...f} />
        ))}
      </div>

      {/* Closer — full-width card reframing the rhythm */}
      <article className="mx-auto mt-6 flex max-w-[1280px] flex-col items-start gap-4 rounded-3xl border-2 border-ink bg-ink p-7 text-white sm:mt-8 sm:flex-row sm:items-center sm:gap-8 sm:p-10">
        <div className="flex-1">
          <p className="font-mono text-[11px] uppercase tracking-widest text-accent-soft">
            {CLOSER.kicker}
          </p>
          <h3 className="mt-2 text-[22px] font-bold leading-tight sm:text-[28px]">
            {CLOSER.title}
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-white/80 sm:text-[17px]">
            {CLOSER.body}
          </p>
        </div>
      </article>
    </section>
  );
}
