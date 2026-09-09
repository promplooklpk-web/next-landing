import { appPath } from "@/lib/navigation";

/** Client detail page — works for all Supabase cars on static export */
export function carDetailViewPath(slug: string): string {
  return `${appPath("/cars/view/")}?slug=${encodeURIComponent(slug)}`;
}

/** Public car detail link (always query-based for GitHub Pages) */
export function carDetailPath(slug: string): string {
  return carDetailViewPath(slug);
}

export function dashboardEditPath(slug: string): string {
  return `${appPath("/dashboard/edit/")}?slug=${encodeURIComponent(slug)}`;
}
