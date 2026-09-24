import { describe, expect, it } from 'vitest'
import { AppError, ErrorCode } from '../../errors'
import { http } from '.'

describe('shared http client', () => {
  it('fails with an AppError, without any request, when VITE_API_BASE_URL is not configured', async () => {
    const error = await http.request({ path: 'x', parse: (d) => d }).catch((e: unknown) => e)
    expect(error).toBeInstanceOf(AppError)
    expect((error as AppError).code).toBe(ErrorCode.UNKNOWN)
  })
})
