import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Link from "./Link";

describe("Link", () => {
  const props = {
    target: "_blank",
    href: "https://google.com",
    children: "Click Me!",
  };

  it("renders href with target", () => {
    render(<Link {...props} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", props.href);
    expect(link).toHaveAttribute("target", props.target);
  });

  it("renders children", () => {
    render(<Link {...props} />);
    expect(screen.getByText(props.children)).toBeInTheDocument();
  });
});
