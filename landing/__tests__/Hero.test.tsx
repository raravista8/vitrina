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
    const brand = screen.getAllByText("Самосайт");
    expect(brand.length).toBeGreaterThan(0);

    // CTA + microcopy.
    expect(screen.getByRole("button", { name: /Собрать мой Самосайт/ })).toBeInTheDocument();
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
    const button = screen.getByRole("button", { name: /Собрать мой Самосайт/ });
    expect(button).not.toBeDisabled();
  });

  it("CTA stays enabled after pasting a Telegram URL", async () => {
    render(<Hero />);
    const input = screen.getByPlaceholderText(/ссылка на соцсеть/i);
    fireEvent.change(input, { target: { value: "https://t.me/barbershop_samara" } });

    const button = screen.getByRole("button", { name: /Собрать мой Самосайт/ });
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
    expect(screen.getByRole("button", { name: /Собрать мой Самосайт/ })).not.toBeDisabled();
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
    expect(screen.getByRole("button", { name: /Собрать мой Самосайт/ })).not.toBeDisabled();
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

describe("Hero — UX batch 1 (first user testing)", () => {
  beforeEach(() => {
    mockPreviewFetch(PREVIEW_OK);
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows the supported-source list when input is empty", () => {
    render(<Hero />);
    // Microcopy line, only visible before the user pastes anything.
    expect(
      screen.getByText(/Поддерживаем:.*Telegram-канал.*Яндекс\.Карты.*фото/i),
    ).toBeInTheDocument();
  });

  it("hides the supported-source list once the user types", () => {
    render(<Hero />);
    fireEvent.change(screen.getByPlaceholderText(/ссылка на соцсеть/i), {
      target: { value: "https://t.me/some_channel" },
    });
    expect(screen.queryByText(/Поддерживаем:/i)).not.toBeInTheDocument();
  });

  it("renders an × clear-button when input is non-empty; clears on click", () => {
    render(<Hero />);
    const input = screen.getByPlaceholderText(/ссылка на соцсеть/i) as HTMLInputElement;
    // No × initially.
    expect(screen.queryByRole("button", { name: /Очистить/i })).not.toBeInTheDocument();

    fireEvent.change(input, { target: { value: "https://t.me/whatever" } });
    const clearBtn = screen.getByRole("button", { name: /Очистить/i });
    expect(clearBtn).toBeInTheDocument();

    fireEvent.click(clearBtn);
    expect(input.value).toBe("");
    expect(screen.queryByRole("button", { name: /Очистить/i })).not.toBeInTheDocument();
  });

  it("main CTA with a waitlist URL opens the PhotoDrawer, not the SubmitModal", () => {
    // B1 root-cause fix: previously, clicking «Собрать мой Самосайт»
    // with an IG/VK/2GIS URL pasted opened the modal with a bogus
    // sourceType="telegram" fallback, mislabelling the source in
    // step 2. Now it opens the photo flow — symmetric with the
    // parallel «создайте из фото сейчас» CTA.
    render(<Hero />);
    fireEvent.change(screen.getByPlaceholderText(/ссылка на соцсеть/i), {
      target: { value: "https://www.instagram.com/marusya" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Собрать мой Самосайт/ }));

    // PhotoDrawer is open — its heading is the unique marker.
    expect(screen.getByRole("heading", { name: /Загрузите фото/i })).toBeInTheDocument();
    // SubmitModal is NOT open — no «Куда отправлять заявки» heading.
    expect(
      screen.queryByRole("heading", { name: /Куда отправлять заявки/i }),
    ).not.toBeInTheDocument();
  });

  it("main CTA with an MVP URL opens the SubmitModal (no regression)", () => {
    render(<Hero />);
    fireEvent.change(screen.getByPlaceholderText(/ссылка на соцсеть/i), {
      target: { value: "https://t.me/barbershop_samara" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Собрать мой Самосайт/ }));

    expect(screen.getByRole("heading", { name: /Куда отправлять заявки/i })).toBeInTheDocument();
    // And critically — no green source banner inside the modal (U1).
    expect(screen.queryByText(/Источник:/)).not.toBeInTheDocument();
  });

  it("waitlist panel uses warn (amber) styling, not info (blue)", () => {
    // User batch 2 (B6): testers read the previous info-soft blue
    // tint as "all clear, proceed". Amber/warn signals "this isn't
    // yet supported" more honestly. The classNames carry the colour
    // tokens so we assert on those rather than computed CSS.
    render(<Hero />);
    fireEvent.change(screen.getByPlaceholderText(/ссылка на соцсеть/i), {
      target: { value: "https://www.instagram.com/anna_master" },
    });
    const banner = screen.getByText(/скоро будет — оставьте email/i);
    // The text node lives inside the styled <p>. Walk up one level.
    const styledParent = banner.closest("p");
    expect(styledParent).not.toBeNull();
    expect(styledParent!.className).toMatch(/bg-warn-soft/);
    expect(styledParent!.className).not.toMatch(/bg-info-soft/);
  });

  it("contact field placeholder is email-first (no 4-option overload)", () => {
    // User batch 2 (B5): the previous "Email, телефон, @telegram или
    // MAX" placeholder presented four equal options; testers
    // reflexively defaulted to email and asked for an implicit
    // priority. The new copy keeps Telegram/MAX in a separate helper
    // line.
    render(<Hero />);
    fireEvent.change(screen.getByPlaceholderText(/ссылка на соцсеть/i), {
      target: { value: "https://t.me/barbershop_samara" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Собрать мой Самосайт/ }));

    const contactInput = screen.getByPlaceholderText("Email или телефон");
    expect(contactInput).toBeInTheDocument();
    expect(screen.getByText(/Или @имя в Telegram \/ MAX/i)).toBeInTheDocument();
  });

  it("contact field auto-formats a bare 10-digit phone into +7 (XXX) XXX-XX-XX", () => {
    // User batch 2 (B5): progressive formatter — server still does
    // canonical E.164 normalisation, the formatter just makes the
    // value readable as the user types.
    render(<Hero />);
    fireEvent.change(screen.getByPlaceholderText(/ссылка на соцсеть/i), {
      target: { value: "https://t.me/barbershop_samara" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Собрать мой Самосайт/ }));

    const contactInput = screen.getByPlaceholderText("Email или телефон") as HTMLInputElement;
    fireEvent.change(contactInput, { target: { value: "9167388689" } });
    expect(contactInput.value).toBe("+7 (916) 738-86-89");
    // Detection badge picks up "phone".
    expect(screen.getByText("Телефон")).toBeInTheDocument();
  });

  it("«← Назад» on SubmitModal step 1 closes the modal and preserves the Hero input", () => {
    // B2 root-cause fix: testers reported "никак не могу вернуться на
    // шаг 1" — the ✕ in the corner wasn't recognised as a back path.
    // The labelled chevron makes it obvious and survives Hero state.
    render(<Hero />);
    const input = screen.getByPlaceholderText(/ссылка на соцсеть/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "https://t.me/barbershop_samara" } });
    fireEvent.click(screen.getByRole("button", { name: /Собрать мой Самосайт/ }));

    // Modal is open with the back button labelled.
    const backBtn = screen.getByRole("button", { name: /^Назад$/ });
    fireEvent.click(backBtn);

    // Modal gone, Hero input preserved.
    expect(
      screen.queryByRole("heading", { name: /Куда отправлять заявки/i }),
    ).not.toBeInTheDocument();
    expect(input.value).toBe("https://t.me/barbershop_samara");
  });
});
