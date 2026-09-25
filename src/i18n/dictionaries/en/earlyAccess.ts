import type { Dictionary } from '../../../types/i18n'
import { PRIVACY_EMAIL } from '../../../content/legal'

export const earlyAccess: Dictionary['earlyAccess'] = {
  formLabel: 'Early-access sign-up',
  emailLabel: 'Email',
  emailPlaceholder: 'you@email.com',
  tankLabel: 'Tank type (optional)',
  tankNone: 'I do not have one yet',
  tankOptions: {
    fresh_water: 'Freshwater',
    planted: 'Planted',
    nano: 'Nano',
    quarantine: 'Quarantine',
    reef: 'Reef',
  },
  consentText: 'I accept the {terms} and the {privacy}.',
  termsLink: 'terms and conditions',
  privacyLink: 'privacy policy',
  dataNotice: 'We will use your email only to tell you when the app is available. We delete it 6 months after launch, or sooner if you unsubscribe.',
  withdrawNotice: `To withdraw your consent or delete your data, write to ${PRIVACY_EMAIL} or use the unsubscribe link in each notice.`,
  submit: 'Notify me at launch',
  submitting: 'Sending',
  successTitle: 'Done, we will let you know.',
  successText: 'We saved your email to tell you about the launch. We will not send you anything else.',
  fieldErrors: {
    emailRequired: 'Enter your email.',
    emailInvalid: 'Check the email: it looks incomplete.',
    consentRequired: 'To sign up you need to accept the terms and the privacy policy.',
  },
}
