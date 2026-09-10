import type { MetadataRoute } from "next";
import { BASE_PATH, FULL_SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const dashboardPath = BASE_PATH
    ? `${BASE_PATH}/dashboard/`
    : "/dashboard/";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [dashboardPath],
    },
    sitemap: `${FULL_SITE_URL}/sitemap.xml`,
  };
}
