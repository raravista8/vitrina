/**
 * Pricing — single tariff card.
 *
 * Per PRD §2 Persona / TL;DR: 990 ₽/мес Pro, первый месяц бесплатно
 * без карты при регистрации. Risk-reversal is the same line as in the
 * Hero microcopy — keep them in sync.
 */

const HIGHLIGHTS: ReadonlyArray<string> = [
  "Сайт на поддомене name.samosite.online",
  "Авто-обновление каждую неделю",
  "Форма заявок + уведомления в Telegram",
  "Регистрация в Яндекс.Вебмастере и Google Search Console",
  "Хранение всех данных в России (ФЗ-152)",
];

export function Pricing() {
  return (
    <section aria-labelledby="pricing-title" className="bg-neutral-50 px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <h2
          id="pricing-title"
          className="text-center text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl"
        >
          Один тариф, всё включено
        </h2>

        <div className="mt-12 rounded-3xl bg-white p-10 shadow-sm ring-1 ring-neutral-100">
          <div className="flex flex-col items-center text-center">
            <p className="text-sm font-medium uppercase tracking-wider text-neutral-500">Pro</p>
            <p className="mt-3 text-5xl font-semibold text-neutral-900">
              990 <span className="text-2xl text-neutral-500">₽/мес</span>
            </p>
            <p className="mt-3 text-sm italic text-neutral-500">
              Первый месяц бесплатно — без карты при регистрации.
            </p>

            <ul className="mt-8 space-y-3 text-left text-sm text-neutral-700">
              {HIGHLIGHTS.map((line) => (
                <li key={line} className="flex items-start gap-2">
                  <span aria-hidden className="text-emerald-700">
                    ✓
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            <a
              href="#hero-title"
              className="mt-8 inline-flex items-center justify-center rounded-xl bg-neutral-900 px-6 py-3 text-base font-medium text-white hover:bg-neutral-800"
            >
              Собрать мою витрину →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
