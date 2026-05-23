import "@testing-library/jest-dom/vitest";

import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Stub next/dynamic so the dashboard chart doesn't try to lazy-load
// recharts in the test env.
vi.mock("next/dynamic", () => ({
  __esModule: true,
  default: () =>
    function StubChart() {
      return <div data-testid="apps-chart-stub" />;
    },
}));

const replaceMock = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: replaceMock, refresh: vi.fn() }),
  usePathname: () => "/admin",
  useParams: () => ({ id: "" }),
}));

import AdminHomePage from "@/app/admin/page";

const okMe = {
  ok: true,
  data: {
    admin_id: "11111111-1111-1111-1111-111111111111",
    session_id_prefix: "abc12345",
    created_at: new Date().toISOString(),
    last_seen_at: new Date().toISOString(),
  },
};

const okDashboard = {
  ok: true,
  data: {
    counters: {
      apps_total: 42,
      apps_pending: 7,
      sites_published: 12,
      leads_total: 31,
      feedback_total: 5,
    },
    applications_series_14d: Array.from({ length: 14 }, (_, i) => ({
      day: `2026-05-${String(i + 1).padStart(2, "0")}`,
      count: i,
    })),
  },
};

function mockFetchSequence(responses: Array<{ status: number; body: unknown }>) {
  let i = 0;
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => {
      const r = responses[Math.min(i, responses.length - 1)]!;
      i += 1;
      return new Response(JSON.stringify(r.body), {
        status: r.status,
        headers: { "content-type": "application/json" },
      });
    }) as unknown as typeof fetch,
  );
}

describe("AdminHome (Dashboard)", () => {
  beforeEach(() => {
    replaceMock.mockReset();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders the counter grid after /me + /dashboard succeed", async () => {
    mockFetchSequence([
      // 1st adminRequest: /me — AdminChrome auth-gate
      { status: 200, body: okMe },
      // 2nd: /dashboard — AdminChrome's apps_pending counter
      { status: 200, body: okDashboard },
      // 3rd: /dashboard — DashboardScreen counter grid (separate call)
      { status: 200, body: okDashboard },
    ]);

    render(<AdminHomePage />);

    // findByText polls until the chrome auth-gate + dashboard fetch
    // both resolve and the counter tiles mount. Canon's `StatTile`
    // uppercases the label via `String(label).toUpperCase()`, so we
    // assert against the uppercased renders. Labels per canon 0.2.0
    // `COUNTER_TILES` in `packages/canon/src/admin-core/index.tsx`:
    //   apps_total → "Всего заявок"   → "ВСЕГО ЗАЯВОК"
    //   apps_pending → "Pending"      → "PENDING"
    //   sites_published → "Опубликовано" → "ОПУБЛИКОВАНО"
    //   leads_total → "Лиды"          → "ЛИДЫ"
    //   feedback_total → "Feedback"   → "FEEDBACK"
    await screen.findByText("ВСЕГО ЗАЯВОК");
    expect(screen.getByText("PENDING")).toBeInTheDocument();
    expect(screen.getByText("ОПУБЛИКОВАНО")).toBeInTheDocument();
    expect(screen.getByText("ЛИДЫ")).toBeInTheDocument();
    expect(screen.getByText("FEEDBACK")).toBeInTheDocument();
    // Wait for the numeric value to render (post-fetch, loading=false).
    // While `loading=true`, canon renders `<SkeletonBlock>` placeholders
    // instead of the value text — so we await one specific value before
    // asserting the rest synchronously.
    await screen.findByText("42");
    expect(screen.getAllByText("7").length).toBeGreaterThan(0);
  });

  it("redirects to /admin/login when /me returns auth_required", async () => {
    mockFetchSequence([
      // Manual redirect → 303 in our adminRequest translation layer
      { status: 401, body: { ok: false, error: "auth_required" } },
    ]);
    // Override one fetch call to return a 303-like state. The
    // fetch mock above defaults to `response.ok===false` for non-2xx,
    // so adminRequest produces { ok: false }. AdminChrome treats any
    // ok===false /me response as "redirect to login".
    render(<AdminHomePage />);
    await waitFor(() => expect(replaceMock).toHaveBeenCalledWith("/admin/login"));
  });
});
