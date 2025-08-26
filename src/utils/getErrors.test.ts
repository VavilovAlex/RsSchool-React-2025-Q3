import { describe, it, expect } from "vitest";
import getErrors from "./getErrors";
import { z } from "zod";

describe("getErrors", () => {
  const schema = z.object({
    a: z.string().min(1, "A required"),
    b: z.number(),
  });

  it("returns empty object on success", () => {
    const res = schema.safeParse({ a: "x", b: 1 });
    expect(getErrors(res)).toEqual({});
  });

  it("maps first error message per field", () => {
    const res = schema.safeParse({ a: "", b: "nope" });
    const errs = getErrors(res);
    expect(errs.a).toBe("A required");
    expect(String(errs.b)).toContain("expected number");
  });
});
