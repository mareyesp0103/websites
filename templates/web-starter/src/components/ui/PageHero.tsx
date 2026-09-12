import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Media } from "@/components/ui/Media";

interface Crumb {
  label: string;
  href?: string;
}

interface Props {
  eyebrow?: string;
  title: string;
  lead?: string;
  /** Slug del manifiesto para el fondo; opcional. */
  image?: string;
  breadcrumbs?: Crumb[];
  children?: React.ReactNode;
}

export function PageHero({ eyebrow, title, lead, image, breadcrumbs, children }: Props) {
  return (
    <section className="relative overflow-hidden pt-[calc(var(--header-h)+3rem)] pb-14 sm:pb-16">
      {image && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <Media slug={image} alt="" priority sizes="100vw" className="h-full w-full object-cover opacity-25" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(6,11,20,0.9) 0%, rgba(6,11,20,0.8) 45%, var(--color-void) 96%)",
            }}
          />
        </div>
      )}

      <div className="shell">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Ruta de navegación" className="mb-5">
            <ol className="flex flex-wrap items-center gap-1.5 text-[0.82rem] text-ink-mute">
              {breadcrumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight size={13} aria-hidden="true" />}
                  {c.href ? (
                    <Link href={c.href} className="nav-link text-[0.82rem]">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-ink-dim">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {eyebrow && (
          <p className="eyebrow mb-3">
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 rounded-full bg-spark"
              style={{ boxShadow: "var(--glow-spark)" }}
            />
            {eyebrow}
          </p>
        )}
        <h1 className="text-h1 max-w-3xl">{title}</h1>
        {lead && <p className="mt-5 max-w-2xl text-[1.08rem] leading-relaxed text-ink-dim">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
