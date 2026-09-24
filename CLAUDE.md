# gupp-website — Project rules

Public marketing/landing site for Gupp Tank. React + TypeScript + Vite, deployed on Vercel.

## Language

- Code, comments, commit messages, PR descriptions, and this repo's `README` are written in English.
- Conversation with the user may be in Spanish; only the artifacts above must be English.

## Git

- Never add `Co-Authored-By: Claude` or any AI attribution line to commits or PRs.
- PRs are written in English.

## Brand and design tokens

- `gupp-docs/design/` (`colors`, `typography`, `icons`, `components`) is the source of truth. Never hardcode a color or font here that isn't documented there — reuse the same tokens defined in `src/index.css` (`--primary-green`, `--secondary-blue`, `--coral`, `--bg`, `--surface`, `--text-primary`, `--text-secondary`).
- Brand assets (logo, favicon) live in `public/branding/`. Don't drop loose image files elsewhere.
- Website titles and body text use Karla (`--font-title` / `--font-body`); Baloo 2 (`--font-heading`) is only for the wordmark and the app mockup UI. See `gupp-docs/design/typography` ("Website") for why.

## Architecture (enforced by lint, tests or CI: don't work around it)

- Layers point downward: `pages` (compose only) -> `sections` -> `components`; `hooks` hold behavior; `services` do I/O; `lib`, `i18n`, `errors`, `types`, `config` never import UI or hooks. Only `services/http` calls `fetch`; only `config/env.ts` reads `import.meta.env`. No file over 500 lines.
- Every failure is an `AppError` with an `ErrorCode`; the UI shows dictionary copy for the code, never the raw message. A new code needs copy in both languages.
- Every user-facing string lives in both `es` and `en` dictionaries. Spanish is the default.
- Colors are tokens in `src/index.css` only, each with a light and a dark value; the text pairs must keep their contrast (`src/index.contrast.test.ts`). `--text-secondary` is not for small text on white.
- No third-party origins: fonts are self-hosted, the CSP allows none. The one inline script is allowed by hash: editing it means updating the hash in `vercel.json`.
- Performance budgets (`scripts/check-budget.mjs`, `lighthouserc.json`) and coverage thresholds are gates, not suggestions.

## Working with the owner

- Anything that changes how the site looks is a visual change: open the PR, do not merge it, share the preview and screenshots, and wait for the owner's approval. Non-visual PRs can be merged once CI is green.
- Do not change repo settings (branch protection, security features) without asking.
- Never invent product facts, handles, prices or links; leave a clearly marked placeholder and say so in the PR.

## Writing rules

- Comments explain non-obvious *why*, never *what* — the code already says that.
