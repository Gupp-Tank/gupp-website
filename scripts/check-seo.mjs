// Verifies the SEO output of the production build (run after `npm run build`).
// A missing canonical, a wrong hreflang or a broken share image should fail CI, not
// go unnoticed until a search engine or a social network shows it.
import { existsSync, readFileSync } from 'node:fs'

const problems = []
const check = (ok, message) => ok || problems.push(message)
const read = (f) => readFileSync(`dist/${f}`, 'utf8')

const ORIGIN = 'https://gupp.app'
for (const locale of ['es', 'en']) {
  const file = `${locale}/index.html`
  const html = read(file)
  const other = locale === 'es' ? 'en' : 'es'
  const get = (re) => re.exec(html)?.[1]

  check(new RegExp(`<html lang="${locale}"`).test(html), `${file}: <html lang> is not "${locale}"`)
  check(/<title>[^<]{10,}<\/title>/.test(html), `${file}: missing or too-short <title>`)
  check(/name="description"\s+content="[^"]{20,}"/.test(html), `${file}: missing or too-short meta description`)
  check(get(/rel="canonical" href="([^"]+)"/) === `${ORIGIN}/${locale}`, `${file}: canonical must be ${ORIGIN}/${locale}`)
  check(html.includes(`hreflang="${locale}" href="${ORIGIN}/${locale}"`), `${file}: hreflang for itself`)
  check(html.includes(`hreflang="${other}" href="${ORIGIN}/${other}"`), `${file}: hreflang for ${other}`)
  check(html.includes(`hreflang="x-default" href="${ORIGIN}/"`), `${file}: hreflang x-default`)
  check((html.match(/<h1[\s>]/g) ?? []).length === 1, `${file}: expected exactly one <h1> in the prerendered HTML`)
  check(!html.includes('<div id="root"></div>'), `${file}: not prerendered (empty #root)`)
  check(!/name="robots" content="noindex/.test(html), `${file}: an indexable page must not be noindex`)

  const image = get(/property="og:image" content="([^"]+)"/)
  check(image?.startsWith(`${ORIGIN}/og/`), `${file}: og:image must be an absolute ${ORIGIN}/og/ URL`)
  check(image && existsSync(`dist${image.slice(ORIGIN.length)}`), `${file}: og:image file does not exist in dist`)
  check(get(/name="twitter:card" content="([^"]+)"/) === 'summary_large_image', `${file}: twitter:card`)

  const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([^<]+)<\/script>/g)]
  const types = blocks.map((m) => {
    try {
      return JSON.parse(m[1])['@type']
    } catch {
      problems.push(`${file}: invalid JSON-LD`)
      return null
    }
  })
  check(types.includes('Organization') && types.includes('WebSite'), `${file}: JSON-LD must include Organization and WebSite`)
}

const sitemap = read('sitemap.xml')
for (const url of [`${ORIGIN}/es`, `${ORIGIN}/en`]) check(sitemap.includes(`<loc>${url}</loc>`), `sitemap.xml: missing ${url}`)
const robots = read('robots.txt')
check(/Allow: \//.test(robots) && robots.includes(`Sitemap: ${ORIGIN}/sitemap.xml`), 'robots.txt: must allow crawling and list the sitemap')
check(/name="robots" content="noindex" data-seo/.test(read('404.html')), '404.html: must carry a data-seo noindex robots tag (so useSeo replaces it, not duplicates it)')
check(!read('index.html').includes('data-seo'), 'index.html (the / redirect shell) must not carry page SEO tags')

if (problems.length) {
  console.error(problems.map((p) => `  - ${p}`).join('\n'))
  process.exit(1)
}
console.log('seo: ok')
