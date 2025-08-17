import { useMemo } from "react";
import { QUERY_DETAILS_ID } from "@components/detailsPage/DetailsPage.constants.ts";
import Section from "@components/section/Section.tsx";
import { useGetBookQuery } from "@api/book/bookApi.ts";
import Spinner from "@components/spinner/Spinner.tsx";
import Button from "@components/button/Button.tsx";
import { useMutableSearchParams } from "@/hooks/useMutableSearchParams.tsx";

export function DetailsPage() {
  const { searchParams, setSearchParams } = useMutableSearchParams();

  const detailsId = useMemo(() => {
    return searchParams.get(QUERY_DETAILS_ID) || "";
  }, [searchParams]);

  const {
    data: details,
    isLoading,
    isFetching,
  } = useGetBookQuery(detailsId, {
    skip: !detailsId,
  });

  const closeDetails = () => {
    setSearchParams([{ key: QUERY_DETAILS_ID, value: null }]);
  };

  if (!detailsId) return;

  if (isLoading || isFetching || !details)
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
      <Section title={"Details"} overflow={true}>
        <div>
          <div className={"text-xl p-4 bg-gray-100 dark:bg-gray-800"}>
            {details.title}
          </div>
          <div className={"p-4"}>{details.description}</div>
          <Button onClick={closeDetails}>Close</Button>
        </div>
      </Section>
    </div>
  );
}
