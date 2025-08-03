import TextLink from "@components/link/TextLink.tsx";
import type { Book } from "@api/book/models.ts";
import { useSearchParams } from "react-router";
import { type MouseEvent } from "react";
import { QUERY_DETAILS_ID } from "@pages/detailsPage/DetailsPage.constants.ts";
import CheckBox from "@components/checkBox/CheckBox.tsx";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.ts";
import {
  selectBook,
  unselectBook,
} from "@pages/searchPage/components/apiResults/apiResultsSlice.ts";

interface Props {
  book: Book;
}

export default function ApiResult(props: Props) {
  const { book } = props;

  const setSearchParams = useSearchParams()[1];

  const openDetails = (e: MouseEvent<HTMLTableRowElement>, id: string) => {
    e.stopPropagation();
    setSearchParams((params) => {
      params.set(QUERY_DETAILS_ID, id);
      return params;
    });
  };

  const isSelected = useAppSelector((state) =>
    state.apiResults.selectedBooks.some((b) => b.key == book.key),
  );

  const handleSelectionToggle = (val: boolean) => {
    dispatch(val ? selectBook(book) : unselectBook(book));
  };

  const dispatch = useAppDispatch();

  return (
    <tr
      role={"listitem"}
      key={book.key}
      onClick={(e) => openDetails(e, book.key)}
    >
      <td>
        <CheckBox checked={isSelected} onChange={handleSelectionToggle} />
      </td>
      <td>{book.title}</td>
      <td>{book.firstPublishYear}</td>
      <td>{book.authors.map((author) => author.name).join(", ")}</td>
      <td>
        <TextLink
          href={"https://openlibrary.org/" + book.key}
          target={"_blank"}
        >
          Link
        </TextLink>
      </td>
    </tr>
  );
}
