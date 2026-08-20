import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#654734] text-white">

      {/* =====================================================
          FOOTER CONTENT
      ====================================================== */}
      <div className="mx-auto max-w-[1700px] px-6 py-16 sm:px-10 lg:px-16">

        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-[1.25fr_0.65fr_1.35fr] lg:gap-20">

          {/* =================================================
              BRAND
          ================================================== */}
          <div>

            <h2 className="font-heading text-2xl uppercase sm:text-3xl lg:text-4xl">
              YOUTH GKSBS GPJ
            </h2>

            <p className="mt-5 max-w-lg text-base leading-8 text-[#E7DED6]">
              Persekutuan Youth GKSBS Gunung Pasir Jaya,
              sebagai wadah untuk bertumbuh dalam iman,
              membangun persaudaraan, mengembangkan talenta,
              dan melayani bersama.
            </p>

            {/* SOCIAL MEDIA */}
            <div className="mt-7 flex items-center gap-4">

              {/* INSTAGRAM */}
              <a
                href="https://www.instagram.com/youthgksbs_gpj?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Pemuda GKSBS GPJ"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition duration-300 hover:bg-white/20"
              >
                <InstagramIcon />
              </a>

              {/* TIKTOK */}
              <a
                href="https://www.tiktok.com/@youth__.gksbsgpj?is_from_webapp=1&sender_device=pc"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok Pemuda GKSBS GPJ"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition duration-300 hover:bg-white/20"
              >
                <TikTokIcon />
              </a>

            </div>

          </div>


          {/* =================================================
              MENU
          ================================================== */}
          <div>

            <h3 className="font-heading text-3xl">
              Menu
            </h3>

            <div className="mt-6 flex flex-col gap-4 text-base text-[#E7DED6]">

              <Link
                href="/"
                className="transition duration-300 hover:text-white"
              >
                Beranda
              </Link>

              <Link
                href="/tentang"
                className="transition duration-300 hover:text-white"
              >
                Tentang Kami
              </Link>

              <Link
                href="/kegiatan"
                className="transition duration-300 hover:text-white"
              >
                Kegiatan
              </Link>

              <Link
                href="/dokumentasi"
                className="transition duration-300 hover:text-white"
              >
                Dokumentasi
              </Link>

              <Link
                href="/kontak"
                className="transition duration-300 hover:text-white"
              >
                Kontak
              </Link>

            </div>

          </div>


          {/* =================================================
              KONTAK
          ================================================== */}
          <div>

            <h3 className="font-heading text-3xl">
              Kontak
            </h3>

            <div className="mt-6 space-y-5 text-base text-[#E7DED6]">

              {/* GOOGLE MAPS */}
              <a
                href="https://maps.app.goo.gl/iLUnZL8b9AErmyve6"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-3"
              >

                <span className="mt-1 shrink-0 text-[#C7B69C]">
                  <LocationIcon />
                </span>

                <div>

                  <p className="font-medium leading-7 text-white transition group-hover:text-[#C7B69C]">
                    MHP3+JJ5, Jl. Ir. Sutami, Gn. Pasir Jaya,
                    Kec. Sekampung Udik, Kabupaten Lampung Timur,
                    Lampung 34376, Indonesia
                  </p>

                  <p className="mt-1 text-xs text-[#C8BEB6]">
                    Lihat lokasi di Google Maps →
                  </p>

                </div>

              </a>


              {/* WHATSAPP AMSAL */}
              <a
                href="https://wa.me/6289652945702"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-3"
              >

                <span className="mt-1 shrink-0 text-[#C7B69C]">
                  <WhatsAppIcon />
                </span>

                <div>

                  <p className="font-medium text-white transition group-hover:text-[#C7B69C]">
                    Amsal Gaeldo Siadari
                  </p>

                  <p className="mt-1 text-xs text-[#C8BEB6]">
                    Hubungi melalui WhatsApp →
                  </p>

                </div>

              </a>


              {/* WHATSAPP RIFKI */}
              <a
                href="https://wa.me/62895704452518"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-3"
              >

                <span className="mt-1 shrink-0 text-[#C7B69C]">
                  <WhatsAppIcon />
                </span>

                <div>

                  <p className="font-medium text-white transition group-hover:text-[#C7B69C]">
                    Rifki Prasetya
                  </p>

                  <p className="mt-1 text-xs text-[#C8BEB6]">
                    Hubungi melalui WhatsApp →
                  </p>

                </div>

              </a>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          WE GROW IN CHRIST
      ====================================================== */}
      <div className="border-t border-white/10">

        <div className="mx-auto max-w-[1700px] px-6 py-10 sm:px-10 lg:px-16">

          <div className="flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">

            <p className="font-heading text-3xl italic text-[#E7DED6] sm:text-4xl">
              WE GROW IN CHRIST.
            </p>

            <p className="text-xs text-[#C8BEB6]">
              © 2026 Youth GKSBS Gunung Pasir Jaya.
              All rights reserved.
            </p>

          </div>

        </div>

      </div>

    </footer>
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
      className="h-5 w-5"
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
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.31h-3.25v13.67a2.89 2.89 0 1 1-2.89-2.89c.3 0 .59.05.86.13v-3.31a6.17 6.17 0 1 0 5.28 6.1V8.96a8.05 8.05 0 0 0 4.71 1.52V7.23a4.8 4.8 0 0 1-.94-.54Z" />
    </svg>
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
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M20.52 3.48A11.87 11.87 0 0 0 12.05 0C5.5.17.17 5.33.17 11.88c0 2.09.55 4.13 1.59 5.93L.1 24l6.34-1.66a11.84 11.84 0 0 0 5.61 1.43h.01c6.55 0 11.88-5.33 11.88-11.88 0-3.17-1.23-6.15-3.42-8.41ZM12.06 21.77h-.01a9.84 9.84 0 0 1-5.02-1.37l-.36-.21-3.76.98 1-3.67-.23-.38a9.87 9.87 0 1 1 8.38 4.65Zm5.42-7.39c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.09 4.5.71.31 1.26.49 1.69.63.71.23 1.35.2 1.86.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
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
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />

      <circle
        cx="12"
        cy="10"
        r="2.5"
      />
    </svg>
  );
}