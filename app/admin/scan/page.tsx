'use client';

import { useState } from 'react';

export default function AdminScanPage() {
  const [ticketCode, setTicketCode] = useState('');
  const [scanResult, setScanResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleVerifyTicket = async (codeToVerify: string) => {
    setLoading(true);
    try {
      // Panggil API PHP di cPanel untuk verifikasi tiket
      const res = await fetch('/api/scan.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticketCode: codeToVerify }),
      });
      const data = await res.json();
      setScanResult(data);
    } catch (err) {
      setScanResult({ success: false, message: 'Gagal menghubungkan ke server' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F3EC] p-6 text-[#2E2A26]">
      <div className="max-w-md mx-auto bg-white p-6 rounded-3xl border border-[#3b3028]/10 shadow-lg space-y-4">
        <h1 className="font-heading text-xl font-bold text-center">Scan QR Absensi 📷</h1>
        
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleVerifyTicket(ticketCode);
          }}
          className="space-y-3"
        >
          <input
            type="text"
            placeholder="Masukkan atau Scan Kode Tiket (Contoh: NTL-8A2F9)"
            value={ticketCode}
            onChange={(e) => setTicketCode(e.target.value)}
            className="w-full px-4 py-3 bg-[#F7F3EC]/50 border rounded-xl text-xs"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#3b3028] text-white font-bold rounded-xl text-xs"
          >
            {loading ? 'Verifikasi...' : 'Verifikasi Tiket'}
          </button>
        </form>

        {scanResult && (
          <div className={`p-4 rounded-xl text-xs text-center border ${scanResult.success ? 'bg-emerald-50 text-emerald-900 border-emerald-200' : 'bg-red-50 text-red-900 border-red-200'}`}>
            <p className="font-bold">{scanResult.message}</p>
            {scanResult.peserta && (
              <div className="mt-2 space-y-1">
                <p>Nama: <strong>{scanResult.peserta.fullName}</strong></p>
                <p>Gereja: <strong>{scanResult.peserta.church}</strong></p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}