/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    swcMinify: true,
    // concurrentFeatures: true,
    // serverComponents: true,
  },
}

module.exports = nextConfig
