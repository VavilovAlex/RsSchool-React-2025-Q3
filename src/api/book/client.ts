import type { ApiBookSearchQuery, ApiBookSearchResponse } from "./types.ts";
import type { PaginationOptions } from "../../shared/types/pagination.ts";
import { fromApiResponse } from "./mappers.ts";
import type { BookSearchResponse } from "./models.ts";
import { toQueryParams } from "../../shared/utils/queryParams.ts";

export async function searchBooks(
  query: string,
  pagination: PaginationOptions,
): Promise<BookSearchResponse> {
  const requestOptions: RequestInit = {
    method: "GET",
  };

  const queryParams: ApiBookSearchQuery = {
    q: query,
    page: pagination.page,
    limit: pagination.pageSize,
  };

  const response = await fetch(
    "https://openlibrary.org/search.json?" + toQueryParams(queryParams),
    requestOptions,
  );

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`HTTP error! status: ${response.status}: ${body}`);
  }

  const searchResponse = (await response.json()) as ApiBookSearchResponse;

  return fromApiResponse(searchResponse);
}
