import { Heading } from '../../components/ui/Heading'
import { Icon } from '../../components/ui/Icon'
import { Text } from '../../components/ui/Text'
import type { ProductModule } from '../../types/content'

interface ModuleItemProps {
  module: ProductModule
}

export function ModuleItem({ module }: ModuleItemProps) {
  return (
    <li id={`module-${module.slug}`} className="module-item">
      <div className="module-item__top">
        <span className="module-item__icon">
          <Icon name={module.icon} size={22} />
        </span>
        <span className="module-item__index">{module.index}</span>
      </div>
      <Heading level={3} size="card">
        {module.title}
      </Heading>
      <Text className="module-item__description">{module.description}</Text>
    </li>
  )
}
