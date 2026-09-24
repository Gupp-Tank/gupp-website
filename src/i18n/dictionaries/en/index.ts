import type { Dictionary } from '../../../types/i18n'
import { meta } from './meta'
import { notFound } from './notFound'
import { errors, errorFallback } from './errors'
import { header } from './header'
import { footer } from './footer'
import { hero, heroVisual } from './hero'
import { modules } from './modules'
import { appPreview } from './appPreview'
import { deviceViews } from './deviceViews'

export const en: Dictionary = { meta, errors, errorFallback, notFound, header, footer, hero, heroVisual, modules, appPreview, deviceViews }
