import { isStaticCarSlug } from "@/lib/static-car-slugs";
import { appPath } from "@/lib/navigation";

/** Client detail — works for cars added after the last deploy */
export function carDetailViewPath(slug: string): string {
  return `${appPath("/cars/view/")}?slug=${encodeURIComponent(slug)}`;
}

/**
 * Public car detail link:
 * - Clean `/cars/<slug>/` when HTML exists from last build (SEO)
 * - `/cars/view/?slug=` for newly added Supabase cars
 */
export function carDetailPath(slug: string): string {
  if (isStaticCarSlug(slug)) {
    return appPath(`/cars/${slug}/`);
  }
  return carDetailViewPath(slug);
}

export function dashboardEditPath(slug: string): string {
  return `${appPath("/dashboard/edit/")}?slug=${encodeURIComponent(slug)}`;
}
