import { act, renderHook } from '@testing-library/react'
import type { ReactNode } from 'react'
import { MemoryRouter } from 'react-router'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { themeStore } from '../lib/theme'
import { localeStore } from '../i18n/locales'
import { useCountUp } from './useCountUp'
import { useFormat } from './useFormat'
import { useLocalePath } from './useLocalePath'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'
import { useScrolled } from './useScrolled'
import { useTheme } from './useTheme'

// A controllable matchMedia so the reduced-motion preference can flip during a test.
function mockReducedMotion(initial: boolean) {
  let matches = initial
  const listeners = new Set<() => void>()
  window.matchMedia = ((query: string) => ({
    get matches() {
      return matches
    },
    media: query,
    addEventListener: (_: string, l: () => void) => listeners.add(l),
    removeEventListener: (_: string, l: () => void) => listeners.delete(l),
  })) as unknown as typeof window.matchMedia
  return (value: boolean) => {
    matches = value
    listeners.forEach((l) => l())
  }
}

describe('usePrefersReducedMotion', () => {
  it('reads the preference and follows changes', () => {
    const set = mockReducedMotion(false)
    const { result } = renderHook(() => usePrefersReducedMotion())
    expect(result.current).toBe(false)
    act(() => set(true))
    expect(result.current).toBe(true)
  })
})

describe('useCountUp', () => {
  afterEach(() => vi.useRealTimers())

  it('returns the target immediately under reduced motion', () => {
    mockReducedMotion(true)
    const { result } = renderHook(() => useCountUp(87))
    expect(result.current).toBe(87)
  })

  it('counts from 0 up to the target, in order, otherwise', async () => {
    mockReducedMotion(false)
    vi.useFakeTimers()
    const { result } = renderHook(() => useCountUp(87, 1000))
    expect(result.current).toBe(0)
    const seen: number[] = []
    for (let i = 0; i < 12; i++) {
      await act(async () => {
        await vi.advanceTimersByTimeAsync(100)
      })
      seen.push(result.current)
    }
    expect(result.current).toBe(87)
    expect(seen).toEqual([...seen].sort((a, b) => a - b))
  })
})

describe('useScrolled', () => {
  const scrollTo = (y: number) => {
    Object.defineProperty(window, 'scrollY', { value: y, configurable: true })
    act(() => void window.dispatchEvent(new Event('scroll')))
  }
  afterEach(() => scrollTo(0))

  it('turns on once the page has scrolled past the threshold', () => {
    const { result } = renderHook(() => useScrolled(8))
    expect(result.current).toBe(false)
    scrollTo(20)
    expect(result.current).toBe(true)
    scrollTo(0)
    expect(result.current).toBe(false)
  })

  it('stops listening after unmount', () => {
    const remove = vi.spyOn(window, 'removeEventListener')
    renderHook(() => useScrolled()).unmount()
    expect(remove).toHaveBeenCalledWith('scroll', expect.any(Function))
  })
})

describe('useTheme', () => {
  afterEach(() => act(() => themeStore.set('light')))

  it('toggles between light and dark through the store', () => {
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('light')
    act(() => result.current.toggleTheme())
    expect(result.current.theme).toBe('dark')
    expect(document.documentElement.dataset.theme).toBe('dark')
    act(() => result.current.toggleTheme())
    expect(result.current.theme).toBe('light')
  })
})

describe('locale hooks', () => {
  const wrapper = ({ children }: { children: ReactNode }) => <MemoryRouter>{children}</MemoryRouter>
  afterEach(() => act(() => localeStore.set('es')))

  it('useLocalePath prefixes paths with the active language', () => {
    const { result } = renderHook(() => useLocalePath(), { wrapper })
    expect(result.current()).toBe('/es')
    expect(result.current('/privacy')).toBe('/es/privacy')
    act(() => localeStore.set('en'))
    expect(result.current('/privacy')).toBe('/en/privacy')
  })

  it('useFormat binds the helpers to the active language', () => {
    const { result } = renderHook(() => useFormat())
    expect(result.current.number(25.4)).toBe('25,4')
    expect(result.current.list(['a', 'b'])).toBe('a y b')
    expect(result.current.plural(1, { one: 'día', other: 'días' })).toBe('día')
    expect(result.current.date(Date.UTC(2026, 8, 24, 12), { dateStyle: 'long', timeZone: 'UTC' })).toBe('24 de septiembre de 2026')
    act(() => localeStore.set('en'))
    expect(result.current.number(25.4)).toBe('25.4')
    expect(result.current.list(['a', 'b'])).toBe('a and b')
  })
})

