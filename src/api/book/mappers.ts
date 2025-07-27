import type {
  ApiBookDetailsResponse,
  ApiBookDocument,
  ApiBookSearchResponse,
} from "./types.ts";
import type {
  Author,
  Book,
  BookDetailsResponse,
  BookSearchResponse,
} from "./models.ts";

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

  if (book.author_key && book.author_name) {
    for (let i = 0; i < book.author_key.length; i++) {
      authors.push({
        id: book.author_key[i],
        name: book.author_name[i],
      });
    }
  }

  return {
    key: book.key,
    firstPublishYear: book.first_publish_year,
    title: book.title,
    authors: authors,
    languages: book.language,
  };
}

export function fromBookDetailsResponse(
  details: ApiBookDetailsResponse,
): BookDetailsResponse {
  let description: string | null = null;

  if (typeof details.description === "string") {
    description = details.description;
  } else if (
    typeof details.description === "object" &&
    details.description.type === "/type/text"
  ) {
    description = details.description.value;
  }

  return {
    description: description,
    key: details.key,
    subjects: details.subjects,
    title: details.title,
  };
}
