/**
 * FeedbackModal adapter (canon 0.9.1 consumer) — wiring tests.
 *
 * The canon `S9_FeedbackModal` is stubbed so we can assert the adapter's
 * behaviour in isolation: open via event, tally fetch + `feedback_open`,
 * POST votes[] + captcha on submit, inline error on reject, and the
 * `/admin*` + `/login` self-hide.
 */
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const h = vi.hoisted(() => ({ pathname: "/" }));

vi.mock("next/navigation", () => ({ usePathname: () => h.pathname }));
vi.mock("@/lib/metrika", () => ({ reachGoal: vi.fn() }));
vi.mock("@/lib/captcha", () => ({ requestCaptchaToken: vi.fn(async () => "DEV_TOKEN") }));

// Stub the canon modal: expose props as data-attrs + buttons that fire the
// controlled callbacks (mirrors canon: onSubmit is awaited + try/caught).
vi.mock("@samosite/canon/customer", () => ({
  S9_FeedbackModal: (props: {
    open?: boolean;
    submitting?: boolean;
    error?: string | null;
    tally?: { items: Record<string, number>; total_week: number };
    onOpenChange?: (o: boolean) => void;
    onSubmit?: (p: unknown) => void | Promise<void>;
    embedded?: boolean;
  }) => (
    <div
      data-testid="modal"
      data-open={String(!!props.open)}
      data-submitting={String(!!props.submitting)}
      data-error={props.error ?? ""}
      data-embedded={String(props.embedded)}
      data-tally={JSON.stringify(props.tally ?? null)}
    >
      <button data-testid="open" onClick={() => props.onOpenChange?.(true)} />
      <button
        data-testid="submit"
        onClick={async () => {
          try {
            await props.onSubmit?.({
              votes: [{ kind: "source", key: "vk" }],
              own_source: null,
              own_feature: null,
              message: null,
              name: null,
              contact: "@a",
            });
          } catch {
            /* canon swallows; consumer surfaces via `error` */
          }
        }}
      />
    </div>
  ),
}));

import { requestCaptchaToken } from "@/lib/captcha";
import { reachGoal } from "@/lib/metrika";

import { FeedbackModal, SAMOSITE_OPEN_FEEDBACK } from "@/components/FeedbackModal";

const reachGoalMock = vi.mocked(reachGoal);

beforeEach(() => {
  h.pathname = "/";
  reachGoalMock.mockClear();
  vi.mocked(requestCaptchaToken).mockClear();
  window.matchMedia = vi.fn().mockReturnValue({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }) as unknown as typeof window.matchMedia;
  global.fetch = vi.fn(
    async () =>
      new Response(JSON.stringify({ ok: true, data: { items: { vk: 3 }, total_week: 3 } }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
  ) as unknown as typeof fetch;
});

afterEach(() => vi.restoreAllMocks());

describe("FeedbackModal adapter", () => {
  it("renders the canon modal in embedded=false (real global) mode", () => {
    render(<FeedbackModal />);
    expect(screen.getByTestId("modal").getAttribute("data-embedded")).toBe("false");
    expect(screen.getByTestId("modal").getAttribute("data-open")).toBe("false");
  });

  it("opens on the samosite:open-feedback event, fetches tally + fires feedback_open", async () => {
    render(<FeedbackModal />);
    fireEvent(window, new CustomEvent(SAMOSITE_OPEN_FEEDBACK, { detail: { source: "footer" } }));
    await waitFor(() => expect(screen.getByTestId("modal").getAttribute("data-open")).toBe("true"));
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/feedback/tally",
      expect.objectContaining({ signal: expect.anything() }),
    );
    expect(reachGoalMock).toHaveBeenCalledWith("feedback_open", { source: "footer" });
    await waitFor(() =>
      expect(screen.getByTestId("modal").getAttribute("data-tally")).toContain('"vk":3'),
    );
  });

  it("opens from a [data-ss-feedback] anchor (document-delegated)", async () => {
    render(
      <>
        <a data-ss-feedback="sources" href="/feedback">
          Не нашли свою?
        </a>
        <FeedbackModal />
      </>,
    );
    fireEvent.click(screen.getByText("Не нашли свою?"));
    await waitFor(() => expect(screen.getByTestId("modal").getAttribute("data-open")).toBe("true"));
    expect(reachGoalMock).toHaveBeenCalledWith("feedback_open", { source: "sources" });
  });

  it("POSTs votes[] + captcha to /api/feedback and fires feedback_submit", async () => {
    render(<FeedbackModal />);
    fireEvent.click(screen.getByTestId("submit"));
    await waitFor(() => expect(requestCaptchaToken).toHaveBeenCalled());
    const postCall = vi.mocked(global.fetch).mock.calls.find(([url]) => url === "/api/feedback");
    expect(postCall).toBeTruthy();
    const body = JSON.parse((postCall![1] as RequestInit).body as string);
    expect(body.votes).toEqual([{ kind: "source", key: "vk" }]);
    expect(body.captcha_token).toBe("DEV_TOKEN");
    await waitFor(() =>
      expect(reachGoalMock).toHaveBeenCalledWith("feedback_submit", { votes: 1 }),
    );
  });

  it("surfaces an inline error when the POST fails (modal stays open)", async () => {
    global.fetch = vi.fn(async (url: RequestInfo | URL) => {
      if (String(url).endsWith("/api/feedback")) return new Response("nope", { status: 500 });
      return new Response(JSON.stringify({ ok: true, data: { items: {}, total_week: 0 } }), {
        status: 200,
      });
    }) as unknown as typeof fetch;
    render(<FeedbackModal />);
    fireEvent.click(screen.getByTestId("submit"));
    await waitFor(() =>
      expect(screen.getByTestId("modal").getAttribute("data-error")).toContain("Не получилось"),
    );
    expect(reachGoalMock).not.toHaveBeenCalledWith("feedback_submit", expect.anything());
  });

  it("self-hides on /admin and /login", () => {
    h.pathname = "/admin";
    const { container, rerender } = render(<FeedbackModal />);
    expect(container.querySelector('[data-testid="modal"]')).toBeNull();
    h.pathname = "/login";
    rerender(<FeedbackModal />);
    expect(container.querySelector('[data-testid="modal"]')).toBeNull();
  });

  it("stays mounted on /admin-demo (not under /admin/)", () => {
    h.pathname = "/admin-demo";
    render(<FeedbackModal />);
    expect(screen.getByTestId("modal")).toBeTruthy();
  });
});
