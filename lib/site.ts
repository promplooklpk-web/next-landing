/** Placeholder until NEXT_PUBLIC_SITE_URL is set at build time */
const CF_PLACEHOLDER_ORIGIN = "https://next-landing-cge.pages.dev";

function resolveBasePath(): string {
  return process.env.NEXT_PUBLIC_BASE_PATH ?? "";
}

function resolveSiteOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  return CF_PLACEHOLDER_ORIGIN;
}

/** Active basePath for this build (empty on Cloudflare root deploy) */
export const BASE_PATH = resolveBasePath();

/** Site origin without basePath, e.g. https://next-landing-cge.pages.dev */
export const SITE_URL = resolveSiteOrigin();

/** Full public site URL including basePath when applicable */
export const FULL_SITE_URL = BASE_PATH
  ? `${SITE_URL}${BASE_PATH}`
  : SITE_URL;

/** Prefix a public asset path with basePath when deployed under a subpath */
export function assetPath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const prefix = resolveBasePath();

  if (!prefix) return normalized;
  if (normalized === prefix || normalized.startsWith(`${prefix}/`)) {
    return normalized;
  }
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

/** True when pathname is the site homepage (root or basePath home) */
export function isHomePagePath(pathname: string): boolean {
  const home = assetPath("/");
  const withSlash = (p: string) =>
    p === "/" ? "/" : p.endsWith("/") ? p : `${p}/`;
  return withSlash(pathname) === withSlash(home);
}
