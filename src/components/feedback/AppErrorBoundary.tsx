import type { ReactNode } from 'react'
import { useI18n } from '../../hooks/useI18n'
import { getErrorMessage } from '../../errors'
import { Button } from '../ui/Button'
import { ErrorBoundary } from './ErrorBoundary'
import { StatusScreen } from './StatusScreen'

export function AppErrorBoundary({ children }: { children: ReactNode }) {
  const { t } = useI18n()

  return (
    <ErrorBoundary
      fallback={(error, reset) => (
        <StatusScreen role="alert" title={t.errorFallback.title} message={getErrorMessage(error, t.errors)}>
          <Button onClick={() => (reset(), window.location.reload())}>{t.errorFallback.actionLabel}</Button>
        </StatusScreen>
      )}
    >
      {children}
    </ErrorBoundary>
  )
}
