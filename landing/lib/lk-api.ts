/**
 * Client ЛК API (PR-LK6 — the `/lk` cabinet).
 *
 * Thin same-origin wrapper around `/api/lk/*` + `/api/auth/login` (Next dev
 * rewrites; Caddy in prod). Mirrors the backend envelope:
 *   { ok: true, data: T }  |  { ok: false, error, request_id? }
 *
 * Always resolves (never throws on 4xx) — callers branch on `ok` and the
 * error code (`auth_required`, `validation`, `invalid_current_password`, …).
 * A 401 from the customer-session gate maps to `auth_required` so the shell
 * can bounce to /login.
 */

export type LkEnvelope<T> =
  | { ok: true; data: T; status: number }
  | { ok: false; error: string; status: number; fields?: string[] };

type Method = "GET" | "POST" | "PUT" | "DELETE";

interface ReqOpts {
  method?: Method;
  body?: unknown;
}

async function request<T>(path: string, opts: ReqOpts = {}): Promise<LkEnvelope<T>> {
  let res: Response;
  try {
    res = await fetch(path, {
      method: opts.method ?? "GET",
      headers: opts.body !== undefined ? { "Content-Type": "application/json" } : undefined,
      body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
      credentials: "same-origin",
      redirect: "manual",
    });
  } catch {
    return { ok: false, error: "network_error", status: 0 };
  }
  if (res.type === "opaqueredirect") {
    return { ok: false, error: "auth_required", status: 0 };
  }
  let body: unknown;
  try {
    body = await res.json();
  } catch {
    return { ok: false, error: "invalid_response", status: res.status };
  }
  const b = body as Record<string, unknown>;
  if (res.ok && b?.["ok"] === true) {
    return { ok: true, data: b["data"] as T, status: res.status };
  }
  if (res.status === 401 || res.status === 403) {
    return { ok: false, error: "auth_required", status: res.status };
  }
  return {
    ok: false,
    error: (b?.["error"] as string) ?? "unknown_error",
    status: res.status,
    fields: b?.["fields"] as string[] | undefined,
  };
}

// ── types ─────────────────────────────────────────────────────────────────

export type LeadStatus = "new" | "in_progress" | "done" | "declined";

export interface LeadRow {
  id: string;
  name: string | null;
  phone: string | null;
  object_type: string | null;
  service: string | null;
  address: string | null;
  call_time: string | null;
  comment: string | null;
  note: string | null;
  status: LeadStatus;
  created_at: string;
  photo_count: number;
}

export interface LeadsData {
  items: LeadRow[];
  total: number;
  new_count: number;
  status_counts: Record<LeadStatus, number>;
}

export interface LeadDetail extends LeadRow {
  photos: string[];
}

export interface SiteData {
  site_id: string;
  name: string;
  subdomain: string;
  domain: string;
  status: string;
  published_at: string | null;
  lead_schema: Array<{ key: string; label: string; type: string; pii: boolean }>;
}

export interface Contacts {
  person: string;
  phone: string;
  email: string;
  telegram: string;
  zone: string;
}

export interface SettingsData {
  site: { name: string; domain: string; status: string; published_at: string | null };
  contacts: Contacts;
  notifications: { tg: boolean; email: boolean };
}

export interface BillingData {
  free: boolean;
  planName: string;
  price: string;
  period: string;
  status: string;
  nextDate: string | null;
  nextAmount: string | null;
  method: string | null;
  history: Array<{ date: string; amount: string; status: string }>;
}

export interface ChangeRequest {
  id: string;
  text: string;
  status: "new" | "in_progress" | "done";
  created_at: string;
}

export type KeywordGroups = { main: string[]; h2: string[]; text: string[]; blog: string[] };
export interface KeywordsData {
  groups: KeywordGroups;
  updated_at: string | null;
  source_rev: string | null;
}

// ── endpoints ───────────────────────────────────────────────────────────────

export const lkApi = {
  login: (login: string, password: string) =>
    request<{ ok: boolean }>("/api/auth/login", { method: "POST", body: { login, password } }),

  site: () => request<SiteData>("/api/lk/site"),

  leads: (q: { status?: string; q?: string } = {}) => {
    const params = new URLSearchParams();
    if (q.status && q.status !== "all") params.set("status", q.status);
    if (q.q) params.set("q", q.q);
    const qs = params.toString();
    return request<LeadsData>(`/api/lk/leads${qs ? `?${qs}` : ""}`);
  },
  lead: (id: string) => request<LeadDetail>(`/api/lk/leads/${id}`),
  setStatus: (id: string, status: LeadStatus) =>
    request<{ id: string; status: LeadStatus }>(`/api/lk/leads/${id}/status`, {
      method: "POST",
      body: { status },
    }),
  setNote: (id: string, note: string) =>
    request<{ id: string }>(`/api/lk/leads/${id}/note`, { method: "POST", body: { note } }),

  changeRequests: () => request<{ items: ChangeRequest[] }>("/api/lk/change-requests"),
  createChangeRequest: (text: string) =>
    request<{ id: string; status: string }>("/api/lk/change-requests", {
      method: "POST",
      body: { text },
    }),

  settings: () => request<SettingsData>("/api/lk/settings"),
  saveContacts: (contacts: Contacts) =>
    request<{ contacts: Contacts }>("/api/lk/settings/contacts", {
      method: "POST",
      body: contacts,
    }),
  saveNotifications: (n: { tg: boolean; email: boolean }) =>
    request<{ notifications: { tg: boolean; email: boolean } }>("/api/lk/settings/notifications", {
      method: "POST",
      body: n,
    }),
  changePassword: (current: string, next: string) =>
    request<{ ok: boolean }>("/api/lk/password", { method: "POST", body: { current, next } }),

  billing: () => request<BillingData>("/api/lk/billing"),

  keywords: () => request<KeywordsData>("/api/lk/keywords"),
  saveKeywords: (groups: KeywordGroups) =>
    request<KeywordsData>("/api/lk/keywords", { method: "PUT", body: { groups } }),
  minusWords: () => request<{ words: string[]; generated_at: string }>("/api/lk/keywords/minus"),

  deleteSite: (confirm: string) =>
    request<{ status: string; purge_after: string }>("/api/lk/site", {
      method: "DELETE",
      body: { confirm },
    }),
  /** Archive download is a binary stream — open it directly, not via fetch. */
  archiveUrl: "/api/lk/site/archive",
};

export const LEAD_STATUS_META: Record<LeadStatus, { label: string; dot: string; pill: string }> = {
  new: { label: "Новая", dot: "bg-accent", pill: "bg-accent-soft text-accent-ink" },
  in_progress: { label: "В работе", dot: "bg-warn", pill: "bg-warn-soft text-ink" },
  done: { label: "Выполнена", dot: "bg-success", pill: "bg-success-soft text-ink" },
  declined: { label: "Отказ", dot: "bg-ink-muted", pill: "bg-paper-soft text-ink-soft" },
};

export const LEAD_STATUS_ORDER: LeadStatus[] = ["new", "in_progress", "done", "declined"];
