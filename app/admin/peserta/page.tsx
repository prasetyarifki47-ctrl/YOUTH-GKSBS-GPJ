'use client';

import { useState, useEffect, useMemo } from 'react';
import { getAllRegistrations, getAttendanceStats } from '@/actions/scan';

const ITEMS_PER_PAGE = 20;

export default function AdminPesertaPage() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [stats, setStats] = useState({ total: 0, attended: 0 });
  const [search, setSearch] = useState('');
  const [selectedChurch, setSelectedChurch] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ATTENDED' | 'NOT_ATTENDED'>('ALL');
  const [loading, setLoading] = useState(true);

  // State untuk Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async () => {
    const [listRes, statsRes] = await Promise.all([
      getAllRegistrations(),
      getAttendanceStats(),
    ]);

    if (listRes.success && listRes.data) {
      setRegistrations(listRes.data);
    }
    setStats(statsRes);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 10000); // Polling setiap 10 detik

    return () => clearInterval(interval);
  }, []);

  // Filter data berdasarkan search, gereja, dan status absensi
  const filteredData = useMemo(() => {
    return registrations.filter((item) => {
      const matchSearch =
        item.fullName.toLowerCase().includes(search.toLowerCase()) ||
        item.ticketCode.toLowerCase().includes(search.toLowerCase());

      const matchChurch =
        selectedChurch === 'ALL' || item.church === selectedChurch;

      const matchStatus =
        statusFilter === 'ALL' ||
        (statusFilter === 'ATTENDED' && item.isAttended) ||
        (statusFilter === 'NOT_ATTENDED' && !item.isAttended);

      return matchSearch && matchChurch && matchStatus;
    });
  }, [registrations, search, selectedChurch, statusFilter]);

  // Reset ke halaman 1 jika filter/pencarian berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedChurch, statusFilter]);

  // Kalkulasi Pagination
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE) || 1;
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  return (
    <main className="min-h-screen pt-28 pb-16 px-4 md:px-8 bg-slate-50">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Dashboard */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800">
              Data Peserta Natal Pemuda Klasis Pugung Raharjo 2026
            </h1>
          </div>

          {/* Stats Cards */}
          <div className="flex gap-3">
            <div className="bg-white px-4 py-2.5 rounded-2xl border border-slate-200 shadow-sm text-center min-w-[100px]">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Total</p>
              <p className="text-lg font-black text-slate-800">{stats.total}</p>
            </div>
            <div className="bg-emerald-50 px-4 py-2.5 rounded-2xl border border-emerald-200 text-center min-w-[100px]">
              <p className="text-[10px] font-bold text-emerald-600 uppercase">Hadir</p>
              <p className="text-lg font-black text-emerald-700">{stats.attended}</p>
            </div>
            <div className="bg-amber-50 px-4 py-2.5 rounded-2xl border border-amber-200 text-center min-w-[100px]">
              <p className="text-[10px] font-bold text-amber-600 uppercase">Belum Hadir</p>
              <p className="text-lg font-black text-amber-700">{stats.total - stats.attended}</p>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="Cari Nama atau Kode Tiket..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
          />

          <select
            value={selectedChurch}
            onChange={(e) => setSelectedChurch(e.target.value)}
            className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
          >
            <option value="ALL">Semua Gereja</option>
            <option value="GKSBS Gunung Pasir Jaya">GKSBS Gunung Pasir Jaya</option>
            <option value="GKSBS Immanuel Pasir Luhur">GKSBS Immanuel Pasir Luhur</option>
            <option value="GKSBS Bauh Gunung Sari">GKSBS Bauh Gunung Sari</option>
            <option value="GKSBS Pugung Raharjo">GKSBS Pugung Raharjo</option>
            <option value="GKSBS Mengandung Sari">GKSBS Mengandung Sari</option>
            <option value="GKSBS Jaya Guna">GKSBS Jaya Guna</option>
            <option value="GKSBS Batang Hari">GKSBS Batang Hari</option>
            <option value="GKSBS Bumi Agung">GKSBS Bumi Agung</option>
          </select>

          <div className="flex gap-1.5">
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
                statusFilter === 'ALL'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setStatusFilter('ATTENDED')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
                statusFilter === 'ATTENDED'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Hadir
            </button>
            <button
              onClick={() => setStatusFilter('NOT_ATTENDED')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
                statusFilter === 'NOT_ATTENDED'
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Belum
            </button>
          </div>
        </div>

        {/* Tabel Peserta */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-4">No</th>
                  <th className="py-3.5 px-4">Kode</th>
                  <th className="py-3.5 px-4">Nama Lengkap</th>
                  <th className="py-3.5 px-4">Asal Gereja</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
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
                    const rowNumber = (currentPage - 1) * ITEMS_PER_PAGE + index + 1;
                    return (
                      <tr key={item.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3.5 px-4 text-slate-400">{rowNumber}</td>
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                          {item.ticketCode}
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-slate-800">
                          {item.fullName}
                        </td>
                        <td className="py-3.5 px-4 text-slate-600">{item.church}</td>
                        <td className="py-3.5 px-4 text-center">
                          {item.isAttended ? (
                            <span className="inline-block px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold text-[10px] rounded-full">
                              Hadir
                            </span>
                          ) : (
                            <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-500 font-bold text-[10px] rounded-full">
                              Belum Hadir
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Controls Pagination */}
          {!loading && filteredData.length > 0 && (
            <div className="px-4 py-3 bg-slate-50/50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
              <div>
                Menampilkan <span className="font-bold text-slate-800">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> -{' '}
                <span className="font-bold text-slate-800">
                  {Math.min(currentPage * ITEMS_PER_PAGE, filteredData.length)}
                </span>{' '}
                dari <span className="font-bold text-slate-800">{filteredData.length}</span> peserta
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-white shadow-sm transition"
                >
                  ← SBLM
                </button>

                <span className="px-3 py-1.5 font-bold text-slate-800 bg-amber-100 text-amber-900 rounded-lg">
                  Halaman {currentPage} / {totalPages}
                </span>

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-white shadow-sm transition"
                >
                  NEXT →
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}