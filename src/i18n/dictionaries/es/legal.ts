import { LEGAL_DOCUMENTS_VERSION } from '../../../content/legal'
import type { Dictionary } from '../../../types/i18n'

export const legal: Dictionary['legal'] = {
  versionLabel: 'Versión',
  updatedLabel: 'Actualizado el',
  tocLabel: 'En esta página',
  contactLabel: 'Contacto',
  privacy: {
    title: 'Política de privacidad',
    version: LEGAL_DOCUMENTS_VERSION,
    updated: '2026-09-24',
    intro:
      'Esta política explica qué datos trata el sitio gupp.app, para qué y por cuánto tiempo. Cubre el sitio web y la lista de acceso anticipado; la app móvil tendrá su propio aviso cuando se publique.',
    sections: [
      {
        id: 'responsible',
        heading: 'Quién es el responsable',
        paragraphs: [
          'El responsable del tratamiento es Josué Araya Marín, persona física, en Costa Rica. Puedes escribirle a {email} para cualquier tema de privacidad.',
        ],
      },
      {
        id: 'data',
        heading: 'Qué datos tratamos',
        paragraphs: ['Solo tratamos los datos que necesita cada función del sitio:'],
        items: [
          'Registro de acceso anticipado: tu correo, el idioma de la página, el tipo de acuario (si decides indicarlo) y la constancia de que aceptaste estos textos, con fecha y versión. No guardamos tu dirección IP.',
          'Datos técnicos: el sitio se aloja en Vercel, que puede registrar direcciones IP y datos de la solicitud en registros de servidor por seguridad y funcionamiento.',
          'Almacenamiento en tu navegador: guardamos tu idioma, tu tema (claro u oscuro) y tu decisión sobre cookies. Es esencial para el sitio y no te rastrea.',
          'Analítica: solo si la aceptas. Mide el uso del sitio de forma agregada y no incluye datos personales como tu correo.',
        ],
      },
      {
        id: 'purpose',
        heading: 'Para qué los usamos',
        paragraphs: [
          'Tu correo se usa únicamente para avisarte cuando la app esté disponible. No lo usamos para otros fines, no lo vendemos y no lo cedemos para publicidad.',
          'La analítica, si la aceptas, sirve para entender qué partes del sitio se usan y mejorarlas.',
        ],
      },
      {
        id: 'basis',
        heading: 'Base para tratar tus datos',
        paragraphs: ['Tu consentimiento. Lo das al marcar la casilla del formulario y al elegir tus preferencias de cookies, y puedes retirarlo cuando quieras.'],
      },
      {
        id: 'retention',
        heading: 'Cuánto tiempo los conservamos',
        paragraphs: [
          'Conservamos tu correo hasta 6 meses después del lanzamiento de la app, o antes si te das de baja. La constancia de tu consentimiento se elimina junto con tu registro.',
          'Tu elección de cookies se guarda en tu navegador hasta que la cambies o borres los datos del sitio.',
        ],
      },
      {
        id: 'sharing',
        heading: 'Con quién los compartimos',
        paragraphs: [
          'Con proveedores que alojan el sitio y la base de datos y tratan los datos por encargo nuestro. Sus servidores pueden estar fuera de Costa Rica. Si aceptas la analítica, también con el proveedor de esa herramienta. No compartimos tus datos con nadie más, salvo que una autoridad competente lo exija.',
        ],
      },
      {
        id: 'rights',
        heading: 'Tus derechos',
        paragraphs: [
          'Puedes pedir acceso a tus datos, su rectificación o supresión, oponerte a su tratamiento y retirar tu consentimiento. Escribe a {email} o usa el enlace de baja que llevará cada aviso: tu registro se borra.',
          'La normativa aplicable es la Ley N.º 8968 de Protección de la Persona frente al Tratamiento de sus Datos Personales de Costa Rica. Si consideras que tus derechos no fueron atendidos, puedes acudir a la Agencia de Protección de Datos de los Habitantes (Prodhab).',
        ],
      },
      {
        id: 'security',
        heading: 'Seguridad',
        paragraphs: ['El sitio y la API usan conexiones cifradas (HTTPS) y el acceso a los datos está restringido a quien lo necesita para operarlos.'],
      },
      {
        id: 'minors',
        heading: 'Menores de edad',
        paragraphs: ['El sitio no está dirigido a menores de edad. Si crees que un menor se registró, escríbenos y lo eliminamos.'],
      },
      {
        id: 'changes',
        heading: 'Cambios',
        paragraphs: ['Si cambia esta política, publicaremos la nueva versión aquí con su fecha. La versión vigente aparece al inicio de la página.'],
      },
    ],
  },
  terms: {
    title: 'Términos y condiciones',
    version: LEGAL_DOCUMENTS_VERSION,
    updated: '2026-09-24',
    intro: 'Estos términos regulan el uso del sitio gupp.app y del registro de acceso anticipado de Gupp Tank. Al usarlos aceptas lo que sigue.',
    sections: [
      {
        id: 'scope',
        heading: 'Qué cubren',
        paragraphs: ['El sitio presenta información sobre Gupp Tank, una app para gestionar acuarios que aún no está disponible, y permite registrarte para recibir un aviso de lanzamiento. La app tendrá sus propios términos cuando se publique.'],
      },
      {
        id: 'early-access',
        heading: 'Acceso anticipado',
        paragraphs: [
          'Registrarte no garantiza acceso a la app ni una fecha de lanzamiento. El único efecto del registro es que te avisaremos cuando la app esté disponible.',
          'Puedes darte de baja en cualquier momento con el enlace de cada aviso o escribiendo a {email}.',
        ],
      },
      {
        id: 'use',
        heading: 'Uso aceptable',
        paragraphs: ['Te comprometes a dar datos verdaderos, a no usar el formulario con correos ajenos y a no intentar interferir con el sitio, por ejemplo con envíos automatizados o intentos de acceso no autorizado.'],
      },
      {
        id: 'ip',
        heading: 'Propiedad intelectual',
        paragraphs: ['El nombre Gupp Tank, el logo, los textos, las imágenes y el diseño del sitio pertenecen a su titular y no pueden copiarse ni usarse sin autorización, salvo las excepciones que permita la ley.'],
      },
      {
        id: 'information',
        heading: 'Información del sitio',
        paragraphs: [
          'El contenido es informativo y describe funciones que están en desarrollo; pueden cambiar antes del lanzamiento. Nada en el sitio es asesoría veterinaria: ante un problema de salud de tus animales, consulta a un especialista.',
        ],
      },
      {
        id: 'liability',
        heading: 'Responsabilidad',
        paragraphs: ['El sitio se ofrece tal como está. En la medida en que la ley lo permita, el titular no responde por daños derivados del uso del sitio o de su falta de disponibilidad.'],
      },
      {
        id: 'links',
        heading: 'Enlaces a terceros',
        paragraphs: ['El sitio enlaza a redes sociales y otros servicios. No controlamos su contenido ni sus políticas de privacidad.'],
      },
      {
        id: 'changes',
        heading: 'Cambios',
        paragraphs: ['Podemos actualizar estos términos. La versión vigente y su fecha aparecen al inicio de la página, y si cambian de forma importante te lo indicaremos antes de que se apliquen a tu registro.'],
      },
      {
        id: 'law',
        heading: 'Ley aplicable',
        paragraphs: ['Estos términos se rigen por las leyes de Costa Rica. Cualquier controversia se someterá a los tribunales competentes de Costa Rica, sin perjuicio de los derechos que la ley te reconozca como consumidor.'],
      },
      {
        id: 'contact',
        heading: 'Contacto',
        paragraphs: ['Para cualquier duda sobre estos términos escribe a {email}.'],
      },
    ],
  },
}
