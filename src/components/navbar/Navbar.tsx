import { Link } from "react-router";
import { ROUTES } from "@pages/routes.ts";
import Button from "@components/button/Button.tsx";
import { useTheme } from "@/context/useTheme.tsx";

export default function Navbar() {
  const theme = useTheme();

  return (
    <div
      className={
        "w-full flex gap-5 justify-between items-center px-4 bg-blue-100 dark:bg-blue-900"
      }
    >
      <div className={"flex py-4 gap-5"}>
        <Link to={ROUTES.Home()}>Home</Link>
        <Link to={ROUTES.About}>About</Link>
      </div>
      <Button onClick={() => theme.toggle()}>
        {theme.isDark ? "Dark Mode" : "Light Mode"}
      </Button>
    </div>
  );
}
