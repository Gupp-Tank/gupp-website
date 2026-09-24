import type { Dictionary } from '../../../types/i18n'

// Screens reproduce the approved app mockups (gupp-docs design/mockups). The
// sample data continues the story of the Home preview: the same "Sala" tank,
// 112 L net, ammonia rising and a tetra purchase being checked.
export const deviceViews: Dictionary['deviceViews'] = {
  home: {
    alt: 'Pantalla de inicio del acuario Sala con los atajos de herramientas, entre ellos Comida y Dosis, salud 87 de 100 y el próximo cambio de agua.',
  },
  tankDetail: {
    alt: 'Detalle del acuario Sala: salud 87 de 100, 14 ejemplares de 5 especies, agrupados en peces, plantas e invertebrados.',
    title: 'Sala',
    subtitle: 'Agua dulce · 112 L',
    score: 87,
    scoreLabel: 'Salud del acuario: 87 de 100',
    summary: 'Agua dulce plantada · 8 meses',
    stats: [
      { label: 'Ejemplares', value: '14' },
      { label: 'Especies', value: '5' },
      { label: 'Última lectura', value: '3 h' },
    ],
    filters: [
      { id: 'all', label: 'Todos', count: 5, active: true },
      { id: 'fish', icon: 'fishBody', count: 3 },
      { id: 'plant', icon: 'leaf', count: 1 },
      { id: 'invertebrate', icon: 'shell', count: 1 },
    ],
    countLine: '5 especies · 14 ejemplares',
    groups: [
      {
        id: 'fish',
        label: 'Peces',
        summary: '3 especies',
        rows: [
          { id: 'tetra', name: 'Tetra neón', quantity: '×2', icon: 'fishBody', tone: 'blue' },
          { id: 'betta', name: 'Betta', quantity: '×1', icon: 'fishBody', tone: 'blue' },
          { id: 'corydora', name: 'Corydora', quantity: '×3', icon: 'fishBody', tone: 'blue' },
        ],
      },
      {
        id: 'plants',
        label: 'Plantas',
        summary: '1 especie',
        rows: [{ id: 'anubia', name: 'Anubia', quantity: '×2', icon: 'leaf', tone: 'green' }],
      },
      {
        id: 'invertebrates',
        label: 'Invertebrados',
        summary: '1 especie',
        rows: [{ id: 'shrimp', name: 'Camarón cereza', quantity: '×6', icon: 'shell', tone: 'amber' }],
      },
    ],
    addLabel: 'Agregar',
    nav: [
      { label: 'Home', icon: 'home' },
      { label: 'Tanques', icon: 'tank', active: true },
      { label: 'Calendario', icon: 'calendar' },
      { label: 'Perfil', icon: 'user' },
    ],
  },
  diagnosisResult: {
    alt: 'Resultado del diagnóstico: posible ich con confianza media (68 %). Causa probable: amoníaco en 0.50 ppm por 3 días. Primer paso: cambio de agua y tratamiento antiparasitario.',
    header: 'Resultado',
    urgency: 'Actuar hoy',
    condition: 'Posible ich',
    context: 'Punto blanco · Tetra neón · Sala',
    confidence: 68,
    confidenceLabel: 'Confianza media',
    evidenceTitle: 'Por qué lo sospechamos',
    evidence: [
      { id: 'photo', icon: 'camera', tone: 'coral', title: 'Puntos blancos en aletas y cuerpo', detail: 'Detectados en la foto' },
      {
        id: 'ammonia',
        icon: 'droplet',
        tone: 'blue',
        title: 'Amoníaco en 0.50 ppm',
        detail: 'Subiendo hace 3 días',
        trend: [0.02, 0.03, 0.02, 0.05, 0.22, 0.38, 0.5],
        trendLabel: 'NH₃ · últimos 7 días',
      },
      { id: 'others', icon: 'fishBody', tone: 'green', title: 'Otros 4 peces sin síntomas', detail: 'Aún a tiempo de contenerlo' },
    ],
    stepsTitle: 'Qué hacer',
    steps: [
      { id: 'water', title: 'Cambio de agua', detail: 'Antes de la primera dosis' },
      { id: 'treatment', title: 'Iniciar tratamiento', detail: '5.6 ml para 112 L netos' },
      { id: 'photo', title: 'Repetir foto en 48 h', detail: 'Opcional', actionLabel: 'Recordar' },
    ],
    primaryLabel: 'Ver plan de tratamiento',
  },
  speciesCheck: {
    alt: 'Chequeo antes de comprar: Neón tetra × 6 es compatible con los habitantes de Sala; 112 L alcanzan para su tamaño adulto.',
    header: 'Neón tetra',
    subtitle: 'Agregar a Sala',
    name: 'Neón tetra',
    scientific: 'Paracheirodon innesi',
    icon: 'fishBody',
    stats: [
      { label: 'Tamaño adulto', value: '4 cm' },
      { label: 'Temperatura', value: '20–26 °C' },
      { label: 'pH', value: '5.0–7.5' },
      { label: 'Temperamento', value: 'Pacífico' },
      { label: 'Dificultad', value: 'Principiante' },
      { label: 'Volumen mínimo', value: '60 L' },
    ],
    verdict: 'Compatible con tus habitantes',
    residentsTitle: 'Con tus habitantes',
    residents: [
      { id: 'betta', name: 'Betta' },
      { id: 'corydora', name: 'Corydora' },
      { id: 'shrimp', name: 'Camarón cereza' },
    ],
    quantityLabel: 'Cantidad',
    quantity: 6,
    ctaLabel: 'Agregar a Sala',
  },
}
