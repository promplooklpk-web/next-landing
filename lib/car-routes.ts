import { appPath } from "@/lib/navigation";

/** Client detail page — works for all Supabase cars on static export */
export function carDetailViewPath(slug: string): string {
  return `${appPath("/cars/view/")}?slug=${encodeURIComponent(slug)}`;
}

/** Clean SEO path — pre-rendered at build from Supabase + seed slugs */
export function carDetailPath(slug: string): string {
  return appPath(`/cars/${slug}/`);
}

export function dashboardEditPath(slug: string): string {
  return `${appPath("/dashboard/edit/")}?slug=${encodeURIComponent(slug)}`;
}
