/**
 * Client-side contact-type detection for the submit modal (T1.5).
 *
 * Mirrors `backend/app/core/contact/auto_detect.py` for the SHAPE side
 * only — full E.164 phone normalisation, MAX canonicalisation, etc. is
 * the server's job. Here we just colour the badge as the user types so
 * they see what we'll treat the contact as.
 *
 * Detection order (same as backend; matters because some shapes overlap):
 *   1. email       — `user@host.tld`
 *   2. max         — `max.ru/<name>` (scheme optional) or `max://contact?id=...`
 *   3. telegram URL — `t.me/<name>` / `telegram.me/<name>`
 *   4. phone       — `+?` + 10–15 digits with optional spaces/parens/dashes
 *   5. telegram    — bare `@name` or `name`, 5–32 chars `[a-z0-9_]`
 *
 * Returns `null` when nothing matches; the form displays an inline error
 * and disables submit.
 */

export type ContactType = "email" | "phone" | "telegram" | "max";

export interface DetectedContact {
  contactType: ContactType;
}

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i;

const MAX_URL_RE =
  /^(?:(?:https?:\/\/)?(?:www\.)?max\.ru\/(?:u\/)?[a-z0-9_]{3,32}\/?|max:\/\/contact\?id=[a-z0-9_]{3,64})$/i;

const TG_URL_RE = /^(?:https?:\/\/)?(?:www\.)?(?:t|telegram)\.me\/[a-z][a-z0-9_]{4,31}\/?$/i;

// Phone shape — wide-enough length range to cover the formatted RU mobile
// "+7 (916) 555-12-34" (18 chars). The min-10-digit guard below filters
// out things like "(((((((((  ".
const PHONE_SHAPE_RE = /^\+?[0-9\s()\-]{10,25}$/;
const PHONE_MIN_DIGITS = 10;
const PHONE_MAX_DIGITS = 15;

const TG_HANDLE_RE = /^@?[a-z][a-z0-9_]{4,31}$/i;

export function detectContact(raw: string): DetectedContact | null {
  const trimmed = raw.trim();
  if (trimmed.length === 0) return null;

  // 1. Email — `@` is highly disambiguating.
  if (trimmed.includes("@") && EMAIL_RE.test(trimmed)) {
    return { contactType: "email" };
  }

  // 2. MAX URL / deep-link.
  if (MAX_URL_RE.test(trimmed)) {
    return { contactType: "max" };
  }

  // 3. Telegram URL.
  if (TG_URL_RE.test(trimmed)) {
    return { contactType: "telegram" };
  }

  // 4. Phone — shape AND digit-count gate. A phone-shaped string that
  // fails the digit-count check is NOT treated as telegram; the badge
  // becomes `null` so the user gets an explicit error to fix it.
  if (PHONE_SHAPE_RE.test(trimmed)) {
    const digitCount = (trimmed.match(/\d/g) ?? []).length;
    if (digitCount >= PHONE_MIN_DIGITS && digitCount <= PHONE_MAX_DIGITS) {
      return { contactType: "phone" };
    }
    return null;
  }

  // 5. Bare Telegram handle (with or without @).
  if (TG_HANDLE_RE.test(trimmed)) {
    return { contactType: "telegram" };
  }

  return null;
}

const BADGES: Record<ContactType, { icon: string; label: string }> = {
  email: { icon: "📧", label: "Email" },
  phone: { icon: "📱", label: "Телефон" },
  telegram: { icon: "✈️", label: "Telegram" },
  max: { icon: "💬", label: "MAX" },
};

export function badgeFor(contactType: ContactType): { icon: string; label: string } {
  return BADGES[contactType];
}
