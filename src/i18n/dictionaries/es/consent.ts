import type { Dictionary } from '../../../types/i18n'

export const consent: Dictionary['consent'] = {
  banner: {
    label: 'Preferencias de cookies',
    title: 'Tu privacidad',
    text: 'Usamos almacenamiento esencial para recordar tu idioma y tu tema. La analítica es opcional y solo se activa si la aceptas.',
    accept: 'Aceptar analítica',
    reject: 'Rechazar',
    customize: 'Personalizar',
    policyLink: 'Política de privacidad',
  },
  preferences: {
    title: 'Preferencias de cookies',
    intro: 'Elige qué almacenamiento permites. Puedes cambiarlo cuando quieras desde el pie de página.',
    close: 'Cerrar',
    essentialTitle: 'Esencial',
    essentialText: 'Necesario para que el sitio funcione y no te rastrea.',
    essentialItems: ['Tu idioma', 'Tu tema, claro u oscuro', 'Esta misma elección'],
    alwaysOn: 'Siempre activo',
    analyticsTitle: 'Analítica',
    analyticsText: 'Mide de forma agregada cómo se usa el sitio para mejorarlo. No incluye datos personales como tu correo.',
    analyticsSwitchLabel: 'Permitir analítica',
    save: 'Guardar preferencias',
    acceptAll: 'Aceptar todo',
    rejectAll: 'Rechazar todo',
  },
  footerLabel: 'Preferencias de cookies',
}
