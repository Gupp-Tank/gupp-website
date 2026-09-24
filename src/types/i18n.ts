import type { AppPreviewData } from './appPreview'
import type { HeaderCopy, HeroContent, HeroVisualCopy, ModulesCopy, SiteMeta } from './content'

// Every locale implements this whole shape, so a string missing in one
// language is a type error instead of a blank on the page.
export interface Dictionary {
  meta: SiteMeta
  header: HeaderCopy
  hero: HeroContent
  heroVisual: HeroVisualCopy
  modules: ModulesCopy
  appPreview: AppPreviewData
}
