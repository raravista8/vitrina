import "@testing-library/jest-dom/vitest";

import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Intake2Host, openIntake2 } from "@/components/intake2/host";
import { filterCities } from "@/components/intake2/cities";
import { DRAFT_KEY } from "@/components/intake2/state";

// ---- fetch stub -------------------------------------------------------------

function stubFetch(
  responder: (url: string, init?: RequestInit) => Response,
): ReturnType<typeof vi.fn> {
  const mock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const url =
      typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
    return responder(url, init);
  });
  vi.stubGlobal("fetch", mock as unknown as typeof fetch);
  return mock;
}

function ok202(): Response {
  return new Response(JSON.stringify({ ok: true, data: { application_id: "app-1" } }), {
    status: 202,
    headers: { "content-type": "application/json" },
  });
}

function err(status: number, code: string): Response {
  return new Response(JSON.stringify({ ok: false, error: code }), {
    status,
    headers: { "content-type": "application/json" },
  });
}

// ---- helpers ----------------------------------------------------------------

function openModal(entry = "hero", opts: { niche?: string; path?: string } = {}) {
  act(() => {
    openIntake2(entry, opts);
  });
}

function stepRoot(step: string): HTMLElement | null {
  return document.querySelector(`[data-intake-step="${step}"]`);
}

/** example → source (дефолтный путь name). */
function claimExample() {
  fireEvent.click(screen.getByRole("button", { name: /Собрать такой для меня/ }));
}

/** source (путь name) → booking. */
function fillNameAndGo(name = "Студия Анны", city = "Екатеринбург") {
  fireEvent.change(screen.getByPlaceholderText("Студия Анны"), { target: { value: name } });
  if (city) {
    fireEvent.change(screen.getByPlaceholderText("Начните вводить город"), {
      target: { value: city },
    });
  }
  fireEvent.click(screen.getByRole("button", { name: /Найти на Картах/ }));
}

/** booking (dikidi по умолчанию, без ссылки) → contacts. */
function bookingNext() {
  fireEvent.click(screen.getByRole("button", { name: /Дальше/ }));
}

/** contacts: telegram-ник + согласие. */
function fillContacts(contact = "@anna_nails") {
  fireEvent.change(screen.getByPlaceholderText("@username"), { target: { value: contact } });
  fireEvent.click(screen.getByRole("checkbox"));
}

beforeEach(() => {
  window.localStorage.clear();
  vi.unstubAllGlobals();
});

// ---- tests ------------------------------------------------------------------

describe("Intake2Host — событийный контракт", () => {
  it("открывается через openIntake2 на шаге примера", () => {
    render(<Intake2Host />);
    expect(stepRoot("example")).toBeNull();

    openModal("hero");

    expect(screen.getByText("Вот такой сайт соберём")).toBeInTheDocument();
    expect(stepRoot("example")).not.toBeNull();
  });

  it("entry с нишей преселектит таб ниши", () => {
    render(<Intake2Host />);
    openModal("example-Барбершоп", { niche: "Барбершоп" });

    const tab = document.querySelector('[data-niche-id="Барбершоп"]');
    expect(tab).not.toBeNull();
    expect(tab).toHaveAttribute("aria-selected", "true");
  });
});

describe("Intake2 — шаг источника", () => {
  it("выбор ниши и claim ведут на источник; путь A требует название", () => {
    render(<Intake2Host />);
    openModal();

    fireEvent.click(document.querySelector('[data-niche-id="Колорист"]')!);
    claimExample();

    expect(stepRoot("source")).not.toBeNull();
    const cta = screen.getByRole("button", { name: /Найти на Картах/ });
    expect(cta).toBeDisabled();
    expect(screen.getByText(/Осталось: название/)).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("Студия Анны"), {
      target: { value: "Ноготочки у Ани" },
    });
    expect(screen.getByRole("button", { name: /Найти на Картах/ })).toBeEnabled();
  });

  it("переключение путей сохраняет ввод каждого пути", () => {
    render(<Intake2Host />);
    openModal();
    claimExample();

    fireEvent.change(screen.getByPlaceholderText("Студия Анны"), {
      target: { value: "Ноготочки у Ани" },
    });

    // → путь C «ссылка»
    fireEvent.click(screen.getByRole("button", { name: /Есть ссылка на профиль/ }));
    fireEvent.change(screen.getByPlaceholderText("Я.Карты, 2ГИС, Telegram, Avito…"), {
      target: { value: "https://yandex.ru/maps/org/1" },
    });

    // ← обратно на путь A — название на месте
    fireEvent.click(screen.getByRole("button", { name: /Ввести название и город/ }));
    expect(screen.getByPlaceholderText("Студия Анны")).toHaveValue("Ноготочки у Ани");

    // → и ссылка тоже на месте
    fireEvent.click(screen.getByRole("button", { name: /Есть ссылка на профиль/ }));
    expect(screen.getByPlaceholderText("Я.Карты, 2ГИС, Telegram, Avito…")).toHaveValue(
      "https://yandex.ru/maps/org/1",
    );
  });
});

describe("Intake2 — шаг записи", () => {
  it("мусор вместо ссылки блокирует «Дальше» с причиной", () => {
    render(<Intake2Host />);
    openModal();
    claimExample();
    fillNameAndGo();

    expect(stepRoot("booking")).not.toBeNull();
    expect(screen.getByRole("button", { name: /Дальше/ })).toBeEnabled();

    fireEvent.change(screen.getByPlaceholderText("https://dikidi.net/…"), {
      target: { value: "это не ссылка" },
    });
    expect(screen.getByRole("button", { name: /Дальше/ })).toBeDisabled();
    expect(screen.getByText(/Осталось: рабочая ссылка — или очистите поле/)).toBeInTheDocument();
  });
});

describe("Intake2 — шаг контактов", () => {
  it("хранит значение отдельно на каждый канал", () => {
    render(<Intake2Host />);
    openModal();
    claimExample();
    fillNameAndGo();
    bookingNext();

    expect(stepRoot("contacts")).not.toBeNull();
    fireEvent.change(screen.getByPlaceholderText("@username"), { target: { value: "@anna" } });

    fireEvent.click(screen.getByRole("radio", { name: "Email" }));
    expect(screen.getByPlaceholderText("you@mail.ru")).toHaveValue("");
    fireEvent.change(screen.getByPlaceholderText("you@mail.ru"), {
      target: { value: "anna@mail.ru" },
    });

    fireEvent.click(screen.getByRole("radio", { name: "Telegram" }));
    expect(screen.getByPlaceholderText("@username")).toHaveValue("@anna");
  });
});

describe("Intake2 — отправка", () => {
  it("успешный сабмит шлёт корректный multipart и показывает «Готово»", async () => {
    const fetchMock = stubFetch(() => ok202());
    render(<Intake2Host />);
    openModal();
    claimExample();
    fillNameAndGo("Студия Анны", "Екатеринбург");
    bookingNext();
    fillContacts("@anna_nails");

    fireEvent.click(screen.getByRole("button", { name: /Отправить заявку/ }));

    await waitFor(() => expect(screen.getByText("Собираем ваш черновик")).toBeInTheDocument());

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("/api/submit-application/v2");
    const fd = init.body as FormData;
    expect(fd.get("source_path")).toBe("name");
    expect(fd.get("contact_channel")).toBe("telegram");
    expect(fd.get("contact")).toBe("@anna_nails");
    expect(fd.get("consent_given")).toBe("true");
    expect(fd.get("captcha_token")).toBe("DEV_TOKEN");
    expect(fd.get("niche")).toBe("Маникюр");
    expect(fd.get("business_name")).toBe("Студия Анны");
    expect(fd.get("city")).toBe("Екатеринбург");
    expect(fd.get("booking_platform")).toBe("dikidi");
    expect(fd.get("booking_url")).toBeNull(); // пустое поле не едет
    expect(fd.getAll("files")).toHaveLength(0); // путь name — без файлов

    // главная конверсия — submit_success ушёл в dataLayer (и в ym при counter)
    const dl = (window as unknown as { dataLayer?: Record<string, unknown>[] }).dataLayer ?? [];
    expect(dl.some((e) => e["event"] === "submit_success" && e["channel"] === "telegram")).toBe(
      true,
    );

    // done показывает контакт + «Изменить» возвращает на контакты
    expect(screen.getByText(/@anna_nails/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Изменить" }));
    expect(stepRoot("contacts")).not.toBeNull();
    expect(screen.getByPlaceholderText("@username")).toHaveValue("@anna_nails");
  });

  it("сбой отправки показывает «Повторить отправку» и сохраняет форму", async () => {
    const fetchMock = stubFetch(() => err(500, "internal_error"));
    render(<Intake2Host />);
    openModal();
    claimExample();
    fillNameAndGo();
    bookingNext();
    fillContacts("@anna_nails");

    fireEvent.click(screen.getByRole("button", { name: /Отправить заявку/ }));

    await waitFor(() =>
      expect(screen.getByRole("button", { name: /Повторить отправку/ })).toBeInTheDocument(),
    );
    // generic-плашка канона + форма не потеряна
    expect(screen.getByRole("alert")).toHaveTextContent(/Не получилось отправить заявку/);
    expect(screen.getByPlaceholderText("@username")).toHaveValue("@anna_nails");
    expect(fetchMock).toHaveBeenCalledTimes(1);

    // повторная попытка с живым бэкендом добирается до «Готово»
    stubFetch(() => ok202());
    fireEvent.click(screen.getByRole("button", { name: /Повторить отправку/ }));
    await waitFor(() => expect(screen.getByText("Собираем ваш черновик")).toBeInTheDocument());
  });

  it("ошибка контакта от бэкенда остаётся на шаге контактов с конкретным текстом", async () => {
    stubFetch(() => err(400, "invalid_contact_for_channel"));
    render(<Intake2Host />);
    openModal();
    claimExample();
    fillNameAndGo();
    bookingNext();
    fillContacts("@anna_nails");

    fireEvent.click(screen.getByRole("button", { name: /Отправить заявку/ }));

    await waitFor(() =>
      expect(screen.getByText(/Контакт не подходит к выбранному каналу/)).toBeInTheDocument(),
    );
    expect(stepRoot("contacts")).not.toBeNull();
  });
});

describe("Intake2 — черновик", () => {
  it("сохраняется в localStorage и восстанавливается с баннером", () => {
    const first = render(<Intake2Host />);
    openModal();
    claimExample();
    fireEvent.change(screen.getByPlaceholderText("Студия Анны"), {
      target: { value: "Ноготочки у Ани" },
    });

    const raw = window.localStorage.getItem(DRAFT_KEY);
    expect(raw).not.toBeNull();
    const draft = JSON.parse(raw!) as { step: string; form: { businessName: string } };
    expect(draft.step).toBe("source");
    expect(draft.form.businessName).toBe("Ноготочки у Ани");

    first.unmount();

    render(<Intake2Host />);
    openModal();
    // восстановлены шаг, ввод и баннер
    expect(screen.getByText(/Продолжаем с сохранённого места/)).toBeInTheDocument();
    expect(screen.getByText("Найдём ваше дело")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Студия Анны")).toHaveValue("Ноготочки у Ани");

    // «Начать заново» чистит черновик и возвращает на пример
    fireEvent.click(screen.getByRole("button", { name: "Начать заново" }));
    expect(window.localStorage.getItem(DRAFT_KEY)).toBeNull();
    expect(stepRoot("example")).not.toBeNull();
  });

  it("успешная отправка чистит черновик; закрытие грязной формы просит подтверждение", async () => {
    stubFetch(() => ok202());
    render(<Intake2Host />);
    openModal();
    claimExample();
    fillNameAndGo();

    // закрытие «грязной» формы → confirm-оверлей, «Продолжить заполнение» возвращает
    fireEvent.click(screen.getByRole("button", { name: "Закрыть" }));
    expect(screen.getByText("Закрыть форму?")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Продолжить заполнение" }));
    expect(screen.queryByText("Закрыть форму?")).toBeNull();

    bookingNext();
    fillContacts();
    fireEvent.click(screen.getByRole("button", { name: /Отправить заявку/ }));
    await waitFor(() => expect(screen.getByText("Собираем ваш черновик")).toBeInTheDocument());

    expect(window.localStorage.getItem(DRAFT_KEY)).toBeNull();
  });
});

describe("intake2/cities", () => {
  it("фильтрует города по подстроке без регистра", () => {
    expect(filterCities("екатер")).toContain("Екатеринбург");
    expect(filterCities("")).toHaveLength(6);
    expect(filterCities("нет-такого-города")).toHaveLength(0);
  });
});
