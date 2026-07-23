/**
 * `?niche=` из рекламных ссылок Я.Директа → ниша канона.
 *
 * Тест защищает контракт кампании: слаги здесь = слаги в ссылках объявлений
 * (`direct_wave2_plan.md`). Промах слага молча ломает пер-нишевую аналитику
 * волны — заявка ляжет с чужой нишей, поэтому список фиксируем тестом.
 */
import { describe, expect, it } from "vitest";

import { NICHE_SLUGS, nicheFromLocation, nicheFromSlug } from "@/lib/niche";

describe("nicheFromSlug", () => {
  it("разбирает слаги 5 групп кампании", () => {
    expect(nicheFromSlug("manicure")).toBe("Маникюр");
    expect(nicheFromSlug("brows")).toBe("Брови и ресницы");
    expect(nicheFromSlug("barber")).toBe("Барбершоп");
    expect(nicheFromSlug("skin")).toBe("Косметолог");
    expect(nicheFromSlug("colorist")).toBe("Колорист");
  });

  it("терпит регистр и пробелы (ссылки набираются руками)", () => {
    expect(nicheFromSlug("  BARBER ")).toBe("Барбершоп");
    expect(nicheFromSlug("Manicure")).toBe("Маникюр");
  });

  it("синонимы ведут в ту же нишу", () => {
    expect(nicheFromSlug("nails")).toBe("Маникюр");
    expect(nicheFromSlug("barbershop")).toBe("Барбершоп");
    expect(nicheFromSlug("kosmetolog")).toBe("Косметолог");
    expect(nicheFromSlug("lashes")).toBe("Брови и ресницы");
  });

  it("неизвестное/пустое → null (посетитель выбирает сам, группа «Общая бьюти»)", () => {
    expect(nicheFromSlug("beauty")).toBeNull();
    expect(nicheFromSlug("")).toBeNull();
    expect(nicheFromSlug("   ")).toBeNull();
    expect(nicheFromSlug(null)).toBeNull();
    expect(nicheFromSlug(undefined)).toBeNull();
  });

  it("все значения словаря — реальные id ниш канона", () => {
    const canonIds = new Set([
      "Маникюр",
      "Брови и ресницы",
      "Барбершоп",
      "Косметолог",
      "Колорист",
      "Другое",
    ]);
    for (const id of Object.values(NICHE_SLUGS)) expect(canonIds.has(id)).toBe(true);
  });
});

describe("nicheFromLocation", () => {
  it("читает ?niche= из адреса страницы", () => {
    window.history.replaceState({}, "", "/?niche=barber&utm_source=yandex");
    expect(nicheFromLocation()).toBe("Барбершоп");
  });

  it("без параметра → null", () => {
    window.history.replaceState({}, "", "/");
    expect(nicheFromLocation()).toBeNull();
  });
});
