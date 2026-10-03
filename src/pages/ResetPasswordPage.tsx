import { lazy, Suspense, type ReactNode } from 'react'
import { useSearchParams } from 'react-router'
import { ResetPasswordForm } from '../components/auth/ResetPasswordForm'
import './ResetPasswordPage.css'
import { StatusScreen } from '../components/feedback/StatusScreen'
import { ButtonLink } from '../components/ui/Button'
import { Logo } from '../components/ui/Logo'
import { ErrorCode } from '../errors'
import { useI18n } from '../hooks/useI18n'
import { useLocalePath } from '../hooks/useLocalePath'
import { useResetPassword } from '../hooks/useResetPassword'
import { useSeo } from '../hooks/useSeo'

// Same decorative effect as the home hero: its own chunk, fetched after first paint.
const WaterCaustics = lazy(() =>
  import('../components/effects/WaterCaustics').then((m) => ({ default: m.WaterCaustics })),
)

function ResetPasswordShell({ children }: { children: ReactNode }) {
  return (
    <section className="reset-password-page">
      <Suspense fallback={null}>
        <WaterCaustics className="reset-password-page__caustics" />
      </Suspense>
      <div className="reset-password-page__content">
        <div className="reset-password-page__brand">
          <Logo height={36} />
        </div>
        {children}
      </div>
    </section>
  )
}

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
      <ResetPasswordShell>
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
      </ResetPasswordShell>
    )
  }

  if (status === 'success') {
    return (
      <ResetPasswordShell>
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
      </ResetPasswordShell>
    )
  }

  const serverErrorText = serverErrorCode ? t.errors[serverErrorCode] : null

  return (
    <ResetPasswordShell>
    <ResetPasswordForm
      copy={t.resetPassword}
      values={values}
      status={status}
      fieldErrors={fieldErrors}
      serverError={serverErrorText}
      onChange={onChange}
      onSubmit={onSubmit}
    />
    </ResetPasswordShell>
  )
}
