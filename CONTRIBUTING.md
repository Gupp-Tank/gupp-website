# Contributing

The working rules live in [README.md](README.md) (how the code is organised) and [CLAUDE.md](CLAUDE.md) (project rules). This file is the short path from idea to merged change.

## Flow

1. **Issue first.** Use a template. Non-visual work can go straight to a branch; anything visual needs the owner to see it before merge (open the PR, share the Vercel preview or screenshots, wait).
2. **Branch off `main`** with a short name (`feat/…`, `fix/…`, `docs/…`, `perf/…`). One issue per PR.
3. **Make the checks pass locally:** `npm run lint && npx tsc -b && npm run test:coverage && npm run build && npm run check:budget`.
4. **Open the PR** with the template filled in (it carries the light/dark, es/en, mobile and contrast checklist). Write it in English. Reference the issue (`Closes #N`).
5. **CI must be green** (and Lighthouse, when the PR touches shipped code). Merge with squash.

## Adding a section

1. Copy in both dictionaries: `src/i18n/dictionaries/es/<section>.ts` and `en/<section>.ts`, typed by `Dictionary` (add the shape to `src/types/`).
2. Build `src/sections/<name>/<Name>Section.tsx` from `Section`, `Container`, `Heading`, `Text` and existing `components/ui/*`. Data arrives by props; no fetching, no state.
3. Render it from `src/pages/HomePage.tsx` passing `t.<section>`. Pages only compose.
4. Any new color is a token in `src/index.css` with a **light and a dark value**; no literals in components.
5. Behavior (state, effects, browser APIs) goes in a hook in `src/hooks/`; network in `src/services/` through the shared `http` client.
6. Test the behavior, check it at 320px and desktop in both themes and languages, and fill the PR checklist.

## Commit messages

English, imperative, one line that says what and why. No AI attribution lines.
