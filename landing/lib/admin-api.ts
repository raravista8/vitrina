/**
 * Admin API client (PR-F+).
 *
 * Thin wrapper around `/admin/api/*` (proxied to FastAPI in dev via
 * `next.config.mjs` rewrites, served same-origin by Caddy in prod).
 *
 * Convention mirrors the backend envelope (CLAUDE.md §Conventions):
 *
 *   { ok: true,  data: T }
 *   { ok: false, error: string, request_id?: string }
 *
 * `request()` always resolves with the parsed body. Use the returned
 * shape to branch on success vs error — never throw on a 4xx, because
 * the admin UI uses error codes for inline-rendered states (wrong
 * password, expired challenge, etc).
 *
 * A 303 redirect (the require_admin dep raises that on missing /
 * expired session) is translated to `{ok: false, error: "auth_required"}`
 * so the chrome can swap in /admin/login without a hard nav.
 */

export type AdminEnvelope<T> =
  | { ok: true; data: T; status: number }
  | { ok: false; error: string; request_id?: string; status: number };

export interface AdminMeData {
  admin_id: string;
  session_id_prefix: string;
  created_at: string;
  last_seen_at: string;
}

export interface DashboardData {
  counters: {
    apps_total: number;
    apps_pending: number;
    sites_published: number;
    leads_total: number;
    feedback_total: number;
  };
  applications_series_14d: Array<{ day: string; count: number }>;
}

export interface AppRow {
  id: string;
  // canon 0.3.0: mode discriminator + photo-branch summary fields.
  // intake v2 (июль 2026): mode='v2' + summary-поля source_path/niche/business_name.
  mode: "link" | "photo" | "v2";
  source_type: "ymaps" | "telegram" | "photo" | "website" | "twogis" | "avito" | "vk";
  source_url: string | null;
  city: string | null;
  description_preview: string | null;
  source_path: "name" | "screenshot" | "link" | "photo" | null;
  niche: string | null;
  business_name: string | null;
  contact_type: "email" | "phone" | "telegram" | "max" | "whatsapp";
  contact_value_masked: string;
  status: "pending" | "approved" | "rejected" | "fulfilled";
  rejection_reason: string | null;
  is_manual_review: boolean;
  user_id: string | null;
  created_at: string | null;
}

export interface ApplicationFileRef {
  id: string;
  index: number;
  filename: string;
  mime: string;
  size_bytes: number;
  download_url: string;
  /** Only present on photos. */
  photo_type?: string;
}

export interface AppDetail {
  application: AppRow;
  /** Intake-v2 extras (июль 2026) — null на link/photo. booking_phone
   *  расшифрован бэкендом inline (политика customer_contact_value). */
  v2_details: {
    source_path: "name" | "screenshot" | "link" | "photo" | null;
    niche: string | null;
    business_name: string | null;
    city: string | null;
    booking_platform: "dikidi" | "yclients" | "phone" | "none" | null;
    booking_url: string | null;
    booking_phone: string | null;
    photos: ApplicationFileRef[];
  } | null;
  /** Photo-mode extras — null on link mode. */
  photo_details: {
    description: string | null;
    city: string | null;
    customer_contact_type: "phone" | "telegram" | null;
    customer_contact_value: string | null;
    photos: ApplicationFileRef[];
    text_files: ApplicationFileRef[];
  } | null;
  user: {
    id: string;
    contact_type: string;
    contact_value_masked: string;
    plan: string;
    plan_until: string | null;
  } | null;
  consent: {
    id: string;
    policy_version: number;
    created_at: string | null;
  } | null;
}

export interface SiteRow {
  id: string;
  user_id: string;
  subdomain: string;
  custom_domain: string | null;
  source_type: string;
  source_url: string | null;
  status: string;
  last_synced_at: string | null;
  published_at: string | null;
  created_at: string | null;
}

export interface LeadRowMasked {
  id: string;
  site_id: string;
  status: string;
  ip_prefix: string | null;
  created_at: string | null;
}

export interface LeadDecrypted {
  id: string;
  site_id: string;
  name: string | null;
  phone: string | null;
  message: string | null;
  status: string;
  created_at: string;
}

export interface WaitlistRow {
  source_name: string;
  votes: number;
  first_seen: string | null;
  last_seen: string | null;
  ready: boolean;
}

export interface FeedbackRow {
  id: string;
  type: string;
  source_name: string | null;
  email_or_contact_masked: string | null;
  message: string | null;
  checkboxes: Record<string, unknown>;
  created_at: string | null;
}

export interface SettingsSnapshot {
  environment: string;
  log_level: string;
  app_base_url: string;
  landing_base_url: string;
  sites_base_domain: string;
  feature_max_bot: boolean;
  feature_auto_sync: boolean;
  captcha_configured: boolean;
  tg_bot_configured: boolean;
  yandexgpt_configured: boolean;
  yookassa_configured: boolean;
  s3_configured: boolean;
  fernet_keys_configured: boolean;
}

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  // For paginated GETs.
  query?: Record<string, string | number | undefined>;
}

export async function adminRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<AdminEnvelope<T>> {
  const method = options.method ?? "GET";
  const url = options.query ? `${path}?${buildQuery(options.query)}` : path;
  let response: Response;
  try {
    response = await fetch(`/admin/api${url}`, {
      method,
      headers: options.body ? { "Content-Type": "application/json" } : undefined,
      body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
      // Cookie travels same-origin (Next dev rewrites; Caddy in prod).
      credentials: "same-origin",
      // Don't follow 303 — the require_admin redirect target is the
      // login form, useless for JSON clients. Without manual redirect
      // handling Next.js would chase the redirect to /admin/login and
      // get the HTML page, breaking response.json().
      redirect: "manual",
    });
  } catch {
    return { ok: false, error: "network_error", status: 0 };
  }

  // `redirect: manual` produces an opaque "redirect" response with
  // status 0 on the client. Treat any non-2xx as auth-required so the
  // chrome can re-route to /admin/login.
  if (response.type === "opaqueredirect" || response.status === 303) {
    return { ok: false, error: "auth_required", status: 303 };
  }

  let body: unknown;
  try {
    body = await response.json();
  } catch {
    return { ok: false, error: "invalid_response", status: response.status };
  }

  if (response.ok && isOkEnvelope<T>(body)) {
    return { ok: true, data: body.data, status: response.status };
  }
  if (isErrEnvelope(body)) {
    return {
      ok: false,
      error: body.error ?? "unknown_error",
      request_id: body.request_id,
      status: response.status,
    };
  }
  return { ok: false, error: "unknown_error", status: response.status };
}

function buildQuery(params: Record<string, string | number | undefined>): string {
  const usp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== "") usp.set(k, String(v));
  }
  return usp.toString();
}

interface OkBody<T> {
  ok: true;
  data: T;
}

interface ErrBody {
  ok: false;
  error: string;
  request_id?: string;
}

function isOkEnvelope<T>(body: unknown): body is OkBody<T> {
  return (
    typeof body === "object" &&
    body !== null &&
    "ok" in body &&
    (body as { ok: unknown }).ok === true &&
    "data" in body
  );
}

function isErrEnvelope(body: unknown): body is ErrBody {
  return (
    typeof body === "object" &&
    body !== null &&
    "ok" in body &&
    (body as { ok: unknown }).ok === false
  );
}
