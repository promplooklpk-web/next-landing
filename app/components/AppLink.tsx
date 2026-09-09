"use client";

import { appPath, handleHashClick, homeHash } from "@/lib/navigation";

interface AppLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  external?: boolean;
}

export function AppLink({
  href,
  className,
  children,
  onClick,
  external,
}: AppLinkProps) {
  if (external || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={className}
        onClick={onClick}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a
        href={homeHash(href.slice(1))}
        className={className}
        onClick={(e) => {
          handleHashClick(e, href);
          onClick?.();
        }}
      >
        {children}
      </a>
    );
  }

  const resolved = appPath(href);
  return (
    <a href={resolved} className={className} onClick={onClick}>
      {children}
    </a>
  );
}
