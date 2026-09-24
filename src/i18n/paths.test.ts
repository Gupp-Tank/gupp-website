import { describe, expect, it } from 'vitest'
import { localeFromPath, stripLocale, withLocale } from './paths'

describe('locale paths', () => {
  it.each([
    ['/es', 'es'],
    ['/en/privacy', 'en'],
    ['/', undefined],
    ['/fr', undefined],
    ['/english', undefined],
    ['', undefined],
  ])('localeFromPath(%j) -> %s', (path, expected) => expect(localeFromPath(path)).toBe(expected))

  it.each([
    ['/en/privacy', '/privacy'],
    ['/es', ''],
    ['/es/', '/'],
    ['/about', '/about'],
  ])('stripLocale(%j) -> %j', (path, expected) => expect(stripLocale(path)).toBe(expected))

  it('builds locale paths', () => {
    expect(withLocale('es')).toBe('/es')
    expect(withLocale('en', '/privacy')).toBe('/en/privacy')
    expect(withLocale('en', '/')).toBe('/en')
  })
})
