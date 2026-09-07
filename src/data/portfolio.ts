/**
 * PORTAFOLIO
 *
 * Cada proyecto corresponde a una ejecución documentada fotográficamente en el
 * catálogo de Sonic Publicidad. No se declaran resultados, métricas ni fechas:
 * el material comercial no los reporta, y el campo `result` queda disponible
 * para cuando el cliente los valide.
 */

export type PortfolioCategory =
  | "transporte"
  | "centros-comerciales"
  | "dooh"
  | "branding"
  | "activaciones"
  | "medios-moviles"
  | "especiales";

export interface Project {
  slug: string;
  title: string;
  /** Marca visible en la ejecución, cuando el catálogo la documenta. */
  brand?: string;
  categories: PortfolioCategory[];
  /** Sede o entorno donde se ejecutó, según el catálogo. */
  venue: string;
  /** Formato del catálogo empleado — enlaza con `formats.ts`. */
  formatSlug: string;
  mediaType: string;
  objective: string;
  description: string;
  hero: string;
  gallery?: string[];
  /** Resultado verificado. Se completa sólo con información real del cliente. */
  result?: string;
  /** Proporción visual sugerida en la retícula editorial. */
  span?: "wide" | "tall" | "normal";
}

export const categoryLabels: Record<PortfolioCategory, string> = {
  transporte: "Transporte",
  "centros-comerciales": "Centros comerciales",
  dooh: "DOOH",
  branding: "Branding",
  activaciones: "Activaciones",
  "medios-moviles": "Medios móviles",
  especiales: "Proyectos especiales",
};

export const projects: Project[] = [
  {
    slug: "arco-oreo-el-recreo",
    title: "Arco de ingreso con producción especial",
    brand: "Oreo",
    categories: ["branding", "centros-comerciales", "especiales"],
    venue: "El Recreo",
    formatSlug: "arcos-en-centros-comerciales",
    mediaType: "Arco de ingreso · 4,60 × 3,00 × 0,60 m",
    objective: "Convertir el ingreso del centro comercial en un hito de campaña.",
    description:
      "Producción troquelada de gran volumen sobre el arco de ingreso: la galleta se convierte en la estructura misma y el piso extiende la gráfica hasta los pies del visitante.",
    hero: "arco-recreo",
    gallery: ["arco-recreo", "arco-mall-del-sol-pileta"],
    span: "wide",
  },
  {
    slug: "arco-nivea-el-bosque",
    title: "Arco iluminado de ingreso, día y noche",
    brand: "Nivea",
    categories: ["branding", "centros-comerciales"],
    venue: "C.C. El Bosque",
    formatSlug: "arcos-en-centros-comerciales",
    mediaType: "Arco iluminado · 8,45 × 1,52 m",
    objective: "Sostener la presencia de marca en las dos jornadas de tráfico del centro comercial.",
    description:
      "El arco de El Bosque permite producción especial con iluminación: la misma pieza rinde de día por escala y de noche por luz propia sobre el ingreso vehicular.",
    hero: "arco-bosque-noche",
    gallery: ["arco-bosque-noche", "arco-bosque-dia"],
    span: "tall",
  },
  {
    slug: "valla-movil-kia",
    title: "Recorrido urbano con valla móvil",
    brand: "Kia",
    categories: ["medios-moviles", "activaciones"],
    venue: "Quito y Guayaquil",
    formatSlug: "vallas-moviles",
    mediaType: "Camión valla · 8 horas diarias con perifoneo",
    objective: "Llevar el lanzamiento a los sectores definidos por la marca.",
    description:
      "Recorrido de cinco días por semana frente a puntos de venta y avenidas de alto flujo, con perifoneo para reforzar el mensaje en zonas peatonales.",
    hero: "valla-movil-hero",
    gallery: ["valla-movil-hero", "valla-movil-kia"],
    span: "wide",
  },
  {
    slug: "activacion-toni-centro-comercial",
    title: "Espacio de activación con promotores",
    brand: "Toni",
    categories: ["activaciones", "centros-comerciales"],
    venue: "Centro comercial",
    formatSlug: "espacios-para-activaciones-en-centros-comerciales",
    mediaType: "Isla de activación · altura máxima 1,80 m",
    objective: "Generar prueba de producto e interacción directa con el comprador.",
    description:
      "Montaje de marca con backing fotográfico, refrigeración de producto y equipo de promotores atendiendo el flujo del centro comercial.",
    hero: "activaciones-hero",
    gallery: ["activaciones-hero", "promotores-toni"],
    span: "normal",
  },
  {
    slug: "bicibanners-mcdonalds",
    title: "Flota de bicibanners en exteriores de local",
    brand: "McDonald's",
    categories: ["activaciones", "medios-moviles"],
    venue: "A nivel nacional",
    formatSlug: "bicibanners",
    mediaType: "Bicibanners · 6 horas de activación",
    objective: "Direccionar tráfico peatonal y vehicular hacia el local.",
    description:
      "Grupo de ciclistas con banner posicionados en el exterior del restaurante y en las avenidas de acceso, con supervisión en sitio.",
    hero: "bicibanners-mcdonalds",
    gallery: ["bicibanners-mcdonalds", "bicibanners-flota", "bicibanners-urbano"],
    span: "normal",
  },
  {
    slug: "branding-exterior-tren-metro",
    title: "Branding exterior de un tren de seis vagones",
    categories: ["transporte", "especiales", "branding"],
    venue: "Metro de Quito",
    formatSlug: "branding-exterior-de-vagones",
    mediaType: "Vinilo removible sobre laterales, ventanas y puertas",
    objective: "Convertir el tren en el soporte de mayor visibilidad del sistema.",
    description:
      "Intervención de laterales, ventanas y vidrios inferiores de puertas sobre un tren completo, con aprobación previa del arte por parte del Municipio de Quito.",
    hero: "metro-branding-tren",
    gallery: ["metro-branding-tren", "metro-estacion"],
    span: "wide",
  },
  {
    slug: "exhibicion-magnum-metro",
    title: "Exhibición especial en estación",
    brand: "Magnum",
    categories: ["transporte", "especiales", "activaciones"],
    venue: "Metro de Quito",
    formatSlug: "exhibiciones-especiales-metro",
    mediaType: "Montaje tridimensional en andén",
    objective: "Dar presencia física al producto en el recorrido del pasajero.",
    description:
      "Estructura a escala instalada en el área de circulación de la estación, con producción especial ajustada a la normativa del sistema.",
    hero: "metro-exhibicion-magnum",
    gallery: ["metro-exhibicion-magnum", "metro-exhibicion-especial"],
    span: "normal",
  },
  {
    slug: "branding-pared-metro",
    title: "Branding de pared en estación",
    brand: "H&M",
    categories: ["transporte", "branding"],
    venue: "Metro de Quito",
    formatSlug: "branding-de-paredes-y-columnas",
    mediaType: "Pared de 3 × 1,85 m",
    objective: "Instalar una sola pieza gráfica dominante en el paso del andén.",
    description:
      "Gráfica de campaña sobre la pared del área de circulación, dimensionada para lectura a distancia media.",
    hero: "metro-branding-pared",
    gallery: ["metro-branding-pared", "metro-branding-columna"],
    span: "normal",
  },
  {
    slug: "pantallas-mall-el-jardin-circuito",
    title: "Circuito LED de ingresos y plaza",
    categories: ["dooh", "centros-comerciales"],
    venue: "Mall El Jardín",
    formatSlug: "pantallas-mall-el-jardin",
    mediaType: "7 pantallas LED · 1.200 spots diarios por circuito",
    objective: "Cubrir el recorrido completo del visitante dentro del centro comercial.",
    description:
      "Pauta simultánea en los ingresos peatonal y vehicular y en la plaza bancaria, con arte adaptado a la resolución de cada pantalla.",
    hero: "pantalla-jardin-panoramica",
    gallery: ["pantalla-jardin-panoramica", "pantalla-jardin-led"],
    span: "tall",
  },
  {
    slug: "pantallas-patio-comidas",
    title: "Pantallas en patio de comidas",
    categories: ["dooh", "centros-comerciales"],
    venue: "C.C. El Bosque · C.C. Mall de los Andes",
    formatSlug: "pantallas-patio-de-comidas-el-bosque",
    mediaType: "Pantallas Full HD · 2.400 spots diarios",
    objective: "Aprovechar la permanencia del visitante sentado en el área de mesas.",
    description:
      "Circuito de pantallas sobre el patio de comidas, con spots de hasta 30 segundos y la frecuencia diaria más alta del portafolio.",
    hero: "pantalla-bosque-patio",
    gallery: ["pantalla-bosque-patio", "pantalla-andes", "pantalla-laguna-eventos"],
    span: "normal",
  },
  {
    slug: "ascensor-panoramico",
    title: "Ascensor panorámico intervenido",
    categories: ["branding", "centros-comerciales", "especiales"],
    venue: "Centros comerciales a nivel nacional",
    formatSlug: "ascensores-panoramicos",
    mediaType: "Lona sobre ascensor · hasta 3,60 × 17,85 m",
    objective: "Ocupar el eje vertical del centro comercial con una sola gráfica.",
    description:
      "Intervención de la torre del ascensor panorámico, visible desde todos los pisos y desde el hall principal.",
    hero: "ascensor-portal",
    gallery: ["ascensor-portal", "ascensor-recreo", "ascensor-quicentro", "ascensor-mallsur"],
    span: "tall",
  },
  {
    slug: "human-banners-luminosos-marathon",
    title: "Human banners luminosos en jornada nocturna",
    brand: "Marathon Sports",
    categories: ["activaciones", "medios-moviles"],
    venue: "A nivel nacional",
    formatSlug: "human-banners-luminosos",
    mediaType: "Mochilas retroiluminadas · 50 × 140 cm",
    objective: "Sostener visibilidad en el tráfico vehicular de la noche.",
    description:
      "Personal con mochila retroiluminada en cruces y avenidas principales, con producción de mochilas y buzos incluida.",
    hero: "humanbanners-luminosos-noche",
    gallery: ["humanbanners-luminosos-noche", "humanbanners-luminosos-marathon", "humanbanners-luminosos-scala"],
    span: "normal",
  },
  {
    slug: "pasacalles-marathon",
    title: "Pasacalles en avenidas principales",
    brand: "Marathon Sports",
    categories: ["activaciones"],
    venue: "A nivel nacional",
    formatSlug: "pasacalles",
    mediaType: "Pasacalles doble lado · 3,50 × 1,20 m",
    objective: "Comunicar una promoción de vigencia corta a pie de calle.",
    description:
      "Equipo capacitado desplegando el pasacalles en semáforos en rojo de avenidas que conducen al local objetivo.",
    hero: "pasacalles-marathon",
    gallery: ["pasacalles-marathon", "pasacalles-semaforo", "pasacalles-doble-lado"],
    span: "wide",
  },
  {
    slug: "human-banners-nacional",
    title: "Mochilas publicitarias en simultáneo",
    categories: ["activaciones", "medios-moviles"],
    venue: "A nivel nacional",
    formatSlug: "human-banners",
    mediaType: "24 mochilas tipo banner · 60 × 60 cm",
    objective: "Cubrir varios puntos del país al mismo tiempo.",
    description:
      "Despliegue de personal con mochila-banner en paradas, avenidas y accesos a centros comerciales.",
    hero: "humanbanners-flota",
    gallery: ["humanbanners-flota", "humanbanners-parada", "humanbanners-avenida"],
    span: "normal",
  },
  {
    slug: "stand-sherwin-williams",
    title: "Producción de stand para punto de venta",
    brand: "Sherwin-Williams",
    categories: ["especiales", "activaciones"],
    venue: "A nivel nacional",
    formatSlug: "produccion-de-stands",
    mediaType: "Stand modular con exhibición de producto",
    objective: "Dar a la marca un espacio propio dentro del canal.",
    description:
      "Diseño, fabricación y montaje del módulo, incluyendo mobiliario, gráfica y elementos de exhibición.",
    hero: "stand-sherwin-williams",
    gallery: ["stand-sherwin-williams", "stand-hunter", "stand-kinder", "stand-medicity"],
    span: "normal",
  },
  {
    slug: "arco-tropiburger-san-luis",
    title: "Arco sobre escaleras eléctricas",
    brand: "Tropiburger",
    categories: ["branding", "centros-comerciales"],
    venue: "San Luis Shopping",
    formatSlug: "arcos-en-centros-comerciales",
    mediaType: "Arco · 4,20 × 0,60 m / 0,60 × 2,20 m",
    objective: "Capturar al visitante en el punto donde converge el flujo de pisos.",
    description:
      "Arco de doble cara sobre la escalera eléctrica, con producción sin troquel según la normativa de la sede.",
    hero: "arco-sanluis",
    gallery: ["arco-sanluis", "arco-cci", "arco-city-mall"],
    span: "normal",
  },
  {
    slug: "activacion-zanqueros",
    title: "Activación de apertura con zanqueros",
    brand: "Promart Homecenter",
    categories: ["activaciones", "especiales"],
    venue: "A nivel nacional",
    formatSlug: "activaciones-con-zanqueros",
    mediaType: "Zanqueros y arco de globos",
    objective: "Marcar la apertura del local con presencia imposible de ignorar.",
    description:
      "Montaje de bienvenida con arco de globos y personajes de altura recibiendo al público en el ingreso.",
    hero: "zanqueros-arco-globos",
    gallery: ["zanqueros-arco-globos", "zanqueros-marathon", "zanqueros-calle", "btl-arco-inflable"],
    span: "normal",
  },
  {
    slug: "monitores-metro-quito",
    title: "Circuito de 540 monitores digitales",
    categories: ["transporte", "dooh"],
    venue: "Metro de Quito",
    formatSlug: "monitores-digitales-en-trenes",
    mediaType: "540 monitores · spot de 18 segundos",
    objective: "Alcanzar al pasajero durante todo su trayecto.",
    description:
      "Emisión del spot en los 540 monitores de la flota de quince trenes, con 17 horas y media de encendido diario.",
    hero: "metro-monitores-digitales",
    gallery: ["metro-monitores-digitales", "metro-branding-monitores", "metro-estacion"],
    span: "wide",
  },
];

export const portfolioCategories = Object.keys(categoryLabels) as PortfolioCategory[];
