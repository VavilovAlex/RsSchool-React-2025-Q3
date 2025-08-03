export interface CSVColumn<T> {
  header: string;
  selector: (row: T) => string;
}

function escapeCSV(value: unknown): string {
  const str = String(value ?? "");
  const escaped = str.replace(/"/g, '""');
  return `"${escaped}"`;
}

function stringifyRow<T>(data: T, columns: CSVColumn<T>[]): string {
  return columns.map((col) => escapeCSV(col.selector(data))).join(",");
}

export function stringifyCSV<T>(data: T[], columns: CSVColumn<T>[]) {
  if (columns.length === 0)
    throw new Error("At least one column must be provided");

  const headerLine = columns.map((col) => escapeCSV(col.header)).join(",");

  const rowLines = data.map((row) => stringifyRow(row, columns));

  return [headerLine, ...rowLines].join("\r\n");
}
