import type { Dictionary } from '../../../types/i18n'

export const resetPassword: Dictionary['resetPassword'] = {
  metaTitle: 'Restablecer contraseña · Gupp Tank',
  metaDescription: 'Crea una nueva contraseña para acceder a tu cuenta de Gupp Tank.',
  title: 'Restablecer contraseña',
  subtitle: 'Ingresa tu nueva contraseña para acceder a tu cuenta.',
  newPasswordLabel: 'Nueva contraseña',
  newPasswordPlaceholder: 'Mínimo 8 caracteres',
  confirmPasswordLabel: 'Confirmar contraseña',
  confirmPasswordPlaceholder: 'Repite tu nueva contraseña',
  submitButton: 'Guardar contraseña',
  submittingButton: 'Guardando...',
  successTitle: 'Listo, ya puedes iniciar sesión',
  successMessage: 'Tu contraseña se actualizó correctamente. Ya puedes acceder con tus nuevas credenciales.',
  openAppLabel: 'Abrir Gupp Tank',
  invalidTitle: 'Enlace no válido',
  invalidMessage: 'Este enlace para restablecer tu contraseña no es válido o ya venció. Solicita uno nuevo desde la aplicación.',
  homeLabel: 'Volver al inicio',
  requestNewAction: 'Solicitar nuevo enlace',
  fieldErrors: {
    passwordRequired: 'Ingresa una nueva contraseña.',
    passwordTooShort: 'La contraseña debe tener al menos 8 caracteres.',
    passwordTooLong: 'La contraseña no puede superar los 72 caracteres.',
    confirmPasswordRequired: 'Confirma tu nueva contraseña.',
    passwordsDoNotMatch: 'Las contraseñas no coinciden.',
  },
}
