import { act, renderHook } from '@testing-library/react'
import type { ChangeEvent, FormEvent } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { AppError, ErrorCode } from '../errors'
import type { AuthService } from '../services/authService'
import { useResetPassword, validateResetPassword } from './useResetPassword'

const submitEvent = { preventDefault: vi.fn() } as unknown as FormEvent
const change = (name: string, value: string) =>
  ({ target: { name, value } }) as unknown as ChangeEvent<HTMLInputElement>

const serviceWith = (resetPassword: AuthService['resetPassword']): AuthService => ({ resetPassword })

describe('validateResetPassword', () => {
  it('reports passwordRequired when newPassword is empty', () => {
    const errors = validateResetPassword({ newPassword: '', confirmPassword: '' })
    expect(errors.newPassword).toBe('passwordRequired')
    expect(errors.confirmPassword).toBe('confirmPasswordRequired')
  })

  it('reports passwordTooShort when password has less than 8 characters', () => {
    const errors = validateResetPassword({ newPassword: 'short', confirmPassword: 'short' })
    expect(errors.newPassword).toBe('passwordTooShort')
    expect(errors.confirmPassword).toBeUndefined()
  })

  it('reports passwordTooLong when password exceeds 72 characters', () => {
    const longPassword = 'a'.repeat(73)
    const errors = validateResetPassword({ newPassword: longPassword, confirmPassword: longPassword })
    expect(errors.newPassword).toBe('passwordTooLong')
    expect(errors.confirmPassword).toBeUndefined()
  })

  it('reports confirmPasswordRequired when confirmPassword is empty', () => {
    const errors = validateResetPassword({ newPassword: 'validPassword123', confirmPassword: '' })
    expect(errors.newPassword).toBeUndefined()
    expect(errors.confirmPassword).toBe('confirmPasswordRequired')
  })

  it('reports passwordsDoNotMatch when passwords differ', () => {
    const errors = validateResetPassword({ newPassword: 'validPassword123', confirmPassword: 'differentPassword456' })
    expect(errors.newPassword).toBeUndefined()
    expect(errors.confirmPassword).toBe('passwordsDoNotMatch')
  })

  it('returns no errors when passwords match and are within 8 to 72 characters', () => {
    const valid8 = validateResetPassword({ newPassword: '12345678', confirmPassword: '12345678' })
    expect(valid8).toEqual({})

    const valid72 = validateResetPassword({ newPassword: 'a'.repeat(72), confirmPassword: 'a'.repeat(72) })
    expect(valid72).toEqual({})
  })
})

describe('useResetPassword', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('starts in invalid status when token is missing', () => {
    const { result } = renderHook(() => useResetPassword({ token: null }))
    expect(result.current.status).toBe('invalid')
  })

  it('starts in invalid status when token is empty or whitespace', () => {
    const { result } = renderHook(() => useResetPassword({ token: '   ' }))
    expect(result.current.status).toBe('invalid')
  })

  it('starts in idle status when token is valid', () => {
    const { result } = renderHook(() => useResetPassword({ token: 'valid-token' }))
    expect(result.current.status).toBe('idle')
    expect(result.current.values).toEqual({ newPassword: '', confirmPassword: '' })
  })

  it('cleans token from URL on mount', () => {
    const originalHref = window.location.href
    window.history.pushState({}, '', '/reset-password?token=secret123')
    const replaceStateSpy = vi.spyOn(window.history, 'replaceState')

    renderHook(() => useResetPassword())

    expect(replaceStateSpy).toHaveBeenCalledWith(null, '', '/reset-password')

    window.history.pushState({}, '', originalHref)
  })

  it('clears field errors and server error on change', async () => {
    const { result } = renderHook(() => useResetPassword({ token: 'tok' }))

    await act(async () => {
      await result.current.onSubmit(submitEvent)
    })
    expect(result.current.fieldErrors.newPassword).toBe('passwordRequired')

    act(() => {
      result.current.onChange(change('newPassword', 'validPass123'))
    })
    expect(result.current.fieldErrors.newPassword).toBeUndefined()
  })

  it('submits successfully on 200 response and sets status to success', async () => {
    const resetPassword = vi.fn().mockResolvedValue(undefined)
    const service = serviceWith(resetPassword)
    const { result } = renderHook(() => useResetPassword({ token: 'tok-123', service }))

    act(() => {
      result.current.onChange(change('newPassword', 'MyNewPassword123'))
      result.current.onChange(change('confirmPassword', 'MyNewPassword123'))
    })

    await act(async () => {
      await result.current.onSubmit(submitEvent)
    })

    expect(resetPassword).toHaveBeenCalledWith({ token: 'tok-123', newPassword: 'MyNewPassword123' })
    expect(result.current.status).toBe('success')
    expect(result.current.serverErrorCode).toBeNull()
  })

  it('transitions to invalid status when API returns INVALID_RESET_TOKEN', async () => {
    const resetPassword = vi.fn().mockRejectedValue(new AppError(ErrorCode.INVALID_RESET_TOKEN))
    const service = serviceWith(resetPassword)
    const { result } = renderHook(() => useResetPassword({ token: 'expired-tok', service }))

    act(() => {
      result.current.onChange(change('newPassword', 'MyNewPassword123'))
      result.current.onChange(change('confirmPassword', 'MyNewPassword123'))
    })

    await act(async () => {
      await result.current.onSubmit(submitEvent)
    })

    expect(result.current.status).toBe('invalid')
    expect(result.current.serverErrorCode).toBe(ErrorCode.INVALID_RESET_TOKEN)
  })

  it('stays in idle status and displays validation error when API returns VALIDATION_FAILED', async () => {
    const resetPassword = vi.fn().mockRejectedValue(new AppError(ErrorCode.VALIDATION_FAILED))
    const service = serviceWith(resetPassword)
    const { result } = renderHook(() => useResetPassword({ token: 'tok-123', service }))

    act(() => {
      result.current.onChange(change('newPassword', 'MyNewPassword123'))
      result.current.onChange(change('confirmPassword', 'MyNewPassword123'))
    })

    await act(async () => {
      await result.current.onSubmit(submitEvent)
    })

    expect(result.current.status).toBe('idle')
    expect(result.current.serverErrorCode).toBe(ErrorCode.VALIDATION_FAILED)
  })

  it('stays in idle status and displays network error on unexpected or network error', async () => {
    const resetPassword = vi.fn().mockRejectedValue(new AppError(ErrorCode.NETWORK_ERROR))
    const service = serviceWith(resetPassword)
    const { result } = renderHook(() => useResetPassword({ token: 'tok-123', service }))

    act(() => {
      result.current.onChange(change('newPassword', 'MyNewPassword123'))
      result.current.onChange(change('confirmPassword', 'MyNewPassword123'))
    })

    await act(async () => {
      await result.current.onSubmit(submitEvent)
    })

    expect(result.current.status).toBe('idle')
    expect(result.current.serverErrorCode).toBe(ErrorCode.NETWORK_ERROR)
  })

  it('sets status to invalid if onSubmit is invoked without a token', async () => {
    const { result } = renderHook(() => useResetPassword({ token: null }))
    await act(async () => {
      await result.current.onSubmit(submitEvent)
    })
    expect(result.current.status).toBe('invalid')
  })
})
