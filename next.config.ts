import type { NextConfig } from "next";

// Static HTML export in out/, served by Cloudflare Workers static assets (wrangler.jsonc).
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
