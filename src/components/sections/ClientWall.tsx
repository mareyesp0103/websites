import { clients } from "@/data/clients";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

/**
 * Catálogo de clientes publicado en el material comercial de Sonic Publicidad.
 * Retícula estática y sin desplazamiento automático: no hay carrusel que pausar
 * ni movimiento que un usuario deba poder detener.
 */
export function ClientWall() {
  return (
    <Section spacing="tight">
      <div className="shell">
        <div className="text-center">
          <h2 className="eyebrow">Marcas que hemos activado</h2>
        </div>
        <ul className="mt-8 grid grid-cols-3 items-center gap-x-6 gap-y-8 sm:grid-cols-4 lg:grid-cols-6">
          {clients.map((c, i) => (
            <Reveal as="li" key={c.file} delay={Math.min(i, 11) * 0.03} y={10} className="min-w-0">
              {/*
                El logotipo se limita por alto óptico y por el ancho de la celda:
                `max-w-full` impide que una marca muy apaisada desborde la
                retícula en pantallas estrechas.
              */}
              <img
                src={`/brand/clients/${c.file}`}
                alt={c.name}
                loading="lazy"
                decoding="async"
                className="mx-auto block h-auto w-auto max-w-full object-contain opacity-75 transition-opacity duration-[var(--dur-base)] hover:opacity-100"
                style={{ maxHeight: `${Math.round(30 * (c.scale ?? 1))}px` }}
              />
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
