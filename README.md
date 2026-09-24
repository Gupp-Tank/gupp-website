# gupp-website

Gupp Tank public website — React + TypeScript + Vite. Deployed on Vercel.

Live at [gupp.app](https://gupp.app).

## Contents

[Local setup](#local-setup) · [Scripts](#scripts) · [Architecture](#architecture) · [CI](#ci) · [Performance budget](#performance-budget) · [Security headers](#security-headers) · [Fonts](#fonts) · [UI primitives](#ui-primitives) · [Tests](#tests) · [Themes and contrast](#themes-and-contrast) · [Copy and languages](#copy-and-languages) · [Status](#status) · [Contributing](CONTRIBUTING.md)

## Local setup

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` — dev server
- `npm run build` — type-check and build to `dist/`
- `npm run lint` — Oxlint (layer boundaries, 500-line cap) plus the token and convention checks
- `npx tsc -b` — type-check
- `npm run check:budget` — size budget of the production build (run after `build`)
- `npm test` — Vitest
- `npm run test:coverage` — Vitest with coverage; fails below 90% statements/lines/functions and 80% branches on `hooks/`, `services/`, `lib/` and `errors/`
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

## CI

- **CI** (every PR and push to `main`): type-check, lint (layers, tokens, conventions), tests **with coverage thresholds**, `npm audit` of production dependencies, build, and the size budget. `main` requires it to be green.
- **Lighthouse** (PRs that touch `src/`, `index.html`, `public/`, `vercel.json`, `package.json` or the budgets): builds, serves the production build and runs Lighthouse CI 3 times against `/es` with the mobile emulation; fails if a budget in `lighthouserc.json` is exceeded. Reports are uploaded as an artifact. To run it locally: `npm run build && npx @lhci/cli autorun`.
- End-to-end tests will join as their own job with the Playwright suite (issue #33).
- Installs are cached by `actions/setup-node`; the CI job takes about 30 s.

## SEO and prerendering

`npm run build` = type-check, `vite build` (client), `vite build --ssr` (server bundle) and `scripts/prerender.ts`, which renders `/es` and `/en` to static HTML with `react-dom/server` (plain Node, **no browser**, so it runs on Vercel's build machine). Output in `dist/`: `es/index.html`, `en/index.html` (real content, `lang`, title, description, canonical, `hreflang` es/en/x-default, Open Graph, Twitter card, JSON-LD), `404.html` (`noindex`; Vercel serves it with a real 404 for unknown paths), `sitemap.xml` and `robots.txt`. The browser **hydrates** the markup (`hydrateRoot`), so nothing is redrawn; `/` and unknown paths still render on the client.

- `src/lib/seo.ts` builds every tag (and the sitemap) from one function used by both the prerender and `useSeo`, which keeps them in step on navigation and language switches. `src/content/site.ts` holds the canonical origin (`https://gupp.app`) and share images.
- To add a page: give it a `useSeo` call and add its path to `buildSitemap([...])` and to the loop in `scripts/prerender.ts`.
- Structured data is limited to what is true today (Organization, WebSite). Add MobileApplication with the store listings, and FAQPage with the FAQ.
- `npm run check:seo` (CI, after the build) fails on a wrong canonical/hreflang, missing prerender, missing or broken share image, invalid JSON-LD, or a sitemap/robots/404 problem.
- Share images (`public/og/og-es.jpg`, `og-en.jpg`, 1200x630) come from `scripts/generate-og.mjs`; rerun it when the headline copy changes (it needs Playwright).
- Server render rules: the stores read `<html lang>`/`data-theme`, so the prerender gives them a minimal fake `document`; hooks touch `window` only in effects; anything the first render shows must not depend on the browser (that is why the logo variants are switched by CSS, not by a hook).

## Accessibility and end-to-end tests

`npx playwright test` builds and serves the production build and runs `e2e/`: **axe (WCAG 2.1 A + AA) on every route in both languages and themes**, with the mobile menu open, plus structure checks (one banner/main/contentinfo, labelled navs, one `h1`, no skipped heading levels), a skip link that moves focus into `main`, a visible focus outline on every keyboard stop in both themes, and no infinite animations under reduced motion. Desktop and mobile (Pixel 7) projects. The `E2E and accessibility` workflow runs it on PRs that touch shipped code.

The phone mockup in the hero is an illustration (an image with a text alternative), so its inner text is excluded from the color-contrast rule only; every other rule still scans it. What automation cannot do is a screen-reader pass: check VoiceOver/NVDA by hand before a launch.

## Performance budget

`npm run check:budget` (runs in CI after the build) fails if the production build exceeds: entry JS 120 kB gzip, all JS 135 kB, CSS 12 kB, any font subset 40 kB (120 kB total), any image 60 kB. Today: 92 / 95 / 6 / 105 (fonts) / 32 kB. Raise a number only deliberately, in its own PR.

`lighthouserc.json` holds the Lighthouse budgets (mobile preset): performance >= 0.9, LCP <= 3 s, CLS <= 0.1, TBT <= 200 ms (the lab proxy for INP). Measured on the production build: mobile **95** (LCP 2.6 s, CLS 0, TBT 90 ms), desktop **100** (LCP 0.6 s). The LCP budget is loose on purpose: the page is client-rendered, so mobile LCP drops when the SEO issue adds prerendering.

- **Images** are shipped at their real display size (about 4x): originals live in `gupp-docs/logo`. Don't drop a full-size source into `public/`.
- **The WebGL background** starts when the browser is idle, and is skipped on data-saver / `prefers-reduced-data`, on devices reporting <= 2 GB or <= 2 cores, and on software renderers (no GPU); it also pauses off-screen and hides behind reduced motion. To see it on a software renderer while developing: `localStorage.setItem('gupp-caustics', 'force')`.

## Security headers

`vercel.json` sets a strict Content-Security-Policy and the baseline headers (see `SECURITY.md`); `src/security.test.ts` checks them. The only inline script (theme/language pre-paint in `index.html`) is allowed by SHA-256 hash: **if you edit it, update the hash in `vercel.json`** (the test tells you the new one). Anything else that loads from another origin needs a deliberate CSP change, e.g. the early-access form must add the API origin to `connect-src`.

## Fonts

Karla and Baloo 2 are self-hosted (`src/fonts.css`, variable fonts from Fontsource, latin + latin-ext), so no third-party host sees visitors' IPs; `npm run lint` fails if a font CDN appears. For another language, copy its subset from `node_modules/@fontsource-variable/<font>/wght.css`.

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

## Tests

Hooks and services are tested in isolation (fake `fetch`, fake WebGL context, controllable `matchMedia`); components are tested through behavior with Testing Library. `src/test/setup.ts` empties storage before every test and makes any real `fetch` throw, so tests never depend on the network or on leftover state.

## Themes and contrast

Light is the default; dark is opt-in and applied before first paint. Switching themes moves nothing (measured: 0 of 76 elements shift). `src/index.contrast.test.ts` fails if a token change drops a used pair below its minimum in either theme:

| Pair | Light | Dark |
|---|---|---|
| text-primary on bg | 15.1 | 15.6 |
| text-body on bg / surface | 9.3 / 10.1 | 5.8 / 5.4 |
| primary-green on bg | 4.8 | 5.9 |
| on-primary on primary-green (buttons) | 5.2 | 6.3 |
| nav-active-fg on nav-active-bg | 4.7 | 7.7 |
| secondary-blue on bg | 7.0 | 6.7 |

`--text-secondary` is 3.5:1 on white in light mode, so it is only for large text and decoration, never small copy (use `--text-body`). Text on the primary green uses `--on-primary` (dark ink in dark mode, as the brand docs do for the tool FAB).

## Copy and languages

All user-facing text lives in `src/i18n/dictionaries/<locale>/`, one file per section (`hero.ts`, `header.ts`, ...). Both locales implement the same `Dictionary` type, so a string added to one language and not the other fails type-check. Use `useFormat()` (or `src/i18n/format.ts`) for numbers, dates, lists and plurals instead of building them by hand.

Adding a language:
1. Add it to `LOCALES` and `LOCALE_NAMES` in `src/i18n/locales.ts`.
2. Copy an existing `dictionaries/<locale>/` folder, translate it and register it in `dictionaries/index.ts` (type-check lists anything missing).
3. Add the locale to the pre-paint script in `index.html` (`locales.test.ts` fails if you forget).
4. Add its error copy (`errors.ts`), then review the CI run.

## Status

Landing page: bilingual (es/en) hero with the app mockup, four product modules, footer, light/dark theme and localized 404. The foundations (layering, tokens, errors, config, HTTP client, routing, i18n, security headers, budgets, CI) are in place. Still to build: the early-access form and consent, legal pages, cookie banner, more sections and device views, SEO/prerender and end-to-end tests; see the open issues and milestones. Architecture summary and the reasons behind these rules: `gupp-docs` (`architecture/website`).
