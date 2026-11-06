'use client';

import { useEffect, useState } from 'react';

interface Peserta {
  id: number;
  ticketCode: string;
  fullName: string;
  church: string;
  createdAt: string;
}

export default function AdminPesertaPage() {
  const [pesertaList, setPesertaList] = useState<Peserta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPeserta = async () => {
    try {
      const res = await fetch('/api/peserta.php');
      const data = await res.json();

      if (res.ok && data.success) {
        setPesertaList(data.data);
      } else {
        setError(data.message || 'Gagal mengambil data peserta.');
      }
    } catch (err) {
      setError('Terjadi kesalahan koneksi ke server.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Apakah kamu yakin ingin menghapus peserta ini?')) return;

    try {
      const res = await fetch('/api/peserta.php', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setPesertaList((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert('Gagal menghapus: ' + data.message);
      }
    } catch (err) {
      alert('Error saat menghapus data.');
    }
  };

  useEffect(() => {
    fetchPeserta();
  }, []);

  return (
    <main className="min-h-screen bg-[#F7F3EC] p-6 text-[#2E2A26]">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-[#3b3028]/10 shadow-sm">
          <div>
            <h1 className="font-heading text-2xl font-bold text-[#3b3028]">
              Daftar Peserta Natal 2026 📋
            </h1>
            <p className="text-xs text-[#6F6860]">
              Total Peserta Terdaftar: <strong>{pesertaList.length}</strong>
            </p>
          </div>
          <button
            onClick={fetchPeserta}
            className="px-4 py-2 bg-[#F7F3EC] text-xs font-bold rounded-xl hover:bg-[#3b3028]/10 transition"
          >
            🔄 Refresh
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-sm text-[#6F6860]">Memuat data peserta...</div>
        ) : error ? (
          <div className="p-4 bg-red-50 text-red-700 rounded-2xl text-xs text-center border border-red-200">
            {error}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-[#3b3028]/10 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F7F3EC] border-b border-[#3b3028]/10 text-[#8B7355] uppercase font-semibold">
                  <tr>
                    <th className="p-4">No</th>
                    <th className="p-4">Kode Tiket</th>
                    <th className="p-4">Nama Lengkap</th>
                    <th className="p-4">Asal Gereja</th>
                    <th className="p-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#3b3028]/5">
                  {pesertaList.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-6 text-center text-[#6F6860]">
                        Belum ada peserta yang mendaftar.
                      </td>
                    </tr>
                  ) : (
                    pesertaList.map((item, index) => (
                      <tr key={item.id} className="hover:bg-[#F7F3EC]/30">
                        <td className="p-4 font-bold text-[#6F6860]">{index + 1}</td>
                        <td className="p-4 font-mono font-bold text-amber-900">{item.ticketCode}</td>
                        <td className="p-4 font-semibold text-[#2E2A26]">{item.fullName}</td>
                        <td className="p-4 text-[#6F6860]">{item.church}</td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-[10px] font-bold hover:bg-red-200 transition"
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}