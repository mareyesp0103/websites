import Link from "next/link";
import { Mail, Phone, MessageCircle, ArrowUp } from "lucide-react";
import { SonicLogo } from "@/components/brand/SonicLogo";
import { footerNav } from "@/data/nav";
import { contact, site, whatsappLink } from "@/data/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line bg-surface">
      {/* Barrido de luz inspirado en los destellos del bombillo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-brand) 30%, var(--color-spark) 50%, var(--color-brand) 70%, transparent)",
        }}
      />

      <div className="shell py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_repeat(2,minmax(0,0.7fr))_minmax(0,1fr)]">
          <div>
            <SonicLogo variant="full" className="h-20 w-auto" title="Sonic Publicidad" />
            <p className="mt-5 max-w-xs text-[0.95rem] text-ink-dim">
              Velocidad e innovación en activaciones de marca. Medios OOH, DOOH y experiencias
              publicitarias con ejecución en {site.countryName}.
            </p>
          </div>

          {footerNav.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="font-display text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-ink-mute">
                {col.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {col.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="nav-link text-[0.92rem]">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="font-display text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-ink-mute">
              Contacto
            </h2>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={contact.emailLink}
                  className="nav-link gap-2 text-[0.92rem] break-all"
                >
                  <Mail size={15} aria-hidden="true" className="shrink-0" />
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={contact.phoneLink} className="nav-link gap-2 text-[0.92rem]">
                  <Phone size={15} aria-hidden="true" className="shrink-0" />
                  <span className="tabular">{contact.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink("Hola, quiero información sobre los servicios de Sonic Publicidad.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link gap-2 text-[0.92rem]"
                >
                  <MessageCircle size={15} aria-hidden="true" className="shrink-0" />
                  WhatsApp
                </a>
              </li>
            </ul>
            <p className="mt-4 text-sm text-ink-mute">
              {contact.advisor.name}
              <span className="block text-[0.8rem]">{contact.advisor.role}</span>
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.82rem] text-ink-mute">
            © {year} {site.legalName}. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/privacidad/" className="nav-link text-[0.82rem]">
              Política de privacidad
            </Link>
            <a href="#contenido" className="btn btn-quiet btn-sm">
              <ArrowUp size={14} aria-hidden="true" />
              Volver arriba
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
