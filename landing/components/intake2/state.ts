/**
 * Интейк v2 — типы формы, черновик в localStorage, валидации-зеркала и
 * маршрутизация ошибок бэкенда по шагам.
 *
 * Стейт-машина (MANUAL MODE, июль 2026 — заявки исполняет founder руками):
 *
 *   example → source → booking → contacts → done
 *
 * Шаги `recognize` и `confirmCard` из ТЗ СОЗНАТЕЛЬНО пропущены: пути
 * `name` (название+город едут текстом — карточку founder находит сам) и
 * `screenshot` (файл едет вложением без распознавания) идут source→booking
 * напрямую. `In2_StepRecognize`/`In2_StepConfirmCard` нигде не
 * импортируются — включатся, когда появится поиск/распознавание.
 */

export type Intake2Step = "example" | "source" | "booking" | "contacts" | "done";

export type SourcePath = "name" | "screenshot" | "link" | "photo";
export type BookingPlatform = "dikidi" | "yclients" | "phone" | "none";

/** RU-лейблы чипов канона (In2_StepContacts). */
export type ChannelLabel = "Telegram" | "MAX" | "WhatsApp" | "Email" | "Телефон/SMS";

export const CHANNEL_LABELS: readonly ChannelLabel[] = [
  "Telegram",
  "MAX",
  "WhatsApp",
  "Email",
  "Телефон/SMS",
];

/** Лейбл чипа канона → contact_channel бэкенда. */
export const CHANNEL_TO_API: Record<ChannelLabel, string> = {
  Telegram: "telegram",
  MAX: "max",
  WhatsApp: "whatsapp",
  Email: "email",
  "Телефон/SMS": "phone",
};

/** Сериализуемая часть формы (Files живут отдельно — в localStorage не едут). */
export interface Intake2FormState {
  niche: string;
  path: SourcePath;
  // путь A «название + город»
  businessName: string;
  city: string;
  // путь C «ссылка»
  link: string;
  // шаг 04 «запись»
  bookingPlatform: BookingPlatform;
  bookingUrl: string;
  bookingPhone: string;
  // шаг 05 «контакты» — значение хранится отдельно на каждый канал
  channel: ChannelLabel;
  contacts: Record<ChannelLabel, string>;
  consent: boolean;
}

export function initialForm(niche?: string): Intake2FormState {
  return {
    niche: niche ?? "Маникюр",
    path: "name",
    businessName: "",
    city: "",
    link: "",
    bookingPlatform: "dikidi",
    bookingUrl: "",
    bookingPhone: "",
    channel: "Telegram",
    contacts: { Telegram: "", MAX: "", WhatsApp: "", Email: "", "Телефон/SMS": "" },
    consent: false,
  };
}

/** «Грязная» ли форма (для confirm-close и записи черновика). Файлы учитывает вызывающий. */
export function isFormDirty(form: Intake2FormState): boolean {
  return Boolean(
    form.businessName.trim() ||
    form.city.trim() ||
    form.link.trim() ||
    form.bookingUrl.trim() ||
    form.bookingPhone.trim() ||
    form.consent ||
    CHANNEL_LABELS.some((c) => form.contacts[c].trim()),
  );
}

// ─── валидации-зеркала (canon не экспортирует свои contactValid/linkInfo) ───

const PHONE_CHANNELS: readonly ChannelLabel[] = ["WhatsApp", "Телефон/SMS"];

/** Побайтовое зеркало canon `contactValid` (in2.tsx) — для строки «Осталось: …». */
export function contactValid(channel: ChannelLabel, value: string): boolean {
  const v = (value || "").trim();
  if (!v) return false;
  if (PHONE_CHANNELS.includes(channel)) return v.replace(/\D/g, "").length === 11;
  if (channel === "Email") return /^\S+@\S+\.\S+$/.test(v);
  return /^@?[A-Za-z0-9_.]{2,}$/.test(v);
}

/** Бэкенд требует `^https?://…` — canon же принимает ссылки без протокола. */
export function normalizeUrl(raw: string): string {
  const v = raw.trim();
  if (!v) return "";
  return /^https?:\/\//i.test(v) ? v : `https://${v}`;
}

// ─── черновик (localStorage) ───

export const DRAFT_KEY = "ss_intake2_draft";

interface DraftPayload {
  v: 1;
  step: Intake2Step;
  form: Intake2FormState;
}

export function saveDraft(step: Intake2Step, form: Intake2FormState): void {
  try {
    const payload: DraftPayload = { v: 1, step, form };
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify(payload));
  } catch {
    // приватный режим / переполненный storage — черновик просто не сохранится
  }
}

export function loadDraft(): { step: Intake2Step; form: Intake2FormState } | null {
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<DraftPayload>;
    if (parsed.v !== 1 || !parsed.form || !parsed.step) return null;
    if (parsed.step === "done") return null; // успешная отправка чистит черновик; done не восстанавливаем
    // merge поверх initialForm — переживает добавление полей в будущих версиях
    const form: Intake2FormState = {
      ...initialForm(),
      ...parsed.form,
      contacts: { ...initialForm().contacts, ...(parsed.form.contacts ?? {}) },
    };
    return { step: parsed.step, form };
  } catch {
    return null;
  }
}

export function clearDraft(): void {
  try {
    window.localStorage.removeItem(DRAFT_KEY);
  } catch {
    // ignore
  }
}

// ─── маршрутизация ошибок бэкенда ───

export interface SubmitErrorRoute {
  /** На какой шаг вернуть пользователя. */
  step: Extract<Intake2Step, "source" | "booking" | "contacts">;
  /** Конкретное сообщение; null → generic-плашка канона «Не получилось отправить…». */
  message: string | null;
}

/** Код ошибки POST /api/submit-application/v2 → шаг + инлайн-сообщение. */
export function routeSubmitError(code: string | null, status: number): SubmitErrorRoute {
  if (status === 429) {
    return {
      step: "contacts",
      message: "Слишком много попыток — подождите пару минут и попробуйте снова",
    };
  }
  switch (code) {
    case "invalid_contact_for_channel":
    case "invalid_contact_channel":
      return {
        step: "contacts",
        message: "Контакт не подходит к выбранному каналу — проверьте формат",
      };
    case "invalid_captcha":
      return {
        step: "contacts",
        message: "Не прошла проверка от роботов — попробуйте отправить ещё раз",
      };
    case "consent_required":
      return { step: "contacts", message: "Нужно согласие на обработку данных" };
    case "contact_conflict":
      return {
        step: "contacts",
        message: "По этому контакту уже есть заявка — черновик уже в работе",
      };
    case "invalid_booking_url":
    case "invalid_booking_phone":
    case "invalid_booking_platform":
      return {
        step: "booking",
        message: "Проверьте данные записи — ссылка или номер не подошли",
      };
    case "business_name_required":
      return { step: "source", message: "Название не дошло — введите его ещё раз" };
    case "invalid_source_url":
      return { step: "source", message: "Ссылка не подошла — проверьте адрес" };
    case "screenshot_requires_one_file":
    case "photo_count_out_of_range":
    case "file_too_large":
    case "batch_too_large":
    case "unsupported_file_type":
      return { step: "source", message: "Файлы не подошли — проверьте формат и размер" };
    default:
      return { step: "contacts", message: null };
  }
}
