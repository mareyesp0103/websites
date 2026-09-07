import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { BulbMark } from "@/components/brand/SonicLogo";
import { whatsappLink, contact } from "@/data/site";

export function CtaBand() {
  return (
    <section className="relative overflow-hidden border-t border-line">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 130% at 12% 0%, var(--color-deep-dark) 0%, var(--color-surface) 55%, var(--color-void) 100%)",
        }}
      />
      {/* Barrido de luz: refuerza la idea de velocidad sin distraer del CTA */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 opacity-40 motion-reduce:hidden"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(95,216,255,0.16), transparent)",
          animation: "sonic-streak 7s var(--ease-in-out-soft) infinite",
        }}
      />

      <div className="shell relative py-20 sm:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <BulbMark className="mb-6 h-12 w-auto" />
            <h2 className="text-h1">
              Cuéntanos el objetivo.
              <br />
              Nosotros armamos la campaña.
            </h2>
            <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-ink-dim">
              Ciudad, fechas y presupuesto referencial son suficientes para empezar. Confirmamos la
              disponibilidad de cada espacio y te enviamos una propuesta con formatos, producción y
              condiciones.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/cotizar/" className="btn btn-primary">
                Solicitar una propuesta
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <a
                href={whatsappLink("Hola, quiero cotizar una campaña con Sonic Publicidad.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                <MessageCircle size={17} aria-hidden="true" />
                Hablar por WhatsApp
              </a>
            </div>
          </div>

          <div className="card p-6 lg:min-w-[280px]">
            <h3 className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-mute">
              Contacto directo
            </h3>
            <p className="mt-3 font-display text-[1.05rem] font-semibold">{contact.advisor.name}</p>
            <p className="text-[0.85rem] text-ink-mute">{contact.advisor.role}</p>
            <div className="mt-4 space-y-2 text-[0.92rem]">
              <a href={contact.phoneLink} className="nav-link tabular block">
                {contact.phoneDisplay}
              </a>
              <a href={contact.emailLink} className="nav-link block break-all">
                {contact.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
