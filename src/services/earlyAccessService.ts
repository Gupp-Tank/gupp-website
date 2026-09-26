import type { EarlyAccessRequest, EarlyAccessResult, UnsubscribeRequest, UnsubscribeResult } from '../types/earlyAccess'
import { http, type HttpClient } from './http'

const parseResult = (data: unknown): EarlyAccessResult => {
  if ((data as { registered?: unknown } | null)?.registered !== true) throw new Error('unexpected early-access response')
  return { registered: true }
}

const parseUnsubscribeResult = (data: unknown): UnsubscribeResult => {
  if ((data as { unsubscribed?: unknown } | null)?.unsubscribed !== true) throw new Error('unexpected unsubscribe response')
  return { unsubscribed: true }
}

// Every failure is an AppError (the HTTP client guarantees it), keyed by the API's error code.
export function createEarlyAccessService(client: HttpClient) {
  return {
    register: (request: EarlyAccessRequest): Promise<EarlyAccessResult> =>
      client.request({ path: '/api/v1/early-access', method: 'POST', body: request, parse: parseResult }),
    unsubscribe: (request: UnsubscribeRequest): Promise<UnsubscribeResult> =>
      client.request({ path: '/api/v1/early-access/unsubscribe', method: 'POST', body: request, parse: parseUnsubscribeResult }),
  }
}

export const earlyAccessService = createEarlyAccessService(http)
export type EarlyAccessService = ReturnType<typeof createEarlyAccessService>
