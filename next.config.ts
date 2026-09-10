import type { NextConfig } from "next";
import supabaseDefaults from "./lib/supabase-public.json";

const isPagesBuild = process.env.GITHUB_PAGES === "true";
const basePath = "/next-landing";

const defaultSiteUrl = isPagesBuild
  ? "https://promplooklpk-web.github.io"
  : "https://next-landing-cge.pages.dev";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isPagesBuild ? basePath : "",
  assetPrefix: isPagesBuild ? basePath : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: isPagesBuild ? basePath : "",
    NEXT_PUBLIC_SUPABASE_URL:
      process.env.NEXT_PUBLIC_SUPABASE_URL || supabaseDefaults.url,
    NEXT_PUBLIC_SUPABASE_ANON_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || supabaseDefaults.anonKey,
    NEXT_PUBLIC_SITE_URL:
      process.env.NEXT_PUBLIC_SITE_URL || defaultSiteUrl,
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
