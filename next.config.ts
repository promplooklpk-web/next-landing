import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const basePath = "/next-landing";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? basePath : "",
  assetPrefix: isProd ? basePath : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
