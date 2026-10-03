import { useSearchParams } from 'react-router'
import { ResetPasswordForm } from '../components/auth/ResetPasswordForm'
import { StatusScreen } from '../components/feedback/StatusScreen'
import { ButtonLink } from '../components/ui/Button'
import { ErrorCode } from '../errors'
import { useI18n } from '../hooks/useI18n'
import { useLocalePath } from '../hooks/useLocalePath'
import { useResetPassword } from '../hooks/useResetPassword'
import { useSeo } from '../hooks/useSeo'

export function ResetPasswordPage() {
  const { locale, t } = useI18n()
  const localePath = useLocalePath()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  useSeo({
    locale,
    path: '/reset-password',
    title: t.resetPassword.metaTitle,
    description: t.resetPassword.metaDescription,
    noindex: true,
  })

  const { status, values, fieldErrors, serverErrorCode, onChange, onSubmit } = useResetPassword({
    token,
  })

  if (status === 'invalid') {
    const message =
      serverErrorCode === ErrorCode.INVALID_RESET_TOKEN
        ? t.errors.INVALID_RESET_TOKEN
        : t.resetPassword.invalidMessage

    return (
      <StatusScreen title={t.resetPassword.invalidTitle} message={message} role="alert">
        <div className="status-screen__actions">
          {/* Marked placeholder for requesting a new link from the mobile app */}
          <ButtonLink href="#request-reset" data-placeholder="request-reset-link">
            {t.resetPassword.requestNewAction}
          </ButtonLink>
          <ButtonLink variant="ghost" to={localePath()}>
            {t.resetPassword.homeLabel}
          </ButtonLink>
        </div>
      </StatusScreen>
    )
  }

  if (status === 'success') {
    return (
      <StatusScreen title={t.resetPassword.successTitle} message={t.resetPassword.successMessage}>
        <div className="status-screen__actions">
          {/* Marked placeholder for the mobile app deep link */}
          <ButtonLink href="#app-login" data-placeholder="app-login-link">
            {t.resetPassword.openAppLabel}
          </ButtonLink>
          <ButtonLink variant="ghost" to={localePath()}>
            {t.resetPassword.homeLabel}
          </ButtonLink>
        </div>
      </StatusScreen>
    )
  }

  const serverErrorText = serverErrorCode ? t.errors[serverErrorCode] : null

  return (
    <ResetPasswordForm
      copy={t.resetPassword}
      values={values}
      status={status}
      fieldErrors={fieldErrors}
      serverError={serverErrorText}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  )
}
