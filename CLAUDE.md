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

## Writing rules

- Comments explain non-obvious *why*, never *what* — the code already says that.
