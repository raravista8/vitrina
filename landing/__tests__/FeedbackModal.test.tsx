/**
 * FeedbackModal adapter (canon 0.13.0 «Фидбек v2» consumer) — wiring tests.
 *
 * Canon `FeedbackV2Modal`/`FeedbackV2Fab` стабятся: проверяем поведение
 * адаптера — авто-триггер блокера (exit-intent, подавление по CTA,
 * 1-раз-на-посетителя), режим «Вопрос» с FAB, POST /api/feedback/v2
 * (+captcha, consent только при контакте), события Метрики в dataLayer,
 * self-hide на /admin*+/login.
 */
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const h = vi.hoisted(() => ({ pathname: "/" }));

vi.mock("next/navigation", () => ({ usePathname: () => h.pathname }));
vi.mock("@/lib/captcha", () => ({ requestCaptchaToken: vi.fn(async () => "DEV_TOKEN") }));

// Стаб канона: пропсы в data-атрибуты + кнопки, дёргающие колбэки.
vi.mock("@samosite/canon/feedback", () => ({
  Fb2_Styles: () => null,
  FeedbackV2Fab: (props: { onClick?: () => void }) => (
    <button data-testid="fab" onClick={props.onClick}>
      Задать вопрос
    </button>
  ),
  FeedbackV2Modal: (props: {
    open?: boolean;
    mode?: string;
    submitted?: boolean;
    error?: boolean;
    onReasonChange?: (c: string) => void;
    onSubmit?: (p: unknown) => void;
    onOpenChange?: (o: boolean) => void;
  }) => (
    <div
      data-testid="modal"
      data-open={String(!!props.open)}
      data-mode={props.mode}
      data-submitted={String(!!props.submitted)}
      data-error={String(!!props.error)}
    >
      <button data-testid="pick-price" onClick={() => props.onReasonChange?.("price")} />
      <button
        data-testid="send-plain"
        onClick={() => props.onSubmit?.({ mode: "blocker", reason: "price", note: "дорого" })}
      />
      <button
        data-testid="send-question"
        onClick={() =>
          props.onSubmit?.({
            mode: "question",
            question: "Можно свой домен?",
            channel: "email",
            contact: "anna@example.com",
          })
        }
      />
      <button data-testid="close" onClick={() => props.onOpenChange?.(false)} />
    </div>
  ),
}));

import { FeedbackModal } from "@/components/FeedbackModal";

function dl(): Record<string, unknown>[] {
  return (window as unknown as { dataLayer?: Record<string, unknown>[] }).dataLayer ?? [];
}

function exitIntent() {
  act(() => {
    fireEvent.mouseOut(document, { relatedTarget: null, clientY: 0 });
  });
}

describe("FeedbackModal (Feedback v2)", () => {
  beforeEach(() => {
    h.pathname = "/";
    window.localStorage.clear();
    (window as unknown as { dataLayer: unknown[] }).dataLayer = [];
    global.fetch = vi.fn(
      async () =>
        new Response(JSON.stringify({ ok: true, data: { feedback_id: "f-1" } }), {
          status: 202,
          headers: { "Content-Type": "application/json" },
        }),
    ) as unknown as typeof fetch;
    window.matchMedia = vi.fn().mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }) as unknown as typeof window.matchMedia;
  });

  afterEach(() => vi.restoreAllMocks());

  it("exit-intent открывает блокер один раз на посетителя", () => {
    render(<FeedbackModal />);
    expect(screen.getByTestId("modal").getAttribute("data-open")).toBe("false");

    exitIntent();
    const modal = screen.getByTestId("modal");
    expect(modal.getAttribute("data-open")).toBe("true");
    expect(modal.getAttribute("data-mode")).toBe("blocker");
    expect(window.localStorage.getItem("ss_fb2_blocker_shown")).toBe("1");
    expect(dl().some((e) => e["event"] === "feedback_open" && e["trigger"] === "exit")).toBe(true);

    // повторный маунт: флаг стоит — не открываемся
    fireEvent.click(screen.getByTestId("close"));
    const second = render(<FeedbackModal />);
    exitIntent();
    expect(second.getAllByTestId("modal").at(-1)?.getAttribute("data-open")).toBe("false");
  });

  it("клик по CTA (data-entry) подавляет авто-триггер", () => {
    render(
      <>
        <button data-entry="hero">CTA</button>
        <FeedbackModal />
      </>,
    );
    fireEvent.click(screen.getByText("CTA"));
    exitIntent();
    expect(screen.getByTestId("modal").getAttribute("data-open")).toBe("false");
    expect(window.localStorage.getItem("ss_fb2_blocker_shown")).toBeNull();
  });

  it("FAB открывает «Вопрос»; отправка шлёт /api/feedback/v2 с консентом", async () => {
    render(<FeedbackModal />);
    fireEvent.click(screen.getByTestId("fab"));
    const modal = screen.getByTestId("modal");
    expect(modal.getAttribute("data-open")).toBe("true");
    expect(modal.getAttribute("data-mode")).toBe("question");
    expect(dl().some((e) => e["event"] === "feedback_open" && e["trigger"] === "button")).toBe(
      true,
    );

    fireEvent.click(screen.getByTestId("send-question"));
    await waitFor(() =>
      expect(screen.getByTestId("modal").getAttribute("data-submitted")).toBe("true"),
    );

    const fetchMock = global.fetch as unknown as ReturnType<typeof vi.fn>;
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("/api/feedback/v2");
    const body = JSON.parse(String(init.body)) as Record<string, unknown>;
    expect(body["mode"]).toBe("question");
    expect(body["trigger"]).toBe("button");
    expect(body["contact_channel"]).toBe("email");
    expect(body["contact"]).toBe("anna@example.com");
    expect(body["consent_given"]).toBe(true);
    expect(body["captcha_token"]).toBe("DEV_TOKEN");
    expect(dl().some((e) => e["event"] === "feedback_question_sent")).toBe(true);
  });

  it("блокер «Просто отправить ответ» — без контакта и без consent-поля", async () => {
    render(<FeedbackModal />);
    exitIntent();
    fireEvent.click(screen.getByTestId("pick-price"));
    expect(dl().some((e) => e["event"] === "feedback_reason" && e["reason"] === "price")).toBe(
      true,
    );

    fireEvent.click(screen.getByTestId("send-plain"));
    await waitFor(() =>
      expect(screen.getByTestId("modal").getAttribute("data-submitted")).toBe("true"),
    );

    const fetchMock = global.fetch as unknown as ReturnType<typeof vi.fn>;
    const body = JSON.parse(
      String((fetchMock.mock.calls[0] as [string, RequestInit])[1].body),
    ) as Record<string, unknown>;
    expect(body["mode"]).toBe("blocker");
    expect(body["reason"]).toBe("price");
    expect(body["note"]).toBe("дорого");
    expect(body["trigger"]).toBe("exit");
    expect("consent_given" in body).toBe(false);
    expect("contact" in body).toBe(false);
    expect(dl().some((e) => e["event"] === "feedback_contact_left")).toBe(false);
  });

  it("ошибка бэкенда — error=true, модалка открыта", async () => {
    global.fetch = vi.fn(
      async () => new Response(JSON.stringify({ ok: false }), { status: 400 }),
    ) as unknown as typeof fetch;
    render(<FeedbackModal />);
    fireEvent.click(screen.getByTestId("fab"));
    fireEvent.click(screen.getByTestId("send-question"));
    await waitFor(() =>
      expect(screen.getByTestId("modal").getAttribute("data-error")).toBe("true"),
    );
    expect(screen.getByTestId("modal").getAttribute("data-open")).toBe("true");
  });

  it("self-hide на /admin* и /login", () => {
    h.pathname = "/admin/apps";
    const r1 = render(<FeedbackModal />);
    expect(r1.queryByTestId("fab")).toBeNull();
    h.pathname = "/login";
    const r2 = render(<FeedbackModal />);
    expect(r2.queryByTestId("fab")).toBeNull();
  });
});
