import { describe, expect, it, vi } from 'vitest'
import { AppError, ErrorCode } from '../errors'
import { createAuthService } from './authService'
import { createHttpClient } from './http'

const request = { token: 'test-token-123', newPassword: 'SuperSecretPassword12' }
const respond = (status: number, body?: unknown) =>
  vi.fn(async () => new Response(body !== undefined ? JSON.stringify(body) : '', { status }))
const serviceWith = (fetchImpl: typeof fetch) =>
  createAuthService(createHttpClient({ baseUrl: 'https://api.test', fetchImpl }))

describe('authService', () => {
  describe('resetPassword', () => {
    it('POSTs { token, newPassword } to /api/v1/auth/reset-password without credentials on 200', async () => {
      const fetchImpl = respond(200)
      await expect(serviceWith(fetchImpl as unknown as typeof fetch).resetPassword(request)).resolves.toBeUndefined()

      const [url, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit]
      expect(url).toBe('https://api.test/api/v1/auth/reset-password')
      expect(init.method).toBe('POST')
      expect(init.credentials).toBe('omit')
      expect(JSON.parse(init.body as string)).toEqual(request)
    })

    it('turns a 401 INVALID_RESET_TOKEN response into an AppError with that code', async () => {
      const fetchImpl = respond(401, { code: 'INVALID_RESET_TOKEN', message: 'Token expired or invalid' })
      const error = await serviceWith(fetchImpl as unknown as typeof fetch)
        .resetPassword(request)
        .catch((e: unknown) => e)

      expect(error).toBeInstanceOf(AppError)
      expect((error as AppError).code).toBe(ErrorCode.INVALID_RESET_TOKEN)
    })

    it('turns a 400 response into an AppError with VALIDATION_FAILED code', async () => {
      const fetchImpl = respond(400, { message: 'Password too weak' })
      const error = await serviceWith(fetchImpl as unknown as typeof fetch)
        .resetPassword(request)
        .catch((e: unknown) => e)

      expect(error).toBeInstanceOf(AppError)
      expect((error as AppError).code).toBe(ErrorCode.VALIDATION_FAILED)
    })

    it('reports a network failure as NETWORK_ERROR', async () => {
      const failing = vi.fn(async () => {
        throw new TypeError('offline')
      })
      const error = await serviceWith(failing as unknown as typeof fetch)
        .resetPassword(request)
        .catch((e: unknown) => e)

      expect(error).toBeInstanceOf(AppError)
      expect((error as AppError).code).toBe(ErrorCode.NETWORK_ERROR)
    })

    it('turns a 500 response into a SERVER_ERROR', async () => {
      const fetchImpl = respond(500, { message: 'Internal server error' })
      const error = await serviceWith(fetchImpl as unknown as typeof fetch)
        .resetPassword(request)
        .catch((e: unknown) => e)

      expect(error).toBeInstanceOf(AppError)
      expect((error as AppError).code).toBe(ErrorCode.SERVER_ERROR)
    })
  })
})
