import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { families } from "@/data/families";
import { formats, formatsByFamily } from "@/data/formats";
import { Media } from "@/components/ui/Media";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Soluciones publicitarias OOH y DOOH",
  description:
    "Catálogo de soluciones de Sonic Publicidad: espacios en el Metro de Quito, pantallas en centros comerciales, arcos, ascensores panorámicos, vallas móviles y activaciones de marca en Ecuador.",
  alternates: { canonical: "/soluciones/" },
};

export default function SolucionesPage() {
  return (
    <>
      <PageHero
        eyebrow="Soluciones"
        title="Todo el catálogo, organizado por lo que resuelve"
        lead={`${formats.length} formatos publicitarios agrupados en cinco familias. Cada ficha trae medidas, segundaje, producción, instalación y condiciones de aprobación de artes.`}
        image="bg-ciudad"
        breadcrumbs={[{ label: "Inicio", href: "/" }, { label: "Soluciones" }]}
      />

      {families.map((family, fi) => {
        const list = formatsByFamily(family.id);
        return (
          <Section key={family.id} id={family.slug} className={fi % 2 === 1 ? "bg-surface" : ""}>
            <div className="shell">
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div className="max-w-2xl">
                  <p className="eyebrow mb-3">
                    <Icon name={family.icon} size={15} />
                    {family.name}
                  </p>
                  <h2 className="text-h2">{family.headline}</h2>
                  <p className="mt-4 text-[1.02rem] leading-relaxed text-ink-dim">{family.summary}</p>
                </div>
                <Link href={`/soluciones/${family.slug}/`} className="btn btn-ghost btn-sm">
                  Ver la familia completa
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>

              <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((f, i) => (
                  <Reveal as="li" key={f.slug} delay={Math.min(i, 5) * 0.05}>
                    <Link
                      href={`/soluciones/${family.slug}/${f.slug}/`}
                      className="card card-interactive group flex h-full flex-col overflow-hidden"
                    >
                      <Media
                        slug={f.hero}
                        alt=""
                        ratio="16 / 10"
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
                        className="transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                      <div className="flex flex-1 flex-col p-5">
                        <h3 className="font-display text-[1.02rem] font-semibold leading-snug">
                          {f.name}
                        </h3>
                        <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-dim">{f.summary}</p>
                        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 font-display text-[0.84rem] font-semibold text-brand-bright">
                          Ficha técnica
                          <ArrowRight
                            size={14}
                            aria-hidden="true"
                            className="transition-transform group-hover:translate-x-0.5"
                          />
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </ul>
            </div>
          </Section>
        );
      })}

      <CtaBand />
    </>
  );
}
