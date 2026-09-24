import type { IconName } from '../components/ui/Icon'

export interface NavLink {
  label: string
  href: string
  external?: boolean
}

export interface CallToAction extends NavLink {
  variant: 'primary' | 'ghost'
}

export type ParameterStatus = 'normal' | 'warning'

export interface WaterParameter {
  id: string
  label: string
  value: string
  unit: string
  status: ParameterStatus
  icon: IconName
  trendLabel?: string
}

export interface SiteMeta {
  title: string
  description: string
}

export interface HeaderCopy {
  links: NavLink[]
  homeLabel: string
  navLabel: string
  preferencesLabel: string
  languageLabel: string
  themeToDark: string
  themeToLight: string
}

// Rendered as: "{lead} {emphasis}{punctuation}" then "{tail}" on its own muted line.
export interface HeroHeadline {
  lead: string
  emphasis: string
  punctuation: string
  tail: string
}

export interface HeroContent {
  headline: HeroHeadline
  description: string
  actions: CallToAction[]
  facts: string[]
}

export interface HeroVisualCopy {
  label: string
  netVolume: string
  netVolumeNote: string
}

export interface ProductModule {
  index: string
  title: string
  description: string
  icon: IconName
}

export interface ModulesCopy {
  heading: string
  items: ProductModule[]
}
