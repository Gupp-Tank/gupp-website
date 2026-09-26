import { useSearchParams } from 'react-router'
import { StatusScreen } from '../components/feedback/StatusScreen'
import { Button, ButtonLink } from '../components/ui/Button'
import { ErrorCode } from '../errors'
import { useI18n } from '../hooks/useI18n'
import { useLocalePath } from '../hooks/useLocalePath'
import { useSeo } from '../hooks/useSeo'
import { useUnsubscribe } from '../hooks/useUnsubscribe'

export function UnsubscribePage() {
  const { locale, t } = useI18n()
  const localePath = useLocalePath()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  useSeo({
    locale,
    path: '/unsubscribe',
    title: t.unsubscribe.metaTitle,
    description: t.unsubscribe.metaDescription,
    noindex: true,
  })

  const { status, errorCode, retry } = useUnsubscribe(token)

  if (status === 'loading') {
    return <StatusScreen title={t.unsubscribe.loadingTitle} message={t.unsubscribe.loadingMessage} />
  }

  if (status === 'success') {
    return (
      <StatusScreen title={t.unsubscribe.successTitle} message={t.unsubscribe.successMessage}>
        <div className="status-screen__actions">
          <ButtonLink to={localePath()}>{t.unsubscribe.homeLabel}</ButtonLink>
        </div>
      </StatusScreen>
    )
  }

  if (status === 'invalid') {
    return (
      <StatusScreen title={t.unsubscribe.invalidTitle} message={t.errors.INVALID_UNSUBSCRIBE_TOKEN} role="alert">
        <div className="status-screen__actions">
          <ButtonLink to={localePath()}>{t.unsubscribe.homeLabel}</ButtonLink>
        </div>
      </StatusScreen>
    )
  }

  return (
    <StatusScreen title={t.unsubscribe.errorTitle} message={t.errors[errorCode ?? ErrorCode.UNKNOWN]} role="alert">
      <div className="status-screen__actions">
        <Button variant="primary" onClick={retry}>
          {t.unsubscribe.retryLabel}
        </Button>
        <ButtonLink variant="ghost" to={localePath()}>
          {t.unsubscribe.homeLabel}
        </ButtonLink>
      </div>
    </StatusScreen>
  )
}
