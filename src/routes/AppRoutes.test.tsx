import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, useLocation } from 'react-router'
import { beforeEach, describe, expect, it } from 'vitest'
import { dictionaries } from '../i18n/dictionaries'
import { AppRoutes } from './AppRoutes'

const Probe = () => {
  const { pathname, search, hash } = useLocation()
  return <output data-testid="location">{pathname + search + hash}</output>
}

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
      <Probe />
    </MemoryRouter>,
  )

const here = () => screen.getByTestId('location').textContent
const h1 = () => screen.getByRole('heading', { level: 1 }).textContent

describe('AppRoutes', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.lang = 'es'
  })

  it('redirects / to the resolved language', () => {
    document.documentElement.lang = 'en'
    renderAt('/')
    expect(here()).toBe('/en')
    expect(h1()).toContain('Fishkeeping')
  })

  it('redirects / to Spanish by default', () => {
    renderAt('/')
    expect(here()).toBe('/es')
  })

  it.each([
    ['es', 'El acuarismo'],
    ['en', 'Fishkeeping'],
  ])('renders the home page at /%s in that language', (locale, headline) => {
    renderAt(`/${locale}`)
    expect(h1()).toContain(headline)
    expect(document.documentElement.lang).toBe(locale)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('lets the URL win over the stored language', () => {
    document.documentElement.lang = 'es'
    renderAt('/en')
    expect(document.documentElement.lang).toBe('en')
    expect(localStorage.getItem('gupp-locale')).toBe('en')
  })

  it('shows a localized 404, without the site header, for an unsupported language', () => {
    renderAt('/fr')
    expect(screen.getByRole('heading', { name: dictionaries.es.notFound.title })).toBeInTheDocument()
    expect(screen.queryByRole('banner')).not.toBeInTheDocument()
  })

  it('shows the 404 inside the layout for an unknown page in a valid language', () => {
    renderAt('/en/nope')
    expect(screen.getByRole('heading', { name: dictionaries.en.notFound.title })).toBeInTheDocument()
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('shows the 404 for an unknown top-level path', () => {
    renderAt('/whatever')
    expect(screen.getByRole('heading', { name: dictionaries.es.notFound.title })).toBeInTheDocument()
  })

  it('links the 404 back to the home page of the active language', () => {
    renderAt('/en/nope')
    fireEvent.click(screen.getByRole('link', { name: dictionaries.en.notFound.homeLabel }))
    expect(here()).toBe('/en')
    expect(h1()).toContain('Fishkeeping')
  })

  describe('language switch', () => {
    it('changes the language in the URL and keeps the rest of it', () => {
      renderAt('/es/nope?ref=1#top')
      fireEvent.click(screen.getByRole('button', { name: 'English' }))
      expect(here()).toBe('/en/nope?ref=1#top')
      expect(document.documentElement.lang).toBe('en')
      expect(screen.getByRole('heading', { name: dictionaries.en.notFound.title })).toBeInTheDocument()
    })

    it('goes from /es to /en on the home page', () => {
      renderAt('/es')
      fireEvent.click(screen.getByRole('button', { name: 'English' }))
      expect(here()).toBe('/en')
      expect(h1()).toContain('Fishkeeping')
    })

    it('marks the active language as pressed', () => {
      renderAt('/en')
      expect(screen.getByRole('button', { name: 'English' })).toHaveAttribute('aria-pressed', 'true')
      expect(screen.getByRole('button', { name: 'Español' })).toHaveAttribute('aria-pressed', 'false')
    })
  })

  it('points every logo (header and footer) at the home page of the active language', () => {
    renderAt('/en/nope')
    const logos = screen.getAllByRole('link', { name: dictionaries.en.header.homeLabel })
    expect(logos).toHaveLength(2)
    for (const logo of logos) expect(logo).toHaveAttribute('href', '/en')
  })
})
