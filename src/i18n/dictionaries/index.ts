import type { Dictionary } from '../../types/i18n'
import type { Locale } from '../locales'
import { en } from './en'
import { es } from './es'

export const dictionaries: Record<Locale, Dictionary> = { es, en }
