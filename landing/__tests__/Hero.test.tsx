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

describe("Hero — copy lock (v2 canonical, COPY.md §2.2)", () => {
  it("anchors COPY.md §2.2 strings verbatim", () => {
    render(<Hero />);

    // Eyebrow «САЙТ ДЛЯ ЗАЯВОК…» удалён в v2 — см. COPY.md §11.1.
    expect(screen.queryByText("САЙТ ДЛЯ ЗАЯВОК — ИЗ ТОГО, ЧТО У ВАС УЖЕ ЕСТЬ")).toBeNull();

    // H1 — canon 0.5.0: «Сайт, который соберётся из вашей ссылки — и
    // дальше работает сам» (two accent phrases, single SLA).
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent(/Сайт, который/i);
    expect(h1).toHaveTextContent(/соберётся из вашей ссылки/i);
    expect(h1).toHaveTextContent(/работает сам/i);
    // canon 0.5.0 — sub rewritten: opens with «Самосайт на базе ИИ»,
    // then «соберёт сайт за 2 часа» (single SLA), then the source list,
    // then «сам обновляет цены, отбирает отзывы и ловит заявки в
    // мессенджер». Was «Покажите ссылку — карты, Telegram или визитку.»
    expect(screen.getByText(/Самосайт на базе ИИ/i)).toBeInTheDocument();

    // Brand «Самосайт» (Cyrillic per PRD §3) is rendered by the
    // <StickyHeader> sibling now (mounted from app/page.tsx in prod
    // — see SiteHeader.tsx + SiteHeader.test.tsx). Hero references the
    // brand only inside copy strings (CTA «Собрать сайт», microcopy
    // «Самосайт сам напомнит»). Assertion lives in SiteHeader.test.tsx.

    // CTA + free-month risk-reversal pill. The dedicated «Самосайт сам
    // напомнит» microcopy line under the badge was removed per canon
    // 0.2.5 (duplicated three other surfaces). The free-month pill
    // remains and carries the same promise via «Первый месяц —
    // бесплатно» + «далее 990 ₽/мес».
    expect(screen.getByRole("button", { name: /Собрать сайт/ })).toBeInTheDocument();
    expect(screen.getByText(/Первый месяц — бесплатно/i)).toBeInTheDocument();
    expect(screen.getByText(/990 ₽\/мес/)).toBeInTheDocument();
    // Reassurance microcopy «Самосайт сам напомнит» MUST be gone from
    // Hero (canon 0.2.5 fix). Guards against accidental re-introduction.
    expect(screen.queryByText(/Самосайт сам напомнит/i)).toBeNull();

    // Benefits stack удалён из Hero в v2 — теперь живёт в <BigFeatures />
    // секцией ниже. Здесь убеждаемся что в Hero его нет.
    expect(screen.queryByText(/^Сам обновляется$/)).toBeNull();
    expect(screen.queryByText(/^Сам ловит заявки$/)).toBeNull();
    expect(screen.queryByText(/^Сам находится в поиске$/)).toBeNull();
  });

  it("ships photo-link companion (canon 0.3.0) under the CTA", () => {
    render(<Hero />);
    // canon 0.3.0 §1 Hero: «или загрузите фото работ, буклета или меню»
    // replaces the old «📷 Загрузить фото работ» button. Same plane as
    // the CTA — link OR photo, never both.
    expect(
      screen.getByRole("button", { name: /Нет ссылки\? Загрузите фото буклета, меню или работ/i }),
    ).toBeInTheDocument();
    // The «Закрытый TG-канал» link is gone (PR-G) and stays gone.
    expect(screen.queryByText(/Закрытый TG-канал/i)).toBeNull();
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
    const button = screen.getByRole("button", { name: /Собрать сайт/ });
    expect(button).not.toBeDisabled();
  });

  it("CTA stays enabled after pasting a Telegram URL", async () => {
    render(<Hero />);
    const input = screen.getByPlaceholderText(/Вставьте ссылку/i);
    fireEvent.change(input, { target: { value: "https://t.me/barbershop_samara" } });

    const button = screen.getByRole("button", { name: /Собрать сайт/ });
    await waitFor(() => expect(button).not.toBeDisabled());
  });

  it("renders the ✓ badge with preview counts once the live preview lands", async () => {
    render(<Hero />);
    fireEvent.change(screen.getByPlaceholderText(/Вставьте ссылку/i), {
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
    fireEvent.change(screen.getByPlaceholderText(/Вставьте ссылку/i), {
      target: { value: "https://instagram.com/anna_master" },
    });
    expect(screen.getByText(/скоро будет — оставьте email/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Собрать сайт/ })).not.toBeDisabled();
    // Parallel CTA per FR-093 — wired to open PhotoDrawer in Hero, so
    // the markup is a <button> when used inside Hero (the standalone
    // badge falls back to an <a href="#photo-upload"> for accessibility).
    expect(screen.getByRole("button", { name: /создайте из фото сейчас/i })).toBeInTheDocument();
  });

  it("for a non-URL string, hints at supported sources; CTA stays clickable", () => {
    render(<Hero />);
    fireEvent.change(screen.getByPlaceholderText(/Вставьте ссылку/i), {
      target: { value: "just some text" },
    });
    expect(screen.getByText(/Введите ссылку на Telegram-канал, Яндекс.Карты/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Собрать сайт/ })).not.toBeDisabled();
  });

  it("clicking the photo-link opens SubmitModal in photo mode (canon 0.3.0)", () => {
    render(<Hero />);
    // SubmitModal closed initially — canon's S3_Step1_Photo heading
    // «Загрузите фото вашего дела» only appears after the trigger.
    expect(
      screen.queryByRole("heading", { name: /Покажите ваше дело — соберём из этого сайт/i }),
    ).not.toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", { name: /Нет ссылки\? Загрузите фото буклета, меню или работ/i }),
    );

    // Canon SubmitModal opens at Step 1 with photo-mode heading.
    expect(
      screen.getByRole("heading", { name: /Покажите ваше дело — соберём из этого сайт/i }),
    ).toBeInTheDocument();
  });
});

describe("Hero — UX batch 1 (first user testing)", () => {
  beforeEach(() => {
    mockPreviewFetch(PREVIEW_OK);
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows the compact platform list under the form", () => {
    render(<Hero />);
    // v2.1.3 §1.3 → canon 0.2.2 — старая «Поддерживаем: …» микрокопия
    // заменена на canon `<HeroPlatformStrip>` drop-in. Список всегда
    // виден (не зависит от input). Canon ships TWO copies (desktop +
    // mobile, CSS-toggled via Tailwind sm:) — `getAllByText` так что
    // оба mount'а матчатся.
    expect(screen.getAllByText(/поддерживаем/i).length).toBeGreaterThan(0);
    // Canon's PLATFORMS_OK uses full platform names — these labels
    // come straight from canon source (packages/canon/src/landing
    // line 488-503), don't hand-edit on prod side.
    expect(screen.getAllByText("Яндекс.Карты").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Telegram-канал").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Avito").length).toBeGreaterThan(0);
  });

  it("keeps the compact platform list visible after the user types", () => {
    render(<Hero />);
    // v2.1.3 §1.3 — compact list постоянно виден (раньше скрывался при
    // paste). Reason: brand-recognition value высокий, badge внизу
    // (SourceDetectionBadge) для recognized source не конфликтует.
    // Canon ships TWO copies (desktop + mobile via Tailwind sm: toggle).
    fireEvent.change(screen.getByPlaceholderText(/Вставьте ссылку/i), {
      target: { value: "https://t.me/some_channel" },
    });
    expect(screen.getAllByText(/поддерживаем/i).length).toBeGreaterThan(0);
  });

  it("renders an × clear-button when input is non-empty; clears on click", () => {
    render(<Hero />);
    const input = screen.getByPlaceholderText(/Вставьте ссылку/i) as HTMLInputElement;
    // No × initially.
    expect(screen.queryByRole("button", { name: /Очистить/i })).not.toBeInTheDocument();

    fireEvent.change(input, { target: { value: "https://t.me/whatever" } });
    const clearBtn = screen.getByRole("button", { name: /Очистить/i });
    expect(clearBtn).toBeInTheDocument();

    fireEvent.click(clearBtn);
    expect(input.value).toBe("");
    expect(screen.queryByRole("button", { name: /Очистить/i })).not.toBeInTheDocument();
  });

  it("main CTA always opens SubmitModal in link mode (canon 0.3.0)", () => {
    // canon 0.3.0: «link OR photo, never both». Main CTA = link path
    // regardless of what's pasted (waitlist URLs surface the inline
    // panel in Hero, not a special modal-routing decision). User can
    // switch to photo mode inside the modal via the pill-tabs.
    render(<Hero />);
    fireEvent.change(screen.getByPlaceholderText(/Вставьте ссылку/i), {
      target: { value: "https://t.me/barbershop_samara" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Собрать сайт/ }));

    // canon's SubmitModal opens at Step 2 (contact) because URL is
    // present — heading is «Куда вам писать?» (S3_StepContact).
    expect(screen.getByRole("heading", { name: /Куда вам писать/i })).toBeInTheDocument();
  });

  it("waitlist panel uses warn (amber) styling, not info (blue)", () => {
    // User batch 2 (B6): testers read the previous info-soft blue
    // tint as "all clear, proceed". Amber/warn signals "this isn't
    // yet supported" more honestly. The classNames carry the colour
    // tokens so we assert on those rather than computed CSS.
    render(<Hero />);
    fireEvent.change(screen.getByPlaceholderText(/Вставьте ссылку/i), {
      target: { value: "https://www.instagram.com/anna_master" },
    });
    const banner = screen.getByText(/скоро будет — оставьте email/i);
    // The text node lives inside the styled <p>. Walk up one level.
    const styledParent = banner.closest("p");
    expect(styledParent).not.toBeNull();
    expect(styledParent!.className).toMatch(/bg-warn-soft/);
    expect(styledParent!.className).not.toMatch(/bg-info-soft/);
  });

  it("contact step inside canon SubmitModal is reachable via main CTA (canon 0.3.0)", () => {
    // Internal channel-radio layout is canon's responsibility — we only
    // assert that we route to the contact step correctly. Detailed step
    // markup lives in canon's S3_StepContact and is covered there.
    render(<Hero />);
    fireEvent.change(screen.getByPlaceholderText(/Вставьте ссылку/i), {
      target: { value: "https://t.me/barbershop_samara" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Собрать сайт/ }));
    expect(screen.getByRole("heading", { name: /Куда вам писать/i })).toBeInTheDocument();
  });
});
