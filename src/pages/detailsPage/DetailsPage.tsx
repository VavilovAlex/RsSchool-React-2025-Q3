import { useSearchParams } from "react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { QUERY_DETAILS_ID } from "@pages/detailsPage/DetailsPage.constants.ts";
import Section from "@components/section/Section.tsx";
import type { BookDetailsResponse } from "@api/book/models.ts";
import { getBook } from "@api/book/client.ts";
import Spinner from "@components/spinner/Spinner.tsx";

export function DetailsPage() {
  const [searchParams] = useSearchParams();

  const detailsId = useMemo(() => {
    return searchParams.get(QUERY_DETAILS_ID) || "";
  }, [searchParams]);

  const [details, setDetails] = useState<BookDetailsResponse | null>(null);

  const requestDetails = useCallback(async (key: string) => {
    const book = await getBook(key);
    setDetails(book);
  }, []);

  useEffect(() => {
    requestDetails(detailsId).catch(console.error);
  }, [detailsId, requestDetails]);

  if (!detailsId) return;

  if (!details)
    return (
      <div className={"flex flex-col gap-4 max-w-[1200px] w-full"}>
        <Section title={"Details"}>
          <div>
            <Spinner />
          </div>
        </Section>
      </div>
    );

  return (
    <div className={"flex flex-col gap-4 max-w-[1200px] w-full"}>
      <Section title={"Details"}>
        <div>
          <div className={"text-xl bg-gray-100 p-4"}>{details.title}</div>
          <div className={"p-4"}>{details.description}</div>
        </div>
      </Section>
    </div>
  );
}
