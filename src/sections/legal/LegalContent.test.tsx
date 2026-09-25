import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { LEGAL_DOCUMENTS_VERSION, PRIVACY_EMAIL } from '../../content/legal'
import { dictionaries } from '../../i18n/dictionaries'
import { LegalContent } from './LegalContent'

describe.each(Object.entries(dictionaries))('legal documents (%s)', (_locale, dictionary) => {
  const { legal } = dictionary

  it.each(['privacy', 'terms'] as const)('%s renders its title, version, sections and table of contents', (key) => {
    const doc = legal[key]
    const { container } = render(<LegalContent doc={doc} copy={legal} updatedText="24 Sep 2026" />)
    expect(screen.getByRole('heading', { level: 1, name: doc.title })).toBeInTheDocument()
    expect(container).toHaveTextContent(`${legal.versionLabel} ${LEGAL_DOCUMENTS_VERSION}`)
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(doc.sections.length)
    const toc = screen.getByRole('navigation', { name: legal.tocLabel })
    for (const section of doc.sections) {
      expect(toc.querySelector(`a[href="#${section.id}"]`)).not.toBeNull()
      expect(container.querySelector(`section#${section.id}`)).not.toBeNull()
    }
  })

  it('turns {email} into a mailto link and never leaves the token in the text', () => {
    for (const key of ['privacy', 'terms'] as const) {
      const { container, unmount } = render(<LegalContent doc={legal[key]} copy={legal} updatedText="" />)
      expect(container.querySelector(`a[href="mailto:${PRIVACY_EMAIL}"]`)).not.toBeNull()
      expect(container.textContent).not.toContain('{email}')
      unmount()
    }
  })

  it('states purpose, retention and how to delete the data in the privacy policy', () => {
    const ids = legal.privacy.sections.map((s) => s.id)
    for (const id of ['purpose', 'retention', 'rights']) expect(ids).toContain(id)
  })
})

describe('legal versioning', () => {
  it('uses the same version and section ids in every locale', () => {
    const shape = (d: (typeof dictionaries)['es']) => ({
      privacy: [d.legal.privacy.version, ...d.legal.privacy.sections.map((s) => s.id)],
      terms: [d.legal.terms.version, ...d.legal.terms.sections.map((s) => s.id)],
    })
    const [first, ...rest] = Object.values(dictionaries).map(shape)
    for (const other of rest) expect(other).toEqual(first)
    expect(first.privacy[0]).toBe(LEGAL_DOCUMENTS_VERSION)
    expect(first.terms[0]).toBe(LEGAL_DOCUMENTS_VERSION)
  })

  it('links the legal pages from the footer in every language', () => {
    for (const d of Object.values(dictionaries)) expect(d.footer.legalLinks.map((l) => l.path)).toEqual(['/privacy', '/terms'])
  })
})

