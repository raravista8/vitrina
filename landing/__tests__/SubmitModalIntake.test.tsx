import "@testing-library/jest-dom/vitest";

import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Mock the metrika wrapper so we can assert funnel goals without a counter.
vi.mock("@/lib/metrika", () => ({ reachGoal: vi.fn() }));

import { SubmitModal } from "@/components/SubmitModal";
import { reachGoal } from "@/lib/metrika";

const reachGoalMock = vi.mocked(reachGoal);

// ---- fixtures --------------------------------------------------------------

const CANDIDATE = {
  id: "cand-1",
  name: "Студия маникюра Анны",
  address: "Большой пр. П.С., 32, Санкт-Петербург",
  rating: { value: 4.9, count: 38 },
  photo: null,
};

const READY_DRAFT = {
  source: "yandex_maps",
  name: "Студия Анны",
  category: "Маникюр",
  district: "Петроградский район",
  rating: { value: 4.9, count: 38 },
  photos: [],
  reviews: [],
  services: [{ title: "Маникюр с покрытием", price: "2 400 ₽" }],
  theme_id: "display-soft",
  family_id: "display",
};

// ---- fetch routing ---------------------------------------------------------

function json(body: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
    ...init,
  });
}

type RouteHandler = (url: string, init?: RequestInit) => Response | undefined;

function stubFetch(handler: RouteHandler) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url =
        typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
      const res = handler(url, init);
      if (!res) return new Response("Not Found", { status: 404 });
      return res;
    }) as unknown as typeof fetch,
  );
}

// ---- helpers ---------------------------------------------------------------

function renderModal(overrides: { initialUrl?: string } = {}) {
  return render(
    <SubmitModal
      open
      onOpenChange={() => undefined}
      initialMode="link"
      initialUrl={overrides.initialUrl ?? ""}
    />,
  );
}

/** Drive the rev.2 entry: ниша «Маникюр» → пример → шаг «Источник». */
function goToSourceStep() {
  fireEvent.click(screen.getByRole("button", { name: "Маникюр" }));
  fireEvent.click(screen.getByRole("button", { name: /Заменить на ваши данные/ }));
  expect(screen.getByRole("heading", { name: /Найдём ваше дело/ })).toBeInTheDocument();
}

function runSearch(query = "Студия маникюра Анны") {
  fireEvent.change(screen.getByPlaceholderText("Студия маникюра Анны"), {
    target: { value: query },
  });
  fireEvent.click(screen.getByRole("button", { name: /Найти на Картах/ }));
}

beforeEach(() => {
  reachGoalMock.mockClear();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

// ---- entry routing ---------------------------------------------------------

describe("SubmitModal — instant-preview entry routing (canon 0.11.0 rev.2)", () => {
  it("empty-handed open (link mode, no URL) starts at шаге 0 «Ниша»", () => {
    renderModal();
    expect(screen.getByRole("heading", { name: /Чем занимаетесь/ })).toBeInTheDocument();
    // All 10 niche plaques from NICHE_LIB render.
    expect(screen.getByRole("button", { name: "Маникюр" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Психолог" })).toBeInTheDocument();
  });

  it("open with a Hero URL keeps the classic link flow (no entry steps)", () => {
    renderModal({ initialUrl: "https://t.me/barbershop_samara" });
    // Old behaviour: URL present → step 2 contact, exactly as before rev.2.
    expect(screen.getByRole("heading", { name: /Куда вам писать/ })).toBeInTheDocument();
    expect(screen.queryByText(/Чем занимаетесь/)).toBeNull();
  });

  it("ниша → пример → источник: client-side, no network", () => {
    stubFetch(() => {
      throw new Error("no network calls expected on шаги 0/0b");
    });
    renderModal();

    fireEvent.click(screen.getByRole("button", { name: "Маникюр" }));
    // Шаг 0b «Пример» — штамп ПРИМЕР + CTA «Заменить на ваши данные».
    expect(screen.getByText("ПРИМЕР")).toBeInTheDocument();
    expect(screen.getByText(/Так выглядит сайт для ниши «Маникюр»/)).toBeInTheDocument();
    expect(reachGoalMock).toHaveBeenCalledWith("intake_niche_pick", { niche: "manicure" });
    expect(reachGoalMock).toHaveBeenCalledWith("intake_demo_view");

    fireEvent.click(screen.getByRole("button", { name: /Заменить на ваши данные/ }));
    expect(screen.getByRole("heading", { name: /Найдём ваше дело/ })).toBeInTheDocument();
    expect(reachGoalMock).toHaveBeenCalledWith("intake_demo_claim");
  });
});

// ---- source search ---------------------------------------------------------

describe("SubmitModal — source search states", () => {
  it("429 with Retry-After → ratelimited countdown", async () => {
    stubFetch((url) => {
      if (url.includes("/api/preview/search")) {
        return new Response("", { status: 429, headers: { "Retry-After": "42" } });
      }
      return undefined;
    });
    renderModal();
    goToSourceStep();
    runSearch();

    expect(await screen.findByText(/Слишком много запросов/)).toBeInTheDocument();
    expect(screen.getByText(/0:42/)).toBeInTheDocument();
    expect(reachGoalMock).toHaveBeenCalledWith("intake_source_search");
  });

  it("backend absent (404) → network state with the «Вставить ссылку» escape", async () => {
    // stubFetch's default for unmatched routes is a 404 — exactly the
    // graceful-degradation case (preview backend not deployed yet).
    stubFetch(() => undefined);
    renderModal();
    goToSourceStep();
    runSearch();

    expect(await screen.findByText(/Карты не отвечают/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Вставить ссылку/ })).toBeInTheDocument();
  });

  it("0 candidates → empty state", async () => {
    stubFetch((url) =>
      url.includes("/api/preview/search")
        ? json({ ok: true, data: { candidates: [] } })
        : undefined,
    );
    renderModal();
    goToSourceStep();
    runSearch();

    expect(await screen.findByText(/Не нашли на Картах/)).toBeInTheDocument();
  });
});

// ---- draft build → preview --------------------------------------------------

describe("SubmitModal — draft build, morph and preview", () => {
  it("candidate pick → poll ready → preview → claim → contact", async () => {
    stubFetch((url, init) => {
      if (url.includes("/api/preview/search")) {
        return json({ ok: true, data: { candidates: [CANDIDATE] } });
      }
      if (url.endsWith("/api/preview/draft") && init?.method === "POST") {
        return json({ ok: true, data: { draft_id: "draft-1" } });
      }
      if (url.includes("/api/preview/draft/draft-1")) {
        return json({
          ok: true,
          data: {
            status: "ready",
            stage: "styling",
            counts: { photos: 0, reviews: 1 },
            draft: READY_DRAFT,
          },
        });
      }
      return undefined;
    });
    renderModal();
    goToSourceStep();
    runSearch();

    // «Это вы?» candidate card → pick.
    fireEvent.click(await screen.findByRole("button", { name: /Студия маникюра Анны/ }));
    expect(reachGoalMock).toHaveBeenCalledWith("intake_candidate_pick");

    // Poll returns ready on the first tick → preview surface.
    expect(
      await screen.findByRole("heading", { name: /Вот черновик вашего сайта/ }),
    ).toBeInTheDocument();
    expect(reachGoalMock).toHaveBeenCalledWith("intake_preview_view");

    // CTA «Забрать сайт бесплатно» → контакт (preview-flow step 3).
    fireEvent.click(screen.getByRole("button", { name: /Забрать сайт бесплатно/ }));
    expect(reachGoalMock).toHaveBeenCalledWith("intake_draft_claim");
    expect(screen.getByRole("heading", { name: /Куда прислать готовый сайт/ })).toBeInTheDocument();
  });

  it("draft POST 404 (backend absent) → failed → contact with the rev.1 notice", async () => {
    stubFetch((url) => {
      if (url.includes("/api/preview/search")) {
        return json({ ok: true, data: { candidates: [CANDIDATE] } });
      }
      // POST /api/preview/draft falls through → 404.
      return undefined;
    });
    renderModal();
    goToSourceStep();
    runSearch();
    fireEvent.click(await screen.findByRole("button", { name: /Студия маникюра Анны/ }));

    // Canon's previewFlow failed branch renders the contact step inline.
    expect(
      await screen.findByRole("heading", { name: /Куда прислать готовый сайт/ }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Не дотянулись до источника/)).toBeInTheDocument();
  });
});
