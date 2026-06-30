import type { NextConfig } from "next";

// BACKEND_URL is a server-side variable - safe to use in next.config.ts rewrites.
// In production (Vercel), this defaults to the Render backend.
// For local dev, set BACKEND_URL=http://127.0.0.1:8000 in .env.local
const BACKEND_URL = process.env.BACKEND_URL || "https://vc-scope-os.onrender.com";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${BACKEND_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
