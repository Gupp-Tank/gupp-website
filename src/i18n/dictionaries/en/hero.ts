import { links } from '../../../content/links'
import type { Dictionary } from '../../../types/i18n'

export const hero: Dictionary['hero'] = {
  headline: {
    lead: 'Fishkeeping has never',
    emphasis: 'been this easy',
    punctuation: '.',
    tail: '',
  },
  description: 'Water, fish and dosing, all in one place.',
  actions: [
    { label: 'See how it works', href: links.modules, variant: 'primary' },
  ],
  facts: ['Free for your first tank', 'iOS & Android', 'English & Español'],
}

export const heroVisual: Dictionary['heroVisual'] = {
  label: 'Gupp Tank app preview: tank health, water parameters and a photo diagnosis',
  netVolume: '112 L net',
  netVolumeNote: 'not the 150 L on the box',
}
