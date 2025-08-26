import { useId } from "react";

export default function useIdName(id?: string, name?: string) {
  const generatedId = useId();

  return id ?? name ?? generatedId;
}
