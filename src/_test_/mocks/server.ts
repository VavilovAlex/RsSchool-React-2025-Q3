import { setupServer } from "msw/node";
import { http } from "msw";
import type {
  ApiBookDetailsResponse,
  ApiBookSearchResponse,
} from "@api/book/types.ts";

export const FAKE_API_RESPONSE: ApiBookSearchResponse = {
  docs: [
    {
      key: "/works/OL123W",
      first_publish_year: 2000,
      title: "Test Book",
      author_name: ["Test Author"],
      author_key: ["123"],
      language: ["eng"],
      cover_i: 0,
      has_fulltext: false,
      edition_count: 0,
      ia: [],
      public_scan_b: false,
    },
  ],
  start: 5,
  numFound: 13,
};

export const FAKE_DETAILS_API_RESPONSE: ApiBookDetailsResponse = {
  description: "Lorem ipsum",
  key: "ASDAS324",
  subjects: ["A", "B", "C"],
  title: "Test Book",
};

const server = setupServer(
  http.get("https://openlibrary.org/search.json", () => {
    return new Response(JSON.stringify(FAKE_API_RESPONSE), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }),
  http.get("https://openlibrary.org/:path", () => {
    return new Response(JSON.stringify(FAKE_DETAILS_API_RESPONSE), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }),
);

export default server;
