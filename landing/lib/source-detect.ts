/**
 * Client-side source-URL classifier for the Hero input.
 *
 * Mirrors PRD §4 / ADR-0009. Returns one of four kinds:
 *
 *   - "mvp":          recognised as a source we can parse today (Telegram /
 *                     Yandex.Maps). Hero shows ✓ badge, CTA enabled.
 *   - "waitlist":     known source we don't parse yet (Instagram, VK, 2GIS,
 *                     Avito, Ozon, Wildberries, WhatsApp, YouTube, Дзен).
 *                     Hero shows inline waitlist capture + parallel CTA
 *                     to the photo-upload flow (T3.3).
 *   - "unknown_url":  any other http(s) URL. Hero shows an open input
 *                     asking "what kind of source is this?".
 *   - "not_url":      anything else — Hero shows guidance to enter a
 *                     supported source or upload photos.
 *
 * No I/O — this fires on every keystroke after a short debounce.
 */

export type WaitlistSource =
  | "instagram"
  | "vkontakte"
  | "twogis"
  | "avito"
  | "ozon"
  | "wildberries"
  | "whatsapp"
  | "youtube"
  | "dzen"
  | "max";

export type MvpSourceType = "ymaps" | "telegram";

export type SourceDetection =
  | { kind: "mvp"; type: MvpSourceType; canonical: string }
  | { kind: "waitlist"; source: WaitlistSource; canonical: string }
  | { kind: "unknown_url"; url: string }
  | { kind: "not_url" };

// -----------------------------------------------------------------------------
// Regexes — keep aligned with backend/app/core/contact/auto_detect.py where the
// shapes overlap, and with PRD §4 table.
// -----------------------------------------------------------------------------

const YMAPS_RE = /^https?:\/\/(?:[a-z]+\.)?yandex\.[a-z]+\/maps\/[^\s]*/i;
const TG_URL_RE = /^https?:\/\/(?:www\.)?(?:t|telegram)\.me\/[a-z][a-z0-9_]{4,31}\/?(?:\?.*)?$/i;
const TG_HANDLE_RE = /^@[a-z][a-z0-9_]{4,31}$/i;

const WAITLIST_PATTERNS: ReadonlyArray<readonly [RegExp, WaitlistSource]> = [
  [/^https?:\/\/(?:www\.)?instagram\.com\//i, "instagram"],
  [/^https?:\/\/instagr\.am\//i, "instagram"],
  [/^https?:\/\/(?:www\.)?vk\.com\//i, "vkontakte"],
  [/^https?:\/\/(?:www\.)?vkontakte\.ru\//i, "vkontakte"],
  [/^https?:\/\/(?:www\.)?2gis\.[a-z]+\//i, "twogis"],
  [/^https?:\/\/(?:www\.)?avito\.ru\//i, "avito"],
  [/^https?:\/\/(?:www\.)?ozon\.ru\//i, "ozon"],
  [/^https?:\/\/(?:www\.)?(?:wildberries\.ru|wb\.ru)\//i, "wildberries"],
  [/^https?:\/\/wa\.me\//i, "whatsapp"],
  [/^https?:\/\/(?:www\.)?youtube\.com\//i, "youtube"],
  [/^https?:\/\/youtu\.be\//i, "youtube"],
  [/^https?:\/\/(?:www\.)?dzen\.ru\//i, "dzen"],
  [/^https?:\/\/(?:www\.)?max\.ru\//i, "max"],
];

const ANY_HTTP_URL_RE = /^https?:\/\/.+/i;

// -----------------------------------------------------------------------------
// Public API
// -----------------------------------------------------------------------------

export function detectSource(raw: string): SourceDetection {
  const trimmed = raw.trim();
  if (trimmed.length === 0) {
    return { kind: "not_url" };
  }

  // 1. Bare Telegram handle (no scheme) — short-circuits before url checks.
  if (TG_HANDLE_RE.test(trimmed)) {
    return {
      kind: "mvp",
      type: "telegram",
      canonical: trimmed.toLowerCase(),
    };
  }

  // 2. Yandex.Maps URL.
  if (YMAPS_RE.test(trimmed)) {
    return { kind: "mvp", type: "ymaps", canonical: trimmed };
  }

  // 3. Telegram URL.
  if (TG_URL_RE.test(trimmed)) {
    return { kind: "mvp", type: "telegram", canonical: trimmed };
  }

  // 4. Known waitlist sources.
  for (const [re, source] of WAITLIST_PATTERNS) {
    if (re.test(trimmed)) {
      return { kind: "waitlist", source, canonical: trimmed };
    }
  }

  // 5. Any other http(s) URL — open question to the user.
  if (ANY_HTTP_URL_RE.test(trimmed)) {
    return { kind: "unknown_url", url: trimmed };
  }

  return { kind: "not_url" };
}

/**
 * Human-readable Russian label for a waitlist source.
 */
export function waitlistSourceLabel(source: WaitlistSource): string {
  switch (source) {
    case "instagram":
      return "Instagram";
    case "vkontakte":
      return "ВКонтакте";
    case "twogis":
      return "2GIS";
    case "avito":
      return "Avito";
    case "ozon":
      return "Ozon";
    case "wildberries":
      return "Wildberries";
    case "whatsapp":
      return "WhatsApp";
    case "youtube":
      return "YouTube";
    case "dzen":
      return "Дзен";
    case "max":
      return "MAX";
  }
}
