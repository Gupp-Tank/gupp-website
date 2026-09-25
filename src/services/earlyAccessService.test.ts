import { describe, expect, it, vi } from 'vitest'
import { AppError, ErrorCode } from '../errors'
import { createEarlyAccessService } from './earlyAccessService'
import { createHttpClient } from './http'

const request = { email: 'ana@example.com', locale: 'es' as const, tankType: null, consent: { accepted: true as const, documentsVersion: '2026-09-24' } }
const respond = (status: number, body: unknown) => vi.fn(async () => new Response(JSON.stringify(body), { status }))
const serviceWith = (fetchImpl: typeof fetch) => createEarlyAccessService(createHttpClient({ baseUrl: 'https://api.test', fetchImpl }))

describe('earlyAccessService', () => {
  it('POSTs the contract body to /api/v1/early-access without credentials', async () => {
    const fetchImpl = respond(201, { registered: true })
    await expect(serviceWith(fetchImpl as unknown as typeof fetch).register(request)).resolves.toEqual({ registered: true })
    const [url, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit]
    expect(url).toBe('https://api.test/api/v1/early-access')
    expect(init.method).toBe('POST')
    expect(init.credentials).toBe('omit')
    expect(JSON.parse(init.body as string)).toEqual(request)
  })

  it.each([
    [400, { code: 'CONSENT_REQUIRED', message: 'x' }, ErrorCode.CONSENT_REQUIRED],
    [429, { code: 'RATE_LIMITED', message: 'x' }, ErrorCode.RATE_LIMITED],
    [400, { code: 'VALIDATION_ERROR', message: 'x' }, ErrorCode.VALIDATION_FAILED],
    [500, { code: 'INTERNAL_ERROR', message: 'x' }, ErrorCode.SERVER_ERROR],
  ])('turns a %s response into an AppError with the right code', async (status, body, code) => {
    const error = await serviceWith(respond(status, body) as unknown as typeof fetch).register(request).catch((e) => e)
    expect(error).toBeInstanceOf(AppError)
    expect(error.code).toBe(code)
  })

  it('rejects a success response that is not the contract shape', async () => {
    const error = await serviceWith(respond(201, { ok: true }) as unknown as typeof fetch).register(request).catch((e) => e)
    expect(error.code).toBe(ErrorCode.INVALID_RESPONSE)
  })

  it('reports a network failure as NETWORK_ERROR', async () => {
    const failing = vi.fn(async () => {
      throw new TypeError('offline')
    })
    const error = await serviceWith(failing as unknown as typeof fetch).register(request).catch((e) => e)
    expect(error.code).toBe(ErrorCode.NETWORK_ERROR)
  })
})
