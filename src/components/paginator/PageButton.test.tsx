import { render, screen } from "@testing-library/react";
import PageButton from "@components/paginator/PageButton.tsx";
import { beforeEach } from "vitest";

describe("PageButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders page number", () => {
    const onClick = vi.fn();

    render(<PageButton current={false} pageNum={5} onClick={onClick} />);

    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("changes color when current", () => {
    const onClick = vi.fn();

    render(<PageButton current={true} pageNum={5} onClick={onClick} />);

    expect(screen.getByText("5")).toHaveClass("bg-blue-700");
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();

    render(<PageButton current={false} pageNum={5} onClick={onClick} />);

    screen.getByText("5").click();

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
