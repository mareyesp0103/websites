import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    // Static export ships pre-generated WebP variants from /public/media,
    // so Next's on-demand optimizer is not used.
    unoptimized: true,
  },
};

export default nextConfig;
