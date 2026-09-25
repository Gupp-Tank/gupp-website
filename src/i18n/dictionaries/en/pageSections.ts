import type { Dictionary } from '../../../types/i18n'

export const howItWorks: Dictionary['howItWorks'] = {
  heading: 'How it works',
  steps: [
    { id: 'profile', title: 'Set up your tank', description: 'Net volume, equipment and inhabitants: the profile everything else reads from.', icon: 'tank' },
    { id: 'measure', title: 'Measure and photograph', description: 'Log your parameters and upload a photo when something looks off.', icon: 'camera' },
    { id: 'plan', title: 'Get a plan that fits', description: 'A diagnosis that sees your history, and reminders to keep your routine.', icon: 'bell' },
  ],
}

export const plans: Dictionary['plans'] = {
  heading: 'Free and premium',
  caption: 'What each plan includes',
  featureHeader: 'Feature',
  freeHeader: 'Free',
  premiumHeader: 'Premium',
  rows: [
    { id: 'tanks', label: 'Tanks', free: { kind: 'value', text: '1 tank' }, premium: { kind: 'more', text: 'Multiple tanks' } },
    { id: 'profile', label: 'Tank profile and water parameters', free: { kind: 'included', text: 'Included' }, premium: { kind: 'included', text: 'Included' } },
    { id: 'reminders', label: 'Reminders and calendar', free: { kind: 'included', text: 'Included' }, premium: { kind: 'included', text: 'Included' } },
    { id: 'calculators', label: 'Calculators: dosing, CO₂, feeding, volume and acclimation', free: { kind: 'included', text: 'Included' }, premium: { kind: 'included', text: 'Included' } },
    { id: 'achievements', label: 'Achievements', free: { kind: 'included', text: 'Included' }, premium: { kind: 'included', text: 'Included' } },
    { id: 'diagnosis', label: 'Photo diagnosis', free: { kind: 'limited', text: 'Monthly limit' }, premium: { kind: 'more', text: 'More diagnoses' } },
    { id: 'photos', label: 'Photo history', free: { kind: 'limited', text: 'Most recent only' }, premium: { kind: 'more', text: 'Full history' } },
  ],
  note: 'The premium price will be announced later. Limits may change before launch.',
}

export const faq: Dictionary['faq'] = {
  heading: 'Frequently asked questions',
  items: [
    {
      id: 'what',
      question: 'What is Gupp Tank?',
      answer: 'An app to run your aquarium: tank profile, water parameters, photo diagnosis, dosing and species compatibility. Everything reads from the same profile, so the modules talk to each other.',
    },
    {
      id: 'diagnosis',
      question: 'How is the photo diagnosis different?',
      answer: 'Besides the photo, it sees your latest readings, your inhabitants and the age of the tank. So it points to the likely cause, not only the symptom.',
    },
    {
      id: 'tank-types',
      question: 'Does it work for freshwater and marine?',
      answer: 'Yes. The profile supports freshwater, planted, nano, quarantine and reef tanks.',
    },
    {
      id: 'pre-purchase',
      question: 'Can I check if a fish is compatible before buying it?',
      answer: 'Yes. Search for the species and the app checks it against your tank: temperament, adult size, available volume and how mature the cycle is.',
    },
    {
      id: 'not-a-vet',
      question: 'Does the diagnosis replace a specialist?',
      answer: 'No. It is guidance based on your data. If the problem continues or gets worse, see an aquatic vet.',
    },
    {
      id: 'availability',
      question: 'When will it be available?',
      answer: 'We are preparing the app for iOS and Android. There is no date yet; the store icons in the footer signal that it is coming.',
    },
  ],
}

export const cta: Dictionary['cta'] = {
  heading: 'Coming soon to iOS and Android',
  description: 'We are getting the app ready. Meanwhile, see how it works.',
  fallbackLabel: 'See how it works',
}
