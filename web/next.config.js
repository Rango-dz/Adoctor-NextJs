const withPWA = require('next-pwa');
const prod = process.env.NODE_ENV === 'production'

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self';
  child-src ${process.env.NEXT_PUBLIC_BASE_URL};
  style-src 'self' ${process.env.NEXT_PUBLIC_BASE_URL};
  font-src 'self';  
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
          }
        ],
      },
    ]
  },
});