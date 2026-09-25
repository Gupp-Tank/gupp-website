import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { describe, expect, it, vi } from 'vitest'
import { dictionaries } from '../../i18n/dictionaries'
import { ConsentBanner } from './ConsentBanner'
import { ConsentPreferences } from './ConsentPreferences'

describe.each(Object.entries(dictionaries))('consent UI (%s)', (_locale, dictionary) => {
  const { banner, preferences } = dictionary.consent

  it('banner offers accept, reject and customize, each doing one thing, and links the privacy policy', async () => {
    const handlers = { onAccept: vi.fn(), onReject: vi.fn(), onCustomize: vi.fn() }
    render(
      <MemoryRouter>
        <ConsentBanner copy={banner} privacyHref="/es/privacy" {...handlers} />
      </MemoryRouter>,
    )
    const region = screen.getByRole('region', { name: banner.label })
    expect(within(region).getByRole('link', { name: banner.policyLink })).toHaveAttribute('href', '/es/privacy')
    await userEvent.click(within(region).getByRole('button', { name: banner.accept }))
    await userEvent.click(within(region).getByRole('button', { name: banner.reject }))
    await userEvent.click(within(region).getByRole('button', { name: banner.customize }))
    expect(handlers.onAccept).toHaveBeenCalledTimes(1)
    expect(handlers.onReject).toHaveBeenCalledTimes(1)
    expect(handlers.onCustomize).toHaveBeenCalledTimes(1)
  })

  it('banner is not a modal dialog', () => {
    render(
      <MemoryRouter>
        <ConsentBanner copy={banner} privacyHref="/x" onAccept={vi.fn()} onReject={vi.fn()} onCustomize={vi.fn()} />
      </MemoryRouter>,
    )
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('preferences render nothing while closed', () => {
    render(<ConsentPreferences copy={preferences} open={false} analytics={false} onSave={vi.fn()} onClose={vi.fn()} />)
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('preferences are a labelled modal dialog: essential is always on, analytics is an off-by-default switch', async () => {
    const onSave = vi.fn()
    render(<ConsentPreferences copy={preferences} open analytics={false} onSave={onSave} onClose={vi.fn()} />)
    const dialog = screen.getByRole('dialog', { name: preferences.title })
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(within(dialog).getByText(preferences.alwaysOn)).toBeInTheDocument()
    const toggle = within(dialog).getByRole('switch', { name: preferences.analyticsSwitchLabel })
    expect(toggle).not.toBeChecked()
    await userEvent.click(toggle)
    await userEvent.click(within(dialog).getByRole('button', { name: preferences.save }))
    expect(onSave).toHaveBeenCalledWith(true)
  })

  it('accept all and reject all save directly, and Escape closes without saving', async () => {
    const onSave = vi.fn()
    const onClose = vi.fn()
    render(<ConsentPreferences copy={preferences} open analytics onSave={onSave} onClose={onClose} />)
    expect(screen.getByRole('switch', { name: preferences.analyticsSwitchLabel })).toBeChecked()
    await userEvent.click(screen.getByRole('button', { name: preferences.rejectAll }))
    await userEvent.click(screen.getByRole('button', { name: preferences.acceptAll }))
    expect(onSave.mock.calls).toEqual([[false], [true]])
    await userEvent.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalled()
  })
})
