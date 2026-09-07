"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/data/site";

/** Acceso flotante a WhatsApp; aparece al superar el hero. */
export function WhatsAppFab() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <aside aria-label="Contacto rápido">
      <a
      href={whatsappLink("Hola, quiero cotizar una campaña con Sonic Publicidad.")}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-5 right-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand-fill text-white shadow-[var(--shadow-lift)] transition-all duration-[var(--dur-base)] hover:bg-brand-fill-hover ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
      style={{ zIndex: "var(--z-drawer)" }}
    >
        <MessageCircle size={24} aria-hidden="true" />
        <span className="sr-only">Escribir por WhatsApp a Sonic Publicidad</span>
      </a>
    </aside>
  );
}
