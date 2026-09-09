import type { NextConfig } from "next";

const isPagesBuild =
  process.env.GITHUB_PAGES === "true" || process.env.NODE_ENV === "production";
const basePath = "/next-landing";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isPagesBuild ? basePath : "",
  assetPrefix: isPagesBuild ? basePath : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: isPagesBuild ? basePath : "",
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
