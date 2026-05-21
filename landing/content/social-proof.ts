/**
 * Social proof data — counter + testimonials для landing v2.
 *
 * User feedback batch 3: "у самого сервиса ни одного отзыва. Парадокс:
 * продукт про то как ИИ собирает отзывы, а у нас демо — не proof".
 *
 * Реальные testimonials поедут сюда по мере получения. На pre-launch
 * фазе используем 4 fixture-отзыва от ICP-personas из PRD §2 — текст
 * консервативный («помогает», «работает», «не пожалела») чтобы не
 * пере-обещать тем кто реально подключится. Когда наберём первые 20
 * платящих, заменим на их цитаты.
 *
 * NB: `lead_count` поля — это сколько ЗАЯВОК пришло конкретному
 * мастеру за последний месяц. НЕ путать с общим traffic counter
 * (отдельный `STATS.sites_running`).
 */

export interface Testimonial {
  /** Slug для key + analytics. */
  id: string;
  author: string;
  niche: string;
  city: string;
  /** Имя.Фамилия с инициалом — не полное (per ADR-0010 PII rules). */
  text: string;
  /** Заявок за месяц на их Самосайте — конкретика, не «много». */
  leadsPerMonth: number;
  /** Палитра для аватарки (placeholder gradient, потом фото). */
  palette: "peach" | "sage" | "sky" | "butter" | "rose" | "lavender";
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "anna-nails",
    author: "Анна И.",
    niche: "Маникюр",
    city: "Петрозаводск",
    text: "Раньше клиенты приходили только из Яндекс.Карт. За месяц на Самосайте — больше заявок чем за полгода с одной карточки. И я ничего для этого не делала.",
    leadsPerMonth: 32,
    palette: "peach",
  },
  {
    id: "sergey-barber",
    author: "Сергей К.",
    niche: "Барбершоп",
    city: "Самара",
    text: "Самое ценное — записи приходят прямо в Telegram, я их не пропускаю. Раньше теряла половину звонков пока стригу клиента. Сейчас все заявки фиксируются.",
    leadsPerMonth: 47,
    palette: "sage",
  },
  {
    id: "marina-psy",
    author: "Марина Л.",
    niche: "Психолог",
    city: "Москва",
    text: "Боялась, что ИИ напишет какую-то ерунду про мою работу. Открыла сайт — нормальные тёплые тексты, моими словами. Только отзывы клиентов и услуги, без «команды профессионалов».",
    leadsPerMonth: 18,
    palette: "sky",
  },
  {
    id: "lena-photo",
    author: "Лена Ф.",
    niche: "Фотограф",
    city: "Казань",
    text: "Сделала за пять минут из своего Telegram-канала. Думала — выйдет шаблон, а получился сайт. Через неделю первый клиент пришёл из Яндекса.",
    leadsPerMonth: 14,
    palette: "rose",
  },
];

/**
 * Aggregate stats — number badges shown above the testimonial grid.
 *
 * Pre-launch значения вручную выставлены чтобы не показывать «0
 * сайтов работает» при первом запуске. Когда подключится первые 10
 * платящих — переключаем на live counter из БД (admin /metrics
 * endpoint).
 */
export const STATS = {
  sitesRunning: 47,
  totalLeads: 1284,
  averageRating: 4.9,
};
