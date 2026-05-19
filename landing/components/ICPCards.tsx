/**
 * Three persona cards from PRD §2 (target users & JTBD).
 *
 * Cards are short — they're there to make the visitor say "это про меня",
 * not to read like a research summary. Names + key pain quote only.
 */

interface Persona {
  title: string;
  who: string;
  pain: string;
}

const PERSONAS: ReadonlyArray<Persona> = [
  {
    title: "Мастер маникюра",
    who: "Аня, 28, Петрозаводск",
    pain: "«Хочу, чтобы новые клиенты находили меня в Яндексе. На Тильду села три раза, бросила.»",
  },
  {
    title: "Барбершоп",
    who: "Сергей, 3 кресла, Самара",
    pain: "«Заказывал сайт у студента — через год умер. Не хочу зависеть от человека.»",
  },
  {
    title: "Частный психолог",
    who: "Марина, Москва",
    pain: "«Нужно лицо в интернете для доверия. B17 завален всеми подряд — теряюсь.»",
  },
];

export function ICPCards() {
  return (
    <section aria-labelledby="icp-title" className="bg-neutral-50 px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <h2
          id="icp-title"
          className="text-center text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl"
        >
          Для частных мастеров и малых услуг
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-base text-neutral-600">
          Если у вас уже есть Telegram-канал, карточка на Яндекс.Картах или просто фото работ —
          этого хватит.
        </p>

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {PERSONAS.map((p) => (
            <li
              key={p.who}
              className="flex flex-col gap-3 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-100"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                {p.title}
              </p>
              <p className="text-base font-semibold text-neutral-900">{p.who}</p>
              <p className="text-sm italic text-neutral-600">{p.pain}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
