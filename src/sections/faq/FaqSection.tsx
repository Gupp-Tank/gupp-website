import { Container } from '../../components/layout/Container'
import { Section } from '../../components/layout/Section'
import { Accordion } from '../../components/ui/Accordion'
import { Heading } from '../../components/ui/Heading'
import { Text } from '../../components/ui/Text'
import type { FaqCopy } from '../../types/content'
import './FaqSection.css'

export function FaqSection({ heading, items }: FaqCopy) {
  return (
    <Section id="faq" labelledBy="faq-title">
      <Container className="faq__inner">
        <Heading level={2} size="section" id="faq-title" className="faq__title">
          {heading}
        </Heading>
        <Accordion
          className="faq__list"
          headingLevel={3}
          items={items.map((item) => ({ id: item.id, heading: item.question, content: <Text>{item.answer}</Text> }))}
        />
      </Container>
    </Section>
  )
}
