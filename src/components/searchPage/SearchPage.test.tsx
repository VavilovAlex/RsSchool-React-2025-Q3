import renderWithRouterAndRedux from "@/test-utils/renderWithRouterAndRedux.tsx";
import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchPage from "./SearchPage";

const render = renderWithRouterAndRedux;

describe("SearchPage", () => {
  it("renders Search and Results sections", () => {
    render(<SearchPage />);

    expect(screen.getByRole("heading", { name: "Search" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Results" }),
    ).toBeInTheDocument();
  });
});
