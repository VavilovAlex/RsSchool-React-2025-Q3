import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
