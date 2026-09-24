import { links } from '../../../content/links'
import type { Dictionary } from '../../../types/i18n'

export const hero: Dictionary['hero'] = {
  headline: {
    lead: 'El acuarismo nunca fue',
    emphasis: 'tan fácil',
    punctuation: '',
    tail: 'de cuidar.',
  },
  description: 'Agua, peces y dosis, todo en un solo lugar.',
  actions: [
    { label: 'Ver cómo funciona', href: links.modules, variant: 'primary' },
  ],
  facts: ['Gratis para tu primer acuario', 'iOS y Android', 'Español & English'],
}

export const heroVisual: Dictionary['heroVisual'] = {
  label: 'Vista previa de Gupp Tank: salud del acuario, parámetros del agua y un diagnóstico por foto',
  netVolume: '112 L netos',
  netVolumeNote: 'no los 150 L de la caja',
}
