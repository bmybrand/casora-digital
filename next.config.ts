import type { NextConfig } from "next";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  webpack(config) {
    config.resolve.alias.ogl = require.resolve("ogl");
    return config;
  },
};

export default nextConfig;
