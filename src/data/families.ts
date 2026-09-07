import type { ServiceFamily } from "./types";

/**
 * Las cinco familias agrupan el catálogo 2026 en bloques comprensibles.
 * Los nombres de cada formato se conservan tal como aparecen en el material
 * comercial (ver `formats.ts`).
 */
export const families: ServiceFamily[] = [
  {
    id: "transporte",
    slug: "transporte-y-movilidad",
    name: "Transporte y movilidad",
    headline: "El Metro de Quito, de punta a punta",
    summary:
      "Monitores digitales, branding de vagones y espacios publicitarios dentro del sistema del Metro de Quito, donde el pasajero tiene tiempo y atención disponibles.",
    bullets: [
      "540 monitores digitales en una flota de 15 trenes",
      "Arcos y branding en escaleras eléctricas de cinco estaciones",
      "Branding exterior de vagones con aprobación municipal",
    ],
    hero: "metro-estacion",
    icon: "TrainFront",
  },
  {
    id: "dooh",
    slug: "dooh-y-pantallas",
    name: "DOOH y pantallas",
    headline: "Circuitos digitales en centros comerciales",
    summary:
      "Pantallas LED y circuitos digitales en patios de comida, ingresos y zonas de eventos, con spots de 20 a 30 segundos y rotación diaria garantizada por contrato.",
    bullets: [
      "Circuitos de 2 a 5 pantallas por centro comercial",
      "De 1.200 a 2.400 spots diarios según el circuito",
      "Especificaciones de archivo distintas por pantalla",
    ],
    hero: "pantalla-laguna-eventos",
    icon: "MonitorPlay",
  },
  {
    id: "branding-espacios",
    slug: "branding-de-espacios",
    name: "Branding de espacios",
    headline: "Arquitectura convertida en soporte de marca",
    summary:
      "Arcos de ingreso, ascensores panorámicos, paredes y columnas: superficies de gran formato que un comprador no puede esquivar dentro del centro comercial.",
    bullets: [
      "Arcos en nueve centros comerciales del país",
      "Ascensores panorámicos de hasta 17,85 metros de alto",
      "Producción, instalación y desinstalación coordinadas",
    ],
    hero: "arcos-hero",
    icon: "Frame",
  },
  {
    id: "activaciones",
    slug: "activaciones-de-marca",
    name: "Activaciones de marca",
    headline: "Presencia con personal en la calle",
    summary:
      "Bicibanners, mochilas publicitarias, pasacalles, zanqueros y promotores: formatos móviles con equipo capacitado y supervisión en sitio.",
    bullets: [
      "Más de 36 bicibanners activables a nivel nacional",
      "24 mochilas tipo banner en simultáneo en todo el país",
      "Vallas móviles con perifoneo en Quito y Guayaquil",
    ],
    hero: "activaciones-hero",
    icon: "Megaphone",
  },
  {
    id: "integrales",
    slug: "soluciones-integrales",
    name: "Soluciones integrales",
    headline: "De la idea al reporte fotográfico",
    summary:
      "Producción de stands, artículos promocionales y la coordinación completa de la campaña: permisos, instalación, supervisión y desinstalación.",
    bullets: [
      "Producción de stands y material promocional",
      "Coordinación con aliados estratégicos a nivel nacional",
      "Reporte fotográfico de la ejecución",
    ],
    hero: "stand-sherwin-williams",
    icon: "Layers",
  },
];

export const familyById = Object.fromEntries(
  families.map((f) => [f.id, f]),
) as Record<ServiceFamily["id"], ServiceFamily>;
