import type { EarlyAccessFieldError } from '../types/earlyAccess'

export const EMAIL_MAX_LENGTH = 254

// Same rules as the API (gupp-docs architecture/early-access-api): trimmed, lowercased, valid, at most 254 characters.
export const normalizeEmail = (value: string): string => value.trim().toLowerCase()

// Deliberately simple: the server has the last word. This only catches typos before a round trip.
const EMAIL_SHAPE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateEmail(value: string): EarlyAccessFieldError | null {
  const email = normalizeEmail(value)
  if (email === '') return 'emailRequired'
  if (email.length > EMAIL_MAX_LENGTH || !EMAIL_SHAPE.test(email)) return 'emailInvalid'
  return null
}

export const validateConsent = (accepted: boolean): EarlyAccessFieldError | null => (accepted ? null : 'consentRequired')
