"use client";

import { ROUTES } from "@/utils/routes.ts";
import Button from "@components/button/Button.tsx";
import { useTheme } from "@/context/useTheme.tsx";
import { useInvalidateBooksMutation } from "@api/book/bookApi.ts";
import { Link } from "@/utils/navigation.ts";
import { useTranslations } from "next-intl";

export default function Navbar() {
  const theme = useTheme();
  const [invalidateBooks, { isLoading }] = useInvalidateBooksMutation();

  const t = useTranslations("Navbar");

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
          Invalidate Book Cache
        </Button>
        <Button onClick={() => theme.toggle()}>
          {theme.isDark ? "Dark Mode" : "Light Mode"}
        </Button>
      </div>
    </div>
  );
}
