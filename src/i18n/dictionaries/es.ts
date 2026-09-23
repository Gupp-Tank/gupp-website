import { links } from '../../content/links'
import type { Dictionary } from '../../types/i18n'

export const es: Dictionary = {
  meta: {
    title: 'Gupp Tank — El acuarismo nunca fue tan fácil de cuidar',
    description: 'Agua, peces y dosis, todo en un solo lugar.',
  },
  header: {
    links: [
      { label: 'Cómo funciona', href: links.modules },
      { label: 'GitHub', href: links.github, external: true },
    ],
    homeLabel: 'Gupp Tank, inicio',
    navLabel: 'Principal',
    preferencesLabel: 'Preferencias',
    languageLabel: 'Idioma',
    themeToDark: 'Cambiar a modo oscuro',
    themeToLight: 'Cambiar a modo claro',
  },
  hero: {
    headline: {
      lead: 'El acuarismo nunca fue',
      emphasis: 'tan fácil',
      punctuation: '',
      tail: 'de cuidar.',
    },
    description: 'Agua, peces y dosis, todo en un solo lugar.',
    actions: [
      { label: 'Acceso anticipado', href: links.earlyAccess, variant: 'primary' },
      { label: 'Ver cómo funciona', href: links.modules, variant: 'ghost' },
    ],
    facts: ['Gratis para tu primer acuario', 'iOS y Android', 'Español & English'],
  },
  heroVisual: {
    label: 'Vista previa de Gupp Tank: salud del acuario, parámetros del agua y un diagnóstico por foto',
    netVolume: '112 L netos',
    netVolumeNote: 'no los 150 L de la caja',
  },
  modules: {
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
  },
  // Mirrors the "MAIN — Home" app mockup (Stitch) so the marketing site and
  // the real app never drift apart. Ammonia rising for 3 days is the thread
  // the diagnosis card below picks up.
  appPreview: {
    tank: {
      name: 'Sala',
      status: 'estable',
      healthScore: 87,
      healthRingLabel: 'Salud del acuario: 87 de 100',
      lastReading: 'Última lectura hace 3 h',
      parametersLink: 'Ver parámetros →',
      scoreBadgeLabel: '87',
    },
    parameters: [
      { id: 'temp', label: 'Temp', value: '25.4', unit: '°C', status: 'normal', icon: 'thermometer' },
      { id: 'ph', label: 'pH', value: '7.0', unit: '', status: 'normal', icon: 'droplet' },
      { id: 'nh3', label: 'NH3', value: '0.25', unit: '', status: 'normal', icon: 'droplet' },
    ],
    quickActions: [
      { label: 'Diagnosticar pez', icon: 'camera', tone: 'coral' },
      { label: 'Registrar parámetros', icon: 'droplet', tone: 'blue' },
    ],
    tools: [
      { label: 'Comida', icon: 'feeding', tone: 'green' },
      { label: 'Dosis', icon: 'flask', tone: 'teal' },
      { label: 'Compatib.', icon: 'checkCircle', tone: 'amber' },
      { label: 'Logros', icon: 'star', tone: 'purple' },
      { label: 'Tienda', icon: 'store', tone: 'slate' },
    ],
    upNext: {
      sectionLabel: 'Próximo',
      title: 'Cambio de agua',
      when: 'En 2 días · Sala',
      actionLabel: 'Marcar',
    },
    activitySectionLabel: 'Actividad reciente',
    activityLinkLabel: 'Ver todo',
    activity: [
      { id: 'water-change', title: 'Cambio de agua', when: 'Hace 3 días', kind: 'done' },
      { id: 'new-tetras', title: '2 tetras nuevas', when: 'Hace 1 semana', kind: 'new' },
    ],
    nav: [
      { label: 'Home', icon: 'home', active: true },
      { label: 'Tanques', icon: 'tank' },
      { label: 'Calendario', icon: 'calendar' },
      { label: 'Perfil', icon: 'user' },
    ],
    diagnosis: {
      condition: 'Posible ich',
      timestamp: 'Diagnóstico · hace 2 min',
      causeLabel: 'Causa raíz probable',
      cause: 'Amoníaco en 0.50 ppm por 3 días',
      trendLabel: 'NH₃ · últimos 7 días',
      trend: [0.02, 0.03, 0.02, 0.05, 0.22, 0.38, 0.5],
      recommendation: 'Inicia el tratamiento hoy: 5.6 ml para 112 L netos. Cambio de agua antes de la primera dosis.',
      actionLabel: 'Ver plan de tratamiento',
    },
    compatibility: {
      label: 'Chequeo antes de comprar',
      species: 'Neón tetra × 6',
      verdict: 'Compatible',
      checks: ['Pacífico con tus 4 habitantes', '112 L alcanzan para su tamaño adulto', 'Ciclo maduro · día 64'],
    },
  },
}
