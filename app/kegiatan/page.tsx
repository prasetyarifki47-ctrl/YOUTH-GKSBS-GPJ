"use client";

import Image from "next/image";
import ScrollReveal from "@/components/scroll-reveal";

export default function KegiatanPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EC] text-[#2E2A26]">

      {/* =====================================================
          HEADER
      ====================================================== */}
      <section className="relative overflow-hidden px-6 pb-20 pt-36 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1560px]">

          <ScrollReveal>
            <div className="max-w-4xl">

              {/* LABEL */}
              <div className="mb-6 flex items-center gap-3">

                <div className="h-px w-10 bg-[#BFA98D]" />

                <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#8B7355]">
                  Kegiatan
                </p>

              </div>


              {/* HEADING */}
              <h1 className="font-heading text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                Gathered
                <br />

                <span className="italic text-[#8B7355]">
                  to grow.
                </span>
              </h1>


              {/* DESCRIPTION */}
              <p className="mt-7 max-w-2xl text-justify text-base leading-8 text-[#6F6860] sm:text-lg">
                Ruang bagi pemuda-pemudi untuk bersekutu, bertumbuh dalam
                iman, dan melayani bersama.
              </p>

            </div>
          </ScrollReveal>

        </div>
      </section>


      {/* =====================================================
          AGENDA
      ====================================================== */}
      <section className="relative overflow-hidden px-6 pb-20 pt-36 sm:px-10 lg:px-16">
  <div className="mx-auto max-w-[1560px]">

          {/* SECTION HEADING */}
          <ScrollReveal>

            <div className="mb-12 flex items-end justify-between gap-6">

              <div>

                <div className="mb-5 flex items-center gap-3">

                  <div className="h-px w-10 bg-[#BFA98D]" />

                  <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#8B7355]">
                    Agenda
                  </p>

                </div>

                <h2 className="font-heading text-4xl leading-tight sm:text-5xl">
                  Kegiatan yang akan datang.
                </h2>

              </div>

            </div>

          </ScrollReveal>


          {/* =================================================
              CARD GRID
          ================================================== */}
          <div className="grid gap-8 lg:grid-cols-2">


            {/* =================================================
                CARD 1 — PA RUTIN
            ================================================== */}
            <ScrollReveal delay={0}>

              <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-[#DED7CE] bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">

                {/* IMAGE */}
                <div className="relative aspect-[16/9] overflow-hidden bg-[#E6DED3]">

                  <Image
                    src="/images/pa-pemuda.png"
                    alt="Ibadah PA Rutin Pemuda GKSBS Gunung Pasir Jaya"
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />

                </div>


                {/* CONTENT */}
                <div className="flex flex-1 flex-col p-7 sm:p-8">

                  {/* CATEGORY */}
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#8B7355]">
                    Kegiatan Rutin
                  </p>


                  {/* TITLE */}
                  <h3 className="mt-3 font-heading text-3xl leading-tight sm:text-4xl">
                    Ibadah PA Rutin
                  </h3>


                  {/* DESCRIPTION */}
                  <p className="mt-4 text-justify text-sm leading-7 text-[#6F6860] sm:text-base">
                    Persekutuan rutin untuk mendalami firman Tuhan,
                    berdiskusi, dan bertumbuh bersama dalam iman.
                  </p>


                  {/* INFO */}
                  <div className="mt-7 space-y-4 text-sm text-[#6F6860]">

                    {/* WAKTU */}
                    <div className="flex items-center gap-3">

                      <ClockIcon />

                      <span>
                        Setiap Sabtu
                      </span>

                    </div>


                    {/* LOKASI */}
                    <div className="flex items-center gap-3">

                      <LocationIcon />

                      <span>
                        Menyesuaikan Jadwal
                      </span>

                    </div>

                  </div>


                  {/* BUTTON */}
                  <a
                    href="https://docs.google.com/spreadsheets/d/1Qqg40iGkGPSVBrnwFb09uWKZnO8FWUyyjl9_s4HjKP4/edit?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex w-full items-center justify-center rounded-lg border border-[#BFA98D] px-5 py-3.5 text-sm font-medium text-[#6F503B] transition-all duration-300 hover:border-[#8B7355] hover:bg-[#F7F3EC]"
                  >
                    Lihat Jadwal PA
                  </a>

                </div>

              </article>

            </ScrollReveal>


            {/* =================================================
                CARD 2 — NATAL PEMUDA GABUNGAN
            ================================================== */}
            <ScrollReveal delay={150}>

              <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-[#DED7CE] bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">

                {/* IMAGE */}
                <div className="relative aspect-[16/9] overflow-hidden bg-[#E6DED3]">

                  <Image
                    src="/images/natal-gabungan-2026.png"
                    alt="Ibadah Natal Pemuda Gabungan 2026"
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />

                </div>


                {/* CONTENT */}
                <div className="flex flex-1 flex-col p-7 sm:p-8">

                  {/* CATEGORY */}
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#8B7355]">
                    Agenda
                  </p>


                  {/* TITLE */}
                  <h3 className="mt-3 font-heading text-3xl leading-tight sm:text-4xl">
                    YOUTH GKSBS Klasis Pugung Raharjo Christmas Celebration 2026
                  </h3>


                  {/* DESCRIPTION */}
                  <p className="mt-4 text-justify text-sm leading-7 text-[#6F6860] sm:text-base">
                    Perayaan Natal bersama sebagai momen untuk merayakan
                    kasih Kristus dan mempererat persaudaraan antar
                    pemuda-pemudi.
                  </p>


                  {/* INFO */}
                  <div className="mt-7 space-y-4 text-sm text-[#6F6860]">

                    {/* WAKTU */}
                    <div className="flex items-center gap-3">

                      <ClockIcon />

                      <span>
                        To be announced
                      </span>

                    </div>


                    {/* LOKASI */}
                    <div className="flex items-center gap-3">

                      <LocationIcon />

                      <span>
                        GKSBS Gunung Pasir Jaya (Gloria)
                      </span>

                    </div>

                  </div>


                  {/* BUTTON */}
                  <a
                    href="#"
                    className="mt-8 inline-flex w-full items-center justify-center rounded-lg border border-[#BFA98D] px-5 py-3.5 text-sm font-medium text-[#6F503B] transition-all duration-300 hover:border-[#8B7355] hover:bg-[#F7F3EC]"
                  >
                    Lihat Detail
                  </a>

                </div>

              </article>

            </ScrollReveal>

          </div>

        </div>

      </section>


      {/* =====================================================
          BOTTOM CTA
      ====================================================== */}
      <section className="px-6 py-24 sm:px-10 lg:px-16">

        <div className="mx-auto max-w-[1560px]">

          <ScrollReveal>

            <div className="rounded-[1.5rem] border border-[#DED7CE] bg-[#4A3426] px-8 py-14 text-center sm:px-12">

              <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#D8C7B3]">
                COME AND JOIN US!
              </p>

              <h2 className="mx-auto mt-5 max-w-3xl font-heading text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
                Every gathering
                <span className="italic text-[#D8C7B3]">
                  <br />is a space to grow.
                </span>
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
                Ikuti berbagai kegiatan Youth GKSBS Gunung Pasir Jaya
                dan mari berjalan bersama dalam iman, pelayanan,
                dan persaudaraan.
              </p>

            </div>

          </ScrollReveal>

        </div>

      </section>

    </main>
  );
}


/* ============================================================
   CLOCK ICON
============================================================ */

function ClockIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 text-[#8B7355]"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 14" />
    </svg>
  );
}


/* ============================================================
   LOCATION ICON
============================================================ */

function LocationIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 text-[#8B7355]"
      aria-hidden="true"
    >
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}