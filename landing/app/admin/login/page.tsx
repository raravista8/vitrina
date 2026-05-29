"use client";

/**
 * Admin login (canon `AdminLogin` drop-in, canon 0.2.0-alpha.1).
 *
 * Replaces the previous hand-rolled Tailwind form with the controlled
 * canon component from `@samosite/canon/admin-core`. Visual is the
 * canon's verbatim render (terracotta card, sans Onest, mono input) —
 * drift = 0 from the design canvas.
 *
 * Behaviour stays consumer-side: we own the fetch calls to
 * `/admin/api/login` / `/login/totp` / `/login/backup` (FastAPI in
 * `backend/app/admin/routers/api.py`), keep the challenge_id between
 * step 1 → step 2, and route to `/admin` on success.
 *
 * The canon's `error` prop is a string enum; we map our
 * `adminRequest()` envelope's error codes onto it.
 *
 * Rate-limit handling (CLAUDE.md SECURITY §T7.1): the FastAPI middleware
 * returns `429 Retry-After: <seconds>`. The `adminRequest` helper
 * discards headers, so we fall back to a flat 60s lockout — same as
 * the previous hand-rolled flow. When canon's countdown reaches 0,
 * the parent unsets `rateLimited` and the form re-enables.
 *
 * Source: `packages/canon/src/admin-core/index.tsx::S10_AdminLogin`.
 * Spec: `docs/handoff/specs/05 §1` + `docs/handoff/CANON_ADMIN_INTERACTIVE_TZ.md §3.1`.
 */

import { AdminLogin } from "@samosite/canon/admin-core";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { adminRequest } from "@/lib/admin-api";

type Mode = "totp" | "backup";
type Step = 1 | 2;
type CanonError =
  | null
  | "invalid_credentials"
  | "invalid_challenge"
  | "invalid_code"
  | "rate_limited"
  | "network_error"
  | "unknown_error";

/**
 * Map our backend envelope's `error` codes onto canon's enum. Canon
 * knows 6 codes (`invalid_credentials`, `invalid_challenge`,
 * `invalid_code`, `rate_limited`, `network_error`, `unknown_error`);
 * anything else falls back to `unknown_error`.
 */
function mapError(code: string): Exclude<CanonError, null> {
  switch (code) {
    case "invalid_credentials":
    case "invalid_challenge":
    case "invalid_code":
    case "rate_limited":
    case "network_error":
      return code;
    case "auth_required":
      return "invalid_challenge";
    default:
      return "unknown_error";
  }
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [mode, setMode] = useState<Mode>("totp");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [totp, setTotp] = useState("");
  const [backupCode, setBackupCode] = useState("");
  const [challengeId, setChallengeId] = useState<string | null>(null);
  const [error, setError] = useState<CanonError>(null);
  const [loading, setLoading] = useState(false);
  const [rateLimited, setRateLimited] = useState(false);
  const [rateLimitedRetryAfterSeconds, setRateLimitedRetryAfterSeconds] = useState<number | null>(
    null,
  );

  // Self-managed rate-limit countdown — canon's `<RateLimitCountdown>`
  // consumes `rateLimitedRetryAfterSeconds` but doesn't tick down. We
  // mirror the previous hand-rolled flow: decrement once per second,
  // clear on zero. The setState calls happen either inside the timer
  // callback or as terminal-state cleanup on hitting zero — both are
  // canonical "advance state on wall-clock tick" patterns; the lint
  // rule's coarse heuristic still flags them, so we targeted-disable.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!rateLimited || rateLimitedRetryAfterSeconds === null) return;
    if (rateLimitedRetryAfterSeconds <= 0) {
      setRateLimited(false);
      setRateLimitedRetryAfterSeconds(null);
      setError(null);
      return;
    }
    const id = window.setTimeout(() => {
      setRateLimitedRetryAfterSeconds((s) => (s === null ? null : s - 1));
    }, 1000);
    return () => window.clearTimeout(id);
  }, [rateLimited, rateLimitedRetryAfterSeconds]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Step 1 submit: POST /admin/api/login {username, password} →
  // challenge_id (5min TTL) for step 2, OR — when the backend has
  // ADMIN_2FA_REQUIRED=false — {authenticated:true} + session cookie set
  // (we go straight to /admin). 401 invalid_credentials / 429 rate-limit.
  const onSubmitCredentials = useCallback(
    async (u: string, p: string) => {
      if (loading) return;
      setError(null);
      setLoading(true);
      const result = await adminRequest<{
        challenge_id?: string;
        expires_in?: number;
        authenticated?: boolean;
      }>("/login", {
        method: "POST",
        body: { username: u, password: p },
      });
      setLoading(false);
      if (result.ok) {
        // ADMIN_2FA_REQUIRED=false → password alone authenticated; the
        // backend already set the admin_session cookie and returns no
        // challenge_id. Skip the TOTP step and go straight to /admin.
        if (result.data.authenticated || !result.data.challenge_id) {
          router.replace("/admin");
          return;
        }
        setChallengeId(result.data.challenge_id);
        setTotp("");
        setBackupCode("");
        setStep(2);
        return;
      }
      if (result.status === 429) {
        setRateLimited(true);
        setRateLimitedRetryAfterSeconds(60);
        setError("rate_limited");
        return;
      }
      setError(mapError(result.error));
    },
    [loading, router],
  );

  // Step 2 submit: POST /admin/api/login/{totp,backup} {challenge_id, code}
  // → set admin_session cookie + redirect to /admin.
  const onSubmitCode = useCallback(
    async (codeKind: Mode, codeValue: string) => {
      if (loading) return;
      setError(null);
      setLoading(true);
      const endpoint = codeKind === "totp" ? "/login/totp" : "/login/backup";
      const result = await adminRequest(endpoint, {
        method: "POST",
        body: { challenge_id: challengeId, code: codeValue },
      });
      setLoading(false);
      if (result.ok) {
        router.replace("/admin");
        return;
      }
      // Challenge expired or already consumed — bounce back to step 1.
      if (result.error === "invalid_challenge") {
        setStep(1);
        setError("invalid_challenge");
        setChallengeId(null);
        setTotp("");
        setBackupCode("");
        return;
      }
      if (result.status === 429) {
        setRateLimited(true);
        setRateLimitedRetryAfterSeconds(60);
        setError("rate_limited");
        return;
      }
      setError(mapError(result.error));
    },
    [loading, challengeId, router],
  );

  return (
    <AdminLogin
      step={step}
      onStepChange={(s: Step) => setStep(s)}
      mode={mode}
      onModeChange={(m: Mode) => {
        setMode(m);
        setTotp("");
        setBackupCode("");
        setError(null);
      }}
      username={username}
      onUsernameChange={setUsername}
      password={password}
      onPasswordChange={setPassword}
      totp={totp}
      onTotpChange={(value: string) =>
        // Strip non-digits for TOTP — matches hand-rolled UX and backend pattern \d{6}.
        setTotp(value.replace(/\D/g, "").slice(0, 6))
      }
      backupCode={backupCode}
      onBackupCodeChange={(value: string) => setBackupCode(value.slice(0, 16))}
      onSubmitCredentials={onSubmitCredentials}
      onSubmitCode={onSubmitCode}
      loading={loading}
      error={error}
      rateLimited={rateLimited}
      rateLimitedRetryAfterSeconds={rateLimitedRetryAfterSeconds}
    />
  );
}
