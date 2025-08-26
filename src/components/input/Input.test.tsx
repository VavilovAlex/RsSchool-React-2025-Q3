import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Input from "./";

describe("Input", () => {
  it("renders a text input", () => {
    render(<Input value={""} onChange={() => {}} />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
  });

  it("uses the value when provided", () => {
    render(<Input value="hello" onChange={() => {}} />);
    expect(screen.getByRole("textbox")).toHaveValue("hello");
  });

  it("calls onChange when the user types", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Input onChange={onChange} />);
    const input = screen.getByRole("textbox");

    await user.type(input, "abc");
    expect(onChange).toHaveBeenCalledTimes(3);
  });

  it("applies custom className", () => {
    const customClass = "test-class";

    render(<Input className={customClass} value={""} onChange={() => {}} />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass(customClass);
  });

  it("copies name to id when id is not provided", () => {
    render(<Input name="email" value={""} onChange={() => {}} />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("name", "email");
    expect(input).toHaveAttribute("id", "email");
  });

  it("generates an id when neither id nor name provided and associates label", () => {
    render(<Input label="Email" value={""} onChange={() => {}} />);
    const input = screen.getByRole("textbox");
    const label = screen.getByText("Email");
    expect(input.id).toBeTruthy();
    expect(label).toHaveAttribute("for", input.id);
  });

  it("supports number inputs by type and exposes spinbutton role", () => {
    render(<Input type="number" value={5} onChange={() => {}} />);
    const input = screen.getByRole("spinbutton");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(5);
  });

  it("applies file-specific styles for file inputs", () => {
    render(<Input type="file" label="Attachment" />);
    const fileInput = screen.getByLabelText("Attachment");
    expect(fileInput).toHaveAttribute("type", "file");
    expect(fileInput).toHaveClass("cursor-pointer");
    expect(fileInput.className).toContain("file:px-3");
  });
});
