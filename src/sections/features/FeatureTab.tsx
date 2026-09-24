import { featureTabId } from '../../hooks/useFeatureTabs'
import { Icon } from '../../components/ui/Icon'
import { Text } from '../../components/ui/Text'
import type { ProductModule } from '../../types/content'

interface FeatureTabProps {
  module: ProductModule
  selected: boolean
  onSelect: () => void
}

export function FeatureTab({ module, selected, onSelect }: FeatureTabProps) {
  const descriptionId = `${featureTabId(module.slug)}-description`
  return (
    // The wrapper is presentational so the tablist only owns tabs; the description sits beside its tab, not inside its name.
    <div role="presentation" className={['feature-tab', selected && 'is-selected'].filter(Boolean).join(' ')}>
      <button
        type="button"
        role="tab"
        id={featureTabId(module.slug)}
        aria-selected={selected}
        aria-controls="features-panel"
        aria-describedby={descriptionId}
        tabIndex={selected ? 0 : -1}
        className="feature-tab__button"
        onClick={onSelect}
      >
        <span className="feature-tab__icon">
          <Icon name={module.icon} size={20} />
        </span>
        <span className="feature-tab__title">{module.title}</span>
        <span className="feature-tab__index" aria-hidden>{module.index}</span>
      </button>
      <div className="feature-tab__more">
        <Text id={descriptionId} className="feature-tab__description">
          {module.description}
        </Text>
      </div>
    </div>
  )
}
