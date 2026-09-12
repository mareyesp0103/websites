import * as icons from "lucide-react";
import type { LucideProps } from "lucide-react";

/**
 * Resuelve un icono de lucide-react por nombre, desde los datos.
 * Los iconos decorativos junto a texto visible se ocultan del árbol de
 * accesibilidad; los que aportan significado reciben `label`.
 */
export function Icon({
  name,
  label,
  ...props
}: { name: string; label?: string } & LucideProps) {
  const Cmp = (icons as unknown as Record<string, React.ComponentType<LucideProps>>)[name];
  if (!Cmp) return null;
  return (
    <Cmp
      {...props}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    />
  );
}
