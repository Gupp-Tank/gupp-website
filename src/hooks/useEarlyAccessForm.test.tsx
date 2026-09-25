import { act, renderHook } from '@testing-library/react'
import type { ChangeEvent, FormEvent } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { LEGAL_DOCUMENTS_VERSION } from '../content/legal'
import { AppError, ErrorCode } from '../errors'
import { localeStore } from '../i18n/locales'
import type { EarlyAccessService } from '../services/earlyAccessService'
import { useEarlyAccessForm } from './useEarlyAccessForm'

const submitEvent = { preventDefault: vi.fn() } as unknown as FormEvent
const change = (name: string, value: string | boolean) =>
  ({ target: Object.assign(document.createElement('input'), { name, type: typeof value === 'boolean' ? 'checkbox' : 'text', ...(typeof value === 'boolean' ? { checked: value } : { value }) }) }) as unknown as ChangeEvent<HTMLInputElement>

const serviceWith = (register: EarlyAccessService['register']): EarlyAccessService => ({ register })

function setup(register: EarlyAccessService['register'] = vi.fn(async () => ({ registered: true as const }))) {
  const hook = renderHook(() => useEarlyAccessForm(serviceWith(register)))
  const fill = (email = 'Ana@Example.com', accepted = true) => {
    act(() => hook.result.current.onChange(change('email', email)))
    act(() => hook.result.current.onChange(change('accepted', accepted)))
  }
  return { ...hook, fill, register }
}

describe('useEarlyAccessForm', () => {
  beforeEach(() => localeStore.set('es'))

  it('starts idle with nothing filled and no consent', () => {
    const { result } = setup()
    expect(result.current.status).toBe('idle')
    expect(result.current.values).toEqual({ email: '', tankType: '', accepted: false, website: '' })
  })

  it('blocks submission and reports both field errors, without calling the API', async () => {
    const { result, register } = setup()
    await act(() => result.current.onSubmit(submitEvent))
    expect(register).not.toHaveBeenCalled()
    expect(result.current.fieldErrors).toEqual({ email: 'emailRequired', consent: 'consentRequired' })
    expect(result.current.status).toBe('idle')
  })

  it('blocks submission without the consent checkbox even with a valid email', async () => {
    const { result, register, fill } = setup()
    fill('ana@example.com', false)
    await act(() => result.current.onSubmit(submitEvent))
    expect(register).not.toHaveBeenCalled()
    expect(result.current.fieldErrors.consent).toBe('consentRequired')
  })

  it('clears a field error as soon as the field is edited', async () => {
    const { result } = setup()
    await act(() => result.current.onSubmit(submitEvent))
    act(() => result.current.onChange(change('email', 'a')))
    expect(result.current.fieldErrors.email).toBeUndefined()
    act(() => result.current.onChange(change('accepted', true)))
    expect(result.current.fieldErrors.consent).toBeUndefined()
  })

  it('sends the normalized email, the language, the tank type and the accepted document version', async () => {
    const { result, register, fill } = setup()
    fill('  Ana@Example.com ')
    act(() => result.current.onChange({ target: Object.assign(document.createElement('select'), { name: 'tankType', value: '' }) } as unknown as ChangeEvent<HTMLSelectElement>))
    await act(() => result.current.onSubmit(submitEvent))
    expect(register).toHaveBeenCalledWith({
      email: 'ana@example.com',
      locale: 'es',
      tankType: null,
      consent: { accepted: true, documentsVersion: LEGAL_DOCUMENTS_VERSION },
    })
    expect(result.current.status).toBe('success')
  })

  it('shows submitting while the request is pending and ignores a second submit (double-click)', async () => {
    let resolve!: () => void
    const register = vi.fn(() => new Promise<{ registered: true }>((r) => (resolve = () => r({ registered: true }))))
    const { result, fill } = setup(register)
    fill()
    let first!: Promise<void>
    act(() => {
      first = result.current.onSubmit(submitEvent) as unknown as Promise<void>
      void result.current.onSubmit(submitEvent)
    })
    expect(result.current.status).toBe('submitting')
    expect(register).toHaveBeenCalledTimes(1)
    await act(async () => {
      resolve()
      await first
    })
    expect(result.current.status).toBe('success')
  })

  it.each([
    [ErrorCode.RATE_LIMITED],
    [ErrorCode.NETWORK_ERROR],
    [ErrorCode.SERVER_ERROR],
    [ErrorCode.VALIDATION_FAILED],
    [ErrorCode.CONSENT_REQUIRED],
  ])('keeps the form and exposes the error code %s so the user can retry', async (code) => {
    const { result, fill } = setup(vi.fn(async () => Promise.reject(new AppError(code))))
    fill()
    await act(() => result.current.onSubmit(submitEvent))
    expect(result.current.status).toBe('error')
    expect(result.current.errorCode).toBe(code)
    expect(result.current.values.email).toBe('Ana@Example.com')
  })

  it('treats a duplicate as the same success (the API answers the same)', async () => {
    const { result, fill } = setup(vi.fn(async () => ({ registered: true as const })))
    fill()
    await act(() => result.current.onSubmit(submitEvent))
    await act(() => result.current.onSubmit(submitEvent))
    expect(result.current.status).toBe('success')
  })

  it('pretends success and sends nothing when the honeypot is filled', async () => {
    const { result, register, fill } = setup()
    fill()
    act(() => result.current.onChange(change('website', 'https://spam.example')))
    await act(() => result.current.onSubmit(submitEvent))
    expect(register).not.toHaveBeenCalled()
    expect(result.current.status).toBe('success')
  })
})
