import type { Dictionary } from '../../../types/i18n'
import { PRIVACY_EMAIL } from '../../../content/legal'

export const earlyAccess: Dictionary['earlyAccess'] = {
  formLabel: 'Registro de acceso anticipado',
  emailLabel: 'Correo electrónico',
  emailPlaceholder: 'tu@correo.com',
  tankLabel: 'Tipo de acuario (opcional)',
  tankNone: 'Aún no tengo uno',
  tankOptions: {
    fresh_water: 'Agua dulce',
    planted: 'Plantado',
    nano: 'Nano',
    quarantine: 'Cuarentena',
    reef: 'Arrecife',
  },
  consentText: 'Acepto los {terms} y la {privacy}.',
  termsLink: 'términos y condiciones',
  privacyLink: 'política de privacidad',
  dataNotice: 'Usaremos tu correo solo para avisarte cuando la app esté disponible. Lo borramos 6 meses después del lanzamiento o antes, si te das de baja.',
  withdrawNotice: `Para retirar tu consentimiento o borrar tus datos, escribe a ${PRIVACY_EMAIL} o usa el enlace de baja de cada aviso.`,
  submit: 'Avisarme del lanzamiento',
  submitting: 'Enviando',
  successTitle: 'Listo, te avisaremos.',
  successText: 'Guardamos tu correo para avisarte del lanzamiento. No te enviaremos nada más.',
  fieldErrors: {
    emailRequired: 'Escribe tu correo.',
    emailInvalid: 'Revisa el correo: parece incompleto.',
    consentRequired: 'Para registrarte debes aceptar los términos y la política de privacidad.',
  },
}
