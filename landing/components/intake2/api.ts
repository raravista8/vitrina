/**
 * Интейк v2 — сборка multipart-запроса и отправка в
 * POST /api/submit-application/v2 (бэкенд live, контракт §backend v2).
 *
 * Маппинг payload по путям:
 *   common     — source_path, contact_channel, contact, consent_given,
 *                captcha_token, niche, booking_platform
 *   name       — business_name (обязателен), city
 *   link       — source_url (нормализованный: без протокола → https://)
 *   screenshot — files: ровно 1 изображение ≤ 8 МБ
 *   photo      — files: 1..5 изображений
 *   booking    — dikidi|yclients → booking_url (если заполнен);
 *                phone → booking_phone (если заполнен); none → ничего
 */

import { CHANNEL_TO_API, normalizeUrl, type Intake2FormState } from "@/components/intake2/state";

export type SubmitIntake2Result =
  | { ok: true; applicationId: string | null }
  | { ok: false; code: string | null; status: number };

export function buildIntake2FormData(
  form: Intake2FormState,
  files: { screenshot: File | null; photos: File[] },
  captchaToken: string,
): FormData {
  const fd = new FormData();
  fd.append("source_path", form.path);
  fd.append("contact_channel", CHANNEL_TO_API[form.channel]);
  fd.append("contact", form.contacts[form.channel].trim());
  fd.append("consent_given", String(form.consent));
  fd.append("captcha_token", captchaToken);
  fd.append("niche", form.niche);

  if (form.path === "name") {
    fd.append("business_name", form.businessName.trim());
    if (form.city.trim()) fd.append("city", form.city.trim());
  } else if (form.path === "link") {
    fd.append("source_url", normalizeUrl(form.link));
  } else if (form.path === "screenshot" && files.screenshot) {
    fd.append("files", files.screenshot, files.screenshot.name);
  } else if (form.path === "photo") {
    for (const file of files.photos.slice(0, 5)) {
      fd.append("files", file, file.name);
    }
  }

  fd.append("booking_platform", form.bookingPlatform);
  if (
    (form.bookingPlatform === "dikidi" || form.bookingPlatform === "yclients") &&
    form.bookingUrl.trim()
  ) {
    fd.append("booking_url", normalizeUrl(form.bookingUrl));
  }
  if (form.bookingPlatform === "phone" && form.bookingPhone.trim()) {
    fd.append("booking_phone", form.bookingPhone.trim());
  }

  return fd;
}

export async function submitIntake2(
  form: Intake2FormState,
  files: { screenshot: File | null; photos: File[] },
  captchaToken: string,
): Promise<SubmitIntake2Result> {
  const body = buildIntake2FormData(form, files, captchaToken);
  let res: Response;
  try {
    res = await fetch("/api/submit-application/v2", { method: "POST", body });
  } catch {
    return { ok: false, code: null, status: 0 };
  }

  let json: unknown = null;
  try {
    json = await res.json();
  } catch {
    // non-JSON body (например, edge 502) — код останется null → generic-плашка
  }
  const data = (json ?? {}) as {
    ok?: boolean;
    data?: { application_id?: string };
    error?: string;
    detail?: string;
  };

  if (res.ok) {
    return { ok: true, applicationId: data.data?.application_id ?? null };
  }
  return {
    ok: false,
    code: data.error ?? data.detail ?? null,
    status: res.status,
  };
}
