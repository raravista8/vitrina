/**
 * 3 fixture-кейса для секции `<Examples>` лендинга v2.
 *
 * Каждая карточка соответствует реальному кастомер-сайту по структуре
 * (см. `screens-customer.jsx`). Картинки — placeholder терракотовых
 * градиентов, в production заменятся на CDN URLs (см. T14.7 — `/render`
 * proxy через Yandex Object Storage).
 *
 * Источник копи: `/tmp/samosite-canon/landing-samosite.jsx` lines 505+.
 */

export type ExampleSource = "telegram" | "yandex_maps" | "twogis" | "avito";

export interface ExampleService {
  name: string;
  price: string;
}

export interface ExampleReview {
  author: string;
  text: string;
}

export interface Example {
  /** Slug для anchor + analytics ref. */
  id: string;
  /** Имя дела. */
  name: string;
  /** Категория услуг. */
  category: string;
  /** Город. */
  city: string;
  /** Где источник. */
  source: ExampleSource;
  /** Palette tag для tinting (peach/sage/sky/etc). */
  palette: "peach" | "sage" | "sky" | "butter" | "rose" | "lavender";
  /** Hero-photo URL. Placeholder в dev → real photo from Y.Object Storage в prod. */
  heroPhoto: string;
  /** Услуги — 3-4 топ-позиции. */
  services: ExampleService[];
  /** Кураторские отзывы — 1-2 best per ADR-0010. */
  reviews: ExampleReview[];
  /** Mini-gallery thumbnails. */
  gallery: string[];
  /** Trust-row data (display-only). */
  yearsExperience: number;
  clientsServed: number;
  rating: number;
}

const SOURCE_LABEL: Record<ExampleSource, string> = {
  telegram: "из Telegram-канала",
  yandex_maps: "из Яндекс.Карт",
  twogis: "из 2ГИС",
  avito: "из Avito-профиля",
};

export function sourceLabel(s: ExampleSource): string {
  return SOURCE_LABEL[s];
}

export const EXAMPLES: Example[] = [
  {
    id: "studia-anna",
    name: "Студия маникюра Анны",
    category: "Маникюр и педикюр",
    city: "Петрозаводск",
    source: "yandex_maps",
    palette: "peach",
    heroPhoto: "/examples/anna-hero.jpg",
    yearsExperience: 8,
    clientsServed: 1200,
    rating: 4.9,
    services: [
      { name: "Маникюр классический · 30 мин", price: "от 1500 ₽" },
      { name: "Маникюр с покрытием · 1 ч", price: "от 2200 ₽" },
      { name: "Покрытие гель-лак · 1.5 ч", price: "от 2800 ₽" },
      { name: "Снятие покрытия · 20 мин", price: "500 ₽" },
    ],
    reviews: [
      {
        author: "Мария К.",
        text: "Анна — настоящий мастер. Сделала именно то, что я хотела, и держится уже три недели идеально.",
      },
      {
        author: "Елена П.",
        text: "Хожу к Анне уже год, ни разу не пожалела. Уютно, чисто, и всегда красиво.",
      },
    ],
    gallery: [
      "/examples/anna-1.jpg",
      "/examples/anna-2.jpg",
      "/examples/anna-3.jpg",
      "/examples/anna-4.jpg",
    ],
  },
  {
    id: "barber-brest",
    name: "Барбершоп Brest",
    category: "Барбершоп",
    city: "Брест",
    source: "telegram",
    palette: "sage",
    heroPhoto: "/examples/brest-hero.jpg",
    yearsExperience: 5,
    clientsServed: 800,
    rating: 4.8,
    services: [
      { name: "Мужская стрижка · 40 мин", price: "от 1800 ₽" },
      { name: "Стрижка + укладка · 1 ч", price: "от 2400 ₽" },
      { name: "Бритьё опасной бритвой · 30 мин", price: "1600 ₽" },
      { name: "Стрижка + борода · 1 ч 20", price: "от 2900 ₽" },
    ],
    reviews: [
      {
        author: "Андрей М.",
        text: "Стригусь здесь третий год — ребята всегда подскажут, что лучше. Атмосфера и кофе — отдельный плюс.",
      },
      {
        author: "Дмитрий Б.",
        text: "Лучший барбер в городе, без преувеличения. Запись на месяц вперёд, и понятно почему.",
      },
    ],
    gallery: [
      "/examples/brest-1.jpg",
      "/examples/brest-2.jpg",
      "/examples/brest-3.jpg",
      "/examples/brest-4.jpg",
    ],
  },
  {
    id: "psy-marina",
    name: "Психолог Марина",
    category: "Психотерапия для взрослых",
    city: "Москва · онлайн",
    source: "yandex_maps",
    palette: "sky",
    heroPhoto: "/examples/marina-hero.jpg",
    yearsExperience: 12,
    clientsServed: 2400,
    rating: 5.0,
    services: [
      { name: "Индивидуальная сессия · 50 мин", price: "5000 ₽" },
      { name: "Парная терапия · 1 ч 20", price: "8000 ₽" },
      { name: "Первая встреча · 50 мин", price: "3500 ₽" },
      { name: "Онлайн-сессия · 50 мин", price: "4500 ₽" },
    ],
    reviews: [
      {
        author: "Анна С.",
        text: "Марина — внимательный и тёплый психолог. После 6 сессий у меня появилась уверенность, которую я долго искала.",
      },
      {
        author: "Сергей Л.",
        text: "Спокойный, неосуждающий подход. Помогла увидеть со стороны то, что я сам не замечал.",
      },
    ],
    gallery: [
      "/examples/marina-1.jpg",
      "/examples/marina-2.jpg",
      "/examples/marina-3.jpg",
      "/examples/marina-4.jpg",
    ],
  },
];
