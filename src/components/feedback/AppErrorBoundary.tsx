import type { ReactNode } from 'react'
import { useI18n } from '../../hooks/useI18n'
import { getErrorMessage } from '../../errors'
import { Button } from '../ui/Button'
import { ErrorBoundary } from './ErrorBoundary'
import './ErrorFallback.css'

export function AppErrorBoundary({ children }: { children: ReactNode }) {
  const { t } = useI18n()

  return (
    <ErrorBoundary
      fallback={(error, reset) => (
        <main className="error-fallback" role="alert">
          <h1 className="error-fallback__title">{t.errorFallback.title}</h1>
          <p className="error-fallback__message">{getErrorMessage(error, t.errors)}</p>
          <Button onClick={() => (reset(), window.location.reload())}>{t.errorFallback.actionLabel}</Button>
        </main>
      )}
    >
      {children}
    </ErrorBoundary>
  )
}
