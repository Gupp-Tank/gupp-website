import { CtaBand } from '../../components/cta/CtaBand'
import { Container } from '../../components/layout/Container'
import { Section } from '../../components/layout/Section'
import { links } from '../../content/links'
import type { CtaCopy } from '../../types/content'
import './CtaSection.css'

export function CtaSection({ heading, description, fallbackLabel }: CtaCopy) {
  return (
    <Section id="cta" labelledBy="cta-title">
      <Container className="cta__inner">
        <CtaBand headingId="cta-title" heading={heading} description={description} fallbackLabel={fallbackLabel} fallbackHref={links.howItWorks} />
      </Container>
    </Section>
  )
}
