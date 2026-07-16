/**
 * TODO(v5-cleanup): suites are SKIPPED — `components/Hero.tsx` is
 * @deprecated (retired by the «Витрина v5» recomposition, canon 0.12.0;
 * the landing hero is canon `V5_Hero` now). Page-level v5 assertions
 * (H1 «Сайт для бьюти-мастера за 2 часа» + hero CTA → intake2 event)
 * live in `__tests__/smoke.test.tsx`. Delete this file together with
 * the deprecated component in the v3-cleanup major.
 */
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

describe.skip("Hero — copy lock (v2 canonical, COPY.md §2.2)", () => {
  it("anchors COPY.md §2.2 strings verbatim", () => {
    render(<Hero />);

    // Eyebrow «САЙТ ДЛЯ ЗАЯВОК…» удалён в v2 — см. COPY.md §11.1.
    expect(screen.queryByText("САЙТ ДЛЯ ЗАЯВОК — ИЗ ТОГО, ЧТО У ВАС УЖЕ ЕСТЬ")).toBeNull();

    // H1 — canon 0.5.0: «Сайт, который соберётся из вашей ссылки — и
    // дальше работает сам» (two accent phrases, single SLA).
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent(/Соберём за/i);
    expect(h1).toHaveTextContent(/2 часа/i);
    expect(h1).toHaveTextContent(/сам становится лучше/i);
    // canon 0.5.0 — sub rewritten: opens with «Самосайт на базе ИИ»,
    // then «соберёт сайт за 2 часа» (single SLA), then the source list,
    // then «сам обновляет цены, отбирает отзывы и ловит заявки в
    // мессенджер». Was «Покажите ссылку — карты, Telegram или визитку.»
    expect(screen.getByText(/Покажите Самосайту/i)).toBeInTheDocument();

    // Brand «Самосайт» (Cyrillic per PRD §3) is rendered by the
    // <StickyHeader> sibling now (mounted from app/page.tsx in prod
    // — see SiteHeader.tsx + SiteHeader.test.tsx). Hero references the
    // brand only inside copy strings (CTA «Собрать сайт», microcopy
    // «Самосайт сам напомнит»). Assertion lives in SiteHeader.test.tsx.

    // CTA + pricing microcopy. canon 0.7.1 replaced the single-plan model
    // («990 ₽/мес · для первой сотни 490 ₽ навсегда») with a 5-tier
    // PricingMatrix; the Hero microcopy now reads «Тариф "Старт" —
    // бесплатно навсегда · платные от 690 ₽/мес · первый месяц на
    // платном бесплатно, карту привязывать не надо» so it stops
    // contradicting the matrix below.
    expect(screen.getByRole("button", { name: /Собрать сайт/ })).toBeInTheDocument();
    expect(screen.getByText(/первый месяц на платном бесплатно/i)).toBeInTheDocument();
    expect(screen.getByText(/от 690 ₽\/мес/)).toBeInTheDocument();
    // Reassurance microcopy «Самосайт сам напомнит» MUST be gone from
    // Hero (canon 0.2.5 fix). Guards against accidental re-introduction.
    expect(screen.queryByText(/Самосайт сам напомнит/i)).toBeNull();

    // Benefits stack удалён из Hero в v2 — теперь живёт в <BigFeatures />
    // секцией ниже. Здесь убеждаемся что в Hero его нет.
    expect(screen.queryByText(/^Сам обновляется$/)).toBeNull();
    expect(screen.queryByText(/^Сам ловит заявки$/)).toBeNull();
    expect(screen.queryByText(/^Сам находится в поиске$/)).toBeNull();
  });

  it("removes the photo-link companion + ships «СОБИРАЕМ ИЗ» chip-strip (canon 0.7.2)", () => {
    render(<Hero />);
    // canon 0.7.2 DESIGN_SPEC §1 NB: the «Нет ссылки? Загрузите фото…»
    // line is NOT in canon and must not be on prod. Guards re-introduction.
    expect(screen.queryByRole("button", { name: /Нет ссылки\? Загрузите фото/i })).toBeNull();
    // The «Закрытый TG-канал» link is gone (PR-G) and stays gone.
    expect(screen.queryByText(/Закрытый TG-канал/i)).toBeNull();
    // canon 0.7.2 §1a: the «СОБИРАЕМ ИЗ» ChipStrip is re-added via the
    // standalone canon export. Dual-render (sm: toggle) → appears twice
    // in jsdom (both variants in DOM).
    expect(screen.getAllByText(/СОБИРАЕМ ИЗ/i).length).toBeGreaterThanOrEqual(1);
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

describe.skip("Hero — interaction", () => {
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
    const input = screen.getByPlaceholderText(/Вставьте ссылку или загрузите фото/i);
    fireEvent.change(input, { target: { value: "https://t.me/barbershop_samara" } });

    const button = screen.getByRole("button", { name: /Собрать сайт/ });
    await waitFor(() => expect(button).not.toBeDisabled());
  });

  it("renders the ✓ badge with preview counts once the live preview lands", async () => {
    render(<Hero />);
    fireEvent.change(screen.getByPlaceholderText(/Вставьте ссылку или загрузите фото/i), {
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
    fireEvent.change(screen.getByPlaceholderText(/Вставьте ссылку или загрузите фото/i), {
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
    fireEvent.change(screen.getByPlaceholderText(/Вставьте ссылку или загрузите фото/i), {
      target: { value: "just some text" },
    });
    expect(screen.getByText(/Введите ссылку на Telegram-канал, Яндекс.Карты/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Собрать сайт/ })).not.toBeDisabled();
  });

  it("photo affordance lives in the input placeholder (canon 0.7.2)", () => {
    render(<Hero />);
    // canon 0.7.2 removed the standalone «Нет ссылки? Загрузите фото…»
    // link; the photo path is signalled by the single input placeholder
    // «Вставьте ссылку или загрузите фото» (actual upload via the
    // SubmitModal link/photo mode-switcher, tested in SubmitModal specs).
    expect(screen.getByPlaceholderText(/Вставьте ссылку или загрузите фото/i)).toBeInTheDocument();
  });
});

describe.skip("Hero — UX batch 1 (first user testing)", () => {
  beforeEach(() => {
    mockPreviewFetch(PREVIEW_OK);
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows the «Сначала посмотреть примеры» secondary link (canon 0.6.0)", () => {
    render(<Hero />);
    // canon 0.6.0 replaced the HeroPlatformStrip chip-row with a
    // secondary anchor «Сначала посмотреть примеры ↓» that scrolls
    // to the Examples section. Platforms list now lives in the
    // standalone <SourcesSection> further down the page.
    const link = screen.getByRole("link", { name: /Сначала посмотреть примеры/i });
    expect(link).toHaveAttribute("href", "#examples");
  });

  it("renders an × clear-button when input is non-empty; clears on click", () => {
    render(<Hero />);
    const input = screen.getByPlaceholderText(
      /Вставьте ссылку или загрузите фото/i,
    ) as HTMLInputElement;
    // No × initially.
    expect(screen.queryByRole("button", { name: /Очистить/i })).not.toBeInTheDocument();

    fireEvent.change(input, { target: { value: "https://t.me/whatever" } });
    const clearBtn = screen.getByRole("button", { name: /Очистить/i });
    expect(clearBtn).toBeInTheDocument();

    fireEvent.click(clearBtn);
    expect(input.value).toBe("");
    expect(screen.queryByRole("button", { name: /Очистить/i })).not.toBeInTheDocument();
  });

  it("empty-handed CTA opens the instant-preview niche entry (canon 0.11.0)", () => {
    // rev.2 «ниша-демо»: a CTA click with a blank Hero input routes the
    // modal to шаг 0 «Ниша» instead of the bare link input — see
    // docs/handoff/CANON_INSTANT_PREVIEW_REV2_TZ.md §1.
    render(<Hero />);
    fireEvent.click(screen.getByRole("button", { name: /Собрать сайт/ }));
    expect(screen.getByRole("heading", { name: /Чем занимаетесь/i })).toBeInTheDocument();
  });

  it("main CTA always opens SubmitModal in link mode (canon 0.3.0)", () => {
    // canon 0.3.0: «link OR photo, never both». Main CTA = link path
    // regardless of what's pasted (waitlist URLs surface the inline
    // panel in Hero, not a special modal-routing decision). User can
    // switch to photo mode inside the modal via the pill-tabs.
    render(<Hero />);
    fireEvent.change(screen.getByPlaceholderText(/Вставьте ссылку или загрузите фото/i), {
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
    fireEvent.change(screen.getByPlaceholderText(/Вставьте ссылку или загрузите фото/i), {
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
    fireEvent.change(screen.getByPlaceholderText(/Вставьте ссылку или загрузите фото/i), {
      target: { value: "https://t.me/barbershop_samara" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Собрать сайт/ }));
    expect(screen.getByRole("heading", { name: /Куда вам писать/i })).toBeInTheDocument();
  });
});
