import { describe, it, expect } from "vitest";
import { fromApiResponse, fromBookDetailsResponse } from "./mappers";
import type { ApiBookDetailsResponse, ApiBookSearchResponse } from "./types";
import type { BookDetailsResponse, BookSearchResponse } from "./models";

describe("fromApiResponse", () => {
  const apiResponse: ApiBookSearchResponse = {
    numFound: 1,
    start: 0,
    docs: [
      {
        cover_i: 14658094,
        has_fulltext: true,
        edition_count: 27,
        title: "The Hero of Ages",
        author_key: ["OL1394865A", "FGG5435FFF"],
        author_name: ["Brandon Sanderson", "Bob Johnson"],
        first_publish_year: 2008,
        ia: ["bohaterwiekow0000sand", "elheroedelaseras0000sand"],
        key: "/works/OL5738154W",
        language: ["eng", "pol", "spa"],
        public_scan_b: false,
      },
    ],
  } as ApiBookSearchResponse;

  it("maps the response to the expected shape", () => {
    const expectedResponse: BookSearchResponse = {
      start: 0,
      numFound: 1,
      books: [
        {
          key: "/works/OL5738154W",
          title: "The Hero of Ages",
          firstPublishYear: 2008,
          authors: [
            { id: "OL1394865A", name: "Brandon Sanderson" },
            { id: "FGG5435FFF", name: "Bob Johnson" },
          ],
          languages: ["eng", "pol", "spa"],
        },
      ],
    };

    const result: BookSearchResponse = fromApiResponse(apiResponse);

    expect(result).toEqual(expectedResponse);
  });

  it("return empty authors when no authors are present", () => {
    const apiResponse: ApiBookSearchResponse = {
      numFound: 1,
      start: 0,
      docs: [
        {
          cover_i: 14658094,
          has_fulltext: true,
          edition_count: 27,
          title: "The Hero of Ages",
          first_publish_year: 0,
          key: "",
          ia: [],
          public_scan_b: false,
          language: [],
        },
      ],
    };

    const result: BookSearchResponse = fromApiResponse(apiResponse);

    expect(result.books[0].authors.length).toEqual(0);
  });
});

describe("fromBookDetailsResponse", () => {
  it("maps the details response to the expected shape", () => {
    const apiResponse: ApiBookDetailsResponse = {
      title: "The Hero of Ages",
      description: {
        type: "/type/text",
        value: "...",
      },
      key: "/works/OL5738154W",
      subjects: ["A", "B", "C"],
    };

    const expected: BookDetailsResponse = {
      title: "The Hero of Ages",
      description: "...",
      key: "/works/OL5738154W",
      subjects: ["A", "B", "C"],
    };

    const result: BookDetailsResponse = fromBookDetailsResponse(apiResponse);

    expect(result).toEqual(expected);
  });
});
