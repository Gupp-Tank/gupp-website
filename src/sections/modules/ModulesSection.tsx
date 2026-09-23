import type { ProductModule } from '../../types/content'
import { ModuleItem } from './ModuleItem'
import './ModulesSection.css'

interface ModulesSectionProps {
  heading: string
  modules: ProductModule[]
}

export function ModulesSection({ heading, modules }: ModulesSectionProps) {
  return (
    <section id="modules" className="modules" aria-labelledby="modules-title">
      <div className="modules__inner">
        <h2 id="modules-title" className="modules__title">
          {heading}
        </h2>
        <ol className="modules__list">
          {modules.map((module) => (
            <ModuleItem key={module.index} module={module} />
          ))}
        </ol>
      </div>
    </section>
  )
}
