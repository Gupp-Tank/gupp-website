import { StatusScreen } from '../components/feedback/StatusScreen'
import { ButtonLink } from '../components/ui/Button'
import { useI18n } from '../hooks/useI18n'
import { useSeo } from '../hooks/useSeo'
import { useLocalePath } from '../hooks/useLocalePath'

export function NotFoundPage() {
  const { locale, t } = useI18n()
  const localePath = useLocalePath()
  useSeo({ locale, path: '/404', title: t.notFound.title, description: t.notFound.message, noindex: true })

  return (
    <StatusScreen title={t.notFound.title} message={t.notFound.message}>
      <ButtonLink to={localePath()}>{t.notFound.homeLabel}</ButtonLink>
    </StatusScreen>
  )
}
