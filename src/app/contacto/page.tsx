import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Mail, Phone, MessageCircle, MapPin, Clock, ArrowRight } from "lucide-react";
import { QuoteForm } from "@/components/QuoteForm";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { contact, whatsappLink, site, UNVALIDATED } from "@/data/site";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacta a Sonic Publicidad: correo, teléfono y WhatsApp para cotizar campañas de publicidad OOH, DOOH y activaciones de marca en Ecuador.",
  alternates: { canonical: "/contacto/" },
};

export default function ContactoPage() {
  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="Hablemos de tu campaña"
        lead="Escríbenos por el canal que prefieras. Si ya tienes claro el formato, el formulario de propuesta agiliza la respuesta."
        breadcrumbs={[{ label: "Inicio", href: "/" }, { label: "Contacto" }]}
      />

      <Section spacing="tight" bordered={false}>
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:items-start">
            <div className="space-y-4 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
              <div className="card p-6">
                <h2 className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-mute">
                  Canales directos
                </h2>

                <ul className="mt-5 space-y-4">
                  <li>
                    <a
                      href={whatsappLink("Hola, quiero información sobre los servicios de Sonic Publicidad.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-3.5"
                    >
                      <MessageCircle size={19} aria-hidden="true" className="mt-1 shrink-0 text-brand-soft" />
                      <span>
                        <span className="block font-display text-[0.98rem] font-semibold group-hover:text-brand-bright">
                          WhatsApp
                        </span>
                        <span className="tabular block text-[0.9rem] text-ink-dim">
                          {contact.phoneDisplay}
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href={contact.phoneLink} className="group flex items-start gap-3.5">
                      <Phone size={19} aria-hidden="true" className="mt-1 shrink-0 text-brand-soft" />
                      <span>
                        <span className="block font-display text-[0.98rem] font-semibold group-hover:text-brand-bright">
                          Teléfono
                        </span>
                        <span className="tabular block text-[0.9rem] text-ink-dim">
                          {contact.phoneDisplay}
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href={contact.emailLink} className="group flex items-start gap-3.5">
                      <Mail size={19} aria-hidden="true" className="mt-1 shrink-0 text-brand-soft" />
                      <span className="min-w-0">
                        <span className="block font-display text-[0.98rem] font-semibold group-hover:text-brand-bright">
                          Correo
                        </span>
                        <span className="block break-all text-[0.9rem] text-ink-dim">
                          {contact.email}
                        </span>
                      </span>
                    </a>
                  </li>
                </ul>

                <div className="mt-6 border-t border-line pt-5">
                  <p className="font-display text-[0.98rem] font-semibold">{contact.advisor.name}</p>
                  <p className="text-[0.85rem] text-ink-mute">{contact.advisor.role}</p>
                </div>
              </div>

              <div className="card p-6">
                <h2 className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-mute">
                  Operación
                </h2>
                <ul className="mt-4 space-y-3.5 text-[0.9rem]">
                  <li className="flex items-start gap-3">
                    <MapPin size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-ink-mute" />
                    <span>
                      <span className="block text-ink">Cobertura</span>
                      <span className="text-ink-dim">
                        {site.countryName} — ejecución nacional con aliados estratégicos
                      </span>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-ink-mute" />
                    <span>
                      <span className="block text-ink">Horario de atención</span>
                      <span className="text-ink-mute">{UNVALIDATED}</span>
                    </span>
                  </li>
                </ul>
                {!contact.address.enabled && (
                  <p className="mt-4 border-t border-line pt-4 text-[0.8rem] text-ink-mute">
                    Dirección de oficina y redes sociales: {UNVALIDATED.toLowerCase()}.
                  </p>
                )}
              </div>

              <Link href="/soluciones/" className="btn btn-ghost w-full">
                Ver el catálogo de soluciones
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>

            <div>
              <h2 className="text-h3 mb-4">O envíanos los datos de tu campaña</h2>
              <Suspense
                fallback={
                  <div className="card p-8">
                    <div className="skeleton h-2 w-full" />
                    <div className="skeleton mt-8 h-12 w-full" />
                    <span className="sr-only">Cargando el formulario…</span>
                  </div>
                }
              >
                <QuoteForm />
              </Suspense>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
