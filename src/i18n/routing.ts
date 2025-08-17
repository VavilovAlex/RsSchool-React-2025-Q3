import { defineRouting } from "next-intl/routing";
import { defaultLocale, locales } from "@/i18n/locales.ts";

export const routing = defineRouting({
  locales: locales,

  defaultLocale: defaultLocale,
});
