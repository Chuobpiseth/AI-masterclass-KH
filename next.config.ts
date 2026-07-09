import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // Strict mode
  reactStrictMode: true,

  // Allow MDX extensions
  pageExtensions: ["ts", "tsx", "md", "mdx"],

  // Enable Turbopack (Next.js 16 default)
  turbopack: {},

  // Static HTML export
  output: "export",
};

export default nextConfig;
