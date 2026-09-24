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

## Architecture

Dependencies point downward only; `npm run lint` fails on an upward import (`.oxlintrc.json`).

| Layer | Folder | Rule |
|---|---|---|
| Pages | `src/pages/` | Orchestrate only: compose sections and call hooks. No state, effects or data shaping. |
| Sections | `src/sections/` | One marketing section each, built from components. Data arrives by props. |
| Components | `src/components/` | Reusable, presentational UI. Never import sections, pages, services or dictionaries. |
| Hooks | `src/hooks/` | Behavior and state. Never import UI. |
| Services | `src/services/` | I/O (HTTP, storage). Only layer that touches the network. |
| Domain | `src/lib/`, `src/i18n/`, `src/errors/`, `src/types/` | Pure logic, copy and shapes. Never import UI or hooks. |

No file over 500 lines (also enforced by lint). Colors come from tokens in `src/index.css`, never from literals.

## Status

Landing page with a bilingual (es/en) hero, light/dark theme and an app mockup that mirrors the real Home screen. Copy lives in `src/i18n/dictionaries/`; pages in `src/pages/` only compose sections. See `gupp-docs` (`product/roadmap`) for what's planned next.
