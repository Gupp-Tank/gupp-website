import { renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import type { SeoInput } from '../lib/seo'
import { useSeo } from './useSeo'

const input: SeoInput = { locale: 'es', path: '', title: 'Título', description: 'Descripción' }
const head = (sel: string) => document.head.querySelector(sel)

describe('useSeo', () => {
  beforeEach(() => {
    document.head.innerHTML = '<meta name="description" content="old">'
    document.title = 'old'
  })

  it('sets the title, description, canonical, hreflang alternates and Open Graph tags', () => {
    renderHook(() => useSeo(input))
    expect(document.title).toBe('Título')
    expect(head('meta[name="description"]')).toHaveAttribute('content', 'Descripción')
    expect(head('link[rel="canonical"]')).toHaveAttribute('href', 'https://gupp.app/es')
    expect(head('link[hreflang="en"]')).toHaveAttribute('href', 'https://gupp.app/en')
    expect(head('link[hreflang="x-default"]')).toHaveAttribute('href', 'https://gupp.app/')
    expect(head('meta[property="og:title"]')).toHaveAttribute('content', 'Título')
    expect(head('meta[property="og:image"]')).toHaveAttribute('content', 'https://gupp.app/og/og-es.jpg')
  })

  it('writes valid JSON-LD for the organization and the website', () => {
    renderHook(() => useSeo(input))
    const types = [...document.head.querySelectorAll('script[type="application/ld+json"]')].map((s) => JSON.parse(s.textContent!)['@type'])
    expect(types).toEqual(['Organization', 'WebSite'])
  })

  it('replaces the previous tags on a language switch instead of piling them up', () => {
    const { rerender } = renderHook((props) => useSeo(props), { initialProps: input })
    rerender({ locale: 'en', path: '', title: 'Title', description: 'Description' })
    expect(document.title).toBe('Title')
    expect(document.head.querySelectorAll('link[rel="canonical"]')).toHaveLength(1)
    expect(head('link[rel="canonical"]')).toHaveAttribute('href', 'https://gupp.app/en')
    expect(document.head.querySelectorAll('script[type="application/ld+json"]')).toHaveLength(2)
  })

  it('marks utility pages noindex and gives them no structured data', () => {
    renderHook(() => useSeo({ ...input, path: '/404', noindex: true }))
    expect(head('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow')
    expect(document.head.querySelectorAll('script[type="application/ld+json"]')).toHaveLength(0)
  })
})
