import { describe, expect, it } from 'vitest'
import { buildRobots, buildSeo, buildSitemap } from './seo'

const base = { locale: 'en' as const, path: '', title: 'T', description: 'D' }
const find = (tags: ReturnType<typeof buildSeo>['tags'], match: Record<string, string>) =>
  tags.find((t) => Object.entries(match).every(([k, v]) => t.attrs[k] === v))

describe('buildSeo', () => {
  it('has a self-referencing canonical, an alternate per language and an x-default', () => {
    const { tags } = buildSeo(base)
    expect(find(tags, { rel: 'canonical' })!.attrs.href).toBe('https://gupp.app/en')
    expect(find(tags, { hreflang: 'es' })!.attrs.href).toBe('https://gupp.app/es')
    expect(find(tags, { hreflang: 'en' })!.attrs.href).toBe('https://gupp.app/en')
    expect(find(tags, { hreflang: 'x-default' })!.attrs.href).toBe('https://gupp.app/')
  })

  it('emits absolute Open Graph and Twitter image URLs per language', () => {
    const es = buildSeo({ ...base, locale: 'es' }).tags
    expect(find(es, { property: 'og:image' })!.attrs.content).toBe('https://gupp.app/og/og-es.jpg')
    expect(find(es, { name: 'twitter:image' })!.attrs.content).toBe('https://gupp.app/og/og-es.jpg')
    expect(find(es, { property: 'og:locale' })!.attrs.content).toBe('es_LA')
    expect(find(es, { property: 'og:locale:alternate' })!.attrs.content).toBe('en_US')
    expect(find(es, { name: 'twitter:card' })!.attrs.content).toBe('summary_large_image')
  })

  it('carries a sub-path through canonical and alternates', () => {
    const { tags } = buildSeo({ ...base, path: '/privacy' })
    expect(find(tags, { rel: 'canonical' })!.attrs.href).toBe('https://gupp.app/en/privacy')
    expect(find(tags, { hreflang: 'es' })!.attrs.href).toBe('https://gupp.app/es/privacy')
  })

  it('adds noindex and drops structured data for utility pages', () => {
    const seo = buildSeo({ ...base, noindex: true })
    expect(find(seo.tags, { name: 'robots' })!.attrs.content).toBe('noindex, follow')
    expect(seo.jsonLd).toEqual([])
  })

  it('only claims what is true: no MobileApplication before there is a store listing', () => {
    expect(buildSeo(base).jsonLd.map((d) => (d as { '@type': string })['@type'])).toEqual(['Organization', 'WebSite'])
  })
})

describe('sitemap and robots', () => {
  it('lists every language of every page with its alternates', () => {
    const xml = buildSitemap([''])
    expect(xml).toContain('<loc>https://gupp.app/es</loc>')
    expect(xml).toContain('<loc>https://gupp.app/en</loc>')
    expect(xml.match(/hreflang="es"/g)).toHaveLength(2)
    expect(xml.match(/<url>/g)).toHaveLength(2)
  })

  it('robots allows crawling and points at the sitemap', () => {
    expect(buildRobots()).toContain('Allow: /')
    expect(buildRobots()).toContain('Sitemap: https://gupp.app/sitemap.xml')
  })

  it('adds FAQPage structured data only when questions are given and the page is indexable', () => {
    const faq = [{ question: 'Q1?', answer: 'A1' }]
    const types = (input: Parameters<typeof buildSeo>[0]) => buildSeo(input).jsonLd.map((d) => (d as { '@type': string })['@type'])
    const base = { locale: 'es' as const, path: '', title: 'T', description: 'D' }
    expect(types(base)).not.toContain('FAQPage')
    expect(types({ ...base, faq })).toContain('FAQPage')
    expect(types({ ...base, faq, noindex: true })).toEqual([])
    const page = buildSeo({ ...base, faq }).jsonLd.find((d) => (d as { '@type': string })['@type'] === 'FAQPage') as { mainEntity: { name: string; acceptedAnswer: { text: string } }[] }
    expect(page.mainEntity[0]).toMatchObject({ name: 'Q1?', acceptedAnswer: { text: 'A1' } })
  })

  it('points x-default at the root for the home page and at the default language for inner pages', () => {
    const xDefault = (path: string) => buildSeo({ locale: 'en', path, title: 'T', description: 'D' }).tags.find((t) => t.attrs.hreflang === 'x-default')?.attrs.href
    expect(xDefault('')).toBe('https://gupp.app/')
    expect(xDefault('/privacy')).toBe('https://gupp.app/es/privacy')
  })
})
