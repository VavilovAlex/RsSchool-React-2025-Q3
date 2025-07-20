import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Spinner from "./Spinner";

describe("Spinner", () => {
  it("renders a div with the animate-spin class", () => {
    const { container } = render(<Spinner />);
    const spinner = container.firstChild as HTMLElement;

    expect(spinner.tagName).toBe("DIV");

    expect(spinner).toHaveClass("animate-spin");
  });
});
