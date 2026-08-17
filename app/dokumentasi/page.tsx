"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ScrollReveal from "@/components/scroll-reveal";

const dokumentasi = [
  {
    id: 1,
    description:
      "Ibadah Natal sebagai momen untuk merayakan kasih Kristus dan mempererat persaudaraan.",
    label: "Ibadah Natal GKSBS Gunung Pasir Jaya 25 Desember 2025",
    driveLink:
      "https://drive.google.com/drive/folders/1jl6_Z3mPgqMvhuC4jk1HiAv9yXda-KG7",
    images: [
      {
        src: "/images/1a.jpeg",
        alt: "Dokumentasi Natal Pemuda Gabungan 1",
      },
      {
        src: "/images/1b.jpeg",
        alt: "Dokumentasi Natal Pemuda Gabungan 2",
      },
      {
        src: "/images/1c.jpeg",
        alt: "Dokumentasi Natal Pemuda Gabungan 3",
      },
    ],
  },

  {
    id: 2,
    description:
      "Kesempatan untuk menikmati kebersamaan, membangun relasi, dan bertumbuh sebagai satu persekutuan.",
    label: "Makrab Youth GKSBS Gunung Pasir Jaya 4 Juli 2026",
    driveLink:
      "https://drive.google.com/drive/folders/1pkywYGMsC26gSm7XVOToKIFuZ8E4xm9D",
    images: [
      {
        src: "/images/2a.jpg",
        alt: "Dokumentasi Makrab Pemuda 1",
      },
      {
        src: "/images/2b.jpg",
        alt: "Dokumentasi Makrab Pemuda 2",
      },
      {
        src: "/images/2c.jpg",
        alt: "Dokumentasi Makrab Pemuda 3",
      },
      {
        src: "/images/2d.jpg",
        alt: "Dokumentasi Makrab Pemuda 4",
      },
      {
        src: "/images/2f.jpg",
        alt: "Dokumentasi Makrab Pemuda 5",
      },
    ],
  },
];

export default function DokumentasiPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EC] text-[#2E2A26]">

      {/* =====================================================
          HEADER
      ====================================================== */}
      <section className="relative overflow-hidden px-6 pb-20 pt-36 sm:px-10 lg:px-16">
  <div className="mx-auto max-w-[1800px]">

          <ScrollReveal>

            <div className="max-w-4xl">

              {/* LABEL */}
              <div className="mb-6 flex items-center gap-3">

                <div className="h-px w-10 bg-[#BFA98D]" />

                <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#8B7355] sm:text-sm">
                  Dokumentasi
                </p>

              </div>


              {/* HEADING */}
              <h1 className="font-heading text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                Moments we
                <br />

                <span className="italic text-[#8B7355]">
                  shared together.
                </span>
              </h1>


              {/* DESCRIPTION */}
              <p className="mt-7 max-w-2xl text-justify text-base leading-8 text-[#6F6860] sm:text-lg">
                Kumpulan momen dari berbagai perjalanan dan kegiatan
                Youth GKSBS Gunung Pasir Jaya.
              </p>

            </div>

          </ScrollReveal>

        </div>
      </section>


      {/* =====================================================
          GALERI
      ====================================================== */}
      <section className="bg-white px-6 py-24 sm:px-10 lg:px-16">

        <div className="mx-auto max-w-[1560px]">

          <div className="space-y-28">

            {dokumentasi.map((item, index) => (

              <ScrollReveal
                key={item.id}
                delay={index * 150}
              >

                <DokumentasiCard
                  item={item}
                  reverse={index % 2 !== 0}
                />

              </ScrollReveal>

            ))}

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
                OUR JOURNEY
              </p>

              <h2 className="mx-auto mt-5 max-w-3xl font-heading text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
                Setiap momen menjadi bagian dari
                <span className="italic text-[#D8C7B3]">
                  {" "}perjalanan kami.
                </span>
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
                Bersama-sama kami belajar, melayani, tertawa,
                dan bertumbuh dalam kasih Kristus.
              </p>

            </div>

          </ScrollReveal>

        </div>

      </section>

    </main>
  );
}


/* ============================================================
   DOKUMENTASI CARD
============================================================ */

type DokumentasiItem = {
  id: number;
  description: string;
  label: string;
  driveLink: string;
  images: {
    src: string;
    alt: string;
  }[];
};


function DokumentasiCard({
  item,
  reverse,
}: {
  item: DokumentasiItem;
  reverse: boolean;
}) {

  const [current, setCurrent] = useState(0);


  /* ==========================================================
     AUTO SLIDE
  =========================================================== */

  useEffect(() => {

    const interval = setInterval(() => {

      setCurrent((prev) => (
        prev + 1
      ) % item.images.length);

    }, 4000);

    return () => clearInterval(interval);

  }, [item.images.length]);


  return (
    <article
      className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${
        reverse
          ? "lg:[&>*:first-child]:order-2"
          : ""
      }`}
    >


      {/* =====================================================
          IMAGE SLIDER
      ====================================================== */}
      <div>

        <div className="group relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-[#E6DED3] shadow-sm">

          {item.images.map((image, index) => (

            <Image
              key={image.src}
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-out ${
                index === current
                  ? "scale-100 opacity-100"
                  : "scale-[1.04] opacity-0"
              }`}
            />

          ))}


          {/* IMAGE OVERLAY */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />


          {/* SLIDE NUMBER */}
          <div className="absolute bottom-5 left-5 rounded-full bg-black/40 px-4 py-2 text-xs font-medium tracking-wider text-white backdrop-blur-md">
            {current + 1}
            {" / "}
            {item.images.length}
          </div>

        </div>


        {/* ===================================================
            SLIDE INDICATOR
        ==================================================== */}
        <div className="mt-5 flex items-center justify-center gap-2">

          {item.images.map((_, index) => (

            <button
              key={index}
              type="button"
              aria-label={`Tampilkan foto ${index + 1}`}
              onClick={() => setCurrent(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === current
                  ? "w-8 bg-[#8B7355]"
                  : "w-1.5 bg-[#CDBDAA] hover:bg-[#A9967E]"
              }`}
            />

          ))}

        </div>

      </div>


      {/* =====================================================
          TEXT
      ====================================================== */}
      <div className="max-w-xl">

        {/* LABEL */}
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#8B7355] sm:text-sm">
          {item.label}
        </p>


        {/* DECORATIVE LINE */}
        <div className="mt-5 h-px w-12 bg-[#CDBDAA]" />


        {/* DESCRIPTION */}
        <p className="mt-6 text-justify text-base leading-8 text-[#6F6860] sm:text-lg">
          {item.description}
        </p>


        {/* DRIVE BUTTON */}
        <a
          href={item.driveLink}
          target="_blank"
          rel="noopener noreferrer"
          className="group/drive mt-8 inline-flex items-center gap-3 rounded-lg border border-[#BFA98D] px-5 py-3.5 text-sm font-medium text-[#6F503B] transition-all duration-300 hover:border-[#8B7355] hover:bg-[#F7F3EC]"
        >

          {/* GOOGLE DRIVE ICON */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5"
            aria-hidden="true"
          >

            <path
              d="M8.5 3h5l7 12H15.5L8.5 3Z"
              fill="currentColor"
              opacity="0.85"
            />

            <path
              d="M8.5 3 2 14.5 4.5 19 11 7.5 8.5 3Z"
              fill="currentColor"
              opacity="0.6"
            />

            <path
              d="M4.5 19h13l2.5-4.5H7L4.5 19Z"
              fill="currentColor"
              opacity="0.4"
            />

          </svg>


          <span>
            Lihat dokumentasi lengkap
          </span>


          {/* ARROW */}
          <span className="transition-transform duration-300 group-hover/drive:translate-x-1">
            →
          </span>

        </a>

      </div>

    </article>
  );
}