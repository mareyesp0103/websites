import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { BASE_PATH } from "@/lib/paths";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // En una vista previa bajo subdirectorio se bloquea el rastreo completo.
  if (BASE_PATH) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url.replace(/\/$/, "")}/sitemap.xml`,
  };
}
