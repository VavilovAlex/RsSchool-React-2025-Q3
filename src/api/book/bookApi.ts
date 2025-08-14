import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  ApiBookDetailsResponse,
  ApiBookSearchResponse,
} from "@api/book/types.ts";
import type {
  BookDetailsResponse,
  BookSearchResponse,
} from "@api/book/models.ts";
import { fromApiResponse, fromBookDetailsResponse } from "@api/book/mappers.ts";

export interface SearchBooksArgs {
  q: string;
  page: number;
  limit: number;
}

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://openlibrary.org" }),
  tagTypes: ["Book", "Search"],
  endpoints: (builder) => ({
    searchBooks: builder.query<BookSearchResponse, SearchBooksArgs>({
      query: ({ q, page, limit }) => {
        const params = new URLSearchParams();
        params.set("q", q.trim() === "" ? "*" : q.trim());
        params.set("page", String(page));
        params.set("limit", String(limit));
        params.set("sort", "rating");
        return `/search.json?${params.toString()}`;
      },
      transformResponse: (response: ApiBookSearchResponse) =>
        fromApiResponse(response),
      keepUnusedDataFor: 300,
      providesTags: (result, _, arg) => {
        const searchId = `${arg.q}|${arg.page}|${arg.limit}`;

        const baseTags = [
          { type: "Search" as const, id: searchId },
          { type: "Book" as const, id: "LIST" },
        ];

        if (result && Array.isArray(result.books) && result.books.length > 0) {
          const bookTags = result.books.map((book) => ({
            type: "Book" as const,
            id: book.key,
          }));

          return [...baseTags, ...bookTags];
        }

        return baseTags;
      },
    }),
    getBook: builder.query<BookDetailsResponse, string>({
      query: (key) => {
        const normalized = key?.startsWith("/") ? key.slice(1) : key;
        return `/${normalized}.json`;
      },
      transformResponse: (response: ApiBookDetailsResponse) =>
        fromBookDetailsResponse(response),
      keepUnusedDataFor: 300,
      providesTags: (_book, _error, id) => {
        return [
          { type: "Book" as const, id },
          { type: "Book" as const, id: "LIST" },
        ];
      },
    }),
    invalidateBooks: builder.mutation<null, null>({
      queryFn: () => ({ data: null }),
      invalidatesTags: [{ type: "Book", id: "LIST" }],
    }),
  }),
});

export const {
  useSearchBooksQuery,
  useGetBookQuery,
  useInvalidateBooksMutation,
} = bookApi;
