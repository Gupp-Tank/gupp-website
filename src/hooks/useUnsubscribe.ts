import { useCallback, useEffect, useState } from 'react'
import { toAppError, ErrorCode } from '../errors'
import { earlyAccessService, type EarlyAccessService } from '../services/earlyAccessService'

export type UnsubscribeStatus = 'loading' | 'success' | 'invalid' | 'error'

export interface UseUnsubscribeResult {
  status: UnsubscribeStatus
  errorCode: ErrorCode | null
  retry: () => void
}

export function useUnsubscribe(
  token: string | null,
  service: EarlyAccessService = earlyAccessService,
): UseUnsubscribeResult {
  const isInvalidToken = !token || token.trim() === ''
  const [status, setStatus] = useState<UnsubscribeStatus>(isInvalidToken ? 'invalid' : 'loading')
  const [errorCode, setErrorCode] = useState<ErrorCode | null>(
    isInvalidToken ? ErrorCode.INVALID_UNSUBSCRIBE_TOKEN : null,
  )
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    if (!token || token.trim() === '') return

    let cancelled = false

    service
      .unsubscribe({ token: token.trim() })
      .then(() => {
        if (!cancelled) {
          setStatus('success')
          setErrorCode(null)
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          const appError = toAppError(error)
          setErrorCode(appError.code)
          setStatus(appError.code === ErrorCode.INVALID_UNSUBSCRIBE_TOKEN ? 'invalid' : 'error')
        }
      })

    return () => {
      cancelled = true
    }
  }, [service, token, attempt])

  const retry = useCallback(() => {
    if (!token || token.trim() === '') return
    setStatus('loading')
    setErrorCode(null)
    setAttempt((c) => c + 1)
  }, [token])

  return { status, errorCode, retry }
}
