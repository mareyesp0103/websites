import type { Metadata } from "next";
import Link from "next/link";
import { CoverageMap } from "@/components/sections/CoverageMap";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { venues } from "@/data/coverage";
import { formatBySlug } from "@/data/formats";
import { familyById } from "@/data/families";
import { AVAILABILITY_NOTE } from "@/data/site";

export const metadata: Metadata = {
  title: "Cobertura en Ecuador",
  description:
    "Cobertura de Sonic Publicidad: Metro de Quito, red de centros comerciales, vallas móviles en Quito y Guayaquil, y formatos activables a nivel nacional.",
  alternates: { canonical: "/cobertura/" },
};

export default function CoberturaPage() {
  return (
    <>
      <PageHero
        eyebrow="Cobertura"
        title="Dónde puede estar tu marca"
        lead="El catálogo confirma presencia en el sistema del Metro de Quito, en una red de centros comerciales y con vallas móviles en Quito y Guayaquil. Bicibanners, mochilas y pasacalles se activan en simultáneo a nivel nacional."
        image="bg-ciudad"
        breadcrumbs={[{ label: "Inicio", href: "/" }, { label: "Cobertura" }]}
      />

      <CoverageMap compact />

      <Section className="bg-surface">
        <div className="shell">
          <SectionHeading
            eyebrow="Red de espacios"
            title="Sedes nombradas en el catálogo"
            lead="Estas son las ubicaciones con formatos detallados en el material comercial. La disponibilidad de cada espacio se confirma con el operador antes de reservar."
          />

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {venues.map((v) => (
              <li key={v.name} className="card p-5">
                <h3 className="font-display text-[1.02rem] font-semibold">{v.name}</h3>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {v.formats.map((slug) => {
                    const f = formatBySlug[slug];
                    if (!f) return null;
                    return (
                      <li key={slug}>
                        <Link
                          href={`/soluciones/${familyById[f.family].slug}/${f.slug}/`}
                          className="tag normal-case tracking-normal transition-colors hover:border-brand-bright hover:text-ink"
                        >
                          {f.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-[0.88rem] text-ink-mute">
            {AVAILABILITY_NOTE}. El catálogo no atribuye ciudad a cada centro comercial, así que
            aquí se listan por nombre: el asesor confirma ubicación y fechas al cotizar.
          </p>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
