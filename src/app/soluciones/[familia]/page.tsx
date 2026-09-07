import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { families, familyById } from "@/data/families";
import { formatsByFamily } from "@/data/formats";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { CtaBand } from "@/components/sections/CtaBand";
import { site } from "@/data/site";

type Params = { familia: string };

export function generateStaticParams(): Params[] {
  return families.map((f) => ({ familia: f.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { familia } = await params;
  const family = families.find((f) => f.slug === familia);
  if (!family) return {};
  return {
    title: family.name,
    description: family.summary,
    alternates: { canonical: `/soluciones/${family.slug}/` },
    openGraph: { title: `${family.name} · ${site.name}`, description: family.summary },
  };
}

export default async function FamiliaPage({ params }: { params: Promise<Params> }) {
  const { familia } = await params;
  const family = families.find((f) => f.slug === familia);
  if (!family) notFound();

  const list = formatsByFamily(family.id);
  const others = families.filter((f) => f.id !== family.id);

  return (
    <>
      <PageHero
        eyebrow={family.name}
        title={family.headline}
        lead={family.summary}
        image={family.hero}
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Soluciones", href: "/soluciones/" },
          { label: family.name },
        ]}
      >
        <ul className="mt-8 flex flex-wrap gap-2">
          {family.bullets.map((b) => (
            <li key={b} className="tag normal-case tracking-normal text-ink-dim">
              {b}
            </li>
          ))}
        </ul>
      </PageHero>

      <Section>
        <div className="shell">
          <h2 className="text-h2">
            {list.length} {list.length === 1 ? "formato disponible" : "formatos disponibles"}
          </h2>

          <ul className="mt-10 grid gap-5 lg:grid-cols-2">
            {list.map((f, i) => (
              <Reveal as="li" key={f.slug} delay={Math.min(i, 5) * 0.05}>
                <Link
                  href={`/soluciones/${family.slug}/${f.slug}/`}
                  className="card card-interactive group flex h-full overflow-hidden max-sm:flex-col"
                >
                  <div className="sm:w-2/5 sm:shrink-0">
                    <Media
                      slug={f.hero}
                      alt=""
                      ratio="4 / 3"
                      sizes="(min-width: 640px) 240px, 92vw"
                      className="h-full transition-transform duration-500 group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-[1.05rem] font-semibold leading-snug">{f.name}</h3>
                    <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-dim">{f.summary}</p>
                    {f.specs[0] && (
                      <p className="tabular mt-3 text-[0.82rem] text-ink-mute">
                        <span className="text-brand-soft">{f.specs[0].label}:</span> {f.specs[0].value}
                      </p>
                    )}
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-4 font-display text-[0.84rem] font-semibold text-brand-bright">
                      Ver ficha completa
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

      <Section className="bg-surface" spacing="tight">
        <div className="shell">
          <h2 className="font-display text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-ink-mute">
            Otras familias
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {others.map((f) => (
              <li key={f.id}>
                <Link href={`/soluciones/${f.slug}/`} className="chip">
                  {familyById[f.id].name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
