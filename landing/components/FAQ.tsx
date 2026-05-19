/**
 * FAQ — the questions that decide a paste-or-leave.
 *
 * Tone-of-voice per COPY.md §6: спокойный, в продуктовом голосе, без
 * маркетингового жаргона. Каждый ответ — 1-3 предложения максимум.
 */

interface Item {
  q: string;
  a: string;
}

const FAQ_ITEMS: ReadonlyArray<Item> = [
  {
    q: "Мне нужно что-то делать после регистрации?",
    a: "Нет. Сайт сам обновляется раз в неделю из вашего источника, сам ловит заявки и сам отправляет себя в Яндекс и Google.",
  },
  {
    q: "Что если у меня нет Telegram-канала и нет карточки в Яндекс.Картах?",
    a: "Загрузите фото — работ, скриншот шапки профиля в соцсетях, визитку или буклет. ИИ соберёт сайт из них.",
  },
  {
    q: "Сколько это стоит?",
    a: "Первый месяц бесплатно, без карты при регистрации. Дальше 990 ₽/мес, отмена в один клик.",
  },
  {
    q: "Мой канал закрытый. Можно?",
    a: "Да — загрузите экспорт канала из Telegram Desktop. Никаких ботов добавлять не нужно.",
  },
  {
    q: "Где хранятся данные?",
    a: "Все данные — в России. Сервис соответствует ФЗ-152. Удалить аккаунт и все данные можно в один клик в личном кабинете.",
  },
];

export function FAQ() {
  return (
    <section aria-labelledby="faq-title" className="px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <h2
          id="faq-title"
          className="text-center text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl"
        >
          Вопросы и ответы
        </h2>

        <dl className="mt-10 divide-y divide-neutral-200">
          {FAQ_ITEMS.map((item) => (
            <div key={item.q} className="py-5">
              <dt className="text-base font-semibold text-neutral-900">{item.q}</dt>
              <dd className="mt-2 text-sm text-neutral-600">{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
