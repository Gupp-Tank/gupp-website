import { Container } from '../../components/layout/Container'
import { Section } from '../../components/layout/Section'
import { Heading } from '../../components/ui/Heading'
import type { ProductModule } from '../../types/content'
import { ModuleItem } from './ModuleItem'
import './ModulesSection.css'

interface ModulesSectionProps {
  heading: string
  modules: ProductModule[]
}

export function ModulesSection({ heading, modules }: ModulesSectionProps) {
  return (
    <Section id="modules" labelledBy="modules-title">
      <Container className="modules__inner">
        <Heading level={2} size="section" id="modules-title" className="modules__title">
          {heading}
        </Heading>
        <ol className="modules__list">
          {modules.map((module) => (
            <ModuleItem key={module.index} module={module} />
          ))}
        </ol>
      </Container>
    </Section>
  )
}
