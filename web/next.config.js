const withPWA = require('next-pwa');
const prod = process.env.NODE_ENV === 'production'

const STUDIO_REWRITE = {
  source: "/studio/:path*",
  destination:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3333/studio/:path*"
      : "/studio/index.html",
};

module.exports = withPWA({
  images: {
    domains: ["cdn.sanity.io"],
    formats: ['image/avif', 'image/webp'],
  },
  rewrites: () => [STUDIO_REWRITE],
  swcMinify: true,
  pwa: {
    dest: 'public',
    disable: prod ? false : true
  },
});