import type { Dictionary } from '../../../types/i18n'
import { meta } from './meta'
import { errors, errorFallback } from './errors'
import { header } from './header'
import { hero, heroVisual } from './hero'
import { modules } from './modules'
import { appPreview } from './appPreview'

export const en: Dictionary = { meta, errors, errorFallback, header, hero, heroVisual, modules, appPreview }
