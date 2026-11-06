'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAdmin } from '@/actions/auth';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await loginAdmin(password);

    if (res.success) {
      router.push('/admin/peserta');
      router.refresh();
    } else {
      setError(res.error || 'Terjadi kesalahan');
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen pt-32 pb-16 px-4 bg-gradient-to-br from-amber-50/50 via-slate-50 to-blue-50/30 flex justify-center items-center">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl border border-slate-100 p-6 space-y-6">
        
        <div className="text-center space-y-1">
          <span className="inline-block text-[10px] font-bold tracking-widest uppercase bg-amber-100 text-amber-800 px-3 py-1 rounded-full mb-1">
            Khusus Panitia
          </span>
          <h1 className="text-xl font-extrabold text-slate-800">
            Login Admin / Scanner
          </h1>
          <p className="text-xs text-slate-500">Masukkan password untuk mengakses halaman manajemen.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-medium border border-red-200 text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Password Admin
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl text-xs font-bold transition shadow-sm disabled:opacity-50"
          >
            {loading ? 'Memeriksa...' : 'Masuk Dashboard'}
          </button>
        </form>

      </div>
    </main>
  );
}