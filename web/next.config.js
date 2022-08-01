const withPWA = require('next-pwa');

const STUDIO_REWRITE = {
  source: "/studio/:path*",
  destination:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3333/studio/:path*"
      : "/studio/index.html",
};

module.exports = {
  images: {
    domains: ['cdn.sanity.io', 'adoctor-next-js.vercel.app', '/'],
    formats: ['image/avif', 'image/webp'],
  },
  rewrites: () => [STUDIO_REWRITE],
  swcMinify: true,
};

module.exports = withPWA({
  pwa: {
    dest: 'public',
    swSrc: 'sw.js',
  },
});