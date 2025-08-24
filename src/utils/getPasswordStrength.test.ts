import { describe, it, expect } from "vitest";
import getPasswordStrength from "./getPasswordStrength";

describe("getPasswordStrength", () => {
  it("scores 0 for empty password with reasons", () => {
    const r = getPasswordStrength("");
    expect(r.score).toBe(0);
    expect(r.maxScore).toBe(4);
    expect(r.reasons.length).toBeGreaterThan(0);
  });
  it("scores 4 for strong password Aa1!", () => {
    const r = getPasswordStrength("Aa1!");
    expect(r.score).toBe(4);
    expect(r.reasons).toHaveLength(0);
  });
  it("partial scores produce reasons", () => {
    const r = getPasswordStrength("aaaa");
    expect(r.score).toBeGreaterThan(0);
    expect(r.reasons).toContain("Must contain at least one uppercase letter");
  });
});
