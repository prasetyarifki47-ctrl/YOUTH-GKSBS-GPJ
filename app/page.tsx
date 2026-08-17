"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F7F3EC] text-[#2E2A26]">
      <Navbar />

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden px-6 pb-24 pt-36 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">

          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">

            {/* TEXT */}
            <div className="max-w-2xl">

              <div className="mb-6 flex items-center gap-3">
                <div className="h-px w-10 bg-[#8B7355]" />

                <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#8B7355] sm:text-sm">
                  COME AND JOIN US!
                </p>
              </div>

              <h1 className="font-heading text-5xl leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
                WE GROW
                <br />

                <span className="italic text-[#8B7355]">
                  IN CHRIST.
                </span>
              </h1>


              {/* =================================================
                  AYAT ALKITAB
              ================================================== */}
              <div className="mt-7 max-w-xl border-l-2 border-[#BFA98D] pl-5">

                <p className="font-heading text-xl italic leading-8 text-[#6F6860] sm:text-2xl">
                  “Jangan seorang pun menganggap engkau rendah karena
                  engkau muda. Jadilah teladan bagi orang-orang percaya.”
                </p>

                <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-[#8B7355]">
                  1 Timotius 4:12
                </p>

              </div>


              {/* BUTTON */}
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">

                <Link
                  href="/tentang"
                  className="inline-flex items-center justify-center rounded-lg bg-[#4A3426] px-6 py-3.5 text-sm font-medium text-white transition duration-300 hover:bg-[#654734]"
                >
                  Pelajari Lebih Lanjut
                </Link>

                <Link
                  href="/kegiatan"
                  className="inline-flex items-center justify-center rounded-lg border border-[#BFA98D] px-6 py-3.5 text-sm font-medium text-[#6F503B] transition duration-300 hover:bg-white"
                >
                  Lihat Kegiatan
                </Link>

              </div>

            </div>


            {/* IMAGE */}
            <div className="relative">

              <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] bg-[#E6DED3]">

                <Image
                  src="/images/cover.jpeg"
                  alt="Pemuda GKSBS Gunung Pasir Jaya"
                  fill
                  priority
                  className="object-cover"
                />

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          SEKILAS TENTANG KAMI
      ====================================================== */}
      <section className="bg-white px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">

          <div className="max-w-3xl">

            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[#8B7355]">
              Tentang Kami
            </p>

            <h2 className="font-heading text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Satu ruang untuk
              <br />

              <span className="italic text-[#8B7355]">
                bertumbuh bersama.
              </span>
            </h2>

            <p className="mt-6 text-justify text-base leading-8 text-[#6F6860] sm:text-lg">
              Youth GKSBS Gunung Pasir Jaya merupakan wadah
              persekutuan pemuda-pemudi untuk bertumbuh dalam iman,
              membangun persaudaraan, mengembangkan talenta,
              dan melayani bersama.
            </p>

            <Link
              href="/tentang"
              className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-[#6F503B] transition duration-300 hover:text-[#8B7355]"
            >
              Kenali kami lebih dekat
              <span aria-hidden="true">→</span>
            </Link>

          </div>

        </div>
      </section>


      {/* =====================================================
          PREVIEW KEGIATAN
      ====================================================== */}
      <section className="bg-[#F7F3EC] px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">

          {/* HEADING */}
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">

            <div className="max-w-2xl">

              <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[#8B7355]">
                Kegiatan
              </p>

              <h2 className="font-heading text-4xl leading-tight sm:text-5xl lg:text-6xl">
                Bertemu,
                <br />

                <span className="italic text-[#8B7355]">
                  bertumbuh bersama.
                </span>
              </h2>

              <p className="mt-5 text-base leading-8 text-[#6F6860]">
                Berbagai kegiatan menjadi ruang bagi kami untuk
                bersekutu, belajar, melayani, dan menikmati
                kebersamaan.
              </p>

            </div>

            <Link
              href="/kegiatan"
              className="shrink-0 text-sm font-medium text-[#6F503B] transition duration-300 hover:text-[#8B7355]"
            >
              Lihat semua kegiatan →
            </Link>

          </div>


          {/* =================================================
              CARDS KEGIATAN
          ================================================== */}
          <div className="mt-12 grid gap-7 md:grid-cols-2">

            {/* =================================================
                PA RUTIN
            ================================================== */}
            <Link
              href="/kegiatan"
              className="group block overflow-hidden rounded-2xl border border-[#DED7CE] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >

              <div className="aspect-[16/9] overflow-hidden bg-[#E6DED3]">

                <Image
                  src="/images/pa-pemuda.png"
                  alt="Ibadah PA Rutin Pemuda GKSBS Gunung Pasir Jaya"
                  width={1200}
                  height={675}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

              </div>

              <div className="p-7">

                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#8B7355]">
                  Kegiatan Rutin
                </p>

                <h3 className="mt-3 font-heading text-3xl">
                  Ibadah PA Rutin
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#6F6860]">
                  Persekutuan rutin untuk mendalami firman Tuhan,
                  berdiskusi, dan bertumbuh bersama dalam iman.
                </p>

                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#6F503B] transition duration-300 group-hover:text-[#8B7355]">
                  Lihat kegiatan
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>

              </div>

            </Link>


            {/* =================================================
                NATAL
            ================================================== */}
            <Link
              href="/kegiatan"
              className="group block overflow-hidden rounded-2xl border border-[#DED7CE] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >

              <div className="aspect-[16/9] overflow-hidden bg-[#E6DED3]">

                <Image
                  src="/images/natal-gabungan-2026.png"
                  alt="Ibadah Natal Pemuda Gabungan 2026"
                  width={1200}
                  height={675}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

              </div>

              <div className="p-7">

                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#8B7355]">
                  Agenda
                </p>

                <h3 className="mt-3 font-heading text-3xl">
                  Youth GKSBS Klasis Pugung Raharjo Christmas Celebration 2026
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#6F6860]">
                  Perayaan Natal bersama sebagai momen untuk
                  merayakan kasih Kristus dan mempererat
                  persaudaraan antar pemuda.
                </p>

                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#6F503B] transition duration-300 group-hover:text-[#8B7355]">
                  Lihat kegiatan
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>

              </div>

            </Link>

          </div>

        </div>
      </section>


      {/* =====================================================
          DOKUMENTASI PREVIEW
      ====================================================== */}
      <DocumentationPreview />


      {/* =====================================================
          CONTACT CTA
      ====================================================== */}
      <section className="relative overflow-hidden px-6 py-24 text-center sm:px-10 lg:px-16">

        {/* Background Image */}
        <Image
          src="/images/beranda.jpeg"
          alt=""
          fill
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Content */}
        <div className="relative mx-auto max-w-3xl">

          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-white/80">
            COME AND JOIN US!
          </p>

          <h2 className="font-heading text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
            Mari bertumbuh
            <br />

            <span className="italic text-white/85">
              dan melayani bersama.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/85 sm:text-lg">
            Ingin mengenal lebih dekat atau terlibat dalam
            kegiatan Youth GKSBS Gunung Pasir Jaya?
            Kami dengan senang hati menyambutmu.
          </p>

          <Link
            href="/kontak"
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-white px-7 py-3.5 text-sm font-medium text-[#6F503B] transition duration-300 hover:bg-[#F7F3EC]"
          >
            HUBUNGI KAMI
          </Link>

        </div>

      </section>

    </main>
  );
}


/* ============================================================
   DOCUMENTATION PREVIEW
============================================================ */

function DocumentationPreview() {

  const documentationItems = [
    {
      title: "Natal GKSBS Gunung Pasir Jaya 25 Desember 2025",
      images: [
        "/images/1a.jpeg",
        "/images/1b.jpeg",
        "/images/1c.jpg",
        "/images/1d.jpg",
        "/images/1e.jpg",
      ],
    },
    {
      title: "Makrab Youth GKSBS Gunung Pasir Jaya 4 Juli 2026",
      images: [
        "/images/2a.jpg",
        "/images/2b.jpg",
        "/images/2c.jpg",
        "/images/2d.jpg",
        "/images/2f.jpg",
      ],
    },
  ];

  return (
    <section className="bg-white px-6 py-20 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">

        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">

          {/* TEXT */}
          <div className="max-w-xl">

            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[#8B7355]">
              Dokumentasi
            </p>

            <h2 className="font-heading text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Momen yang
              <br />

              <span className="italic text-[#8B7355]">
                kami lalui bersama.
              </span>
            </h2>

            <p className="mt-6 text-justify text-base leading-8 text-[#6F6860] sm:text-lg">
              Setiap kegiatan menyimpan cerita, kebersamaan,
              dan pengalaman yang menjadi bagian dari perjalanan
              Youth GKSBS Gunung Pasir Jaya.
            </p>

            <Link
              href="/dokumentasi"
              className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-[#6F503B] transition duration-300 hover:text-[#8B7355]"
            >
              Lihat dokumentasi
              <span aria-hidden="true">→</span>
            </Link>

          </div>


          {/* DOCUMENTATION CARDS */}
          <div className="grid gap-6 sm:grid-cols-2">

            {documentationItems.map((item, index) => (
              <DocumentationCard
                key={item.title}
                title={item.title}
                images={item.images}
                offset={index === 1}
              />
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}


/* ============================================================
   DOCUMENTATION CARD
============================================================ */

function DocumentationCard({
  title,
  images,
  offset = false,
}: {
  title: string;
  images: string[];
  offset?: boolean;
}) {

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {

      setCurrentIndex((current) =>
        current === images.length - 1
          ? 0
          : current + 1
      );

    }, 3500);

    return () => clearInterval(interval);

  }, [images.length]);


  return (
    <Link
      href="/dokumentasi"
      className={`group block overflow-hidden rounded-2xl border border-[#DED7CE] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg ${
        offset ? "sm:mt-10" : ""
      }`}
    >

      {/* IMAGE */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#E6DED3]">

        {images.map((image, index) => (

          <Image
            key={image}
            src={image}
            alt={`${title} ${index + 1}`}
            fill
            priority={index === 0}
            className={`object-cover transition-opacity duration-700 ${
              index === currentIndex
                ? "opacity-100"
                : "opacity-0"
            }`}
          />

        ))}

      </div>


      {/* TITLE */}
      <div className="p-5">

        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#8B7355]">
          Dokumentasi
        </p>

        <h3 className="mt-2 font-heading text-2xl leading-tight">
          {title}
        </h3>


        {/* SLIDE INDICATOR */}
        <div className="mt-4 flex items-center gap-1.5">

          {images.map((_, index) => (

            <span
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-5 bg-[#8B7355]"
                  : "w-1.5 bg-[#D8CEC1]"
              }`}
            />

          ))}

        </div>


        {/* LINK INDICATOR */}
        <div className="mt-4 flex items-center gap-2 text-sm font-medium text-[#6F503B] transition duration-300 group-hover:text-[#8B7355]">

          Lihat dokumentasi

          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>

        </div>

      </div>

    </Link>
  );
}