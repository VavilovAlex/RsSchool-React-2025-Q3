import type {
  ApiBookDetailsResponse,
  ApiBookSearchQuery,
  ApiBookSearchResponse,
} from "./types.ts";
import type { PaginationOptions } from "@/shared/types/pagination.ts";
import { fromApiResponse, fromBookDetailsResponse } from "./mappers.ts";
import type { BookDetailsResponse, BookSearchResponse } from "./models.ts";
import { toQueryParams } from "@/shared/utils/queryParams.ts";
import { HttpError } from "@/shared/errors/httpError.ts";

export async function searchBooks(
  query: string,
  pagination: PaginationOptions,
): Promise<BookSearchResponse> {
  const requestOptions: RequestInit = {
    method: "GET",
  };

  const queryParams: ApiBookSearchQuery = {
    q: query == "" ? "*" : query,
    page: pagination.page,
    limit: pagination.pageSize,
    sort: "rating desc",
  };

  const response = await fetch(
    "https://openlibrary.org/search.json?" + toQueryParams(queryParams),
    requestOptions,
  );

  if (!response.ok) {
    const body = await response.text();
    throw new HttpError(
      response,
      `searchBooks failed with status ${response.status}: ${body}`,
    );
  }

  const searchResponse = (await response.json()) as ApiBookSearchResponse;

  return fromApiResponse(searchResponse);
}

export async function getBook(key: string): Promise<BookDetailsResponse> {
  const requestOptions: RequestInit = {
    method: "GET",
  };

  if (key.startsWith("/")) {
    key = key.substring(1);
  }

  const response = await fetch(
    `https://openlibrary.org/${key}.json`,
    requestOptions,
  );

  if (!response.ok) {
    const body = await response.text();
    throw new HttpError(
      response,
      `getBook failed with status ${response.status}: ${body}`,
    );
  }

  const searchResponse = (await response.json()) as ApiBookDetailsResponse;

  return fromBookDetailsResponse(searchResponse);
}
