import type { SVGProps } from 'react'
import type { IconName } from '../../types/icon'
import { iconData } from './iconData'

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName
  size?: number
  label?: string
}

// Phosphor Icons (MIT): duotone for objects, bold for UI glyphs. Paths are generated
// into iconData.ts by scripts/build-icons.mjs; `satisfies` keeps every IconName covered.
const data: Record<IconName, readonly { d: string; opacity?: number }[]> = iconData

export function Icon({ name, size = 20, label, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 256 256"
      fill="currentColor"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      {...rest}
    >
      {data[name].map((shape) => (
        <path key={shape.d} d={shape.d} opacity={shape.opacity} />
      ))}
    </svg>
  )
}
