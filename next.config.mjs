/** @type {import('next').NextConfig} */

const nextConfig = {
  // ============================================
  // PERFORMANCE OPTIMIZATION
  // ============================================

  // Enable image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },

  // Enable compression
  compress: true,

  // Optimize SWC minification
  swcMinify: true,

  // ============================================
  // EXPERIMENTAL FEATURES
  // ============================================

  // Enable React Server Components streaming
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'recharts', 'framer-motion'],
  },

  // ============================================
  // PRODUCTION SETTINGS
  // ============================================

  // Logging in production (reduce overhead)
  logging: {
    fetches: {
      fullUrl: false,
    },
  },

  // ============================================
  // SECURITY HEADERS
  // ============================================

  // Security headers (as function)
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },

  // ============================================
  // BUNDLE ANALYSIS
  // ============================================

  // Bundle analyzer configuration
  // Run: ANALYZE=true npm run build

  // ============================================
  // MISC
  // ============================================

  // React strict mode (better performance)
  reactStrictMode: true,

  // Powered by header (optional)
  // poweredByHeader: false,
};

export default nextConfig;
