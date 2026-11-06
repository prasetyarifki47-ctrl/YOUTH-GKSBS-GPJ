'use server';

import { prisma } from '@/lib/prisma';

export async function processCheckIn(ticketCode: string) {
  try {
    if (!ticketCode) {
      return { success: false, error: 'Kode tiket tidak valid.' };
    }

    // 1. Cari data pendaftar berdasarkan ticketCode
    const registration = await prisma.natalRegistration.findUnique({
      where: { ticketCode: ticketCode.trim().toUpperCase() },
    });

    if (!registration) {
      return { success: false, error: 'Data pendaftar tidak ditemukan!' };
    }

    // 2. Cek apakah sudah pernah scan / absen sebelumnya
    if (registration.statusAttended) {
      return {
        success: false,
        alreadyAttended: true,
        error: `Peserta atas nama ${registration.fullName} (${registration.church}) SUDAH ABSEN sebelumnya!`,
        data: registration,
      };
    }

    // 3. Update statusAttended menjadi true
    const updated = await prisma.natalRegistration.update({
      where: { ticketCode: registration.ticketCode },
      data: { statusAttended: true },
    });

    return {
      success: true,
      message: `Berhasil Absen: ${updated.fullName}`,
      data: updated,
    };
  } catch (error) {
    console.error('Error during check-in:', error);
    return { success: false, error: 'Terjadi kesalahan sistem database.' };
  }
}

export async function getAttendanceStats() {
  try {
    const total = await prisma.natalRegistration.count();
    const attended = await prisma.natalRegistration.count({
      where: { statusAttended: true },
    });
    return { total, attended };
  } catch (error) {
    return { total: 0, attended: 0 };
  }
}

export async function getAllRegistrations() {
  try {
    const list = await prisma.natalRegistration.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return { success: true, data: list };
  } catch (error) {
    console.error('Error fetching registrations:', error);
    return { success: false, data: [] };
  }
}