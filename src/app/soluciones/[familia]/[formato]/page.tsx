import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight, CircleAlert, MapPin, MessageCircle, Check, X as XIcon, Info,
} from "lucide-react";
import { families, familyById } from "@/data/families";
import { formats, formatBySlug } from "@/data/formats";
import { Media } from "@/components/ui/Media";
import { SpecList } from "@/components/ui/SpecList";
import { PriceBlock } from "@/components/ui/PriceBlock";
import { Accordion } from "@/components/ui/Accordion";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { site, whatsappLink, AVAILABILITY_NOTE } from "@/data/site";

type Params = { familia: string; formato: string };

export function generateStaticParams(): Params[] {
  return formats.map((f) => ({ familia: familyById[f.family].slug, formato: f.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { formato } = await params;
  const f = formatBySlug[formato];
  if (!f) return {};
  return {
    title: f.name,
    description: f.summary,
    alternates: { canonical: `/soluciones/${familyById[f.family].slug}/${f.slug}/` },
    openGraph: { title: `${f.name} · ${site.name}`, description: f.summary },
  };
}

export default async function FormatoPage({ params }: { params: Promise<Params> }) {
  const { familia, formato } = await params;
  const f = formatBySlug[formato];
  if (!f || familyById[f.family].slug !== familia) notFound();

  const family = familyById[f.family];
  const siblings = formats.filter((x) => x.family === f.family && x.slug !== f.slug).slice(0, 3);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: f.name,
    description: f.description,
    serviceType: family.name,
    provider: { "@type": "ProfessionalService", name: site.name, url: site.url },
    areaServed: { "@type": "Country", name: "Ecuador" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <PageHero
        eyebrow={family.name}
        title={f.name}
        lead={f.summary}
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Soluciones", href: "/soluciones/" },
          { label: family.name, href: `/soluciones/${family.slug}/` },
          { label: f.name },
        ]}
      >
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <span className="tag normal-case tracking-normal">
            <MapPin size={13} aria-hidden="true" />
            {f.location}
          </span>
          {f.availability === "contratado" ? (
            <span className="tag border-warn/40 text-warn normal-case tracking-normal">
              <CircleAlert size={13} aria-hidden="true" />
              {f.availabilityNote ?? "Contratado"}
            </span>
          ) : (
            <span className="tag normal-case tracking-normal">
              <Info size={13} aria-hidden="true" />
              {AVAILABILITY_NOTE}
            </span>
          )}
        </div>
      </PageHero>

      <Section spacing="tight" bordered={false}>
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-start">
            {/* Columna principal */}
            <div>
              <figure className="card overflow-hidden">
                <Media
                  slug={f.hero}
                  alt={`${f.name} — ${f.location}`}
                  priority
                  ratio="16 / 9"
                  sizes="(min-width: 1024px) 62vw, 92vw"
                />
              </figure>

              <p className="mt-7 text-[1.05rem] leading-relaxed text-ink-dim">{f.description}</p>

              <div className="mt-7 rounded-[var(--radius-md)] border-l-2 border-brand bg-surface px-5 py-4">
                <h2 className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-mute">
                  Uso recomendado
                </h2>
                <p className="mt-1.5 text-[0.98rem] text-ink">{f.recommendedUse}</p>
              </div>

              <h2 className="text-h3 mt-10">Ficha técnica</h2>
              <SpecList items={f.specs} className="mt-4" />

              {f.inventory && f.inventory.length > 0 && (
                <>
                  <h2 className="text-h3 mt-10">
                    {f.inventory.length} {f.inventory.length === 1 ? "ubicación" : "ubicaciones"}
                  </h2>
                  <p className="mt-2 text-[0.92rem] text-ink-dim">
                    Cada sede tiene medidas y condiciones propias. Despliega para ver el detalle.
                  </p>
                  <div className="mt-4">
                    <Accordion
                      defaultOpen={f.inventory[0].venue}
                      items={f.inventory.map((row) => ({
                        id: row.venue,
                        title: row.venue,
                        meta: row.specs[0]?.value,
                        content: (
                          <div className="space-y-4">
                            <SpecList items={row.specs} />
                            {row.note && (
                              <p className="flex items-start gap-2 text-[0.85rem] text-ink-mute">
                                <Info size={14} aria-hidden="true" className="mt-0.5 shrink-0" />
                                {row.note}
                              </p>
                            )}
                            <PriceBlock pricing={row.pricing} compact />
                          </div>
                        ),
                      }))}
                    />
                  </div>
                </>
              )}

              {/* Qué incluye y qué no */}
              <h2 className="text-h3 mt-10">Qué incluye</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <ul className="space-y-2">
                  {f.includes.map((x) => (
                    <li key={x} className="flex items-start gap-2.5 text-[0.94rem] text-ink-dim">
                      <Check size={16} aria-hidden="true" className="mt-1 shrink-0 text-success" />
                      {x}
                    </li>
                  ))}
                </ul>
                {f.excludes && f.excludes.length > 0 && (
                  <ul className="space-y-2">
                    {f.excludes.map((x) => (
                      <li key={x} className="flex items-start gap-2.5 text-[0.94rem] text-ink-mute">
                        <XIcon size={16} aria-hidden="true" className="mt-1 shrink-0 text-ink-mute" />
                        <span>
                          <span className="sr-only">No incluido: </span>
                          {x}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {f.conditions && f.conditions.length > 0 && (
                <>
                  <h2 className="text-h3 mt-10">Condiciones</h2>
                  <ul className="mt-4 space-y-2 rounded-[var(--radius-md)] border border-line bg-surface p-5">
                    {f.conditions.map((c) => (
                      <li key={c} className="flex items-start gap-2.5 text-[0.9rem] text-ink-dim">
                        <span aria-hidden="true" className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-brand" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {f.gallery && f.gallery.length > 1 && (
                <>
                  <h2 className="text-h3 mt-10">Galería</h2>
                  <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {f.gallery.map((slug) => (
                      <li key={slug} className="card overflow-hidden">
                        <Media
                          slug={slug}
                          alt={`${f.name} — ejecución documentada`}
                          ratio="4 / 3"
                          sizes="(min-width: 640px) 30vw, 46vw"
                        />
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            {/* Panel de cotización */}
            <aside className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
              <div className="card p-6">
                <h2 className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-mute">
                  Inversión
                </h2>
                <div className="mt-3">
                  <PriceBlock pricing={f.pricing} />
                </div>

                <Link
                  href={`/cotizar/?formatos=${f.slug}`}
                  className="btn btn-primary mt-5 w-full"
                >
                  Cotizar este formato
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <a
                  href={whatsappLink(
                    `Hola, quiero cotizar "${f.name}" (${f.location}) con Sonic Publicidad.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost mt-2.5 w-full"
                >
                  <MessageCircle size={16} aria-hidden="true" />
                  Consultar por WhatsApp
                </a>

                <p className="mt-5 border-t border-line pt-4 text-[0.82rem] leading-relaxed text-ink-mute">
                  {AVAILABILITY_NOTE}. Confirmamos el espacio con el operador antes de reservar y te
                  enviamos la propuesta con producción, instalación y condiciones de arte.
                </p>
              </div>

              {siblings.length > 0 && (
                <div className="card mt-5 p-5">
                  <h2 className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-mute">
                    También en {family.name.toLowerCase()}
                  </h2>
                  <ul className="mt-3 space-y-1">
                    {siblings.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/soluciones/${family.slug}/${s.slug}/`}
                          className="nav-link block py-1.5 text-[0.9rem]"
                        >
                          {s.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </div>
      </Section>
    </>
  );
}
