import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'

afterEach(cleanup)

// Tests never touch the network or leak state between each other: storage starts
// empty every time and any real fetch fails loudly (services get a fake fetch injected).
beforeEach(() => {
  localStorage.clear()
  vi.stubGlobal('fetch', () => {
    throw new Error('Network access is not allowed in tests: inject a fake fetch')
  })
})
afterEach(() => vi.unstubAllGlobals())

// jsdom lacks these; the hero uses them (reduced-motion check, WebGL canvas).
if (!window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })) as typeof window.matchMedia
}
HTMLCanvasElement.prototype.getContext = (() => null) as typeof HTMLCanvasElement.prototype.getContext
