import { memo } from "react";
import type { Data } from "@/types/emissionTypes.ts";
import type { DataColumn } from "@pages/EmissionsDataReport/EmissionsTable.tsx";

export const DataRow = memo(
  function DataRow({
    data,
    visibleColumns,
  }: {
    data: Data;
    visibleColumns: DataColumn[];
  }) {
    return (
      <tr key={data.year}>
        {visibleColumns.map((col) => (
          <td key={col}>{data[col] ?? "N/A"}</td>
        ))}
      </tr>
    );
  },
  (oldProps, newProps) => {
    return (
      oldProps.data === newProps.data &&
      oldProps.visibleColumns === newProps.visibleColumns
    );
  },
);
