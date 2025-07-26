import { type ChangeEvent, useCallback, useEffect, useState } from "react";
import TextInput from "../../../components/textInput/TextInput.tsx";
import AsyncButton from "../../../components/button/AsyncButton.tsx";
import { searchBooks } from "../../../api/book/client.ts";
import type { PaginationOptions } from "../../../shared/types/pagination.ts";
import type { BookSearchResponse } from "../../../api/book/models.ts";

interface Props {
  onSearchSuccess: (response: BookSearchResponse) => void;
  onSearchStart: () => void;
  onSearchError: (error: Error) => void;
  pagination: PaginationOptions;
}

export default function ApiSearch({
  onSearchSuccess,
  onSearchStart,
  onSearchError,
  pagination,
}: Props) {
  const [storedSearchText] = useState(
    localStorage.getItem("apiSearchText") ?? "",
  );
  const [searchText, setSearchText] = useState(storedSearchText);

  const handleSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSearchText(value);
  };

  const search = useCallback(
    async (text: string, pagination: PaginationOptions) => {
      const normalizedSearchText = text.trim();

      setSearchText(normalizedSearchText);

      localStorage.setItem("apiSearchText", normalizedSearchText);

      onSearchStart();

      try {
        const result = await searchBooks(normalizedSearchText, pagination);
        onSearchSuccess(result);
      } catch (e) {
        console.error(e);
        onSearchError(e as Error);
      }
    },

    [onSearchError, onSearchStart, onSearchSuccess],
  );

  useEffect(() => {
    search(storedSearchText, pagination).catch(console.error);
  }, [pagination, search, storedSearchText]);

  return (
    <div className="flex flex-row w-full gap-1">
      <TextInput
        className={"w-full"}
        value={searchText}
        onChange={handleSearchTextChange}
      />
      <AsyncButton onClick={() => search(searchText, pagination)}>
        Search
      </AsyncButton>
    </div>
  );
}
