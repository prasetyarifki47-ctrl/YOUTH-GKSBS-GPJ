import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // MEWAJIBKAN NEXT.JS MENGELUARKAN FOLDER ./out/
  trailingSlash: true, // Mencegah error 403 saat refresh halaman di cPanel
  images: {
    unoptimized: true, // Wajib diaktifkan jika menggunakan Static Export
  },
};

export default nextConfig;