"use client";

/**
 * `/login` — customer master login (canon 0.4.0 `<CustomerLogin>` drop-in).
 *
 * Thin wrapper: canon owns the UI, we own the network wiring + state.
 *
 * Provisioning (fake-door, per `docs/runbooks/create-customer-subdomain.md`):
 *   1. Founder publishes a site for a master
 *   2. Founder generates {login, password} (login = subdomain, password =
 *      openssl rand -base64 12), sends to master via TG/email/SMS
 *   3. Master visits /login, types login + password, lands on /lk
 *      (the live client cabinet — PR-LK6)
 *
 * Backend contract per docs/handoff/CANON_CODE_TZ_customer_login_v0.4.0.md §2.2:
 *   POST /api/auth/login {login, password}
 *     → 200 + Set-Cookie session → push('/lk')
 *     → 401 → error='invalid_credentials'
 *     → 429 + Retry-After header → error='rate_limited' + countdown
 *     → 5xx → error='unknown_error'
 *     → network/timeout → error='network_error'
 */

import { CustomerLogin } from "@samosite/canon/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Canon ships `auth/index.tsx` with DTS disabled (admin-demo loose typing
// kills the bundler — see `packages/canon/tsup.config.ts` carry-forward
// comment). The ambient shim in `types/samosite-canon.d.ts` declares the
// module as `any`, so `CustomerLoginErrorCode` from canon resolves to any
// — re-declare locally to keep the parent state typed.
// Source: `packages/canon/src/auth/index.tsx::CustomerLoginErrorCode`.
type CustomerLoginErrorCode =
  | "invalid_credentials"
  | "rate_limited"
  | "network_error"
  | "unknown_error";

export default function LoginPage() {
  const router = useRouter();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<CustomerLoginErrorCode | null>(null);
  const [retryAfter, setRetryAfter] = useState<number | null>(null);

  async function handleSubmit() {
    if (loading) return;
    setLoading(true);
    setError(null);
    setRetryAfter(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
        // Send cookies (Set-Cookie response is what we want preserved
        // for the subsequent /lk nav).
        credentials: "include",
      });
      if (res.ok) {
        router.push("/lk");
        return;
      }
      if (res.status === 401) {
        setError("invalid_credentials");
      } else if (res.status === 429) {
        const retryHeader = res.headers.get("Retry-After");
        // Retry-After can be either delta-seconds OR an HTTP-date; we send
        // delta-seconds per FastAPI convention.
        const parsed = retryHeader ? parseInt(retryHeader, 10) : NaN;
        setRetryAfter(Number.isFinite(parsed) && parsed > 0 ? parsed : 263);
        setError("rate_limited");
      } else if (res.status >= 500) {
        setError("unknown_error");
      } else {
        // Pydantic 422 / unexpected 4xx — also map to invalid_credentials
        // so the user sees something actionable.
        setError("invalid_credentials");
      }
    } catch {
      setError("network_error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <CustomerLogin
      login={login}
      password={password}
      loading={loading}
      error={error}
      retryAfterSeconds={retryAfter}
      onLoginChange={setLogin}
      onPasswordChange={setPassword}
      onSubmit={handleSubmit}
      // Bridge to intake — sends the master back to landing where they can
      // start a new application via the Hero CTA or SubmitModal.
      onCreateSiteClick={() => router.push("/")}
    />
  );
}
