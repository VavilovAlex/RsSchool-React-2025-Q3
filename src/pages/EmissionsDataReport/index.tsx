import { Suspense, useState } from "react";
import { EmissionsTable } from "@pages/EmissionsDataReport/EmissionsTable.tsx";
import Spinner from "@components/spinner/Spinner.tsx";
import Checkbox from "@components/checkbox";
import { fetchLocal, fetchRemote } from "@/utils/fetchData.ts";

export default function EmissionsDataReport() {
  const [useLocal, setUseLocal] = useState(true);

  const dataPromise = useLocal ? fetchLocal() : fetchRemote();

  return (
    <div className={"flex flex-col h-screen overflow-auto"}>
      <Checkbox
        label="Use local data"
        checked={useLocal}
        onChange={() => {
          setUseLocal(!useLocal);
        }}
      />
      <Suspense fallback={<Spinner />}>
        <EmissionsTable dataPromise={dataPromise} />
      </Suspense>
    </div>
  );
}
