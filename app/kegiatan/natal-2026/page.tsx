"use client";

import Link from "next/link";
import ScrollReveal from "@/components/scroll-reveal";

export default function NatalComingSoonPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F3EC] px-6 py-32 text-[#2E2A26] sm:px-10">

      <div className="w-full max-w-3xl text-center">

        <ScrollReveal>

          <div className="flex flex-col items-center">

            {/* DECORATIVE LINE */}

            <div className="mb-7 flex items-center gap-3">

              <div className="h-px w-10 bg-[#BFA98D]" />

              <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#8B7355]">
                Natal 2026
              </p>

              <div className="h-px w-10 bg-[#BFA98D]" />

            </div>


            {/* COMING SOON */}

            <h1 className="font-heading text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">

              Coming Soon

            </h1>


            {/* BACK BUTTON */}

            <Link
              href="/kegiatan"
              className="mt-9 inline-flex items-center justify-center rounded-lg bg-[#4A3426] px-7 py-3.5 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#654734] hover:shadow-md"
            >
              Kembali ke Kegiatan
            </Link>

          </div>

        </ScrollReveal>

      </div>

    </main>
  );
}