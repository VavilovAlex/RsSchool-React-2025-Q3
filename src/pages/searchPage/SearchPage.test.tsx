import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchPage from "./SearchPage";
import renderWithRouter from "@/test-utils/renderWithRouter.tsx";

const render = renderWithRouter;

describe("SearchPage", () => {
  it("renders Search, Results and Test sections", () => {
    render(<SearchPage />);

    expect(screen.getByRole("heading", { name: "Search" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Results" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Test" })).toBeInTheDocument();
  });
});
