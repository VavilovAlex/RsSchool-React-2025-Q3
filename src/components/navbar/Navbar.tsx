"use client";

import { ROUTES } from "@/utils/routes.ts";
import Button from "@components/button/Button.tsx";
import { useTheme } from "@/context/useTheme.tsx";
import { useInvalidateBooksMutation } from "@api/book/bookApi.ts";
import { Link, usePathname, useRouter } from "@/utils/navigation.ts";
import { useLocale, useTranslations } from "next-intl";
import { locales, type Locale } from "@/i18n/locales.ts";

export default function Navbar() {
  const theme = useTheme();
  const [invalidateBooks, { isLoading }] = useInvalidateBooksMutation();

  const t = useTranslations("Navbar");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const nextLocale =
    locales[(locales.indexOf(locale as Locale) + 1) % locales.length];

  const toggleLocale = () => {
    router.replace(pathname, { locale: nextLocale });
  };

  const nextLocaleLabel = nextLocale.toUpperCase();

  return (
    <div
      className={
        "w-full flex gap-5 justify-between items-center px-4 bg-blue-100 dark:bg-blue-900"
      }
    >
      <div className={"flex py-4 gap-5"}>
        <Link href={ROUTES.Home()}>{t("home")}</Link>
        <Link href={ROUTES.About}>{t("about")}</Link>
      </div>
      <div className={"flex py-4 gap-5"}>
        <Button onClick={() => invalidateBooks(null)} disabled={isLoading}>
          {t("invalidateCache")}
        </Button>
        <Button onClick={() => theme.toggle()}>
          {theme.isDark ? t("darkMode") : t("lightMode")}
        </Button>
        <Button onClick={toggleLocale}>{nextLocaleLabel}</Button>
      </div>
    </div>
  );
}
