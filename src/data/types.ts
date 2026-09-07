/** Tipos compartidos por el catálogo comercial. */

export type FamilyId =
  | "transporte"
  | "dooh"
  | "branding-espacios"
  | "activaciones"
  | "integrales";

/** Naturaleza del formato — se usa en el explorador de soluciones. */
export type FormatKind = "digital" | "estatico" | "movil" | "experiencial" | "especial";

/** Dónde vive el formato. */
export type Environment =
  | "transporte"
  | "centros-comerciales"
  | "espacios-urbanos"
  | "interiores"
  | "exterior"
  | "nacional";

/** Objetivo de campaña que el formato resuelve bien. */
export type Goal =
  | "alcance"
  | "alto-trafico"
  | "activar-marca"
  | "lanzamiento"
  | "centros-comerciales"
  | "sectores";

export type Period =
  | "quincenal"
  | "mensual"
  | "trimestral"
  | "semestral"
  | "anual"
  | "bimestral"
  | "unico";

export interface RentalTier {
  period: Period;
  amount: number;
  /** Etiqueta alternativa, p. ej. "9 meses". */
  label?: string;
}

export interface Pricing {
  /** Escalones de alquiler cargados del catálogo. */
  rental?: RentalTier[];
  /** Producción e instalación, cuando el catálogo la separa. */
  production?: { amount: number; note?: string };
  /** Siempre false: el catálogo publica valores sin IVA. */
  includesIva: false;
  /** Notas comerciales textuales del catálogo. */
  notes?: string[];
  /** Fecha del tarifario que respalda estos valores. */
  updatedAt: string;
}

export interface SpecItem {
  label: string;
  value: string;
}

/** Fila de un inventario con varias ubicaciones (pantallas, arcos, ascensores). */
export interface InventoryRow {
  venue: string;
  specs: SpecItem[];
  pricing?: Pricing;
  note?: string;
}

export type Availability =
  /** Requiere confirmar con el operador del espacio antes de reservar. */
  | "confirmar"
  /** Ocupado por otro anunciante en la fecha indicada. */
  | "contratado";

export interface AdFormat {
  slug: string;
  name: string;
  family: FamilyId;
  /** Frase corta para tarjetas y listados. */
  summary: string;
  /** Párrafo descriptivo para la ficha. */
  description: string;
  /** Para qué sirve mejor. */
  recommendedUse: string;
  /** Ubicación tal como la nombra el catálogo. */
  location: string;
  kinds: FormatKind[];
  environments: Environment[];
  goals: Goal[];
  /** Ficha técnica del formato. */
  specs: SpecItem[];
  /** Qué está incluido en el servicio. */
  includes: string[];
  /** Qué no está incluido. */
  excludes?: string[];
  /** Condiciones comerciales y de aprobación de artes. */
  conditions?: string[];
  /** Inventario por sede, cuando el formato opera en varias. */
  inventory?: InventoryRow[];
  pricing?: Pricing;
  availability: Availability;
  availabilityNote?: string;
  /** Slug de la imagen principal en `media.json`. */
  hero: string;
  /** Slugs adicionales para la galería. */
  gallery?: string[];
}

export interface ServiceFamily {
  id: FamilyId;
  slug: string;
  name: string;
  /** Titular corto para la tarjeta. */
  headline: string;
  summary: string;
  /** Qué resuelve esta familia, en una frase por viñeta. */
  bullets: string[];
  hero: string;
  /** Nombre del icono de lucide-react. */
  icon: string;
}
