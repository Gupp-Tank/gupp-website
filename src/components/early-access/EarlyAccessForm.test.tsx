import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { describe, expect, it, vi } from 'vitest'
import { PRIVACY_EMAIL } from '../../content/legal'
import { dictionaries } from '../../i18n/dictionaries'
import { TANK_TYPES } from '../../types/earlyAccess'
import { EarlyAccessForm } from './EarlyAccessForm'

describe.each(Object.entries(dictionaries))('EarlyAccessForm (%s)', (_locale, dictionary) => {
  const copy = dictionary.earlyAccess
  const base = {
    copy,
    values: { email: '', tankType: '' as const, accepted: false, website: '' },
    status: 'idle' as const,
    fieldErrors: {},
    serverError: null,
    termsHref: '/x/terms',
    privacyHref: '/x/privacy',
    privacyEmail: PRIVACY_EMAIL,
    onChange: vi.fn(),
    onSubmit: vi.fn((e: React.FormEvent) => e.preventDefault()),
  }
  const renderForm = (props = {}) =>
    render(
      <MemoryRouter>
        <EarlyAccessForm {...base} {...props} />
      </MemoryRouter>,
    )

  it('has a labelled email field, an optional tank type and an unchecked consent checkbox', () => {
    renderForm()
    expect(screen.getByRole('form', { name: copy.formLabel })).toBeInTheDocument()
    expect(screen.getByLabelText(copy.emailLabel)).toBeInTheDocument()
    const select = screen.getByLabelText(copy.tankLabel)
    expect(select.querySelectorAll('option')).toHaveLength(TANK_TYPES.length + 1)
    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })

  it('links the terms and the privacy policy from the consent label and states the data use and how to withdraw', () => {
    const { container } = renderForm()
    expect(screen.getByRole('link', { name: copy.termsLink })).toHaveAttribute('href', '/x/terms')
    expect(screen.getByRole('link', { name: copy.privacyLink })).toHaveAttribute('href', '/x/privacy')
    expect(container).toHaveTextContent(copy.dataNotice)
    expect(screen.getByRole('link', { name: PRIVACY_EMAIL })).toHaveAttribute('href', `mailto:${PRIVACY_EMAIL}`)
  })

  it('ties field errors to their field and announces them', () => {
    renderForm({ fieldErrors: { email: 'emailInvalid', consent: 'consentRequired' } })
    const email = screen.getByLabelText(copy.emailLabel)
    expect(email).toHaveAttribute('aria-invalid', 'true')
    expect(document.getElementById(email.getAttribute('aria-describedby')!)).toHaveTextContent(copy.fieldErrors.emailInvalid)
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByText(copy.fieldErrors.consentRequired)).toHaveAttribute('aria-live', 'polite')
  })

  it('announces a server error with role alert and disables the button while sending', () => {
    const { rerender } = renderForm({ serverError: dictionary.errors.RATE_LIMITED })
    expect(screen.getByRole('alert')).toHaveTextContent(dictionary.errors.RATE_LIMITED)
    rerender(
      <MemoryRouter>
        <EarlyAccessForm {...base} status="submitting" />
      </MemoryRouter>,
    )
    expect(screen.getByRole('button', { name: copy.submitting })).toBeDisabled()
  })

  it('submits through the form and hides the honeypot from assistive tech', async () => {
    const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault())
    const { container } = renderForm({ onSubmit })
    expect(container.querySelector('.ea-honeypot')).toHaveAttribute('aria-hidden', 'true')
    await userEvent.click(screen.getByRole('button', { name: copy.submit }))
    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  it('shows a status message instead of the form once registered', () => {
    renderForm({ status: 'success' })
    expect(screen.getByRole('status')).toHaveTextContent(copy.successTitle)
    expect(screen.queryByRole('form')).toBeNull()
  })
})
