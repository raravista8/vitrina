import "@testing-library/jest-dom/vitest";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Hero } from "@/components/Hero";

// ---- helpers -------------------------------------------------------------

const PREVIEW_OK = {
  ok: true,
  data: {
    source_type: "telegram" as const,
    name: "Barbershop Samara",
    counts: { posts: 47, photos: 12, reviews: null },
  },
};

function mockPreviewFetch(payload: unknown, opts: { ok?: boolean; status?: number } = {}) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => {
      return new Response(JSON.stringify(payload), {
        status: opts.status ?? 200,
        headers: { "content-type": "application/json" },
      });
    }) as unknown as typeof fetch,
  );
}

// ---- tests ---------------------------------------------------------------

describe("Hero — copy lock (Concept A canonical)", () => {
  it("anchors COPY.md §2 strings verbatim", () => {
    render(<Hero />);

    // Eyebrow + H1 + sub — locked to COPY.md.
    expect(screen.getByText("САЙТ ДЛЯ ЗАЯВОК — ИЗ ТОГО, ЧТО У ВАС УЖЕ ЕСТЬ")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/сам себя ведёт/i);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/приносит вам заявки/i);
    expect(screen.getByText(/Покажите ссылку на ваше дело/i)).toBeInTheDocument();

    // Brand — Cyrillic only (legal requirement, PRD §3).
    const brand = screen.getAllByText("Витрина");
    expect(brand.length).toBeGreaterThan(0);

    // CTA + microcopy.
    expect(screen.getByRole("button", { name: /Собрать мою витрину/ })).toBeInTheDocument();
    expect(
      screen.getByText(/Первый месяц бесплатно — без карты при регистрации/i),
    ).toBeInTheDocument();

    // Benefits stack — 4 cards from COPY.md §2.
    expect(screen.getByText("Сам обновляется")).toBeInTheDocument();
    expect(screen.getByText("Сам ловит заявки")).toBeInTheDocument();
    expect(screen.getByText("Сам находится в поиске")).toBeInTheDocument();
    expect(screen.getByText("Первый месяц бесплатно")).toBeInTheDocument();
  });

  it("ships fallback links for photo + closed-TG", () => {
    render(<Hero />);
    expect(
      screen.getByText(/Загрузить фото работ, скриншот профиля или визитку/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Закрытый TG-канал — загрузить экспорт/i)).toBeInTheDocument();
  });

  it("anti-pattern guard — never uses banned wording", () => {
    render(<Hero />);
    // COPY.md §7 — banned phrases. If the design or any future patch
    // sneaks them back in, this test goes red.
    expect(document.body.textContent).not.toMatch(/AI-генератор/i);
    expect(document.body.textContent).not.toMatch(/Schema\.org/i);
    expect(document.body.textContent).not.toMatch(/sitemap/i);
  });
});

describe("Hero — interaction", () => {
  beforeEach(() => {
    mockPreviewFetch(PREVIEW_OK);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("CTA is always clickable — never wait for input", () => {
    // UX rule: the primary CTA never goes disabled. Users with empty
    // input still get the modal (where they finish the submission or
    // jump to the photo path).
    render(<Hero />);
    const button = screen.getByRole("button", { name: /Собрать мою витрину/ });
    expect(button).not.toBeDisabled();
  });

  it("CTA stays enabled after pasting a Telegram URL", async () => {
    render(<Hero />);
    const input = screen.getByPlaceholderText(/ссылка на соцсеть/i);
    fireEvent.change(input, { target: { value: "https://t.me/barbershop_samara" } });

    const button = screen.getByRole("button", { name: /Собрать мою витрину/ });
    await waitFor(() => expect(button).not.toBeDisabled());
  });

  it("renders the ✓ badge with preview counts once the live preview lands", async () => {
    render(<Hero />);
    fireEvent.change(screen.getByPlaceholderText(/ссылка на соцсеть/i), {
      target: { value: "https://t.me/barbershop_samara" },
    });
    // Loading badge first
    await screen.findByText(/проверяем Telegram/i);
    // Then the resolved counts.
    await waitFor(() => {
      expect(screen.getByText(/47.*постов.*12.*фото/i)).toBeInTheDocument();
    });
  });

  it("for waitlist URLs, renders the email-capture panel; CTA stays clickable", () => {
    render(<Hero />);
    fireEvent.change(screen.getByPlaceholderText(/ссылка на соцсеть/i), {
      target: { value: "https://instagram.com/anna_master" },
    });
    expect(screen.getByText(/скоро будет — оставьте email/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Собрать мою витрину/ })).not.toBeDisabled();
    // Parallel CTA per FR-093 — wired to open PhotoDrawer in Hero, so
    // the markup is a <button> when used inside Hero (the standalone
    // badge falls back to an <a href="#photo-upload"> for accessibility).
    expect(screen.getByRole("button", { name: /создайте из фото сейчас/i })).toBeInTheDocument();
  });

  it("for a non-URL string, hints at supported sources; CTA stays clickable", () => {
    render(<Hero />);
    fireEvent.change(screen.getByPlaceholderText(/ссылка на соцсеть/i), {
      target: { value: "just some text" },
    });
    expect(screen.getByText(/Введите ссылку на Telegram-канал, Яндекс.Карты/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Собрать мою витрину/ })).not.toBeDisabled();
  });

  it("clicking the photo-upload fallback opens the PhotoDrawer (PR-B #6)", () => {
    render(<Hero />);
    // Drawer is closed initially — the heading lives inside it.
    expect(screen.queryByRole("heading", { name: /Загрузите фото/i })).not.toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", { name: /Загрузить фото работ, скриншот профиля или визитку/i }),
    );

    expect(screen.getByRole("heading", { name: /Загрузите фото/i })).toBeInTheDocument();
  });
});
