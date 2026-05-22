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

    // H1 + sub (v2 / PR-G — three «сам» pattern).
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent(/сам себя соберёт/i);
    expect(h1).toHaveTextContent(/сам обновит/i);
    expect(h1).toHaveTextContent(/сам приведёт клиентов/i);
    // v2.1.3 §1.1 — Hero subtitle переписан: «Покажите ссылку на ваше
    // дело» → «Покажите ссылку» (короче) + `<b>` болды.
    expect(screen.getByText(/Покажите ссылку — карты/i)).toBeInTheDocument();

    // Brand — Cyrillic only (legal requirement, PRD §3).
    const brand = screen.getAllByText("Самосайт");
    expect(brand.length).toBeGreaterThan(0);

    // CTA + microcopy.
    expect(screen.getByRole("button", { name: /Сделать Самосайт/ })).toBeInTheDocument();
    expect(
      screen.getByText(/Первый месяц — бесплатно\. Самосайт сам напомнит/i),
    ).toBeInTheDocument();

    // Benefits stack удалён из Hero в v2 — теперь живёт в <BigFeatures />
    // секцией ниже. Здесь убеждаемся что в Hero его нет.
    expect(screen.queryByText(/^Сам обновляется$/)).toBeNull();
    expect(screen.queryByText(/^Сам ловит заявки$/)).toBeNull();
    expect(screen.queryByText(/^Сам находится в поиске$/)).toBeNull();
  });

  it("ships fallback link for photo (closed-TG moved to FAQ in PR-G)", () => {
    render(<Hero />);
    expect(
      screen.getByText(/Загрузить фото работ, скриншот профиля или\sвизитку/i),
    ).toBeInTheDocument();
    // «Закрытый TG-канал — загрузить экспорт» удалён из Hero в PR-G:
    // user testing flagged that это редкий сценарий который путал
    // mainstream-юзеров на самом видном месте. Переехал в FAQ.
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
    const button = screen.getByRole("button", { name: /Сделать Самосайт/ });
    expect(button).not.toBeDisabled();
  });

  it("CTA stays enabled after pasting a Telegram URL", async () => {
    render(<Hero />);
    const input = screen.getByPlaceholderText(/ссылка на соцсеть/i);
    fireEvent.change(input, { target: { value: "https://t.me/barbershop_samara" } });

    const button = screen.getByRole("button", { name: /Сделать Самосайт/ });
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
    expect(screen.getByRole("button", { name: /Сделать Самосайт/ })).not.toBeDisabled();
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
    expect(screen.getByRole("button", { name: /Сделать Самосайт/ })).not.toBeDisabled();
  });

  it("clicking the photo-upload fallback opens the PhotoDrawer (PR-B #6)", () => {
    render(<Hero />);
    // Drawer is closed initially — the heading lives inside it.
    expect(screen.queryByRole("heading", { name: /Загрузите фото/i })).not.toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", { name: /Загрузить фото работ, скриншот профиля или\sвизитку/i }),
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

  it("shows the compact platform list under the form", () => {
    render(<Hero />);
    // v2.1.3 §1.3 — старая «Поддерживаем: …» микрокопия заменена на
    // compact-list block с kicker «ИЗ ЧЕГО МЫ МОЖЕМ СДЕЛАТЬ ВАМ САЙТ»
    // + chips с brand glyphs. Список всегда виден (не зависит от input).
    expect(screen.getByText(/из чего мы можем сделать вам сайт/i)).toBeInTheDocument();
    // Use exact match to scope to compact-list items (avoid matching
    // «Telegram или визитку» в Hero subtitle).
    expect(screen.getByText("Я.Карты")).toBeInTheDocument();
    expect(screen.getByText("Telegram")).toBeInTheDocument();
    expect(screen.getByText("Avito")).toBeInTheDocument();
  });

  it("keeps the compact platform list visible after the user types", () => {
    render(<Hero />);
    // v2.1.3 §1.3 — compact list постоянно виден (раньше скрывался при
    // paste). Reason: brand-recognition value высокий, badge внизу
    // (SourceDetectionBadge) для recognized source не конфликтует.
    fireEvent.change(screen.getByPlaceholderText(/ссылка на соцсеть/i), {
      target: { value: "https://t.me/some_channel" },
    });
    expect(screen.getByText(/из чего мы можем сделать вам сайт/i)).toBeInTheDocument();
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
    // B1 root-cause fix: previously, clicking «Сделать Самосайт»
    // with an IG/VK/2GIS URL pasted opened the modal with a bogus
    // sourceType="telegram" fallback, mislabelling the source in
    // step 2. Now it opens the photo flow — symmetric with the
    // parallel «создайте из фото сейчас» CTA.
    render(<Hero />);
    fireEvent.change(screen.getByPlaceholderText(/ссылка на соцсеть/i), {
      target: { value: "https://www.instagram.com/marusya" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Сделать Самосайт/ }));

    // PhotoDrawer is open — its heading is the unique marker.
    expect(screen.getByRole("heading", { name: /Загрузите фото/i })).toBeInTheDocument();
    // SubmitModal is NOT open — no «Куда отправлять заявки» heading.
    expect(screen.queryByRole("heading", { name: /Куда вам писать/i })).not.toBeInTheDocument();
  });

  it("main CTA with an MVP URL opens the SubmitModal (no regression)", () => {
    render(<Hero />);
    fireEvent.change(screen.getByPlaceholderText(/ссылка на соцсеть/i), {
      target: { value: "https://t.me/barbershop_samara" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Сделать Самосайт/ }));

    expect(screen.getByRole("heading", { name: /Куда вам писать/i })).toBeInTheDocument();
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

  it("modal step 2 shows explicit channel radio (4 options) — no auto-detect (v2)", () => {
    // PR-D (E12) — explicit radio replaces v1's single auto-detect input.
    // Tester feedback from batch 2 (B5): «машинально начала вводить email,
    // не понимая что система принимает все 4 канала». Radio = явный выбор.
    render(<Hero />);
    fireEvent.change(screen.getByPlaceholderText(/ссылка на соцсеть/i), {
      target: { value: "https://t.me/barbershop_samara" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Сделать Самосайт/ }));

    // All 4 channels rendered as radio
    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(4);
    expect(radios.map((r) => (r as HTMLInputElement).value).sort()).toEqual([
      "email",
      "max",
      "phone",
      "telegram",
    ]);
    // Default = email (most universal)
    const emailRadio = radios.find((r) => (r as HTMLInputElement).value === "email")!;
    expect((emailRadio as HTMLInputElement).checked).toBe(true);
    // Input под выбранный канал (email by default)
    expect(screen.getByPlaceholderText("you@example.ru")).toBeInTheDocument();
  });

  it("switching to phone radio swaps placeholder and enables phone autoformat (v2)", () => {
    // Прогрессивное phone-форматирование теперь живёт ТОЛЬКО когда
    // channel=phone (для других каналов оставляем raw). Server делает
    // canonical E.164 normalisation через phonenumbers.
    render(<Hero />);
    fireEvent.change(screen.getByPlaceholderText(/ссылка на соцсеть/i), {
      target: { value: "https://t.me/barbershop_samara" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Сделать Самосайт/ }));

    // Click phone radio
    const phoneRadio = screen
      .getAllByRole("radio")
      .find((r) => (r as HTMLInputElement).value === "phone")!;
    fireEvent.click(phoneRadio);
    const phoneInput = screen.getByPlaceholderText("+7 ...") as HTMLInputElement;
    expect(phoneInput).toBeInTheDocument();

    // Phone format kicks in
    fireEvent.change(phoneInput, { target: { value: "9167388689" } });
    expect(phoneInput.value).toBe("+7 (916) 738-86-89");
  });

  it("«← Назад» on SubmitModal step 1 closes the modal and preserves the Hero input", () => {
    // B2 root-cause fix: testers reported "никак не могу вернуться на
    // шаг 1" — the ✕ in the corner wasn't recognised as a back path.
    // The labelled chevron makes it obvious and survives Hero state.
    render(<Hero />);
    const input = screen.getByPlaceholderText(/ссылка на соцсеть/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "https://t.me/barbershop_samara" } });
    fireEvent.click(screen.getByRole("button", { name: /Сделать Самосайт/ }));

    // Modal is open with the back button labelled.
    const backBtn = screen.getByRole("button", { name: /^Назад$/ });
    fireEvent.click(backBtn);

    // Modal gone, Hero input preserved.
    expect(screen.queryByRole("heading", { name: /Куда вам писать/i })).not.toBeInTheDocument();
    expect(input.value).toBe("https://t.me/barbershop_samara");
  });
});
