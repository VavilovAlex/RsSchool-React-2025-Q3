import { Component } from "react";
import type { BookSearchResponse } from "../../../api/book/models.ts";
import Spinner from "../../../components/spinner/Spinner.tsx";
import Link from "../../../components/link/Link.tsx";

interface Props {
  result: BookSearchResponse | null;
}

class ApiResults extends Component<Props> {
  render() {
    const { result } = this.props;

    return (
      <div>
        <table className={"default-table"}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Year</th>
              <th>Authors</th>
              <th>Open library</th>
            </tr>
          </thead>
          <tbody>
            {result == null ? (
              <tr>
                <td colSpan={4}>
                  <div className={"flex justify-center items-center mt-4"}>
                    <Spinner />
                  </div>
                </td>
              </tr>
            ) : (
              <>
                {result.books.length === 0 && (
                  <tr>
                    <td colSpan={4} className={"italic"}>
                      No results found.
                    </td>
                  </tr>
                )}
                {result.books.map((book) => (
                  <tr key={book.key}>
                    <td>{book.title}</td>
                    <td>{book.firstPublishYear}</td>
                    <td>
                      {book.authors.map((author) => author.name).join(", ")}
                    </td>
                    <td>
                      <Link
                        href={"https://openlibrary.org/" + book.key}
                        target={"_blank"}
                      >
                        Link
                      </Link>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ApiResults;
