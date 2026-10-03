import type { ResetPasswordRequest } from '../types/auth'
import { http, type HttpClient } from './http'

export function createAuthService(client: HttpClient) {
  return {
    resetPassword: (request: ResetPasswordRequest): Promise<void> =>
      client.request({
        path: '/api/v1/auth/reset-password',
        method: 'POST',
        body: request,
        parse: () => undefined,
      }),
  }
}

export const authService = createAuthService(http)
export type AuthService = ReturnType<typeof createAuthService>
