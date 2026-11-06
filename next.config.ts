/** @type {import('next').NextConfig} */
const nextConfig = {
  /* output: 'export',  <-- HAPUS ATAU BERI KOMENTAR DENGAN // PADA BARIS INI */
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig; // atau export default nextConfig jika file .mjs