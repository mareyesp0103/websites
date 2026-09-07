import type { MetadataRoute } from "next";
import { families } from "@/data/families";
import { formats } from "@/data/formats";
import { familyById } from "@/data/families";
import { site } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = site.url.replace(/\/$/, "");

  const staticRoutes: { path: string; priority: number; freq: "weekly" | "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, freq: "weekly" },
    { path: "/soluciones/", priority: 0.9, freq: "monthly" },
    { path: "/cobertura/", priority: 0.8, freq: "monthly" },
    { path: "/proyectos/", priority: 0.8, freq: "monthly" },
    { path: "/nosotros/", priority: 0.6, freq: "yearly" },
    { path: "/cotizar/", priority: 0.9, freq: "monthly" },
    { path: "/contacto/", priority: 0.7, freq: "monthly" },
    { path: "/privacidad/", priority: 0.2, freq: "yearly" },
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: `${base}${r.path}`,
      lastModified: now,
      changeFrequency: r.freq,
      priority: r.priority,
    })),
    ...families.map((f) => ({
      url: `${base}/soluciones/${f.slug}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...formats.map((f) => ({
      url: `${base}/soluciones/${familyById[f.family].slug}/${f.slug}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
