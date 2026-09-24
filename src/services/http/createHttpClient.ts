import { AppError, ErrorCode, isErrorCode } from '../../errors'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface RequestOptions<T> {
  path: string
  method?: HttpMethod
  body?: unknown
  /** Validates the parsed JSON against a typed model; throw to reject it. */
  parse: (data: unknown) => T
  timeoutMs?: number
}

export interface HttpClient {
  request<T>(options: RequestOptions<T>): Promise<T>
}

interface HttpClientConfig {
  baseUrl: string | undefined
  timeoutMs?: number
  fetchImpl?: typeof fetch
}

const DEFAULT_TIMEOUT_MS = 10_000

// Maps a failed HTTP status to a code. The API's own `{ code }` wins when it
// is one we know (gupp-docs/standards/error-contract); the status is the fallback.
function codeForStatus(status: number): ErrorCode {
  if (status === 429) return ErrorCode.RATE_LIMITED
  if (status === 400 || status === 422) return ErrorCode.VALIDATION_FAILED
  if (status >= 500) return ErrorCode.SERVER_ERROR
  return ErrorCode.UNKNOWN
}

async function readJson(response: Response): Promise<unknown> {
  const text = await response.text()
  return text === '' ? undefined : JSON.parse(text)
}

export function createHttpClient({ baseUrl, timeoutMs = DEFAULT_TIMEOUT_MS, fetchImpl = fetch }: HttpClientConfig): HttpClient {
  return {
    async request<T>({ path, method = 'GET', body, parse, timeoutMs: requestTimeout }: RequestOptions<T>): Promise<T> {
      if (!baseUrl) throw new AppError(ErrorCode.UNKNOWN, 'API base URL is not configured (VITE_API_BASE_URL)')

      const controller = new AbortController()
      const timer = setTimeout(() => controller.abort(), requestTimeout ?? timeoutMs)
      const url = `${baseUrl}/${path.replace(/^\//, '')}`

      let response: Response
      try {
        response = await fetchImpl(url, {
          method,
          headers: { Accept: 'application/json', ...(body !== undefined && { 'Content-Type': 'application/json' }) },
          body: body === undefined ? undefined : JSON.stringify(body),
          credentials: 'omit',
          signal: controller.signal,
        })
      } catch (error) {
        clearTimeout(timer)
        if (controller.signal.aborted) throw new AppError(ErrorCode.REQUEST_TIMEOUT, `${method} ${url} timed out`, { cause: error })
        throw new AppError(ErrorCode.NETWORK_ERROR, `${method} ${url} failed`, { cause: error })
      }

      try {
        // The timer keeps running through the body read: a stalled body is still a timeout.
        let data: unknown
        try {
          data = await readJson(response)
        } catch (error) {
          if (controller.signal.aborted) throw new AppError(ErrorCode.REQUEST_TIMEOUT, `${method} ${url} timed out`, { cause: error })
          if (!response.ok) throw new AppError(codeForStatus(response.status), `${method} ${url} -> ${response.status}`)
          throw new AppError(ErrorCode.INVALID_RESPONSE, `${method} ${url} returned invalid JSON`, { cause: error })
        }

        if (!response.ok) {
          const apiCode = (data as { code?: unknown } | undefined)?.code
          const apiMessage = (data as { message?: unknown } | undefined)?.message
          throw new AppError(
            isErrorCode(apiCode) ? apiCode : codeForStatus(response.status),
            typeof apiMessage === 'string' ? apiMessage : `${method} ${url} -> ${response.status}`,
          )
        }

        try {
          return parse(data)
        } catch (error) {
          throw new AppError(ErrorCode.INVALID_RESPONSE, `${method} ${url} returned an unexpected shape`, { cause: error })
        }
      } finally {
        clearTimeout(timer)
      }
    },
  }
}
