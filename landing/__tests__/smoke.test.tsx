import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import HomePage from "@/app/page";

describe("scaffolding smoke", () => {
  it("renders the canonical H1 (v2 three-«сам» pattern)", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /сам себя соберёт/i }),
    ).toBeInTheDocument();
  });
});
