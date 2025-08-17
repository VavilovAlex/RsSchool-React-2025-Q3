import TextLink from "@components/link/TextLink.tsx";
import type { Book } from "@api/book/models.ts";
import { type MouseEvent } from "react";
import { QUERY_DETAILS_ID } from "@components/detailsPage/DetailsPage.constants.ts";
import CheckBox from "@components/checkBox/CheckBox.tsx";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.ts";
import {
  selectBook,
  unselectBook,
} from "@components/searchPage/components/apiResults/apiResultsSlice.ts";
import { useMutableSearchParams } from "@/hooks/useMutableSearchParams.tsx";
import { useTranslations } from "next-intl";

interface Props {
  book: Book;
}

export default function ApiResult(props: Props) {
  const { book } = props;

  const t = useTranslations("SearchPage");

  const { setSearchParams } = useMutableSearchParams();

  const openDetails = (e: MouseEvent<HTMLTableRowElement>, id: string) => {
    e.stopPropagation();
    setSearchParams([{ key: QUERY_DETAILS_ID, value: id }]);
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
          {t("link")}
        </TextLink>
      </td>
    </tr>
  );
}
