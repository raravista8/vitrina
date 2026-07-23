/**
 * Ниша из URL-параметра `?niche=` → id ниши канона (`NICHE_LIB_V2`).
 *
 * Зачем: Я.Директ ведёт каждую группу объявлений на свою посадочную
 * (`samosite.online/?niche=manicure`), чтобы посетитель сразу увидел пример
 * СВОЕЙ ниши, а заявка легла с правильной нишей — иначе разрез волны по
 * нишам врёт (мастер маникюра и барбер попадают в один котёл).
 *
 * Слаги латиницей и с запасом синонимов: ссылки в объявлениях набираются
 * руками, а промах параметра молча ломает всю пер-нишевую аналитику
 * кампании. Неизвестный слаг → `null` (ниша не предвыбирается, посетитель
 * выбирает сам) — это же поведение для групп без ниши («Общая бьюти»).
 *
 * Канонические id (canon `NICHE_LIB_V2`): Маникюр · Брови и ресницы ·
 * Барбершоп · Косметолог · Колорист · Другое.
 */

/** Слаг из рекламной ссылки → id ниши канона. */
export const NICHE_SLUGS: Readonly<Record<string, string>> = {
  // Маникюр
  manicure: "Маникюр",
  manikur: "Маникюр",
  nails: "Маникюр",
  nogti: "Маникюр",
  // Брови и ресницы
  brows: "Брови и ресницы",
  brow: "Брови и ресницы",
  brovi: "Брови и ресницы",
  lashes: "Брови и ресницы",
  resnicy: "Брови и ресницы",
  // Барбершоп / парикмахер
  barber: "Барбершоп",
  barbershop: "Барбершоп",
  parikmaher: "Барбершоп",
  // Косметолог
  skin: "Косметолог",
  cosmetolog: "Косметолог",
  kosmetolog: "Косметолог",
  cosmetologist: "Косметолог",
  // Колорист
  colorist: "Колорист",
  kolorist: "Колорист",
  color: "Колорист",
  okrashivanie: "Колорист",
};

/**
 * Разбирает значение `?niche=`: латинский слаг ИЛИ готовый id/лейбл ниши
 * (кириллицей — так приходит из CTA примеров канона).
 * Регистр и пробелы по краям не важны.
 */
export function nicheFromSlug(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const norm = raw.trim().toLowerCase();
  if (!norm) return null;
  return NICHE_SLUGS[norm] ?? null;
}

/** Читает `?niche=` из текущего URL (клиент). SSR → null. */
export function nicheFromLocation(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return nicheFromSlug(new URLSearchParams(window.location.search).get("niche"));
  } catch {
    return null;
  }
}
