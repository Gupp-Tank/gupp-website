import type { ErrorMessages } from '../errors'
import type { AppPreviewData } from './appPreview'
import type { DeviceViewsData } from './deviceViews'
import type { LegalCopy } from './legal'
import type { CtaCopy, PlansCopy, ErrorFallbackCopy, FaqCopy, HowItWorksCopy, FooterCopy, HeaderCopy, NotFoundCopy, HeroContent, HeroVisualCopy, ModulesCopy, SiteMeta } from './content'

// Every locale implements this whole shape, so a string missing in one
// language is a type error instead of a blank on the page.
export interface Dictionary {
  meta: SiteMeta
  errors: ErrorMessages
  errorFallback: ErrorFallbackCopy
  notFound: NotFoundCopy
  header: HeaderCopy
  footer: FooterCopy
  hero: HeroContent
  heroVisual: HeroVisualCopy
  modules: ModulesCopy
  howItWorks: HowItWorksCopy
  plans: PlansCopy
  faq: FaqCopy
  cta: CtaCopy
  legal: LegalCopy
  appPreview: AppPreviewData
  deviceViews: DeviceViewsData
}
