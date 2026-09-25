import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CtaBand } from '../components/cta/CtaBand'
import { dictionaries } from '../i18n/dictionaries'
import { CtaSection } from './cta/CtaSection'
import { FaqSection } from './faq/FaqSection'
import { HowItWorksSection } from './how-it-works/HowItWorksSection'
import { PlansSection } from './plans/PlansSection'

describe.each(Object.entries(dictionaries))('page sections (%s)', (_locale, dictionary) => {
  it('lists the how-it-works steps in order, as an ordered list', () => {
    const { container } = render(<HowItWorksSection {...dictionary.howItWorks} />)
    expect(screen.getByRole('region', { name: dictionary.howItWorks.heading })).toBeInTheDocument()
    const steps = container.querySelectorAll('ol > li')
    expect(steps).toHaveLength(dictionary.howItWorks.steps.length)
    steps.forEach((step, i) => expect(step).toHaveTextContent(dictionary.howItWorks.steps[i].title))
  })

  it('renders every FAQ question as a collapsed trigger with its answer in the page', () => {
    const { container } = render(<FaqSection {...dictionary.faq} />)
    expect(screen.getByRole('region', { name: dictionary.faq.heading })).toBeInTheDocument()
    for (const item of dictionary.faq.items) {
      expect(screen.getByRole('button', { name: item.question })).toHaveAttribute('aria-expanded', 'false')
      expect(container).toHaveTextContent(item.answer)
    }
  })

  it('shows the plan comparison as a table with column and row headers and no price', () => {
    const { container } = render(<PlansSection {...dictionary.plans} />)
    expect(screen.getByRole('region', { name: dictionary.plans.heading })).toBeInTheDocument()
    expect(screen.getAllByRole('columnheader')).toHaveLength(3)
    expect(screen.getAllByRole('rowheader')).toHaveLength(dictionary.plans.rows.length)
    expect(container.textContent).not.toMatch(/[$€]|USD|\d+\s?\/\s?(mes|month)/i)
  })

  it('links the CTA fallback to the section that explains the product', () => {
    render(<CtaSection {...dictionary.cta} />)
    expect(screen.getByRole('region', { name: dictionary.cta.heading })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: dictionary.cta.fallbackLabel })).toHaveAttribute('href', '#how-it-works')
  })
})

describe('CtaBand', () => {
  it('shows the slot instead of the fallback link when a form is provided', () => {
    render(
      <CtaBand heading="Heading" description="Text" fallbackLabel="Fallback" fallbackHref="#x">
        <form aria-label="Early access" />
      </CtaBand>,
    )
    expect(screen.getByRole('form', { name: 'Early access' })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Fallback' })).toBeNull()
  })
})
