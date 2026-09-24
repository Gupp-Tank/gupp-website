import type { IconName } from '../../../types/icon'
import type { Tone } from '../../../types/deviceViews'
import { Icon } from '../../ui/Icon'

interface IconTileProps {
  icon: IconName
  tone: Tone
  size?: 'sm' | 'md' | 'lg'
}

const ICON_SIZE = { sm: 15, md: 18, lg: 26 }

export function IconTile({ icon, tone, size = 'md' }: IconTileProps) {
  return (
    <span className={`dv-tile dv-tile--${tone} dv-tile--${size}`}>
      <Icon name={icon} size={ICON_SIZE[size]} />
    </span>
  )
}
