const withPWA = require('next-pwa');
const prod = process.env.NODE_ENV === 'production'

const ContentSecurityPolicy = `
  default-src 'self' https://cdn.sanity.io data: https://maps.googleapis.com https://vitals.vercel-insights.com;
  script-src 'self' https://vitals.vercel-insights.com https://cdn.sanity.io data: https://maps.googleapis.com;
  child-src 'self' ${process.env.NEXT_PUBLIC_BASE_URL} data:;
  style-src 'self' https://fonts.googleapis.com 'unsafe-inline' ${process.env.NEXT_PUBLIC_BASE_URL} data: https://maps.googleapis.com;
  font-src 'self' https://fonts.gstatic.com data: https://maps.googleapis.com; 
  img-src 'self' https://cdn.sanity.io data: https://maps.googleapis.com;
  manifest-src 'self',
`

const STUDIO_REWRITE = {
  source: "/studio/:path*",
  destination:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3333/studio/:path*"
      : "/studio/index.html",
};

module.exports = withPWA({
  images: {
    domains: ["cdn.sanity.io", "ui-avatars.com", "lh3.googleusercontent.com"],
    formats: ['image/avif', 'image/webp'],
  },
  rewrites: () => [STUDIO_REWRITE],
  swcMinify: true,
  pwa: {
    dest: 'public',
    disable: prod ? false : true
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Content-Security-Policy',
            value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ],
      },
    ]
  },
});