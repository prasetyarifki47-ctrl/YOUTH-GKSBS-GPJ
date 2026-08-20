"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Beranda", href: "/" },
    { name: "Profil", href: "/tentang" },
    { name: "Kegiatan", href: "/kegiatan" },
    { name: "Dokumentasi", href: "/dokumentasi" },
    { name: "Kontak", href: "/kontak" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-[#4A3426] shadow-sm">

      {/* =====================================================
          NAVBAR
      ====================================================== */}
      <nav className="mx-auto flex h-20 max-w-[1800px] items-center justify-between px-5 sm:h-24 sm:px-10 lg:px-16 xl:px-20">

        {/* =================================================
            LOGO & BRAND
        ================================================== */}
        <Link
          href="/"
          className="flex items-center gap-2.5 sm:gap-4"
          onClick={() => setIsOpen(false)}
        >
          <Image
            src="/images/logo.png"
            alt="Youth GKSBS"
            width={120}
            height={120}
            className="h-16 w-16 object-contain sm:h-20 sm:w-20 lg:h-24 lg:w-24"
            priority
          />

          <div className="flex flex-col leading-none">

            <span className="text-sm font-semibold tracking-[0.02em] text-white sm:text-lg lg:text-xl">
              YOUTH GKSBS GPJ
            </span>

            <span className="mt-2 text-[9px] font-medium uppercase tracking-[0.15em] text-[#E8DCC8] sm:mt-2.5 sm:text-[11px] lg:text-xs">
              Gunung Pasir Jaya
            </span>

          </div>
        </Link>


        {/* =================================================
            DESKTOP NAVIGATION
        ================================================== */}
        <div className="hidden items-center gap-10 md:flex">

          {navItems.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  relative text-base transition duration-300
                  ${
                    active
                      ? "font-medium text-[#C7A77B]"
                      : "text-[#E5DDD5] hover:text-[#C7A77B]"
                  }
                `}
              >
                {item.name}

                {/* Garis kecil di bawah menu aktif */}
                <span
                  className={`
                    absolute -bottom-2 left-0 h-px bg-[#C7A77B]
                    transition-all duration-300
                    ${
                      active
                        ? "w-full opacity-100"
                        : "w-0 opacity-0"
                    }
                  `}
                />
              </Link>
            );
          })}

        </div>


        {/* =================================================
            MOBILE MENU BUTTON
        ================================================== */}
        <button
          type="button"
          aria-label="Buka menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#C7A77B]/40 text-white transition hover:bg-white/5 sm:h-11 sm:w-11 md:hidden"
        >
          <div className="flex flex-col gap-1.5">

            <span
              className={`block h-px w-5 bg-white transition duration-300 ${
                isOpen
                  ? "translate-y-2 rotate-45"
                  : ""
              }`}
            />

            <span
              className={`block h-px w-5 bg-white transition duration-300 ${
                isOpen
                  ? "opacity-0"
                  : ""
              }`}
            />

            <span
              className={`block h-px w-5 bg-white transition duration-300 ${
                isOpen
                  ? "-translate-y-2 -rotate-45"
                  : ""
              }`}
            />

          </div>
        </button>

      </nav>


      {/* =====================================================
          MOBILE MENU
      ====================================================== */}
      <div
        className={`
          overflow-hidden border-t border-white/10 bg-[#4A3426]
          transition-all duration-300 md:hidden
          ${
            isOpen
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0"
          }
        `}
      >

        <div className="mx-auto max-w-[1560px] px-5 py-3 sm:px-10 sm:py-4">

          <div className="flex flex-col">

            {navItems.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`
                    border-b border-white/10 py-3.5 text-sm
                    transition duration-300
                    sm:py-4 sm:text-base
                    ${
                      active
                        ? "font-medium text-[#C7A77B]"
                        : "text-[#E5DDD5] hover:text-[#C7A77B]"
                    }
                  `}
                >
                  {item.name}
                </Link>
              );
            })}

          </div>

        </div>

      </div>

    </header>
  );
}