/** Canonical live site (Cloudflare Pages). Override with NEXT_PUBLIC_SITE_URL at build time. */
export const CANONICAL_SITE_ORIGIN = "https://next-landing-cge.pages.dev";

function resolveSiteOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  return fromEnv || CANONICAL_SITE_ORIGIN;
}

/** Public site origin — used for metadataBase, Open Graph, sitemap, and absolute URLs */
export const SITE_URL = resolveSiteOrigin();

/** Same as SITE_URL (root deploy on Cloudflare; no subpath) */
export const FULL_SITE_URL = SITE_URL;

/** Normalize a public asset path (root deploy — no basePath prefix) */
export function assetPath(path: string): string {
  return path.startsWith("/") ? path : `/${path}`;
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

/** True when pathname is the site homepage */
export function isHomePagePath(pathname: string): boolean {
  const withSlash = (p: string) =>
    p === "/" ? "/" : p.endsWith("/") ? p : `${p}/`;
  return withSlash(pathname) === "/";
}
