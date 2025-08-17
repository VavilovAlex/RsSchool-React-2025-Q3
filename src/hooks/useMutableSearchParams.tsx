"use client";
import { useRouter, useSearchParams } from "next/navigation";

export function useMutableSearchParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (searchParams == null) throw new Error("This is not possible");

  const setSearchParams = (
    paramUpdates: { key: string; value: string | null }[],
  ) => {
    const params =
      searchParams != null
        ? new URLSearchParams(searchParams.toString())
        : new URLSearchParams();

    for (const { key, value } of paramUpdates) {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    }

    const newParamsString = params.toString();
    const currentParamsString = searchParams.toString();

    if (newParamsString === currentParamsString) {
      return;
    }

    const newUrl = newParamsString ? `?${newParamsString}` : "";
    router.replace(`${window.location.pathname}${newUrl}`);
  };

  return { searchParams, setSearchParams };
}
