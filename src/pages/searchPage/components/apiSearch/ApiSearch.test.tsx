import { describe, it, expect, beforeEach, vi } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";

import ApiSearch, { type ApiSearchResult } from "./ApiSearch.tsx";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  LOCALSTORAGE_SEARCH_KEY,
} from "./ApiSearch.constants.ts";
import renderWithRouter from "@/test-utils/renderWithRouter.tsx";
import type { BookSearchResponse } from "@api/book/models.ts";
import { searchBooks } from "@api/book/client.ts";

vi.mock("@api/book/client");

const mockedSearchBooks = vi.mocked(searchBooks);

const render = renderWithRouter;

const FAKE_RESPONSE: BookSearchResponse = {
  books: [
    {
      key: "",
      firstPublishYear: 0,
      title: "",
      authors: [],
      languages: [],
    },
  ],
  start: 5,
  numFound: 13,
};

describe("ApiSearch component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.localStorage.clear();

    mockedSearchBooks.mockResolvedValue(FAKE_RESPONSE);
  });

  it("reads localStorage on load and triggers search with retrieved value", async () => {
    window.localStorage.setItem(LOCALSTORAGE_SEARCH_KEY, "stored value");

    const onUpdate = vi.fn();

    render(<ApiSearch onUpdate={onUpdate} />);

    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toBe("stored value");

    await waitFor(() => {
      expect(mockedSearchBooks).toHaveBeenCalledWith(
        "stored value",
        expect.anything(),
      );
    });
  });

  it("writes trimmed value to localStorage on submit", async () => {
    const onUpdate = vi.fn();

    render(<ApiSearch onUpdate={onUpdate} />);

    // Clear mocks from auto trigger noise
    vi.clearAllMocks();

    const input = screen.getByRole("textbox") as HTMLInputElement;
    const form = screen.getByRole("form");

    fireEvent.change(input, { target: { value: "       new text      " } });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(window.localStorage.getItem(LOCALSTORAGE_SEARCH_KEY)).toBe(
        "new text",
      );
    });
  });

  it("on submit: emits loading, calls searchBooks, then emits success", async () => {
    const onUpdate = vi.fn();

    render(<ApiSearch onUpdate={onUpdate} />);

    expect(onUpdate).toHaveBeenCalledWith({
      status: "loading",
    } as ApiSearchResult);

    await waitFor(() => {
      expect(mockedSearchBooks).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
      );
      expect(onUpdate).toHaveBeenCalledWith({
        status: "success",
        data: expect.anything(),
      } as ApiSearchResult);
    });
  });

  it("calls onSuccess with input value on submit", async () => {
    const onUpdate = vi.fn();

    render(<ApiSearch onUpdate={onUpdate} />);

    // Clear mocks from auto trigger noise
    vi.clearAllMocks();

    const input = screen.getByRole("textbox") as HTMLInputElement;
    const form = screen.getByRole("form");

    fireEvent.change(input, { target: { value: "harry potter" } });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(onUpdate).toHaveBeenCalledWith({
        status: "loading",
      } as ApiSearchResult);

      expect(mockedSearchBooks).toHaveBeenCalledWith(
        "harry potter",
        expect.anything(),
      );

      expect(onUpdate).toHaveBeenCalledWith({
        status: "success",
        data: FAKE_RESPONSE,
      } as ApiSearchResult);
    });
  });

  it("calls searchBooks with pagination from url", async () => {
    const onUpdate = vi.fn();

    const PAGE = 5;
    const PAGE_SIZE = 13;

    render(<ApiSearch onUpdate={onUpdate} />, {
      routerOptions: {
        initialEntries: [`?page=${PAGE}&pageSize=${PAGE_SIZE}`],
      },
    });

    await waitFor(() => {
      expect(mockedSearchBooks).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          page: PAGE,
          pageSize: PAGE_SIZE,
        }),
      );
    });
  });

  it("uses default pagination when no pagination in url", async () => {
    const onUpdate = vi.fn();

    render(<ApiSearch onUpdate={onUpdate} />, {
      routerOptions: {
        initialEntries: [`/`],
      },
    });

    await waitFor(() => {
      expect(mockedSearchBooks).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          page: DEFAULT_PAGE,
          pageSize: DEFAULT_PAGE_SIZE,
        }),
      );
    });
  });

  it("calls onUpdate with error when something goes wrong", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const onUpdate = vi.fn();

    const error = new Error("Test error");

    mockedSearchBooks.mockRejectedValue(error);

    render(<ApiSearch onUpdate={onUpdate} />);

    await waitFor(() => {
      expect(onUpdate).toHaveBeenCalledWith({
        status: "error",
        error,
      });

      expect(errorSpy).toHaveBeenCalled();
    });
  });
});
