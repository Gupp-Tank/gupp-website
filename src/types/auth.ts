export interface ResetPasswordRequest {
  token: string
  newPassword: string
}

export type ResetPasswordFieldError =
  | 'passwordRequired'
  | 'passwordTooShort'
  | 'passwordTooLong'
  | 'confirmPasswordRequired'
  | 'passwordsDoNotMatch'

export interface ResetPasswordValues {
  newPassword: string
  confirmPassword: string
}

export interface ResetPasswordCopy {
  metaTitle: string
  metaDescription: string
  title: string
  subtitle: string
  trustNote: string
  newPasswordLabel: string
  newPasswordPlaceholder: string
  confirmPasswordLabel: string
  confirmPasswordPlaceholder: string
  submitButton: string
  submittingButton: string
  successTitle: string
  successMessage: string
  openAppLabel: string
  invalidTitle: string
  invalidMessage: string
  homeLabel: string
  requestNewAction: string
  fieldErrors: Record<ResetPasswordFieldError, string>
}
