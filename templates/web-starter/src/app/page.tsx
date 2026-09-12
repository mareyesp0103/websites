import { Section, SectionHeading } from "@/components/ui/Section";

export default function HomePage() {
  return (
    <Section bordered={false}>
      <div className="shell">
        <SectionHeading
          as="h1"
          eyebrow="Plantilla"
          title="Punto de partida"
          lead="Sustituir por el contenido real. Empezar por la Fase 0: extraer la fuente antes de escribir componentes."
        />
      </div>
    </Section>
  );
}
