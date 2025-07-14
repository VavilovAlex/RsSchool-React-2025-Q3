import type { ApiBookDocument, ApiBookSearchResponse } from "./types.ts";
import type { Author, Book, BookSearchResponse } from "./models.ts";

export function fromApiResponse(
  response: ApiBookSearchResponse,
): BookSearchResponse {
  return {
    start: response.start,
    numFound: response.numFound,
    books: response.docs.map(fromApiBook),
  };
}

export function fromApiBook(book: ApiBookDocument): Book {
  const authors: Author[] = [];

  for (let i = 0; i < book.author_key.length; i++) {
    authors.push({
      id: book.author_key[i],
      name: book.author_name[i],
    });
  }

  return {
    key: book.key,
    firstPublishYear: book.first_publish_year,
    title: book.title,
    authors: authors,
    languages: book.language,
  };
}
