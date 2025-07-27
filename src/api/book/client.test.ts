import { describe, it, expect, vi } from "vitest";
import { getBook, searchBooks } from "./client.ts";
import type { ApiBookDetailsResponse, ApiBookSearchResponse } from "./types.ts";
import * as mappers from "./mappers.ts";
import type { BookDetailsResponse, BookSearchResponse } from "./models.ts";
import { HttpError } from "@shared/errors/httpError.ts";

const mappedResponse: BookSearchResponse = { books: [], start: 0, numFound: 0 };

describe("searchBooks", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("calls fetch with correct URL and returns mapper output", async () => {
    const mockResponse: ApiBookSearchResponse = {
      numFound: 0,
      start: 0,
      docs: [],
    };

    vi.spyOn(mappers, "fromApiResponse").mockReturnValue(mappedResponse);

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      }),
    );

    const pagination = { page: 2, pageSize: 5 };
    const query = "harry potter";
    const expectedParams = "?q=harry+potter&page=2&limit=5&sort=rating+desc";

    const result = await searchBooks(query, pagination);

    expect(fetch).toHaveBeenCalledWith(
      "https://openlibrary.org/search.json" + expectedParams,
      { method: "GET" },
    );

    expect(mappers.fromApiResponse).toHaveBeenCalled();
    expect(result).toEqual(mappedResponse);
  });

  it("throws error when response is not ok", async () => {
    const response = {
      ok: false,
      status: 400,
      text: async () => "Bad Request",
    } as Response;

    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response));

    const pagination = { page: 2, pageSize: 5 };
    const query = "harry potter";

    await expect(searchBooks(query, pagination)).rejects.toThrow(
      new HttpError(
        response,
        "searchBooks failed with status 400: Bad Request",
      ),
    );
  });
});

describe("getBook", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("calls fetch with correct URL and returns mapper output", async () => {
    const mockResponse: ApiBookDetailsResponse = {
      title: "The Hero of Ages",
      description: "...",
      key: "/works/OL5738154W",
      subjects: ["A", "B", "C"],
    };

    const mappedResponse: BookDetailsResponse = {
      title: "mapped",
      description: "...",
      key: "/works/OL5738154W",
      subjects: ["A", "B", "C"],
    };

    vi.spyOn(mappers, "fromBookDetailsResponse").mockReturnValue(
      mappedResponse,
    );

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      }),
    );

    const key = "/works/OL5738154W";
    const result = await getBook(key);

    expect(fetch).toHaveBeenCalledWith(
      `https://openlibrary.org/works/OL5738154W.json`,
      {
        method: "GET",
      },
    );

    expect(mappers.fromBookDetailsResponse).toHaveBeenCalled();
    expect(result).toEqual(mappedResponse);
  });

  it("throws error when response is not ok", async () => {
    const response = {
      ok: false,
      status: 400,
      text: async () => "Bad Request",
    } as Response;

    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response));

    const key = "invalid*5555";

    await expect(getBook(key)).rejects.toThrow(
      new HttpError(response, "getBook failed with status 400: Bad Request"),
    );
  });
});
