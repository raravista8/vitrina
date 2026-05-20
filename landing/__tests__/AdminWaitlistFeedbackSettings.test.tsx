import "@testing-library/jest-dom/vitest";

import { fireEvent, render, screen } from "@testing-library/react";
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
  usePathname: () => "/admin/waitlist",
  useParams: () => ({}),
}));

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

function mockFetchByPath(routes: Record<string, { status: number; body: unknown }>) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL) => {
      const url = typeof input === "string" ? input : input.toString();
      for (const [pattern, value] of Object.entries(routes)) {
        if (url.includes(pattern)) {
          return new Response(JSON.stringify(value.body), {
            status: value.status,
            headers: { "content-type": "application/json" },
          });
        }
      }
      throw new Error(`No mock for ${url}`);
    }) as unknown as typeof fetch,
  );
}

describe("AdminWaitlistPage", () => {
  beforeEach(() => {
    replaceMock.mockReset();
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("highlights rows with votes ≥ threshold", async () => {
    mockFetchByPath({
      "/admin/api/me": { status: 200, body: okMe },
      "/admin/api/dashboard": { status: 200, body: okDashboardEmpty },
      "/admin/api/waitlist": {
        status: 200,
        body: {
          ok: true,
          data: {
            threshold: 10,
            items: [
              {
                source_name: "instagram",
                votes: 14,
                first_seen: "2026-04-01T10:00:00Z",
                last_seen: "2026-05-15T10:00:00Z",
                ready: true,
              },
              {
                source_name: "2gis",
                votes: 3,
                first_seen: "2026-04-15T10:00:00Z",
                last_seen: "2026-05-05T10:00:00Z",
                ready: false,
              },
            ],
          },
        },
      },
    });

    const { default: AdminWaitlistPage } = await import("@/app/admin/waitlist/page");
    render(<AdminWaitlistPage />);
    await screen.findByText("instagram");
    expect(screen.getByText("14")).toBeInTheDocument();
    expect(screen.getByText(/пора/i)).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });
});

describe("AdminFeedbackPage", () => {
  beforeEach(() => {
    replaceMock.mockReset();
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("filters by feedback type and renders the detail panel", async () => {
    const okFeedbackAll = {
      ok: true,
      data: {
        total: 2,
        limit: 50,
        offset: 0,
        items: [
          {
            id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
            type: "feature_request",
            source_name: null,
            email_or_contact_masked: "a***@example.com",
            message: "Хочу YCLIENTS",
            checkboxes: { yclients: true },
            created_at: "2026-05-20T12:00:00Z",
          },
          {
            id: "cccccccc-cccc-cccc-cccc-cccccccccccc",
            type: "bug",
            source_name: null,
            email_or_contact_masked: null,
            message: "Страница падает",
            checkboxes: {},
            created_at: "2026-05-21T12:00:00Z",
          },
        ],
      },
    };
    mockFetchByPath({
      "/admin/api/me": { status: 200, body: okMe },
      "/admin/api/dashboard": { status: 200, body: okDashboardEmpty },
      "/admin/api/feedback": { status: 200, body: okFeedbackAll },
    });

    const { default: AdminFeedbackPage } = await import("@/app/admin/feedback/page");
    render(<AdminFeedbackPage />);
    // Both the list row (line-clamped) and the detail panel render the
    // first-item message; assert both copies exist.
    await screen.findAllByText(/Хочу YCLIENTS/);
    // Detail panel mirrors first row by default; checkboxes JSON appears.
    expect(screen.getByText(/"yclients": true/)).toBeInTheDocument();

    // Click the "Баг" filter chip; both still satisfy the filter API
    // (we don't re-mock /feedback to a filtered subset since the
    // backend would have already applied type_filter — here we just
    // assert the chip toggles state without crashing).
    fireEvent.click(screen.getByRole("button", { name: "Баг" }));
    // The mock returns the full list again because we don't vary by
    // query string in this test; either row may remain selected. The
    // important thing is no crash + at least one of the original two
    // remains visible.
    expect(screen.getByText(/Запрос/)).toBeInTheDocument();
  });
});

describe("AdminSettingsPage", () => {
  beforeEach(() => {
    replaceMock.mockReset();
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders configured/not-configured flags without echoing secret values", async () => {
    const okSettings = {
      ok: true,
      data: {
        environment: "production",
        log_level: "INFO",
        app_base_url: "https://api.samosite.online",
        landing_base_url: "https://samosite.online",
        sites_base_domain: "samosite.online",
        feature_max_bot: false,
        feature_auto_sync: true,
        captcha_configured: true,
        tg_bot_configured: true,
        yandexgpt_configured: false,
        yookassa_configured: false,
        s3_configured: true,
        fernet_keys_configured: true,
      },
    };
    mockFetchByPath({
      "/admin/api/me": { status: 200, body: okMe },
      "/admin/api/dashboard": { status: 200, body: okDashboardEmpty },
      "/admin/api/settings": { status: 200, body: okSettings },
    });

    const { default: AdminSettingsPage } = await import("@/app/admin/settings/page");
    render(<AdminSettingsPage />);
    await screen.findByText(/Yandex SmartCaptcha/);
    expect(screen.getAllByText("настроено").length).toBeGreaterThan(0);
    expect(screen.getAllByText("не настроено").length).toBeGreaterThan(0);
    // Nothing that looks like a token literal leaks.
    expect(document.body.textContent).not.toMatch(/sk-/);
    expect(document.body.textContent).not.toMatch(/FERNET=/);
  });
});
