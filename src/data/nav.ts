export interface NavItem {
  label: string;
  href: string;
}

export const primaryNav: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Soluciones", href: "/soluciones/" },
  { label: "Cobertura", href: "/cobertura/" },
  { label: "Proyectos", href: "/proyectos/" },
  { label: "Nosotros", href: "/nosotros/" },
  { label: "Contacto", href: "/contacto/" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Soluciones",
    items: [
      { label: "Transporte y movilidad", href: "/soluciones/transporte-y-movilidad/" },
      { label: "DOOH y pantallas", href: "/soluciones/dooh-y-pantallas/" },
      { label: "Branding de espacios", href: "/soluciones/branding-de-espacios/" },
      { label: "Activaciones de marca", href: "/soluciones/activaciones-de-marca/" },
      { label: "Soluciones integrales", href: "/soluciones/soluciones-integrales/" },
    ],
  },
  {
    title: "Empresa",
    items: [
      { label: "Nosotros", href: "/nosotros/" },
      { label: "Cobertura nacional", href: "/cobertura/" },
      { label: "Proyectos", href: "/proyectos/" },
      { label: "Política de privacidad", href: "/privacidad/" },
    ],
  },
];
