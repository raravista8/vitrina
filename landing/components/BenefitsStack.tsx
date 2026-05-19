/**
 * Four-bullet benefits stack from docs/COPY.md §2.
 *
 * Order is locked per COPY.md §4 hierarchy:
 *   1. 🔄 Сам обновляется         (главный дифференциатор)
 *   2. 📨 Сам ловит заявки         (JTBD результат)
 *   3. 🔎 Сам находится в поиске   (acquisition channel)
 *   4. 🎁 Первый месяц бесплатно   (risk reversal)
 *
 * Do not re-order without re-reading COPY.md §4 — the hierarchy was
 * decided by self-critique and is part of the canonical messaging.
 */

interface Benefit {
  icon: string;
  title: string;
  body: string;
}

const BENEFITS: ReadonlyArray<Benefit> = [
  {
    icon: "🔄",
    title: "Сам обновляется",
    body: "Раз в неделю забирает новые фото и отзывы из источника.",
  },
  {
    icon: "📨",
    title: "Сам ловит заявки",
    body: "Форма, кнопка записи и уведомления в Telegram — из коробки.",
  },
  {
    icon: "🔎",
    title: "Сам находится в поиске",
    body: "Подбирает ключевые слова и отправляет сайт в Яндекс и Google. Клиенты находят вас сами.",
  },
  {
    icon: "🎁",
    title: "Первый месяц бесплатно",
    body: "Попробуйте на своём деле — не продлевайте, если не зайдёт.",
  },
];

export function BenefitsStack() {
  return (
    <section aria-labelledby="benefits-title" className="bg-neutral-50 px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <h2 id="benefits-title" className="sr-only">
          Что вы получаете
        </h2>

        <ul className="grid gap-6 sm:grid-cols-2">
          {BENEFITS.map((benefit) => (
            <li
              key={benefit.title}
              className="flex gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-100"
            >
              <span aria-hidden className="text-3xl">
                {benefit.icon}
              </span>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900">{benefit.title}</h3>
                <p className="mt-1 text-sm text-neutral-600">{benefit.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
