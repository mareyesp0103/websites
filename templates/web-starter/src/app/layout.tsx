import type { Metadata, Viewport } from "next";
import "./globals.css";

// SUSTITUIR por las tipografías elegidas. Roles: una para titulares (expresión
// de marca) y otra para texto y datos (legibilidad a tamaño pequeño).
// import { Outfit, Source_Sans_3 } from "next/font/google";

export const metadata: Metadata = {
  metadataBase: new URL("https://ejemplo.com"), // SUSTITUIR
  title: { default: "Sitio", template: "%s · Sitio" },
  description: "SUSTITUIR",
};

export const viewport: Viewport = {
  themeColor: "#060b14",
  width: "device-width",
  initialScale: 1,
  // No se limita el zoom: el usuario debe poder ampliar el contenido.
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <a
          href="#contenido"
          className="btn btn-primary sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]"
        >
          Saltar al contenido
        </a>
        <main id="contenido">{children}</main>
      </body>
    </html>
  );
}
