# gupp-website

Gupp Tank public website — React + TypeScript + Vite. Deployed on Vercel.

Live at [gupp.app](https://gupp.app).

## Local setup

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` — dev server
- `npm run build` — type-check and build to `dist/`
- `npm run lint` — Oxlint
- `npm run preview` — preview the production build locally

## Status

Landing page with a bilingual (es/en) hero, light/dark theme and an app mockup that mirrors the real Home screen. Copy lives in `src/i18n/dictionaries/`; pages in `src/pages/` only compose sections. See `gupp-docs` (`product/roadmap`) for what's planned next.
