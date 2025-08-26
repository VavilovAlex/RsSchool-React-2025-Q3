import { describe, it, expect } from "vitest";
import fileToBase64 from "./fileToBase64";

function toBase64(s: string) {
  if (typeof btoa !== "undefined") return btoa(s);
  return Buffer.from(s, "binary").toString("base64");
}

describe("fileToBase64", () => {
  it("converts a File to a data URL base64 string", async () => {
    const content = "hello world";
    const file = new File([content], "test.txt", { type: "text/plain" });
    const res = await fileToBase64(file);
    expect(res).toBe(`data:text/plain;base64,${toBase64(content)}`);
  });
});
