import { site } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 text-sm text-muted md:flex-row">
        <p>
          © {year}{" "}
          <span className="font-medium text-ink">{site.owner}</span>
          {" · "}
          {site.name}
        </p>

        <div className="flex items-center gap-6">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-ink"
          >
            GitHub
          </a>
          <a href={site.url} className="transition hover:text-ink">
            Live site
          </a>
        </div>
      </div>
    </footer>
  );
}
