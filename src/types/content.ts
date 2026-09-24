import type { IconName } from './icon'

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

export interface ErrorFallbackCopy {
  title: string
  actionLabel: string
}

export interface NotFoundCopy {
  title: string
  message: string
  homeLabel: string
}

export interface LegalLink {
  label: string
  /** Path without the language prefix, e.g. '/privacy'. */
  path: string
}

export interface FooterCopy {
  navLabel: string
  /** Heading of the fun-fact card, e.g. "Did you know?". */
  funFactLabel: string
  funFactAction: string
  /** Verifiable, evergreen facts; one is shown per day and visitors can page through. */
  funFacts: string[]
  legalLabel: string
  tagline: string
  /** Shown after "© {year} ". */
  copyright: string
  /** Empty until the legal pages exist; the group is not rendered without links. */
  legalLinks: LegalLink[]
}

export interface HeaderCopy {
  links: NavLink[]
  homeLabel: string
  navLabel: string
  menuOpen: string
  menuClose: string
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
