import { links } from '../../content/links'
import type { Dictionary } from '../../types/i18n'

export const en: Dictionary = {
  meta: {
    title: 'Gupp Tank — Fishkeeping has never been this easy',
    description: 'Water, fish and dosing, all in one place.',
  },
  header: {
    links: [
      { label: 'How it works', href: links.modules },
      { label: 'GitHub', href: links.github, external: true },
    ],
    homeLabel: 'Gupp Tank home',
    navLabel: 'Primary',
    preferencesLabel: 'Preferences',
    languageLabel: 'Language',
    themeToDark: 'Switch to dark mode',
    themeToLight: 'Switch to light mode',
  },
  hero: {
    headline: {
      lead: 'Fishkeeping has never',
      emphasis: 'been this easy',
      punctuation: '.',
      tail: '',
    },
    description: 'Water, fish and dosing, all in one place.',
    actions: [
      { label: 'Get early access', href: links.earlyAccess, variant: 'primary' },
      { label: 'See how it works', href: links.modules, variant: 'ghost' },
    ],
    facts: ['Free for your first tank', 'iOS & Android', 'English & Español'],
  },
  heroVisual: {
    label: 'Gupp Tank app preview: tank health, water parameters and a photo diagnosis',
    netVolume: '112 L net',
    netVolumeNote: 'not the 150 L on the box',
  },
  modules: {
    heading: 'One tank profile. Four modules that talk to each other.',
    items: [
      {
        index: '01',
        title: 'Tank profile',
        description: 'Real net volume, equipment and every inhabitant — the record everything else reads from.',
        icon: 'tank',
      },
      {
        index: '02',
        title: 'Water + diagnosis',
        description: 'Photo diagnosis that sees your last readings, not just the photo.',
        icon: 'camera',
      },
      {
        index: '03',
        title: 'Dosing & feeding',
        description: 'Doses calculated for the water you actually have, with a history that stops double treatments.',
        icon: 'flask',
      },
      {
        index: '04',
        title: 'Pre-purchase check',
        description: 'Know if that fish fits your tank before you pay for it.',
        icon: 'search',
      },
    ],
  },
  // Mirrors the "MAIN — Home" app mockup (Stitch) so the marketing site and
  // the real app never drift apart. Ammonia rising for 3 days is the thread
  // the diagnosis card below picks up.
  appPreview: {
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
  },
}
