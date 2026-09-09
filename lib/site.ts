/** GitHub Pages subpath — hardcoded so assets always resolve on live deploy */
export const BASE_PATH = "/next-landing";

export const SITE_URL = "https://promplooklpk-web.github.io";
export const FULL_SITE_URL = `${SITE_URL}${BASE_PATH}`;

/** Prefix a public asset path with basePath for GitHub Pages */
export function assetPath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const prefix =
    process.env.NEXT_PUBLIC_BASE_PATH ??
    (process.env.NODE_ENV === "production" ? BASE_PATH : "");
  return `${prefix}${normalized}`;
}

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
