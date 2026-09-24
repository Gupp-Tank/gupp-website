import type { Dictionary } from '../../../types/i18n'

export const errors: Dictionary['errors'] = {
  UNKNOWN: 'Algo salió mal. Intenta de nuevo.',
  NETWORK_ERROR: 'No pudimos conectar con el servidor. Revisa tu conexión e intenta de nuevo.',
  REQUEST_TIMEOUT: 'La solicitud tardó demasiado. Intenta de nuevo.',
  INVALID_RESPONSE: 'Recibimos una respuesta inesperada. Intenta más tarde.',
  SERVER_ERROR: 'Nuestros servidores tuvieron un problema. Intenta más tarde.',
  RATE_LIMITED: 'Demasiados intentos. Espera un momento e intenta de nuevo.',
  CONSENT_REQUIRED: 'Para registrarte debes aceptar los términos y la política de privacidad.',
  INVALID_UNSUBSCRIBE_TOKEN: 'Este enlace de baja no es válido o ya venció.',
  VALIDATION_FAILED: 'Alguno de los datos no es válido. Revísalos.',
  RENDER_FAILED: 'No pudimos mostrar esta página.',
}

export const errorFallback: Dictionary['errorFallback'] = {
  title: 'Tuvimos un problema al cargar la página',
  actionLabel: 'Recargar página',
}
