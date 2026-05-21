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

// ----------------------------------------------------------------------------
// Channel-specific validation (v2 explicit-radio era, per ADR-0008 v2)
// ----------------------------------------------------------------------------

/**
 * Validate that `raw` matches the shape of the user-picked `channel`.
 *
 * v1 had auto-detect deciding both type AND value; v2 has the user
 * pick the channel via radio, and this function only checks consistency.
 *
 *   - email:    must contain `@` and pass RFC-light email regex
 *   - phone:    must pass `PHONE_SHAPE_RE` + digit count 10-15
 *   - telegram: must pass `TG_HANDLE_RE` (bare or `@`-prefixed) OR
 *               TG URL
 *   - max:      must pass MAX URL/deep-link OR bare handle
 *
 * Returns `true` if `raw` is plausibly for `channel`, `false` otherwise.
 * Server re-validates more strictly with `phonenumbers` etc.
 */
export function validateContactForChannel(channel: ContactType, raw: string): boolean {
  const trimmed = raw.trim();
  if (trimmed.length === 0) return false;

  switch (channel) {
    case "email":
      return EMAIL_RE.test(trimmed);
    case "phone": {
      if (!PHONE_SHAPE_RE.test(trimmed)) return false;
      const digitCount = (trimmed.match(/\d/g) ?? []).length;
      return digitCount >= PHONE_MIN_DIGITS && digitCount <= PHONE_MAX_DIGITS;
    }
    case "telegram":
      return TG_HANDLE_RE.test(trimmed) || TG_URL_RE.test(trimmed);
    case "max": {
      if (MAX_URL_RE.test(trimmed)) return true;
      // bare MAX handle (3-32 alnum) — мягче чем для TG (min 5 для TG)
      return /^@?[a-z0-9_]{3,32}$/i.test(trimmed);
    }
  }
}

// ----------------------------------------------------------------------------
// Phone progressive formatter
// ----------------------------------------------------------------------------

/**
 * Visually format an in-progress RU phone number as the user types.
 *
 * The server normalises to E.164 (`+7XXXXXXXXXX`) via `phonenumbers`, so
 * we don't need full validation here — we just paint pretty separators
 * so users can read what they've typed. Triggered ONLY when the input
 * already looks phone-shaped (digits/+/spaces/parens/dashes); other
 * shapes (email, @handle, max URL) are left alone.
 *
 * Output examples (10 → 11-digit RU mobile cases users actually paste):
 *
 *   raw                       → output
 *   "9167388689"             → "+7 (916) 738-86-89"
 *   "89167388689"            → "+7 (916) 738-86-89"
 *   "+79167388689"           → "+7 (916) 738-86-89"
 *   "8 916 738 86 89"        → "+7 (916) 738-86-89"
 *
 * Partial inputs format as far as they can — e.g. "+7 91" → "+7 (91".
 * Non-phone-shaped inputs return `null` (caller leaves the input
 * untouched so emails / handles don't get mangled mid-typing).
 */
export function formatPhoneProgressive(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  // Bail early on shapes that are clearly NOT phones — avoids
  // formatting `+a@b.c` into `+a@…` or similar.
  if (trimmed.includes("@")) return null;
  if (/^max:\/\//i.test(trimmed)) return null;
  if (!/^[+0-9\s()\-]+$/.test(trimmed)) return null;

  const digits = trimmed.replace(/\D/g, "");
  if (digits.length === 0) return null;

  // Normalise to "national 10-digit" form: strip a leading 7/8 country
  // code so the layout logic below has a single shape to work with.
  let core = digits;
  if (core.length === 11 && (core.startsWith("7") || core.startsWith("8"))) {
    core = core.slice(1);
  } else if (core.length > 10 && core.startsWith("7")) {
    core = core.slice(1);
  }

  // Pieces: AAA, BBB, CC, DD — emit only what we have.
  const aaa = core.slice(0, 3);
  const bbb = core.slice(3, 6);
  const cc = core.slice(6, 8);
  const dd = core.slice(8, 10);

  let out = "+7";
  if (aaa) out += ` (${aaa}`;
  if (aaa.length === 3) out += ")";
  if (bbb) out += ` ${bbb}`;
  if (cc) out += `-${cc}`;
  if (dd) out += `-${dd}`;
  return out;
}
