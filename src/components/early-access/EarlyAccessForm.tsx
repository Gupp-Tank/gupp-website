import { Fragment, useId } from 'react'
import { Link } from 'react-router'
import type { EarlyAccessStatus, EarlyAccessValues } from '../../hooks/useEarlyAccessForm'
import { TANK_TYPES, type EarlyAccessCopy, type EarlyAccessFieldError } from '../../types/earlyAccess'
import { Icon } from '../ui/Icon'
import './EarlyAccessForm.css'

interface EarlyAccessFormProps {
  copy: EarlyAccessCopy
  values: EarlyAccessValues
  status: EarlyAccessStatus
  fieldErrors: { email?: EarlyAccessFieldError; consent?: EarlyAccessFieldError }
  /** Localized text of the last server error, already resolved from its code; null when there is none. */
  serverError: string | null
  termsHref: string
  privacyHref: string
  privacyEmail: string
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  onSubmit: (event: React.FormEvent) => void
}

// {token} placeholders in a sentence become links, so the text stays translatable as one piece.
function LinkedText({ text, links }: { text: string; links: Record<string, React.ReactNode> }) {
  return (
    <>
      {text.split(/(\{\w+\})/).map((part, index) => {
        const key = /^\{(\w+)\}$/.exec(part)?.[1]
        return <Fragment key={index}>{key && key in links ? links[key] : part}</Fragment>
      })}
    </>
  )
}

export function EarlyAccessForm({ copy, values, status, fieldErrors, serverError, termsHref, privacyHref, privacyEmail, onChange, onSubmit }: EarlyAccessFormProps) {
  const id = useId()
  const emailError = fieldErrors.email ? copy.fieldErrors[fieldErrors.email] : null
  const consentError = fieldErrors.consent ? copy.fieldErrors[fieldErrors.consent] : null
  const busy = status === 'submitting'

  if (status === 'success') {
    return (
      <div className="ea-success" role="status">
        <Icon name="checkCircle" size={28} />
        <div>
          <p className="ea-success__title">{copy.successTitle}</p>
          <p className="ea-success__text">{copy.successText}</p>
        </div>
      </div>
    )
  }

  return (
    <form className="ea-form" aria-label={copy.formLabel} onSubmit={onSubmit} noValidate>
      <div className="ea-field">
        <label htmlFor={`${id}-email`}>{copy.emailLabel}</label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder={copy.emailPlaceholder}
          value={values.email}
          onChange={onChange}
          aria-invalid={emailError ? true : undefined}
          aria-describedby={emailError ? `${id}-email-error` : undefined}
        />
        <p id={`${id}-email-error`} className="ea-error" aria-live="polite">
          {emailError}
        </p>
      </div>

      <div className="ea-field">
        <label htmlFor={`${id}-tank`}>{copy.tankLabel}</label>
        <select id={`${id}-tank`} name="tankType" value={values.tankType} onChange={onChange}>
          <option value="">{copy.tankNone}</option>
          {TANK_TYPES.map((type) => (
            <option key={type} value={type}>
              {copy.tankOptions[type]}
            </option>
          ))}
        </select>
      </div>

      <div className="ea-honeypot" aria-hidden>
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={onChange} />
        </label>
      </div>

      <div className="ea-consent">
        <label className="ea-check">
          <input
            name="accepted"
            type="checkbox"
            checked={values.accepted}
            onChange={onChange}
            aria-invalid={consentError ? true : undefined}
            aria-describedby={`${id}-notice${consentError ? ` ${id}-consent-error` : ''}`}
          />
          <span>
            <LinkedText
              text={copy.consentText}
              links={{
                terms: <Link to={termsHref}>{copy.termsLink}</Link>,
                privacy: <Link to={privacyHref}>{copy.privacyLink}</Link>,
              }}
            />
          </span>
        </label>
        <p id={`${id}-consent-error`} className="ea-error" aria-live="polite">
          {consentError}
        </p>
        <p id={`${id}-notice`} className="ea-notice">
          {copy.dataNotice} {copy.withdrawNotice.split(privacyEmail)[0]}
          <a href={`mailto:${privacyEmail}`}>{privacyEmail}</a>
          {copy.withdrawNotice.split(privacyEmail)[1]}
        </p>
      </div>

      <p className="ea-error ea-error--server" role="alert">
        {serverError}
      </p>

      <button type="submit" className="btn btn--primary btn--md ea-submit" disabled={busy} aria-disabled={busy}>
        {busy ? copy.submitting : copy.submit}
      </button>
    </form>
  )
}
