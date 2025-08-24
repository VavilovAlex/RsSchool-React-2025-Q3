import { render, screen, within, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import Modal from ".";
import type { ReactNode } from "react";

function Wrapper({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {children}
    </Modal>
  );
}

describe("Modal", () => {
  it("renders with role dialog and aria-modal when open", () => {
    const onClose = vi.fn();
    render(
      <Wrapper isOpen={true} onClose={onClose}>
        <div>Content</div>
      </Wrapper>,
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(document.body.contains(dialog)).toBe(true);
  });

  it("does not render when closed", () => {
    const onClose = vi.fn();
    render(
      <Wrapper isOpen={false} onClose={onClose}>
        <div>Content</div>
      </Wrapper>,
    );
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("closes on ESC key", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Wrapper isOpen={true} onClose={onClose}>
        <button>ok</button>
      </Wrapper>,
    );
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalled();
  });

  it("closes on backdrop click but not on inner click", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Wrapper isOpen={true} onClose={onClose}>
        <div>Inner</div>
      </Wrapper>,
    );
    const dialog = screen.getByRole("dialog");
    const backdrop = dialog.parentElement as HTMLElement;
    await user.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(1);

    onClose.mockClear();
    cleanup();
    render(
      <Wrapper isOpen={true} onClose={onClose}>
        <div>Inner</div>
      </Wrapper>,
    );
    const dialog2 = screen.getByRole("dialog");
    await user.click(within(dialog2).getByText("Inner"));
    expect(onClose).not.toHaveBeenCalled();
  });
});
