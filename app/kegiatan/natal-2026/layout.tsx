import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pendaftaran Peserta Natal Pemuda/i Klasis Pugung Raharjo 2026',
  description: 'Formulir Pendaftaran Resmi & Absensi Digital Natal Pemuda/i Klasis Pugung Raharjo 2026.',
  openGraph: {
    title: 'Pendaftaran Peserta Natal Pemuda Klasis Pugung Raharjo 2026',
    description: 'Daftarkan dirimu dan dapatkan Absensi QR Code Resmi Natal Pemuda Klasis 2026!',
    images: ['/images/natal-gabungan-2026.png'],
  },
};

export default function NatalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}