import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import renderWithReduxAndLocale from "@/test-utils/renderWithReduxAndLocale.tsx";
import Navbar from "@components/navbar/Navbar.tsx";
import { ThemeProvider } from "@/context/ThemeContext.tsx";

const render = renderWithReduxAndLocale;

describe("Navbar", () => {
  it("renders localized links and buttons", () => {
    render(
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>,
    );

    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Invalidate Book Cache" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Light Mode" }),
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "RU" })).toBeInTheDocument();
  });
});
