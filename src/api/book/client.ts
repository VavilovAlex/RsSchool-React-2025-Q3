import type { ApiBookSearchQuery, ApiBookSearchResponse } from "./types.ts";
import type { PaginationOptions } from "../../shared/types/pagination.ts";
import { fromApiResponse } from "./mappers.ts";
import type { BookSearchResponse } from "./models.ts";
import { toQueryParams } from "../../shared/utils/queryParams.ts";
import { HttpError } from "../../shared/errors/httpError.ts";

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
