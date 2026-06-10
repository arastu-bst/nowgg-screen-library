/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Design-only handoff: serve local + remote now.gg assets unoptimized.
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: '**.now.gg' },
      { protocol: 'https', hostname: '**.nowgg.cdn.bluestacks.com' },
    ],
  },
}

module.exports = nextConfig
