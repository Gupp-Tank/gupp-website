import type { EarlyAccessRequest, EarlyAccessResult } from '../types/earlyAccess'
import { http, type HttpClient } from './http'

const parseResult = (data: unknown): EarlyAccessResult => {
  if ((data as { registered?: unknown } | null)?.registered !== true) throw new Error('unexpected early-access response')
  return { registered: true }
}

// Every failure is an AppError (the HTTP client guarantees it), keyed by the API's error code.
export function createEarlyAccessService(client: HttpClient) {
  return {
    register: (request: EarlyAccessRequest): Promise<EarlyAccessResult> =>
      client.request({ path: '/api/v1/early-access', method: 'POST', body: request, parse: parseResult }),
  }
}

export const earlyAccessService = createEarlyAccessService(http)
export type EarlyAccessService = ReturnType<typeof createEarlyAccessService>
