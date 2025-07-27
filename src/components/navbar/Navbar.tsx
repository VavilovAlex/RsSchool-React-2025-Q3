import { Link } from "react-router";
import { ROUTES } from "@pages/routes.ts";

export default function Navbar() {
  return (
    <div className={"w-full p-4 bg-blue-100 flex gap-5"}>
      <Link to={ROUTES.Home()}>Home</Link>
      <Link to={ROUTES.About}>About</Link>
    </div>
  );
}
