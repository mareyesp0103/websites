import type { NextConfig } from "next";

// Vacío en un dominio propio; en una vista previa bajo subdirectorio
// (GitHub Pages) lleva el prefijo, p. ej. "/<repositorio>".
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

const nextConfig: NextConfig = {
  output: "export",
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  trailingSlash: true,
  images: {
    // Static export ships pre-generated WebP variants from /public/media,
    // so Next's on-demand optimizer is not used.
    unoptimized: true,
  },
};

export default nextConfig;
