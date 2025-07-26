import { useCallback, useEffect, useMemo, useState } from "react";
import TextInput from "../../../../components/textInput/TextInput.tsx";
import AsyncButton from "../../../../components/button/AsyncButton.tsx";
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

interface Props {
  onUpdate: (response: ApiSearchResult) => void;
}

export type ApiSearchResult =
  | { status: "loading" }
  | { status: "success"; data: BookSearchResponse }
  | { status: "error"; error: Error };

export default function ApiSearch({ onUpdate }: Props) {
  const [storedSearchText] = useState(
    localStorage.getItem(LOCALSTORAGE_SEARCH_KEY) ?? "",
  );
  const [searchText, setSearchText] = useState(storedSearchText);

  const [searchParams] = useSearchParams();

  const [apiSearchResult, setApiSearchResult] = useState<ApiSearchResult>({
    status: "loading",
  });

  useEffect(() => {
    onUpdate(apiSearchResult);
  }, [apiSearchResult, onUpdate]);

  const pagination = useMemo<PaginationOptions>(
    () => ({
      page: parseIntOrDefault(searchParams.get(QUERY_PAGE), DEFAULT_PAGE),
      pageSize: parseIntOrDefault(
        searchParams.get(QUERY_PAGE_SIZE),
        DEFAULT_PAGE_SIZE,
      ),
    }),
    [searchParams],
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
    search(storedSearchText, pagination).catch(console.error);
  }, [pagination, storedSearchText, search]);

  return (
    <div className="flex flex-row w-full gap-1">
      <TextInput
        className={"w-full"}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <AsyncButton onClick={() => search(searchText, pagination)}>
        Search
      </AsyncButton>
    </div>
  );
}
