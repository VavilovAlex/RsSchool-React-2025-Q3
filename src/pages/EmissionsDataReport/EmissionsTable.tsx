import type { Country, Data } from "@/types/emissionTypes.ts";
import { use, useState } from "react";
import ContentCard from "@components/contentCard";
import { sortCompare } from "@/utils/compare.ts";
import SortableColumn from "@components/sortableColumn";
import type { SortState } from "@components/sortableColumn/sortTypes.ts";
import Input from "@components/input";
import Select from "@components/select";
import { isoCodesByRegion } from "@shared/iso_codes_by_region.ts";

type DataColumn = keyof Data;
type CountrySortBy = "name" | "iso_code" | "population";

const maxYear = 2023;
const minYear = 1750;

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

  const [countrySearch, setCountrySearch] = useState("");
  const [regionFilter, setRegionFilter] = useState<
    keyof typeof isoCodesByRegion | ""
  >("");
  const [yearFilter, setYearFilter] = useState<number>(maxYear);

  const countries = countriesRaw
    .slice()
    .sort((l, r) => {
      if (sortCountriesBy.key === "name") {
        return sortCompare(l.name, r.name, sortCountriesBy.direction);
      }
      if (sortCountriesBy.key === "iso_code") {
        return sortCompare(l.iso_code, r.iso_code, sortCountriesBy.direction);
      }

      if (sortCountriesBy.key === "population") {
        return sortCompare(
          l.data.find((d) => d.year == yearFilter)?.population,
          r.data.find((d) => d.year == yearFilter)?.population,
          sortCountriesBy.direction,
        );
      }

      throw new Error("Invalid sort key");
    })
    .filter((c) => c.name.toLowerCase().includes(countrySearch.toLowerCase()))
    .filter((c) => {
      if (regionFilter === "") {
        return true;
      }
      return isoCodesByRegion[regionFilter].includes(c.iso_code ?? "");
    });

  const regions = Object.keys(isoCodesByRegion);

  return (
    <div className={"flex flex-col gap-4 h-full overflow-hidden"}>
      <ContentCard title={"Emissions Data"}>
        <div className={"flex flex-row justify-start gap-2"}>
          <Input
            label={"Search by country name"}
            className={"w-[200px]"}
            value={countrySearch}
            onChange={(e) => setCountrySearch(e.target.value)}
          />
          <Select
            label={"Filter by region"}
            className={"w-[200px]"}
            value={regionFilter}
            onChange={(e) =>
              setRegionFilter(
                e.target.value as keyof typeof isoCodesByRegion | "",
              )
            }
          >
            <option value="">All</option>
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </Select>
          <Select
            label={"Filter by year"}
            className={"w-[200px]"}
            value={yearFilter}
            onChange={(e) => setYearFilter(Number(e.target.value))}
          >
            {Array.from(
              { length: maxYear - minYear + 1 },
              (_, i) => maxYear - i,
            ).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Select>
        </div>
        <div className={"flex-1 min-h-0 overflow-auto"}>
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
                  <td>
                    {c.data.find((d) => d.year == yearFilter)?.population ??
                      "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
