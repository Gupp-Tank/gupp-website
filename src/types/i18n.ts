import type { ErrorMessages } from '../errors'
import type { AppPreviewData } from './appPreview'
import type { ErrorFallbackCopy, HeaderCopy, HeroContent, HeroVisualCopy, ModulesCopy, SiteMeta } from './content'

// Every locale implements this whole shape, so a string missing in one
// language is a type error instead of a blank on the page.
export interface Dictionary {
  meta: SiteMeta
  errors: ErrorMessages
  errorFallback: ErrorFallbackCopy
  header: HeaderCopy
  hero: HeroContent
  heroVisual: HeroVisualCopy
  modules: ModulesCopy
  appPreview: AppPreviewData
}
