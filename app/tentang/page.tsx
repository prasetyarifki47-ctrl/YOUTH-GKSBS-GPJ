import Navbar from "@/components/navbar";

export default function TentangPage() {
  return (
    <main className="min-h-screen bg-white text-[#2E2A26]">
      <Navbar />

      {/* =====================================================
          01 — TENTANG KAMI
      ====================================================== */}
      <section className="px-6 pb-20 pt-32 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">

          {/* INTRO */}
          <div className="max-w-3xl">

            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[#8B7355]">
              1
            </p>

            <h1 className="font-heading text-5xl leading-tight sm:text-6xl">
              Tentang Kami
            </h1>

            <p className="mt-6 text-justify text-base leading-8 text-[#6F6860] sm:text-lg">
              Youth GKSBS Gunung Pasir Jaya merupakan wadah persekutuan
              pemuda-pemudi untuk bertumbuh dalam iman, membangun persaudaraan,
              mengembangkan talenta, dan melayani bersama.
            </p>

          </div>


          {/* =================================================
              VISI & MISI
          ================================================== */}
          <div className="mt-16 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">

            {/* =========================
                VISI
            ========================== */}
            <div className="rounded-2xl border border-[#DED7CE] bg-[#F7F3EC] p-8 sm:p-10">

              <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#8B7355]">
                Visi
              </p>

              <h2 className="mt-5 font-heading text-4xl leading-tight sm:text-5xl">
                Bertumbuh dalam iman,
                <br />
                <span className="italic text-[#8B7355]">
                  melayani bersama.
                </span>
              </h2>

              <p className="mt-6 text-justify text-sm leading-7 text-[#6F6860] sm:text-base">
                Menjadi persekutuan pemuda-pemudi yang bertumbuh dalam iman kepada
                Kristus, membangun persaudaraan, mengembangkan talenta, dan
                menghadirkan pelayanan yang berdampak bagi gereja serta
                sesama.
              </p>

            </div>


            {/* =========================
                MISI
            ========================== */}
            <div className="rounded-2xl border border-[#DED7CE] bg-white p-8 sm:p-10">

              <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#8B7355]">
                Misi
              </p>

              <div className="mt-7 space-y-6">

                {/* Misi 01 */}
                <div className="flex gap-5">

                  <span className="shrink-0 font-heading text-2xl text-[#BFA98D]">
                    1
                  </span>

                  <div>
                    <h3 className="font-heading text-2xl">
                      Bertumbuh dalam iman
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-[#6F6860]">
                      Membangun kehidupan rohani melalui firman Tuhan,
                      doa, persekutuan, dan pembelajaran iman secara bersama.
                    </p>
                  </div>

                </div>


                {/* Misi 02 */}
                <div className="flex gap-5">

                  <span className="shrink-0 font-heading text-2xl text-[#BFA98D]">
                    2
                  </span>

                  <div>
                    <h3 className="font-heading text-2xl">
                      Membangun persaudaraan
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-[#6F6860]">
                      Menciptakan persekutuan yang hangat, saling menerima,
                      menghargai, mendukung, dan berjalan bersama sebagai
                      satu keluarga.
                    </p>
                  </div>

                </div>


                {/* Misi 03 */}
                <div className="flex gap-5">

                  <span className="shrink-0 font-heading text-2xl text-[#BFA98D]">
                    3
                  </span>

                  <div>
                    <h3 className="font-heading text-2xl">
                      Mengembangkan talenta
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-[#6F6860]">
                      Mendorong setiap pemuda-pemudi untuk mengenali,
                      mengembangkan, dan menggunakan talenta yang Tuhan
                      berikan untuk hal-hal yang membangun.
                    </p>
                  </div>

                </div>


                {/* Misi 04 */}
                <div className="flex gap-5">

                  <span className="shrink-0 font-heading text-2xl text-[#BFA98D]">
                    4
                  </span>

                  <div>
                    <h3 className="font-heading text-2xl">
                      Melayani Tuhan dan sesama
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-[#6F6860]">
                      Menghadirkan pelayanan yang nyata melalui keterlibatan
                      dalam kehidupan gereja dan kepedulian terhadap sesama.
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          02 — SEJARAH SINGKAT
      ====================================================== */}
      <section className="bg-[#F7F3EC] px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">

          <div className="max-w-3xl">

            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[#8B7355]">
              2
            </p>

            <h2 className="font-heading text-5xl leading-tight sm:text-6xl">
              Sejarah Singkat
            </h2>

            <p className="mt-6 text-justify text-base leading-8 text-[#6F6860] sm:text-lg">
              Youth GKSBS Gunung Pasir Jaya terbentuk pada tahun 2000,
              dalam masa pendewasaan Gereja Kristen Sumatera Bagian Selatan
              (GKSBS) Gunung Pasir Jaya. Sejak saat itu, youth terus
              berkembang sebagai bagian dari kehidupan gereja melalui
              persekutuan, pelayanan, dan berbagai kegiatan bersama.
            </p>

          </div>

        </div>
      </section>


      {/* =====================================================
          03 — STRUKTUR ORGANISASI
      ====================================================== */}
      <section className="px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">

          {/* Heading */}
          <div className="max-w-3xl">

            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[#8B7355]">
              3
            </p>

            <h2 className="font-heading text-5xl leading-tight sm:text-6xl">
              Struktur Organisasi <br />Periode 2025-2027 <br />(Servant Leadership)
            </h2>

            <p className="mt-6 text-justify text-base leading-8 text-[#6F6860] sm:text-lg">
              Youth GKSBS Gunung Pasir Jaya berjalan bersama melalui
              kepengurusan dan departemen yang saling mendukung dalam
              pelayanan dan kehidupan persekutuan.
            </p>

          </div>


          {/* =================================================
              PENGURUS INTI
          ================================================== */}
          <div className="mt-20">

            <h3 className="mb-10 text-center text-base font-medium uppercase tracking-[0.35em] text-[#8B7355] sm:text-lg">
              Pengurus Inti
            </h3>


            {/* Ketua & Wakil Ketua */}
            <div className="flex flex-col items-center">

              {/* Ketua */}
              <div className="w-full max-w-md rounded-2xl border border-[#DED7CE] bg-[#F7F3EC] px-8 py-8 text-center shadow-sm">

                <h4 className="font-heading text-3xl sm:text-4xl">
                  Ketua
                </h4>

                <p className="mt-3 text-sm text-[#8B7355]">
                  Amsal Gaeldo Siadari
                </p>

              </div>


              {/* Connector */}
              <div className="h-10 w-px bg-[#CDBDAA]" />


              {/* Wakil Ketua */}
              <div className="w-full max-w-md rounded-2xl border border-[#DED7CE] bg-[#F7F3EC] px-8 py-8 text-center shadow-sm">

                <h4 className="font-heading text-3xl sm:text-4xl">
                  Wakil Ketua
                </h4>

                <p className="mt-3 text-sm text-[#8B7355]">
                  Rifki Prasetya
                </p>

              </div>


              {/* Connector */}
              <div className="h-10 w-px bg-[#CDBDAA]" />

            </div>


            {/* Sekretaris & Bendahara */}
            <div className="relative grid gap-6 md:grid-cols-2">

              {/* Horizontal Connector */}
              <div className="absolute left-1/2 top-0 hidden h-px w-[calc(100%-25%)] -translate-x-1/2 bg-[#CDBDAA] md:block" />


              {/* SEKRETARIS */}
              <div className="relative rounded-2xl border border-[#DED7CE] bg-white px-8 py-8 text-center shadow-sm">

                <h4 className="font-heading text-3xl sm:text-4xl">
                  Sekretaris
                </h4>

                <div className="mt-6 space-y-5">

                  <div>
                    <p className="text-sm font-medium text-[#6F503B]">
                      Sekretaris 1
                    </p>

                    <p className="mt-1 text-sm text-[#8B7355]">
                      Agni Dwi Yuanita
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-[#6F503B]">
                      Sekretaris 2
                    </p>

                    <p className="mt-1 text-sm text-[#8B7355]">
                      Aura Prise Kania
                    </p>
                  </div>

                </div>

              </div>


              {/* BENDAHARA */}
              <div className="relative rounded-2xl border border-[#DED7CE] bg-white px-8 py-8 text-center shadow-sm">

                <h4 className="font-heading text-3xl sm:text-4xl">
                  Bendahara
                </h4>

                <div className="mt-6 space-y-5">

                  <div>
                    <p className="text-sm font-medium text-[#6F503B]">
                      Bendahara 1
                    </p>

                    <p className="mt-1 text-sm text-[#8B7355]">
                      Siska Ervina Sari
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-[#6F503B]">
                      Bendahara 2
                    </p>

                    <p className="mt-1 text-sm text-[#8B7355]">
                      Eka Ratna Damayanti
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* =================================================
              DEPARTEMEN
          ================================================== */}
          <div className="mt-24">

            <h3 className="mb-10 text-center text-base font-medium uppercase tracking-[0.35em] text-[#8B7355] sm:text-lg">
              Departemen
            </h3>


            <div className="grid gap-6 md:grid-cols-2">

              {/* PELAYANAN KHUSUS */}
              <article className="rounded-2xl border border-[#DED7CE] bg-[#F7F3EC] p-8 shadow-sm">

                <h4 className="font-heading text-3xl">
                  Pelayanan Khusus
                </h4>

                <div className="mt-7 space-y-5 text-sm">

                  <div>
                    <p className="font-medium text-[#6F503B]">
                      Kepala Departemen
                    </p>

                    <p className="mt-1 text-[#8B7355]">
                      Ade Krysando Ardilles
                    </p>
                  </div>

                  <div>
                    <p className="font-medium text-[#6F503B]">
                      Sekretaris Departemen
                    </p>

                    <p className="mt-1 text-[#8B7355]">
                      Claudhea Angeliani
                    </p>
                  </div>

                  <div>
                    <p className="font-medium text-[#6F503B]">
                      Kepala Divisi Musik
                    </p>

                    <p className="mt-1 text-[#8B7355]">
                      Heri Bertus
                    </p>
                  </div>

                  <div>
                    <p className="font-medium text-[#6F503B]">
                      Kepala Divisi WL
                    </p>

                    <p className="mt-1 text-[#8B7355]">
                      Shela Bunga Nasrani
                    </p>
                  </div>

                  <div>
                    <p className="font-medium text-[#6F503B]">
                      Kepala Divisi Diakonia
                    </p>

                    <p className="mt-1 text-[#8B7355]">
                      Ariel Redita Wijaya
                    </p>
                  </div>

                </div>

              </article>


              {/* MULTIMEDIA */}
              <article className="rounded-2xl border border-[#DED7CE] bg-[#F7F3EC] p-8 shadow-sm">

                <h4 className="font-heading text-3xl">
                  Multimedia
                </h4>

                <div className="mt-7 space-y-5 text-sm">

                  <div>
                    <p className="font-medium text-[#6F503B]">
                      Kepala Departemen
                    </p>

                    <p className="mt-1 text-[#8B7355]">
                      Earnest Allodya Philein
                    </p>
                  </div>

                  <div>
                    <p className="font-medium text-[#6F503B]">
                      Sekretaris Departemen
                    </p>

                    <p className="mt-1 text-[#8B7355]">
                      Hecekiel Mongoloi Siadari
                    </p>
                  </div>

                  <div>
                    <p className="font-medium text-[#6F503B]">
                      Kepala Divisi Desain
                    </p>

                    <p className="mt-1 text-[#8B7355]">
                      Frisa
                    </p>
                  </div>

                  <div>
                    <p className="font-medium text-[#6F503B]">
                      Kepala Divisi Publikasi & Dokumentasi
                    </p>

                    <p className="mt-1 text-[#8B7355]">
                      Tesalonika
                    </p>
                  </div>

                </div>

              </article>


              {/* KEWIRAUSAHAAN */}
              <article className="rounded-2xl border border-[#DED7CE] bg-[#F7F3EC] p-8 shadow-sm">

                <h4 className="font-heading text-3xl">
                  Kewirausahaan
                </h4>

                <div className="mt-7 space-y-5 text-sm">

                  <div>
                    <p className="font-medium text-[#6F503B]">
                      Kepala Departemen
                    </p>

                    <p className="mt-1 text-[#8B7355]">
                      Cristina
                    </p>
                  </div>

                  <div>
                    <p className="font-medium text-[#6F503B]">
                      Sekretaris Departemen
                    </p>

                    <p className="mt-1 text-[#8B7355]">
                      Aryanti
                    </p>
                  </div>

                </div>

              </article>


              {/* OPERASIONAL */}
              <article className="rounded-2xl border border-[#DED7CE] bg-[#F7F3EC] p-8 shadow-sm">

                <h4 className="font-heading text-3xl">
                  Operasional
                </h4>

                <div className="mt-7 space-y-5 text-sm">

                  <div>
                    <p className="font-medium text-[#6F503B]">
                      Kepala Departemen
                    </p>

                    <p className="mt-1 text-[#8B7355]">
                      Geovani Nainggolan
                    </p>
                  </div>

                  <div>
                    <p className="font-medium text-[#6F503B]">
                      Sekretaris Departemen
                    </p>

                    <p className="mt-1 text-[#8B7355]">
                      Dita Surya Atmaja
                    </p>
                  </div>

                  <div>
                    <p className="font-medium text-[#6F503B]">
                      Kepala Divisi Logistik
                    </p>

                    <p className="mt-1 text-[#8B7355]">
                      Alfarel Mosses Putra
                    </p>
                  </div>

                  <div>
                    <p className="font-medium text-[#6F503B]">
                      Kepala Divisi Akomodasi
                    </p>

                    <p className="mt-1 text-[#8B7355]">
                      Putra
                    </p>
                  </div>

                </div>

              </article>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          04 — NILAI KAMI
      ====================================================== */}
      <section className="bg-[#F7F3EC] px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">

          <div className="max-w-3xl">

            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[#8B7355]">
              4
            </p>

            <h2 className="font-heading text-5xl leading-tight sm:text-6xl">
              Nilai Kami
            </h2>

            <p className="mt-6 text-justify text-base leading-8 text-[#6F6860] sm:text-lg">
              Kami berusaha membangun persekutuan yang berlandaskan iman,
              kasih, kebersamaan, pelayanan, dan pertumbuhan bersama.
              Setiap kegiatan menjadi ruang untuk saling mendukung dan
              menggunakan talenta yang Tuhan berikan.
            </p>

          </div>


          {/* Nilai */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {/* Iman */}
            <div className="rounded-2xl border border-[#DED7CE] bg-white p-7">

              <h3 className="font-heading text-2xl">
                Iman
              </h3>

              <p className="mt-3 text-justify text-sm leading-7 text-[#6F6860]">
                Bertumbuh dalam hubungan dengan Tuhan melalui firman,
                doa, dan persekutuan.
              </p>

            </div>


            {/* Kasih */}
            <div className="rounded-2xl border border-[#DED7CE] bg-white p-7">

              <h3 className="font-heading text-2xl">
                Kasih
              </h3>

              <p className="mt-3 text-justify text-sm leading-7 text-[#6F6860]">
                Membangun hubungan yang saling menerima, menghargai,
                dan mendukung.
              </p>

            </div>


            {/* Pelayanan */}
            <div className="rounded-2xl border border-[#DED7CE] bg-white p-7">

              <h3 className="font-heading text-2xl">
                Pelayanan
              </h3>

              <p className="mt-3 text-justify text-sm leading-7 text-[#6F6860]">
                Menggunakan waktu dan talenta untuk melayani Tuhan
                dan sesama.
              </p>

            </div>


            {/* Kebersamaan */}
            <div className="rounded-2xl border border-[#DED7CE] bg-white p-7">

              <h3 className="font-heading text-2xl">
                Kebersamaan
              </h3>

              <p className="mt-3 text-justify text-sm leading-7 text-[#6F6860]">
                Berjalan bersama sebagai satu keluarga dalam setiap
                proses dan pelayanan.
              </p>

            </div>

          </div>

        </div>
      </section>

    </main>
  );
}