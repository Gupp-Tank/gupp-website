import type { Dictionary } from '../../../types/i18n'

export const modules: Dictionary['modules'] = {
  heading: 'Un perfil de acuario. Cuatro módulos que hablan entre sí.',
  items: [
    {
      index: '01',
      title: 'Perfil del acuario',
      description: 'Volumen neto real, equipo y cada habitante: el registro del que parte todo lo demás.',
      icon: 'tank',
    },
    {
      index: '02',
      title: 'Agua + diagnóstico',
      description: 'Diagnóstico por foto que ve tus últimas mediciones, no solo la foto.',
      icon: 'camera',
    },
    {
      index: '03',
      title: 'Dosis y alimentación',
      description: 'Dosis calculadas para el agua que realmente tienes, con un historial que evita tratamientos duplicados.',
      icon: 'flask',
    },
    {
      index: '04',
      title: 'Chequeo antes de comprar',
      description: 'Sabe si ese pez encaja en tu acuario antes de pagarlo.',
      icon: 'search',
    },
  ],
}
