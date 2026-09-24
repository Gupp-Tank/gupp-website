import { Component, type ErrorInfo, type ReactNode } from 'react'
import { toAppError } from '../../errors'

interface ErrorBoundaryProps {
  fallback: (error: ReturnType<typeof toAppError>, reset: () => void) => ReactNode
  children: ReactNode
}

interface ErrorBoundaryState {
  error: ReturnType<typeof toAppError> | null
}

// Class component: React only supports error boundaries this way. It knows
// nothing about copy or languages; the localized fallback is injected.
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null }

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return { error: toAppError(error) }
  }

  componentDidCatch(error: unknown, info: ErrorInfo) {
    console.error('Render failed:', error, info.componentStack)
  }

  reset = () => this.setState({ error: null })

  render() {
    const { error } = this.state
    return error ? this.props.fallback(error, this.reset) : this.props.children
  }
}
