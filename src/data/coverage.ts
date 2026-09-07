import { geoToMap } from "./ecuador";

/**
 * COBERTURA
 *
 * Sólo se afirman como confirmadas las ciudades que el catálogo nombra de
 * forma explícita (Quito, por el Metro y las vallas móviles; Guayaquil, por
 * las vallas móviles). El resto de sedes se lista por nombre, sin atribuirles
 * una ciudad que el material no declara.
 */

export interface CoverageRegion {
  id: string;
  name: string;
  /** Coordenadas geográficas reales, proyectadas sobre el mapa. */
  lon?: number;
  lat?: number;
  /** Qué respalda la presencia en esta zona, textualmente. */
  evidence: string;
  headline: string;
  /** Slugs de `formats.ts` disponibles según el catálogo. */
  formats: string[];
  /** Verdadero sólo si el catálogo nombra la ciudad de forma explícita. */
  confirmed: boolean;
}

export const regions: CoverageRegion[] = [
  {
    id: "quito",
    name: "Quito",
    lon: -78.5243,
    lat: -0.2295,
    evidence:
      "El catálogo detalla los espacios del Metro de Quito y el recorrido de vallas móviles en la ciudad.",
    headline: "Todo el sistema del Metro, más medios móviles",
    confirmed: true,
    formats: [
      "monitores-digitales-en-trenes",
      "branding-posterior-de-monitores",
      "arcos-en-escaleras-electricas-metro",
      "branding-de-escaleras-electricas",
      "branding-de-paredes-y-columnas",
      "exhibiciones-especiales-metro",
      "branding-exterior-de-vagones",
      "vallas-moviles",
    ],
  },
  {
    id: "guayaquil",
    name: "Guayaquil",
    lon: -79.8891,
    lat: -2.1894,
    evidence:
      "El catálogo detalla el recorrido y el tarifario de vallas móviles para Guayaquil.",
    headline: "Vallas móviles con recorrido y perifoneo",
    confirmed: true,
    formats: ["vallas-moviles"],
  },
  {
    id: "nacional",
    name: "Cobertura nacional",
    evidence:
      "El catálogo declara bicibanners, mochilas tipo banner y pasacalles activables a nivel nacional, con aliados estratégicos en el país.",
    headline: "Formatos activables en simultáneo en todo el país",
    confirmed: true,
    formats: [
      "bicibanners",
      "human-banners",
      "human-banners-luminosos",
      "pasacalles",
      "activaciones-con-zanqueros",
      "activaciones-con-modelos-y-promotores",
      "produccion-de-stands",
      "otras-producciones",
      "articulos-promocionales-personalizados",
    ],
  },
];

export const mapPins = regions
  .filter((r) => r.lon !== undefined && r.lat !== undefined)
  .map((r) => ({ ...r, ...geoToMap(r.lon!, r.lat!) }));

/** Sedes nombradas en el catálogo, con los formatos disponibles en cada una. */
export interface Venue {
  name: string;
  formats: string[];
}

export const venues: Venue[] = [
  { name: "Metro de Quito", formats: ["monitores-digitales-en-trenes", "branding-posterior-de-monitores", "arcos-en-escaleras-electricas-metro", "branding-de-escaleras-electricas", "branding-de-paredes-y-columnas", "exhibiciones-especiales-metro", "branding-exterior-de-vagones"] },
  { name: "Quicentro Norte", formats: ["pantallas-centros-comerciales-grupo-dk", "espacios-para-activaciones-en-centros-comerciales"] },
  { name: "Quicentro Sur", formats: ["pantallas-centros-comerciales-grupo-dk", "ascensores-panoramicos", "arcos-en-centros-comerciales"] },
  { name: "Quicentro", formats: ["ascensores-panoramicos"] },
  { name: "San Luis Shopping", formats: ["pantallas-centros-comerciales-grupo-dk", "arcos-en-centros-comerciales"] },
  { name: "San Marino Shopping", formats: ["pantallas-centros-comerciales-grupo-dk", "espacios-para-activaciones-en-centros-comerciales"] },
  { name: "El Portal Shopping", formats: ["pantallas-centros-comerciales-grupo-dk", "ascensores-panoramicos", "arcos-en-centros-comerciales"] },
  { name: "Mall del Pacífico", formats: ["pantallas-centros-comerciales-grupo-dk"] },
  { name: "Bombolí Shopping", formats: ["pantallas-centros-comerciales-grupo-dk"] },
  { name: "Maltería Plaza", formats: ["pantallas-centros-comerciales-grupo-dk"] },
  { name: "Mall El Jardín", formats: ["pantallas-mall-el-jardin", "espacios-para-activaciones-en-centros-comerciales"] },
  { name: "C.C. El Bosque", formats: ["pantallas-patio-de-comidas-el-bosque", "ascensores-panoramicos", "arcos-en-centros-comerciales"] },
  { name: "C.C. Mall de los Andes", formats: ["pantallas-patio-de-comidas-mall-de-los-andes"] },
  { name: "C.C. Laguna Mall", formats: ["pantallas-laguna-mall"] },
  { name: "El Recreo", formats: ["ascensores-panoramicos", "arcos-en-centros-comerciales"] },
  { name: "City Mall", formats: ["ascensores-panoramicos", "arcos-en-centros-comerciales"] },
  { name: "Mall del Sur", formats: ["ascensores-panoramicos"] },
  { name: "Mall del Norte", formats: ["ascensores-panoramicos"] },
  { name: "Mall del Sol", formats: ["arcos-en-centros-comerciales", "espacios-para-activaciones-en-centros-comerciales"] },
  { name: "CCI", formats: ["arcos-en-centros-comerciales", "espacios-para-activaciones-en-centros-comerciales"] },
];

/** Texto institucional de cobertura, tomado del catálogo. */
export const coverageStatement =
  "Ofrecemos nuestros servicios en todo el territorio nacional, contando con presencia estratégica en diversas regiones del país. Disponemos de un equipo altamente calificado y comprometido, especializado en la coordinación, ejecución y supervisión integral de cada una de nuestras activaciones.";

export const alliesStatement =
  "Contamos con aliados estratégicos a nivel nacional, lo que nos ayuda a dar celeridad a nuestros proyectos y servicios publicitarios.";
