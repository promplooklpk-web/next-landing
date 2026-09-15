import type { MetadataRoute } from "next";
import { fetchCarsAtBuild, getBuildCarSlugs } from "@/lib/cars-build";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getBuildCarSlugs();
  const cars = await fetchCarsAtBuild();
  const updatedBySlug = new Map(
    cars.map((car) => [car.slug, new Date()])
  );

  const carPages = slugs.map((slug) => ({
    url: absoluteUrl(`/cars/${slug}/`),
    lastModified: updatedBySlug.get(slug) ?? new Date(),
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
