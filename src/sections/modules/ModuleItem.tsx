import { Icon } from '../../components/ui/Icon'
import type { ProductModule } from '../../types/content'

interface ModuleItemProps {
  module: ProductModule
}

export function ModuleItem({ module }: ModuleItemProps) {
  return (
    <li className="module-item">
      <div className="module-item__top">
        <span className="module-item__icon">
          <Icon name={module.icon} size={22} />
        </span>
        <span className="module-item__index">{module.index}</span>
      </div>
      <h3 className="module-item__title">{module.title}</h3>
      <p className="module-item__description">{module.description}</p>
    </li>
  )
}
