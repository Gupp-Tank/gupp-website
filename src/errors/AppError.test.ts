import { describe, expect, it } from 'vitest'
import { AppError, ErrorCode, getErrorMessage, toAppError, type ErrorMessages } from '.'

describe('toAppError', () => {
  it('returns an AppError unchanged', () => {
    const original = new AppError(ErrorCode.RATE_LIMITED)
    expect(toAppError(original)).toBe(original)
  })

  it('wraps a plain Error as UNKNOWN and keeps it as the cause', () => {
    const cause = new Error('boom')
    const result = toAppError(cause)
    expect(result.code).toBe(ErrorCode.UNKNOWN)
    expect(result.message).toBe('boom')
    expect(result.cause).toBe(cause)
  })

  it('accepts an object carrying a known code', () => {
    expect(toAppError({ code: 'SERVER_ERROR' }).code).toBe(ErrorCode.SERVER_ERROR)
  })

  it.each([undefined, null, 42, 'text', { code: 'NOT_A_CODE' }])('maps %j to UNKNOWN', (value) => {
    expect(toAppError(value).code).toBe(ErrorCode.UNKNOWN)
  })

  it('defaults the log message to the code', () => {
    expect(new AppError(ErrorCode.NETWORK_ERROR).message).toBe('NETWORK_ERROR')
  })
})

describe('getErrorMessage', () => {
  const messages = Object.fromEntries(Object.values(ErrorCode).map((c) => [c, `copy:${c}`])) as ErrorMessages

  it('resolves copy by code, never by the raw message', () => {
    expect(getErrorMessage(new AppError(ErrorCode.REQUEST_TIMEOUT, 'internal detail'), messages)).toBe('copy:REQUEST_TIMEOUT')
  })

  it('falls back to the UNKNOWN copy for anything else', () => {
    expect(getErrorMessage('oops', messages)).toBe('copy:UNKNOWN')
  })
})
