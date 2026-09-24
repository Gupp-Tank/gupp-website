import { Icon } from '../../ui/Icon'

interface ScreenHeaderProps {
  title: string
  subtitle?: string
  menu?: boolean
}

export function ScreenHeader({ title, subtitle, menu = false }: ScreenHeaderProps) {
  return (
    <div className="dv-header">
      <span className="dv-header__btn">
        <Icon name="chevronLeft" size={16} />
      </span>
      <div className="dv-header__text">
        <span className="dv-header__title">{title}</span>
        {subtitle && <span className="dv-header__subtitle">{subtitle}</span>}
      </div>
      {menu && (
        <span className="dv-header__btn">
          <Icon name="dots" size={16} />
        </span>
      )}
    </div>
  )
}
