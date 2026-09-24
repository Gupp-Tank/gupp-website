import type { Dictionary } from '../../../types/i18n'
import { meta } from './meta'
import { notFound } from './notFound'
import { errors, errorFallback } from './errors'
import { header } from './header'
import { hero, heroVisual } from './hero'
import { modules } from './modules'
import { appPreview } from './appPreview'

export const es: Dictionary = { meta, errors, errorFallback, notFound, header, hero, heroVisual, modules, appPreview }
