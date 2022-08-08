/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // concurrentFeatures: true,
    // serverComponents: true,
  },
  images: {
    loader: 'imgix',
    path: 'https://example.com/myaccount/',
  },
  swcMinify: true,
}

module.exports = nextConfig
