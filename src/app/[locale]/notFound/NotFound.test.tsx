import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import NotFoundMessage from "./page.tsx";

vi.mock("next-intl/server", () => ({
  getTranslations: async (namespace?: string) => {
    const messages: Record<string, Record<string, string>> = {
      NotFound: {
        title: "404 - Page not found",
      },
    };
    const ns = typeof namespace === "string" ? namespace : "NotFound";
    return (key: string) => messages[ns]?.[key] ?? key;
  },
}));

describe("NotFound", () => {
  it("should render text", async () => {
    const element = await NotFoundMessage();
    render(element);

    expect(screen.getByText("404 - Page not found")).toBeInTheDocument();
  });
});
