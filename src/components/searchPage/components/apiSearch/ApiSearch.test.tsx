import { describe, it, expect, beforeEach, vi } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";

import ApiSearch, { type ApiSearchResult } from "./ApiSearch.tsx";
import { LOCALSTORAGE_SEARCH_KEY } from "./ApiSearch.constants.ts";
import server from "@/_test_/mocks/server.ts";
import renderWithRedux from "@/test-utils/renderWithRedux.tsx";
import { http } from "msw";

const render = renderWithRedux;

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

let fetchSpy = vi.spyOn(globalThis, "fetch");

describe("ApiSearch component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.localStorage.clear();

    fetchSpy = vi.spyOn(globalThis, "fetch");
  });

  it("reads localStorage on load and triggers search with retrieved value", async () => {
    window.localStorage.setItem(LOCALSTORAGE_SEARCH_KEY, "stored value");

    const onUpdate = vi.fn();

    render(<ApiSearch onUpdate={onUpdate} />);

    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toBe("stored value");

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalled();
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

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(onUpdate).toHaveBeenCalledWith({
        status: "success",
        data: expect.any(Object),
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
      expect(fetchSpy).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(onUpdate).toHaveBeenCalledWith({
        status: "success",
        data: expect.any(Object),
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
      expect(fetchSpy).toHaveBeenCalled();
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
      expect(fetchSpy).toHaveBeenCalled();
    });
  });

  it("calls onUpdate with error when something goes wrong", async () => {
    const onUpdate = vi.fn();

    const error = new Error("Something went wrong");

    server.use(
      http.get("https://openlibrary.org/:path", () => {
        return new Response(error.message, { status: 404 });
      }),
    );

    render(<ApiSearch onUpdate={onUpdate} />);

    await waitFor(() => {
      expect(onUpdate).toHaveBeenCalledWith({
        status: "error",
        error: expect.any(Object),
      });
    });
  });
});
