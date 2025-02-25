import type { NextConfig } from "next";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.plugins.push(new MiniCssExtractPlugin());

    config.module.rules.push({
      test: /\.css$/i,
      use: [MiniCssExtractPlugin.loader, "css-loader"],
    });
    return config;
  },
};

export default nextConfig;
