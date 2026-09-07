import type { SpecItem } from "@/data/types";

/**
 * Ficha técnica en módulos de etiqueta/valor.
 * En móvil apila (etiqueta arriba, valor abajo) en lugar de comprimir una
 * tabla de dos columnas, que resulta ilegible por debajo de 480 px.
 */
export function SpecList({ items, className = "" }: { items: SpecItem[]; className?: string }) {
  const odd = items.length % 2 === 1;
  return (
    <dl className={`grid gap-px overflow-hidden rounded-[var(--radius-md)] border border-line bg-line sm:grid-cols-2 ${className}`}>
      {items.map((s, i) => (
        <div
          key={s.label + s.value}
          // Con un número impar de datos, el último ocupa la fila completa
          // para no dejar una celda vacía en la retícula.
          className={`bg-surface-2 px-4 py-3 ${odd && i === items.length - 1 ? "sm:col-span-2" : ""}`}
        >
          <dt className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-ink-mute">
            {s.label}
          </dt>
          <dd className="tabular mt-1 text-[0.95rem] text-ink">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}
