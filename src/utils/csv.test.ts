import { describe, expect, it } from "vitest";
import { type CSVColumn, stringifyCSV } from "./csv";

describe("csv", () => {
  const columns: CSVColumn<string>[] = [
    { header: "Header", selector: (row) => row },
  ];

  it("should throw when no columns provided", () => {
    expect(() => stringifyCSV([], [])).toThrow();
  });

  it("should return header only no data provided", () => {
    expect(stringifyCSV([], columns)).toBe('"Header"');
  });

  it("should return correct string when data provided", () => {
    expect(stringifyCSV(["test", "test2"], columns)).toBe(
      '"Header"\r\n"test"\r\n"test2"',
    );
  });

  it("should escape commas", () => {
    expect(stringifyCSV(["test,test2"], columns)).toBe(
      '"Header"\r\n"test,test2"',
    );
  });

  it("should escape quotes", () => {
    expect(stringifyCSV(['"test"'], columns)).toBe('"Header"\r\n"""test"""');
  });
});
