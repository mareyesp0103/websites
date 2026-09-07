import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { families } from "@/data/families";
import { formatsByFamily } from "@/data/formats";
import { Media } from "@/components/ui/Media";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";

export function FamilyGrid() {
  return (
    <Section id="soluciones">
      <div className="shell">
        <SectionHeading
          eyebrow="Soluciones"
          title="Cinco familias, un solo equipo detrás"
          lead="Del circuito digital del Metro de Quito a una activación con personal en la calle. Cada familia agrupa los formatos del catálogo por el problema que resuelve."
        />

        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {families.map((family, i) => {
            const count = formatsByFamily(family.id).length;
            return (
              <Reveal as="li" key={family.id} delay={i * 0.06}>
                <Link
                  href={`/soluciones/${family.slug}/`}
                  className="card card-interactive group flex h-full flex-col overflow-hidden"
                >
                  <div className="relative">
                    <Media
                      slug={family.hero}
                      alt=""
                      ratio="16 / 9"
                      sizes="(min-width: 1024px) 30vw, (min-width: 768px) 46vw, 92vw"
                      className="opacity-85 transition-all duration-500 group-hover:scale-[1.04] group-hover:opacity-100"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(to top, var(--color-surface) 4%, transparent 65%)",
                      }}
                    />
                    <span
                      aria-hidden="true"
                      className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] border border-line-strong bg-void/80 text-brand-soft backdrop-blur"
                    >
                      <Icon name={family.icon} size={19} />
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-h3">{family.name}</h3>
                      <ArrowUpRight
                        size={18}
                        aria-hidden="true"
                        className="mt-1 shrink-0 text-ink-mute transition-all duration-[var(--dur-base)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-bright"
                      />
                    </div>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-dim">{family.summary}</p>

                    <ul className="mt-4 space-y-1.5 border-t border-line pt-4 text-[0.85rem] text-ink-mute">
                      {family.bullets.map((b) => (
                        <li key={b} className="flex gap-2">
                          <span aria-hidden="true" className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-brand" />
                          {b}
                        </li>
                      ))}
                    </ul>

                    <p className="tabular mt-auto pt-4 font-display text-[0.78rem] uppercase tracking-[0.12em] text-brand-soft">
                      {count} {count === 1 ? "formato" : "formatos"}
                    </p>
                  </div>
                </Link>
              </Reveal>
            );
          })}

          <Reveal as="li" delay={families.length * 0.06}>
            <Link
              href="/cotizar/"
              className="card card-interactive group flex h-full flex-col justify-between gap-6 p-6"
              style={{
                background:
                  "linear-gradient(150deg, var(--color-deep-dark) 0%, var(--color-surface) 70%)",
              }}
            >
              <div>
                <h3 className="text-h3">¿No sabes por dónde empezar?</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-dim">
                  Cuéntanos el objetivo, la ciudad y las fechas. Armamos la combinación de formatos
                  y confirmamos disponibilidad de cada espacio.
                </p>
              </div>
              <span className="btn btn-primary w-full">
                Solicitar una propuesta
                <ArrowUpRight size={16} aria-hidden="true" />
              </span>
            </Link>
          </Reveal>
        </ul>
      </div>
    </Section>
  );
}
