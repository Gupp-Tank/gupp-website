import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { AppError, ErrorCode } from '../errors'
import { dictionaries } from '../i18n/dictionaries'
import { earlyAccessService } from '../services/earlyAccessService'
import { UnsubscribePage } from './UnsubscribePage'

const renderAt = (url: string) =>
  render(
    <MemoryRouter initialEntries={[url]}>
      <UnsubscribePage />
    </MemoryRouter>,
  )

describe('UnsubscribePage', () => {
  beforeEach(() => {
    document.documentElement.lang = 'es'
    vi.restoreAllMocks()
  })

  it('shows invalid state when token is missing from the query string', () => {
    renderAt('/es/unsubscribe')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      dictionaries.es.unsubscribe.invalidTitle,
    )
    expect(
      screen.getByText(dictionaries.es.errors.INVALID_UNSUBSCRIBE_TOKEN),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: dictionaries.es.unsubscribe.homeLabel }),
    ).toHaveAttribute('href', '/es')
  })

  it('shows success state when unsubscribe succeeds', async () => {
    vi.spyOn(earlyAccessService, 'unsubscribe').mockResolvedValueOnce({
      unsubscribed: true,
    })

    renderAt('/es/unsubscribe?token=valid-token')

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        dictionaries.es.unsubscribe.successTitle,
      )
    })
    expect(earlyAccessService.unsubscribe).toHaveBeenCalledWith({
      token: 'valid-token',
    })
    expect(
      screen.getByText(dictionaries.es.unsubscribe.successMessage),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: dictionaries.es.unsubscribe.homeLabel }),
    ).toHaveAttribute('href', '/es')
  })

  it('shows invalid state when API responds with INVALID_UNSUBSCRIBE_TOKEN', async () => {
    vi.spyOn(earlyAccessService, 'unsubscribe').mockRejectedValueOnce(
      new AppError(ErrorCode.INVALID_UNSUBSCRIBE_TOKEN),
    )

    renderAt('/es/unsubscribe?token=bad-token')

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        dictionaries.es.unsubscribe.invalidTitle,
      )
    })
    expect(
      screen.getByText(dictionaries.es.errors.INVALID_UNSUBSCRIBE_TOKEN),
    ).toBeInTheDocument()
  })

  it('shows error state with retry button when a network error occurs', async () => {
    let fail = true
    vi.spyOn(earlyAccessService, 'unsubscribe').mockImplementation(async () => {
      if (fail) throw new AppError(ErrorCode.NETWORK_ERROR)
      return { unsubscribed: true }
    })

    renderAt('/es/unsubscribe?token=retry-token')

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        dictionaries.es.unsubscribe.errorTitle,
      )
    })
    expect(screen.getByText(dictionaries.es.errors.NETWORK_ERROR)).toBeInTheDocument()

    const retryBtn = screen.getByRole('button', {
      name: dictionaries.es.unsubscribe.retryLabel,
    })
    expect(retryBtn).toBeInTheDocument()

    fail = false
    act(() => {
      fireEvent.click(retryBtn)
    })

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        dictionaries.es.unsubscribe.successTitle,
      )
    })
  })
})
