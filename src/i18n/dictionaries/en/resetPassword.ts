import type { Dictionary } from '../../../types/i18n'

export const resetPassword: Dictionary['resetPassword'] = {
  metaTitle: 'Reset password · Gupp Tank',
  metaDescription: 'Create a new password to access your Gupp Tank account.',
  title: 'Reset password',
  subtitle: 'Enter your new password to access your account.',
  newPasswordLabel: 'New password',
  newPasswordPlaceholder: 'At least 8 characters',
  confirmPasswordLabel: 'Confirm password',
  confirmPasswordPlaceholder: 'Repeat your new password',
  submitButton: 'Save password',
  submittingButton: 'Saving...',
  successTitle: 'You’re all set, you can now log in',
  successMessage: 'Your password has been successfully updated. You can now log in with your new credentials.',
  openAppLabel: 'Open Gupp Tank',
  invalidTitle: 'Invalid link',
  invalidMessage: 'This password reset link is invalid or has expired. Please request a new one from the app.',
  homeLabel: 'Back to home',
  requestNewAction: 'Request a new link',
  fieldErrors: {
    passwordRequired: 'Enter a new password.',
    passwordTooShort: 'Password must be at least 8 characters.',
    passwordTooLong: 'Password cannot exceed 72 characters.',
    confirmPasswordRequired: 'Confirm your new password.',
    passwordsDoNotMatch: 'Passwords do not match.',
  },
}
