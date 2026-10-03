import { useId } from 'react'
import type { ResetPasswordStatus } from '../../hooks/useResetPassword'
import type { ResetPasswordCopy, ResetPasswordFieldError, ResetPasswordValues } from '../../types/auth'
import './ResetPasswordForm.css'

export interface ResetPasswordFormProps {
  copy: ResetPasswordCopy
  values: ResetPasswordValues
  status: ResetPasswordStatus
  fieldErrors: {
    newPassword?: ResetPasswordFieldError
    confirmPassword?: ResetPasswordFieldError
  }
  serverError: string | null
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (event: React.FormEvent) => void
}

export function ResetPasswordForm({
  copy,
  values,
  status,
  fieldErrors,
  serverError,
  onChange,
  onSubmit,
}: ResetPasswordFormProps) {
  const id = useId()
  const busy = status === 'submitting'
  const newPasswordError = fieldErrors.newPassword ? copy.fieldErrors[fieldErrors.newPassword] : null
  const confirmPasswordError = fieldErrors.confirmPassword ? copy.fieldErrors[fieldErrors.confirmPassword] : null

  return (
    <section className="reset-password-page">
      <div className="reset-password-card">
        <div className="reset-password-header">
          <h1 className="reset-password-header__title">{copy.title}</h1>
          <p className="reset-password-header__subtitle">{copy.subtitle}</p>
        </div>

        <form className="reset-password-form" onSubmit={onSubmit} noValidate>
          <div className="reset-password-field">
            <label htmlFor={`${id}-newPassword`}>{copy.newPasswordLabel}</label>
            <input
              id={`${id}-newPassword`}
              name="newPassword"
              type="password"
              autoComplete="new-password"
              placeholder={copy.newPasswordPlaceholder}
              value={values.newPassword}
              onChange={onChange}
              aria-invalid={newPasswordError ? true : undefined}
              aria-describedby={newPasswordError ? `${id}-newPassword-error` : undefined}
            />
            <p id={`${id}-newPassword-error`} className="reset-password-error" aria-live="polite">
              {newPasswordError}
            </p>
          </div>

          <div className="reset-password-field">
            <label htmlFor={`${id}-confirmPassword`}>{copy.confirmPasswordLabel}</label>
            <input
              id={`${id}-confirmPassword`}
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder={copy.confirmPasswordPlaceholder}
              value={values.confirmPassword}
              onChange={onChange}
              aria-invalid={confirmPasswordError ? true : undefined}
              aria-describedby={confirmPasswordError ? `${id}-confirmPassword-error` : undefined}
            />
            <p id={`${id}-confirmPassword-error`} className="reset-password-error" aria-live="polite">
              {confirmPasswordError}
            </p>
          </div>

          {serverError && (
            <p className="reset-password-server-error" role="alert">
              {serverError}
            </p>
          )}

          <button
            type="submit"
            className="btn btn--primary btn--md reset-password-submit"
            disabled={busy}
            aria-disabled={busy}
          >
            {busy ? copy.submittingButton : copy.submitButton}
          </button>
        </form>
      </div>
    </section>
  )
}
