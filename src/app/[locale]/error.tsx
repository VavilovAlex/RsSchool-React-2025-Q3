"use client";

import { useEffect } from "react";
import Button from "@components/button/Button.tsx";
import { useTranslations } from "next-intl";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Error");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={"flex flex-col items-center justify-center w-full h-full"}>
      <div
        className={"border rounded p-4 bg-red-100 flex gap-4 justify-center"}
      >
        <div className={"text-4xl mb-3"}>{t("title")}</div>
        <Button onClick={() => reset()} className={"text-lg"}>
          {t("reload")}
        </Button>
      </div>
    </div>
  );
}
