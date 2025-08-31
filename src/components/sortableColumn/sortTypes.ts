export interface SortState<T> {
  key: T;
  direction: SortDirection;
}

export type SortDirection = "asc" | "desc";
