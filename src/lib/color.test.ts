import { describe, expect, it } from 'vitest'
import { hexToRgbUnit } from './color'

describe('hexToRgbUnit', () => {
  it('converts a hex color to 0-1 channels', () => {
    expect(hexToRgbUnit('#ff8000')).toEqual([1, 128 / 255, 0])
    expect(hexToRgbUnit('#0d5c73').map((v) => Math.round(v * 255))).toEqual([13, 92, 115])
  })

  it('accepts a missing # and surrounding whitespace, in any case', () => {
    expect(hexToRgbUnit('  0D5C73 ')).toEqual(hexToRgbUnit('#0d5c73'))
  })

  it.each(['', 'red', '#fff', '#12345', '#gggggg'])('falls back to black for %j', (value) => {
    expect(hexToRgbUnit(value)).toEqual([0, 0, 0])
  })
})
