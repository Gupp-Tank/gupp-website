// Generates the 1200x630 share images (public/og/og-<locale>.jpg) from the brand tokens.
// A manual design tool, not part of the build: run `node scripts/generate-og.mjs` after
// changing the headline copy, then commit the images. Needs Playwright's Chromium.
import { readFileSync, mkdirSync } from 'node:fs'
import { chromium } from '@playwright/test'

const font = (pkg, file) => `data:font/woff2;base64,${readFileSync(`node_modules/@fontsource-variable/${pkg}/files/${file}`).toString('base64')}`
const icon = `data:image/png;base64,${readFileSync('public/branding/icon.png').toString('base64')}`

// Copy mirrors src/i18n/dictionaries/<locale>/hero.ts; colors mirror src/index.css (light theme).
const COPY = {
  es: { lead: 'El acuarismo nunca fue', emphasis: 'tan fácil', tail: 'de cuidar.', sub: 'Agua, peces y dosis, todo en un solo lugar.' },
  en: { lead: 'Fishkeeping has never', emphasis: 'been this easy', tail: '', sub: 'Water, fish and dosing, all in one place.' },
}

const html = ({ lead, emphasis, tail, sub }) => `<!doctype html><html><head><style>
@font-face { font-family: Karla; font-weight: 200 800; src: url(${font('karla', 'karla-latin-wght-normal.woff2')}) format('woff2-variations'); }
* { box-sizing: border-box; margin: 0; }
body { width: 1200px; height: 630px; background: #f2f7fb; font-family: Karla, sans-serif; color: #132322; padding: 72px 88px 56px; display: flex; flex-direction: column; overflow: hidden; }
.mark { display: flex; align-items: center; gap: 20px; font-weight: 800; font-size: 34px; letter-spacing: -0.02em; }
.mark img { width: 72px; height: 72px; }
h1 { margin-top: 64px; max-width: 980px; font-weight: 800; font-size: 82px; line-height: 1.04; letter-spacing: -0.04em; }
h1 em { font-style: normal; color: #0e7c5a; }
h1 .tail { color: #0d5c73; }
.sub { margin-top: 32px; font-size: 34px; font-weight: 500; color: #0d4859; }
.url { margin-top: auto; font-size: 30px; font-weight: 800; color: #0e7c5a; }
.bar { position: absolute; right: 0; top: 0; bottom: 0; width: 28px; background: #0e7c5a; }
</style></head><body>
<div class="mark"><img src="${icon}" alt="">Gupp Tank</div>
<h1>${lead} <em>${emphasis}</em>${tail ? ` <span class="tail">${tail}</span>` : '.'}</h1>
<p class="sub">${sub}</p>
<p class="url">gupp.app</p>
<div class="bar"></div>
</body></html>`

mkdirSync('public/og', { recursive: true })
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
for (const [locale, copy] of Object.entries(COPY)) {
  await page.setContent(html(copy))
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: `public/og/og-${locale}.jpg`, type: 'jpeg', quality: 82 })
  console.log(`wrote public/og/og-${locale}.jpg`)
}
await browser.close()
