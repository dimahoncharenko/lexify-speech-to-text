import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Strict mode forces components render twice, so it may break some functionality
  reactStrictMode: false,
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lottie.host',
      },
    ],
  },
}

export default nextConfig
