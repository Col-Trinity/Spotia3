import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    domains: ["i.scdn.co", "mosaic.scdn.co"],
  },
};

export default withNextIntl(nextConfig);
