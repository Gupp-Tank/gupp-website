import { afterEach, describe, expect, it } from 'vitest'
import { themeStore } from './theme'

describe('themeStore', () => {
  afterEach(() => {
    delete document.documentElement.dataset.theme
  })

  it('defaults to light when nothing is set', () => {
    expect(themeStore.get()).toBe('light')
  })

  it('reads dark from <html data-theme>, which the pre-paint script sets', () => {
    document.documentElement.dataset.theme = 'dark'
    expect(themeStore.get()).toBe('dark')
  })

  it('writes the theme to <html> and storage', () => {
    themeStore.set('dark')
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(localStorage.getItem('gupp-theme')).toBe('dark')
    themeStore.set('light')
    expect(document.documentElement.dataset.theme).toBe('light')
  })
})
