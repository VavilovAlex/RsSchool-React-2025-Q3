import { createNavigation } from "next-intl/navigation";
import { defaultLocale, locales } from "@/i18n/locales.ts";

export const { Link } = createNavigation({
  locales: locales,
  defaultLocale: defaultLocale,
});
