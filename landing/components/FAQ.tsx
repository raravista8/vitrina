/**
 * `<FAQ>` — landing v2.2 секция вопросов, canon match.
 *
 * Spec: docs/COPY.md §2.8 + canon `FaqSection`
 * (landing-samosite.jsx line 2241) + `FaqItem` (line 2208).
 *
 * User feedback batch 3: «у ICP (маникюрша, психолог, барбер) куча
 * страхов: данные / ИИ-ерунда / редактирование / нет фото / нет
 * Telegram / свой домен / ответственность». Эти вопросы остаются с
 * человеком и часть из них становится причиной «не нажать».
 *
 * v2.2 layout (Phase C-FAQ rebuild from divided-list to canon stack):
 *   • Each Q&A is a SEPARATE white card with 1 px line border +
 *     14 px radius (was rows on a shared `<dl>` with dividers).
 *   • Cards stacked with `gap-2.5` (10 px per canon line 2300). No
 *     between-card dividers — visual separation comes from card
 *     backgrounds against the section's bg-paper.
 *   • Right-side toggle: 28×28 paper-soft circle with terracotta «+»
 *     glyph. Replaces prod's lucide ChevronDown.
 *   • First Q open by default — canon line 2305. Pattern: «прочитай
 *     первый ответ как inviting handshake, листай остальные по мере
 *     интереса».
 *   • Question text — 16.5 px desktop / 15.5 px mobile, weight 600.
 *   • Answer text — 15.5/14.5 px, ink-soft colour, text-pretty.
 *   • Native `<details>` element preserved — SEO (Google indexes
 *     answers as rich snippets) + zero-JS toggle behaviour.
 */

import { FAQGoalTracker } from "./FAQGoalTracker";

interface Item {
  q: string;
  a: string;
}

const FAQ_ITEMS: ReadonlyArray<Item> = [
  {
    q: "А если Самосайт сам напишет что-то не то?",
    a: "Все тексты можно поправить в личном кабинете — пара кликов. Если совсем не нравится — нажмите «пересобрать», и Самосайт напишет заново с другим тоном или акцентом.",
  },
  {
    q: "Я могу сам править тексты после сборки?",
    a: "Да. В личном кабинете прямо на сайте — клик по любому блоку, правите текст. Также можно заменить фото, скрыть услугу, поправить цену. Сайт ваш.",
  },
  {
    q: "Что если у меня нет Telegram-канала и нет карточки в Яндекс.Картах?",
    a: "Загрузите 5–10 фото работ, скриншот шапки профиля или просто фото визитки — Самосайт соберёт сайт из этого. На стартовой странице есть кнопка «Загрузить фото работ, скриншот профиля или визитку».",
  },
  {
    q: "Мой Telegram-канал закрытый. Самосайт его прочитает?",
    a: "Да. На время сбора добавьте бота @SamositeIntakeBot админом в свой канал на 5 минут — мы прочитаем посты и сразу выйдем. Это безопасно: бот не пишет в канал и не видит ваших подписчиков.",
  },
  {
    q: "Как Самосайт сам понимает, какие отзывы лучшие?",
    a: "Читает все отзывы из источника, отбрасывает односложные («норм», «-», «ок»), тройки, спам и токсичные. Из оставшихся выбирает 4–6 самых тёплых и конкретных — тех, что прямо рассказывают, что понравилось. Каждую неделю проверяет: появился отзыв сильнее — заменит.",
  },
  {
    q: "Куда Самосайт сам отправит заявку, если у меня нет Telegram?",
    a: "Выбираете один канал из четырёх: Telegram, телефон (SMS), email или MAX (российский мессенджер от VK). Заявка падает туда. Никаких CRM и отдельных приложений — только то, что вы и так читаете.",
  },
  {
    q: "Может ли Самосайт сам подключить мой домен?",
    a: "Если у вас уже есть домен — пришлите его, мы поможем настроить DNS. Если нет — сайт сразу живёт на адресе <ваш-сайт>.samosite.online со всем тем же самым, бесплатно.",
  },
  {
    q: "Что с моими данными, если я откажусь от подписки?",
    a: "Сайт перестаёт показываться сразу. Все ваши данные — тексты, фото, заявки клиентов — удаляются в течение 10 дней. До удаления можно скачать архив (HTML + фото) одной кнопкой. По ФЗ-152 — все данные хранятся в РФ.",
  },
  {
    q: "А если клиент жалуется на сайт — кто отвечает?",
    a: "Ответственность за контент несёте вы как владелец дела. Мы проверяем, что текст не нарушает закон, но не контролируем фактическую точность («стерильные инструменты», «гарантия 14 дней» — это ваши обещания). Если клиент пишет про техническую проблему сайта — пишите нам, поправим.",
  },
  {
    q: "Что Самосайт сам НЕ умеет?",
    a: "Не пишет сайт «с нуля без источника» — нужна хотя бы одна ссылка или фото. Не редактирует фото и не подбирает чужие. Не отвечает клиентам в чатах за вас — только присылает заявки. Не покупает домен и не настраивает корпоративную почту. Не делает интернет-магазины с оплатой — только заявки.",
  },
];

export function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-paper px-5 py-14 sm:px-16 sm:py-24">
      <FAQGoalTracker />
      <header className="mx-auto mb-7 max-w-[1100px] sm:mb-12 sm:text-center">
        <p className="font-mono text-[11px] uppercase tracking-widest text-accent">
          Частые вопросы
        </p>
        <h2
          id="faq-title"
          className="mt-2 text-[30px] font-bold leading-[1.05] tracking-tight text-ink sm:text-[48px]"
        >
          Что чаще всего
          <br className="hidden sm:block" /> спрашивают
        </h2>
      </header>

      {/* Stack of cards per canon (line 2295). Gap 10 px = gap-2.5.
          maxWidth 820 px desktop matches canon. */}
      <div className="mx-auto flex max-w-[820px] flex-col gap-2.5">
        {FAQ_ITEMS.map((item, idx) => (
          <details
            key={item.q}
            // Native <details> для SEO (rich snippets) + zero-JS toggle.
            data-faq-id={`q${idx + 1}`}
            open={idx === 0}
            // group-open utility used below for the «+» rotation.
            className="group overflow-hidden rounded-[14px] border border-line bg-white"
          >
            <summary className="hover:bg-paper-soft/50 flex cursor-pointer list-none items-center gap-3.5 px-[18px] py-4 text-[15.5px] font-semibold leading-[1.35] text-ink sm:px-[22px] sm:py-[18px] sm:text-[16.5px] [&::-webkit-details-marker]:hidden">
              <span className="flex-1">{item.q}</span>
              {/* Toggle glyph — 28 px paper-soft circle with terracotta «+».
                  Rotates 45° → becomes ✕ when the disclosure is open.
                  Native rotation tied to <details open> via group-open. */}
              <span
                aria-hidden
                className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-paper-soft text-[18px] font-bold leading-none text-accent transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <div className="px-[18px] pb-4 pt-0 text-[14.5px] leading-[1.55] text-ink-soft sm:px-[22px] sm:pb-5 sm:text-[15.5px]">
              {item.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
