import { describe } from "vitest";
import { ROUTES } from "@/utils/routes.ts";

describe("routes", () => {
  it("return home string with no params", () => {
    const home = ROUTES.Home();
    expect(home).toBe("/");
  });

  it("return home string with page only", () => {
    const home = ROUTES.Home(1);
    expect(home).toBe("/?page=1");
  });

  it("return home string with page and pageSize", () => {
    const home = ROUTES.Home(5, 33);
    expect(home).toBe("/?page=5&pageSize=33");
  });
});
