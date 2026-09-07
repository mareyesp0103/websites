import type { Environment, FormatKind, Goal } from "./types";
import { formats } from "./formats";

/**
 * EXPLORADOR DE SOLUCIONES
 *
 * Es un filtro declarado, no un motor de recomendación: cada formato lleva en
 * `formats.ts` los objetivos, entornos y tipos que resuelve, y el explorador
 * cuenta coincidencias. No hay inferencia ni modelo detrás, y la interfaz lo
 * dice de forma explícita.
 */

export interface Option<T extends string> {
  value: T;
  label: string;
  hint: string;
}

export const goalOptions: Option<Goal>[] = [
  { value: "alcance", label: "Generar alcance", hint: "Llegar a la mayor cantidad de personas posible" },
  { value: "alto-trafico", label: "Impactar en zonas de alto tráfico", hint: "Estar donde ya circula mucha gente" },
  { value: "activar-marca", label: "Activar una marca", hint: "Interacción directa con personal en sitio" },
  { value: "lanzamiento", label: "Promocionar un lanzamiento", hint: "Un hito visible en fecha determinada" },
  { value: "centros-comerciales", label: "Tener presencia en centros comerciales", hint: "Acompañar la decisión de compra" },
  { value: "sectores", label: "Llevar publicidad a diferentes sectores", hint: "Ir a buscar zonas específicas de la ciudad" },
];

export const environmentOptions: Option<Environment>[] = [
  { value: "transporte", label: "Transporte", hint: "Metro de Quito" },
  { value: "centros-comerciales", label: "Centros comerciales", hint: "Pantallas, arcos y activaciones" },
  { value: "espacios-urbanos", label: "Espacios urbanos", hint: "Avenidas, semáforos y exteriores de local" },
  { value: "interiores", label: "Interiores", hint: "Estaciones, patios de comida y halls" },
  { value: "exterior", label: "Exterior", hint: "Vía pública y fachadas" },
  { value: "nacional", label: "A nivel nacional", hint: "Formatos activables en todo el país" },
];

export const kindOptions: Option<FormatKind>[] = [
  { value: "digital", label: "Digital", hint: "Pantallas y monitores con spot en video" },
  { value: "estatico", label: "Estático", hint: "Impresión, vinilo y lona" },
  { value: "movil", label: "Móvil", hint: "El medio se desplaza por la ciudad" },
  { value: "experiencial", label: "Experiencial", hint: "Con personal y contacto directo" },
  { value: "especial", label: "Especial", hint: "Producción a medida y gran formato" },
];

export interface ExplorerAnswers {
  goals: Goal[];
  environments: Environment[];
  kinds: FormatKind[];
}

export interface ExplorerResult {
  slug: string;
  score: number;
  /** Por qué aparece: coincidencias declaradas en el catálogo. */
  matches: string[];
}

/**
 * Puntúa cada formato por número de coincidencias declaradas.
 * Un formato debe coincidir en al menos una respuesta de cada pregunta
 * respondida para aparecer en los resultados.
 */
export function recommend(answers: ExplorerAnswers): ExplorerResult[] {
  const { goals, environments, kinds } = answers;
  const active = [goals.length > 0, environments.length > 0, kinds.length > 0];
  if (!active.some(Boolean)) return [];

  return formats
    .map((f) => {
      const g = goals.filter((x) => f.goals.includes(x));
      const e = environments.filter((x) => f.environments.includes(x));
      const k = kinds.filter((x) => f.kinds.includes(x));

      // Cada pregunta respondida debe tener al menos una coincidencia.
      if (goals.length && g.length === 0) return null;
      if (environments.length && e.length === 0) return null;
      if (kinds.length && k.length === 0) return null;

      const matches: string[] = [];
      g.forEach((v) => matches.push(goalOptions.find((o) => o.value === v)!.label));
      e.forEach((v) => matches.push(environmentOptions.find((o) => o.value === v)!.label));
      k.forEach((v) => matches.push(kindOptions.find((o) => o.value === v)!.label));

      return { slug: f.slug, score: g.length * 3 + e.length * 2 + k.length, matches };
    })
    .filter((r): r is ExplorerResult => r !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);
}
