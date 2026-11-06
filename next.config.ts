/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true, // <-- TAMBAH BARIS INI
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;