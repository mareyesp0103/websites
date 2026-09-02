# Sonic Publicidad — sitio web

Sitio estático (HTML + Tailwind CSS + GSAP) para Sonic Publicidad, operador de publicidad OOH/DOOH en Ecuador.

## Desarrollo

```bash
npm install
npm run watch:css   # recompila assets/css/style.css al editar src/input.css
```

Abre `index.html` directamente en el navegador o sírvelo con cualquier servidor estático (`npx serve .`).

## Build

```bash
npm run build:css
```

Genera `assets/css/style.css` minificado. Este archivo se versiona en el repo, así que el sitio funciona sin paso de build en el hosting final (solo archivos estáticos: `index.html`, `assets/`).

## Contenido

El contenido de servicios, cobertura y contacto proviene del brochure oficial (agosto 2026). Pendiente antes de publicar:

- Logo real en SVG (actualmente hay una marca provisional).
- Fotografía/video real de vallas, pantallas y activaciones (el portafolio usa placeholders).
- Logos y resultados de casos de éxito reales, con autorización del cliente.
- Confirmar si "Tecnología" debe incluir capacidades adicionales (analítica, geolocalización, programmatic DOOH) una vez validadas — el brochure actual no las evidencia.
- Dominio y hosting definitivos.
