import { getTranslations } from "next-intl/server";

export default async function NotFoundMessage() {
  const t = await getTranslations("NotFound");
  return (
    <div className={"w-full h-full flex justify-center items-center"}>
      <div className={"text-6xl p-6 bg-red-200 rounded-xl italic"}>
        {t("title")}
      </div>
    </div>
  );
}
