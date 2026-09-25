import { CtaBand } from '../../components/cta/CtaBand'
import { Container } from '../../components/layout/Container'
import { Section } from '../../components/layout/Section'
import { links } from '../../content/links'
import type { ReactNode } from 'react'
import type { CtaCopy } from '../../types/content'
import './CtaSection.css'

interface CtaSectionProps extends CtaCopy {
  /** The early-access form; without it the band shows the plain link. */
  form?: ReactNode
}

export function CtaSection({ heading, description, formDescription, fallbackLabel, form }: CtaSectionProps) {
  return (
    <Section id="cta" labelledBy="cta-title">
      <Container className="cta__inner">
        <CtaBand
          headingId="cta-title"
          heading={heading}
          description={form ? formDescription : description}
          fallbackLabel={fallbackLabel}
          fallbackHref={links.howItWorks}
        >
          {form}
        </CtaBand>
      </Container>
    </Section>
  )
}
