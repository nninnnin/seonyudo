import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  env: {
    MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
    MEMEX_TOKEN: process.env.MEMEX_TOKEN,
    IS_DEV: process.env.IS_DEV,
  },
  devIndicators: {
    appIsrStatus: false,
  },
};

export default nextConfig;
