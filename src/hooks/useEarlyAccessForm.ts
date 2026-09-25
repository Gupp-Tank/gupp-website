import { useCallback, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { LEGAL_DOCUMENTS_VERSION } from '../content/legal'
import { toAppError, type ErrorCode } from '../errors'
import { normalizeEmail, validateConsent, validateEmail } from '../lib/earlyAccess'
import { earlyAccessService, type EarlyAccessService } from '../services/earlyAccessService'
import type { EarlyAccessFieldError, TankType } from '../types/earlyAccess'
import { useI18n } from './useI18n'

export type EarlyAccessStatus = 'idle' | 'submitting' | 'success' | 'error'

export interface EarlyAccessValues {
  email: string
  tankType: TankType | ''
  accepted: boolean
  /** Honeypot: people never see it, bots fill it. */
  website: string
}

const INITIAL: EarlyAccessValues = { email: '', tankType: '', accepted: false, website: '' }

// State, validation and submission of the early-access form. The component only renders.
// A duplicate email comes back as the same success as a new one (the API hides who is on the list).
export function useEarlyAccessForm(service: EarlyAccessService = earlyAccessService) {
  const { locale } = useI18n()
  const [values, setValues] = useState<EarlyAccessValues>(INITIAL)
  const [status, setStatus] = useState<EarlyAccessStatus>('idle')
  const [fieldErrors, setFieldErrors] = useState<{ email?: EarlyAccessFieldError; consent?: EarlyAccessFieldError }>({})
  const [errorCode, setErrorCode] = useState<ErrorCode | null>(null)
  // A ref, not state: two fast submits in the same tick must not both pass.
  const inFlight = useRef(false)

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = event.target
    const value = target instanceof HTMLInputElement && target.type === 'checkbox' ? target.checked : target.value
    setValues((current) => ({ ...current, [target.name]: value }))
    setFieldErrors((current) => ({ ...current, [target.name === 'accepted' ? 'consent' : target.name]: undefined }))
  }, [])

  const onSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault()
      if (inFlight.current || status === 'success') return

      const email = validateEmail(values.email)
      const consent = validateConsent(values.accepted)
      if (email || consent) {
        setFieldErrors({ email: email ?? undefined, consent: consent ?? undefined })
        return
      }

      setErrorCode(null)
      // Bots fill the honeypot: pretend it worked and send nothing.
      if (values.website !== '') {
        setStatus('success')
        return
      }

      inFlight.current = true
      setStatus('submitting')
      try {
        await service.register({
          email: normalizeEmail(values.email),
          locale,
          tankType: values.tankType === '' ? null : values.tankType,
          consent: { accepted: true, documentsVersion: LEGAL_DOCUMENTS_VERSION },
        })
        setStatus('success')
      } catch (error) {
        setErrorCode(toAppError(error).code)
        setStatus('error')
      } finally {
        inFlight.current = false
      }
    },
    [locale, service, status, values],
  )

  return { values, status, fieldErrors, errorCode, onChange, onSubmit }
}
