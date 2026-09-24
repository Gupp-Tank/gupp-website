import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { dictionaries } from '../../i18n/dictionaries'
import { AppRoutes } from '../../routes/AppRoutes'

const copy = dictionaries.es.header
const renderHome = () =>
  render(
    <MemoryRouter initialEntries={['/es']}>
      <AppRoutes />
    </MemoryRouter>,
  )
const menuButton = () => screen.getByRole('button', { name: copy.menuOpen })
const main = () => document.querySelector('main') as HTMLElement

describe('mobile menu', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.lang = 'es'
  })

  it('starts closed with the page interactive', () => {
    renderHome()
    expect(menuButton()).toHaveAttribute('aria-expanded', 'false')
    expect(main()).not.toHaveAttribute('inert')
    expect(document.body.style.overflow).toBe('')
  })

  it('opens: exposes state, moves focus in, makes the page inert and locks scroll', async () => {
    const user = userEvent.setup()
    renderHome()
    await user.click(menuButton())

    const button = screen.getByRole('button', { name: copy.menuClose })
    expect(button).toHaveAttribute('aria-expanded', 'true')
    const panel = document.getElementById(button.getAttribute('aria-controls')!)!
    expect(panel).not.toHaveAttribute('hidden')
    expect(panel.querySelector('a')).toHaveFocus()
    expect(main()).toHaveAttribute('inert')
    expect(document.body.style.overflow).toBe('hidden')
  })

  it('closes on Escape and returns focus to the button', async () => {
    const user = userEvent.setup()
    renderHome()
    await user.click(menuButton())
    await user.keyboard('{Escape}')

    expect(menuButton()).toHaveAttribute('aria-expanded', 'false')
    expect(menuButton()).toHaveFocus()
    expect(main()).not.toHaveAttribute('inert')
    expect(document.body.style.overflow).toBe('')
  })

  it('closes when a link is chosen', async () => {
    const user = userEvent.setup()
    renderHome()
    await user.click(menuButton())
    const panel = document.getElementById(screen.getByRole('button', { name: copy.menuClose }).getAttribute('aria-controls')!)!
    await user.click(panel.querySelector('a')!)
    expect(menuButton()).toHaveAttribute('aria-expanded', 'false')
  })

  it('traps Tab and Shift+Tab inside the header while open', async () => {
    const user = userEvent.setup()
    renderHome()
    await user.click(menuButton())
    const header = screen.getByRole('banner')

    for (let i = 0; i < 12; i++) {
      await user.tab()
      expect(header).toContainElement(document.activeElement as HTMLElement)
    }
    for (let i = 0; i < 12; i++) {
      await user.tab({ shift: true })
      expect(header).toContainElement(document.activeElement as HTMLElement)
    }
  })

  it('offers the language and theme controls with the menu closed', () => {
    renderHome()
    expect(screen.getByRole('button', { name: 'English' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: dictionaries.es.header.themeToDark })).toBeInTheDocument()
  })
})

describe('active section', () => {
  let trigger: (id: string, intersecting: boolean) => void

  beforeEach(() => {
    document.documentElement.lang = 'es'
    const callbacks: IntersectionObserverCallback[] = []
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(cb: IntersectionObserverCallback) {
          callbacks.push(cb)
        }
        observe() {}
        disconnect() {}
      },
    )
    trigger = (id, isIntersecting) =>
      act(() => callbacks.forEach((cb) => cb([{ isIntersecting, target: document.getElementById(id)! } as unknown as IntersectionObserverEntry], {} as IntersectionObserver)))
  })
  afterEach(() => vi.unstubAllGlobals())

  it('marks the link of the section in view, and clears it when it leaves', () => {
    renderHome()
    const link = screen.getAllByRole('link', { name: copy.links[0].label })[0]
    expect(link).not.toHaveAttribute('aria-current')
    trigger('modules', true)
    expect(link).toHaveAttribute('aria-current', 'location')
    trigger('modules', false)
    expect(link).not.toHaveAttribute('aria-current')
  })
})
