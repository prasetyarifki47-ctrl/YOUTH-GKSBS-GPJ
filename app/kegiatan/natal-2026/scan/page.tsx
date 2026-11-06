'use client';

import { useEffect, useState, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

interface ParticipantData {
  ticketCode: string;
  fullName: string;
  church: string;
  statusAttended: number;
  attendedAt?: string;
}

export default function ScanNatalPage() {
  const [pin, setPin] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [pinError, setPinError] = useState('');

  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{
    success: boolean;
    message: string;
    data?: ParticipantData;
  } | null>(null);

  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);

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

  const startScanner = async () => {
    setScanResult(null);
    setScanning(true);

    try {
      const qrScanner = new Html5Qrcode("reader");
      html5QrCodeRef.current = qrScanner;

      await qrScanner.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 220, height: 220 },
        },
        async (decodedText) => {
          await qrScanner.stop();
          setScanning(false);
          handleCheckIn(decodedText);
        },
        () => {}
      );
    } catch (err) {
      console.error("Gagal membuka kamera:", err);
      setScanning(false);
      setScanResult({
        success: false,
        message: "Gagal mengakses kamera. Pastikan izin kamera telah diberikan.",
      });
    }
  };

  const stopScanner = async () => {
    if (html5QrCodeRef.current && scanning) {
      try {
        await html5QrCodeRef.current.stop();
      } catch (err) {
        console.error("Gagal menghentikan kamera:", err);
      } finally {
        setScanning(false);
      }
    }
  };

  const handleCheckIn = async (ticketCode: string) => {
    try {
      const API_URL =
        process.env.NODE_ENV === 'development'
          ? 'https://youthgksbsgpj.web.id/api/checkin.php'
          : '/api/checkin.php';

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticketCode: ticketCode.trim() }),
      });

      const res = await response.json();
      if (response.ok && res.success) {
        setScanResult({
          success: true,
          message: res.message || 'Absensi berhasil diproses!',
          data: res.data,
        });
      } else {
        setScanResult({
          success: false,
          message: res.message || 'Kode absensi tidak ditemukan atau tidak valid.',
        });
      }
    } catch (err: any) {
      setScanResult({
        success: false,
        message: 'Gagal terhubung ke server absensi.',
      });
    }
  };

  useEffect(() => {
    return () => {
      if (html5QrCodeRef.current) {
        html5QrCodeRef.current.stop().catch(() => {});
      }
    };
  }, []);

  // TAMPILAN FORM LOGIN ADMIN
  if (!isAuthorized) {
    return (
      <main className="min-h-screen pt-28 sm:pt-32 pb-12 px-4 max-w-md mx-auto">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-[#3b3028]/10 shadow-lg text-center space-y-4">
          <div className="text-3xl">🔒</div>
          <h1 className="font-heading text-lg font-bold text-[#3b3028]">
            Akses Khusus Panitia
          </h1>
          <p className="text-xs text-[#3b3028]/70">
            Masukkan PIN Admin untuk mengakses pemindai absensi.
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
              Masuk Panitia 🚀
            </button>
          </form>
        </div>
      </main>
    );
  }

  // TAMPILAN JIKA LOGIN SUKSES
  return (
    <main className="min-h-screen pt-28 sm:pt-32 pb-12 px-4 max-w-xl mx-auto space-y-4">
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 md:p-6 border border-[#3b3028]/10 shadow-lg text-center space-y-4 overflow-hidden">
        <div>
          <span className="inline-block px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-[10px] font-bold tracking-widest uppercase">
            📷 Panitia Absensi
          </span>
          <h1 className="font-heading text-lg md:text-xl font-bold text-[#3b3028] mt-1">
            Scan QR Code Absensi
          </h1>
          <p className="text-xs text-[#3b3028]/70">
            Arahkan kamera ke QR Code peserta Natal Pemuda Klasis 2026.
          </p>
        </div>

        <div className="relative w-full max-w-sm mx-auto overflow-hidden rounded-2xl border-2 border-dashed border-[#3b3028]/20 bg-[#f8f5f1] min-h-[260px] flex items-center justify-center">
          <div id="reader" className="w-full h-full"></div>

          {!scanning && !scanResult && (
            <div className="p-4 text-center space-y-2">
              <span className="text-4xl">📷</span>
              <p className="text-xs text-[#3b3028]/70">Kamera sedang nonaktif</p>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          {!scanning ? (
            <button
              onClick={startScanner}
              className="flex-1 bg-[#3b3028] hover:bg-[#3b3028]/90 text-white font-bold py-3 rounded-xl text-xs transition shadow-md"
            >
              Buka Kamera 🚀
            </button>
          ) : (
            <button
              onClick={stopScanner}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl text-xs transition shadow-md"
            >
              Tutup Kamera ✖
            </button>
          )}
        </div>

        {scanResult && (
          <div
            className={`p-4 rounded-2xl text-xs border ${
              scanResult.success
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : 'bg-red-50 border-red-200 text-red-950'
            }`}
          >
            <p className="font-bold text-sm mb-1">{scanResult.message}</p>
            {scanResult.data && (
              <div className="mt-2 text-left pt-2 border-t border-emerald-900/10 space-y-1">
                <p><strong>Nama:</strong> {scanResult.data.fullName}</p>
                <p><strong>Gereja:</strong> {scanResult.data.church}</p>
                <p><strong>Kode Tiket:</strong> {scanResult.data.ticketCode}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}