import { describe, expect, it } from "vitest";

import { detectSource, waitlistSourceLabel } from "@/lib/source-detect";

describe("detectSource — MVP sources", () => {
  it.each([
    ["https://yandex.ru/maps/123/cafe", "ymaps"],
    ["https://yandex.com/maps/some/place", "ymaps"],
    ["https://maps.yandex.ru/?some=123", null], // /maps path required
    ["https://t.me/master_barber", "telegram"],
    ["https://www.t.me/master_barber", "telegram"],
    ["https://telegram.me/master_barber", "telegram"],
    ["@master_barber", "telegram"],
  ])("classifies %s correctly", (input, expected) => {
    const result = detectSource(input);
    if (expected === null) {
      expect(result.kind).not.toBe("mvp");
    } else {
      expect(result.kind).toBe("mvp");
      if (result.kind === "mvp") {
        expect(result.type).toBe(expected);
      }
    }
  });

  it("lowercases bare @-handle on canonical form", () => {
    const result = detectSource("@Master_Barber");
    expect(result.kind).toBe("mvp");
    if (result.kind === "mvp") {
      expect(result.canonical).toBe("@master_barber");
    }
  });
});

describe("detectSource — waitlist sources", () => {
  it.each([
    ["https://instagram.com/master", "instagram"],
    ["https://www.instagram.com/master/", "instagram"],
    ["https://instagr.am/master", "instagram"],
    ["https://vk.com/master", "vkontakte"],
    ["https://vkontakte.ru/master", "vkontakte"],
    ["https://2gis.ru/moscow/firm/123", "twogis"],
    ["https://avito.ru/items/123", "avito"],
    ["https://ozon.ru/seller/abc", "ozon"],
    ["https://wildberries.ru/seller/xyz", "wildberries"],
    ["https://wb.ru/something", "wildberries"],
    ["https://wa.me/79261234567", "whatsapp"],
    ["https://youtube.com/@channel", "youtube"],
    ["https://youtu.be/abc", "youtube"],
    ["https://dzen.ru/some-channel", "dzen"],
    ["https://max.ru/u/alice", "max"],
  ])("classifies %s as %s", (input, expected) => {
    const result = detectSource(input);
    expect(result.kind).toBe("waitlist");
    if (result.kind === "waitlist") {
      expect(result.source).toBe(expected);
    }
  });
});

describe("detectSource — fallbacks", () => {
  it("treats unknown http URLs as unknown_url", () => {
    const result = detectSource("https://example.com/some/page");
    expect(result.kind).toBe("unknown_url");
  });

  it("treats empty / non-URL strings as not_url", () => {
    expect(detectSource("").kind).toBe("not_url");
    expect(detectSource("   ").kind).toBe("not_url");
    expect(detectSource("hello world").kind).toBe("not_url");
    expect(detectSource("not_a_url_or_handle").kind).toBe("not_url");
  });

  it("rejects too-short @-handles", () => {
    // TG enforces 5+ chars after the @.
    expect(detectSource("@abc").kind).toBe("not_url");
  });

  it("trims surrounding whitespace before classifying", () => {
    const result = detectSource("   https://yandex.ru/maps/xyz   ");
    expect(result.kind).toBe("mvp");
  });
});

describe("waitlistSourceLabel", () => {
  it("returns a Russian label for every waitlist source", () => {
    expect(waitlistSourceLabel("instagram")).toBe("Instagram");
    expect(waitlistSourceLabel("vkontakte")).toBe("ВКонтакте");
    expect(waitlistSourceLabel("twogis")).toBe("2GIS");
    expect(waitlistSourceLabel("avito")).toBe("Avito");
    expect(waitlistSourceLabel("ozon")).toBe("Ozon");
    expect(waitlistSourceLabel("wildberries")).toBe("Wildberries");
    expect(waitlistSourceLabel("whatsapp")).toBe("WhatsApp");
    expect(waitlistSourceLabel("youtube")).toBe("YouTube");
    expect(waitlistSourceLabel("dzen")).toBe("Дзен");
    expect(waitlistSourceLabel("max")).toBe("MAX");
  });
});
