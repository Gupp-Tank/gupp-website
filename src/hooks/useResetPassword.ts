import { useCallback, useEffect, useState } from 'react'
import { ErrorCode, toAppError } from '../errors'
import { authService, type AuthService } from '../services/authService'
import type { ResetPasswordFieldError, ResetPasswordValues } from '../types/auth'

export type ResetPasswordStatus = 'idle' | 'submitting' | 'success' | 'invalid'

export interface UseResetPasswordOptions {
  token?: string | null
  service?: AuthService
}

export interface UseResetPasswordResult {
  status: ResetPasswordStatus
  values: ResetPasswordValues
  fieldErrors: {
    newPassword?: ResetPasswordFieldError
    confirmPassword?: ResetPasswordFieldError
  }
  serverErrorCode: ErrorCode | null
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (event?: React.FormEvent) => Promise<void>
}

export function validateResetPassword(values: ResetPasswordValues): {
  newPassword?: ResetPasswordFieldError
  confirmPassword?: ResetPasswordFieldError
} {
  const errors: { newPassword?: ResetPasswordFieldError; confirmPassword?: ResetPasswordFieldError } = {}

  if (!values.newPassword) {
    errors.newPassword = 'passwordRequired'
  } else if (values.newPassword.length < 8) {
    errors.newPassword = 'passwordTooShort'
  } else if (values.newPassword.length > 72) {
    errors.newPassword = 'passwordTooLong'
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'confirmPasswordRequired'
  } else if (values.newPassword && values.confirmPassword !== values.newPassword) {
    errors.confirmPassword = 'passwordsDoNotMatch'
  }

  return errors
}

export function useResetPassword({ token: initialToken, service = authService }: UseResetPasswordOptions = {}): UseResetPasswordResult {
  // Capture token in component state so it is kept in memory only for the request.
  // Never log the token or send it to analytics.
  const [token] = useState<string | null>(() => {
    if (initialToken !== undefined) return initialToken
    if (typeof window === 'undefined') return null
    return new URLSearchParams(window.location.search).get('token')
  })

  // Strip token from the URL immediately so it does not persist in browser history.
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('token=')) {
      const url = new URL(window.location.href)
      url.searchParams.delete('token')
      const newSearch = url.searchParams.toString()
      const cleanUrl = `${url.pathname}${newSearch ? `?${newSearch}` : ''}${url.hash}`
      window.history.replaceState(null, '', cleanUrl)
    }
  }, [])

  const isInvalidToken = !token || token.trim() === ''
  const [status, setStatus] = useState<ResetPasswordStatus>(isInvalidToken ? 'invalid' : 'idle')
  const [values, setValues] = useState<ResetPasswordValues>({ newPassword: '', confirmPassword: '' })
  const [fieldErrors, setFieldErrors] = useState<{
    newPassword?: ResetPasswordFieldError
    confirmPassword?: ResetPasswordFieldError
  }>({})
  const [serverErrorCode, setServerErrorCode] = useState<ErrorCode | null>(null)

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }))
    setServerErrorCode(null)
  }, [])

  const onSubmit = useCallback(
    async (event?: React.FormEvent) => {
      event?.preventDefault()

      if (!token || token.trim() === '') {
        setStatus('invalid')
        return
      }

      const errors = validateResetPassword(values)
      if (errors.newPassword || errors.confirmPassword) {
        setFieldErrors(errors)
        return
      }

      setStatus('submitting')
      setServerErrorCode(null)

      try {
        await service.resetPassword({ token: token.trim(), newPassword: values.newPassword })
        setStatus('success')
      } catch (err: unknown) {
        const appError = toAppError(err)
        if (appError.code === ErrorCode.INVALID_RESET_TOKEN) {
          setStatus('invalid')
          setServerErrorCode(ErrorCode.INVALID_RESET_TOKEN)
        } else if (appError.code === ErrorCode.VALIDATION_FAILED) {
          setStatus('idle')
          setServerErrorCode(ErrorCode.VALIDATION_FAILED)
        } else {
          setStatus('idle')
          setServerErrorCode(ErrorCode.NETWORK_ERROR)
        }
      }
    },
    [token, values, service],
  )

  return {
    status,
    values,
    fieldErrors,
    serverErrorCode,
    onChange,
    onSubmit,
  }
}
