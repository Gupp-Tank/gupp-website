import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { CONSENT_KEY } from '../lib/consent'
import { useConsent } from './useConsent'

describe('useConsent', () => {
  beforeEach(() => localStorage.removeItem(CONSENT_KEY))

  it('starts unset, then reflects accept, reject and save', () => {
    const { result } = renderHook(() => useConsent())
    expect(result.current.status).toBe('unset')
    expect(result.current.allows('analytics')).toBe(false)

    act(() => result.current.acceptAll())
    expect(result.current.status).toBe('decided')
    expect(result.current.allows('analytics')).toBe(true)

    act(() => result.current.rejectAll())
    expect(result.current.allows('analytics')).toBe(false)

    act(() => result.current.save(true))
    expect(result.current.allows('analytics')).toBe(true)
  })
})
