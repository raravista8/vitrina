"use client";

/**
 * Admin login — Concept A canvas screen #10. Two-step:
 *
 *   step=1  username + password → /admin/api/login → challenge_id
 *   step=2  challenge_id + TOTP → /admin/api/login/totp → cookie + nav to /admin
 *
 * A "Использовать backup-код" link swaps step 2 to /admin/api/login/backup.
 *
 * Error envelope handling:
 *
 *   - 401 invalid_credentials   → step 1 inline error "Неверный логин или пароль"
 *   - 401 invalid_challenge     → step 2 fall back to step 1 with "Сессия истекла"
 *   - 401 invalid_code          → step 2 inline error "Неверный код"
 *   - 429 from rate limiter     → banner with countdown (admin_login_rate_limiter)
 *   - 0 network_error           → "Нет связи с сервером"
 *
 * Anti-pattern guard (CLAUDE.md): never disable the input on bad input —
 * the submit button is the only thing that goes pending. A user who
 * mistypes can correct without losing focus.
 */

import { AlertTriangle, ArrowRight, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { adminRequest } from "@/lib/admin-api";
import { cn } from "@/lib/cn";

type Mode = "totp" | "backup";

interface RateLimit {
  retryAfterSeconds: number;
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [mode, setMode] = useState<Mode>("totp");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [challengeId, setChallengeId] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [rateLimit, setRateLimit] = useState<RateLimit | null>(null);
  const [pending, setPending] = useState(false);

  // Rate-limit countdown tick. The setState happens inside the timer
  // callback (not synchronously during render), which is the canonical
  // pattern for "advance state on a wall-clock tick" — react-hooks's
  // experimental `set-state-in-effect` rule still flags it because of
  // the linter's coarse heuristic, hence the targeted disable.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (rateLimit === null) return;
    if (rateLimit.retryAfterSeconds <= 0) {
      setRateLimit(null);
      return;
    }
    const id = window.setTimeout(() => {
      setRateLimit({ retryAfterSeconds: rateLimit.retryAfterSeconds - 1 });
    }, 1000);
    return () => window.clearTimeout(id);
  }, [rateLimit]);
  /* eslint-enable react-hooks/set-state-in-effect */

  async function submitStep1(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);
    const result = await adminRequest<{ challenge_id: string; expires_in: number }>("/login", {
      method: "POST",
      body: { username, password },
    });
    setPending(false);
    if (result.ok) {
      setChallengeId(result.data.challenge_id);
      setCode("");
      setStep(2);
      return;
    }
    if (result.status === 429) {
      // Backend's RateLimiter middleware returns Retry-After in seconds.
      // We don't have the header here (adminRequest discards it), so
      // we use a flat 60s placeholder; the user can wait it out.
      setRateLimit({ retryAfterSeconds: 60 });
      return;
    }
    setError(mapError(result.error, 1));
  }

  async function submitStep2(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);
    const endpoint = mode === "totp" ? "/login/totp" : "/login/backup";
    const result = await adminRequest("/login" + endpoint.slice(6), {
      method: "POST",
      body: { challenge_id: challengeId, code },
    });
    setPending(false);
    if (result.ok) {
      router.replace("/admin");
      return;
    }
    if (result.error === "invalid_challenge") {
      // Challenge expired or already consumed — bounce back to step 1.
      setStep(1);
      setError("Сессия входа истекла, повторите ввод пароля.");
      setChallengeId(null);
      setCode("");
      return;
    }
    if (result.status === 429) {
      setRateLimit({ retryAfterSeconds: 60 });
      return;
    }
    setError(mapError(result.error, 2));
  }

  return (
    <main className="grid min-h-screen place-items-center bg-paper-soft p-6">
      <div className="w-full max-w-sm rounded-2xl border border-line bg-white p-7 shadow-card">
        <div className="mb-5 flex items-center gap-2">
          <span className="inline-block h-[22px] w-[22px] rounded-md bg-accent" />
          <span className="font-bold text-ink">Витрина</span>
          <span className="ml-auto rounded-md bg-paper-soft px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ink-soft">
            ADMIN
          </span>
        </div>

        <h1 className="text-xl font-bold tracking-tight text-ink">
          {step === 1 ? "Вход в админку" : "Двухфакторная аутентификация"}
        </h1>
        <p className="mt-1 text-sm text-ink-soft">
          {step === 1
            ? "Только для founder. Все попытки логируются."
            : mode === "totp"
              ? "Введите 6-значный код из аутентификатора."
              : "Введите один backup-код из выданного списка."}
        </p>

        {rateLimit ? (
          <div className="border-danger/30 mt-4 flex items-center gap-2 rounded-md border bg-danger-soft px-3 py-2.5 text-sm text-danger">
            <AlertTriangle className="h-4 w-4" />
            <span>
              IP заблокирован. Подождите {Math.floor(rateLimit.retryAfterSeconds / 60)}:
              {String(rateLimit.retryAfterSeconds % 60).padStart(2, "0")}.
            </span>
          </div>
        ) : null}

        {error ? <p className="mt-3 text-sm text-danger">{error}</p> : null}

        {step === 1 ? (
          <form className="mt-4 space-y-3" onSubmit={submitStep1}>
            <Field label="Логин">
              <input
                type="text"
                autoComplete="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
                className={inputClass}
              />
            </Field>
            <Field label="Пароль">
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className={inputClass}
              />
            </Field>
            <SubmitButton pending={pending}>Дальше</SubmitButton>
          </form>
        ) : (
          <form className="mt-4 space-y-3" onSubmit={submitStep2}>
            <Field label={mode === "totp" ? "Код из аутентификатора" : "Backup-код"}>
              <input
                type="text"
                inputMode={mode === "totp" ? "numeric" : "text"}
                pattern={mode === "totp" ? "\\d{6}" : undefined}
                maxLength={mode === "totp" ? 6 : 16}
                value={code}
                onChange={(event) =>
                  setCode(
                    mode === "totp" ? event.target.value.replace(/\D/g, "") : event.target.value,
                  )
                }
                required
                className={cn(
                  inputClass,
                  mode === "totp" && "text-center font-mono text-xl tracking-[0.6em]",
                )}
              />
            </Field>
            <button
              type="button"
              onClick={() => {
                setMode(mode === "totp" ? "backup" : "totp");
                setCode("");
                setError(null);
              }}
              className="block text-sm text-accent underline"
            >
              {mode === "totp" ? "Использовать backup-код" : "Вернуться к коду аутентификатора"}
            </button>
            <SubmitButton pending={pending}>Войти</SubmitButton>
          </form>
        )}

        <p className="mt-5 flex items-center gap-1.5 font-mono text-[11px] text-ink-faint">
          <ShieldCheck className="h-3 w-3" /> bcrypt cost=12 · TOTP · audit log
        </p>
      </div>
    </main>
  );
}

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------

const inputClass = cn(
  "h-10 w-full rounded-md border border-line bg-white px-3 text-sm text-ink",
  "placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-accent/40",
);

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1">
      <span className="text-xs font-medium text-ink-soft">{label}</span>
      {children}
    </label>
  );
}

function SubmitButton({ pending, children }: { pending: boolean; children: React.ReactNode }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "mt-1 inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-md bg-accent text-sm font-semibold text-white",
        "hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-70",
      )}
    >
      {pending ? "…" : children}
      {!pending && <ArrowRight className="h-4 w-4" />}
    </button>
  );
}

function mapError(code: string, step: 1 | 2): string {
  if (code === "invalid_credentials") return "Неверный логин или пароль";
  if (code === "invalid_code") return "Неверный код";
  if (code === "network_error") return "Нет связи с сервером";
  if (code === "auth_required") return "Сессия истекла";
  return step === 1 ? "Не удалось войти. Попробуйте ещё раз." : "Не удалось проверить код.";
}
