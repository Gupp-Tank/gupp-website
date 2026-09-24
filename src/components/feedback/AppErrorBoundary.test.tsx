import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { AppErrorBoundary } from './AppErrorBoundary'
import { dictionaries } from '../../i18n/dictionaries'

function Boom(): never {
  throw new Error('render exploded')
}

describe('AppErrorBoundary', () => {
  beforeEach(() => {
    document.documentElement.lang = 'es'
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })
  afterEach(() => vi.restoreAllMocks())

  it('renders children when nothing throws', () => {
    render(<AppErrorBoundary><p>fine</p></AppErrorBoundary>)
    expect(screen.getByText('fine')).toBeInTheDocument()
  })

  it('shows the localized fallback and never the raw error message', () => {
    render(<AppErrorBoundary><Boom /></AppErrorBoundary>)
    const { errorFallback, errors } = dictionaries.es
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: errorFallback.title })).toBeInTheDocument()
    expect(screen.getByText(errors.UNKNOWN)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: errorFallback.actionLabel })).toBeInTheDocument()
    expect(screen.queryByText('render exploded')).not.toBeInTheDocument()
  })

  it('uses the active language', () => {
    document.documentElement.lang = 'en'
    render(<AppErrorBoundary><Boom /></AppErrorBoundary>)
    expect(screen.getByRole('heading', { name: dictionaries.en.errorFallback.title })).toBeInTheDocument()
  })
})
