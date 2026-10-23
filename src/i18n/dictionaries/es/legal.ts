import { LEGAL_DOCUMENTS_VERSION } from "../../../content/legal";
import type { Dictionary } from "../../../types/i18n";

export const legal: Dictionary["legal"] = {
  versionLabel: "Versión",
  updatedLabel: "Actualizado el",
  tocLabel: "En esta página",
  contactLabel: "Contacto",
  privacy: {
    title: "Política de privacidad",
    version: LEGAL_DOCUMENTS_VERSION,
    updated: "2026-10-23",
    intro:
      "Esta política explica qué datos tratan el sitio gupp.app y la app Gupp Tank (iOS y Android), para qué y por cuánto tiempo. Cubre el sitio web, la lista de acceso anticipado y la app.",
    sections: [
      {
        id: "responsible",
        heading: "Quién es el responsable",
        paragraphs: [
          "El responsable del tratamiento es Josué Araya Marín, persona física, en Costa Rica. Puedes escribirle a {email} para cualquier tema de privacidad.",
        ],
      },
      {
        id: "data",
        heading: "Qué datos tratamos",
        paragraphs: [
          "Solo tratamos los datos que necesita cada función. En el sitio web y la lista de acceso anticipado:",
        ],
        items: [
          "Registro de acceso anticipado: tu correo, el idioma de la página, el tipo de acuario (si decides indicarlo) y la constancia de que aceptaste estos textos, con fecha y versión. No guardamos tu dirección IP.",
          "Datos técnicos: el sitio se aloja en Vercel, que puede registrar direcciones IP y datos de la solicitud en registros de servidor por seguridad y funcionamiento.",
          "Almacenamiento en tu navegador: guardamos tu idioma, tu tema (claro u oscuro) y tu decisión sobre cookies. Es esencial para el sitio y no te rastrea.",
          "Analítica: solo si la aceptas. Mide cómo se usa el sitio de forma agregada y no incluye datos personales como tu correo.",
        ],
      },
      {
        id: "app-data",
        heading: "Qué trata la app Gupp Tank",
        paragraphs: [
          "Cuando creas una cuenta y usas la app Gupp Tank, tratamos:",
        ],
        items: [
          "Cuenta: tu correo y, si los das, tu nombre y apellido y tu avatar. Si inicias sesión con Google o Apple, recibimos de ellos tu correo y nombre. Si te registras con contraseña, la guardamos solo como un hash irreversible, nunca en texto plano.",
          "Tus acuarios: su nombre, tamaño y tipo, los animales que agregas, tus mediciones de parámetros del agua, los registros de dosificación y alimentación, los recordatorios y tu historial de cuidados y logros.",
          "Fotos de diagnóstico: las fotos que tomas para diagnosticar un pez y la valoración que te da la IA.",
          "Tu dispositivo: tu zona horaria, para programar los recordatorios; el idioma de la app; y el token de notificaciones push (Firebase Cloud Messaging) de cada teléfono donde inicias sesión, con tus preferencias de notificación.",
          "Suscripción: tu plan y su estado, y las compras hechas con Google Play o la App Store, gestionadas con RevenueCat.",
          "Reportes de fallos: cuando la app falla, se envía un reporte técnico a Sentry, sin fotos y sin el contenido de tus acuarios.",
          "La app no usa tu ubicación.",
        ],
      },
      {
        id: "purpose",
        heading: "Para qué lo usamos",
        paragraphs: [
          "Tu correo de la lista de acceso anticipado se usa solo para avisarte cuando la app esté disponible. No lo usamos para nada más, no lo vendemos y no lo compartimos con fines publicitarios.",
          "En la app, tus datos se usan para darte el servicio: tus acuarios, tus mediciones, tus recordatorios y notificaciones, tu plan y el diagnóstico con IA. Cuando pides un diagnóstico, la foto se envía a Google Gemini, que devuelve la valoración. No usamos tus fotos para entrenar ni mejorar ningún modelo de IA, y no las conservamos anonimizadas.",
          "La analítica, si la aceptas, nos ayuda a entender qué partes del sitio se usan para mejorarlas.",
        ],
      },
      {
        id: "basis",
        heading: "Base para tratar tus datos",
        paragraphs: [
          "En el sitio web, tu consentimiento. Lo das al marcar la casilla del formulario y al elegir tus preferencias de cookies, y puedes retirarlo en cualquier momento.",
          "En la app, tratar tus datos es necesario para darte el servicio que pediste al crear una cuenta. Las notificaciones push son opcionales y puedes desactivarlas en la app o en tu teléfono.",
        ],
      },
      {
        id: "retention",
        heading: "Por cuánto tiempo los guardamos",
        paragraphs: [
          "Guardamos tu correo de acceso anticipado hasta 6 meses después del lanzamiento de la app, o antes si te das de baja. La constancia de tu consentimiento se elimina junto con tu registro.",
          "Guardamos los datos de tu cuenta de la app mientras la cuenta exista. Cuando eliminas tu cuenta, todo se borra de inmediato: tu cuenta, tus acuarios y todo lo que contienen, tu historial, tus datos de notificaciones y cada foto de diagnóstico y tu avatar. Nada se conserva anonimizado.",
          "Dos cosas fuera de nuestros servidores no desaparecen al instante: los respaldos de la base de datos se sobrescriben y desaparecen como máximo 7 días después de que eliminas tu cuenta, y el proveedor de correo conserva sus registros de envío, que incluyen la dirección del destinatario, durante 30 días. Las tiendas y RevenueCat conservan los registros de compras según sus propias políticas y las reglas tributarias que les aplican.",
          "Tu decisión sobre cookies se queda en tu navegador hasta que la cambies o borres los datos del sitio.",
        ],
      },
      {
        id: "sharing",
        heading: "Con quién los compartimos",
        paragraphs: [
          "Con proveedores que tratan datos por nuestra cuenta, cada uno para un fin. Sus servidores pueden estar fuera de Costa Rica:",
        ],
        items: [
          "Vercel: aloja el sitio web.",
          "Railway: aloja la API y la base de datos.",
          "Cloudflare R2: guarda las fotos de diagnóstico y los avatares.",
          "Google Gemini: recibe la foto que envías para un diagnóstico, para producir la valoración.",
          "Firebase (Google): entrega las notificaciones push.",
          "RevenueCat, Google Play y la App Store: gestionan suscripciones y compras.",
          "Sentry: recibe los reportes de fallos.",
          "Resend: envía los correos, como el enlace para restablecer tu contraseña.",
          "Si aceptas la analítica, también el proveedor de esa herramienta.",
        ],
      },
      {
        id: "rights",
        heading: "Tus derechos",
        paragraphs: [
          "Puedes pedir acceso a tus datos, que se corrijan o se eliminen, oponerte a su tratamiento y retirar tu consentimiento. Escribe a {email} o usa el enlace de baja que llevará cada aviso: tu registro se elimina.",
          "Puedes eliminar tu cuenta de la app tú mismo, en cualquier momento, desde la app (Perfil → Eliminar mi cuenta), o escribiéndonos si ya no tienes la app. Los pasos están en la página {deleteAccount}.",
          "La ley aplicable es la Ley N.º 8968 de Protección de la Persona frente al Tratamiento de sus Datos Personales de Costa Rica. Si crees que no se respetaron tus derechos, puedes acudir a la Agencia de Protección de Datos de los Habitantes de Costa Rica (Prodhab).",
        ],
      },
      {
        id: "security",
        heading: "Seguridad",
        paragraphs: [
          "El sitio y la API usan conexiones cifradas (HTTPS), las fotos se guardan en almacenamiento privado y el acceso a los datos está restringido a quien lo necesita para operarlos.",
        ],
      },
      {
        id: "minors",
        heading: "Menores de edad",
        paragraphs: [
          "El sitio y la app no están dirigidos a menores de edad. Si crees que un menor se registró, escríbenos y lo eliminamos.",
        ],
      },
      {
        id: "changes",
        heading: "Cambios",
        paragraphs: [
          "Si cambia esta política, publicaremos la nueva versión aquí con su fecha. La versión vigente aparece al inicio de la página.",
        ],
      },
    ],
  },
  terms: {
    title: "Términos y condiciones",
    version: LEGAL_DOCUMENTS_VERSION,
    updated: "2026-09-24",
    intro:
      "Estos términos regulan el uso del sitio gupp.app y del registro de acceso anticipado de Gupp Tank. Al usarlos aceptas lo que sigue.",
    sections: [
      {
        id: "scope",
        heading: "Qué cubren",
        paragraphs: [
          "El sitio presenta información sobre Gupp Tank, una app para gestionar acuarios que aún no está disponible, y permite registrarte para recibir un aviso de lanzamiento. La app tendrá sus propios términos cuando se publique.",
        ],
      },
      {
        id: "early-access",
        heading: "Acceso anticipado",
        paragraphs: [
          "Registrarte no garantiza acceso a la app ni una fecha de lanzamiento. El único efecto del registro es que te avisaremos cuando la app esté disponible.",
          "Puedes darte de baja en cualquier momento con el enlace de cada aviso o escribiendo a {email}.",
        ],
      },
      {
        id: "use",
        heading: "Uso aceptable",
        paragraphs: [
          "Te comprometes a dar datos verdaderos, a no usar el formulario con correos ajenos y a no intentar interferir con el sitio, por ejemplo con envíos automatizados o intentos de acceso no autorizado.",
        ],
      },
      {
        id: "ip",
        heading: "Propiedad intelectual",
        paragraphs: [
          "El nombre Gupp Tank, el logo, los textos, las imágenes y el diseño del sitio pertenecen a su titular y no pueden copiarse ni usarse sin autorización, salvo las excepciones que permita la ley.",
        ],
      },
      {
        id: "information",
        heading: "Información del sitio",
        paragraphs: [
          "El contenido es informativo y describe funciones que están en desarrollo; pueden cambiar antes del lanzamiento. Nada en el sitio es asesoría veterinaria: ante un problema de salud de tus animales, consulta a un especialista.",
        ],
      },
      {
        id: "liability",
        heading: "Responsabilidad",
        paragraphs: [
          "El sitio se ofrece tal como está. En la medida en que la ley lo permita, el titular no responde por daños derivados del uso del sitio o de su falta de disponibilidad.",
        ],
      },
      {
        id: "links",
        heading: "Enlaces a terceros",
        paragraphs: [
          "El sitio enlaza a redes sociales y otros servicios. No controlamos su contenido ni sus políticas de privacidad.",
        ],
      },
      {
        id: "changes",
        heading: "Cambios",
        paragraphs: [
          "Podemos actualizar estos términos. La versión vigente y su fecha aparecen al inicio de la página, y si cambian de forma importante te lo indicaremos antes de que se apliquen a tu registro.",
        ],
      },
      {
        id: "law",
        heading: "Ley aplicable",
        paragraphs: [
          "Estos términos se rigen por las leyes de Costa Rica. Cualquier controversia se someterá a los tribunales competentes de Costa Rica, sin perjuicio de los derechos que la ley te reconozca como consumidor.",
        ],
      },
      {
        id: "contact",
        heading: "Contacto",
        paragraphs: [
          "Para cualquier duda sobre estos términos escribe a {email}.",
        ],
      },
    ],
  },
  deleteAccountLabel: "Eliminar tu cuenta",
  deleteAccount: {
    title: "Elimina tu cuenta de Gupp Tank",
    version: LEGAL_DOCUMENTS_VERSION,
    updated: "2026-10-23",
    intro:
      "Cómo eliminar tu cuenta de Gupp Tank y los datos que contiene, con la app instalada o sin ella.",
    sections: [
      {
        id: "in-app",
        heading: "En la app",
        paragraphs: [
          "Abre Gupp Tank, ve a Perfil y elige Eliminar mi cuenta. Cuando confirmes, la cuenta se elimina de inmediato y la sesión termina.",
        ],
      },
      {
        id: "without-app",
        heading: "Sin la app",
        paragraphs: [
          "Si desinstalaste la app o no puedes iniciar sesión, escribe a {email} desde el correo de la cuenta, con el asunto «Eliminar mi cuenta». Te confirmamos por respuesta y eliminamos la cuenta en un máximo de 30 días.",
        ],
      },
      {
        id: "deleted",
        heading: "Qué se elimina",
        paragraphs: ["Todo, de una vez y sin periodo de espera:"],
        items: [
          "Tu cuenta, con sus datos de inicio de sesión.",
          "Cada acuario y todo lo que contiene: animales, mediciones del agua, registros de dosificación y alimentación, recordatorios y diagnósticos.",
          "Tu historial de cuidados, logros, preferencias y registro de notificaciones, y el token push de cada teléfono.",
          "Cada foto de diagnóstico y tu avatar, borrados del almacenamiento. Las fotos se eliminan, no se conservan anonimizadas, y no se usan para entrenar ningún modelo de IA.",
        ],
      },
      {
        id: "retained",
        heading: "Qué se conserva y por cuánto tiempo",
        paragraphs: [
          "Solo lo que está fuera de nuestros servidores y no se puede quitar de inmediato:",
        ],
        items: [
          "Respaldos de la base de datos: se sobrescriben y desaparecen como máximo 7 días después de eliminar la cuenta.",
          "Los registros de envío del proveedor de correo, que incluyen la dirección a la que se enviaron los correos: 30 días.",
          "Los registros de compras que conservan Google Play, la App Store y RevenueCat, según sus propias políticas y las reglas tributarias que les aplican.",
        ],
      },
      {
        id: "after",
        heading: "Después de eliminar",
        paragraphs: [
          "Eliminar tu cuenta de Gupp Tank no elimina tu cuenta de Google o Apple ni cancela una suscripción: cancélala antes en Google Play o la App Store. Más adelante puedes crear una cuenta nueva con el mismo correo.",
          "Hay más detalle de lo que tratamos en la política de privacidad.",
        ],
      },
    ],
  },
};
