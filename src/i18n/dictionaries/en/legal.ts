import { LEGAL_DOCUMENTS_VERSION } from '../../../content/legal'
import type { Dictionary } from '../../../types/i18n'

export const legal: Dictionary['legal'] = {
  versionLabel: 'Version',
  updatedLabel: 'Updated on',
  tocLabel: 'On this page',
  contactLabel: 'Contact',
  privacy: {
    title: 'Privacy policy',
    version: LEGAL_DOCUMENTS_VERSION,
    updated: '2026-09-24',
    intro:
      'This policy explains what data the gupp.app website handles, why and for how long. It covers the website and the early-access list; the mobile app will have its own notice when it is published.',
    sections: [
      {
        id: 'responsible',
        heading: 'Who is responsible',
        paragraphs: ['The data controller is Josué Araya Marín, an individual, in Costa Rica. You can write to {email} about anything privacy related.'],
      },
      {
        id: 'data',
        heading: 'What data we handle',
        paragraphs: ['We only handle the data each feature of the site needs:'],
        items: [
          'Early-access sign-up: your email, the language of the page, your tank type (if you choose to give it) and a record that you accepted these texts, with date and version. We do not store your IP address.',
          'Technical data: the site is hosted on Vercel, which may log IP addresses and request data in server logs for security and operation.',
          'Storage in your browser: we save your language, your theme (light or dark) and your cookie choice. It is essential to the site and does not track you.',
          'Analytics: only if you accept it. It measures how the site is used in aggregate and does not include personal data such as your email.',
        ],
      },
      {
        id: 'purpose',
        heading: 'What we use it for',
        paragraphs: [
          'Your email is used only to tell you when the app is available. We do not use it for anything else, we do not sell it and we do not share it for advertising.',
          'Analytics, if you accept it, helps us understand which parts of the site are used so we can improve them.',
        ],
      },
      {
        id: 'basis',
        heading: 'Basis for handling your data',
        paragraphs: ['Your consent. You give it by ticking the checkbox on the form and by choosing your cookie preferences, and you can withdraw it at any time.'],
      },
      {
        id: 'retention',
        heading: 'How long we keep it',
        paragraphs: [
          'We keep your email until 6 months after the app launches, or sooner if you unsubscribe. The record of your consent is deleted together with your sign-up.',
          'Your cookie choice stays in your browser until you change it or clear the site data.',
        ],
      },
      {
        id: 'sharing',
        heading: 'Who we share it with',
        paragraphs: [
          'With providers that host the site and the database and handle data on our behalf. Their servers may be outside Costa Rica. If you accept analytics, also with the provider of that tool. We share your data with no one else, unless a competent authority requires it.',
        ],
      },
      {
        id: 'rights',
        heading: 'Your rights',
        paragraphs: [
          'You can ask for access to your data, to have it corrected or deleted, object to its handling and withdraw your consent. Write to {email} or use the unsubscribe link each notice will carry: your record is deleted.',
          'The applicable law is Costa Rica’s Law No. 8968 on the Protection of Individuals regarding the Processing of their Personal Data. If you believe your rights were not respected, you can go to the Data Protection Agency of Costa Rica (Prodhab).',
        ],
      },
      {
        id: 'security',
        heading: 'Security',
        paragraphs: ['The site and the API use encrypted connections (HTTPS) and access to the data is limited to whoever needs it to run them.'],
      },
      {
        id: 'minors',
        heading: 'Minors',
        paragraphs: ['The site is not aimed at minors. If you believe a minor signed up, write to us and we will delete it.'],
      },
      {
        id: 'changes',
        heading: 'Changes',
        paragraphs: ['If this policy changes, we will publish the new version here with its date. The current version is shown at the top of the page.'],
      },
    ],
  },
  terms: {
    title: 'Terms and conditions',
    version: LEGAL_DOCUMENTS_VERSION,
    updated: '2026-09-24',
    intro: 'These terms govern the use of the gupp.app website and the Gupp Tank early-access sign-up. By using them you accept what follows.',
    sections: [
      {
        id: 'scope',
        heading: 'What they cover',
        paragraphs: ['The site presents information about Gupp Tank, an aquarium management app that is not yet available, and lets you sign up for a launch notice. The app will have its own terms when it is published.'],
      },
      {
        id: 'early-access',
        heading: 'Early access',
        paragraphs: [
          'Signing up does not guarantee access to the app or a launch date. The only effect of signing up is that we will tell you when the app is available.',
          'You can unsubscribe at any time with the link in each notice or by writing to {email}.',
        ],
      },
      {
        id: 'use',
        heading: 'Acceptable use',
        paragraphs: ['You agree to give truthful data, not to use the form with other people’s emails and not to try to interfere with the site, for example with automated submissions or unauthorized access attempts.'],
      },
      {
        id: 'ip',
        heading: 'Intellectual property',
        paragraphs: ['The Gupp Tank name, the logo, the texts, the images and the design of the site belong to their owner and may not be copied or used without permission, except where the law allows.'],
      },
      {
        id: 'information',
        heading: 'Site information',
        paragraphs: [
          'The content is informational and describes features under development; they may change before launch. Nothing on the site is veterinary advice: if your animals have a health problem, see a specialist.',
        ],
      },
      {
        id: 'liability',
        heading: 'Liability',
        paragraphs: ['The site is provided as is. To the extent the law allows, the owner is not liable for damages arising from the use of the site or its unavailability.'],
      },
      {
        id: 'links',
        heading: 'Third-party links',
        paragraphs: ['The site links to social networks and other services. We do not control their content or their privacy policies.'],
      },
      {
        id: 'changes',
        heading: 'Changes',
        paragraphs: ['We may update these terms. The current version and its date are shown at the top of the page, and if they change materially we will tell you before they apply to your sign-up.'],
      },
      {
        id: 'law',
        heading: 'Governing law',
        paragraphs: ['These terms are governed by the laws of Costa Rica. Any dispute will be submitted to the competent courts of Costa Rica, without prejudice to the rights the law grants you as a consumer.'],
      },
      {
        id: 'contact',
        heading: 'Contact',
        paragraphs: ['For any question about these terms write to {email}.'],
      },
    ],
  },
}
