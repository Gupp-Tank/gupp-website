import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { AppError, ErrorCode } from '../errors'
import { dictionaries } from '../i18n/dictionaries'
import { authService } from '../services/authService'
import { ResetPasswordPage } from './ResetPasswordPage'

const renderAt = (url: string) =>
  render(
    <MemoryRouter initialEntries={[url]}>
      <ResetPasswordPage />
    </MemoryRouter>,
  )

describe('ResetPasswordPage', () => {
  beforeEach(() => {
    document.documentElement.lang = 'es'
    vi.restoreAllMocks()
  })

  it('shows invalid state when token is missing from the query string', () => {
    renderAt('/es/reset-password')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      dictionaries.es.resetPassword.invalidTitle,
    )
    expect(
      screen.getByText(dictionaries.es.resetPassword.invalidMessage),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: dictionaries.es.resetPassword.homeLabel }),
    ).toHaveAttribute('href', '/es')
    expect(
      screen.getByRole('link', { name: dictionaries.es.resetPassword.requestNewAction }),
    ).toHaveAttribute('data-placeholder', 'request-reset-link')
  })

  it('shows form fields when token is provided in the query string', () => {
    renderAt('/es/reset-password?token=test-tok-123')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      dictionaries.es.resetPassword.title,
    )
    expect(screen.getByLabelText(dictionaries.es.resetPassword.newPasswordLabel)).toBeInTheDocument()
    expect(screen.getByLabelText(dictionaries.es.resetPassword.confirmPasswordLabel)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: dictionaries.es.resetPassword.submitButton }),
    ).toBeInTheDocument()
  })

  it('shows client-side validation errors when submitted empty', async () => {
    renderAt('/es/reset-password?token=test-tok-123')

    const submitBtn = screen.getByRole('button', { name: dictionaries.es.resetPassword.submitButton })
    act(() => {
      fireEvent.click(submitBtn)
    })

    expect(
      screen.getByText(dictionaries.es.resetPassword.fieldErrors.passwordRequired),
    ).toBeInTheDocument()
    expect(
      screen.getByText(dictionaries.es.resetPassword.fieldErrors.confirmPasswordRequired),
    ).toBeInTheDocument()
  })

  it('shows password too short error when password is under 8 characters', async () => {
    renderAt('/es/reset-password?token=test-tok-123')

    fireEvent.change(screen.getByLabelText(dictionaries.es.resetPassword.newPasswordLabel), {
      target: { name: 'newPassword', value: '1234567' },
    })
    fireEvent.change(screen.getByLabelText(dictionaries.es.resetPassword.confirmPasswordLabel), {
      target: { name: 'confirmPassword', value: '1234567' },
    })

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: dictionaries.es.resetPassword.submitButton }))
    })

    expect(
      screen.getByText(dictionaries.es.resetPassword.fieldErrors.passwordTooShort),
    ).toBeInTheDocument()
  })

  it('shows passwords mismatch error when confirmation differs', async () => {
    renderAt('/es/reset-password?token=test-tok-123')

    fireEvent.change(screen.getByLabelText(dictionaries.es.resetPassword.newPasswordLabel), {
      target: { name: 'newPassword', value: 'validPassword12' },
    })
    fireEvent.change(screen.getByLabelText(dictionaries.es.resetPassword.confirmPasswordLabel), {
      target: { name: 'confirmPassword', value: 'differentPassword34' },
    })

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: dictionaries.es.resetPassword.submitButton }))
    })

    expect(
      screen.getByText(dictionaries.es.resetPassword.fieldErrors.passwordsDoNotMatch),
    ).toBeInTheDocument()
  })

  it('shows success state when reset password succeeds with 200', async () => {
    vi.spyOn(authService, 'resetPassword').mockResolvedValueOnce(undefined)

    renderAt('/es/reset-password?token=valid-tok')

    fireEvent.change(screen.getByLabelText(dictionaries.es.resetPassword.newPasswordLabel), {
      target: { name: 'newPassword', value: 'MySecretPassword12' },
    })
    fireEvent.change(screen.getByLabelText(dictionaries.es.resetPassword.confirmPasswordLabel), {
      target: { name: 'confirmPassword', value: 'MySecretPassword12' },
    })

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: dictionaries.es.resetPassword.submitButton }))
    })

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        dictionaries.es.resetPassword.successTitle,
      )
    })
    expect(authService.resetPassword).toHaveBeenCalledWith({
      token: 'valid-tok',
      newPassword: 'MySecretPassword12',
    })
    expect(screen.getByText(dictionaries.es.resetPassword.successMessage)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: dictionaries.es.resetPassword.openAppLabel })).toHaveAttribute(
      'data-placeholder',
      'app-login-link',
    )
    expect(screen.getByRole('link', { name: dictionaries.es.resetPassword.homeLabel })).toHaveAttribute(
      'href',
      '/es',
    )
  })

  it('shows invalid state when API responds with 401 INVALID_RESET_TOKEN', async () => {
    vi.spyOn(authService, 'resetPassword').mockRejectedValueOnce(
      new AppError(ErrorCode.INVALID_RESET_TOKEN),
    )

    renderAt('/es/reset-password?token=expired-tok')

    fireEvent.change(screen.getByLabelText(dictionaries.es.resetPassword.newPasswordLabel), {
      target: { name: 'newPassword', value: 'MySecretPassword12' },
    })
    fireEvent.change(screen.getByLabelText(dictionaries.es.resetPassword.confirmPasswordLabel), {
      target: { name: 'confirmPassword', value: 'MySecretPassword12' },
    })

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: dictionaries.es.resetPassword.submitButton }))
    })

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        dictionaries.es.resetPassword.invalidTitle,
      )
    })
    expect(screen.getByText(dictionaries.es.errors.INVALID_RESET_TOKEN)).toBeInTheDocument()
  })

  it('shows generic validation error when API responds with 400', async () => {
    vi.spyOn(authService, 'resetPassword').mockRejectedValueOnce(
      new AppError(ErrorCode.VALIDATION_FAILED),
    )

    renderAt('/es/reset-password?token=valid-tok')

    fireEvent.change(screen.getByLabelText(dictionaries.es.resetPassword.newPasswordLabel), {
      target: { name: 'newPassword', value: 'MySecretPassword12' },
    })
    fireEvent.change(screen.getByLabelText(dictionaries.es.resetPassword.confirmPasswordLabel), {
      target: { name: 'confirmPassword', value: 'MySecretPassword12' },
    })

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: dictionaries.es.resetPassword.submitButton }))
    })

    await waitFor(() => {
      expect(screen.getByText(dictionaries.es.errors.VALIDATION_FAILED)).toBeInTheDocument()
    })
  })

  it('shows generic network error message when network fails', async () => {
    vi.spyOn(authService, 'resetPassword').mockRejectedValueOnce(
      new AppError(ErrorCode.NETWORK_ERROR),
    )

    renderAt('/es/reset-password?token=valid-tok')

    fireEvent.change(screen.getByLabelText(dictionaries.es.resetPassword.newPasswordLabel), {
      target: { name: 'newPassword', value: 'MySecretPassword12' },
    })
    fireEvent.change(screen.getByLabelText(dictionaries.es.resetPassword.confirmPasswordLabel), {
      target: { name: 'confirmPassword', value: 'MySecretPassword12' },
    })

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: dictionaries.es.resetPassword.submitButton }))
    })

    await waitFor(() => {
      expect(screen.getByText(dictionaries.es.errors.NETWORK_ERROR)).toBeInTheDocument()
    })
  })
})
