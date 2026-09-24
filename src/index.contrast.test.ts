/// <reference types="node" />
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

// Vitest strips CSS from `?raw` imports, so read the token file directly.
const css = readFileSync('src/index.css', 'utf8')

// Guards the color tokens: the pairs the site actually uses must stay readable
// in BOTH themes. Fails if someone edits a token and breaks contrast.
const block = (selector: string) => {
  const start = css.indexOf(selector)
  const body = css.slice(css.indexOf('{', start) + 1, css.indexOf('\n}', start))
  return Object.fromEntries([...body.matchAll(/(--[\w-]+)\s*:\s*(#[0-9a-fA-F]{6})/g)].map((m) => [m[1], m[2]]))
}
const light = block(':root {')
const themes = { light, dark: { ...light, ...block(":root[data-theme='dark']") } }

const luminance = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
const ratio = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

// [foreground, background, minimum ratio]. 4.5 = AA for body text, 3 = large text and UI.
const PAIRS: Array<[string, string, number]> = [
  ['text-primary', 'bg', 4.5],
  ['text-primary', 'surface', 4.5],
  ['text-body', 'bg', 4.5],
  ['text-body', 'surface', 4.5],
  ['headline-muted', 'bg', 3],
  ['primary-green', 'bg', 4.5],
  ['primary-green', 'surface', 4.5],
  ['on-primary', 'primary-green', 4.5],
  ['nav-active-fg', 'nav-active-bg', 4.5],
  ['secondary-blue', 'bg', 4.5],
  ['secondary-blue', 'surface', 4.5],
  ['warning', 'surface', 4.5],
]

describe.each(Object.entries(themes))('%s theme contrast', (_name, tokens) => {
  it.each(PAIRS)('--%s on --%s is at least %s:1 where it is used', (fg, bg, min) => {
    const value = ratio(tokens[`--${fg}`], tokens[`--${bg}`])
    expect(value, `${fg} on ${bg} = ${value.toFixed(2)}`).toBeGreaterThanOrEqual(min)
  })
})

describe('text-secondary', () => {
  // 3.5:1 on white in light mode: fine for large text and decoration, not for small copy.
  it('is not relied on for small text on surfaces in light mode', () => {
    expect(ratio(themes.light['--text-secondary'], themes.light['--surface'])).toBeLessThan(4.5)
  })
})
