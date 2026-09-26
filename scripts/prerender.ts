// Prerenders /es and /en into static HTML after `vite build` and `vite build --ssr`.
//
// It runs in plain Node with react-dom/server (no browser), so it works on any build
// machine, including Vercel's. Output, next to dist/index.html:
//   es/index.html, en/index.html  full server-rendered pages with head tags, hydrated on load
//   404.html                      the app shell with noindex; Vercel serves it with a real 404
//   sitemap.xml, robots.txt
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { dictionaries } from '../src/i18n/dictionaries'
import { site } from '../src/content/site'
import { LOCALES, type Locale } from '../src/i18n/locales'
import { buildRobots, buildSeo, buildSitemap, type SeoTag } from '../src/lib/seo'

const dist = 'dist'
const template = readFileSync(join(dist, 'index.html'), 'utf8')

const escapeAttr = (v: string) => v.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const escapeText = (v: string) => v.replace(/&/g, '&amp;').replace(/</g, '&lt;')
const tag = ({ tag: name, attrs }: SeoTag) =>
  `    <${name} ${Object.entries(attrs).map(([k, v]) => `${k}="${escapeAttr(v)}"`).join(' ')} data-seo />`

// The stores read <html lang> and data-theme. On the server there is no document, so give
// them a minimal one: each page is rendered as the light theme in its own language.
function fakeDocument(locale: Locale) {
  ;(globalThis as unknown as { document: unknown }).document = { documentElement: { lang: locale, dataset: {} } }
}

const { render } = (await import(pathToFileURL(join('dist-ssr', 'entry-server.js')).href)) as { render: (url: string) => Promise<string> }

// Pages that get static HTML: the home page, the legal pages, and the unsubscribe shell.
const INDEXED_PAGES = ['', '/privacy', '/terms'] as const
const ALL_PAGES = [...INDEXED_PAGES, '/unsubscribe'] as const

function pageMeta(locale: Locale, path: (typeof ALL_PAGES)[number]) {
  const { meta, faq, legal, unsubscribe } = dictionaries[locale]
  if (path === '') return { title: meta.title, description: meta.description, faq: faq.items }
  if (path === '/unsubscribe') return { title: unsubscribe.metaTitle, description: unsubscribe.metaDescription, noindex: true }
  const doc = legal[path === '/privacy' ? 'privacy' : 'terms']
  return { title: `${doc.title} · ${site.name}`, description: doc.intro }
}

function page(locale: Locale, path: (typeof ALL_PAGES)[number], body: string): string {
  const seo = buildSeo({ locale, path, ...pageMeta(locale, path) })
  const head = [...seo.tags.map(tag), ...seo.jsonLd.map((d) => `    <script type="application/ld+json" data-seo>${JSON.stringify(d).replace(/</g, '\\u003c')}</script>`)].join('\n')

  return template
    .replace(/<html lang="[^"]*">/, `<html lang="${locale}">`)
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeText(seo.title)}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${escapeAttr(seo.description)}$2`)
    .replace('</head>', `${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`)
}

for (const locale of LOCALES) {
  fakeDocument(locale)
  for (const path of ALL_PAGES) {
    const body = await render(`/${locale}${path}`)
    const dir = join(dist, locale, path)
    mkdirSync(dir, { recursive: true })
    writeFileSync(join(dir, 'index.html'), page(locale, path, body))
    console.log(`prerendered /${locale}${path}  (${(body.length / 1024).toFixed(0)} kB of markup)`)
  }
}

// Unknown paths: the client renders the localized 404 (inside the layout for /es/whatever).
writeFileSync(join(dist, '404.html'), template.replace('</head>', '    <meta name="robots" content="noindex" data-seo />\n  </head>'))
writeFileSync(join(dist, 'sitemap.xml'), buildSitemap([...INDEXED_PAGES]))
writeFileSync(join(dist, 'robots.txt'), buildRobots())
console.log('wrote 404.html, sitemap.xml, robots.txt')
