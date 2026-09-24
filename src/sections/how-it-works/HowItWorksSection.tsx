import { Container } from '../../components/layout/Container'
import { Section } from '../../components/layout/Section'
import { Heading } from '../../components/ui/Heading'
import { Icon } from '../../components/ui/Icon'
import { Text } from '../../components/ui/Text'
import type { HowItWorksCopy } from '../../types/content'
import './HowItWorksSection.css'

export function HowItWorksSection({ heading, steps }: HowItWorksCopy) {
  return (
    <Section id="how-it-works" labelledBy="how-it-works-title">
      <Container className="how__inner">
        <Heading level={2} size="section" id="how-it-works-title" className="how__title">
          {heading}
        </Heading>
        <ol className="how__steps">
          {steps.map((step, index) => (
            <li key={step.id} className="how__step">
              <span className="how__badge">
                <Icon name={step.icon} size={24} />
                <span className="how__number" aria-hidden>
                  {index + 1}
                </span>
              </span>
              <Heading level={3} size="card">
                {step.title}
              </Heading>
              <Text className="how__description">{step.description}</Text>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}
