import { useLocation } from "react-router";

export default function LocationDisplay() {
  const location = useLocation();
  return (
    <div>
      <div data-testid="pathname">{location.pathname}</div>;
      <div data-testid="search">{location.search}</div>
    </div>
  );
}
