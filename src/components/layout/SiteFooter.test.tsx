import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { dictionaries } from '../../i18n/dictionaries'
import { withLocale } from '../../i18n/paths'
import { AppRoutes } from '../../routes/AppRoutes'
import type { FooterCopy } from '../../types/content'
import { SiteFooter } from './SiteFooter'

const es = dictionaries.es
const renderFooter = (copy: FooterCopy = es.footer) =>
  render(
    <MemoryRouter>
      <SiteFooter copy={copy} navLinks={es.header.links} highlights={es.hero.facts} homeLabel={es.header.homeLabel} localePath={(p) => withLocale('es', p)} />
    </MemoryRouter>,
  )

describe('SiteFooter', () => {
  it('is the contentinfo landmark with the copyright and tagline', () => {
    renderFooter()
    const footer = screen.getByRole('contentinfo')
    expect(within(footer).getByText(es.footer.tagline)).toBeInTheDocument()
    expect(footer).toHaveTextContent(`© ${new Date().getFullYear()} ${es.footer.copyright}`)
  })

  it('lists the site sections in a labelled nav', () => {
    renderFooter()
    const nav = screen.getByRole('navigation', { name: es.footer.navLabel })
    expect(within(nav).getByRole('link', { name: es.header.links[0].label })).toHaveAttribute('href', es.header.links[0].href)
  })

  it('links the logo home under the header label', () => {
    renderFooter()
    expect(screen.getByRole('link', { name: es.header.homeLabel })).toHaveAttribute('href', '/es')
  })

  it('renders no legal group (and no dead links) until legal pages are configured', () => {
    renderFooter()
    expect(screen.queryByRole('navigation', { name: es.footer.legalLabel })).not.toBeInTheDocument()
  })

  it('renders legal links in the active language once configured', () => {
    renderFooter({ ...es.footer, legalLinks: [{ label: 'Privacidad', path: '/privacy' }] })
    const legal = screen.getByRole('navigation', { name: es.footer.legalLabel })
    expect(within(legal).getByRole('link', { name: 'Privacidad' })).toHaveAttribute('href', '/es/privacy')
  })
})

describe('footer content', () => {
  afterEach(() => vi.useRealTimers())

  it('shows the product highlights', () => {
    renderFooter()
    for (const item of es.hero.facts) expect(screen.getByText(item)).toBeInTheDocument()
  })

  it('shows one fun fact under a labelled aside', () => {
    renderFooter()
    const aside = screen.getByRole('complementary', { name: es.footer.funFactLabel })
    const shown = es.footer.funFacts.filter((fact) => within(aside).queryByText(fact))
    expect(shown).toHaveLength(1)
  })

  it('starts on the fact of the day, which changes with the date', () => {
    vi.useFakeTimers()
    const seen = new Set<string>()
    for (const day of [1, 2, 3, 4, 5]) {
      vi.setSystemTime(new Date(2026, 0, day, 12))
      const { unmount } = renderFooter()
      seen.add(es.footer.funFacts.find((f) => screen.queryByText(f))!)
      unmount()
    }
    expect(seen.size).toBe(es.footer.funFacts.length)
  })

  it('pages to another fact and wraps around after the last one', async () => {
    const user = userEvent.setup()
    renderFooter()
    const current = () => es.footer.funFacts.findIndex((f) => screen.queryByText(f))
    const first = current()
    await user.click(screen.getByRole('button', { name: es.footer.funFactAction }))
    expect(current()).toBe((first + 1) % es.footer.funFacts.length)
    for (let i = 0; i < es.footer.funFacts.length - 1; i++) await user.click(screen.getByRole('button', { name: es.footer.funFactAction }))
    expect(current()).toBe(first)
  })

  it('hides the button when there is nothing else to show', () => {
    renderFooter({ ...es.footer, funFacts: ['Solo uno'] })
    expect(screen.getByText('Solo uno')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: es.footer.funFactAction })).not.toBeInTheDocument()
  })

  it('renders no card when there are no facts', () => {
    renderFooter({ ...es.footer, funFacts: [] })
    expect(screen.queryByRole('complementary')).not.toBeInTheDocument()
  })
})

describe('footer in the layout', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.lang = 'es'
  })

  it('appears once, after the main content, on every page in the layout', () => {
    render(
      <MemoryRouter initialEntries={['/en/nope']}>
        <AppRoutes />
      </MemoryRouter>,
    )
    expect(screen.getAllByRole('contentinfo')).toHaveLength(1)
    expect(screen.getByRole('contentinfo')).toHaveTextContent(dictionaries.en.footer.tagline)
  })

  it('becomes inert together with the page while the mobile menu is open', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter initialEntries={['/es']}>
        <AppRoutes />
      </MemoryRouter>,
    )
    const footer = document.querySelector('footer')!
    expect(footer).not.toHaveAttribute('inert')
    await user.click(screen.getByRole('button', { name: es.header.menuOpen }))
    expect(footer).toHaveAttribute('inert')
  })
})
