import type { Dictionary } from '../../../types/i18n'

export const consent: Dictionary['consent'] = {
  banner: {
    label: 'Cookie preferences',
    title: 'Your privacy',
    text: 'We use essential storage to remember your language and theme. Analytics is optional and only turns on if you accept it.',
    accept: 'Accept analytics',
    reject: 'Reject',
    customize: 'Customize',
    policyLink: 'Privacy policy',
  },
  preferences: {
    title: 'Cookie preferences',
    intro: 'Choose which storage you allow. You can change it any time from the footer.',
    close: 'Close',
    essentialTitle: 'Essential',
    essentialText: 'Needed for the site to work and does not track you.',
    essentialItems: ['Your language', 'Your theme, light or dark', 'This same choice'],
    alwaysOn: 'Always on',
    analyticsTitle: 'Analytics',
    analyticsText: 'Measures in aggregate how the site is used so we can improve it. It includes no personal data such as your email.',
    analyticsSwitchLabel: 'Allow analytics',
    save: 'Save preferences',
    acceptAll: 'Accept all',
    rejectAll: 'Reject all',
  },
  footerLabel: 'Cookie preferences',
}
