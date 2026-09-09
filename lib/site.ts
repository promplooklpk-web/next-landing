export const SITE_URL = "https://promplooklpk-web.github.io";
export const BASE_PATH = "/next-landing";
export const FULL_SITE_URL = `${SITE_URL}${BASE_PATH}`;

export function absoluteUrl(path = ""): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") {
    return `${FULL_SITE_URL}/`;
  }
  return `${FULL_SITE_URL}${normalized}`;
}

export function carDetailUrl(slug: string): string {
  return absoluteUrl(`/cars/${slug}/`);
}
