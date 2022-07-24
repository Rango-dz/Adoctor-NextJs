const STUDIO_REWRITE = {
  source: "/studio/:path*",
  destination:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3333/studio/:path*"
      : "/studio/index.html",
};

module.exports = {
  images: {
    domains: ['cdn.sanity.io'],
    formats: ['image/avif', 'image/webp'],
  },
  rewrites: () => [STUDIO_REWRITE],
  swcMinify: true,
};

