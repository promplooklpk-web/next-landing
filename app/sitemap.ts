import type { MetadataRoute } from "next";
import { fetchCarsAtBuild, getBuildCarSlugs } from "@/lib/cars-build";
import { absoluteUrl } from "@/lib/site";
import { CATEGORY_SLUGS, VEHICLE_CATEGORIES } from "@/lib/vehicle-category";

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

  const categoryPages = CATEGORY_SLUGS.map((slug) => ({
    url: absoluteUrl(VEHICLE_CATEGORIES[slug].path),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [
    {
      url: absoluteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...categoryPages,
    ...carPages,
  ];
}
