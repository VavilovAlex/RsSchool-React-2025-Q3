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
  endpoints: (builder) => ({
    searchBooks: builder.query<BookSearchResponse, SearchBooksArgs>({
      query: ({ q, page, limit }) => {
        const params = new URLSearchParams();
        params.set("q", q.trim() === "" ? "*" : q.trim());
        params.set("page", String(page));
        params.set("limit", String(limit));
        return `/search.json?${params.toString()}`;
      },
      transformResponse: (response: ApiBookSearchResponse) =>
        fromApiResponse(response),
    }),
    getBook: builder.query<BookDetailsResponse, string>({
      query: (key) => {
        const normalized = key?.startsWith("/") ? key.slice(1) : key;
        return `/${normalized}.json`;
      },
      transformResponse: (response: ApiBookDetailsResponse) =>
        fromBookDetailsResponse(response),
    }),
  }),
});

export const { useSearchBooksQuery, useGetBookQuery } = bookApi;
