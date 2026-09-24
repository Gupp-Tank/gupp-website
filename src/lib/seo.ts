import { site } from '../content/site'
import { LOCALES, type Locale } from '../i18n/locales'
import { withLocale } from '../i18n/paths'

export interface SeoInput {
  locale: Locale
  /** Path without the language prefix: '' for the home page. */
  path: string
  title: string
  description: string
  /** Keep the page out of search results (404s, utility pages). */
  noindex?: boolean
}

export interface SeoTag {
  tag: 'meta' | 'link'
  attrs: Record<string, string>
}

export interface Seo {
  title: string
  description: string
  tags: SeoTag[]
  jsonLd: object[]
}

const abs = (path: string) => `${site.url}${path}`
const meta = (key: 'name' | 'property', name: string, content: string): SeoTag => ({ tag: 'meta', attrs: { [key]: name, content } })

// One function builds every SEO tag, so the prerendered HTML and the client-side
// updates on navigation can never disagree.
export function buildSeo({ locale, path, title, description, noindex }: SeoInput): Seo {
  const url = abs(withLocale(locale, path))
  const image = abs(site.ogImage[locale])
  const others = LOCALES.filter((l) => l !== locale)

  const tags: SeoTag[] = [
    { tag: 'link', attrs: { rel: 'canonical', href: url } },
    ...LOCALES.map((l): SeoTag => ({ tag: 'link', attrs: { rel: 'alternate', hreflang: l, href: abs(withLocale(l, path)) } })),
    { tag: 'link', attrs: { rel: 'alternate', hreflang: 'x-default', href: abs('/') } },
    meta('property', 'og:type', 'website'),
    meta('property', 'og:site_name', site.name),
    meta('property', 'og:title', title),
    meta('property', 'og:description', description),
    meta('property', 'og:url', url),
    meta('property', 'og:image', image),
    meta('property', 'og:locale', site.ogLocale[locale]),
    ...others.map((l) => meta('property', 'og:locale:alternate', site.ogLocale[l])),
    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:title', title),
    meta('name', 'twitter:description', description),
    meta('name', 'twitter:image', image),
  ]
  if (noindex) tags.push(meta('name', 'robots', 'noindex, follow'))

  // Structured data only where it is true today. A MobileApplication entry comes with
  // the store listings (claiming an installable app before it exists would be false).
  const jsonLd: object[] = noindex
    ? []
    : [
        { '@context': 'https://schema.org', '@type': 'Organization', name: site.name, url: site.url, logo: abs(site.logo) },
        { '@context': 'https://schema.org', '@type': 'WebSite', name: site.name, url, inLanguage: locale },
      ]

  return { title, description, tags, jsonLd }
}

// sitemap.xml with the hreflang alternates for every page in every language.
export function buildSitemap(paths: string[] = ['']): string {
  const entries = paths.flatMap((path) =>
    LOCALES.map((locale) => {
      const alternates = LOCALES.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${abs(withLocale(l, path))}"/>`).join('\n')
      return `  <url>\n    <loc>${abs(withLocale(locale, path))}</loc>\n${alternates}\n  </url>`
    }),
  )
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join('\n')}\n</urlset>\n`
}

export const buildRobots = (): string => `User-agent: *\nAllow: /\n\nSitemap: ${abs('/sitemap.xml')}\n`
