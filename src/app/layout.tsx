import type { Metadata, Viewport } from "next";
import { Outfit, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BrandIntro } from "@/components/brand/BrandIntro";
import { BrandSprite } from "@/components/brand/SonicLogo";
import { WhatsAppFab } from "@/components/ui/WhatsAppFab";
import { site, contact } from "@/data/site";

/**
 * Outfit — geométrica y de terminaciones circulares, es la familia
 * tipográfica más cercana al logotipo SONIC: los titulares leen como una
 * extensión de la marca y no como una plantilla.
 */
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

/**
 * Source Sans 3 — humanista, de aperturas abiertas y altura de x generosa.
 * Sostiene la legibilidad de medidas, spots y segundaje a 14–16 px en móvil,
 * donde una geométrica se cierra.
 */
const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-source",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Sonic Publicidad — Publicidad OOH y DOOH en Ecuador",
    template: "%s · Sonic Publicidad",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "publicidad OOH Ecuador",
    "publicidad exterior Ecuador",
    "medios DOOH Ecuador",
    "pantallas publicitarias Ecuador",
    "publicidad en centros comerciales",
    "publicidad Metro de Quito",
    "activaciones de marca Ecuador",
    "publicidad móvil Quito Guayaquil",
    "proveedor de medios publicitarios",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_EC",
    url: site.url,
    siteName: site.name,
    title: "Sonic Publicidad — Activamos marcas en movimiento",
    description: site.description,
    images: [{ url: "/media/bg-velocidad-1600.webp", width: 1600, height: 897, alt: "Sonic Publicidad" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sonic Publicidad — Activamos marcas en movimiento",
    description: site.description,
    images: ["/media/bg-velocidad-1600.webp"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/brand/sonic-bulb.svg", type: "image/svg+xml" }],
    apple: "/brand/sonic-bulb.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#060b14",
  width: "device-width",
  initialScale: 1,
  // No se limita el zoom: el usuario debe poder ampliar el contenido.
};

/** Datos estructurados: sólo información confirmada por el material comercial. */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description: site.description,
  url: site.url,
  slogan: site.tagline,
  email: contact.email,
  telephone: `+${contact.phoneE164}`,
  areaServed: { "@type": "Country", name: "Ecuador" },
  address: { "@type": "PostalAddress", addressCountry: "EC" },
  knowsLanguage: "es",
  logo: `${site.url}/brand/sonic-logo.svg`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-EC" className={`${outfit.variable} ${sourceSans.variable}`}>
      <head>
        {/*
          Se ejecuta antes del primer pintado: si la secuencia de marca ya se
          vio en esta sesión, el velo nunca llega a mostrarse.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{if(sessionStorage.getItem("sonic:intro-seen")==="1")document.documentElement.dataset.introSeen="1"}catch(e){}',
          }}
        />
      </head>
      <body>
        <div id="brand-veil" aria-hidden="true" />
        <script
          type="application/ld+json"
          // Contenido propio y estático: no proviene de entrada de usuario.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <a
          href="#contenido"
          className="btn btn-primary sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]"
        >
          Saltar al contenido
        </a>
        <BrandSprite />
        <BrandIntro />
        <SiteHeader />
        <main id="contenido">{children}</main>
        <SiteFooter />
        <WhatsAppFab />
      </body>
    </html>
  );
}
