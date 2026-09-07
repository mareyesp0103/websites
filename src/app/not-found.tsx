import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";
import { BulbMark } from "@/components/brand/SonicLogo";
import { primaryNav } from "@/data/nav";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70dvh] items-center overflow-hidden pt-[calc(var(--header-h)+3rem)] pb-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 surface-grid opacity-40"
        style={{
          maskImage: "radial-gradient(60% 60% at 50% 40%, black, transparent)",
          WebkitMaskImage: "radial-gradient(60% 60% at 50% 40%, black, transparent)",
        }}
      />
      <div className="shell relative text-center">
        <BulbMark className="mx-auto h-20 w-auto opacity-90" />
        <p className="eyebrow mt-8 justify-center">Error 404</p>
        <h1 className="text-h1 mx-auto mt-3 max-w-xl">Esta página se salió del recorrido</h1>
        <p className="mx-auto mt-5 max-w-lg text-[1.05rem] text-ink-dim">
          El enlace no existe o cambió de dirección. Desde aquí puedes volver al inicio o ir directo
          al catálogo de soluciones.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary">
            <Home size={16} aria-hidden="true" />
            Volver al inicio
          </Link>
          <Link href="/soluciones/" className="btn btn-ghost">
            Ver soluciones
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <nav aria-label="Enlaces principales" className="mt-12">
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="nav-link text-[0.9rem]">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
