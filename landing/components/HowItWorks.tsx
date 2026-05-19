/**
 * "Как это работает" — 3-step explainer. Plain text + numbers, no images.
 *
 * Copy is consistent with PRD §4 (scenarios S1–S4) and stays in product
 * voice per COPY.md §6 (глаголы про продукт: "сам ведёт", "приносит",
 * "ловит", "находит" — не про мастера).
 */

const STEPS = [
  {
    label: "1",
    title: "Покажите ваше дело",
    body: "Вставьте ссылку на Telegram-канал, Яндекс.Карты или загрузите фото визитки. Один клик.",
  },
  {
    label: "2",
    title: "ИИ соберёт сайт",
    body: "За пару минут — текст, фото, описание услуг, контактная форма. Без шаблонов на выбор и без ручной настройки.",
  },
  {
    label: "3",
    title: "Сайт живёт сам",
    body: "Обновляется раз в неделю, ловит заявки в Telegram, держит вас в поиске Яндекса. Вам ничего не нужно делать.",
  },
] as const;

export function HowItWorks() {
  return (
    <section aria-labelledby="how-title" className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <h2
          id="how-title"
          className="text-center text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl"
        >
          Как это работает
        </h2>

        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {STEPS.map((step) => (
            <li key={step.label} className="text-left">
              <span
                aria-hidden
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-base font-semibold text-white"
              >
                {step.label}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-neutral-900">{step.title}</h3>
              <p className="mt-2 text-sm text-neutral-600">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
