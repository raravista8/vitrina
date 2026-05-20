import { describe, expect, it } from "vitest";

import {
  badgeFor,
  detectContact,
  formatPhoneProgressive,
  type ContactType,
} from "@/lib/contact-detect";

function typeOf(input: string): ContactType | null {
  return detectContact(input)?.contactType ?? null;
}

describe("detectContact — email", () => {
  it.each([
    ["alice@example.com", "email"],
    ["ALICE@EXAMPLE.COM", "email"],
    ["user+tag@sub.domain.io", "email"],
    ["us.er@example.io", "email"], // multi-part local + multi-char TLD
  ] as const)("classifies %s as %s", (raw, expected) => {
    expect(typeOf(raw)).toBe(expected);
  });

  it.each(["alice@", "@example.com", "alice@example", "alice@@example.com"])(
    "rejects malformed email %s",
    (raw) => {
      expect(typeOf(raw)).not.toBe("email");
    },
  );
});

describe("detectContact — phone", () => {
  it.each([
    "+79261234567",
    "89261234567",
    "8 (926) 123-45-67",
    "+7 (916) 555 12 34",
    "+1 415 555 0123",
  ])("classifies %s as phone", (raw) => {
    expect(typeOf(raw)).toBe("phone");
  });

  it("rejects phone-shaped string with too few digits", () => {
    expect(typeOf("123-45")).toBeNull();
  });

  it("rejects phone-shaped string with too many digits", () => {
    expect(typeOf("+1234567890123456")).toBeNull();
  });
});

describe("detectContact — telegram", () => {
  it.each([
    "@alice_master",
    "alice_master",
    "Alice_Master",
    "https://t.me/master_barber",
    "https://www.t.me/master_barber",
    "https://telegram.me/master_barber",
    "t.me/master_barber",
  ])("classifies %s as telegram", (raw) => {
    expect(typeOf(raw)).toBe("telegram");
  });

  it("rejects too-short handle", () => {
    expect(typeOf("@ab")).toBeNull();
  });

  it("rejects handle starting with digit", () => {
    expect(typeOf("@1abcde")).toBeNull();
  });
});

describe("detectContact — max", () => {
  it.each([
    "https://max.ru/alice_master",
    "https://www.max.ru/u/alice_master",
    "max.ru/u/alice_master",
    "max://contact?id=alice_master",
  ])("classifies %s as max", (raw) => {
    expect(typeOf(raw)).toBe("max");
  });
});

describe("detectContact — rejections", () => {
  it.each([
    "",
    "   ",
    "not a contact",
    "<script>alert(1)</script>",
    "@",
    "@@alice",
    "alice@",
    "1234", // too short for phone, telegram, anything
  ])("rejects %p", (raw) => {
    expect(typeOf(raw)).toBeNull();
  });

  it("trims whitespace before classifying", () => {
    expect(typeOf("   alice@example.com   ")).toBe("email");
  });
});

describe("badgeFor", () => {
  it.each([
    ["email", "📧", "Email"],
    ["phone", "📱", "Телефон"],
    ["telegram", "✈️", "Telegram"],
    ["max", "💬", "MAX"],
  ] as const)("returns icon+label for %s", (type, icon, label) => {
    const b = badgeFor(type);
    expect(b.icon).toBe(icon);
    expect(b.label).toBe(label);
  });
});

describe("formatPhoneProgressive — UX batch 2 (B5)", () => {
  it.each([
    // raw → formatted
    ["9167388689", "+7 (916) 738-86-89"], // bare 10-digit
    ["89167388689", "+7 (916) 738-86-89"], // leading 8
    ["+79167388689", "+7 (916) 738-86-89"], // already E.164
    ["+7 916 738 86 89", "+7 (916) 738-86-89"], // space-separated
    ["8 (916) 738-86-89", "+7 (916) 738-86-89"], // already formatted-ish
    ["916", "+7 (916)"], // partial 3 digits
    ["9167", "+7 (916) 7"], // partial 4 digits — closing paren in
    ["91673", "+7 (916) 73"], // partial 5 — separator not yet
    ["916738", "+7 (916) 738"], // exactly 6
    ["9167388", "+7 (916) 738-8"], // 7 — hyphen separator appears
  ] as const)("formats %s → %s", (raw, expected) => {
    expect(formatPhoneProgressive(raw)).toBe(expected);
  });

  it.each([
    "alice@example.com", // email — leave alone
    "@master_barber", // TG handle — leave alone
    "master_barber", // bare TG handle
    "max://contact?id=abc123",
    "https://t.me/anna",
    "", // empty
  ])("returns null for non-phone shape %s", (raw) => {
    expect(formatPhoneProgressive(raw)).toBeNull();
  });

  it("is idempotent on its own output", () => {
    // Formatting "+7 (916) 738-86-89" again should produce the same
    // string — important because we re-format on every keystroke,
    // including when the value didn't change.
    const out = formatPhoneProgressive("9167388689");
    expect(out).not.toBeNull();
    expect(formatPhoneProgressive(out!)).toBe(out);
  });
});
