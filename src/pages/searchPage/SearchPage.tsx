import ApiSearch, {
  type ApiSearchResult,
} from "./components/apiSearch/ApiSearch.tsx";
import ApiResults from "./components/apiResults/ApiResults.tsx";
import Section from "@components/section/Section.tsx";
import type { BookSearchResponse } from "@api/book/models.ts";
import type { HttpError } from "@shared/errors/httpError.ts";
import { useState } from "react";
import SelectionState from "@pages/searchPage/components/selectionState/SelectionState.tsx";

export default function SearchPage() {
  const [response, setResponse] = useState<BookSearchResponse | null>(null);
  const [searchError, setSearchError] = useState<Error | null>(null);

  const handleSearchUpdate = (result: ApiSearchResult) => {
    switch (result.status) {
      case "loading":
        setResponse(null);
        setSearchError(null);
        break;
      case "success":
        setSearchError(null);
        setResponse(result.data);
        break;
      case "error":
        setSearchError(result.error);
        setResponse({ numFound: 0, start: 0, books: [] });
    }
  };

  const httpError = searchError as HttpError;

  return (
    <div className={"flex flex-col gap-4 max-w-[1200px] w-full"}>
      <Section title={"Search"}>
        <ApiSearch onUpdate={handleSearchUpdate} />
      </Section>
      {searchError && (
        <Section title={"Search error"} className={"bg-red-100"}>
          Search failed with code: {httpError.statusCode}
        </Section>
      )}
      <Section title={"Results"}>
        <ApiResults result={response} />
      </Section>
      <SelectionState />
    </div>
  );
}
