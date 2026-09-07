import type { AdFormat } from "./types";

/**
 * CATÁLOGO DE FORMATOS — Sonic Publicidad, catálogo de servicios 2026.
 *
 * Todo el contenido de este archivo proviene del material comercial oficial.
 * Los valores de `pricing` NO se publican mientras `PRICING_PUBLIC` sea false
 * en `site.ts`: la interfaz muestra "Consultar disponibilidad" y deriva a
 * cotización. Están cargados aquí para que activarlos sea un solo cambio.
 */

const CAT = "2026-08-01";

const IVA_NOTE = "Los valores no incluyen IVA.";
const AGENCY_NOTE = "Los valores incluyen comisión de agencia.";
const PHOTO_REPORT = "Entrega de reporte fotográfico.";
const MALL_AVAILABILITY =
  "Espacios sujetos a disposición: se debe confirmar disponibilidad con el centro comercial.";

export const formats: AdFormat[] = [
  /* ==========================================================
     FAMILIA 1 · TRANSPORTE Y MOVILIDAD — METRO DE QUITO
     ========================================================== */
  {
    slug: "monitores-digitales-en-trenes",
    name: "Monitores digitales en trenes",
    family: "transporte",
    summary:
      "540 monitores a bordo de los 15 trenes del Metro de Quito, con 17 horas y media de encendido diario.",
    description:
      "El circuito digital más extenso del sistema: cada pasajero viaja frente a una pantalla durante todo su trayecto. El spot se emite en rotación continua durante la jornada de operación, sobre una flota completa de quince trenes.",
    recommendedUse:
      "Campañas de alcance masivo en Quito y recordación de marca con frecuencia alta.",
    location: "A bordo de la flota del Metro de Quito",
    kinds: ["digital"],
    environments: ["transporte", "interiores"],
    goals: ["alcance", "alto-trafico", "lanzamiento"],
    specs: [
      { label: "Monitores", value: "540 monitores" },
      { label: "Flota", value: "15 trenes" },
      { label: "Encendido diario", value: "17:30 horas" },
      { label: "Duración del spot", value: "18 segundos" },
      { label: "Resolución", value: "1920 × 1080 px" },
      { label: "Formato del arte", value: "1 diseño gráfico — imagen inanimada, sin audio" },
    ],
    includes: ["Emisión en los 540 monitores", "Reporte fotográfico de la ejecución"],
    conditions: [IVA_NOTE, AGENCY_NOTE, PHOTO_REPORT],
    pricing: {
      rental: [
        { period: "mensual", amount: 11500 },
        { period: "trimestral", amount: 28500 },
        { period: "semestral", amount: 53600 },
      ],
      includesIva: false,
      notes: [IVA_NOTE, AGENCY_NOTE],
      updatedAt: CAT,
    },
    availability: "confirmar",
    hero: "metro-monitores-digitales",
    gallery: ["metro-monitores-digitales", "metro-estacion", "metro-branding-monitores"],
  },
  {
    slug: "branding-posterior-de-monitores",
    name: "Branding posterior de monitores",
    family: "transporte",
    summary:
      "180 superficies impresas en el reverso de los monitores, a la altura de los ojos del pasajero de pie.",
    description:
      "Un soporte estático permanente dentro del vagón: el respaldo de cada monitor se convierte en un espacio de marca de 0,61 × 0,53 metros, visible durante todo el trayecto sin competir con el circuito digital.",
    recommendedUse:
      "Presencia sostenida de marca dentro del vagón, en campañas de larga duración.",
    location: "Interior de los vagones del Metro de Quito",
    kinds: ["estatico"],
    environments: ["transporte", "interiores"],
    goals: ["alcance", "alto-trafico"],
    specs: [
      { label: "Monitores intervenidos", value: "180 monitores" },
      { label: "Flota", value: "15 trenes" },
      { label: "Medidas", value: "0,61 m × 0,53 m" },
    ],
    includes: ["Instalación en los 180 monitores", "Reporte fotográfico de la ejecución"],
    excludes: ["Producción de los 180 monitores (se cotiza aparte)"],
    conditions: [IVA_NOTE, AGENCY_NOTE, PHOTO_REPORT],
    pricing: {
      rental: [
        { period: "mensual", amount: 8500 },
        { period: "trimestral", amount: 21700 },
        { period: "semestral", amount: 40000 },
        { period: "anual", amount: 62000 },
      ],
      production: { amount: 2700, note: "Producción de 180 monitores" },
      includesIva: false,
      notes: [IVA_NOTE, AGENCY_NOTE],
      updatedAt: CAT,
    },
    availability: "contratado",
    availabilityNote: "Actualmente contratado hasta diciembre de 2026.",
    hero: "metro-branding-monitores",
    gallery: ["metro-branding-monitores", "metro-monitores-digitales"],
  },
  {
    slug: "arcos-en-escaleras-electricas-metro",
    name: "Arcos en escaleras eléctricas",
    family: "transporte",
    summary:
      "Arcos de ingreso en las escaleras eléctricas de cinco estaciones del Metro de Quito.",
    description:
      "Estructuras que enmarcan la escalera eléctrica y ordenan el flujo de pasajeros: la marca ocupa el punto donde todo el andén converge. Cada estación tiene medidas propias, con dos caras horizontales y cuatro laterales.",
    recommendedUse:
      "Impacto en zonas de alto tránsito peatonal dentro del sistema del Metro.",
    location: "Estaciones del Metro de Quito",
    kinds: ["estatico", "especial"],
    environments: ["transporte", "interiores"],
    goals: ["alto-trafico", "lanzamiento"],
    specs: [
      { label: "Estaciones disponibles", value: "5 estaciones" },
      { label: "Caras por arco", value: "2 caras horizontales + 4 caras laterales" },
    ],
    inventory: [
      {
        venue: "Labrador",
        specs: [
          { label: "Caras horizontales", value: "7,80 × 0,60 m (2 caras)" },
          { label: "Caras laterales", value: "0,60 × 2,20 m (4 caras)" },
        ],
      },
      {
        venue: "Universidad Central",
        specs: [
          { label: "Caras horizontales", value: "4,20 × 0,60 m (2 caras)" },
          { label: "Caras laterales", value: "0,60 × 2,20 m (4 caras)" },
        ],
      },
      {
        venue: "Plaza San Francisco",
        specs: [
          { label: "Caras horizontales", value: "8,15 × 0,60 m (2 caras)" },
          { label: "Caras laterales", value: "0,80 × 2,20 m (4 caras)" },
        ],
      },
      {
        venue: "El Recreo",
        specs: [
          { label: "Caras horizontales", value: "8,15 × 0,60 m (2 caras)" },
          { label: "Caras laterales", value: "0,80 × 2,20 m (4 caras)" },
        ],
      },
      {
        venue: "Quitumbe",
        specs: [
          { label: "Caras horizontales", value: "4,70 × 0,60 m (2 caras)" },
          { label: "Caras laterales", value: "0,60 × 2,20 m (4 caras)" },
        ],
      },
    ],
    includes: ["Instalación y desinstalación de los elementos"],
    excludes: ["Troqueles (no incluidos en la producción)"],
    conditions: [
      "Espacios sujetos a disposición según la fecha requerida por el cliente.",
      IVA_NOTE,
    ],
    pricing: {
      rental: [
        { period: "mensual", amount: 4900 },
        { period: "trimestral", amount: 13500 },
      ],
      production: { amount: 3500, note: "No incluye troqueles" },
      includesIva: false,
      notes: ["Los valores de alquiler incluyen instalación y desinstalación."],
      updatedAt: CAT,
    },
    availability: "confirmar",
    hero: "metro-arco-escaleras",
    gallery: ["metro-arco-escaleras", "metro-branding-escaleras", "metro-escaleras-detalle"],
  },
  {
    slug: "branding-de-escaleras-electricas",
    name: "Branding de escaleras eléctricas",
    family: "transporte",
    summary:
      "Intervención de los laterales de la escalera eléctrica a lo largo de todo su recorrido.",
    description:
      "El pasajero avanza durante segundos junto a la gráfica, a distancia de lectura. La superficie se adapta a las acotaciones de la gradas eléctricas de cada estación.",
    recommendedUse: "Mensajes con más texto o secuencias narrativas dentro de la estación.",
    location: "Estaciones del Metro de Quito",
    kinds: ["estatico"],
    environments: ["transporte", "interiores"],
    goals: ["alto-trafico"],
    specs: [{ label: "Superficie", value: "Laterales de la escalera, según acotaciones de cada estación" }],
    includes: ["Instalación y desinstalación de los elementos"],
    conditions: [
      "Espacios sujetos a disposición según la fecha requerida por el cliente.",
      IVA_NOTE,
    ],
    pricing: {
      rental: [
        { period: "mensual", amount: 4900 },
        { period: "trimestral", amount: 13500 },
      ],
      production: { amount: 2800 },
      includesIva: false,
      updatedAt: CAT,
    },
    availability: "confirmar",
    hero: "metro-branding-escaleras",
    gallery: ["metro-branding-escaleras", "metro-escaleras-detalle", "metro-arco-escaleras"],
  },
  {
    slug: "branding-de-paredes-y-columnas",
    name: "Branding de paredes y columnas",
    family: "transporte",
    summary:
      "Dos paredes de 3 × 1,85 m y dos columnas dentro de las estaciones del Metro de Quito.",
    description:
      "Superficies amplias en el área de circulación de la estación, para gráficas de una sola idea y lectura a distancia media.",
    recommendedUse: "Campañas de imagen y lanzamientos con una pieza gráfica dominante.",
    location: "Estaciones del Metro de Quito",
    kinds: ["estatico"],
    environments: ["transporte", "interiores"],
    goals: ["alcance", "alto-trafico"],
    specs: [
      { label: "Paredes", value: "2 paredes de 3 × 1,85 m" },
      { label: "Columnas", value: "2 columnas" },
    ],
    includes: ["Alquiler del espacio"],
    excludes: ["Producción"],
    conditions: [IVA_NOTE],
    pricing: {
      rental: [
        { period: "mensual", amount: 4900 },
        { period: "trimestral", amount: 13500 },
      ],
      includesIva: false,
      notes: ["No incluye producción."],
      updatedAt: CAT,
    },
    availability: "confirmar",
    hero: "metro-branding-pared",
    gallery: ["metro-branding-pared", "metro-branding-columna"],
  },
  {
    slug: "exhibiciones-especiales-metro",
    name: "Exhibiciones especiales",
    family: "transporte",
    summary:
      "Montajes tridimensionales de producto dentro de las estaciones del Metro de Quito.",
    description:
      "Estructuras a escala y piezas de exhibición que convierten el andén en un punto de contacto físico con el producto, con producción a medida de la campaña.",
    recommendedUse: "Lanzamientos de producto y campañas de temporada con pieza destacada.",
    location: "Estaciones del Metro de Quito",
    kinds: ["experiencial", "especial"],
    environments: ["transporte", "interiores"],
    goals: ["lanzamiento", "activar-marca"],
    specs: [{ label: "Montaje", value: "Producción especial a medida de la campaña" }],
    includes: ["Alquiler del espacio"],
    excludes: ["Producción"],
    conditions: [IVA_NOTE],
    pricing: {
      rental: [
        { period: "mensual", amount: 4900 },
        { period: "trimestral", amount: 13500 },
      ],
      includesIva: false,
      notes: ["No incluye producción."],
      updatedAt: CAT,
    },
    availability: "confirmar",
    hero: "metro-exhibicion-magnum",
    gallery: ["metro-exhibicion-magnum", "metro-exhibicion-especial"],
  },
  {
    slug: "branding-exterior-de-vagones",
    name: "Branding exterior de vagones",
    family: "transporte",
    summary:
      "Intervención del exterior de un tren de seis vagones con vinilo removible.",
    description:
      "El formato de mayor presencia del sistema: el tren completo circula por la ciudad convertido en soporte de marca. El branding es restringido, con espacios publicitarios medidos sobre laterales, ventanas y vidrios inferiores de puertas.",
    recommendedUse:
      "Campañas insignia, patrocinios y lanzamientos que necesitan un hito visible en la ciudad.",
    location: "Exterior de los trenes del Metro de Quito",
    kinds: ["especial", "movil"],
    environments: ["transporte", "exterior"],
    goals: ["alcance", "lanzamiento"],
    specs: [
      { label: "Alcance del branding", value: "Tren de seis vagones" },
      { label: "Espacios determinados", value: "Laterales, ventanas y vidrios inferiores de puertas" },
      { label: "Material", value: "Adhesivo publicitario en vinilo removible o reposicionable" },
      { label: "Tipo de intervención", value: "Branding restringido, con espacios publicitarios medidos" },
    ],
    includes: ["Instalación sobre el tren asignado"],
    conditions: [
      "El arte debe pasar por una aprobación previa por parte del Municipio de Quito.",
      IVA_NOTE,
    ],
    pricing: {
      rental: [
        { period: "mensual", amount: 14500, label: "1 mes" },
        { period: "trimestral", amount: 35000, label: "3 meses" },
        { period: "semestral", amount: 65000, label: "6 meses" },
        { period: "unico", amount: 93000, label: "9 meses" },
        { period: "anual", amount: 106000, label: "12 meses" },
      ],
      production: { amount: 5000 },
      includesIva: false,
      notes: ["Producción de $5.000 en cualquier plazo contratado.", IVA_NOTE],
      updatedAt: CAT,
    },
    availability: "confirmar",
    hero: "metro-branding-tren",
    gallery: ["metro-branding-tren", "metro-estacion"],
  },

  /* ==========================================================
     FAMILIA 2 · DOOH Y PANTALLAS
     ========================================================== */
  {
    slug: "pantallas-centros-comerciales-grupo-dk",
    name: "Pantallas en centros comerciales — Grupo DK",
    family: "dooh",
    summary:
      "Ocho centros comerciales de la cadena DK con 1.300 spots mensuales por pantalla.",
    description:
      "Circuito digital con presencia en la red de centros comerciales del Grupo DK. Cada sede tiene su propia resolución de pantalla, así que el arte se entrega adaptado por ubicación; la pauta se contrata por quincena o por mes.",
    recommendedUse:
      "Cobertura simultánea de varios centros comerciales con una misma campaña.",
    location: "Red de centros comerciales del Grupo DK",
    kinds: ["digital"],
    environments: ["centros-comerciales", "interiores"],
    goals: ["centros-comerciales", "alto-trafico", "sectores"],
    specs: [
      { label: "Sedes", value: "8 centros comerciales" },
      { label: "Spots mensuales", value: "1.300 spots por sede" },
      { label: "Segundaje", value: "Hasta 20 segundos" },
      { label: "Formato de archivo", value: ".mp4 — resolución específica por sede" },
    ],
    inventory: [
      {
        venue: "Quicentro Norte",
        specs: [
          { label: "Medidas", value: "1905 × 480 px" },
          { label: "Spots mensuales", value: "1.300 spots" },
        ],
        pricing: {
          rental: [
            { period: "quincenal", amount: 1500 },
            { period: "mensual", amount: 2800 },
          ],
          includesIva: false,
          updatedAt: CAT,
        },
      },
      {
        venue: "San Luis Shopping",
        specs: [
          { label: "Medidas", value: "1026 × 641 px" },
          { label: "Spots mensuales", value: "1.300 spots" },
        ],
        pricing: {
          rental: [
            { period: "quincenal", amount: 1500 },
            { period: "mensual", amount: 2800 },
          ],
          includesIva: false,
          updatedAt: CAT,
        },
      },
      {
        venue: "San Marino Shopping",
        specs: [
          { label: "Medidas", value: "2051 × 769 px" },
          { label: "Spots mensuales", value: "1.300 spots" },
        ],
        pricing: {
          rental: [
            { period: "quincenal", amount: 1500 },
            { period: "mensual", amount: 2800 },
          ],
          includesIva: false,
          updatedAt: CAT,
        },
      },
      {
        venue: "Quicentro Sur",
        specs: [
          { label: "Medidas", value: "1016 × 380 px" },
          { label: "Spots mensuales", value: "1.300 spots" },
        ],
        pricing: {
          rental: [
            { period: "quincenal", amount: 1100 },
            { period: "mensual", amount: 1900 },
          ],
          includesIva: false,
          updatedAt: CAT,
        },
      },
      {
        venue: "El Portal Shopping",
        specs: [
          { label: "Medidas", value: "666 × 334 px y 1666 × 666 px" },
          { label: "Spots mensuales", value: "1.300 spots" },
        ],
        pricing: {
          rental: [
            { period: "quincenal", amount: 1100 },
            { period: "mensual", amount: 1900 },
          ],
          includesIva: false,
          updatedAt: CAT,
        },
      },
      {
        venue: "Mall del Pacífico",
        specs: [
          { label: "Medidas", value: "1920 × 1080 px" },
          { label: "Spots mensuales", value: "1.300 spots" },
        ],
        pricing: {
          rental: [
            { period: "quincenal", amount: 1100 },
            { period: "mensual", amount: 1900 },
          ],
          includesIva: false,
          updatedAt: CAT,
        },
      },
      {
        venue: "Bombolí Shopping",
        specs: [
          { label: "Patio de comidas", value: "1920 × 1080 px" },
          { label: "Pantalla cubo", value: "3840 × 1215 px" },
          { label: "Spots mensuales", value: "1.300 spots" },
        ],
        pricing: {
          rental: [
            { period: "quincenal", amount: 1100 },
            { period: "mensual", amount: 1900 },
          ],
          includesIva: false,
          updatedAt: CAT,
        },
      },
      {
        venue: "Maltería Plaza",
        specs: [
          { label: "Medidas", value: "512 × 288 px" },
          { label: "Spots mensuales", value: "1.300 spots" },
        ],
        pricing: {
          rental: [
            { period: "quincenal", amount: 950 },
            { period: "mensual", amount: 1500 },
          ],
          includesIva: false,
          updatedAt: CAT,
        },
      },
    ],
    includes: ["Programación y emisión de los spots contratados"],
    conditions: [
      "DK Management aprueba los artes.",
      "El arte no incluye información de compras en línea ni delivery.",
      "El video se refiere exclusivamente a su marca y no incluye información ni imágenes de otros establecimientos ubicados en centros comerciales fuera de la cadena DK.",
      IVA_NOTE,
    ],
    availability: "confirmar",
    hero: "pantalla-dk-circuito",
    gallery: ["pantalla-dk-circuito", "pantalla-dk-mall", "cc-portal-exterior"],
  },
  {
    slug: "pantallas-mall-el-jardin",
    name: "Pantallas en el Mall El Jardín",
    family: "dooh",
    summary:
      "Dos circuitos LED —ingresos y zona comercial— con 1.200 spots diarios cada uno.",
    description:
      "El circuito A cubre los ingresos peatonal y vehicular; el circuito B suma la plaza bancaria y las zonas de marcas ancla. Se contratan por separado o en conjunto para cubrir el recorrido completo del visitante.",
    recommendedUse:
      "Campañas de tráfico a tienda dentro del centro comercial y promociones de temporada.",
    location: "Mall El Jardín",
    kinds: ["digital"],
    environments: ["centros-comerciales", "interiores"],
    goals: ["centros-comerciales", "alto-trafico"],
    specs: [
      { label: "Circuitos", value: "2 circuitos independientes" },
      { label: "Pantallas", value: "3 pantallas (circuito A) · 4 pantallas (circuito B)" },
      { label: "Spots diarios", value: "1.200 spots por circuito" },
    ],
    inventory: [
      {
        venue: "Circuito A — 3 pantallas",
        specs: [
          { label: "LED Curve 1", value: "Ingreso peatonal Av. Amazonas — 400 × 1000 px" },
          { label: "LED ingreso vehicular", value: "Av. Amazonas — 1404 × 416 px" },
          { label: "LED Pje. Potosí", value: "Ingreso peatonal y vehicular — 1248 × 624 px" },
          { label: "Spots diarios", value: "1.200 spots" },
        ],
        pricing: {
          rental: [{ period: "mensual", amount: 1500 }],
          includesIva: false,
          updatedAt: CAT,
        },
      },
      {
        venue: "Circuito B — 4 pantallas",
        specs: [
          { label: "LED panorámica", value: "Plaza Bancaria — 1152 × 768 px" },
          { label: "Zona Juan Valdez", value: "256 × 640 px" },
          { label: "Zona Mientras del Fuego", value: "256 × 640 px" },
          { label: "Zona Burger King", value: "256 × 640 px" },
          { label: "Spots diarios", value: "1.200 spots" },
        ],
        pricing: {
          rental: [{ period: "mensual", amount: 1500 }],
          includesIva: false,
          updatedAt: CAT,
        },
      },
    ],
    includes: ["Programación y emisión de los spots contratados"],
    conditions: [IVA_NOTE],
    availability: "confirmar",
    hero: "pantalla-jardin-panoramica",
    gallery: ["pantalla-jardin-panoramica", "pantalla-jardin-led", "pantalla-jardin-curve"],
  },
  {
    slug: "pantallas-patio-de-comidas-el-bosque",
    name: "Pantallas patio de comidas — C.C. El Bosque",
    family: "dooh",
    summary: "Dos pantallas Full HD con 2.400 spots diarios en el patio de comidas.",
    description:
      "El patio de comidas concentra permanencia: el visitante se sienta y mira. Dos pantallas de 1920 × 1080 px emiten spots de hasta 30 segundos con la frecuencia más alta del portafolio.",
    recommendedUse: "Campañas de alimentos, bebidas y promociones con llamado inmediato.",
    location: "C.C. El Bosque — patio de comidas",
    kinds: ["digital"],
    environments: ["centros-comerciales", "interiores"],
    goals: ["centros-comerciales", "alto-trafico"],
    specs: [
      { label: "Cantidad", value: "2 pantallas" },
      { label: "Medidas", value: "1920 × 1080 px" },
      { label: "Segundaje", value: "30 segundos · .mp4" },
      { label: "Spots diarios", value: "2.400 spots" },
    ],
    includes: ["Programación y emisión de los spots contratados"],
    conditions: [IVA_NOTE],
    pricing: {
      rental: [{ period: "mensual", amount: 1650 }],
      includesIva: false,
      updatedAt: CAT,
    },
    availability: "confirmar",
    hero: "pantalla-bosque-patio",
    gallery: ["pantalla-bosque-patio", "pantalla-bosque-led"],
  },
  {
    slug: "pantallas-patio-de-comidas-mall-de-los-andes",
    name: "Pantallas patio de comidas — C.C. Mall de los Andes",
    family: "dooh",
    summary: "Dos pantallas con 2.400 spots diarios sobre el patio de comidas.",
    description:
      "Pantallas suspendidas sobre el área de mesas, en el ángulo natural de visión del visitante mientras come.",
    recommendedUse: "Promociones de consumo inmediato y campañas de temporada.",
    location: "C.C. Mall de los Andes — patio de comidas",
    kinds: ["digital"],
    environments: ["centros-comerciales", "interiores"],
    goals: ["centros-comerciales", "alto-trafico"],
    specs: [
      { label: "Cantidad", value: "2 pantallas" },
      { label: "Medidas", value: "960 × 480 px" },
      { label: "Segundaje", value: "30 segundos · .mp4" },
      { label: "Spots diarios", value: "2.400 spots" },
    ],
    includes: ["Programación y emisión de los spots contratados"],
    conditions: [IVA_NOTE],
    pricing: {
      rental: [{ period: "mensual", amount: 1480 }],
      includesIva: false,
      updatedAt: CAT,
    },
    availability: "confirmar",
    hero: "pantalla-andes",
    gallery: ["pantalla-andes"],
  },
  {
    slug: "pantallas-laguna-mall",
    name: "Pantallas patio de comida y zona de eventos — C.C. Laguna Mall",
    family: "dooh",
    summary: "Cinco pantallas Full HD entre patio de comidas y zona de eventos.",
    description:
      "El circuito más amplio por número de pantallas: cubre tanto el área de mesas como el escenario de eventos, donde se concentran las activaciones del centro comercial.",
    recommendedUse:
      "Campañas que combinan pauta digital con una activación presencial en el mismo espacio.",
    location: "C.C. Laguna Mall — patio de comidas y zona de eventos",
    kinds: ["digital"],
    environments: ["centros-comerciales", "interiores"],
    goals: ["centros-comerciales", "activar-marca"],
    specs: [
      { label: "Cantidad", value: "5 pantallas" },
      { label: "Medidas", value: "1920 × 1080 px" },
      { label: "Segundaje", value: "30 segundos · .mp4" },
      { label: "Spots diarios", value: "2.400 spots" },
    ],
    includes: ["Programación y emisión de los spots contratados"],
    conditions: [IVA_NOTE],
    pricing: {
      rental: [{ period: "mensual", amount: 1250 }],
      includesIva: false,
      updatedAt: CAT,
    },
    availability: "confirmar",
    hero: "pantalla-laguna-eventos",
    gallery: ["pantalla-laguna-eventos", "pantalla-laguna-patio"],
  },

  /* ==========================================================
     FAMILIA 3 · BRANDING DE ESPACIOS
     ========================================================== */
  {
    slug: "ascensores-panoramicos",
    name: "Ascensores panorámicos",
    family: "branding-espacios",
    summary:
      "Ocho ascensores panorámicos intervenidos con lona, de hasta 17,85 metros de altura.",
    description:
      "La pieza vertical de mayor escala del portafolio. El ascensor panorámico es visible desde todos los pisos del centro comercial y desde el hall principal: una sola gráfica domina el volumen completo del edificio.",
    recommendedUse:
      "Campañas de imagen de marca con presencia dominante dentro del centro comercial.",
    location: "Centros comerciales a nivel nacional",
    kinds: ["estatico", "especial"],
    environments: ["centros-comerciales", "interiores"],
    goals: ["centros-comerciales", "alcance", "lanzamiento"],
    specs: [
      { label: "Sedes disponibles", value: "8 centros comerciales" },
      { label: "Altura máxima", value: "17,85 m" },
      { label: "Material", value: "Lona · lona mesh según la sede" },
    ],
    inventory: [
      {
        venue: "Portal Shopping",
        specs: [
          { label: "Medidas", value: "3,60 × 17,85 m" },
          { label: "Material", value: "Lona" },
        ],
        pricing: {
          rental: [{ period: "mensual", amount: 6800 }],
          production: { amount: 3700, note: "Producción de lona" },
          includesIva: false,
          updatedAt: CAT,
        },
      },
      {
        venue: "Quicentro Sur",
        specs: [
          { label: "Medidas", value: "3,60 × 15 m" },
          { label: "Material", value: "Lona" },
        ],
        pricing: {
          rental: [{ period: "mensual", amount: 6800 }],
          production: { amount: 3500, note: "Producción de lona" },
          includesIva: false,
          updatedAt: CAT,
        },
      },
      {
        venue: "El Recreo",
        specs: [
          { label: "Medidas", value: "3,60 × 11,5 m" },
          { label: "Material", value: "Lona" },
        ],
        pricing: {
          rental: [{ period: "mensual", amount: 5500 }],
          production: { amount: 2800, note: "Producción de lona" },
          includesIva: false,
          updatedAt: CAT,
        },
      },
      {
        venue: "El Bosque",
        specs: [
          { label: "Medidas", value: "3,30 × 13,35 m" },
          { label: "Material", value: "Lona" },
        ],
        pricing: {
          rental: [{ period: "mensual", amount: 5500 }],
          production: { amount: 2800, note: "Producción de lona" },
          includesIva: false,
          updatedAt: CAT,
        },
      },
      {
        venue: "Quicentro",
        specs: [
          { label: "Medidas", value: "6 × 13 m" },
          { label: "Material", value: "Lona" },
        ],
        pricing: {
          rental: [{ period: "mensual", amount: 8750 }],
          production: { amount: 3500, note: "Producción de lona" },
          includesIva: false,
          updatedAt: CAT,
        },
      },
      {
        venue: "City Mall",
        specs: [
          { label: "Medidas", value: "1,85 × 11,40 m" },
          { label: "Material", value: "Lona mesh" },
        ],
        pricing: {
          rental: [{ period: "mensual", amount: 5500 }],
          production: { amount: 2500, note: "Producción de lona mesh" },
          includesIva: false,
          updatedAt: CAT,
        },
      },
      {
        venue: "Mall del Sur",
        specs: [
          { label: "Medidas", value: "2,91 × 11,40 m" },
          { label: "Material", value: "Lona mesh" },
        ],
        pricing: {
          rental: [{ period: "mensual", amount: 5500 }],
          production: { amount: 2600, note: "Producción de lona mesh" },
          includesIva: false,
          updatedAt: CAT,
        },
      },
      {
        venue: "Mall del Norte",
        specs: [
          { label: "Medidas", value: "2,91 × 11,40 m" },
          { label: "Material", value: "Lona mesh" },
        ],
        pricing: {
          rental: [{ period: "mensual", amount: 5400 }],
          production: { amount: 2600, note: "Producción de lona mesh" },
          includesIva: false,
          updatedAt: CAT,
        },
      },
    ],
    includes: ["Instalación y desinstalación de la lona"],
    conditions: [MALL_AVAILABILITY, IVA_NOTE],
    availability: "confirmar",
    hero: "ascensor-portal",
    gallery: ["ascensor-portal", "ascensor-recreo", "ascensor-quicentro", "ascensor-mallsur"],
  },
  {
    slug: "arcos-en-centros-comerciales",
    name: "Arcos en centros comerciales",
    family: "branding-espacios",
    summary:
      "Nueve arcos de ingreso y escaleras eléctricas, con opción de producción especial troquelada.",
    description:
      "El arco enmarca el punto por el que pasa todo visitante: ingreso principal, escalera eléctrica o acceso a la tienda ancla. Algunas sedes permiten producción especial con volumen y troquel; otras restringen el troquel por normativa del centro comercial.",
    recommendedUse:
      "Lanzamientos y campañas de temporada que necesitan un hito físico imposible de ignorar.",
    location: "Centros comerciales a nivel nacional",
    kinds: ["estatico", "especial"],
    environments: ["centros-comerciales", "interiores"],
    goals: ["centros-comerciales", "lanzamiento", "alto-trafico"],
    specs: [
      { label: "Sedes disponibles", value: "9 centros comerciales" },
      { label: "Unidad", value: "1 arco por sede" },
    ],
    inventory: [
      {
        venue: "El Bosque",
        specs: [{ label: "Medidas", value: "8,45 × 1,52 m / 1 × 4,7 m / 1 × 3,18 m" }],
        note: "Espacio con iluminación: se puede realizar producción especial.",
        pricing: {
          rental: [{ period: "mensual", amount: 4500 }],
          production: { amount: 3000 },
          includesIva: false,
          updatedAt: CAT,
        },
      },
      {
        venue: "San Luis Shopping",
        specs: [{ label: "Medidas", value: "4,20 × 0,60 m / 0,60 × 2,20 m" }],
        note: "No se permiten troqueles.",
        pricing: {
          rental: [{ period: "mensual", amount: 5300 }],
          production: { amount: 2400 },
          includesIva: false,
          updatedAt: CAT,
        },
      },
      {
        venue: "CCI",
        specs: [{ label: "Medidas", value: "4,20 × 0,60 m / 0,60 × 2,20 m" }],
        pricing: {
          rental: [{ period: "mensual", amount: 5500 }],
          production: { amount: 2400 },
          includesIva: false,
          updatedAt: CAT,
        },
      },
      {
        venue: "Portal Shopping",
        specs: [{ label: "Medidas", value: "3 × 0,60 m / 0,60 × 2,20 m" }],
        pricing: {
          rental: [{ period: "mensual", amount: 4200 }],
          production: { amount: 1600 },
          includesIva: false,
          updatedAt: CAT,
        },
      },
      {
        venue: "Quicentro Sur",
        specs: [{ label: "Medidas", value: "3 × 0,60 m / 0,60 × 2,20 m" }],
        pricing: {
          rental: [{ period: "mensual", amount: 4200 }],
          production: { amount: 1600 },
          includesIva: false,
          updatedAt: CAT,
        },
      },
      {
        venue: "El Recreo",
        specs: [{ label: "Medidas", value: "4,60 × 3,00 × 0,60 m" }],
        note: MALL_AVAILABILITY,
        pricing: {
          rental: [{ period: "mensual", amount: 4000 }],
          production: { amount: 5600 },
          includesIva: false,
          updatedAt: CAT,
        },
      },
      {
        venue: "Mall del Sol",
        specs: [{ label: "Medidas", value: "4,20 × 0,60 m / 0,60 × 2,20 m" }],
        note: MALL_AVAILABILITY,
        pricing: {
          rental: [{ period: "mensual", amount: 6600 }],
          production: { amount: 2400 },
          includesIva: false,
          updatedAt: CAT,
        },
      },
      {
        venue: "Mall del Sol — ingreso Pileta / Supermaxi",
        specs: [{ label: "Medidas", value: "4,60 × 3,70 × 0,60 m" }],
        note: MALL_AVAILABILITY,
        pricing: {
          rental: [{ period: "mensual", amount: 7500 }],
          production: { amount: 5500 },
          includesIva: false,
          updatedAt: CAT,
        },
      },
      {
        venue: "City Mall",
        specs: [{ label: "Medidas", value: "4,20 × 0,60 m / 0,60 × 2,20 m" }],
        note: MALL_AVAILABILITY,
        pricing: {
          rental: [{ period: "mensual", amount: 5300 }],
          production: { amount: 2400 },
          includesIva: false,
          updatedAt: CAT,
        },
      },
    ],
    includes: ["Producción del arco según la sede", "Instalación y desinstalación"],
    conditions: [MALL_AVAILABILITY, IVA_NOTE],
    availability: "confirmar",
    hero: "arco-recreo",
    gallery: [
      "arco-recreo",
      "arco-bosque-noche",
      "arco-sanluis",
      "arco-cci",
      "arco-portal",
      "arco-quicentro-sur",
      "arco-mall-del-sol",
      "arco-mall-del-sol-pileta",
      "arco-city-mall",
    ],
  },

  /* ==========================================================
     FAMILIA 4 · ACTIVACIONES DE MARCA
     ========================================================== */
  {
    slug: "espacios-para-activaciones-en-centros-comerciales",
    name: "Espacios para activaciones en centros comerciales",
    family: "activaciones",
    summary:
      "Islas de activación de 2 × 2 m a 5 × 5 m en patios de comida, halls e ingresos a Supermaxi.",
    description:
      "Metros cuadrados en el recorrido del comprador para montar el stand, la degustación o la dinámica de marca. Cada sede tiene medidas y altura máxima definidas, y el costo varía según el tiempo de exposición.",
    recommendedUse:
      "Sampling, demostración de producto y captación de datos en punto de alto tránsito.",
    location: "Centros comerciales a nivel nacional",
    kinds: ["experiencial"],
    environments: ["centros-comerciales", "interiores"],
    goals: ["activar-marca", "centros-comerciales", "lanzamiento"],
    specs: [
      { label: "Altura máxima", value: "1,80 m en todas las sedes" },
      { label: "Superficie", value: "Desde 2 × 2 m hasta 5 × 5 m según la sede" },
    ],
    inventory: [
      {
        venue: "Mall del Sol",
        specs: [
          { label: "Espacio mayor", value: "5 × 5 m — altura máxima 1,80 m" },
          { label: "Segundo espacio", value: "4 × 3 m — altura máxima 1,80 m" },
          { label: "Patio de comida", value: "Hasta 3 × 2 m — altura máxima 1,80 m" },
        ],
      },
      {
        venue: "San Marino Shopping",
        specs: [
          { label: "Ubicación", value: "Hall ascensor central" },
          { label: "Medidas", value: "2 × 2 m — altura máxima 1,80 m" },
        ],
      },
      {
        venue: "Quicentro Norte",
        specs: [
          { label: "Patio de comidas", value: "3 × 3 m — altura máxima 1,80 m" },
          { label: "Ascensor sector De Prati", value: "4 × 2 m — altura máxima 1,80 m" },
        ],
      },
      {
        venue: "C.C. El Jardín",
        specs: [
          { label: "Ubicación", value: "Ingreso al Supermaxi" },
          { label: "Medidas", value: "3 × 3 m — altura máxima 1,80 m" },
        ],
      },
      {
        venue: "CCI",
        specs: [
          { label: "Ubicación", value: "Ingreso al Supermaxi" },
          { label: "Medidas", value: "3,5 × 2,5 m — altura máxima 1,80 m" },
        ],
      },
    ],
    includes: ["Gestión del espacio con el centro comercial"],
    conditions: [
      MALL_AVAILABILITY,
      "El costo varía dependiendo del tiempo de exposición.",
      IVA_NOTE,
    ],
    availability: "confirmar",
    hero: "activaciones-hero",
    gallery: [
      "activaciones-hero",
      "espacio-quicentro-norte",
      "espacio-san-marino",
      "espacio-jardin",
      "espacio-cci",
    ],
  },
  {
    slug: "vallas-moviles",
    name: "Vallas móviles",
    family: "activaciones",
    summary:
      "Camión valla con recorrido de 8 horas diarias, 5 días a la semana, en Quito y Guayaquil.",
    description:
      "Una valla que va a buscar al público en lugar de esperarlo. El recorrido se define con la marca según el objetivo de la campaña, e incluye perifoneo para reforzar el mensaje en zonas peatonales.",
    recommendedUse:
      "Llevar publicidad a sectores específicos, aperturas de local y campañas con llamado a la acción.",
    location: "Quito y Guayaquil",
    kinds: ["movil", "estatico"],
    environments: ["espacios-urbanos", "exterior"],
    goals: ["sectores", "lanzamiento", "alcance"],
    specs: [
      { label: "Ciudades", value: "Quito y Guayaquil" },
      { label: "Recorrido", value: "5 días a la semana — 8 horas diarias" },
      { label: "Valla principal", value: "3,10 × 2,00 m" },
      { label: "Laterales", value: "4,00 × 2,00 m" },
      { label: "Frontal y posterior", value: "1,80 × 1,00 m" },
    ],
    includes: ["Perifoneo durante el recorrido", "Primera producción de lona"],
    conditions: [IVA_NOTE],
    pricing: {
      rental: [
        { period: "mensual", amount: 5500, label: "1 mes" },
        { period: "bimestral", amount: 10000, label: "2 meses" },
        { period: "trimestral", amount: 14000, label: "3 meses" },
      ],
      includesIva: false,
      notes: ["Cambio de lona Quito: $580.", "Cambio de lona Guayaquil: $700.", IVA_NOTE],
      updatedAt: CAT,
    },
    availability: "confirmar",
    hero: "valla-movil-hero",
    gallery: ["valla-movil-hero", "valla-movil-kia", "btl-promart", "btl-bicibanners-calle"],
  },
  {
    slug: "bicibanners",
    name: "Bicibanners a nivel nacional",
    family: "activaciones",
    summary:
      "Flota de más de 36 bicibanners activables simultáneamente en todo el país.",
    description:
      "Ciclistas con banner circulando por avenidas, exteriores de tiendas y zonas peatonales durante seis horas de activación, con supervisión en sitio y producción incluida.",
    recommendedUse:
      "Cobertura de varios puntos de la ciudad al mismo tiempo y refuerzo en exteriores de local.",
    location: "A nivel nacional",
    kinds: ["movil", "experiencial"],
    environments: ["espacios-urbanos", "exterior", "nacional"],
    goals: ["sectores", "activar-marca", "alcance"],
    specs: [
      { label: "Inventario", value: "Más de 36 bicibanners" },
      { label: "Duración", value: "6 horas de activación" },
      { label: "Cobertura", value: "Activables a nivel nacional" },
    ],
    includes: ["Supervisión en sitio", "Producción de los banners"],
    conditions: [IVA_NOTE],
    availability: "confirmar",
    hero: "bicibanners-flota",
    gallery: ["bicibanners-flota", "bicibanners-mcdonalds", "bicibanners-urbano", "btl-bicibanners-calle"],
  },
  {
    slug: "human-banners",
    name: "Human banners — mochilas publicitarias",
    family: "activaciones",
    summary:
      "24 mochilas tipo banner activables al mismo tiempo a nivel nacional.",
    description:
      "Personal caminando con mochila-banner en paradas, avenidas y accesos a centros comerciales. El formato se adapta a piezas pequeñas de refuerzo o a banners de mayor altura para lectura a distancia.",
    recommendedUse:
      "Refuerzo peatonal en zonas de alto tráfico y volanteo con presencia de marca.",
    location: "A nivel nacional",
    kinds: ["movil", "experiencial"],
    environments: ["espacios-urbanos", "exterior", "nacional"],
    goals: ["sectores", "activar-marca", "alto-trafico"],
    specs: [
      { label: "Inventario", value: "24 mochilas tipo banner" },
      { label: "Formatos", value: "60 × 60 cm · 25 × 42 cm" },
      { label: "Formato especial", value: "60 × 120 cm" },
      { label: "Cobertura", value: "Activables al mismo tiempo a nivel nacional" },
    ],
    includes: ["Personal operativo", "Supervisión en sitio"],
    conditions: [IVA_NOTE],
    availability: "confirmar",
    hero: "humanbanners-flota",
    gallery: ["humanbanners-flota", "humanbanners-parada", "humanbanners-avenida", "humanbanners-vertical"],
  },
  {
    slug: "human-banners-luminosos",
    name: "Human banners luminosos",
    family: "activaciones",
    summary:
      "Mochilas retroiluminadas para activaciones nocturnas, con cuatro horas diarias de operación.",
    description:
      "La versión nocturna del human banner: el panel se ilumina y la gráfica se lee desde el vehículo y desde la vereda opuesta. Incluye producción de mochilas y buzos del personal.",
    recommendedUse:
      "Aperturas, eventos nocturnos y campañas dirigidas al tráfico vehicular de la tarde y la noche.",
    location: "A nivel nacional",
    kinds: ["movil", "experiencial", "especial"],
    environments: ["espacios-urbanos", "exterior", "nacional"],
    goals: ["activar-marca", "lanzamiento", "sectores"],
    specs: [
      { label: "Duración", value: "4 horas diarias" },
      { label: "Formatos", value: "50 × 140 cm · 50 × 60 cm" },
    ],
    includes: ["Supervisión en sitio", "Producción de mochilas y buzos"],
    conditions: [IVA_NOTE],
    availability: "confirmar",
    hero: "humanbanners-luminosos-noche",
    gallery: [
      "humanbanners-luminosos-noche",
      "humanbanners-luminosos-marathon",
      "humanbanners-luminosos-scala",
    ],
  },
  {
    slug: "pasacalles",
    name: "Pasacalles a nivel nacional",
    family: "activaciones",
    summary:
      "Pasacalles a doble lado de 3,50 × 1,20 m, desplegados en semáforos de avenidas principales.",
    description:
      "Personal capacitado y con experiencia despliega el pasacalles en los semáforos en rojo de avenidas que conducen a la tienda u objetivo de la marca. Seis horas diarias de operación con supervisión.",
    recommendedUse:
      "Direccionar tráfico a un local concreto y comunicar promociones con vigencia corta.",
    location: "Avenidas principales — a nivel nacional",
    kinds: ["movil", "experiencial"],
    environments: ["espacios-urbanos", "exterior", "nacional"],
    goals: ["sectores", "alto-trafico", "lanzamiento"],
    specs: [
      { label: "Formato", value: "3,50 × 1,20 m — doble lado" },
      { label: "Duración", value: "6 horas diarias" },
      { label: "Ubicación", value: "Semáforos en rojo de avenidas principales" },
    ],
    includes: ["Personal capacitado con experiencia en pasacalles", "Supervisión en sitio", "Producción"],
    conditions: [IVA_NOTE],
    availability: "confirmar",
    hero: "pasacalles-semaforo",
    gallery: ["pasacalles-semaforo", "pasacalles-marathon", "pasacalles-doble-lado", "pasacalles-avenida"],
  },
  {
    slug: "activaciones-con-zanqueros",
    name: "Activaciones con zanqueros",
    family: "activaciones",
    summary:
      "Zanqueros y personajes de altura para ingresos de tienda, arcos de globos y eventos de calle.",
    description:
      "Presencia imposible de pasar por alto en la vereda y en el ingreso del local, combinada con arcos de globos y escenografía de bienvenida.",
    recommendedUse: "Aperturas de local, ferias y fechas comerciales de alto tráfico.",
    location: "A nivel nacional",
    kinds: ["experiencial"],
    environments: ["espacios-urbanos", "exterior", "centros-comerciales", "nacional"],
    goals: ["activar-marca", "lanzamiento"],
    specs: [{ label: "Equipo", value: "Zanqueros y personal de animación" }],
    includes: ["Personal operativo", "Supervisión en sitio"],
    conditions: [IVA_NOTE],
    availability: "confirmar",
    hero: "zanqueros-arco-globos",
    gallery: ["zanqueros-arco-globos", "zanqueros-marathon", "zanqueros-calle"],
  },
  {
    slug: "activaciones-con-modelos-y-promotores",
    name: "Activaciones con modelos y promotores",
    family: "activaciones",
    summary:
      "Equipo de imagen y promotores para stands, degustaciones y dinámicas de marca en punto de venta.",
    description:
      "Personal capacitado que atiende el stand, explica el producto y sostiene la dinámica de la activación durante toda la jornada, con supervisión de Sonic Publicidad.",
    recommendedUse:
      "Sampling, demostración de producto, captación de datos y refuerzo de venta en tienda.",
    location: "Centros comerciales y punto de venta a nivel nacional",
    kinds: ["experiencial"],
    environments: ["centros-comerciales", "interiores", "nacional"],
    goals: ["activar-marca", "centros-comerciales", "lanzamiento"],
    specs: [{ label: "Equipo", value: "Modelos, promotores y supervisión" }],
    includes: ["Personal operativo", "Supervisión en sitio"],
    conditions: [IVA_NOTE],
    availability: "confirmar",
    hero: "promotores-toni",
    gallery: ["promotores-toni", "promotores-outlet", "promotores-carrito", "promotores-deportes", "btl-hero", "btl-medicity", "btl-activacion-navidad"],
  },

  /* ==========================================================
     FAMILIA 5 · SOLUCIONES INTEGRALES
     ========================================================== */
  {
    slug: "produccion-de-stands",
    name: "Producción de stands",
    family: "integrales",
    summary:
      "Diseño, fabricación, montaje y desmontaje de stands para ferias, tiendas y centros comerciales.",
    description:
      "Producción completa del módulo: estructura, gráfica, mobiliario y elementos de exhibición, coordinados con el calendario de la activación.",
    recommendedUse: "Ferias, activaciones de temporada y presencia permanente en punto de venta.",
    location: "A nivel nacional",
    kinds: ["experiencial", "especial"],
    environments: ["centros-comerciales", "interiores", "nacional"],
    goals: ["activar-marca", "lanzamiento", "centros-comerciales"],
    specs: [{ label: "Alcance", value: "Diseño, producción, montaje y desmontaje" }],
    includes: ["Producción", "Instalación y desinstalación", "Supervisión"],
    conditions: [IVA_NOTE],
    availability: "confirmar",
    hero: "stand-sherwin-williams",
    gallery: ["stand-sherwin-williams", "stand-hunter", "stand-kinder", "stand-medicity", "stand-etafashion", "stand-kiosco"],
  },
  {
    slug: "otras-producciones",
    name: "Otras producciones",
    family: "integrales",
    summary:
      "Piezas especiales, exhibidores y montajes a medida que no entran en un formato estándar.",
    description:
      "Cuando la idea no cabe en un formato de catálogo: exhibidores, estructuras temáticas, montajes de pantalla y elementos de escenografía producidos a medida.",
    recommendedUse: "Campañas con concepto propio que requieren fabricación especial.",
    location: "A nivel nacional",
    kinds: ["especial", "experiencial"],
    environments: ["centros-comerciales", "espacios-urbanos", "nacional"],
    goals: ["activar-marca", "lanzamiento"],
    specs: [{ label: "Alcance", value: "Producción a medida según el proyecto" }],
    includes: ["Producción", "Instalación y desinstalación"],
    conditions: [IVA_NOTE],
    availability: "confirmar",
    hero: "produccion-marathon-led",
    gallery: ["produccion-marathon-led", "produccion-joazz"],
  },
  {
    slug: "articulos-promocionales-personalizados",
    name: "Artículos promocionales personalizados",
    family: "integrales",
    summary:
      "Material promocional y merchandising producido con la gráfica de la campaña.",
    description:
      "Bolsos, empaques, kits de regalo, botargas y piezas de obsequio producidas con la identidad de la marca para acompañar la activación.",
    recommendedUse: "Kits de prensa, obsequio en activación y material de temporada.",
    location: "A nivel nacional",
    kinds: ["especial"],
    environments: ["nacional"],
    goals: ["activar-marca", "lanzamiento"],
    specs: [{ label: "Alcance", value: "Producción personalizada según el brief" }],
    includes: ["Producción", "Entrega coordinada con la campaña"],
    conditions: [IVA_NOTE],
    availability: "confirmar",
    hero: "promocionales-1",
    gallery: ["promocionales-1", "promocionales-2", "promocionales-3"],
  },
];

export const formatBySlug = Object.fromEntries(
  formats.map((f) => [f.slug, f]),
) as Record<string, AdFormat>;

export function formatsByFamily(family: string) {
  return formats.filter((f) => f.family === family);
}
