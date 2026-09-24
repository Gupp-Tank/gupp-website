import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { AppError, ErrorCode } from '../../errors'
import { createHttpClient } from './createHttpClient'

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status })
const identity = (data: unknown) => data
const isOk = (data: unknown) => {
  if ((data as { ok?: unknown })?.ok !== true) throw new Error('bad shape')
  return data as { ok: true }
}

const client = (fetchImpl: typeof fetch, extra = {}) => createHttpClient({ baseUrl: 'https://api.gupp.app', fetchImpl, ...extra })
const codeOf = async (promise: Promise<unknown>) => {
  const error = await promise.then(() => undefined, (e: unknown) => e)
  expect(error).toBeInstanceOf(AppError)
  return (error as AppError).code
}

describe('createHttpClient', () => {
  it('returns validated data and builds the URL from base + path', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(json({ ok: true }))
    await expect(client(fetchImpl).request({ path: '/early-access', parse: isOk })).resolves.toEqual({ ok: true })
    expect(fetchImpl.mock.calls[0][0]).toBe('https://api.gupp.app/early-access')
    expect(fetchImpl.mock.calls[0][1]).toMatchObject({ method: 'GET', credentials: 'omit' })
  })

  it('sends a JSON body with the right headers', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(json({ ok: true }))
    await client(fetchImpl).request({ path: 'x', method: 'POST', body: { email: 'a@b.co' }, parse: identity })
    const init = fetchImpl.mock.calls[0][1]
    expect(init.body).toBe('{"email":"a@b.co"}')
    expect(init.headers).toMatchObject({ 'Content-Type': 'application/json', Accept: 'application/json' })
  })

  it('treats an empty 204 body as undefined', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(new Response(null, { status: 204 }))
    await expect(client(fetchImpl).request({ path: 'x', parse: identity })).resolves.toBeUndefined()
  })

  it('maps a network failure to NETWORK_ERROR', async () => {
    const fetchImpl = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'))
    expect(await codeOf(client(fetchImpl).request({ path: 'x', parse: identity }))).toBe(ErrorCode.NETWORK_ERROR)
  })

  describe('status mapping', () => {
    it.each([
      [429, ErrorCode.RATE_LIMITED],
      [400, ErrorCode.VALIDATION_FAILED],
      [422, ErrorCode.VALIDATION_FAILED],
      [500, ErrorCode.SERVER_ERROR],
      [503, ErrorCode.SERVER_ERROR],
      [404, ErrorCode.UNKNOWN],
    ])('%i -> %s', async (status, code) => {
      const fetchImpl = vi.fn().mockResolvedValue(json({}, status))
      expect(await codeOf(client(fetchImpl).request({ path: 'x', parse: identity }))).toBe(code)
    })

    it('still maps the status when the error body is not JSON', async () => {
      const fetchImpl = vi.fn().mockResolvedValue(new Response('<html>bad gateway</html>', { status: 502 }))
      expect(await codeOf(client(fetchImpl).request({ path: 'x', parse: identity }))).toBe(ErrorCode.SERVER_ERROR)
    })

    it('prefers a known code from the API error body', async () => {
      const fetchImpl = vi.fn().mockResolvedValue(json({ code: 'RATE_LIMITED', message: 'slow down' }, 400))
      const error = await client(fetchImpl).request({ path: 'x', parse: identity }).catch((e: AppError) => e)
      expect(error).toMatchObject({ code: ErrorCode.RATE_LIMITED, message: 'slow down' })
    })

    it('ignores an unknown API code and falls back to the status', async () => {
      const fetchImpl = vi.fn().mockResolvedValue(json({ code: 'EMAIL_TAKEN' }, 500))
      expect(await codeOf(client(fetchImpl).request({ path: 'x', parse: identity }))).toBe(ErrorCode.SERVER_ERROR)
    })
  })

  describe('response validation', () => {
    it('rejects malformed JSON on success as INVALID_RESPONSE', async () => {
      const fetchImpl = vi.fn().mockResolvedValue(new Response('not json', { status: 200 }))
      expect(await codeOf(client(fetchImpl).request({ path: 'x', parse: identity }))).toBe(ErrorCode.INVALID_RESPONSE)
    })

    it('rejects a body that fails the parser as INVALID_RESPONSE', async () => {
      const fetchImpl = vi.fn().mockResolvedValue(json({ ok: false }))
      expect(await codeOf(client(fetchImpl).request({ path: 'x', parse: isOk }))).toBe(ErrorCode.INVALID_RESPONSE)
    })
  })

  describe('timeouts', () => {
    beforeEach(() => vi.useFakeTimers())
    afterEach(() => vi.useRealTimers())

    const hangingFetch = ((_url: string, init: RequestInit) =>
      new Promise((_resolve, reject) => {
        init.signal?.addEventListener('abort', () => reject(new DOMException('aborted', 'AbortError')))
      })) as unknown as typeof fetch

    it('aborts and maps to REQUEST_TIMEOUT', async () => {
      const pending = codeOf(client(hangingFetch, { timeoutMs: 1000 }).request({ path: 'x', parse: identity }))
      await vi.advanceTimersByTimeAsync(1001)
      expect(await pending).toBe(ErrorCode.REQUEST_TIMEOUT)
    })

    it('lets a single request override the default timeout', async () => {
      const pending = codeOf(client(hangingFetch, { timeoutMs: 60_000 }).request({ path: 'x', parse: identity, timeoutMs: 500 }))
      await vi.advanceTimersByTimeAsync(501)
      expect(await pending).toBe(ErrorCode.REQUEST_TIMEOUT)
    })
  })

  it('throws an AppError when the base URL is not configured', async () => {
    const fetchImpl = vi.fn()
    const unconfigured = createHttpClient({ baseUrl: undefined, fetchImpl })
    expect(await codeOf(unconfigured.request({ path: 'x', parse: identity }))).toBe(ErrorCode.UNKNOWN)
    expect(fetchImpl).not.toHaveBeenCalled()
  })
})
