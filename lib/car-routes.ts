import { appPath } from "@/lib/navigation";

/** Car detail path — uses static SSG page when available */
export function carDetailPath(slug: string): string {
  return appPath(`/cars/${slug}/`);
}

/** Universal client detail (query param) for cars added after build */
export function carDetailViewPath(slug: string): string {
  return `${appPath("/cars/view/")}?slug=${encodeURIComponent(slug)}`;
}

export function dashboardEditPath(slug: string): string {
  return `${appPath("/dashboard/edit/")}?slug=${encodeURIComponent(slug)}`;
}
