import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        pathname: '/images/I/**',
      },
      {
        protocol: 'https',
        hostname: 'www.lidl.es',
        pathname: '/media/product/**'
      },
      {
        protocol: 'https',
        hostname: 'www.vertbaudet.es',
        pathname: '/fstrz/r/s/media.vertbaudet.es/Pictures/vertbaudet/**'
      }
    ],
  },
};

export default nextConfig;
