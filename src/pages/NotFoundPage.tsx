import { StatusScreen } from '../components/feedback/StatusScreen'
import { ButtonLink } from '../components/ui/Button'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { useI18n } from '../hooks/useI18n'
import { useLocalePath } from '../hooks/useLocalePath'

export function NotFoundPage() {
  const { t } = useI18n()
  const localePath = useLocalePath()
  useDocumentMeta(t.notFound.title, t.notFound.message)

  return (
    <StatusScreen title={t.notFound.title} message={t.notFound.message}>
      <ButtonLink to={localePath()}>{t.notFound.homeLabel}</ButtonLink>
    </StatusScreen>
  )
}
