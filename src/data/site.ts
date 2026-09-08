/**
 * Configuración global del sitio.
 * Todo dato de contacto, dominio o marca vive aquí: ningún componente
 * debe repetir un teléfono, un correo ni una URL.
 */

export const site = {
  name: "Sonic Publicidad",
  legalName: "Sonic Publicidad",
  tagline: "Speed & Innovation",
  claim: "Activamos marcas en movimiento",
  /** Reemplazar por el dominio definitivo antes de publicar. */
  url: "https://www.sonicpublicidad.com",
  locale: "es-EC",
  country: "EC",
  countryName: "Ecuador",
  description:
    "Publicidad OOH y DOOH en Ecuador: espacios en el Metro de Quito, pantallas en centros comerciales, arcos, ascensores panorámicos, vallas móviles y activaciones de marca a nivel nacional.",
  /** Fecha del material comercial que respalda el contenido del sitio. */
  sourceCatalog: "Catálogo de servicios publicitarios 2026",
  sourceUpdatedAt: "2026-08-01",
} as const;

/**
 * ÚNICO LUGAR DONDE VIVE EL TELÉFONO.
 *
 * Formato internacional, sólo dígitos: código de país + número sin el 0
 * inicial. Ecuador es 593, así que el celular 098 453 4774 se escribe
 * 593984534774. De aquí se derivan el enlace `tel:`, el de WhatsApp y el
 * número que se muestra en pantalla: cambiarlo aquí lo cambia en todo el sitio.
 *
 * Debe ser una línea dada de alta en WhatsApp; si no, wa.me responde que el
 * número no existe.
 */
const PHONE_E164 = "593984534774";

/** 593984534774 → "098 453 4774" (formato nacional ecuatoriano). */
function formatEcuadorPhone(e164: string): string {
  const national = e164.startsWith("593") ? `0${e164.slice(3)}` : e164;
  return national.length === 10
    ? `${national.slice(0, 3)} ${national.slice(3, 6)} ${national.slice(6)}`
    : national;
}

export const contact = {
  advisor: {
    name: "Nicole Núñez Congrains",
    role: "Ventas",
  },
  phoneE164: PHONE_E164,
  phoneDisplay: formatEcuadorPhone(PHONE_E164),
  phoneLink: `tel:+${PHONE_E164}`,
  whatsappBase: `https://wa.me/${PHONE_E164}`,
  email: "ventasonicpublicidad@gmail.com",
  emailLink: "mailto:ventasonicpublicidad@gmail.com",
  /**
   * Datos no confirmados en el material comercial. Se completan
   * y se activan (`enabled: true`) cuando el cliente los valide.
   */
  address: { enabled: false, value: "" },
  hours: { enabled: false, value: "" },
  social: [] as { label: string; href: string }[],
} as const;

/** Genera un enlace de WhatsApp con mensaje precargado. */
export function whatsappLink(message?: string): string {
  if (!message) return contact.whatsappBase;
  return `${contact.whatsappBase}?text=${encodeURIComponent(message)}`;
}

/**
 * Interruptor comercial de precios.
 *
 * Las tarifas del catálogo están cargadas en `src/data/formats.ts`, pero no
 * se publican: el sitio muestra "Consultar disponibilidad" y deriva a
 * cotización. Cambiar a `true` publica los valores tal como están cargados,
 * junto con la nota de IVA y la fecha de actualización.
 */
export const PRICING_PUBLIC = false;

/** Aviso que acompaña a cualquier valor cuando se publiquen las tarifas. */
export const PRICING_NOTICE =
  "Valores referenciales sin IVA, sujetos a disponibilidad del espacio y a confirmación por escrito.";

export const UNVALIDATED = "Contenido pendiente de validación";
export const AVAILABILITY_NOTE = "Disponibilidad sujeta a validación";
