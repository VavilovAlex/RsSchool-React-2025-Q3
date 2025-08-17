import { describe, expect, it } from "vitest";
import { type CSVColumn, stringifyCSV } from "./csv";

describe("csv", () => {
  const columns: CSVColumn<string>[] = [
    { header: "Header", selector: (row) => row },
  ];

  it("should throw when no columns provided", () => {
    expect(async () => await stringifyCSV([], [])).toThrow();
  });

  it("should return header only no data provided", async () => {
    expect(await stringifyCSV([], columns)).toBe('"Header"');
  });

  it("should return correct string when data provided", async () => {
    expect(await stringifyCSV(["test", "test2"], columns)).toBe(
      '"Header"\r\n"test"\r\n"test2"',
    );
  });

  it("should escape commas", async () => {
    expect(await stringifyCSV(["test,test2"], columns)).toBe(
      '"Header"\r\n"test,test2"',
    );
  });

  it("should escape quotes", async () => {
    expect(await stringifyCSV(['"test"'], columns)).toBe(
      '"Header"\r\n"""test"""',
    );
  });
});
