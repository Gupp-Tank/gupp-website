import { act, renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { AppError, ErrorCode } from '../errors'
import type { EarlyAccessService } from '../services/earlyAccessService'
import { useUnsubscribe } from './useUnsubscribe'

const mockService = (unsubscribe: EarlyAccessService['unsubscribe']): EarlyAccessService => ({
  register: vi.fn(),
  unsubscribe,
})

describe('useUnsubscribe', () => {
  it('sets status to invalid and does not call API if token is null', () => {
    const unsubscribe = vi.fn()
    const service = mockService(unsubscribe)
    const { result } = renderHook(() => useUnsubscribe(null, service))

    expect(result.current.status).toBe('invalid')
    expect(result.current.errorCode).toBe(ErrorCode.INVALID_UNSUBSCRIBE_TOKEN)
    expect(unsubscribe).not.toHaveBeenCalled()
  })

  it('sets status to invalid if token is empty whitespace', () => {
    const unsubscribe = vi.fn()
    const service = mockService(unsubscribe)
    const { result } = renderHook(() => useUnsubscribe('   ', service))

    expect(result.current.status).toBe('invalid')
    expect(result.current.errorCode).toBe(ErrorCode.INVALID_UNSUBSCRIBE_TOKEN)
    expect(unsubscribe).not.toHaveBeenCalled()
  })

  it('calls unsubscribe and sets status to success on resolve', async () => {
    const unsubscribe = vi.fn(async () => ({ unsubscribed: true as const }))
    const service = mockService(unsubscribe)
    const { result } = renderHook(() => useUnsubscribe('valid-token', service))

    expect(result.current.status).toBe('loading')
    await waitFor(() => {
      expect(result.current.status).toBe('success')
    })
    expect(unsubscribe).toHaveBeenCalledWith({ token: 'valid-token' })
    expect(result.current.errorCode).toBeNull()
  })

  it('sets status to invalid when API returns INVALID_UNSUBSCRIBE_TOKEN', async () => {
    const unsubscribe = vi.fn(async () => {
      throw new AppError(ErrorCode.INVALID_UNSUBSCRIBE_TOKEN)
    })
    const service = mockService(unsubscribe)
    const { result } = renderHook(() => useUnsubscribe('bad-token', service))

    await waitFor(() => {
      expect(result.current.status).toBe('invalid')
    })
    expect(result.current.errorCode).toBe(ErrorCode.INVALID_UNSUBSCRIBE_TOKEN)
  })

  it('sets status to error when API returns NETWORK_ERROR', async () => {
    const unsubscribe = vi.fn(async () => {
      throw new AppError(ErrorCode.NETWORK_ERROR)
    })
    const service = mockService(unsubscribe)
    const { result } = renderHook(() => useUnsubscribe('some-token', service))

    await waitFor(() => {
      expect(result.current.status).toBe('error')
    })
    expect(result.current.errorCode).toBe(ErrorCode.NETWORK_ERROR)
  })

  it('allows retry after failure', async () => {
    let shouldFail = true
    const unsubscribe = vi.fn(async () => {
      if (shouldFail) {
        throw new AppError(ErrorCode.SERVER_ERROR)
      }
      return { unsubscribed: true as const }
    })
    const service = mockService(unsubscribe)
    const { result } = renderHook(() => useUnsubscribe('retry-token', service))

    await waitFor(() => {
      expect(result.current.status).toBe('error')
    })
    expect(unsubscribe).toHaveBeenCalledTimes(1)

    shouldFail = false
    act(() => {
      result.current.retry()
    })
    await waitFor(() => {
      expect(result.current.status).toBe('success')
    })
    expect(unsubscribe).toHaveBeenCalledTimes(2)
  })
})
