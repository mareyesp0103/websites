import { processSteps } from "@/data/process";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";

export function ProcessSection() {
  return (
    <Section id="proceso">
      <div className="shell">
        <SectionHeading
          eyebrow="Proceso de trabajo"
          title="De tu objetivo al reporte fotográfico"
          lead="Seis etapas que Sonic Publicidad coordina de punta a punta, incluidas las aprobaciones de arte que cada espacio exige."
        />

        <ol className="relative mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {/* Línea de recorrido que conecta las etapas en escritorio */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-[26px] hidden h-px lg:block"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--color-line-strong) 12%, var(--color-line-strong) 88%, transparent)",
            }}
          />
          {processSteps.map((step, i) => (
            <Reveal as="li" key={step.n} delay={i * 0.06} className="relative">
              <div className="card h-full p-5">
                <div className="mb-4 flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="tabular flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border border-line-strong bg-void font-display text-[1.15rem] font-bold text-brand-soft"
                  >
                    {step.n}
                  </span>
                  <Icon name={step.icon} size={19} className="text-ink-mute" />
                </div>
                <h3 className="font-display text-[1.02rem] font-semibold">{step.title}</h3>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-dim">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
