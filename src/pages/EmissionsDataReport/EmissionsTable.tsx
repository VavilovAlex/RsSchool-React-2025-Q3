import type { Country, Data } from "@/types/emissionTypes.ts";
import { use, useState } from "react";

type Column = keyof Data;

export const EmissionsTable = ({
  dataPromise,
}: {
  dataPromise: Promise<Country[]>;
}) => {
  const data = use(dataPromise);

  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const [visibleColumns] = useState<Column[]>([
    "year",
    "population",
    "co2",
    "co2_per_capita",
  ]);

  console.log(data);

  return (
    <div>
      <div className={"text-2xl"}>Emissions Data</div>
      <div className={"overflow-auto max-h-[500px]"}>
        <table className={"default-table cursor-pointer"}>
          <thead>
            <tr>
              <th>Country</th>
              <th>ISO Code</th>
              <th>Population</th>
            </tr>
          </thead>
          <tbody>
            {data.map((c) => (
              <tr key={c.name} onClick={() => setSelectedCountry(c)}>
                <td>{c.name}</td>
                <td>{c.iso_code ?? "N/A"}</td>
                <td>{c.data[0].population ?? "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedCountry && (
        <div>
          <div className={"text-2xl"}>{selectedCountry.name}</div>
          <div className={"overflow-auto max-h-[500px]"}>
            <table className={"default-table"}>
              <thead>
                <tr>
                  {visibleColumns.map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {selectedCountry.data.map((d) => (
                  <tr key={d.year}>
                    {visibleColumns.map((col) => (
                      <td key={col}>{d[col] ?? "N/A"}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
