'use client';

import { useEffect, useState, useMemo } from 'react';

interface Participant {
  id: number;
  ticketCode: string;
  fullName: string;
  church: string;
  statusAttended: number;
  createdAt: string;
}

const ITEMS_PER_PAGE = 10;

export default function PesertaNatalPage() {
  const [pin, setPin] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [pinError, setPinError] = useState('');

  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChurchFilter, setSelectedChurchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'attended' | 'not_attended'>('all');
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState(1);

  // Auto-login selama sesi tab browser masih aktif
  useEffect(() => {
    const savedAuth = sessionStorage.getItem('natal2026_auth');
    if (savedAuth === 'true') {
      setIsAuthorized(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === 'natal2026') {
      setIsAuthorized(true);
      sessionStorage.setItem('natal2026_auth', 'true');
      setPinError('');
    } else {
      setPinError('PIN Admin Salah!');
    }
  };

  const fetchParticipants = async () => {
    setLoading(true);
    try {
      const API_URL =
        process.env.NODE_ENV === 'development'
          ? 'https://youthgksbsgpj.web.id/api/get_participants.php'
          : '/api/get_participants.php';

      const res = await fetch(`${API_URL}?t=${Date.now()}`, { cache: 'no-store' });
      const data = await res.json();

      if (data.success && Array.isArray(data.data)) {
        setParticipants(data.data);
      } else {
        setParticipants([]);
      }
    } catch (err) {
      console.error('Gagal mengambil data peserta:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthorized) {
      fetchParticipants();
    }
  }, [isAuthorized]);

  const handleToggleManual = async (id: number, currentStatus: number) => {
    const targetStatus = currentStatus === 1 ? 0 : 1;
    setUpdatingId(id);

    try {
      const API_URL =
        process.env.NODE_ENV === 'development'
          ? 'https://youthgksbsgpj.web.id/api/checkin.php'
          : '/api/checkin.php';

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, targetStatus }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setParticipants((prev) =>
          prev.map((p) => (p.id === id ? { ...p, statusAttended: targetStatus } : p))
        );
      } else {
        alert(data.message || 'Gagal mengubah status absensi.');
      }
    } catch (err) {
      console.error('Toggle Error:', err);
      alert('Gagal terhubung ke server.');
    } finally {
      setUpdatingId(null);
    }
  };

  const churchOptions = useMemo(() => {
    const list = Array.from(new Set(participants.map((p) => p.church))).filter(Boolean);
    return list.sort();
  }, [participants]);

  const stats = useMemo(() => {
    const total = participants.length;
    const attended = participants.filter((p) => Number(p.statusAttended) === 1).length;
    const notAttended = total - attended;
    return { total, attended, notAttended };
  }, [participants]);

  const filteredParticipants = useMemo(() => {
    return participants.filter((p) => {
      const query = searchQuery.toLowerCase();
      const matchSearch =
        p.fullName.toLowerCase().includes(query) ||
        p.ticketCode.toLowerCase().includes(query);

      const matchChurch = selectedChurchFilter
        ? p.church === selectedChurchFilter
        : true;

      let matchStatus = true;
      if (statusFilter === 'attended') {
        matchStatus = Number(p.statusAttended) === 1;
      } else if (statusFilter === 'not_attended') {
        matchStatus = Number(p.statusAttended) === 0;
      }

      return matchSearch && matchChurch && matchStatus;
    });
  }, [participants, searchQuery, selectedChurchFilter, statusFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedChurchFilter, statusFilter]);

  const totalPages = Math.ceil(filteredParticipants.length / ITEMS_PER_PAGE) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredParticipants.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredParticipants, currentPage]);

  const startIndex = filteredParticipants.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0;
  const endIndex = Math.min(currentPage * ITEMS_PER_PAGE, filteredParticipants.length);

  if (!isAuthorized) {
    return (
      <main className="min-h-screen pt-28 sm:pt-32 pb-12 px-4 max-w-md mx-auto">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-[#3b3028]/10 shadow-lg text-center space-y-4">
          <div className="text-3xl">🔒</div>
          <h1 className="font-heading text-lg font-bold text-[#3b3028]">
            Akses Monitoring Peserta
          </h1>
          <p className="text-xs text-[#3b3028]/70">
            Masukkan PIN Admin untuk melihat database peserta.
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
              Buka Database 🚀
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-28 sm:pt-32 pb-16 px-4 sm:px-6 max-w-6xl mx-auto space-y-6">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-heading text-xl md:text-2xl font-bold text-[#2a2421]">
              Data Peserta Natal 2026
            </h1>

            {/* TOMBOL REFRESH DATA */}
            <button
              onClick={fetchParticipants}
              disabled={loading}
              title="Refresh Data Peserta"
              className="inline-flex items-center gap-1 px-3 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 border border-amber-300 rounded-lg text-xs font-bold transition active:scale-95 disabled:opacity-50"
            >
              <span className={`text-sm ${loading ? 'animate-spin' : ''}`}>🔄</span>
              {loading ? 'Memuat...' : 'Refresh'}
            </button>
          </div>
          <p className="text-xs text-[#3b3028]/60 mt-0.5">
            Monitoring pendaftaran dan kehadiran peserta secara real-time.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start md:self-auto">
          <div className="px-5 py-2 bg-white rounded-2xl border border-slate-200/80 shadow-sm text-center min-w-[85px]">
            <p className="text-[9px] font-bold tracking-wider text-slate-400 uppercase">TOTAL</p>
            <p className="text-xl font-bold text-slate-800">{stats.total}</p>
          </div>

          <div className="px-5 py-2 bg-emerald-50/60 rounded-2xl border border-emerald-200/80 shadow-sm text-center min-w-[85px]">
            <p className="text-[9px] font-bold tracking-wider text-emerald-600 uppercase">HADIR</p>
            <p className="text-xl font-bold text-emerald-600">{stats.attended}</p>
          </div>

          <div className="px-5 py-2 bg-amber-50/60 rounded-2xl border border-amber-200/80 shadow-sm text-center min-w-[85px]">
            <p className="text-[9px] font-bold tracking-wider text-amber-600 uppercase">BELUM</p>
            <p className="text-xl font-bold text-amber-600">{stats.notAttended}</p>
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-slate-200/80 shadow-sm space-y-3">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          
          <div className="flex flex-col sm:flex-row items-center gap-2.5 flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari Nama atau Kode Tiket..."
              className="w-full sm:w-64 px-3.5 py-2 bg-[#f8f9fa] border border-slate-200 rounded-xl text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            />

            <select
              value={selectedChurchFilter}
              onChange={(e) => setSelectedChurchFilter(e.target.value)}
              className="w-full sm:w-56 px-3.5 py-2 bg-[#f8f9fa] border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/20 cursor-pointer"
            >
              <option value="">Semua Gereja</option>
              {churchOptions.map((church) => (
                <option key={church} value={church}>
                  {church}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1 bg-[#f1f3f5] p-1 rounded-xl self-start sm:self-auto">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                statusFilter === 'all'
                  ? 'bg-[#1e293b] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setStatusFilter('attended')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                statusFilter === 'attended'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Hadir
            </button>
            <button
              onClick={() => setStatusFilter('not_attended')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                statusFilter === 'not_attended'
                  ? 'bg-white text-amber-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Belum
            </button>
          </div>

        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#f8f9fa] border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-4 w-12 text-center">NO</th>
                <th className="py-3.5 px-4">KODE TIKET</th>
                <th className="py-3.5 px-4">NAMA LENGKAP</th>
                <th className="py-3.5 px-4">ASAL GEREJA</th>
                <th className="py-3.5 px-4 text-center">STATUS (KLIK UNTUK UBAH)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">
                    Memuat data peserta...
                  </td>
                </tr>
              ) : paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">
                    Tidak ada data peserta ditemukan.
                  </td>
                </tr>
              ) : (
                paginatedData.map((item, index) => {
                  const isAttended = Number(item.statusAttended) === 1;
                  const rowNo = startIndex + index;
                  const isUpdating = updatingId === item.id;

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3.5 px-4 text-center font-medium text-slate-400">
                        {rowNo}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                        {item.ticketCode}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-800">
                        {item.fullName}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 font-medium">
                        {item.church}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => handleToggleManual(item.id, Number(item.statusAttended))}
                          disabled={isUpdating}
                          title="Klik untuk mengubah status absensi secara manual"
                          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-bold transition transform active:scale-95 disabled:opacity-50 ${
                            isAttended
                              ? 'bg-emerald-100/80 text-emerald-800 hover:bg-emerald-200'
                              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                          }`}
                        >
                          <span className="text-xs">
                            {isUpdating ? '⏳' : isAttended ? '✓' : '○'}
                          </span>
                          {isAttended ? 'Sudah Hadir' : 'Belum Hadir'}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {!loading && filteredParticipants.length > 0 && (
          <div className="px-4 py-3 bg-[#f8f9fa] border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <p>
              Menampilkan <span className="font-bold text-slate-700">{startIndex}</span> -{' '}
              <span className="font-bold text-slate-700">{endIndex}</span> dari{' '}
              <span className="font-bold text-slate-700">{filteredParticipants.length}</span> peserta
            </p>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white transition"
              >
                ← SBLM
              </button>

              <span className="px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-900 rounded-lg font-bold">
                Halaman {currentPage} / {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white transition"
              >
                NEXT →
              </button>
            </div>
          </div>
        )}
      </div>

    </main>
  );
}