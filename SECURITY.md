# Security policy

## Reporting a vulnerability

Please do **not** open a public issue. Use GitHub's private reporting: open the **Security** tab of this repository and choose **Report a vulnerability**. Include what you found, how to reproduce it and what you think the impact is.

## What is in place

- Response headers set in `vercel.json`: a strict Content-Security-Policy (no `unsafe-inline` / `unsafe-eval` for scripts; the one inline script, which applies the saved theme and language before first paint, is allowed by hash), HSTS, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`. A test fails if the inline script changes without its hash being updated.
- No third-party origins: fonts are self-hosted and nothing external is loaded.
- Dependabot opens weekly update PRs; CI runs `npm audit` for production dependencies.
