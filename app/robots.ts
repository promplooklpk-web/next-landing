import type { MetadataRoute } from "next";
import { FULL_SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${FULL_SITE_URL}/sitemap.xml`,
  };
}
