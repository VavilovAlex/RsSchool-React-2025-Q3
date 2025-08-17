"use server";

import { Book } from "@api/book/models.ts";
import { stringifyCSV } from "@/utils/csv.ts";

export async function booksToCsv(data: Book[]) {
  return await stringifyCSV(data, [
    {
      header: "Title",
      selector: (row) => row.title,
    },
    {
      header: "First Publish Year",
      selector: (row) => row.firstPublishYear.toString(),
    },
    {
      header: "Authors",
      selector: (row) => row.authors.map((author) => author.name).join(", "),
    },
    {
      header: "Link",
      selector: (row) => "https://openlibrary.org/" + row.key,
    },
  ]);
}
