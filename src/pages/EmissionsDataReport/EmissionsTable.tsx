import type { Country, Data } from "@/types/emissionTypes.ts";
import { use, useState } from "react";
import ContentCard from "@components/contentCard";
import { sortCompare } from "@/utils/comapre.ts";
import SortableColumn from "@components/sortableColumn";
import type { SortState } from "@components/sortableColumn/sortTypes.ts";

type DataColumn = keyof Data;
type CountrySortBy = "name" | "iso_code" | "population";

export const EmissionsTable = ({
  dataPromise,
}: {
  dataPromise: Promise<Country[]>;
}) => {
  const countriesRaw = use(dataPromise);

  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const [visibleColumns] = useState<DataColumn[]>([
    "year",
    "population",
    "co2",
    "co2_per_capita",
  ]);

  const [sortCountriesBy, setSortCountriesBy] = useState<
    SortState<CountrySortBy>
  >({
    key: "name",
    direction: "asc",
  });
  const [sortDataBy, setSortDataBy] = useState<SortState<DataColumn>>({
    key: "year",
    direction: "desc",
  });

  const selectedCountryData =
    selectedCountry?.data
      .slice()
      .sort((l, r) =>
        sortCompare(l[sortDataBy.key], r[sortDataBy.key], sortDataBy.direction),
      ) ?? [];

  const countries = countriesRaw.slice().sort((l, r) => {
    if (sortCountriesBy.key === "name") {
      return sortCompare(l.name, r.name, sortCountriesBy.direction);
    }
    if (sortCountriesBy.key === "iso_code") {
      return sortCompare(l.iso_code, r.iso_code, sortCountriesBy.direction);
    }

    if (sortCountriesBy.key === "population") {
      return sortCompare(
        l.data[l.data.length - 1].population,
        r.data[r.data.length - 1].population,
        sortCountriesBy.direction,
      );
    }

    throw new Error("Invalid sort key");
  });

  return (
    <div className={"flex flex-col gap-4 h-full overflow-hidden"}>
      <ContentCard title={"Emissions Data"}>
        <table className={"default-table cursor-pointer"}>
          <thead>
            <tr>
              <SortableColumn
                activeSort={sortCountriesBy}
                sortKey={"name"}
                onSort={setSortCountriesBy}
              >
                Country
              </SortableColumn>
              <SortableColumn
                activeSort={sortCountriesBy}
                sortKey={"iso_code"}
                onSort={setSortCountriesBy}
              >
                ISO Code
              </SortableColumn>
              <SortableColumn
                activeSort={sortCountriesBy}
                sortKey={"population"}
                onSort={setSortCountriesBy}
              >
                Population
              </SortableColumn>
            </tr>
          </thead>
          <tbody>
            {countries.map((c) => (
              <tr key={c.name} onClick={() => setSelectedCountry(c)}>
                <td>{c.name}</td>
                <td>{c.iso_code ?? "N/A"}</td>
                <td>{c.data[c.data.length - 1].population ?? "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ContentCard>
      {selectedCountry && (
        <ContentCard title={selectedCountry.name}>
          <table className={"default-table"}>
            <thead className={"cursor-pointer"}>
              <tr>
                {visibleColumns.map((col) => (
                  <SortableColumn
                    key={col}
                    sortKey={col}
                    onSort={setSortDataBy}
                    activeSort={sortDataBy}
                  >
                    {col}
                  </SortableColumn>
                ))}
              </tr>
            </thead>
            <tbody>
              {selectedCountryData.map((d) => (
                <tr key={d.year}>
                  {visibleColumns.map((col) => (
                    <td key={col}>{d[col] ?? "N/A"}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </ContentCard>
      )}
    </div>
  );
};
