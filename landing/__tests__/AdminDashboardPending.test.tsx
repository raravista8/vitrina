import "@testing-library/jest-dom/vitest";

import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

// The admin dashboard (`/admin`) now injects a REAL "ТОП-5 PENDING" list
// over canon's hard-coded mock (canon-gap-0903-dashboard-pending). This
// spec locks the workaround:
//
//   1. real rows from GET /admin/api/apps?status=pending render visibly;
//   2. canon's hard-coded mock rows (studia-anna, …) get hidden;
//   3. clicking a real row routes to that application's detail.

const pushMock = vi.fn();
const replaceMock = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock, replace: replaceMock, refresh: vi.fn() }),
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
      apps_pending: 2,
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

const REAL_LINK_ID = "aaaaaa11-1111-1111-1111-111111111111";
const okPending = {
  ok: true,
  data: {
    total: 2,
    limit: 5,
    offset: 0,
    items: [
      {
        id: REAL_LINK_ID,
        mode: "link",
        source_type: "telegram",
        source_url: "t.me/realchannel",
        city: null,
        description_preview: null,
        contact_type: "telegram",
        contact_value_masked: "@x",
        status: "pending",
        rejection_reason: null,
        is_manual_review: false,
        user_id: null,
        created_at: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
      },
      {
        id: "bbbbbb22-2222-2222-2222-222222222222",
        mode: "photo",
        source_type: "photo",
        source_url: null,
        city: "Казань",
        description_preview: "студия маникюра",
        contact_type: "phone",
        contact_value_masked: "+7***1234",
        status: "pending",
        rejection_reason: null,
        is_manual_review: false,
        user_id: null,
        created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      },
    ],
  },
};

// URL-aware mock (the dashboard fires /me, /dashboard and /apps in a mix
// of concurrent effects — index-based sequencing would be brittle).
function mockFetchByUrl() {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL) => {
      const url = typeof input === "string" ? input : input.toString();
      let body: unknown = { ok: false, error: "not_mocked" };
      if (url.includes("/admin/api/me")) body = okMe;
      else if (url.includes("/admin/api/apps")) body = okPending;
      else if (url.includes("/admin/api/dashboard")) body = okDashboard;
      return new Response(JSON.stringify(body), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }) as unknown as typeof fetch,
  );
}

describe("Admin dashboard — real ТОП-5 PENDING (canon-gap-0903 workaround)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    pushMock.mockReset();
    replaceMock.mockReset();
  });

  it("renders real pending applications and hides canon's mock rows", async () => {
    mockFetchByUrl();
    render(<AdminHomePage />);

    // Real link-mode row → cleaned source_url is shown, and it's visible.
    const realRow = await screen.findByText("t.me/realchannel");
    expect(realRow).toBeVisible();

    // Real photo-mode row → "<city> · <description>".
    expect(screen.getByText("Казань · студия маникюра")).toBeVisible();

    // Canon's hard-coded mock rows remain in the DOM (display:none) but
    // are no longer visible — the founder sees only actual applications.
    expect(screen.getByText(/studia-anna/)).not.toBeVisible();
    expect(screen.getByText(/Барбершоп Самара/)).not.toBeVisible();
  });

  it("clicking a real row routes to that application's detail", async () => {
    mockFetchByUrl();
    render(<AdminHomePage />);

    const realRow = await screen.findByText("t.me/realchannel");
    fireEvent.click(realRow.closest("button")!);
    expect(pushMock).toHaveBeenCalledWith(`/admin/apps/${REAL_LINK_ID}`);
  });
});
