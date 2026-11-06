import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Hanya gunakan mode export saat npm run build
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;