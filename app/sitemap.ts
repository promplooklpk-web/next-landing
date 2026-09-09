import type { MetadataRoute } from "next";
import { cars } from "@/data/cars";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const carPages = cars.map((car) => ({
    url: absoluteUrl(`/cars/${car.slug}/`),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: absoluteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...carPages,
  ];
}
