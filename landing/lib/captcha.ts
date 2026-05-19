/**
 * Yandex SmartCaptcha helper (invisible mode).
 *
 * Behaviour:
 *   - If `NEXT_PUBLIC_YANDEX_SMARTCAPTCHA_CLIENT_KEY` is set, load the
 *     official widget from `https://smartcaptcha.yandexcloud.net/captcha.js`
 *     and request a token via `window.smartCaptcha.execute()`.
 *   - Otherwise, return the literal `"DEV_TOKEN"`. The backend recognises
 *     this only when `ENVIRONMENT=development` — production REJECTS it
 *     hard, so a missing client key fails closed once we ship.
 *
 * Invisible mode means no UI is rendered — the widget runs the challenge
 * in the background when `.execute()` is called.
 */

declare global {
  interface Window {
    smartCaptcha?: {
      render: (
        container: HTMLElement,
        params: { sitekey: string; invisible?: boolean; hl?: string },
      ) => number;
      execute: (widgetId: number) => void;
      subscribe: (
        widgetId: number,
        event: "success" | "challenge-hidden" | "network-error" | "javascript-error",
        callback: (token?: string) => void,
      ) => void;
      destroy: (widgetId: number) => void;
    };
  }
}

const DEV_TOKEN = "DEV_TOKEN";
const CAPTCHA_SCRIPT_SRC = "https://smartcaptcha.yandexcloud.net/captcha.js";

let scriptLoadingPromise: Promise<void> | null = null;

function getClientKey(): string | undefined {
  // NEXT_PUBLIC_* env vars are inlined at build time; this is intentional.
  return process.env["NEXT_PUBLIC_YANDEX_SMARTCAPTCHA_CLIENT_KEY"];
}

export function isCaptchaConfigured(): boolean {
  const key = getClientKey();
  return Boolean(key && key.length > 0);
}

function loadCaptchaScript(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("captcha must run in the browser"));
  }
  if (window.smartCaptcha) return Promise.resolve();
  if (scriptLoadingPromise) return scriptLoadingPromise;

  scriptLoadingPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = CAPTCHA_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("failed to load SmartCaptcha"));
    document.head.appendChild(script);
  });
  return scriptLoadingPromise;
}

/**
 * Request a captcha token. Returns DEV_TOKEN when no client key is
 * configured — useful for local dev and unit tests.
 */
export async function requestCaptchaToken(): Promise<string> {
  if (!isCaptchaConfigured()) {
    return DEV_TOKEN;
  }

  await loadCaptchaScript();
  const sitekey = getClientKey();
  if (!sitekey) return DEV_TOKEN;

  return new Promise<string>((resolve, reject) => {
    const container = document.createElement("div");
    container.style.display = "none";
    document.body.appendChild(container);

    const widgetId = window.smartCaptcha!.render(container, {
      sitekey,
      invisible: true,
      hl: "ru",
    });

    const cleanup = () => {
      window.smartCaptcha?.destroy(widgetId);
      container.remove();
    };

    window.smartCaptcha!.subscribe(widgetId, "success", (token) => {
      cleanup();
      if (token) resolve(token);
      else reject(new Error("captcha returned empty token"));
    });
    window.smartCaptcha!.subscribe(widgetId, "javascript-error", () => {
      cleanup();
      reject(new Error("captcha javascript error"));
    });
    window.smartCaptcha!.subscribe(widgetId, "network-error", () => {
      cleanup();
      reject(new Error("captcha network error"));
    });

    window.smartCaptcha!.execute(widgetId);
  });
}
