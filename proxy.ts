import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const session = request.cookies.get('admin_session');
  const { pathname } = request.nextUrl;

  // Proteksi rute /admin (kecuali /admin/login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!session || session.value !== 'authenticated') {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Jika sudah login lalu mencoba buka /admin/login, lempar ke /admin/peserta
  if (pathname === '/admin/login' && session?.value === 'authenticated') {
    return NextResponse.redirect(new URL('/admin/peserta', request.url));
  }

  return NextResponse.next();
}

// Tambahkan default export agar Next.js mengenali proxy dengan aman
export default proxy;

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};