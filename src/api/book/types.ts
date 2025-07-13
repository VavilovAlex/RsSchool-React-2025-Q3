import type { QueryParams } from "../../shared/utils/queryParams.ts";

export interface ApiBookSearchQuery extends QueryParams {
  q: string;
  page: number;
  limit: number;
  sort: string;
}

export interface ApiBookSearchResponse {
  start: number;
  numFound: number;
  docs: ApiBookDocument[];
}

export interface ApiBookDocument {
  cover_i: number;
  has_fulltext: boolean;
  edition_count: number;
  title: string;
  author_name: string[];
  first_publish_year: number;
  key: string;
  ia: string[];
  author_key: string[];
  public_scan_b: boolean;
  language: string[];
}
