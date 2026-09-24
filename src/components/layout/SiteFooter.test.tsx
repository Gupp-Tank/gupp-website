import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { dictionaries } from '../../i18n/dictionaries'
import { withLocale } from '../../i18n/paths'
import { AppRoutes } from '../../routes/AppRoutes'
import type { FooterCopy } from '../../types/content'
import { SiteFooter } from './SiteFooter'

const es = dictionaries.es
const socials = [
  { name: 'instagram' as const, label: es.footer.instagramLabel, href: 'https://www.instagram.com/example' },
  { name: 'x' as const, label: es.footer.xLabel, href: 'https://x.com/example' },
]
const renderFooter = (copy: FooterCopy = es.footer, onLocaleChange = vi.fn()) =>
  render(
    <MemoryRouter>
      <SiteFooter
        copy={copy}
        socials={socials}
        modules={es.modules.items}
        highlights={es.hero.facts}
        preferencesCopy={es.header}
        locale="es"
        onLocaleChange={onLocaleChange}
        homeLabel={es.header.homeLabel}
        localePath={(p) => withLocale('es', p)}
      />
    </MemoryRouter>,
  )

describe('SiteFooter', () => {
  it('is the contentinfo landmark with the copyright and tagline', () => {
    renderFooter()
    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveTextContent(`© ${new Date().getFullYear()} ${es.footer.copyright}`)
    expect(within(footer).getByText(es.footer.tagline)).toBeInTheDocument()
  })

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
    expect(home).toHaveAttribute('href', '/es')
  })

  it('links the social profiles in a new tab, safely, with accessible names', () => {
    renderFooter()
    const nav = screen.getByRole('navigation', { name: es.footer.socialLabel })
    for (const social of socials) {
      const link = within(nav).getByRole('link', { name: social.label })
      expect(link).toHaveAttribute('href', social.href)
      expect(link).toHaveAttribute('target', '_blank')
      expect(link.getAttribute('rel')).toContain('noreferrer')
      expect(link.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
    }
  })

  it('announces the stores with marks that are not links or buttons', () => {
    renderFooter()
    const footer = screen.getByRole('contentinfo')
    expect(within(footer).getByText(es.footer.storesLabel)).toBeInTheDocument()
    for (const store of ['App Store', 'Google Play']) {
      const mark = within(footer).getByRole('img', { name: store })
      expect(mark.closest('a, button')).toBeNull()
    }
  })

  it('lists every module as a link to its own card', () => {
    renderFooter()
    const nav = screen.getByRole('navigation', { name: es.footer.productLabel })
    for (const module of es.modules.items) {
      expect(within(nav).getByRole('link', { name: module.title })).toHaveAttribute('href', `#module-${module.slug}`)
    }
  })

  it('offers language and theme controls that work', async () => {
    const onLocaleChange = vi.fn()
    const user = userEvent.setup()
    renderFooter(es.footer, onLocaleChange)
    const controls = screen.getByRole('group', { name: es.header.preferencesLabel })
    await user.click(within(controls).getByRole('button', { name: 'English' }))
    expect(onLocaleChange).toHaveBeenCalledWith('en')
    expect(within(controls).getByRole('button', { name: es.header.themeToDark })).toBeInTheDocument()
  })

  it('renders no legal column (and no dead links) until legal pages are configured', () => {
    renderFooter()
    expect(screen.queryByRole('navigation', { name: es.footer.legalLabel })).not.toBeInTheDocument()
  })

  it('renders legal links in the active language once configured', () => {
    renderFooter({ ...es.footer, legalLinks: [{ label: 'Privacidad', path: '/privacy' }] })
    const legal = screen.getByRole('navigation', { name: es.footer.legalLabel })
    expect(within(legal).getByRole('link', { name: 'Privacidad' })).toHaveAttribute('href', '/es/privacy')
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

  it('has module cards to land on: every footer link points at an existing id', () => {
    render(
      <MemoryRouter initialEntries={['/es']}>
        <AppRoutes />
      </MemoryRouter>,
    )
    const nav = screen.getByRole('navigation', { name: es.footer.productLabel })
    for (const link of within(nav).getAllByRole('link')) {
      expect(document.getElementById(link.getAttribute('href')!.slice(1))).not.toBeNull()
    }
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
