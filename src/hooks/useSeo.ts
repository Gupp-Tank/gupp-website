import { useEffect } from 'react'
import { buildSeo, type SeoInput } from '../lib/seo'

const MARK = 'data-seo'

// Keeps <title>, the description and the SEO tags in step with the current page.
// The prerendered HTML already carries the same tags (from the same buildSeo); this
// replaces them when the visitor navigates, and after a language switch.
export function useSeo(input: SeoInput) {
  const { locale, path, title, description, noindex, faq } = input

  useEffect(() => {
    const seo = buildSeo({ locale, path, title, description, noindex, faq })
    document.title = seo.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', seo.description)

    document.head.querySelectorAll(`[${MARK}]`).forEach((node) => node.remove())
    for (const { tag, attrs } of seo.tags) {
      const el = document.createElement(tag)
      for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v)
      el.setAttribute(MARK, '')
      document.head.append(el)
    }
    for (const data of seo.jsonLd) {
      const el = document.createElement('script')
      el.type = 'application/ld+json'
      el.setAttribute(MARK, '')
      el.textContent = JSON.stringify(data)
      document.head.append(el)
    }
  }, [locale, path, title, description, noindex, faq])
}
