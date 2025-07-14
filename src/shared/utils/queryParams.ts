export function toQueryParams(obj: QueryParams): URLSearchParams {
  const entries = Object.entries(obj)
    .filter(([, v]) => v != null)
    .map(([k, v]) => [k, String(v)]);
  return new URLSearchParams(entries);
}

export interface QueryParams {
  [key: string]: string | number | boolean | null | undefined;
}
