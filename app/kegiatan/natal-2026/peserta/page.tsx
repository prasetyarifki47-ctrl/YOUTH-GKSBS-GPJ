'use client';

import { useEffect, useState } from 'react';

interface Participant {
  id: number;
  ticketCode: string;
  fullName: string;
  church: string;
  statusAttended: number;
  createdAt: string;
}

export default function PesertaNatalPage() {
  const [pin, setPin] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [pinError, setPinError] = useState('');

  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  // Verifikasi PIN Admin
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === 'natal2026') {
      setIsAuthorized(true);
      setPinError('');
    } else {
      setPinError('PIN Admin Salah!');
    }
  };

  const fetchParticipants = async () => {
    setLoading(true);
    setError('');
    try {
      const API_URL =
        process.env.NODE_ENV === 'development'
          ? 'https://youthgksbsgpj.web.id/api/get_participants.php'
          : '/api/get_participants.php';

      const response = await fetch(API_URL);
      const res = await response.json();

      if (response.ok && res.success) {
        setParticipants(res.data || []);
      } else {
        setError(res.message || 'Gagal mengambil data peserta.');
      }
    } catch (err: any) {
      setError('Gagal menghubungkan ke server cPanel.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthorized) {
      fetchParticipants();
    }
  }, [isAuthorized]);

  const filtered = participants.filter(
    (p) =>
      p.fullName.toLowerCase().includes(search.toLowerCase()) ||
      p.church.toLowerCase().includes(search.toLowerCase()) ||
      p.ticketCode.toLowerCase().includes(search.toLowerCase())
  );

  const totalAttended = participants.filter((p) => p.statusAttended === 1).length;

  // TAMPILAN FORM LOGIN ADMIN
  if (!isAuthorized) {
    return (
      <main className="min-h-screen pt-28 sm:pt-32 pb-12 px-4 max-w-md mx-auto">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-[#3b3028]/10 shadow-lg text-center space-y-4">
          <div className="text-3xl">🔒</div>
          <h1 className="font-heading text-lg font-bold text-[#3b3028]">
            Akses Data Peserta
          </h1>
          <p className="text-xs text-[#3b3028]/70">
            Masukkan PIN Admin untuk melihat database peserta terdaftar.
          </p>

          <form onSubmit={handleLogin} className="space-y-3">
            {pinError && (
              <div className="p-2 bg-red-100 text-red-800 rounded-xl text-xs font-semibold">
                {pinError}
              </div>
            )}
            <input
              type="password"
              placeholder="Masukkan PIN Admin..."
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#f8f5f1] border border-[#3b3028]/20 rounded-xl text-xs text-center font-bold tracking-widest text-[#3b3028] focus:outline-none"
            />
            <button
              type="submit"
              className="w-full bg-[#3b3028] text-white font-bold py-2.5 rounded-xl text-xs"
            >
              Lihat Data Peserta 🚀
            </button>
          </form>
        </div>
      </main>
    );
  }

  // TAMPILAN DAFTAR PESERTA
  return (
    <main className="min-h-screen pt-28 sm:pt-32 pb-12 px-4 max-w-4xl mx-auto space-y-4">
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 md:p-6 border border-[#3b3028]/10 shadow-lg space-y-4 overflow-hidden">
        
        {/* HEADER & RINGKASAN */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#3b3028]/10 pb-4">
          <div>
            <span className="inline-block px-3 py-0.5 bg-amber-100 text-amber-900 rounded-full text-[10px] font-bold tracking-widest uppercase">
              📋 Database Peserta
            </span>
            <h1 className="font-heading text-lg md:text-xl font-bold text-[#3b3028] mt-1">
              Daftar Peserta Natal Pemuda 2026
            </h1>
          </div>

          <div className="flex gap-2 text-center text-xs">
            <div className="px-3 py-2 bg-[#f8f5f1] rounded-2xl border border-[#3b3028]/10 flex-1 md:flex-none">
              <p className="text-[10px] text-[#3b3028]/60 font-semibold uppercase">Total Terdaftar</p>
              <p className="text-base font-bold text-[#3b3028]">{participants.length}</p>
            </div>
            <div className="px-3 py-2 bg-emerald-50 rounded-2xl border border-emerald-200 flex-1 md:flex-none">
              <p className="text-[10px] text-emerald-800 font-semibold uppercase">Sudah Absen</p>
              <p className="text-base font-bold text-emerald-900">{totalAttended}</p>
            </div>
          </div>
        </div>

        {/* INPUT PENCARIAN & BOTON REFRESH */}
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Cari nama, gereja, atau kode tiket..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-3.5 py-2.5 bg-[#f8f5f1]/50 border border-[#3b3028]/20 rounded-xl text-xs text-[#3b3028] focus:outline-none focus:ring-2 focus:ring-amber-500/30"
          />
          <button
            onClick={fetchParticipants}
            disabled={loading}
            className="px-4 py-2.5 bg-[#3b3028] text-white rounded-xl text-xs font-bold hover:bg-[#3b3028]/90 transition disabled:opacity-50"
          >
            {loading ? 'Memuat...' : 'Refresh 🔄'}
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs rounded-xl text-center">
            {error}
          </div>
        )}

        {/* TABEL RESPONSIVE */}
        <div className="w-full overflow-x-auto rounded-2xl border border-[#3b3028]/10">
          <table className="w-full text-left text-xs text-[#3b3028] min-w-[550px]">
            <thead className="bg-[#f8f5f1] border-b border-[#3b3028]/10 text-[11px] font-bold uppercase">
              <tr>
                <th className="p-3">No</th>
                <th className="p-3">Kode Tiket</th>
                <th className="p-3">Nama Lengkap</th>
                <th className="p-3">Asal Gereja</th>
                <th className="p-3 text-center">Status Absensi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3b3028]/10">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-[#3b3028]/60">
                    Mengambil data peserta dari database...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-[#3b3028]/60">
                    Tidak ada data peserta yang ditemukan.
                  </td>
                </tr>
              ) : (
                filtered.map((p, idx) => (
                  <tr key={p.id || idx} className="hover:bg-[#f8f5f1]/40 transition">
                    <td className="p-3 font-semibold">{idx + 1}</td>
                    <td className="p-3 font-mono font-bold text-amber-900">{p.ticketCode}</td>
                    <td className="p-3 font-medium">{p.fullName}</td>
                    <td className="p-3">{p.church}</td>
                    <td className="p-3 text-center">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          p.statusAttended === 1
                            ? 'bg-emerald-100 text-emerald-900'
                            : 'bg-amber-100 text-amber-900'
                        }`}
                      >
                        {p.statusAttended === 1 ? 'Sudah Hadir' : 'Belum Absen'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </main>
  );
}