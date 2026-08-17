"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import ScrollReveal from "@/components/scroll-reveal";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F7F3EC] text-[#2E2A26]">

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden px-6 pb-24 pt-36 sm:px-10 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-[1560px]">

          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] xl:gap-24">

            {/* TEXT */}
            <div className="max-w-2xl">

              <div className="mb-6 flex items-center gap-3 animate-hero-label">

                <div className="h-px w-10 bg-[#8B7355]" />

                <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#8B7355] sm:text-sm">
                  COME AND JOIN US!
                </p>

              </div>


              <h1 className="font-heading text-5xl leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl animate-hero-title">
                WE GROW
                <br />

                <span className="italic text-[#8B7355]">
                  IN CHRIST.
                </span>
              </h1>


              <div className="mt-7 max-w-xl border-l-2 border-[#BFA98D] pl-5 animate-hero-verse">

                <p className="font-heading text-xl italic leading-8 text-[#6F6860] sm:text-2xl">
                  “Jangan seorang pun menganggap engkau rendah karena
                  engkau muda. Jadilah teladan bagi orang-orang percaya.”
                </p>

                <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-[#8B7355]">
                  1 Timotius 4:12
                </p>

              </div>


              <div className="mt-9 flex flex-col gap-3 sm:flex-row animate-hero-buttons">

                <Link
                  href="/tentang"
                  className="inline-flex items-center justify-center rounded-lg bg-[#4A3426] px-6 py-3.5 text-sm font-medium text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#654734] hover:shadow-md"
                >
                  Pelajari Lebih Lanjut
                </Link>

                <Link
                  href="/kegiatan"
                  className="inline-flex items-center justify-center rounded-lg border border-[#BFA98D] px-6 py-3.5 text-sm font-medium text-[#6F503B] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
                >
                  Lihat Kegiatan
                </Link>

              </div>

            </div>


            {/* IMAGE */}
            <div className="relative animate-hero-image">

              <div className="group relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] bg-[#E6DED3] shadow-[0_18px_45px_rgba(74,52,38,0.12)] transition-shadow duration-500 hover:shadow-[0_22px_55px_rgba(74,52,38,0.18)]">

                <Image
                  src="/images/cover.jpeg"
                  alt="Pemuda GKSBS Gunung Pasir Jaya"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                />

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          SEKILAS TENTANG KAMI
      ====================================================== */}
      <section className="bg-white px-6 py-24 sm:px-10 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-[1560px]">

          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center xl:gap-28">

            {/* HEADING */}
            <ScrollReveal>

              <div className="max-w-xl">

                <div className="mb-5 flex items-center gap-3">

                  <div className="h-px w-10 bg-[#BFA98D]" />

                  <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#8B7355]">
                    Tentang Kami
                  </p>

                </div>


                <h2 className="font-heading text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
                  A place to grow
                  <br />

                  <span className="italic text-[#8B7355]">
                    serve and belong.
                  </span>
                </h2>

              </div>

            </ScrollReveal>


            {/* DESCRIPTION */}
            <ScrollReveal delay={150}>

              <div className="max-w-2xl lg:ml-auto">

                <div className="border-l-2 border-[#DED7CE] pl-6 sm:pl-8">

                  <p className="text-justify text-base leading-8 text-[#6F6860] sm:text-lg">
                    Youth GKSBS Gunung Pasir Jaya merupakan wadah
                    persekutuan pemuda-pemudi untuk bertumbuh dalam iman,
                    membangun persaudaraan, mengembangkan talenta,
                    dan melayani bersama.
                  </p>

                </div>


                <Link
                  href="/tentang"
                  className="group mt-8 inline-flex items-center gap-3 text-sm font-medium text-[#6F503B] transition-colors duration-300 hover:text-[#8B7355]"
                >
                  Kenali kami lebih dekat

                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>

              </div>

            </ScrollReveal>

          </div>

        </div>
      </section>


      {/* =====================================================
          PREVIEW KEGIATAN
      ====================================================== */}
      <section className="bg-[#F7F3EC] px-6 py-24 sm:px-10 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-[1560px]">

          <ScrollReveal>

            <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">

              <div className="max-w-2xl">

                <div className="mb-5 flex items-center gap-3">

                  <div className="h-px w-10 bg-[#BFA98D]" />

                  <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#8B7355]">
                    Kegiatan
                  </p>

                </div>


                <h2 className="font-heading text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
                  Gathered
                  <br />

                  <span className="italic text-[#8B7355]">
                    to grow.
                  </span>
                </h2>


                <p className="mt-6 max-w-xl text-base leading-8 text-[#6F6860]">
                  Berbagai kegiatan menjadi ruang bagi kami untuk
                  bersekutu, belajar, melayani, dan menikmati
                  kebersamaan.
                </p>

              </div>


              <Link
                href="/kegiatan"
                className="group shrink-0 text-sm font-medium text-[#6F503B] transition-colors duration-300 hover:text-[#8B7355]"
              >
                <span>
                  Lihat semua kegiatan
                </span>

                <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>

            </div>

          </ScrollReveal>


          {/* CARDS */}
          <div className="mt-12 grid gap-7 md:grid-cols-2">

            {/* PA RUTIN */}
            <ScrollReveal delay={0}>

              <Link
                href="/kegiatan"
                className="group block overflow-hidden rounded-[1.5rem] border border-[#DED7CE] bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(74,52,38,0.12)]"
              >

                <div className="aspect-[16/9] overflow-hidden bg-[#E6DED3]">

                  <Image
                    src="/images/pa-pemuda.png"
                    alt="Ibadah PA Rutin Pemuda GKSBS Gunung Pasir Jaya"
                    width={1200}
                    height={675}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                  />

                </div>


                <div className="p-7 sm:p-8">

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

                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#6F503B] transition-colors duration-300 group-hover:text-[#8B7355]">
                    Lihat kegiatan

                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>

                </div>

              </Link>

            </ScrollReveal>


            {/* NATAL */}
            <ScrollReveal delay={150}>

              <Link
                href="/kegiatan"
                className="group block overflow-hidden rounded-[1.5rem] border border-[#DED7CE] bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(74,52,38,0.12)]"
              >

                <div className="aspect-[16/9] overflow-hidden bg-[#E6DED3]">

                  <Image
                    src="/images/natal-gabungan-2026.png"
                    alt="Ibadah Natal Pemuda Gabungan 2026"
                    width={1200}
                    height={675}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                  />

                </div>


                <div className="p-7 sm:p-8">

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

                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#6F503B] transition-colors duration-300 group-hover:text-[#8B7355]">
                    Lihat kegiatan

                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>

                </div>

              </Link>

            </ScrollReveal>

          </div>

        </div>
      </section>


      {/* =====================================================
          DOKUMENTASI
      ====================================================== */}
      <DocumentationPreview />


      {/* =====================================================
          CONTACT CTA
      ====================================================== */}
      <section className="relative overflow-hidden px-6 py-28 text-center sm:px-10 lg:px-12 xl:px-16">

        <Image
          src="/images/beranda.jpeg"
          alt=""
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />


        <ScrollReveal>

          <div className="relative mx-auto max-w-3xl">

            <p className="mb-5 text-sm font-medium uppercase tracking-[0.3em] text-white/80">
              COME AND JOIN US!
            </p>


            <h2 className="font-heading text-4xl leading-[1.08] text-white sm:text-5xl lg:text-6xl">
              Every gathering

              <br />

              <span className="italic text-white/85">
                is a space to grow.
              </span>
            </h2>


            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/85 sm:text-lg">
              Ingin mengenal lebih dekat atau terlibat dalam
              kegiatan Youth GKSBS Gunung Pasir Jaya?
              Kami dengan senang hati menyambutmu.
            </p>


            <Link
              href="/kontak"
              className="group mt-9 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-7 py-3.5 text-sm font-medium text-[#6F503B] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#F7F3EC] hover:shadow-md"
            >
              HUBUNGI KAMI

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

          </div>

        </ScrollReveal>

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
        "/images/1c.jpeg",
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
    <section className="bg-white px-6 py-24 sm:px-10 lg:px-12 xl:px-16">

      <div className="mx-auto max-w-[1560px]">

        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:items-center xl:gap-28">

          {/* TEXT */}
          <ScrollReveal>

            <div className="max-w-xl">

              <div className="mb-5 flex items-center gap-3">

                <div className="h-px w-10 bg-[#BFA98D]" />

                <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#8B7355]">
                  Dokumentasi
                </p>

              </div>


              <h2 className="font-heading text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
                Moments we
                <br />

                <span className="italic text-[#8B7355]">
                  shared together.
                </span>
              </h2>


              <p className="mt-6 text-justify text-base leading-8 text-[#6F6860] sm:text-lg">
                Setiap kegiatan menyimpan cerita, kebersamaan,
                dan pengalaman yang menjadi bagian dari perjalanan
                Youth GKSBS Gunung Pasir Jaya.
              </p>


              <Link
                href="/dokumentasi"
                className="group mt-8 inline-flex items-center gap-3 text-sm font-medium text-[#6F503B] transition-colors duration-300 hover:text-[#8B7355]"
              >
                Lihat dokumentasi

                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>

            </div>

          </ScrollReveal>


          {/* DOCUMENTATION CARDS */}
          <div className="grid gap-6 sm:grid-cols-2">

            {documentationItems.map((item, index) => (

              <ScrollReveal
                key={item.title}
                delay={index * 150}
              >

                <DocumentationCard
                  title={item.title}
                  images={item.images}
                  offset={index === 1}
                />

              </ScrollReveal>

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
      className={`group block overflow-hidden rounded-[1.5rem] border border-[#DED7CE] bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(74,52,38,0.12)] ${
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
      <div className="p-5 sm:p-6">

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
        <div className="mt-4 flex items-center gap-2 text-sm font-medium text-[#6F503B] transition-colors duration-300 group-hover:text-[#8B7355]">

          Lihat dokumentasi

          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>

        </div>

      </div>

    </Link>
  );
}