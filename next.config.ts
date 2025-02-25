import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
  },
};

export default nextConfig;
