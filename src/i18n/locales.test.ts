import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import indexHtml from '../../index.html?raw'
import { dictionaries } from './dictionaries'
import { DEFAULT_LOCALE, LOCALES, LOCALE_NAMES, localeStore } from './locales'

describe('localeStore', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.lang = ''
  })
  afterEach(() => vi.restoreAllMocks())

  it('falls back to the default locale when <html lang> is not supported', () => {
    document.documentElement.lang = 'fr'
    expect(localeStore.get()).toBe(DEFAULT_LOCALE)
  })

  it('applies the locale to <html lang>, persists it and notifies subscribers', () => {
    const listener = vi.fn()
    const unsubscribe = localeStore.subscribe(listener)
    localeStore.set('en')
    expect(document.documentElement.lang).toBe('en')
    expect(localStorage.getItem('gupp-locale')).toBe('en')
    expect(localeStore.get()).toBe('en')
    expect(listener).toHaveBeenCalledTimes(1)
    unsubscribe()
    localeStore.set('es')
    expect(listener).toHaveBeenCalledTimes(1)
  })

  it('still applies the choice when storage is blocked', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('blocked', 'SecurityError')
    })
    expect(() => localeStore.set('en')).not.toThrow()
    expect(document.documentElement.lang).toBe('en')
  })
})

describe('locale registry', () => {
  it('has a dictionary and a display name for every locale', () => {
    for (const locale of LOCALES) {
      expect(dictionaries[locale]).toBeDefined()
      expect(LOCALE_NAMES[locale]).toBeTruthy()
    }
  })

  // index.html resolves the language before React loads; a locale missing there
  // would flash the wrong language for returning visitors.
  it('lists every locale in the pre-paint script of index.html', () => {
    for (const locale of LOCALES) expect(indexHtml).toContain(`'${locale}'`)
  })
})
