import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ELIMINA TODO ESTO si existe:
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  
  // DEJA SOLO esto:
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'media.istockphoto.com',
      },
    ],
  },
};

export default nextConfig;