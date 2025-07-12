export interface BookSearchResponse {
  start: number;
  numFound: number;
  books: Book[];
}

export interface Book {
  firstPublishYear: number;
  title: string;
  authors: Author[];
  languages: string[];
}

export interface Author {
  id: string;
  name: string;
}
