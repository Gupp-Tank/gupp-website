// Mirrors gupp-docs architecture/early-access-api. Values are the API's snake_case, never Dart/TS style names.
export const TANK_TYPES = ['fresh_water', 'planted', 'nano', 'quarantine', 'reef'] as const
export type TankType = (typeof TANK_TYPES)[number]

export interface EarlyAccessRequest {
  email: string
  locale: 'es' | 'en'
  /** Null when the visitor has no tank yet. */
  tankType: TankType | null
  consent: { accepted: true; documentsVersion: string }
}

export interface EarlyAccessResult {
  registered: true
}

export interface UnsubscribeRequest {
  token: string
}

export interface UnsubscribeResult {
  unsubscribed: true
}

export type EarlyAccessFieldError = 'emailRequired' | 'emailInvalid' | 'consentRequired'

export interface EarlyAccessCopy {
  formLabel: string
  emailLabel: string
  emailPlaceholder: string
  tankLabel: string
  tankNone: string
  tankOptions: Record<TankType, string>
  /** Contains {terms} and {privacy}, replaced by links to the legal pages. */
  consentText: string
  termsLink: string
  privacyLink: string
  /** What is collected, why and for how long. */
  dataNotice: string
  /** How to withdraw or delete; contains {email}. */
  withdrawNotice: string
  submit: string
  submitting: string
  successTitle: string
  successText: string
  fieldErrors: Record<EarlyAccessFieldError, string>
}
