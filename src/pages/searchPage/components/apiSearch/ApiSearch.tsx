import { type FormEvent, useEffect, useMemo, useState } from "react";
import TextInput from "../../../../components/textInput/TextInput.tsx";
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
import { useLocalStorage } from "@/hooks/useLocalStorage.tsx";
import { useSearchBooksQuery } from "@api/book/bookApi.ts";

interface Props {
  onUpdate: (response: ApiSearchResult) => void;
}

export type ApiSearchResult =
  | { status: "loading" }
  | { status: "success"; data: BookSearchResponse }
  | { status: "error"; error: Error };

export default function ApiSearch({ onUpdate }: Props) {
  const [storedSearchText, setStoredSearchText] = useLocalStorage<string>(
    LOCALSTORAGE_SEARCH_KEY,
    "",
  );

  const [submittedSearchText, setSubmittedSearchText] =
    useState(storedSearchText);
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

  const queryArg = useMemo(
    () => ({
      q: submittedSearchText,
      page: pagination.page,
      limit: pagination.pageSize,
    }),
    [submittedSearchText, pagination],
  );

  const { data, isLoading, isFetching, isError, error } =
    useSearchBooksQuery(queryArg);

  useEffect(() => {
    if (isLoading || isFetching) {
      setApiSearchResult({ status: "loading" });
    } else if (isError) {
      const errorMessage =
        "Error fetching data: " +
        ("error" in error
          ? error.error
          : "message" in error
            ? error.message
            : "status" in error
              ? error.status
              : "Unknown error");

      setApiSearchResult({
        status: "error",
        error: new Error(errorMessage),
      });
    } else if (data) {
      setApiSearchResult({ status: "success", data });
    }
  }, [isLoading, isFetching, isError, data, error]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const normalized = searchText.trim();
    setSubmittedSearchText(normalized);
    setStoredSearchText(normalized);
  };

  return (
    <form aria-label="Search books" onSubmit={handleSubmit}>
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
