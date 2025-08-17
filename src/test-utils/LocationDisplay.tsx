import { usePathname, useSearchParams } from "next/navigation";

export default function LocationDisplay() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return (
    <div>
      <div data-testid="pathname">{pathname}</div>;
      <div data-testid="search">{searchParams}</div>
    </div>
  );
}
