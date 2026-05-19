import "@testing-library/jest-dom/vitest";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/dynamic", () => ({
  __esModule: true,
  default: () =>
    function StubChart() {
      return <div data-testid="chart-stub" />;
    },
}));

const replaceMock = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: replaceMock, refresh: vi.fn() }),
  usePathname: () => "/admin/leads",
  useParams: () => ({}),
}));

import AdminLeadsPage from "@/app/admin/leads/page";

const okMe = {
  ok: true,
  data: {
    admin_id: "11111111-1111-1111-1111-111111111111",
    session_id_prefix: "abc12345",
    created_at: new Date().toISOString(),
    last_seen_at: new Date().toISOString(),
  },
};

const okDashboardEmpty = {
  ok: true,
  data: {
    counters: {
      apps_total: 0,
      apps_pending: 0,
      sites_published: 0,
      leads_total: 0,
      feedback_total: 0,
    },
    applications_series_14d: [],
  },
};

const leadRow = (id: string) => ({
  id,
  site_id: "site-" + id,
  status: "new",
  ip_prefix: "85.140.0.0/16",
  created_at: new Date().toISOString(),
});

const okLeadsList = {
  ok: true,
  data: {
    items: [leadRow("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa")],
    total: 1,
    limit: 50,
    offset: 0,
  },
};

const okDecryptBulk = {
  ok: true,
  data: {
    leads: [
      {
        id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
        site_id: "site-aaaaaaaa",
        name: "Маша Петрова",
        phone: "+7 921 999-99-99",
        message: "Запишите",
        status: "new",
        created_at: new Date().toISOString(),
      },
    ],
    count: 1,
  },
};

/**
 * Route a fetch request by URL pattern. The chrome's /me + /dashboard
 * fire in parallel with the page's own /leads call, so a strict-order
 * mock would race; matching by path makes the test deterministic.
 */
function mockFetchByPath(
  routes: Record<
    string,
    { status: number; body: unknown } | ((url: string) => { status: number; body: unknown })
  >,
) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL) => {
      const url = typeof input === "string" ? input : input.toString();
      for (const [pattern, value] of Object.entries(routes)) {
        if (url.includes(pattern)) {
          const r = typeof value === "function" ? value(url) : value;
          return new Response(JSON.stringify(r.body), {
            status: r.status,
            headers: { "content-type": "application/json" },
          });
        }
      }
      throw new Error(`No mock for ${url}`);
    }) as unknown as typeof fetch,
  );
}

describe("AdminLeadsPage", () => {
  beforeEach(() => {
    replaceMock.mockReset();
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders the masked list and reveals plaintext after TOTP decrypt", async () => {
    mockFetchByPath({
      "/admin/api/me": { status: 200, body: okMe },
      "/admin/api/dashboard": { status: 200, body: okDashboardEmpty },
      "/admin/api/leads/decrypt-bulk": { status: 200, body: okDecryptBulk },
      "/admin/api/leads": { status: 200, body: okLeadsList },
    });

    render(<AdminLeadsPage />);

    // Masked row visible — no plaintext name yet.
    await screen.findByText("aaaaaaaa");
    expect(screen.queryByText("Маша Петрова")).not.toBeInTheDocument();

    // Select the row, open the modal, type the code, submit.
    fireEvent.click(screen.getByLabelText(/Выбрать aaaaaaaa/));
    fireEvent.click(screen.getByRole("button", { name: /Раскрыть выбранные/ }));
    await screen.findByText(/Подтвердите TOTP/);

    fireEvent.change(screen.getByLabelText(/Код из аутентификатора/), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Расшифровать/ }));

    // Plaintext rendered (after pressing the eye-toggle to reveal).
    await screen.findByText(/Расшифровано 1 лид/);
    // The plaintext row defaults to masked — toggle to reveal.
    fireEvent.click(screen.getByLabelText("Показать значения"));
    expect(screen.getByText("Маша Петрова")).toBeInTheDocument();
    expect(screen.getByText("+7 921 999-99-99")).toBeInTheDocument();

    // Closing the modal drops plaintext from the DOM.
    fireEvent.click(screen.getByRole("button", { name: /Готово/ }));
    await waitFor(() => expect(screen.queryByText("Маша Петрова")).not.toBeInTheDocument());
  });

  it("renders an inline error when /leads/decrypt-bulk returns invalid_totp", async () => {
    mockFetchByPath({
      "/admin/api/me": { status: 200, body: okMe },
      "/admin/api/dashboard": { status: 200, body: okDashboardEmpty },
      "/admin/api/leads/decrypt-bulk": {
        status: 401,
        body: { ok: false, error: "invalid_totp" },
      },
      "/admin/api/leads": { status: 200, body: okLeadsList },
    });

    render(<AdminLeadsPage />);
    await screen.findByText("aaaaaaaa");
    fireEvent.click(screen.getByLabelText(/Выбрать aaaaaaaa/));
    fireEvent.click(screen.getByRole("button", { name: /Раскрыть выбранные/ }));
    await screen.findByText(/Подтвердите TOTP/);
    fireEvent.change(screen.getByLabelText(/Код из аутентификатора/), {
      target: { value: "000000" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Расшифровать/ }));
    await screen.findByText(/Неверный код TOTP/);
  });
});
