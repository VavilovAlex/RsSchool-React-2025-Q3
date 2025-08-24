import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Modal from "./";

describe("Modal", () => {
  it("does not render when closed", () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()}>
        <div>Content</div>
      </Modal>,
    );

    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("has aria-modal set to true", () => {
    render(
      <Modal isOpen onClose={vi.fn()}>
        <div>Content</div>
      </Modal>,
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  it("renders dialog and children when open", () => {
    render(
      <Modal isOpen onClose={vi.fn()}>
        <div>Hello</div>
      </Modal>,
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("calls onClose when clicking on backdrop", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <Modal isOpen onClose={onClose}>
        <div>Body</div>
      </Modal>,
    );

    const dialog = screen.getByRole("dialog");
    const backdrop = dialog.parentElement as HTMLElement;

    await user.click(backdrop);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose when clicking inside dialog", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <Modal isOpen onClose={onClose}>
        <button>Inside</button>
      </Modal>,
    );

    await user.click(screen.getByText("Inside"));

    expect(onClose).not.toHaveBeenCalled();
  });

  it("calls onClose when pressing Escape", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <Modal isOpen onClose={onClose}>
        <div>Body</div>
      </Modal>,
    );

    await user.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
