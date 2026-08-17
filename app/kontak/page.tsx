"use client";

import Image from "next/image";
import ScrollReveal from "@/components/scroll-reveal";

export default function KontakPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EC] text-[#2E2A26]">

      {/* =====================================================
          1 — HEADER
      ====================================================== */}
      <section className="relative overflow-hidden px-6 pb-20 pt-36 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1560px]">

          <ScrollReveal>
            <div className="max-w-4xl">

              {/* LABEL */}
              <div className="mb-6 flex items-center gap-3">

                <div className="h-px w-10 bg-[#BFA98D]" />

                <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#8B7355]">
                  Kontak
                </p>

              </div>


              {/* HEADING */}
              <h1 className="font-heading text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                Let&apos;s
                <br />

                <span className="italic text-[#8B7355]">
                  Connect.
                </span>
              </h1>


              {/* DESCRIPTION */}
              <p className="mt-7 max-w-2xl text-justify text-base leading-8 text-[#6F6860] sm:text-lg">
                Punya pertanyaan, ingin mengenal lebih dekat, atau ingin
                menyampaikan sesuatu? Kami terbuka untuk mendengar dan
                terhubung bersama.
              </p>

            </div>
          </ScrollReveal>

        </div>
      </section>


      {/* =====================================================
          2 — HUBUNGI KAMI
      ====================================================== */}
      <section className="bg-white px-6 py-24 sm:px-10 lg:px-16">

        <div className="mx-auto max-w-[1560px]">

          <ScrollReveal>

            <div className="mb-12 max-w-3xl">

              {/* LABEL */}
              <div className="mb-5 flex items-center gap-3">

                <div className="h-px w-10 bg-[#BFA98D]" />

                <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#8B7355]">
                  Hubungi Kami
                </p>

              </div>


              {/* HEADING */}
              <h2 className="font-heading text-4xl leading-tight sm:text-5xl">
                Stay Connected.
              </h2>


              {/* DESCRIPTION */}
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#6F6860]">
                Temukan kami melalui kontak dan media sosial berikut.
              </p>

            </div>

          </ScrollReveal>


          {/* CONTACT & SOCIAL CARDS */}
          <div className="grid gap-6 sm:grid-cols-2">

            {/* =================================================
                WHATSAPP — AMSAL
            ================================================== */}
            <ScrollReveal delay={0}>

              <a
                href="https://wa.me/6289652945702"
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full rounded-[1.5rem] border border-[#DED7CE] bg-[#F7F3EC] p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
              >

                <div className="flex items-start justify-between">

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#654734] text-white">
                    <WhatsAppIcon />
                  </div>

                  <span className="text-sm text-[#8B7355] transition-transform duration-300 group-hover:translate-x-1">
                    WhatsApp →
                  </span>

                </div>


                <h3 className="mt-8 font-heading text-3xl">
                  Amsal Gaeldo Siadari
                </h3>

                <p className="mt-2 text-sm text-[#8B7355]">
                  Ketua
                </p>

                <p className="mt-5 text-sm leading-7 text-[#6F6860]">
                  Hubungi untuk informasi umum atau hal lain mengenai
                  Youth GKSBS Gunung Pasir Jaya.
                </p>

              </a>

            </ScrollReveal>


            {/* =================================================
                WHATSAPP — RIFKI
            ================================================== */}
            <ScrollReveal delay={100}>

              <a
                href="https://wa.me/62895704452518"
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full rounded-[1.5rem] border border-[#DED7CE] bg-[#F7F3EC] p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
              >

                <div className="flex items-start justify-between">

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#654734] text-white">
                    <WhatsAppIcon />
                  </div>

                  <span className="text-sm text-[#8B7355] transition-transform duration-300 group-hover:translate-x-1">
                    WhatsApp →
                  </span>

                </div>


                <h3 className="mt-8 font-heading text-3xl">
                  Rifki Prasetya
                </h3>

                <p className="mt-2 text-sm text-[#8B7355]">
                  Wakil Ketua
                </p>

                <p className="mt-5 text-sm leading-7 text-[#6F6860]">
                  Hubungi untuk informasi mengenai kegiatan, pelayanan,
                  dan kepengurusan Youth GKSBS Gunung Pasir Jaya.
                </p>

              </a>

            </ScrollReveal>


            {/* =================================================
                INSTAGRAM
            ================================================== */}
            <ScrollReveal delay={150}>

              <a
                href="https://www.instagram.com/youthgksbs_gpj?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full rounded-[1.5rem] border border-[#DED7CE] bg-[#F7F3EC] p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
              >

                <div className="flex items-start justify-between">

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#654734] text-white">
                    <InstagramIcon />
                  </div>

                  <span className="text-sm text-[#8B7355] transition-transform duration-300 group-hover:translate-x-1">
                    Instagram →
                  </span>

                </div>


                <h3 className="mt-8 font-heading text-3xl">
                  Instagram
                </h3>

                <p className="mt-2 text-sm text-[#8B7355]">
                  youthgksbs_gpj
                </p>

                <p className="mt-5 text-sm leading-7 text-[#6F6860]">
                  Ikuti dokumentasi, informasi kegiatan, dan berbagai
                  cerita dari perjalanan pemuda.
                </p>

              </a>

            </ScrollReveal>


            {/* =================================================
                TIKTOK
            ================================================== */}
            <ScrollReveal delay={200}>

              <a
                href="https://www.tiktok.com/@youth__.gksbsgpj?is_from_webapp=1&sender_device=pc"
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full rounded-[1.5rem] border border-[#DED7CE] bg-[#F7F3EC] p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
              >

                <div className="flex items-start justify-between">

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#654734] text-white">
                    <TikTokIcon />
                  </div>

                  <span className="text-sm text-[#8B7355] transition-transform duration-300 group-hover:translate-x-1">
                    TikTok →
                  </span>

                </div>


                <h3 className="mt-8 font-heading text-3xl">
                  TikTok
                </h3>

                <p className="mt-2 text-sm text-[#8B7355]">
                  youth__.gksbsgpj
                </p>

                <p className="mt-5 text-sm leading-7 text-[#6F6860]">
                  Temukan video dan keseruan kegiatan pemuda melalui
                  konten kami.
                </p>

              </a>

            </ScrollReveal>

          </div>

        </div>

      </section>


      {/* =====================================================
          3 — LOKASI
      ====================================================== */}
      <section className="px-6 py-24 sm:px-10 lg:px-16">

        <div className="mx-auto max-w-[1560px]">

          <ScrollReveal>

            <div className="mb-12 max-w-3xl">

              {/* LABEL */}
              <div className="mb-5 flex items-center gap-3">

                <div className="h-px w-10 bg-[#BFA98D]" />

                <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#8B7355]">
                  Lokasi
                </p>

              </div>


              {/* HEADING */}
              <h2 className="font-heading text-4xl leading-tight sm:text-5xl">
                Find us here.
              </h2>


              {/* DESCRIPTION */}
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#6F6860]">
                Kunjungi Gereja GKSBS Gunung Pasir Jaya dan temukan lokasi
                gereja melalui Google Maps.
              </p>

            </div>

          </ScrollReveal>


          {/* MAP CARD */}
          <ScrollReveal>

            <div className="overflow-hidden rounded-[1.5rem] border border-[#DED7CE] bg-white shadow-sm">

              <div className="grid lg:grid-cols-[1.3fr_0.7fr]">

                {/* MAP IMAGE */}
                <div className="relative min-h-[350px] bg-[#E6DED3]">

                  <Image
                    src="/images/maps-gksbs.png"
                    alt="Lokasi GKSBS Gunung Pasir Jaya"
                    fill
                    className="object-cover"
                  />

                </div>


                {/* MAP INFO */}
                <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F7F3EC] text-[#8B7355]">
                    <LocationIcon />
                  </div>


                  <h3 className="mt-6 font-heading text-3xl sm:text-4xl">
                    GKSBS Gunung Pasir Jaya
                  </h3>


                  <p className="mt-4 text-sm leading-7 text-[#6F6860]">
                    MHP3+JJ5, Jl. Ir. Sutami, Gn. Pasir Jaya,
                    Kec. Sekampung Udik, Kabupaten Lampung Timur,
                    Lampung 34376, Indonesia
                  </p>


                  <a
                    href="https://maps.app.goo.gl/iLUnZL8b9AErmyve6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 inline-flex w-fit items-center gap-2 rounded-lg bg-[#4A3426] px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-[#654734]"
                  >
                    Buka di Google Maps

                    <span className="transition-transform duration-300 hover:translate-x-1">
                      →
                    </span>

                  </a>

                </div>

              </div>

            </div>

          </ScrollReveal>

        </div>

      </section>


      {/* =====================================================
          4 — ASPIRASI
      ====================================================== */}
      <section className="relative overflow-hidden px-6 pb-20 pt-36 sm:px-10 lg:px-16">
  <div className="mx-auto max-w-[1560px]">

          <ScrollReveal>

            <div className="mx-auto max-w-3xl text-center">

              {/* LABEL */}
              <div className="mb-5 flex items-center justify-center gap-3">

                <div className="h-px w-10 bg-[#BFA98D]" />

                <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#8B7355]">
                  Aspirasi
                </p>

                <div className="h-px w-10 bg-[#BFA98D]" />

              </div>


              {/* HEADING */}
              <h2 className="font-heading text-4xl leading-tight sm:text-5xl lg:text-6xl">
                Your voice
                <br />

                <span className="italic text-[#8B7355]">
                  matters.
                </span>
              </h2>


              {/* DESCRIPTION */}
              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#6F6860] sm:text-lg">
                Sampaikan aspirasi, kritik, atau saran untuk membantu
                kami membangun persekutuan yang lebih baik.
              </p>

            </div>

          </ScrollReveal>


          {/* GOOGLE FORM CARD */}
          <ScrollReveal>

            <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-[1.5rem] border border-[#DED7CE] bg-[#F7F3EC]">

              <div className="grid md:grid-cols-[0.8fr_1.2fr]">

                {/* LEFT */}
                <div className="p-8 sm:p-10 lg:p-12">

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#654734] text-white">
                    <DocumentIcon />
                  </div>


                  <h3 className="mt-6 font-heading text-3xl sm:text-4xl">
                    Aspirasi Youth GKSBS GPJ
                  </h3>


                  <p className="mt-4 text-sm leading-7 text-[#6F6860]">
                    Setiap masukan berarti. Sampaikan apa yang ingin
                    kamu lihat, rasakan, atau kembangkan bersama.
                  </p>

                </div>


                {/* RIGHT */}
                <div className="flex items-center bg-white p-8 sm:p-10 lg:p-12">

                  <div>

                    <p className="text-sm leading-7 text-[#6F6860]">
                      Form ini dapat digunakan untuk menyampaikan
                      kritik, saran, ide kegiatan, maupun aspirasi
                      lainnya.
                    </p>


                    <a
                      href="https://forms.gle/ESo3gQP9vwyS29pn8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-[#4A3426] px-6 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#654734]"
                    >
                      Isi G-Form Aspirasi

                      <span>
                        →
                      </span>

                    </a>

                  </div>

                </div>

              </div>

            </div>

          </ScrollReveal>

        </div>

      </section>


      {/* =====================================================
          5 — PENUTUP
      ====================================================== */}
      <section className="relative overflow-hidden px-6 py-28 text-center text-white sm:px-10 lg:px-16">

        {/* BACKGROUND IMAGE */}
        <Image
          src="/images/footer2.jpeg"
          alt=""
          fill
          className="object-cover"
        />


        {/* OVERLAY */}
        <div className="absolute inset-0 bg-[#2E2119]/65" />


        {/* CONTENT */}
        <div className="relative mx-auto max-w-3xl">

          <ScrollReveal>

            <p className="font-heading text-4xl leading-tight sm:text-5xl lg:text-6xl">
              WE GROW
              <br />

              <span className="italic text-[#D8C7B3]">
                IN CHRIST.
              </span>
            </p>


            <p className="mt-7 text-sm font-medium uppercase tracking-[0.3em] text-white/80">
              Come and join us!
            </p>

          </ScrollReveal>

        </div>

      </section>

    </main>
  );
}


/* ============================================================
   WHATSAPP ICON
============================================================ */

function WhatsAppIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="M20.52 3.48A11.87 11.87 0 0 0 12.05 0C5.5.17.17 5.33.17 11.88c0 2.09.55 4.13 1.59 5.93L.1 24l6.34-1.66a11.84 11.84 0 0 0 5.61 1.43h.01c6.55 0 11.88-5.33 11.88-11.88 0-3.17-1.23-6.15-3.42-8.41ZM12.06 21.77h-.01a9.84 9.84 0 0 1-5.02-1.37l-.36-.21-3.76.98 1-3.67-.23-.38a9.87 9.87 0 1 1 8.38 4.65Zm5.42-7.39c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.09 4.5.71.31 1.26.49 1.69.63.71.23 1.35.2 1.86.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
    </svg>
  );
}


/* ============================================================
   INSTAGRAM ICON
============================================================ */

function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
      />

      <circle
        cx="12"
        cy="12"
        r="4"
      />

      <circle
        cx="17.5"
        cy="6.5"
        r="1"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}


/* ============================================================
   TIKTOK ICON
============================================================ */

function TikTokIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.31h-3.25v13.67a2.89 2.89 0 1 1-2.89-2.89c.3 0 .59.05.86.13v-3.31a6.17 6.17 0 1 0 5.28 6.1V8.96a8.05 8.05 0 0 0 4.71 1.52V7.23a4.8 4.8 0 0 1-.94-.54Z" />
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
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}


/* ============================================================
   DOCUMENT ICON
============================================================ */

function DocumentIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8" />
      <path d="M8 17h6" />
    </svg>
  );
}