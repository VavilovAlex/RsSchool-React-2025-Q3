import { useCallback, useEffect, useMemo, useState } from "react";
import TextInput from "../../../../components/textInput/TextInput.tsx";
import { searchBooks } from "@api/book/client.ts";
import type { PaginationOptions } from "@shared/types/pagination.ts";
import type { BookSearchResponse } from "@api/book/models.ts";
import { useSearchParams } from "react-router";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  LOCALSTORAGE_SEARCH_KEY,
  QUERY_PAGE,
  QUERY_PAGE_SIZE,
} from "./ApiSearch.constants.ts";
import { parseIntOrDefault } from "@shared/utils/parse.ts";
import Button from "@components/button/Button.tsx";

interface Props {
  onUpdate: (response: ApiSearchResult) => void;
}

export type ApiSearchResult =
  | { status: "loading" }
  | { status: "success"; data: BookSearchResponse }
  | { status: "error"; error: Error };

export default function ApiSearch({ onUpdate }: Props) {
  const [submittedSearchText, setSubmittedSearchText] = useState(
    localStorage.getItem(LOCALSTORAGE_SEARCH_KEY) ?? "",
  );
  const [searchText, setSearchText] = useState(submittedSearchText);

  const [searchParams] = useSearchParams();

  const [apiSearchResult, setApiSearchResult] = useState<ApiSearchResult>({
    status: "loading",
  });

  useEffect(() => {
    onUpdate(apiSearchResult);
  }, [apiSearchResult, onUpdate]);

  const page = parseIntOrDefault(searchParams.get(QUERY_PAGE), DEFAULT_PAGE);
  const pageSize = parseIntOrDefault(
    searchParams.get(QUERY_PAGE_SIZE),
    DEFAULT_PAGE_SIZE,
  );

  const pagination = useMemo<PaginationOptions>(
    () => ({
      page: page,
      pageSize: pageSize,
    }),
    [page, pageSize],
  );

  const search = useCallback(
    async (text: string, pagination: PaginationOptions) => {
      const normalizedSearchText = text.trim();

      setSearchText(normalizedSearchText);

      localStorage.setItem(LOCALSTORAGE_SEARCH_KEY, normalizedSearchText);

      setApiSearchResult({ status: "loading" });

      try {
        const result = await searchBooks(normalizedSearchText, pagination);
        setApiSearchResult({ status: "success", data: result });
      } catch (e) {
        console.error(e);
        setApiSearchResult({
          status: "error",
          error: e as Error,
        });
      }
    },

    [],
  );

  useEffect(() => {
    search(submittedSearchText, pagination).catch(console.error);
  }, [pagination, submittedSearchText, search]);

  return (
    <form
      aria-label="Search books"
      onSubmit={() => setSubmittedSearchText(searchText)}
    >
      <div className="flex flex-row w-full gap-1">
        <TextInput
          className={"w-full"}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button type={"submit"}>Search</Button>
      </div>
    </form>
  );
}
