import ApiSearch from "./components/ApiSearch.tsx";
import ApiResults from "./components/ApiResults.tsx";
import Section from "./components/Section.tsx";
import type { BookSearchResponse } from "../../api/book/models.ts";
import Button from "../../components/button/Button.tsx";
import type { HttpError } from "../../shared/errors/httpError.ts";
import { useCallback, useState } from "react";
import type { PaginationOptions } from "../../shared/types/pagination.ts";

export default function SearchPage() {
  const [response, setResponse] = useState<BookSearchResponse | null>(null);
  const [errorToThrow, setErrorToThrow] = useState<Error | null>(null);
  const [searchError, setSearchError] = useState<Error | null>(null);
  const [pagination] = useState<PaginationOptions>({
    page: 1,
    pageSize: 10,
  });

  const handleSearchSuccess = useCallback((response: BookSearchResponse) => {
    setResponse(response);
    setSearchError(null);
  }, []);

  const handleSearchStart = useCallback(() => {
    setResponse(null);
  }, []);

  const handleSearchError = useCallback((error: Error) => {
    setSearchError(error);
    setResponse({ numFound: 0, start: 0, books: [] });
  }, []);

  const throwTest = () => {
    setErrorToThrow(new Error("Test error"));
  };

  if (errorToThrow != null) throw errorToThrow;

  const httpError = searchError as HttpError;

  return (
    <div className={"flex flex-col items-center w-full h-full p-4"}>
      <div className={"flex flex-col gap-4 max-w-[1200px] w-full"}>
        <Section title={"Search"}>
          <ApiSearch
            onSearchStart={handleSearchStart}
            onSearchSuccess={handleSearchSuccess}
            onSearchError={handleSearchError}
            pagination={pagination}
          />
        </Section>
        {searchError && (
          <Section title={"Search error"} className={"bg-red-100"}>
            Search failed with code: {httpError.statusCode}
          </Section>
        )}
        <Section title={"Results"}>
          <ApiResults result={response} />
        </Section>
        <Section title={"Test"}>
          <Button onClick={throwTest}>Trigger Error Boundary</Button>
        </Section>
      </div>
    </div>
  );
}
