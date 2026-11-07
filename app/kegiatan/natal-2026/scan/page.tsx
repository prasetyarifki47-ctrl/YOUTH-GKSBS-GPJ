'use client';

import { useEffect, useState, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

interface Participant {
  id: number;
  ticketCode: string;
  fullName: string;
  church: string;
  statusAttended: number;
}

export default function ScanNatalPage() {
  const [pin, setPin] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [pinError, setPinError] = useState('');

  const [totalCount, setTotalCount] = useState(0);
  const [attendedCount, setAttendedCount] = useState(0);

  const [cameras, setCameras] = useState<{ id: string; label: string }[]>([]);
  const [selectedCameraId, setSelectedCameraId] = useState<string>('');
  const [isScanning, setIsScanning] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [scanResult, setScanResult] = useState<{
    type: 'success' | 'already' | 'error';
    title: string;
    message: string;
    data?: Participant;
  } | null>(null);

  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === 'natal2026') {
      setIsAuthorized(true);
      setPinError('');
    } else {
      setPinError('PIN Admin Salah!');
    }
  };

  const fetchStats = async () => {
    try {
      const API_URL =
        process.env.NODE_ENV === 'development'
          ? 'https://youthgksbsgpj.web.id/api/get_participants.php'
          : '/api/get_participants.php';

      const res = await fetch(`${API_URL}?t=${Date.now()}`, { cache: 'no-store' });
      const data = await res.json();

      if (data.success && Array.isArray(data.data)) {
        const total = data.data.length;
        const attended = data.data.filter((p: any) => Number(p.statusAttended) === 1).length;
        setTotalCount(total);
        setAttendedCount(attended);
      }
    } catch (err) {
      console.error('Gagal mengambil stats:', err);
    }
  };

  useEffect(() => {
    if (isAuthorized) {
      fetchStats();
      getCameras();
    }
  }, [isAuthorized]);

  const getCameras = async () => {
    try {
      const devices = await Html5Qrcode.getCameras();
      if (devices && devices.length > 0) {
        const camList = devices.map((d) => ({
          id: d.id,
          label: d.label || `Kamera ${d.id.slice(0, 5)}...`,
        }));
        setCameras(camList);

        const backCamera = camList.find((c) =>
          /back|rear|environment|0/i.test(c.label)
        );

        if (backCamera) {
          setSelectedCameraId(backCamera.id);
        } else {
          setSelectedCameraId(camList[camList.length - 1].id);
        }
      }
    } catch (err) {
      console.error('Gagal mendeteksi kamera:', err);
    }
  };

  // FUNGSI MATIKAN KAMERA DENGAN AMAN
  const stopScanner = async () => {
    if (html5QrCodeRef.current) {
      try {
        if (html5QrCodeRef.current.isScanning) {
          await html5QrCodeRef.current.stop();
        }
        await html5QrCodeRef.current.clear();
      } catch (err) {
        console.error('Gagal melepaskan instance kamera:', err);
      } finally {
        html5QrCodeRef.current = null;
        setIsScanning(false);
      }
    }
  };

  // FUNGSI NYALAKAN KAMERA
  const startScanner = async () => {
    if (isProcessing) return;

    // Bersihkan sesi kamera lama dulu
    await stopScanner();

    // Beri jeda 200ms agar hardware kamera dilepas oleh sistem operasi browser
    await new Promise((resolve) => setTimeout(resolve, 200));

    try {
      const html5QrCode = new Html5Qrcode('qr-reader');
      html5QrCodeRef.current = html5QrCode;

      const cameraConfig = selectedCameraId
        ? selectedCameraId
        : { facingMode: 'environment' };

      await html5QrCode.start(
        cameraConfig,
        {
          fps: 10,
          qrbox: { width: 220, height: 220 },
        },
        (decodedText) => {
          handleQrScanned(decodedText);
        },
        () => {}
      );

      setIsScanning(true);
      setScanResult(null);
    } catch (err) {
      console.error('Gagal memulai kamera:', err);
      setIsScanning(false);
      alert('Kamera sedang sibuk atau tidak mendapat izin. Coba muat ulang halaman.');
    }
  };

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  const handleQrScanned = async (rawCode: string) => {
    if (isProcessing) return;
    setIsProcessing(true);

    // Stop scanner segera setelah terdeteksi 1 QR Code
    await stopScanner();

    const cleanCode = rawCode.trim();

    try {
      const API_URL =
        process.env.NODE_ENV === 'development'
          ? 'https://youthgksbsgpj.web.id/api/checkin.php'
          : '/api/checkin.php';

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticketCode: cleanCode }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const participantName = data.data?.fullName || 'Peserta';
        const churchName = data.data?.church || 'Gereja';

        if (data.message && data.message.includes('SUDAH ABSEN')) {
          setScanResult({
            type: 'already',
            title: '⚠️ Sudah Pernah Absen',
            message: `Atas nama ${participantName} dari ${churchName} SUDAH ABSEN sebelumnya.`,
            data: data.data,
          });
        } else {
          setScanResult({
            type: 'success',
            title: '🎉 Absensi Berhasil!',
            message: `Atas nama ${participantName} dari ${churchName} sudah hadir.`,
            data: data.data,
          });
          fetchStats();
        }
      } else {
        setScanResult({
          type: 'error',
          title: '❌ Kode Tidak Terdaftar',
          message: `Kode tiket "${cleanCode}" tidak ditemukan di database.`,
        });
      }
    } catch (err) {
      console.error('Checkin Error:', err);
      setScanResult({
        type: 'error',
        title: '⚠️ Gangguan Jaringan',
        message: 'Gagal terhubung ke server database.',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isAuthorized) {
    return (
      <main className="min-h-screen pt-28 sm:pt-32 pb-12 px-4 max-w-md mx-auto">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-[#3b3028]/10 shadow-lg text-center space-y-4">
          <div className="text-3xl">📷</div>
          <h1 className="font-heading text-lg font-bold text-[#3b3028]">
            Akses Pemindai Absensi
          </h1>
          <p className="text-xs text-[#3b3028]/70">
            Masukkan PIN Admin untuk mengaktifkan scanner.
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
              Buka Scanner 🚀
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-28 sm:pt-32 pb-12 px-4 max-w-lg mx-auto">
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-[#3b3028]/10 shadow-lg space-y-4 text-center">
        
        <div className="space-y-1">
          <span className="inline-block px-3 py-0.5 bg-amber-100/70 text-amber-900 rounded-full text-[9px] font-bold tracking-widest uppercase">
            PANITIA ABSENSI NATAL
          </span>
          <h1 className="font-heading text-xl font-bold text-[#3b3028]">
            Scanner QR Code
          </h1>
          <p className="text-xs text-[#3b3028]/60">
            Klik tombol kamera di bawah untuk melakukan absensi.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="p-3 bg-[#f8f9fa] border border-slate-200/80 rounded-2xl">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
              TOTAL PENDAFTAR
            </p>
            <p className="text-lg font-bold text-slate-800 mt-0.5">
              {totalCount} <span className="text-xs font-normal text-slate-500">Orang</span>
            </p>
          </div>

          <div className="p-3 bg-emerald-50/50 border border-emerald-200/80 rounded-2xl">
            <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider">
              SUDAH HADIR
            </p>
            <p className="text-lg font-bold text-emerald-600 mt-0.5">
              {attendedCount} <span className="text-xs font-normal text-emerald-700">Orang</span>
            </p>
          </div>
        </div>

        {/* POPUP NOTIFIKASI HASIL SCAN */}
        {scanResult && (
          <div
            className={`p-4 rounded-2xl border text-center transition animate-fadeIn space-y-1.5 ${
              scanResult.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : scanResult.type === 'already'
                ? 'bg-amber-50 border-amber-200 text-amber-900'
                : 'bg-red-50 border-red-200 text-red-900'
            }`}
          >
            <div className="text-xl">
              {scanResult.type === 'success' ? '✅' : scanResult.type === 'already' ? '⚠️' : '❌'}
            </div>
            <h3 className="font-bold text-sm">{scanResult.title}</h3>
            <p className="text-xs font-semibold leading-relaxed">{scanResult.message}</p>
          </div>
        )}

        {/* AREA KAMERA SCANNER */}
        <div className="relative overflow-hidden rounded-2xl bg-slate-900 border-2 border-slate-300 min-h-[260px] flex flex-col items-center justify-center p-4">
          
          <div
            id="qr-reader"
            className={`w-full h-auto ${!isScanning ? 'hidden' : 'block'}`}
          />

          {!isScanning && (
            <div className="text-center space-y-3 py-6">
              <div className="w-16 h-16 mx-auto bg-amber-500/10 text-amber-600 rounded-full flex items-center justify-center text-3xl shadow-inner">
                📷
              </div>
              <p className="text-xs text-slate-300 font-medium">
                {scanResult ? 'Scan selesai. Siap scan peserta berikutnya.' : 'Kamera belum aktif.'}
              </p>
              <button
                onClick={startScanner}
                disabled={isProcessing}
                className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-md transition transform active:scale-95 inline-flex items-center gap-2 disabled:opacity-50"
              >
                <span>📷</span> Buka Kamera Scanner
              </button>
            </div>
          )}

          {isScanning && (
            <button
              onClick={stopScanner}
              className="mt-3 px-3 py-1 bg-red-600/80 hover:bg-red-700 text-white font-bold text-[10px] rounded-lg transition"
            >
              ✕ Tutup Kamera
            </button>
          )}

        </div>

        {cameras.length > 0 && (
          <div className="pt-1 text-left space-y-1">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#3b3028]/60 text-center">
              PILIH KAMERA PANITIA
            </label>
            <select
              value={selectedCameraId}
              onChange={async (e) => {
                const newCamId = e.target.value;
                setSelectedCameraId(newCamId);
                if (isScanning) {
                  await stopScanner();
                  setTimeout(() => startScanner(), 300);
                }
              }}
              className="w-full px-3 py-2 bg-[#f8f5f1] border border-[#3b3028]/20 rounded-xl text-xs text-[#3b3028] font-medium focus:outline-none"
            >
              {cameras.map((cam) => (
                <option key={cam.id} value={cam.id}>
                  {cam.label}
                </option>
              ))}
            </select>
          </div>
        )}

      </div>
    </main>
  );
}