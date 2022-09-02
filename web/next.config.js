const withPWA = require('next-pwa');
const prod = process.env.NODE_ENV === 'production'

const ContentSecurityPolicy = `
  default-src 'self' ${process.env.NEXT_PUBLIC_BASE_URL} https://*.sanity.io  https://*.googleapis.com https://*.vercel-insights.com https://*.algolia.net https://*.algolianet.com https://*.algolia.io https://*.vercel.app https://*.googleapis.com https://*.emailjs.com https://*.gstatic.com;
  script-src 'nonce-95345392085226' 'self' ${process.env.NEXT_PUBLIC_BASE_URL} data: https://*.sanity.io  https://*.googleapis.com https://*.vercel-insights.com https://*.algolia.net https://*.algolianet.com https://*.algolia.io https://*.vercel.app/* https://*.googleapis.com 'sha256-XXX' https://*.emailjs.com 'unsafe-eval';
  child-src 'self' ${process.env.NEXT_PUBLIC_BASE_URL} data: https://*.sanity.io  https://*.googleapis.com https://*.vercel-insights.com https://*.algolia.net https://*.algolianet.com https://*.algolia.io https://*.vercel.app https://*.googleapis.com https://*.emailjs.com https://*.gstatic.com;
  style-src 'self' https://*.googleapis.com 'unsafe-inline' ${process.env.NEXT_PUBLIC_BASE_URL} data: https://*.googleapis.com https://*.sanity.io  https://*.googleapis.com https://*.vercel-insights.com https://*.algolia.net https://*.algolianet.com https://*.algolia.io https://*.vercel.app https://*.googleapis.com;
  font-src 'self' https://*.gstatic.com data: https://*.googleapis.com; 
  img-src 'self' https://*.sanity.io data: https://*.googleapis.com blob: https://*.gstatic.com;
  object-src 'none';
  require-trusted-types-for 'script';
  manifest-src 'self' ${process.env.NEXT_PUBLIC_BASE_URL} data: https://*.sanity.io https://*.vercel.app,
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
