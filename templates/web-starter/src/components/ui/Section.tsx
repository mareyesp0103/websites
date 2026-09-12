import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  id?: string;
  className?: string;
  /** `tight` para bloques secundarios, `loose` para hitos narrativos. */
  spacing?: "tight" | "normal" | "loose";
  bordered?: boolean;
}

const SPACING = {
  tight: "py-14 sm:py-16",
  normal: "py-20 sm:py-24",
  loose: "py-24 sm:py-32",
} as const;

export function Section({ children, id, className = "", spacing = "normal", bordered = true }: Props) {
  return (
    <section
      id={id}
      className={`${SPACING[spacing]} ${bordered ? "border-t border-line" : ""} ${className}`}
    >
      {children}
    </section>
  );
}

interface HeadingProps {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
  /** Nivel semántico del encabezado; mantiene la jerarquía h1→h6 correcta. */
  as?: "h1" | "h2" | "h3";
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className = "",
  as: Tag = "h2",
}: HeadingProps) {
  const size = Tag === "h1" ? "text-h1" : Tag === "h2" ? "text-h2" : "text-h3";
  return (
    <div className={`${align === "center" ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      {eyebrow && (
        <p className="eyebrow mb-3">
          <span
            aria-hidden="true"
            className="inline-block h-1.5 w-1.5 rounded-full bg-spark"
            style={{ boxShadow: "var(--glow-spark)" }}
          />
          {eyebrow}
        </p>
      )}
      <Tag className={size}>{title}</Tag>
      {lead && <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-dim">{lead}</p>}
    </div>
  );
}
