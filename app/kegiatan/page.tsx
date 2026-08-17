import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function KegiatanPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EC] text-[#2E2A26]">

      {/* =====================================================
          NAVBAR
      ====================================================== */}
      <Navbar />


      {/* =====================================================
          HEADER
      ====================================================== */}
      <section className="relative overflow-hidden px-6 pb-16 pt-36 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">

          <div className="max-w-3xl">

            {/* Label */}
            <div className="mb-5 flex items-center gap-3">
              <div className="h-px w-10 bg-[#8B7355]" />

              <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#8B7355] sm:text-sm">
                Kegiatan
              </p>
            </div>


            {/* Heading */}
            <h1 className="font-heading text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Bertemu,
              <br />

              <span className="italic text-[#8B7355]">
                bertumbuh bersama.
              </span>
            </h1>


            {/* Description */}
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#6F6860] sm:text-lg">
              Ruang bagi pemuda-pemudi untuk bersekutu, bertumbuh dalam iman,
              dan melayani bersama.
            </p>

          </div>

        </div>
      </section>


      {/* =====================================================
          AGENDA
      ====================================================== */}
      <section className="bg-white px-6 py-20 sm:px-10 lg:px-16">

        <div className="mx-auto max-w-7xl">

          {/* Section Label */}
          <div className="mb-10">

            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#8B7355]">
              Agenda
            </p>

          </div>


          {/* =================================================
              CARD GRID
          ================================================== */}
          <div className="grid gap-7 md:grid-cols-2">


            {/* =================================================
                CARD 1 — PA RUTIN
            ================================================== */}
            <article className="overflow-hidden rounded-2xl border border-[#DED7CE] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

              {/* Image */}
              <div className="aspect-[16/9] overflow-hidden bg-[#E6DED3]">

                <img
                  src="/images/pa-pemuda.png"
                  alt="Ibadah PA Rutin Pemuda GKSBS Gunung Pasir Jaya"
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />

              </div>


              {/* Content */}
              <div className="flex min-h-[390px] flex-col p-7">

                <h3 className="font-heading text-3xl">
                  Ibadah PA Rutin
                </h3>


                <p className="mt-3 leading-7 text-[#6F6860]">
                  Persekutuan rutin untuk mendalami firman Tuhan,
                  berdiskusi, dan bertumbuh bersama dalam iman.
                </p>


                {/* Info */}
                <div className="mt-6 space-y-3 text-sm text-[#6F6860]">

                  {/* Hari */}
                  <div className="flex items-center gap-3">

                    {/* SVG Clock */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#8B7355]"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <polyline points="12 7 12 12 15 14" />
                    </svg>

                    <span>
                      Setiap Sabtu
                    </span>

                  </div>


                  {/* Lokasi */}
                  <div className="flex items-center gap-3">

                    {/* SVG Google Maps Style Pin */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#8B7355]"
                    >
                      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>

                    <span>
                      Menyesuaikan Jadwal
                    </span>

                  </div>

                </div>


                {/* Button */}
                <a
                  href="https://bit.ly/Jadwal-PA-Pemuda_dan_Kolekte-Ibadah-Minggu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto flex w-full items-center justify-center rounded-lg border border-[#BFA98D] px-5 py-3 text-sm font-medium text-[#6F503B] transition duration-300 hover:bg-[#F7F3EC]"
                >
                  Lihat Jadwal PA
                </a>

              </div>

            </article>


            {/* =================================================
                CARD 2 — NATAL PEMUDA GABUNGAN
            ================================================== */}
            <article className="overflow-hidden rounded-2xl border border-[#DED7CE] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

              {/* Image */}
              <div className="aspect-[16/9] overflow-hidden bg-[#E6DED3]">

                <img
                  src="/images/natal-gabungan-2026.png"
                  alt="Ibadah Natal Pemuda Gabungan 2026"
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />

              </div>


              {/* Content */}
              <div className="flex min-h-[390px] flex-col p-7">

                <h3 className="font-heading text-3xl">
                  Youth GKSBS Klasis Pugung Raharjo Christmas Celebration 2026
                </h3>


                <p className="mt-3 leading-7 text-[#6F6860]">
                  Perayaan Natal bersama sebagai momen untuk merayakan
                  kasih Kristus dan mempererat persaudaraan antar pemuda-pemudi.
                </p>


                {/* Info */}
                <div className="mt-6 space-y-3 text-sm text-[#6F6860]">

                  {/* Tanggal */}
                  <div className="flex items-center gap-3">

                    {/* SVG Clock */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#8B7355]"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <polyline points="12 7 12 12 15 14" />
                    </svg>

                    <span>
                      To be Announced
                    </span>

                  </div>


                  {/* Lokasi */}
                  <div className="flex items-center gap-3">

                    {/* SVG Google Maps Style Pin */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#8B7355]"
                    >
                      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>

                    <span>
                      GKSBS Gunung Pasir Jaya (Gloria)
                    </span>

                  </div>

                </div>


                {/* Button */}
                <a
                  href="LINK_SPS_JADWAL_PA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto flex w-full items-center justify-center rounded-lg border border-[#BFA98D] px-5 py-3 text-sm font-medium text-[#6F503B] transition duration-300 hover:bg-[#F7F3EC]"
                >
                  Lihat Detail
                </a>

              </div>

            </article>

          </div>

        </div>

      </section>
    </main>
  );
}