# next-landing

A production-ready Next.js landing page, statically exported and deployed to GitHub Pages.

**Live site:** https://promplooklpk-web.github.io/next-landing/

Built by [Yanyong Promplook](https://github.com/promplooklpk-web) — a Thai-first personal studio landing page with English support.

## Stack

- [Next.js 16](https://nextjs.org/) (App Router, static export)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [GitHub Actions](https://github.com/features/actions) + [GitHub Pages](https://pages.github.com/)

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Note:** In development, `basePath` is disabled so the site runs at the root. In production builds, assets are served under `/next-landing` for GitHub Pages.

## Build

```bash
npm run build
```

This generates a static export in the `out/` directory.

## Deployment

Pushing to `main` triggers the GitHub Actions workflow (`.github/workflows/deploy.yml`), which:

1. Installs dependencies
2. Runs `npm run build`
3. Uploads the `out/` folder as a Pages artifact
4. Deploys via `actions/deploy-pages`

Ensure **GitHub Pages** is enabled in the repository settings with source set to **GitHub Actions**.

## Project structure

```
app/
  components/   # Landing page sections
  globals.css   # Theme and utilities
  layout.tsx    # Root layout and fonts
  page.tsx      # Home page
lib/
  content.ts    # Site copy and data
public/
  .nojekyll     # Prevents Jekyll from breaking Next.js paths
```

## License

MIT
