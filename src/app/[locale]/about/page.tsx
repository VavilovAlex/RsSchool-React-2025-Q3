import TextLink from "@components/link/TextLink.tsx";
import { getTranslations } from "next-intl/server";

export default async function About() {
  const t = await getTranslations("About");

  return (
    <div className={"w-full h-full flex flex-col items-center justify-center"}>
      <div className={"p-4 bg-blue-100 rounded"}>
        <title>{t("title")}</title>
        <div className={"text-xl"}>{t("pageTitle")}</div>
        <div>{t("author")}</div>
        <TextLink href={"https://rs.school/courses/reactjs"} target={"_blank"}>
          {t("rsSchool")}
        </TextLink>
      </div>
    </div>
  );
}
