/** @type {import('next').NextConfig} */
const nextConfig = {
  // ─── Dynamic Vercel Deployment ─────────────────────────────
  // (Removed static export to support SSR/Edge Functions)

  // ─── REQUIRED for static export ──────────────────────────────────────────
  // Next.js Image Optimization is incompatible with output:'export'
  images: {
    unoptimized: true,
  },

  // ─── Base path when deploying to a sub-path (e.g. github.io/repo-name) ──
  // Leave as '' when using a custom domain (prathamone.com)
  basePath: '',

  // ─── Trailing slash — GitHub Pages serves index.html from directories ────
  trailingSlash: true,

  // ─── Strict mode for better DX ───────────────────────────────────────────
  reactStrictMode: true,
};

export default nextConfig;
