import { Component } from "react";
import type { BookSearchResponse } from "../../../api/book/models.ts";

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
                <td colSpan={4} className={"italic"}>
                  Search results will appear here
                </td>
              </tr>
            ) : (
              <>
                {result.books.length === 0 && (
                  <tr>
                    <td colSpan={2} className={"italic"}>
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
                      <a
                        href={"https://openlibrary.org/" + book.key}
                        target={"_blank"}
                        rel="noreferrer"
                        className={
                          "text-blue-500 hover:underline cursor-pointer hover:text-blue-700 active:text-blue-900 visited:text-purple-600"
                        }
                      >
                        Link
                      </a>
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
