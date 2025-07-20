import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Button from "./Button";

describe("Button", () => {
  it("renders button with provided text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  it("applies provided className", () => {
    const customClass = "test-class";

    render(<Button className={customClass}>Button</Button>);
    expect(screen.getByRole("button")).toHaveClass(customClass);
  });

  it("merges custom and default classes", () => {
    const customClass = "test-class";

    render(<Button className={customClass}></Button>);
    const btn = screen.getByRole("button");

    expect(btn).toHaveClass(customClass);

    expect(btn).toHaveClass("rounded", "bg-blue-500");
  });

  it("forwards HTML attributes to the button element", () => {
    render(
      <Button id="my-button" type="submit" data-test="foo">
        Submit
      </Button>,
    );
    const btn = screen.getByRole("button");
    expect(btn).toHaveAttribute("id", "my-button");
    expect(btn).toHaveAttribute("type", "submit");
    expect(btn).toHaveAttribute("data-test", "foo");
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("calls onClick handler when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Click me</Button>);

    await user.click(screen.getByRole("button"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
