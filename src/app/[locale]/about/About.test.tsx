import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Page from "./page.tsx";

describe("About", () => {
  it("renders author name", () => {
    render(<Page />);

    expect(screen.getByText("My name is Alex")).toBeInTheDocument();
  });

  it("renders link to rs school", () => {
    render(<Page />);

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "https://rs.school/courses/reactjs",
    );
  });
});
