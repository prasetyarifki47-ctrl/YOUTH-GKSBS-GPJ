'use server';

import { prisma } from '@/lib/prisma';

export async function registerNatal(formData: {
  fullName: string;
  church: string;
}) {
  try {
    const { fullName, church } = formData;

    if (!fullName || !church) {
      return { success: false, error: 'Nama Lengkap dan Asal Gereja wajib diisi!' };
    }

    // Generate kode tiket unik (contoh: NT-8K2P9)
    const ticketCode = `NT-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    // Simpan ke MySQL cPanel
    const registration = await prisma.natalRegistration.create({
      data: {
        ticketCode,
        fullName,
        church,
      },
    });

    return {
      success: true,
      data: registration,
    };
  } catch (error) {
    console.error('Registration Error:', error);
    return {
      success: false,
      error: 'Gagal melakukan pendaftaran. Silakan coba lagi.',
    };
  }
}