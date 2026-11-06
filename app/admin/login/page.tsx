'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Password admin default (bisa kamu sesuaikan)
    const SECRET_PASSWORD = 'natal2026';

    if (password === SECRET_PASSWORD) {
      // Simpan session admin sederhana via cookie browser / localStorage
      document.cookie = "admin_session=true; path=/; max-age=86400;";
      localStorage.setItem('admin_logged_in', 'true');
      
      // Redirect ke dashboard admin
      router.push('/admin');
    } else {
      setError('Password yang kamu masukkan salah!');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F3EC] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl border border-[#3b3028]/10 shadow-lg space-y-6">
        <div className="text-center space-y-2">
          <h1 className="font-heading text-2xl font-bold text-[#3b3028]">
            Admin Login 🔒
          </h1>
          <p className="text-xs text-[#6F6860]">
            Masukkan password untuk mengelola data peserta Natal 2026.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-xl text-xs font-medium border border-red-200 text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase mb-1 text-[#3b3028]">
              Password Admin
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password..."
              className="w-full px-4 py-3 bg-[#F7F3EC]/50 border border-[#3b3028]/20 rounded-xl text-sm text-[#2E2A26] focus:outline-none focus:ring-2 focus:ring-amber-500/30"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#3b3028] hover:bg-[#3b3028]/90 text-white font-bold py-3.5 rounded-xl text-xs transition shadow-md disabled:opacity-50"
          >
            {loading ? 'Memverifikasi...' : 'Masuk Dashboard'}
          </button>
        </form>
      </div>
    </main>
  );
}