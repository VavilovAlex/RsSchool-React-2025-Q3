import TextLink from "@components/link/TextLink.tsx";
import type { Book } from "@api/book/models.ts";
import { useSearchParams } from "react-router";
import type { MouseEvent } from "react";
import { QUERY_DETAILS_ID } from "@pages/detailsPage/DetailsPage.constants.ts";

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

  return (
    <tr
      role={"listitem"}
      key={book.key}
      onClick={(e) => openDetails(e, book.key)}
    >
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
