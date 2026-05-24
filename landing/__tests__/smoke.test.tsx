import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import HomePage from "@/app/page";

describe("scaffolding smoke", () => {
  it("renders the canonical H1 (canon 0.5.0 — соберётся из ссылки → работает сам)", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /соберётся из вашей ссылки/i }),
    ).toBeInTheDocument();
  });
});
