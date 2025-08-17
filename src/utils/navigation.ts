import { createNavigation } from "next-intl/navigation";
import { routing } from "@/i18n/routing.ts";

export const { Link, useRouter, usePathname, redirect } =
  createNavigation(routing);
