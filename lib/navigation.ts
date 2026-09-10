import type { MouseEvent } from "react";
import { assetPath, isHomePagePath } from "@/lib/site";

/** Build an in-app path with basePath prefix */
export function appPath(path: string): string {
  if (path.startsWith("http") || path.startsWith("tel:") || path.startsWith("mailto:")) {
    return path;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return assetPath(normalized);
}

/** Home URL with hash anchor, e.g. /next-landing/#cars */
export function homeHash(hash: string): string {
  const id = hash.startsWith("#") ? hash.slice(1) : hash;
  return `${assetPath("/")}#${id}`;
}

/** Scroll to section by id on the current page */
export function scrollToSection(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  const headerOffset = 56;
  const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
  window.scrollTo({ top, behavior: "auto" });
}

/** Handle hash link click — same-page scroll or navigate home with hash */
export function handleHashClick(
  e: MouseEvent<HTMLAnchorElement>,
  hash: string
): void {
  const id = hash.startsWith("#") ? hash.slice(1) : hash;
  const onHome = isHomePagePath(window.location.pathname);

  if (onHome) {
    e.preventDefault();
    scrollToSection(id);
    return;
  }
  // Let browser navigate to homeHash(id)
}
