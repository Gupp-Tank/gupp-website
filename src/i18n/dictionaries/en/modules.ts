import type { Dictionary } from '../../../types/i18n'

export const modules: Dictionary['modules'] = {
  heading: 'One tank profile. Four modules that talk to each other.',
  items: [
    {
      slug: 'tank-profile',
      index: '01',
      title: 'Tank profile',
      description: 'Real net volume, equipment and every inhabitant — the record everything else reads from.',
      icon: 'fish',
      view: 'tank-detail',
    },
    {
      slug: 'water-diagnosis',
      index: '02',
      title: 'Water + diagnosis',
      description: 'Photo diagnosis that sees your last readings, not just the photo.',
      icon: 'camera',
      view: 'diagnosis-result',
    },
    {
      slug: 'dosing-feeding',
      index: '03',
      title: 'Dosing & feeding',
      description: 'Doses calculated for the water you actually have, with a history that stops double treatments.',
      icon: 'flask',
      view: 'home',
    },
    {
      slug: 'pre-purchase-check',
      index: '04',
      title: 'Pre-purchase check',
      description: 'Know if that fish fits your tank before you pay for it.',
      icon: 'search',
      view: 'species-check',
    },
  ],
}
