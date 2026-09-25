import { describe, expect, it } from 'vitest'
import { EMAIL_MAX_LENGTH, normalizeEmail, validateConsent, validateEmail } from './earlyAccess'

describe('early-access validation (mirrors the API)', () => {
  it('normalizes: trims and lowercases', () => {
    expect(normalizeEmail('  Ana@Example.COM ')).toBe('ana@example.com')
  })

  it.each([['', 'emailRequired'], ['   ', 'emailRequired']] as const)('requires an email: %j', (value, expected) => {
    expect(validateEmail(value)).toBe(expected)
  })

  it.each(['ana', 'ana@', 'ana@example', '@example.com', 'a na@example.com', 'ana@example.c'])('rejects a malformed email: %s', (value) => {
    expect(validateEmail(value)).toBe('emailInvalid')
  })

  it('rejects an email longer than the API accepts', () => {
    expect(validateEmail(`${'a'.repeat(EMAIL_MAX_LENGTH)}@example.com`)).toBe('emailInvalid')
  })

  it.each(['ana@example.com', ' ANA@Example.com ', 'ana+aqua@mail.example.co'])('accepts %s', (value) => {
    expect(validateEmail(value)).toBeNull()
  })

  it('needs explicit consent', () => {
    expect(validateConsent(false)).toBe('consentRequired')
    expect(validateConsent(true)).toBeNull()
  })
})
