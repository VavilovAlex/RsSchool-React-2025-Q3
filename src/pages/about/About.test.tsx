import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import About from "@pages/about/About.tsx";

describe("About", () => {
  it("renders author name", () => {
    render(<About />);

    expect(screen.getByText("My name is Alex")).toBeInTheDocument();
  });

  it("renders link to rs school", () => {
    render(<About />);

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "https://rs.school/",
    );
  });
});
