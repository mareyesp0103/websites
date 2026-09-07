import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatBySlug } from "@/data/formats";
import { familyById } from "@/data/families";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";

/** Formatos destacados: los de mayor escala o inventario del catálogo. */
const FEATURED = [
  "monitores-digitales-en-trenes",
  "ascensores-panoramicos",
  "arcos-en-centros-comerciales",
  "vallas-moviles",
  "bicibanners",
  "pantallas-centros-comerciales-grupo-dk",
];

export function FeaturedFormats() {
  return (
    <Section id="formatos">
      <div className="shell">
        <SectionHeading
          eyebrow="Formatos destacados"
          title="Los soportes de mayor escala del catálogo"
          lead="Cada ficha trae medidas, segundaje, spots, producción y condiciones de aprobación de artes."
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED.map((slug, i) => {
            const f = formatBySlug[slug];
            if (!f) return null;
            const key = f.specs[0];
            return (
              <Reveal as="li" key={slug} delay={i * 0.05}>
                <Link
                  href={`/soluciones/${familyById[f.family].slug}/${f.slug}/`}
                  className="card card-interactive group flex h-full flex-col overflow-hidden"
                >
                  <div className="relative">
                    <Media
                      slug={f.hero}
                      alt=""
                      ratio="16 / 10"
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
                      className="transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <span className="tag absolute left-3 top-3 bg-void/85 backdrop-blur">
                      {familyById[f.family].name}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-[1.05rem] font-semibold leading-snug">{f.name}</h3>
                    <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-dim">{f.summary}</p>
                    {key && (
                      <p className="tabular mt-4 border-t border-line pt-4 text-[0.82rem] text-ink-mute">
                        <span className="text-brand-soft">{key.label}:</span> {key.value}
                      </p>
                    )}
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-4 font-display text-[0.85rem] font-semibold text-brand-bright">
                      Ver ficha técnica
                      <ArrowRight
                        size={14}
                        aria-hidden="true"
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
