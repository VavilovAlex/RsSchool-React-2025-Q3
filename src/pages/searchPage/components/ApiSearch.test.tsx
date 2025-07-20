import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

vi.mock("../../../api/book/client", () => ({
  searchBooks: vi.fn().mockResolvedValue({
    books: [],
    start: 0,
    numFound: 0,
  }),
}));

import ApiSearch from "./ApiSearch";

describe("ApiSearch component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.localStorage.clear();
  });

  it("reads localStorage on load and triggers an initial search", async () => {
    window.localStorage.setItem("apiSearchText", "stored value");

    const onStart = vi.fn();
    const onSuccess = vi.fn();
    const onError = vi.fn();

    render(
      <ApiSearch
        onSearchStart={onStart}
        onSearchSuccess={onSuccess}
        onSearchError={onError}
      />,
    );

    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toBe("stored value");

    expect(onStart).toHaveBeenCalled();
    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  it("writes trimmed value to localStorage on submit", async () => {
    const onStart = vi.fn();
    const onSuccess = vi.fn();
    const onError = vi.fn();

    render(
      <ApiSearch
        onSearchStart={onStart}
        onSearchSuccess={onSuccess}
        onSearchError={onError}
      />,
    );

    const input = screen.getByRole("textbox") as HTMLInputElement;
    const button = screen.getByRole("button", { name: /search/i });

    fireEvent.change(input, { target: { value: "  new text  " } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(window.localStorage.getItem("apiSearchText")).toBe("new text");
      expect(onStart).toHaveBeenCalled();
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  it("calls onSuccess with search results on submit", async () => {
    const onStart = vi.fn();
    const onSuccess = vi.fn();
    const onError = vi.fn();

    render(
      <ApiSearch
        onSearchStart={onStart}
        onSearchSuccess={onSuccess}
        onSearchError={onError}
      />,
    );

    const input = screen.getByRole("textbox") as HTMLInputElement;
    const button = screen.getByRole("button", { name: /search/i });

    fireEvent.change(input, { target: { value: "harry potter" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(onStart).toHaveBeenCalled();
      expect(onSuccess).toHaveBeenCalledWith({
        books: [],
        start: 0,
        numFound: 0,
      });
    });
  });
});
