import { describe, expect, it } from 'vitest'
import { dayOfYear, factOfTheDay } from './funFact'

describe('dayOfYear', () => {
  it.each([
    [new Date(2026, 0, 1), 1],
    [new Date(2026, 1, 1), 32],
    [new Date(2026, 11, 31), 365],
    [new Date(2028, 11, 31), 366],
  ])('%s -> %i', (date, expected) => expect(dayOfYear(date)).toBe(expected))

  it('does not depend on the time of day', () => {
    expect(dayOfYear(new Date(2026, 5, 10, 0, 0, 1))).toBe(dayOfYear(new Date(2026, 5, 10, 23, 59, 59)))
  })
})

describe('factOfTheDay', () => {
  it('stays inside the list and advances one per day', () => {
    expect(factOfTheDay(5, new Date(2026, 0, 1))).toBe(1)
    expect(factOfTheDay(5, new Date(2026, 0, 2))).toBe(2)
    expect(factOfTheDay(5, new Date(2026, 0, 5))).toBe(0)
  })

  it('handles an empty list', () => {
    expect(factOfTheDay(0, new Date())).toBe(0)
  })
})
