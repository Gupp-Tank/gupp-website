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
- `npm run lint` — Oxlint and the color-token check
- `npm test` — Vitest
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

Routing: the language is the first URL segment (`/es`, `/en`); `/` redirects to the resolved language and unknown paths render a localized 404. The route table is `src/routes/AppRoutes.tsx`; shared chrome (header) lives in `SiteLayout`, pages only render their own content. Use `useLocalePath()` for internal links and `useSwitchLocale()` to change language. `vercel.json` rewrites every path to `index.html` so deep links work.

Header: below 860px the links move into a disclosure menu (`useMobileMenu`: Escape closes and restores focus, `main` becomes `inert`, scroll is locked, `useFocusTrap` keeps Tab inside the header). `useActiveSection` highlights the in-page section in view with `aria-current`, changing color only so nothing shifts.

Responsive: audited from 320px to 1280px in both themes and languages (no overflow, no overlap, headline never orphaned, 48px targets on touch widths, contrast over the caustics). At 320px the language/theme controls move into the menu and the hero mockup scales down. Safe-area insets are respected (`viewport-fit=cover`).

Footer: `SiteFooter` is part of `SiteLayout`. Legal links are data (`footer.legalLinks` in the dictionaries) and the group is not rendered while the list is empty, so there are no dead links; add an entry (path without the language prefix) when its page exists.

Errors: services throw only `AppError` (`src/errors/`); the UI shows copy from the dictionary keyed by `ErrorCode`, never the raw message. Adding a code means adding its copy in both languages (a missing entry is a type error).

Configuration: variables are declared in `src/config/variables.ts` and read only through `src/config/env.ts`. A missing or malformed variable fails `npm run build` (and the dev server) with a list of problems; there are no defaults. Keep `.env.example` in sync.

Network: only `src/services/http` calls `fetch` (lint enforces it). Feature services use the shared `http` client, pass a `parse` function that validates the response shape, and get `AppError` on every failure (network, timeout, HTTP status, invalid body).

No file over 500 lines (also enforced by lint). Colors come from tokens in `src/index.css`, never from literals: `npm run lint` fails on a hex/rgb/hsl/named color anywhere else, and on a token missing its dark value.

## UI primitives

New sections compose these instead of restating layout and type CSS (extend by composition, never by editing a primitive for one caller):

```tsx
<Section id="features" labelledBy="features-title">      {/* labelled landmark, anchor-safe under the sticky header */}
  <Container className="features__inner">                {/* centered column + gutter; you set padding-block */}
    <Heading level={2} size="section" id="features-title">…</Heading>   {/* level = outline, size = looks */}
    <Text tone="muted">…</Text>                          {/* size: lead | body, tone: body | muted | default */}
  </Container>
</Section>
```

Spacing and radius come from the documented scale (`--space-*`, `--radius-*`); combine tokens with `calc()` instead of adding loose pixel values.

## Copy and languages

All user-facing text lives in `src/i18n/dictionaries/<locale>/`, one file per section (`hero.ts`, `header.ts`, ...). Both locales implement the same `Dictionary` type, so a string added to one language and not the other fails type-check. Use `useFormat()` (or `src/i18n/format.ts`) for numbers, dates, lists and plurals instead of building them by hand.

Adding a language:
1. Add it to `LOCALES` and `LOCALE_NAMES` in `src/i18n/locales.ts`.
2. Copy an existing `dictionaries/<locale>/` folder, translate it and register it in `dictionaries/index.ts` (type-check lists anything missing).
3. Add the locale to the pre-paint script in `index.html` (`locales.test.ts` fails if you forget).
4. Add its error copy (`errors.ts`), then review the CI run.

## Status

Landing page with a bilingual (es/en) hero, light/dark theme and an app mockup that mirrors the real Home screen. Copy lives in `src/i18n/dictionaries/`; pages in `src/pages/` only compose sections. See `gupp-docs` (`product/roadmap`) for what's planned next.
