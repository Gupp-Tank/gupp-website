import type { Dictionary } from '../../../types/i18n'

// Mirrors the "MAIN — Home" app mockup (Stitch) so the marketing site and
// the real app never drift apart. Ammonia rising for 3 days is the thread
// the diagnosis card below picks up.
export const appPreview: Dictionary['appPreview'] = {
  tank: {
    name: 'Living room',
    status: 'stable',
    healthScore: 87,
    healthRingLabel: 'Tank health: 87 of 100',
    lastReading: 'Last reading 3 h ago',
    parametersLink: 'View parameters →',
    scoreBadgeLabel: '87',
  },
  parameters: [
    { id: 'temp', label: 'Temp', value: '25.4', unit: '°C', status: 'normal', icon: 'thermometer' },
    { id: 'ph', label: 'pH', value: '7.0', unit: '', status: 'normal', icon: 'droplet' },
    { id: 'nh3', label: 'NH3', value: '0.25', unit: '', status: 'normal', icon: 'droplet' },
  ],
  quickActions: [
    { label: 'Diagnose fish', icon: 'camera', tone: 'coral' },
    { label: 'Log parameters', icon: 'droplet', tone: 'blue' },
  ],
  tools: [
    { label: 'Feeding', icon: 'feeding', tone: 'green' },
    { label: 'Dosing', icon: 'flask', tone: 'teal' },
    { label: 'Compat.', icon: 'checkCircle', tone: 'amber' },
    { label: 'Rewards', icon: 'star', tone: 'purple' },
    { label: 'Shop', icon: 'store', tone: 'slate' },
  ],
  upNext: {
    sectionLabel: 'Up next',
    title: 'Water change',
    when: 'In 2 days · Living room',
    actionLabel: 'Mark done',
  },
  activitySectionLabel: 'Recent activity',
  activityLinkLabel: 'See all',
  activity: [
    { id: 'water-change', title: 'Water change', when: '3 days ago', kind: 'done' },
    { id: 'new-tetras', title: '2 new tetras', when: '1 week ago', kind: 'new' },
  ],
  nav: [
    { label: 'Home', icon: 'home', active: true },
    { label: 'Tanks', icon: 'tank' },
    { label: 'Calendar', icon: 'calendar' },
    { label: 'Profile', icon: 'user' },
  ],
  diagnosis: {
    condition: 'Possible ich',
    timestamp: 'Diagnosis · 2 min ago',
    causeLabel: 'Likely root cause',
    cause: 'Ammonia at 0.50 ppm for 3 days',
    trendLabel: 'NH₃ · last 7 days',
    trend: [0.02, 0.03, 0.02, 0.05, 0.22, 0.38, 0.5],
    recommendation: 'Start treatment today: 5.6 ml for 112 L net. Water change before the first dose.',
    actionLabel: 'View treatment plan',
  },
  compatibility: {
    label: 'Pre-purchase check',
    species: 'Neon tetra × 6',
    verdict: 'Good fit',
    checks: ['Peaceful with your 4 inhabitants', '112 L fits the adult size', 'Cycle mature · day 64'],
  },
}
