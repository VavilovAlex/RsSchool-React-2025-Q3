import type { SortDirection } from "@components/sortableColumn/sortTypes.ts";

export function compare<T>(left: T, right: T) {
  if (left == null && right == null) return 0;
  if (left == null) return -1;
  if (right == null) return 1;

  if (left === right) return 0;
  return left < right ? -1 : 1;
}

export function sortCompare<T>(left: T, right: T, sortDir: SortDirection) {
  return sortDir === "asc" ? compare(left, right) : compare(right, left);
}
