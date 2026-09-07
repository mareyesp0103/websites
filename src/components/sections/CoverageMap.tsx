"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ShieldQuestion } from "lucide-react";
import { ECUADOR_VIEWBOX, ecuadorPaths } from "@/data/ecuador";
import { regions, mapPins, coverageStatement, alliesStatement } from "@/data/coverage";
import { formatBySlug } from "@/data/formats";
import { familyById } from "@/data/families";
import { AVAILABILITY_NOTE } from "@/data/site";
import { Section, SectionHeading } from "@/components/ui/Section";

export function CoverageMap({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState(regions[0].id);
  const reduced = useReducedMotion();
  const region = regions.find((r) => r.id === active)!;

  return (
    <Section id="cobertura" spacing={compact ? "tight" : "normal"}>
      <div className="shell">
        <SectionHeading
          eyebrow="Cobertura"
          title="Ejecución nacional, con presencia confirmada en Quito y Guayaquil"
          lead={coverageStatement}
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
          {/* Mapa */}
          <div className="relative">
            <svg
              viewBox={ECUADOR_VIEWBOX}
              className="w-full max-w-[380px] mx-auto lg:mx-0"
              role="img"
              aria-label="Mapa de Ecuador con las ciudades donde el catálogo confirma presencia: Quito y Guayaquil."
            >
              {ecuadorPaths.map((d, i) => (
                <path
                  key={i}
                  d={d}
                  fill="var(--color-surface-2)"
                  stroke="var(--color-line-strong)"
                  strokeWidth={2}
                />
              ))}

              {mapPins.map((pin) => {
                const on = pin.id === active;
                return (
                  <g key={pin.id}>
                    {on && !reduced && (
                      <circle
                        cx={pin.x}
                        cy={pin.y}
                        r={26}
                        fill="var(--color-spark)"
                        opacity={0.18}
                        style={{ animation: "sonic-pulse 2.4s var(--ease-in-out-soft) infinite" }}
                      />
                    )}
                    <circle
                      cx={pin.x}
                      cy={pin.y}
                      r={on ? 13 : 9}
                      fill={on ? "var(--color-spark)" : "var(--color-brand)"}
                      stroke="var(--color-void)"
                      strokeWidth={3}
                      className="transition-all duration-[var(--dur-base)]"
                    />
                    <text
                      x={pin.x + 22}
                      y={pin.y + 6}
                      fill={on ? "var(--color-ink)" : "var(--color-ink-dim)"}
                      className="font-display"
                      fontSize={30}
                      fontWeight={600}
                    >
                      {pin.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Selector y detalle */}
          <div>
            <div role="tablist" aria-label="Zonas de cobertura" className="flex flex-wrap gap-2">
              {regions.map((r) => (
                <button
                  key={r.id}
                  role="tab"
                  type="button"
                  id={`tab-${r.id}`}
                  aria-selected={active === r.id}
                  aria-controls={`panel-${r.id}`}
                  tabIndex={active === r.id ? 0 : -1}
                  onClick={() => setActive(r.id)}
                  onKeyDown={(e) => {
                    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                    e.preventDefault();
                    const i = regions.findIndex((x) => x.id === active);
                    const next = regions[(i + (e.key === "ArrowRight" ? 1 : regions.length - 1)) % regions.length];
                    setActive(next.id);
                    document.getElementById(`tab-${next.id}`)?.focus();
                  }}
                  className="chip"
                  data-active={active === r.id}
                >
                  {r.name}
                </button>
              ))}
            </div>

            <motion.div
              key={region.id}
              id={`panel-${region.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${region.id}`}
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="card mt-5 p-5"
            >
              <h3 className="text-h3">{region.headline}</h3>
              <p className="mt-2 text-[0.92rem] text-ink-dim">{region.evidence}</p>

              <h4 className="mt-5 font-display text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-mute">
                Formatos disponibles
              </h4>
              <ul className="mt-3 flex flex-wrap gap-2">
                {region.formats.map((slug) => {
                  const f = formatBySlug[slug];
                  if (!f) return null;
                  return (
                    <li key={slug}>
                      <Link
                        href={`/soluciones/${familyById[f.family].slug}/${f.slug}/`}
                        className="tag transition-colors hover:border-brand-bright hover:text-ink"
                      >
                        {f.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <p className="mt-5 flex items-start gap-2 border-t border-line pt-4 text-[0.83rem] text-ink-mute">
                <ShieldQuestion size={15} aria-hidden="true" className="mt-0.5 shrink-0" />
                {AVAILABILITY_NOTE}: cada espacio se confirma con el operador antes de reservar.
              </p>

              <Link href="/cotizar/" className="btn btn-primary btn-sm mt-5">
                {region.id === "nacional" ? "Cotizar cobertura nacional" : `Cotizar en ${region.name}`}
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </motion.div>

            <p className="mt-5 text-[0.9rem] leading-relaxed text-ink-dim">{alliesStatement}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
