"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { primaryNav } from "@/data/nav";
import { SonicLogo, BulbMark } from "@/components/brand/SonicLogo";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // El menú móvil se cierra al navegar.
  useEffect(() => setOpen(false), [pathname]);

  // Escape cierra el menú y devuelve el foco al botón que lo abrió.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className="fixed inset-x-0 top-0 transition-colors duration-300"
      style={{ zIndex: "var(--z-header)" }}
      data-scrolled={scrolled}
    >
      <div
        className={`transition-all duration-300 ${
          scrolled || open
            ? "border-b border-line bg-void/92 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="shell flex items-center justify-between gap-4" style={{ minHeight: "var(--header-h)" }}>
          <Link
            href="/"
            className="group flex items-center py-2"
            aria-label="Sonic Publicidad — ir al inicio"
          >
            {/*
              Continuidad de marca, no repetición: al hacer scroll el logotipo
              completo cede el lugar al bombillo, que ya venía acompañando la
              narrativa desde el hero. Sólo uno de los dos está presente.
            */}
            {scrolled ? (
              <BulbMark
                className="h-9 w-auto shrink-0 transition-transform duration-300 group-hover:-rotate-6"
                title="Sonic Publicidad"
              />
            ) : (
              <SonicLogo className="h-8 w-auto shrink-0" title="Sonic Publicidad" />
            )}
          </Link>

          <nav aria-label="Navegación principal" className="hidden items-center gap-7 lg:flex">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link"
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/cotizar/" className="btn btn-primary btn-sm hidden sm:inline-flex">
              Cotizar campaña
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="btn btn-quiet flex h-11 w-11 items-center justify-center p-0 lg:hidden"
              aria-expanded={open}
              aria-controls="menu-movil"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
            >
              {open ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <div
        id="menu-movil"
        ref={panelRef}
        hidden={!open}
        className="border-b border-line bg-void/98 backdrop-blur-xl lg:hidden"
      >
        <nav aria-label="Navegación móvil" className="shell flex flex-col py-3">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link min-h-[48px] items-center border-b border-line/60 last:border-0"
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/cotizar/" className="btn btn-primary mt-4 mb-2 w-full">
            Cotizar campaña
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
