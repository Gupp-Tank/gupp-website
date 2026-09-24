import { Navigate } from 'react-router'
import { useI18n } from '../hooks/useI18n'
import { withLocale } from '../i18n/paths'

// "/" -> "/<language>". index.html's pre-paint script already resolved the
// language (saved choice, else browser es/en, else es), so the store holds it.
export function RootRedirect() {
  const { locale } = useI18n()
  return <Navigate to={withLocale(locale)} replace />
}
