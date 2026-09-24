import type { Dictionary } from '../../../types/i18n'

export const errors: Dictionary['errors'] = {
  UNKNOWN: 'Something went wrong. Please try again.',
  NETWORK_ERROR: "We couldn't reach the server. Check your connection and try again.",
  REQUEST_TIMEOUT: 'The request took too long. Please try again.',
  INVALID_RESPONSE: 'We got an unexpected response. Please try again later.',
  SERVER_ERROR: 'Our servers had a problem. Please try again later.',
  RATE_LIMITED: 'Too many attempts. Please wait a moment and try again.',
  VALIDATION_FAILED: 'Some of the information is not valid. Please review it.',
  RENDER_FAILED: 'This page could not be displayed.',
}

export const errorFallback: Dictionary['errorFallback'] = {
  title: 'We hit a problem loading the page',
  actionLabel: 'Reload page',
}
