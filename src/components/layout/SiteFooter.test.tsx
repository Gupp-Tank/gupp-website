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

  it('links the mark to the home page of the active language', () => {
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
  afterEach(() => vi.restoreAllMocks())

  it('shows the product highlights', () => {
    renderFooter()
    for (const item of es.hero.facts) expect(screen.getByText(item)).toBeInTheDocument()
  })

  it('uses the fish mark alone, not the wordmark logotype', () => {
    renderFooter()
    const home = screen.getByRole('link', { name: es.header.homeLabel })
    const img = home.querySelector('img')!
    expect(img.getAttribute('src')).toBe('/branding/icon.png')
    expect(img).toHaveAttribute('alt', '')
    expect(document.querySelector('img[src*="logotype"]')).toBeNull()
  })

  it('names the tagline as a heading and labels the links block', () => {
    renderFooter()
    expect(screen.getByRole('heading', { level: 2, name: es.footer.tagline })).toBeInTheDocument()
    expect(screen.getByText(es.footer.exploreLabel)).toBeInTheDocument()
  })

  it('scrolls back to the top when asked', async () => {
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    const user = userEvent.setup()
    renderFooter()
    await user.click(screen.getByRole('button', { name: es.footer.backToTopLabel }))
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
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
