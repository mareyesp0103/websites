import type { Metadata } from "next";
import { Suspense } from "react";
import { Clock, ShieldCheck, FileText } from "lucide-react";
import { QuoteForm } from "@/components/QuoteForm";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { processSteps } from "@/data/process";

export const metadata: Metadata = {
  title: "Solicitar una propuesta",
  description:
    "Solicita una propuesta de campaña OOH o DOOH a Sonic Publicidad: cuéntanos objetivo, ciudad, fechas y formatos de interés, y confirmamos disponibilidad e inversión.",
  alternates: { canonical: "/cotizar/" },
};

const ASSURANCES = [
  { icon: Clock, title: "Sin compromiso", body: "Solicitar la propuesta no reserva ni compromete ningún espacio." },
  { icon: ShieldCheck, title: "Disponibilidad confirmada", body: "Validamos cada espacio con el operador antes de enviarte valores." },
  { icon: FileText, title: "Propuesta detallada", body: "Recibes formatos, producción, instalación y condiciones de arte." },
];

export default function CotizarPage() {
  return (
    <>
      <PageHero
        eyebrow="Solicitar propuesta"
        title="Cuéntanos tu campaña"
        lead="Tres pasos, dos minutos. Con el objetivo, la ciudad y las fechas confirmamos disponibilidad y te enviamos una propuesta con inversión y condiciones."
        breadcrumbs={[{ label: "Inicio", href: "/" }, { label: "Solicitar propuesta" }]}
      />

      <Section spacing="tight" bordered={false}>
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-start">
            <Suspense
              fallback={
                <div className="card p-8">
                  <div className="skeleton h-2 w-full" />
                  <div className="skeleton mt-8 h-6 w-40" />
                  <div className="skeleton mt-6 h-12 w-full" />
                  <div className="skeleton mt-4 h-12 w-full" />
                  <span className="sr-only">Cargando el formulario…</span>
                </div>
              }
            >
              <QuoteForm />
            </Suspense>

            <aside className="space-y-4 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
              <ul className="space-y-4">
                {ASSURANCES.map((a) => (
                  <li key={a.title} className="card flex gap-3.5 p-5">
                    <a.icon size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-brand-soft" />
                    <div>
                      <h2 className="font-display text-[0.98rem] font-semibold">{a.title}</h2>
                      <p className="mt-1 text-[0.88rem] leading-relaxed text-ink-dim">{a.body}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="card p-5">
                <h2 className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-mute">
                  Qué pasa después
                </h2>
                <ol className="mt-4 space-y-3">
                  {processSteps.slice(1, 4).map((s) => (
                    <li key={s.n} className="flex gap-3 text-[0.88rem] text-ink-dim">
                      <span
                        aria-hidden="true"
                        className="tabular mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line-strong font-display text-[0.72rem] font-semibold text-brand-soft"
                      >
                        {s.n}
                      </span>
                      <span>
                        <span className="block font-display font-semibold text-ink">{s.title}</span>
                        {s.body}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>
          </div>
        </div>
      </Section>
    </>
  );
}
