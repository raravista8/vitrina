/**
 * `<Story>` — landing v2 «Как это работает», 6 шагов в зигзаг-раскладке.
 *
 * Spec: docs/COPY.md §2.4 + `/tmp/samosite-canon/landing-samosite.jsx`.
 *
 * Каждый шаг — большая карточка в собственной палитре + 2px чёрная рамка
 * + 6px hard-shadow + стикер «ШАГ N» rotate(-12deg) в углу. Между
 * шагами — волнистая dashed-линия (rendered как абсолютно-позиционированный
 * SVG между карточками).
 *
 * Палитры по порядку: peach · butter · sky · sage · rose · lavender.
 * На desktop карточки чередуются — left / right. На mobile — все одна за
 * другой полной шириной.
 */

// Story step titles — all start with «Сам…» to reinforce the brand
// promise that the name «Самосайт» encodes. Step 1 is the only
// «вы»-action (purchase decision); everything else is the product
// doing the work.
const STEPS = [
  {
    n: 1,
    title: "Покажите ссылку — дальше Самосайт сам",
    body: "Страница на Яндекс.Картах, ваш Telegram-канал, профиль на Avito или фото буклета или меню. Подойдёт всё, что у вас уже есть.",
    bg: "oklch(0.95 0.05 40)",
    ink: "oklch(0.32 0.14 35)",
  },
  {
    n: 2,
    title: "Сам соберёт сайт за 2 часа",
    body: "Найдёт услуги, цены, отзывы и фото. Сам напишет тексты, подберёт цвета и сложит в красивую галерею. За 2 часа.",
    bg: "oklch(0.94 0.06 95)",
    ink: "oklch(0.36 0.12 85)",
  },
  {
    n: 3,
    title: "Сам появится на своём адресе и в поиске",
    body: "На <ваш-сайт>.samosite.online или подключите свой домен. Сразу с защищённым https — клиенты найдут вас в Яндексе и Google.",
    bg: "oklch(0.94 0.05 200)",
    ink: "oklch(0.34 0.10 220)",
  },
  {
    n: 4,
    title: "Сам подтянет новое каждую неделю",
    body: "Раз в неделю забирает свежие посты из источника. А если добавили новую услугу — просто пришлите фото и текст в личном кабинете, сайт обновится.",
    bg: "oklch(0.94 0.05 145)",
    ink: "oklch(0.32 0.11 145)",
  },
  {
    n: 5,
    title: "Сам пришлёт заявку в Telegram",
    body: "Клиент жмёт «Записаться» — вам приходит уведомление в Telegram, MAX или на почту. Никакого CRM — всё там, где вы и так читаете.",
    bg: "oklch(0.94 0.06 25)",
    ink: "oklch(0.36 0.13 22)",
  },
  {
    n: 6,
    title: "Сам отчитается — а вы решаете",
    body: "Сколько людей зашли, откуда и сколько оставили заявок. В личном кабинете можно поправить, поставить на паузу или удалить сайт — в одно нажатие.",
    bg: "oklch(0.94 0.05 285)",
    ink: "oklch(0.34 0.10 285)",
  },
] as const;

export function Story() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="story-title"
      className="bg-paper px-5 pb-0 pt-14 sm:px-16 sm:pb-0 sm:pt-24"
    >
      <header className="mx-auto mb-10 max-w-[1100px] sm:mb-16 sm:text-center">
        <p className="font-mono text-[11px] uppercase tracking-widest text-accent">
          Как это работает
        </p>
        <h2
          id="story-title"
          className="mt-2 text-[32px] font-bold leading-[1.05] tracking-tight text-ink sm:text-[56px]"
        >
          {/* v2.2 canon (финал 2) — pivot from steps-count framing
              («шесть шагов») to user-action framing («от вас — одно действие»).
              Promise: minimal user effort, maximum product autonomy. */}
          От вас — одно действие,
          <br className="hidden sm:block" /> всё остальное Самосайт сделает сам
        </h2>
      </header>

      <ol className="mx-auto flex max-w-[1100px] flex-col gap-7 sm:gap-12">
        {STEPS.map((s, idx) => {
          const isRight = idx % 2 === 1;
          return (
            <li
              key={s.n}
              className={`relative w-full sm:max-w-[760px] ${isRight ? "sm:self-end" : "sm:self-start"}`}
            >
              <div
                className="ss-story-card relative rounded-[24px] border-[2px] border-ink p-6 sm:p-8"
                style={{ background: s.bg, boxShadow: "6px 6px 0 0 var(--tw-color-ink, #1c1a17)" }}
              >
                {/* Step sticker — rotated -12deg in top-right corner */}
                <span
                  aria-hidden="true"
                  className="absolute -right-2 -top-3 inline-flex h-9 items-center justify-center rounded-md border-[2px] border-ink bg-white px-3 font-mono text-[11px] font-bold uppercase tracking-wider text-ink sm:h-10 sm:text-[12px]"
                  style={{ transform: "rotate(-12deg)" }}
                >
                  ШАГ {s.n}
                </span>

                <h3
                  className="mt-2 text-[22px] font-bold leading-tight sm:text-[28px]"
                  style={{ color: s.ink }}
                >
                  {s.title}
                </h3>
                <p
                  className="mt-3 text-[15px] leading-relaxed sm:text-[17px]"
                  style={{ color: s.ink, opacity: 0.85 }}
                >
                  {s.body}
                </p>
              </div>

              {/* Dashed connector between steps (hidden on last) */}
              {idx < STEPS.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute bottom-[-30px] left-1/2 hidden h-[24px] w-px -translate-x-1/2 border-l-2 border-dashed border-ink-faint sm:block"
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
