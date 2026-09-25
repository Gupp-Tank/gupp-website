import type { Dictionary } from '../../../types/i18n'

export const howItWorks: Dictionary['howItWorks'] = {
  heading: 'Cómo funciona',
  steps: [
    { id: 'profile', title: 'Registra tu acuario', description: 'Volumen neto, equipo y habitantes: el perfil del que parte todo lo demás.', icon: 'tank' },
    { id: 'measure', title: 'Mide y fotografía', description: 'Anota tus parámetros y sube una foto cuando algo no se vea bien.', icon: 'camera' },
    { id: 'plan', title: 'Recibe un plan a tu medida', description: 'Un diagnóstico que ve tu historial y recordatorios para no perder el ritmo.', icon: 'bell' },
  ],
}

export const plans: Dictionary['plans'] = {
  heading: 'Gratis y premium',
  caption: 'Qué incluye cada plan',
  featureHeader: 'Función',
  freeHeader: 'Gratis',
  premiumHeader: 'Premium',
  bothGroup: 'En ambos planes',
  premiumGroup: 'Lo que suma Premium',
  rows: [
    { id: 'profile', label: 'Perfil del acuario y parámetros del agua', free: { kind: 'included', text: 'Incluido' }, premium: { kind: 'included', text: 'Incluido' } },
    { id: 'reminders', label: 'Recordatorios inteligentes y calendario', free: { kind: 'included', text: 'Incluido' }, premium: { kind: 'included', text: 'Incluido' } },
    { id: 'calculators', label: 'Calculadoras: dosis, CO₂, alimentación, volumen y aclimatación', free: { kind: 'included', text: 'Incluido' }, premium: { kind: 'included', text: 'Incluido' } },
    { id: 'achievements', label: 'Logros', free: { kind: 'included', text: 'Incluido' }, premium: { kind: 'included', text: 'Incluido' } },
    { id: 'species', label: 'Biblioteca completa de especies y chequeo antes de comprar', free: { kind: 'included', text: 'Incluido' }, premium: { kind: 'included', text: 'Incluido' } },
    { id: 'tanks', label: 'Acuarios', free: { kind: 'value', text: '1 acuario' }, premium: { kind: 'more', text: 'Varios acuarios' } },
    { id: 'diagnosis', label: 'Diagnóstico por foto', free: { kind: 'limited', text: 'Con límite mensual' }, premium: { kind: 'more', text: 'Más diagnósticos' } },
    { id: 'charts', label: 'Gráficas y mediciones del acuario y de tus peces', free: { kind: 'limited', text: 'Básicas' }, premium: { kind: 'more', text: 'Avanzadas, con historial largo' } },
    { id: 'photos', label: 'Historial de fotos', free: { kind: 'limited', text: 'Las más recientes' }, premium: { kind: 'more', text: 'Completo' } },
    { id: 'evolution', label: 'Evolución con fotos: compara un pez o un tratamiento en el tiempo', free: { kind: 'none', text: 'No incluido' }, premium: { kind: 'included', text: 'Incluido' } },
    { id: 'fish-record', label: 'Ficha propia por habitante: nombre, tiempo en el acuario, tamaño, enfermedades y más', free: { kind: 'none', text: 'No incluido' }, premium: { kind: 'included', text: 'Incluido' } },
    { id: 'tank-history', label: 'Historial del acuario: línea de tiempo de altas, bajas y tratamientos', free: { kind: 'none', text: 'No incluido' }, premium: { kind: 'included', text: 'Incluido' } },
    { id: 'extra-tools', label: 'Herramientas extra: salinidad y estimador del ciclo del nitrógeno', free: { kind: 'none', text: 'No incluido' }, premium: { kind: 'included', text: 'Incluido' } },
    { id: 'reports', label: 'Reportes y exportación a PDF o CSV', free: { kind: 'none', text: 'No incluido' }, premium: { kind: 'included', text: 'Incluido' } },
  ],
  note: 'El precio del plan premium se anunciará más adelante. Los límites pueden ajustarse antes del lanzamiento.',
}

export const faq: Dictionary['faq'] = {
  heading: 'Preguntas frecuentes',
  items: [
    {
      id: 'what',
      question: '¿Qué es Gupp Tank?',
      answer: 'Una app para llevar tu acuario: perfil, parámetros del agua, diagnóstico por foto, dosis y compatibilidad de especies. Todo parte del mismo perfil, por eso los módulos se hablan entre sí.',
    },
    {
      id: 'diagnosis',
      question: '¿En qué se diferencia el diagnóstico por foto?',
      answer: 'Además de la foto, ve tus últimas mediciones, los habitantes y la edad del acuario. Así apunta a la causa probable y no solo al síntoma.',
    },
    {
      id: 'tank-types',
      question: '¿Sirve para agua dulce y marino?',
      answer: 'Sí. El perfil admite acuarios de agua dulce, plantados, nano, de cuarentena y de arrecife.',
    },
    {
      id: 'pre-purchase',
      question: '¿Puedo saber si un pez es compatible antes de comprarlo?',
      answer: 'Sí. Buscas la especie y la app la revisa contra tu acuario: temperamento, tamaño adulto, volumen disponible y madurez del ciclo.',
    },
    {
      id: 'not-a-vet',
      question: '¿El diagnóstico reemplaza a un especialista?',
      answer: 'No. Es una orientación basada en tus datos. Si el problema sigue o empeora, consulta a un veterinario acuático.',
    },
    {
      id: 'availability',
      question: '¿Cuándo estará disponible?',
      answer: 'Estamos preparando la app para iOS y Android. Aún no hay fecha; los íconos de las tiendas del pie de página avisan que llegará.',
    },
  ],
}

export const cta: Dictionary['cta'] = {
  heading: 'Próximamente en iOS y Android',
  description: 'Estamos preparando la app. Mientras tanto, mira cómo funciona.',
  fallbackLabel: 'Ver cómo funciona',
  formDescription: 'Déjanos tu correo y te avisamos cuando la app esté disponible.',
}
