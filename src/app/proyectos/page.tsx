import type { Metadata } from "next";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { CtaBand } from "@/components/sections/CtaBand";
import { ClientWall } from "@/components/sections/ClientWall";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { projects } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Proyectos y campañas ejecutadas",
  description:
    "Portafolio de Sonic Publicidad: arcos en centros comerciales, branding en el Metro de Quito, pantallas DOOH, vallas móviles, bicibanners y activaciones de marca en Ecuador.",
  alternates: { canonical: "/proyectos/" },
};

export default function ProyectosPage() {
  return (
    <>
      <PageHero
        eyebrow="Portafolio"
        title="Campañas que ya salieron a la calle"
        lead={`${projects.length} ejecuciones documentadas en el catálogo de Sonic Publicidad, con el formato empleado en cada una. Filtra por tipo de medio para ver lo que se parece a tu campaña.`}
        image="bg-avenida"
        breadcrumbs={[{ label: "Inicio", href: "/" }, { label: "Proyectos" }]}
      />

      <Section spacing="tight" bordered={false}>
        <div className="shell">
          <PortfolioGrid />
        </div>
      </Section>

      <ClientWall />
      <CtaBand />
    </>
  );
}
