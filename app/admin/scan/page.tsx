'use client';

import { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { processCheckIn, getAttendanceStats } from '@/actions/scan';

export default function AdminScanClient() {
  const [scanResult, setScanResult] = useState<{
    status: 'idle' | 'success' | 'already' | 'error';
    message: string;
    data?: any;
  }>({ status: 'idle', message: '' });

  const [loading, setLoading] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [stats, setStats] = useState({ total: 0, attended: 0 });

  const [cameras, setCameras] = useState<{ id: string; label: string }[]>([]);
  const [selectedCameraId, setSelectedCameraId] = useState<string>('');
  const [isScanning, setIsScanning] = useState(false);

  const html5QrcodeRef = useRef<Html5Qrcode | null>(null);

  const fetchStats = async () => {
    const res = await getAttendanceStats();
    setStats(res);
  };

  const handleProcessCode = async (code: string) => {
    if (loading) return;
    setLoading(true);

    const res = await processCheckIn(code);

    if (res.success) {
      setScanResult({
        status: 'success',
        message: `BERHASIL ABSEN! 🎉`,
        data: res.data,
      });
      fetchStats();
    } else if (res.alreadyAttended) {
      setScanResult({
        status: 'already',
        message: res.error,
        data: res.data,
      });
    } else {
      setScanResult({
        status: 'error',
        message: res.error || 'Gagal memproses tiket.',
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchStats();

    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length > 0) {
          const cameraList = devices.map((device, index) => ({
            id: device.id,
            label: device.label || `Kamera ${index + 1}`,
          }));
          setCameras(cameraList);

          const backCam = devices.find((d) =>
            d.label.toLowerCase().includes('back') ||
            d.label.toLowerCase().includes('environment') ||
            d.label.toLowerCase().includes('belakang')
          );

          setSelectedCameraId(backCam ? backCam.id : devices[0].id);
        }
      })
      .catch((err) => {
        console.error('Gagal mendapatkan daftar kamera:', err);
      });

    return () => {
      if (html5QrcodeRef.current && html5QrcodeRef.current.isScanning) {
        html5QrcodeRef.current.stop().catch((e) => console.error(e));
      }
    };
  }, []);

  useEffect(() => {
    if (!selectedCameraId) return;

    const startScanner = async () => {
      if (html5QrcodeRef.current) {
        if (html5QrcodeRef.current.isScanning) {
          await html5QrcodeRef.current.stop();
        }
      } else {
        html5QrcodeRef.current = new Html5Qrcode('reader');
      }

      try {
        await html5QrcodeRef.current.start(
          selectedCameraId,
          {
            fps: 10,
            qrbox: { width: 220, height: 220 },
          },
          (decodedText) => {
            handleProcessCode(decodedText);
          },
          () => {}
        );
        setIsScanning(true);
      } catch (err) {
        console.error('Gagal mengaktifkan kamera:', err);
        setIsScanning(false);
      }
    };

    startScanner();
  }, [selectedCameraId]);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualCode.trim()) {
      handleProcessCode(manualCode);
      setManualCode('');
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-16 px-4 bg-gradient-to-br from-amber-50/50 via-slate-50 to-blue-50/30">
      <div className="w-full max-w-md mx-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-slate-100 p-6 space-y-5">
        
        <div className="text-center space-y-1">
          <span className="inline-block text-[10px] font-bold tracking-widest uppercase bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
            Panitia Absensi Natal
          </span>
          <h1 className="text-xl font-extrabold text-slate-800">
            Scanner QR Code
          </h1>
          <p className="text-xs text-slate-500">Arahkan kamera ke QR Code peserta untuk absensi.</p>
        </div>

        <div className="grid grid-cols-2 gap-3 p-3.5 bg-amber-50/50 border border-amber-200/60 rounded-2xl text-center">
          <div>
            <p className="text-[10px] text-slate-500 uppercase font-semibold">Total Pendaftar</p>
            <p className="text-lg font-black text-slate-800">{stats.total} Orang</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500 uppercase font-semibold">Sudah Hadir</p>
            <p className="text-lg font-black text-emerald-600">{stats.attended} Orang</p>
          </div>
        </div>

        {scanResult.status !== 'idle' && (
          <div
            className={`p-4 rounded-2xl text-center text-xs font-semibold shadow-sm transition-all duration-300 ${
              scanResult.status === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                : scanResult.status === 'already'
                ? 'bg-amber-50 text-amber-800 border border-amber-300'
                : 'bg-red-50 text-red-800 border border-red-300'
            }`}
          >
            <p className="text-base font-bold mb-1">
              {scanResult.status === 'success' && '✅ Absensi Berhasil'}
              {scanResult.status === 'already' && '⚠️ Sudah Absen'}
              {scanResult.status === 'error' && '❌ Tiket Tidak Valid'}
            </p>
            <p>{scanResult.message}</p>
            {scanResult.data && (
              <div className="mt-2 pt-2 border-t border-slate-200/60 text-slate-700 font-mono">
                <p className="font-bold text-sm">{scanResult.data.fullName}</p>
                <p className="text-xs text-slate-500">{scanResult.data.church}</p>
              </div>
            )}
          </div>
        )}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 text-white shadow-inner relative">
          <div id="reader" className="w-full min-h-[260px]"></div>
        </div>

        {cameras.length > 0 && (
          <div className="space-y-1">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center">
              Pilih Kamera Panitia
            </label>
            <select
              value={selectedCameraId}
              onChange={(e) => setSelectedCameraId(e.target.value)}
              className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
            >
              {cameras.map((cam) => (
                <option key={cam.id} value={cam.id}>
                  📷 {cam.label}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="pt-2 border-t border-slate-100">
          <p className="text-center text-[11px] text-slate-400 mb-2 font-medium uppercase tracking-wider">
            Atau Input Manual Kode Tiket
          </p>
          <form onSubmit={handleManualSubmit} className="flex gap-2">
            <input
              type="text"
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value.toUpperCase())}
              placeholder="Contoh: NT-8X92K"
              className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm uppercase font-mono font-bold focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 text-slate-800"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-amber-800 hover:bg-amber-900 text-white px-4 py-2.5 rounded-xl text-xs font-semibold transition shadow-sm disabled:opacity-50"
            >
              {loading ? '...' : 'Proses'}
            </button>
          </form>
        </div>

      </div>
    </main>
  );
}