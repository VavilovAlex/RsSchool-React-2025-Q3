import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";
import { cleanup } from "@testing-library/react";
import mockRouter from "next-router-mock";
import {
  createTranslator,
  type NamespaceKeys,
  type NestedKeyOf,
} from "next-intl";
import enMessages from "./messages/en.json";
import Link from "next/link";

vi.mock("next/navigation", async () => {
  const actual = await vi.importActual<
    typeof import("next-router-mock/navigation")
  >("next-router-mock/navigation");
  return {
    ...actual,
  };
});

type Messages = typeof enMessages;
type NS = NamespaceKeys<Messages, NestedKeyOf<Messages>>;

vi.mock("next-intl/server", () => ({
  getTranslations: vi.fn(async (ns?: string) =>
    createTranslator({
      locale: "en",
      messages: enMessages,
      namespace: (ns ?? "About") as NS,
    }),
  ),
}));

vi.mock("next-intl/navigation", async () => {
  function createNavigation() {
    const useRouter = () => mockRouter;
    const usePathname = vi.fn();
    const redirect = vi.fn();

    return { Link, useRouter, usePathname, redirect };
  }

  return { createNavigation };
});

afterEach(() => {
  cleanup();
  mockRouter.reset();
});
