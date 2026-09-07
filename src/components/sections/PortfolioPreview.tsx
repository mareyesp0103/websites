import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { Section, SectionHeading } from "@/components/ui/Section";

export function PortfolioPreview() {
  return (
    <Section id="proyectos" className="bg-surface">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Portafolio"
            title="Campañas ejecutadas"
            lead="Arcos, pantallas, vallas móviles y activaciones documentadas en el catálogo de Sonic Publicidad."
            className="mb-0"
          />
          <Link href="/proyectos/" className="btn btn-ghost btn-sm">
            Ver todos los proyectos
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10">
          <PortfolioGrid limit={9} headingHidden />
        </div>
      </div>
    </Section>
  );
}
