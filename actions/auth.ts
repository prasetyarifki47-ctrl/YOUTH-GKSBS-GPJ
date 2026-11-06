'use server';

import { cookies } from 'next/headers';

// Ganti password admin sesuai keinginanmu
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'natal2026';

export async function loginAdmin(password: string) {
  if (password === ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    
    // Set cookie session berlaku selama 1 hari (24 jam)
    cookieStore.set('admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    return { success: true };
  }

  return { success: false, error: 'Password salah!' };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  return { success: true };
}