import { describe, expect, it } from 'vitest'
import { formatDate, formatList, formatNumber, pluralize } from './format'

describe('format', () => {
  it('uses the locale decimal separator', () => {
    expect(formatNumber('en', 25.4)).toBe('25.4')
    expect(formatNumber('es', 25.4)).toBe('25,4')
  })

  it('passes number options through', () => {
    expect(formatNumber('en', 0.87, { style: 'percent' })).toBe('87%')
  })

  it('joins lists with the locale conjunction', () => {
    expect(formatList('en', ['a', 'b', 'c'])).toBe('a, b, and c')
    expect(formatList('es', ['a', 'b', 'c'])).toBe('a, b y c')
  })

  it('formats dates per locale', () => {
    const date = new Date(Date.UTC(2026, 8, 24, 12))
    const opts = { dateStyle: 'long', timeZone: 'UTC' } as const
    expect(formatDate('en', date, opts)).toBe('September 24, 2026')
    expect(formatDate('es', date, opts)).toBe('24 de septiembre de 2026')
  })

  it('selects the plural form', () => {
    const days = { one: 'day', other: 'days' }
    expect(pluralize('en', 1, days)).toBe('day')
    expect(pluralize('en', 3, days)).toBe('days')
    expect(pluralize('es', 1, { one: 'día', other: 'días' })).toBe('día')
  })

  it('falls back to "other" when a category has no form', () => {
    expect(pluralize('es', 1_000_000, { one: 'x', other: 'y' })).toBe('y')
  })
})
