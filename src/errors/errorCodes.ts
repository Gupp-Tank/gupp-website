// A const object + union instead of `enum`: tsconfig sets `erasableSyntaxOnly`,
// which forbids TypeScript enums. Same usage (`ErrorCode.NETWORK_ERROR`) and
// the same exhaustive checking.
//
// Codes are SCREAMING_SNAKE_CASE to match the API contract
// (gupp-docs/standards/error-contract). Add a code here and its copy in BOTH
// dictionaries the same day: a missing entry is a type error.
export const ErrorCode = {
  UNKNOWN: 'UNKNOWN',
  NETWORK_ERROR: 'NETWORK_ERROR',
  REQUEST_TIMEOUT: 'REQUEST_TIMEOUT',
  INVALID_RESPONSE: 'INVALID_RESPONSE',
  SERVER_ERROR: 'SERVER_ERROR',
  RATE_LIMITED: 'RATE_LIMITED',
  VALIDATION_FAILED: 'VALIDATION_FAILED',
  RENDER_FAILED: 'RENDER_FAILED',
} as const

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode]

// User-facing copy per code, one table per locale.
export type ErrorMessages = Record<ErrorCode, string>

const KNOWN = new Set<string>(Object.values(ErrorCode))
export const isErrorCode = (value: unknown): value is ErrorCode => typeof value === 'string' && KNOWN.has(value)
