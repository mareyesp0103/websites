import type { Metadata } from "next";
import { WhySonic } from "@/components/sections/WhySonic";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ClientWall } from "@/components/sections/ClientWall";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Media } from "@/components/ui/Media";
import { SonicLogo } from "@/components/brand/SonicLogo";
import { coverageStatement, alliesStatement } from "@/data/coverage";
import { formats } from "@/data/formats";
import { families } from "@/data/families";
import { venues } from "@/data/coverage";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Sonic Publicidad: velocidad e innovación en activaciones de marca, con aliados estratégicos a nivel nacional y un equipo especializado en coordinación, ejecución y supervisión.",
  alternates: { canonical: "/nosotros/" },
};

/** Cifras verificables: se cuentan sobre el propio catálogo, no se declaran. */
const FACTS = [
  { value: String(formats.length), label: "formatos en catálogo" },
  { value: String(families.length), label: "familias de solución" },
  { value: String(venues.length), label: "sedes con formatos detallados" },
  { value: "540", label: "monitores en el Metro de Quito" },
];

export default function NosotrosPage() {
  return (
    <>
      <PageHero
        eyebrow="Nosotros"
        title="Velocidad e innovación en activaciones de marca"
        lead="Generamos experiencias únicas y efectivas con nuestros clientes. Contamos con aliados estratégicos a nivel nacional, lo que nos ayuda a dar celeridad a nuestros proyectos y servicios publicitarios."
        image="bg-autopista"
        breadcrumbs={[{ label: "Inicio", href: "/" }, { label: "Nosotros" }]}
      />

      <Section spacing="tight" bordered={false}>
        <div className="shell">
          <div className="card overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="p-7 sm:p-10">
                <SonicLogo variant="full" className="h-20 w-auto" title="Sonic Publicidad" />
                <p className="mt-7 text-[1.05rem] leading-relaxed text-ink-dim">{coverageStatement}</p>
                <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-dim">{alliesStatement}</p>
              </div>
              <div className="relative min-h-[260px]">
                <Media
                  slug="bg-ciudad"
                  alt=""
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="h-full w-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--color-surface) 0%, rgba(11,18,32,0.25) 45%, transparent 100%)",
                  }}
                />
              </div>
            </div>
          </div>

          <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FACTS.map((f) => (
              <div key={f.label} className="card p-5">
                <dt className="sr-only">{f.label}</dt>
                <dd>
                  <span className="tabular block font-display text-[2.4rem] font-bold leading-none text-gradient">
                    {f.value}
                  </span>
                  <span className="mt-2 block text-[0.88rem] text-ink-dim">{f.label}</span>
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-4 text-[0.8rem] text-ink-mute">
            Cifras tomadas del catálogo de servicios publicitarios 2026 de Sonic Publicidad.
          </p>
        </div>
      </Section>

      <WhySonic />
      <ProcessSection />

      <Section spacing="tight" className="bg-surface">
        <div className="shell">
          <SectionHeading
            eyebrow="Concepto de marca"
            title="Speed & Innovation"
            lead="Velocidad para responder y montar; innovación en los formatos con los que una marca ocupa el espacio público. Ese es el criterio con el que armamos cada campaña."
            align="center"
          />
        </div>
      </Section>

      <ClientWall />
      <CtaBand />
    </>
  );
}
