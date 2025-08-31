import type { Country, DataCountry } from "@/types/emissionTypes.ts";

const fetchData = async (url: string) =>
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to load emissions data: HTTP ${res.status}`);
      }
      return res.json();
    })
    .then((json) => json as Record<string, DataCountry>)
    .then((data) => {
      const dataArray = Array.from(Object.entries(data));

      return dataArray.map(([key, value]) => {
        return {
          name: key,
          ...value,
        } as Country;
      });
    });

export const fetchLocal = () => fetchData("/owid-co2-data.json");
export const fetchRemote = () =>
  fetchData(
    "https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json",
  );
