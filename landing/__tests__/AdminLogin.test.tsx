import "@testing-library/jest-dom/vitest";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import AdminLoginPage from "@/app/admin/login/page";

// The page uses `useRouter` from `next/navigation`. Mock just enough
// of it for the success path to call `.replace("/admin")`.
const replaceMock = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: replaceMock, push: replaceMock }),
  usePathname: () => "/admin/login",
}));

interface MockResponseInit {
  status: number;
  body: unknown;
}

function mockFetchSequence(responses: MockResponseInit[]) {
  let i = 0;
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => {
      const r = responses[i] ?? responses[responses.length - 1]!;
      i += 1;
      return new Response(JSON.stringify(r.body), {
        status: r.status,
        headers: { "content-type": "application/json" },
      });
    }) as unknown as typeof fetch,
  );
}

/**
 * Tests target canon's `AdminLogin` (0.2.0-alpha.1) which uses:
 *   - step 1: aria-label="Email" + aria-label="Пароль" + button "Дальше"
 *   - step 2: aria-label="TOTP код" / "Backup-код" + button "Войти"
 *   - mode toggle: `role="tab"` with name "Аутентификатор" / "Backup-код"
 *
 * If a future canon refresh changes these labels, rebaseline this file
 * against the new render — the labels live in
 * `packages/canon/src/admin-core/index.tsx::S10_AdminLogin`.
 */
describe("AdminLoginPage", () => {
  beforeEach(() => {
    replaceMock.mockReset();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("walks the 2-step happy path and navigates to /admin", async () => {
    mockFetchSequence([
      { status: 200, body: { ok: true, data: { challenge_id: "c".repeat(40), expires_in: 300 } } },
      { status: 200, body: { ok: true, data: { backup_codes_remaining: 3 } } },
    ]);

    render(<AdminLoginPage />);
    // Step 1
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "founder" } });
    fireEvent.change(screen.getByLabelText("Пароль"), { target: { value: "secret123" } });
    fireEvent.click(screen.getByRole("button", { name: /Дальше/ }));

    await screen.findByText(/Двухфакторная аутентификация/);
    fireEvent.change(screen.getByLabelText(/TOTP код/), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Войти/ }));

    await waitFor(() => expect(replaceMock).toHaveBeenCalledWith("/admin"));
  });

  it("renders an inline error on wrong password", async () => {
    mockFetchSequence([
      { status: 401, body: { ok: false, error: "invalid_credentials", request_id: "abc" } },
    ]);

    render(<AdminLoginPage />);
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "founder" } });
    fireEvent.change(screen.getByLabelText("Пароль"), { target: { value: "x" } });
    fireEvent.click(screen.getByRole("button", { name: /Дальше/ }));

    await screen.findByText(/Неверный логин или пароль/);
    expect(replaceMock).not.toHaveBeenCalled();
  });

  it("falls back to step 1 on expired challenge", async () => {
    mockFetchSequence([
      { status: 200, body: { ok: true, data: { challenge_id: "c".repeat(40), expires_in: 1 } } },
      { status: 401, body: { ok: false, error: "invalid_challenge" } },
    ]);

    render(<AdminLoginPage />);
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "founder" } });
    fireEvent.change(screen.getByLabelText("Пароль"), { target: { value: "ok" } });
    fireEvent.click(screen.getByRole("button", { name: /Дальше/ }));
    await screen.findByText(/Двухфакторная аутентификация/);
    fireEvent.change(screen.getByLabelText(/TOTP код/), {
      target: { value: "999999" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Войти/ }));

    // Returns to step 1 with an explanatory error.
    // Canon's `LOGIN_ERROR_MSG.invalid_challenge` = "Сессия истекла. Начните заново."
    await screen.findByText(/Сессия истекла/);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("swaps to backup-code mode when the link is clicked", async () => {
    mockFetchSequence([
      { status: 200, body: { ok: true, data: { challenge_id: "c".repeat(40), expires_in: 300 } } },
    ]);

    render(<AdminLoginPage />);
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "founder" } });
    fireEvent.change(screen.getByLabelText("Пароль"), { target: { value: "ok" } });
    fireEvent.click(screen.getByRole("button", { name: /Дальше/ }));
    await screen.findByText(/Двухфакторная аутентификация/);

    // Canon renders the mode toggle as a tablist with two tabs.
    fireEvent.click(screen.getByRole("tab", { name: /Backup-код/ }));
    expect(screen.getByLabelText(/Backup-код/)).toBeInTheDocument();
  });
});
