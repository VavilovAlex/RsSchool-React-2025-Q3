import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import ApiResults from "./ApiResults.tsx";
import type { Book, BookSearchResponse } from "@api/book/models.ts";
import renderWithRouter from "@/test-utils/renderWithRouter.tsx";

const render = renderWithRouter;

describe("ApiResults", () => {
  it("shows a spinner when result is null", () => {
    render(<ApiResults result={null} />);

    expect(screen.getByRole("spinner")).toBeInTheDocument();
  });

  it('shows "No results found." when books is empty', () => {
    const empty: BookSearchResponse = {
      start: 0,
      numFound: 0,
      books: [],
    };
    render(<ApiResults result={empty} />);
    expect(screen.getByText("No results found.")).toBeInTheDocument();
  });

  it("renders correct book info when books is not empty", () => {
    const mockResult: BookSearchResponse = {
      start: 0,
      numFound: 1,
      books: [
        {
          key: "OL1M",
          title: "My Book",
          firstPublishYear: 2021,
          authors: [{ id: "A1", name: "Alice" }],
          languages: ["en"],
        },
      ],
    };

    render(<ApiResults result={mockResult} />);

    expect(screen.getByText("My Book")).toBeInTheDocument();
    expect(screen.getByText("2021")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();

    const link = screen.getByRole("link", { name: "Link" });
    expect(link).toHaveAttribute("href", "https://openlibrary.org/OL1M");
  });

  it("render one row per book", () => {
    const books: Book[] = Array(10)
      .fill(null)
      .map((_, i) => ({
        key: `OL${i}`,
        title: "My Book",
        firstPublishYear: 2021,
        authors: [{ id: "123", name: "Bob" }],
        languages: ["en"],
      }));

    const mockResult: BookSearchResponse = {
      start: 0,
      numFound: 1,
      books: books,
    };

    render(<ApiResults result={mockResult} />);

    expect(screen.getAllByRole("listitem")).toHaveLength(books.length);
  });
});
