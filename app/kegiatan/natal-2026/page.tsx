'use client';

import { useState } from 'react';
import { registerNatal } from '@/actions/register';
import QRCode from 'qrcode';

const FIXED_CHURCHES = [
  'GKSBS Gunung Pasir Jaya',
  'GKSBS Immanuel Pasir Luhur',
  'GKSBS Bauh Gunung Sari',
  'GKSBS Pugung Raharjo',
  'GKSBS Mengandung Sari',
  'GKSBS Jaya Guna',
  'GKSBS Batang Hari',
  'GKSBS Bumi Agung',
];

export default function Natal2026Page() {
  const [fullName, setFullName] = useState('');
  const [selectedChurch, setSelectedChurch] = useState('');
  const [customChurch, setCustomChurch] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    ticketCode?: string;
    fullName?: string;
    church?: string;
    error?: string;
  } | null>(null);

  const [qrUrl, setQrUrl] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const finalChurch = selectedChurch === 'Other' ? customChurch : selectedChurch;

    if (!finalChurch.trim()) {
      setResult({ success: false, error: 'Silakan isi asal gereja kamu.' });
      setLoading(false);
      return;
    }

    const res = await registerNatal({
      fullName,
      church: finalChurch,
    });

    if (res.success && res.data) {
      setResult({
        success: true,
        ticketCode: res.data.ticketCode,
        fullName: res.data.fullName,
        church: res.data.church,
      });

      try {
        const qrDataUrl = await QRCode.toDataURL(res.data.ticketCode, {
          width: 300,
          margin: 2,
          color: {
            dark: '#3b3028',
            light: '#ffffff',
          },
        });
        setQrUrl(qrDataUrl);
      } catch (err) {
        console.error('Gagal generate QR Code:', err);
      }
    } else {
      setResult({
        success: false,
        error: res.error || 'Terjadi kesalahan saat pendaftaran.',
      });
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen pt-20 pb-12 px-4 scroll-smooth">
      <div className="w-full max-w-xl mx-auto space-y-4">

        {/* --- CARD BANNER INFORMASI NATAL --- */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-[#3b3028]/10 shadow-lg overflow-hidden text-center pb-5 animate-hero-image">
          
          {/* HEADER GAMBAR BANNER */}
          <div className="w-full h-52 sm:h-60 overflow-hidden relative rounded-t-3xl bg-[#f8f5f1]">
            <img 
              src="/images/natal-gabungan-2026.png" 
              alt="Header Natal Gabungan 2026" 
              className="w-full h-auto object-cover object-top scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/natal-gabungan-2026.png";
              }}
            />
          </div>

          {/* KONTEN TEKS BANNER */}
          <div className="px-5 md:px-7 pt-3 space-y-2.5 text-center">
            <div className="inline-block px-3 py-0.5 bg-amber-100/70 text-amber-900 rounded-full text-[10px] font-bold tracking-widest uppercase animate-hero-label">
              🎄 Natal Pemuda Klasis 2026 🎄
            </div>

            <h1 className="font-heading text-lg md:text-xl font-bold text-[#3b3028] leading-snug animate-hero-title">
              Pendaftaran Peserta Natal <br className="hidden sm:inline" />
              <span className="text-amber-800">Pemuda/i Klasis Pugung Raharjo 2026</span> ✨
            </h1>

            <p className="text-xs leading-relaxed text-[#3b3028]/80">
              Dalam rangka menyambut kelahiran Sang Juruselamat, kami mengundang seluruh pemuda-pemudi se-klasis Pugung Raharjo untuk hadir dan bersama-sama merayakan <strong>Natal Pemuda Klasis Pugung Raharjo 2026</strong>. 🎉
            </p>

            <p className="text-[11px] italic text-[#3b3028]/70 animate-hero-verse">
              Dengan penuh sukacita, kita akan merayakan kasih dan terang Kristus yang senantiasa hadir dalam kehidupan kita.
            </p>

            {/* BOX TEMA NATAL */}
            <div className="p-3 bg-[#f8f5f1] border border-[#3b3028]/15 rounded-2xl space-y-1 my-2">
              <span className="text-[9px] font-bold uppercase tracking-wider text-amber-900">
                🌟 TEMA NATAL 🌟
              </span>
              <h2 className="font-heading text-base md:text-lg font-bold text-[#3b3028]">
                &quot;TERANG DI TENGAH KEGELAPAN&quot;
              </h2>
              <div className="text-[11px] font-heading italic border-t border-[#3b3028]/10 pt-1 mt-0.5 text-[#3b3028]/90">
                &quot;Terang itu bercahaya di dalam kegelapan dan kegelapan itu tidak menguasainya.&quot;
                <p className="font-sans font-bold not-italic text-[10px] text-amber-900 mt-0.5">
                  📖 Yohanes 1:5
                </p>
              </div>
            </div>

            {/* JADWAL & LOKASI */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left text-xs pt-1">
              <div className="p-2.5 bg-[#f8f5f1]/60 rounded-xl border border-[#3b3028]/10 flex items-center gap-2.5">
                <span className="text-lg">📅</span>
                <div>
                  <p className="font-bold text-[11px] text-[#3b3028]">Hari / Tanggal</p>
                  <p className="font-semibold text-xs text-[#3b3028]/80">Minggu, 20 Desember 2026</p>
                </div>
              </div>

              <div className="p-2.5 bg-[#f8f5f1]/60 rounded-xl border border-[#3b3028]/10 flex items-center gap-2.5">
                <span className="text-lg">📍</span>
                <div>
                  <p className="font-bold text-[11px] text-[#3b3028]">Tempat Pelaksanaan</p>
                  <p className="font-semibold text-xs text-[#3b3028]/80">GKSBS Gunung Pasir Jaya <span className="text-[10px] opacity-60 block sm:inline">(Klp. Gloria)</span></p>
                </div>
              </div>
            </div>

            {/* --- CONTACT PERSON & GRUP WHATSAPP --- */}
            <div className="pt-2 space-y-2 text-left text-xs">
              {/* CONTACT PERSON */}
              <div className="p-3 bg-amber-50/60 border border-amber-900/10 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="font-bold text-[11px] text-[#3b3028] flex items-center gap-1">
                    <span>📞</span> (CP) Rifki Prasetya
                  </p>
                </div>
                <a 
                  href="https://wa.me/62895704452518" // Ganti dengan nomor WhatsApp CP Panitia
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-[#3b3028] hover:bg-[#3b3028]/90 text-white font-bold rounded-xl text-[10px] transition"
                >
                  Hubungi CP
                </a>
              </div>

              {/* GRUP WHATSAPP PESERTA */}
              <div className="p-3 bg-emerald-50/60 border border-emerald-900/10 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="font-bold text-[11px] text-emerald-950 flex items-center gap-1">
                    <span>💬</span> Grup WhatsApp Pemuda Klasis Pugung Raharjo
                  </p>
                  <p className="text-[11px] text-emerald-900/80">Gabung grup untuk info & pengumuman acara</p>
                </div>
                <a 
                  href="https://chat.whatsapp.com/LfsejJcOuKc3Qhzv1BmdTO" // Ganti dengan link grup WA resmi
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-[10px] transition"
                >
                  Join Grup
                </a>
              </div>
            </div>

            <p className="text-xs font-bold pt-2 text-[#3b3028]">
              Sampai berjumpa dalam sukacita Natal! 🎄 <br />
              <span className="text-amber-800">God Bless You! ❤️</span>
            </p>
          </div>
        </div>


        {/* --- FORMULIR PENDAFTARAN ATAU HASIL TIKET --- */}
        <div id="daftar" className="bg-white/90 backdrop-blur-md rounded-3xl p-5 md:p-6 border border-[#3b3028]/10 shadow-lg animate-hero-buttons scroll-mt-24">
          {result?.success ? (
            <div className="text-center space-y-4">
              <div className="space-y-1">
                <span className="inline-block text-[10px] font-bold tracking-widest uppercase bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full">
                  Pendaftaran Berhasil 🎉
                </span>
                <h2 className="font-heading text-lg font-bold text-[#3b3028]">QR-Code Absensi</h2>
                <p className="text-xs text-[#3b3028]/70">Simpan atau tangkap layar (screenshot) QR Code ini untuk absensi di lokasi acara.</p>
              </div>

              {/* TIKET BOX */}
              <div className="p-4 bg-[#f8f5f1] border-2 border-amber-300 rounded-3xl space-y-3">
                <div className="bg-white p-3 rounded-2xl inline-block shadow-sm">
                  {qrUrl && <img src={qrUrl} alt="QR Code Tiket" className="w-44 h-44 mx-auto" />}
                </div>

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-[#3b3028]/50">Kode Absensi</p>
                  <p className="text-xl font-black font-mono tracking-wider text-amber-900">{result.ticketCode}</p>
                </div>

                <div className="border-t border-[#3b3028]/10 pt-2 space-y-0.5 text-xs">
                  <p className="font-heading font-bold text-sm text-[#3b3028]">{result.fullName}</p>
                  <p className="text-xs text-[#3b3028]/70 font-medium">{result.church}</p>
                </div>
              </div>

              {qrUrl && (
                <a
                  href={qrUrl}
                  download={`Tiket-Natal-${result.fullName}.png`}
                  className="inline-block w-full bg-[#3b3028] hover:bg-[#3b3028]/90 text-white font-bold py-3 rounded-xl text-xs transition shadow-md"
                >
                  📥 Unduh QR Code (PNG)
                </a>
              )}

              <button
                onClick={() => {
                  setResult(null);
                  setFullName('');
                  setSelectedChurch('');
                  setCustomChurch('');
                }}
                className="w-full bg-[#f8f5f1] hover:bg-[#3b3028]/10 text-[#3b3028] font-bold py-2.5 rounded-xl text-xs transition"
              >
                Daftar Peserta Lain
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center space-y-0.5">
                <h2 className="font-heading text-lg font-bold text-[#3b3028]">Formulir Pendaftaran</h2>
                <p className="text-xs text-[#3b3028]/70">Silakan isi data diri kamu di bawah ini secara lengkap.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                {result?.error && (
                  <div className="p-2.5 bg-red-50 text-red-700 rounded-xl text-xs font-medium border border-red-200 text-center">
                    {result.error}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold uppercase mb-1 text-[#3b3028]">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Masukkan nama lengkap kamu..."
                    className="w-full px-3.5 py-2.5 bg-[#f8f5f1]/50 border border-[#3b3028]/20 rounded-xl text-xs text-[#3b3028] focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase mb-1 text-[#3b3028]">
                    Asal Gereja <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={selectedChurch}
                    onChange={(e) => setSelectedChurch(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#f8f5f1]/50 border border-[#3b3028]/20 rounded-xl text-xs text-[#3b3028] focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  >
                    <option value="">-- Pilih Asal Gereja --</option>
                    {FIXED_CHURCHES.map((church) => (
                      <option key={church} value={church}>
                        {church}
                      </option>
                    ))}
                    <option value="Other">Other (Input Manual)</option>
                  </select>
                </div>

                {selectedChurch === 'Other' && (
                  <div>
                    <label className="block text-xs font-semibold uppercase mb-1 text-[#3b3028]">
                      Nama Gereja Lainnya <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={customChurch}
                      onChange={(e) => setCustomChurch(e.target.value)}
                      placeholder="Masukkan nama gereja kamu..."
                      className="w-full px-3.5 py-2.5 bg-[#f8f5f1]/50 border border-[#3b3028]/20 rounded-xl text-xs text-[#3b3028] focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#3b3028] hover:bg-[#3b3028]/90 text-white font-bold py-3 rounded-xl text-xs transition shadow-md disabled:opacity-50"
                >
                  {loading ? 'Memproses...' : 'Daftar Sekarang 🎉'}
                </button>
              </form>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}