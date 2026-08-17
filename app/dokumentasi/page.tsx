"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";

const dokumentasi = [
  {
    id: 1,
    title: "",
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
        src: "/images/1c.jpg",
        alt: "Dokumentasi Natal Pemuda Gabungan 3",
      },
      {
        src: "/images/1d.jpg",
        alt: "Dokumentasi Natal Pemuda Gabungan 4",
      },
      {
        src: "/images/1e.jpg",
        alt: "Dokumentasi Natal Pemuda Gabungan 5",
      },
    ],
  },

  {
    id: 2,
    title: "",
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
      <Navbar />

      {/* =====================================================
          HEADER
      ====================================================== */}
      <section className="relative overflow-hidden px-6 pb-20 pt-36 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            {/* Label */}
            <div className="mb-5 flex items-center gap-3">
              <div className="h-px w-10 bg-[#8B7355]" />

              <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#8B7355] sm:text-sm">
                Dokumentasi
              </p>
            </div>

            {/* Heading */}
            <h1 className="font-heading text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Momen yang
              <br />

              <span className="italic text-[#8B7355]">
                kami lalui bersama.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#6F6860] sm:text-lg">
              Kumpulan momen dari berbagai kegiatan Youth GKSBS Gunung Pasir
              Jaya.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          GALERI
      ====================================================== */}
      <section className="bg-white px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="space-y-24">
            {dokumentasi.map((item, index) => (
              <DokumentasiCard
                key={item.id}
                item={item}
                reverse={index % 2 !== 0}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

/* =========================================================
    DOKUMENTASI CARD
========================================================= */

type DokumentasiItem = {
  id: number;
  title: string;
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

  /* =======================================================
      AUTO SLIDE
  ======================================================== */

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % item.images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [item.images.length]);

  return (
    <article
      className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-16 ${
        reverse ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* =================================================
          IMAGE SLIDER
      ================================================== */}
      <div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-[#E6DED3]">
          {item.images.map((image, index) => (
            <Image
              key={image.src}
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                index === current
                  ? "scale-100 opacity-100"
                  : "scale-105 opacity-0"
              }`}
            />
          ))}

          {/* Nomor Slide */}
          <div className="absolute bottom-5 left-5 rounded-full bg-black/45 px-4 py-2 text-xs font-medium tracking-wider text-white backdrop-blur-sm">
            {current + 1} / {item.images.length}
          </div>
        </div>

        {/* =================================================
            SLIDE INDICATOR
        ================================================== */}
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
                  : "w-1.5 bg-[#CDBDAA]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* =================================================
          TEXT
      ================================================== */}
      <div className="max-w-xl">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#8B7355] sm:text-sm">
          {item.label}
        </p>

        <h2 className="mt-4 font-heading text-4xl leading-tight sm:text-5xl">
          {item.title}
        </h2>

        <div className="mt-5 h-px w-12 bg-[#CDBDAA]" />

        <p className="mt-6 text-base leading-8 text-[#6F6860] sm:text-lg">
          {item.description}
        </p>

        {/* =================================================
            GOOGLE DRIVE
        ================================================== */}
        <a
          href={item.driveLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-3 rounded-lg border border-[#BFA98D] px-5 py-3 text-sm font-medium text-[#6F503B] transition duration-300 hover:bg-[#F7F3EC]"
        >
          {/* Google Drive Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5"
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

          <span>Lihat dokumentasi lengkap</span>
        </a>
      </div>
    </article>
  );
}