import { strengths } from "@/data/process";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";

export function WhySonic() {
  return (
    <Section id="por-que-sonic" className="bg-surface">
      <div className="shell">
        <SectionHeading
          eyebrow="Por qué Sonic"
          title="Lo que sí podemos comprometer"
          lead="Sin promesas de audiencia que no medimos ni cifras de satisfacción que no existen. Estas son las capacidades que el equipo ejecuta en cada campaña."
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {strengths.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.05}>
              <div className="card card-interactive h-full p-5">
                <span
                  aria-hidden="true"
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-[var(--radius-sm)] border border-line-strong bg-surface-2 text-brand-soft"
                >
                  <Icon name={s.icon} size={20} />
                </span>
                <h3 className="font-display text-[1.05rem] font-semibold">{s.title}</h3>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-dim">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
