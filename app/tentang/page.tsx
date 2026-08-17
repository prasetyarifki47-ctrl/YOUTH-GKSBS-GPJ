"use client";

import ScrollReveal from "@/components/scroll-reveal";

export default function TentangPage() {
  return (
    <main className="min-h-screen bg-white text-[#2E2A26]">

      {/* =====================================================
          TENTANG KAMI
      ====================================================== */}
      <section className="px-6 pb-24 pt-36 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1560px]">

          <ScrollReveal>
            <div className="max-w-4xl">

              <div className="mb-6 flex items-center gap-3">
                <div className="h-px w-10 bg-[#BFA98D]" />

                <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#8B7355]">
                  1
                </p>
              </div>

              <h1 className="font-heading text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
                Tentang Kami
              </h1>

              <p className="mt-7 max-w-3xl text-justify text-base leading-8 text-[#6F6860] sm:text-lg">
                Youth GKSBS Gunung Pasir Jaya merupakan wadah persekutuan
                pemuda-pemudi untuk bertumbuh dalam iman, membangun
                persaudaraan, mengembangkan talenta, dan melayani bersama.
              </p>

            </div>
          </ScrollReveal>


          {/* =================================================
              VISI & MISI
          ================================================== */}
          <div className="mt-16 grid gap-7 lg:grid-cols-[0.85fr_1.15fr]">

            {/* VISI */}
            <ScrollReveal>
              <div className="h-full rounded-[1.5rem] border border-[#DED7CE] bg-[#F7F3EC] p-8 sm:p-10">

                <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#8B7355]">
                  Visi
                </p>

                <h2 className="mt-6 font-heading text-4xl leading-[1.08] sm:text-5xl">
                  Bertumbuh dalam iman,
                  <br />

                  <span className="italic text-[#8B7355]">
                    melayani sesama.
                  </span>
                </h2>

                <p className="mt-7 text-justify text-sm leading-7 text-[#6F6860] sm:text-base">
                  Menjadi persekutuan pemuda-pemudi yang bertumbuh dalam iman
                  kepada Kristus, membangun persaudaraan, mengembangkan talenta,
                  dan menghadirkan pelayanan yang berdampak bagi gereja serta
                  sesama.
                </p>

              </div>
            </ScrollReveal>


            {/* MISI */}
            <ScrollReveal delay={150}>
              <div className="h-full rounded-[1.5rem] border border-[#DED7CE] bg-white p-8 shadow-sm sm:p-10">

                <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#8B7355]">
                  Misi
                </p>

                <div className="mt-8 space-y-7">

                  <MissionItem
                    number="1"
                    title="Bertumbuh dalam iman"
                  >
                    Bertumbuh melalui firman Tuhan, doa, dan persekutuan.
                  </MissionItem>

                  <MissionItem
                    number="2"
                    title="Membangun persaudaraan"
                  >
                    Membangun persekutuan yang hangat, saling menerima, dan
                    mendukung.
                  </MissionItem>

                  <MissionItem
                    number="3"
                    title="Mengembangkan talenta"
                  >
                    Mengembangkan dan menggunakan talenta untuk hal-hal yang
                    membangun.
                  </MissionItem>

                  <MissionItem
                    number="4"
                    title="Melayani Tuhan dan sesama"
                  >
                    Melayani melalui keterlibatan dalam gereja dan kepedulian
                    terhadap sesama.
                  </MissionItem>

                </div>

              </div>
            </ScrollReveal>

          </div>

        </div>
      </section>


      {/* =====================================================
          SEJARAH SINGKAT
      ====================================================== */}
      <section className="bg-[#F7F3EC] px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1560px]">

          <ScrollReveal>
            <div className="grid gap-10 lg:grid-cols-[0.35fr_1fr]">

              <div>
                <div className="flex items-center gap-3">

                  <div className="h-px w-10 bg-[#BFA98D]" />

                  <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#8B7355]">
                    2
                  </p>

                </div>
              </div>


              <div className="max-w-4xl">

                <h2 className="font-heading text-5xl leading-[1.05] sm:text-6xl">
                  Sejarah Singkat
                </h2>

                <div className="mt-8 border-l-2 border-[#CDBDAA] pl-6 sm:pl-8">

                  <p className="text-justify text-base leading-8 text-[#6F6860] sm:text-lg">
                    Youth GKSBS Gunung Pasir Jaya terbentuk pada tahun 2000,
                    dalam masa pendewasaan Gereja Kristen Sumatera Bagian
                    Selatan (GKSBS) Gunung Pasir Jaya. Sejak saat itu, youth
                    terus berkembang sebagai bagian dari kehidupan gereja
                    melalui persekutuan, pelayanan, dan berbagai kegiatan
                    bersama.
                  </p>

                </div>

              </div>

            </div>
          </ScrollReveal>

        </div>
      </section>


      {/* =====================================================
          STRUKTUR ORGANISASI
      ====================================================== */}
      <section className="px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1560px]">

          <ScrollReveal>
            <div className="max-w-4xl">

              <div className="mb-6 flex items-center gap-3">

                <div className="h-px w-10 bg-[#BFA98D]" />

                <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#8B7355]">
                  3
                </p>

              </div>

              <h2 className="font-heading text-5xl leading-[1.05] sm:text-6xl">
                Struktur Organisasi
              </h2>

              <p className="mt-3 font-heading text-3xl italic text-[#8B7355] sm:text-4xl">
                Periode 2025–2027
              </p>

              <p className="mt-3 font-medium text-[#6F503B]">
                (Servant Leadership)
              </p>

              <p className="mt-6 max-w-3xl text-justify text-base leading-8 text-[#6F6860] sm:text-lg">
                Youth GKSBS Gunung Pasir Jaya berjalan bersama melalui
                kepengurusan dan departemen yang saling mendukung dalam
                pelayanan dan kehidupan persekutuan.
              </p>

            </div>
          </ScrollReveal>


          {/* =================================================
              PENGURUS INTI
          ================================================== */}
          <div className="mt-20">

            <ScrollReveal>
              <h3 className="mb-10 text-center text-sm font-medium uppercase tracking-[0.35em] text-[#8B7355] sm:text-base">
                Pengurus Inti
              </h3>
            </ScrollReveal>


            {/* KETUA & WAKIL */}
            <ScrollReveal>
              <div className="flex flex-col items-center">

                <OrganizationCard
                  title="Ketua"
                  name="Amsal Gaeldo Siadari"
                  featured
                />

                <Connector />

                <OrganizationCard
                  title="Wakil Ketua"
                  name="Rifki Prasetya"
                  featured
                />

                <Connector />

              </div>
            </ScrollReveal>


            {/* SEKRETARIS & BENDAHARA */}
            <div className="grid gap-7 md:grid-cols-2">

              <ScrollReveal>
                <OrganizationGroup
                  title="Sekretaris"
                  people={[
                    ["Sekretaris 1", "Agni Dwi Yuanita"],
                    ["Sekretaris 2", "Aura Prise Kania"],
                  ]}
                />
              </ScrollReveal>


              <ScrollReveal delay={150}>
                <OrganizationGroup
                  title="Bendahara"
                  people={[
                    ["Bendahara 1", "Siska Ervina Sari"],
                    ["Bendahara 2", "Eka Ratna Damayanti"],
                  ]}
                />
              </ScrollReveal>

            </div>

          </div>


          {/* =================================================
              DEPARTEMEN
          ================================================== */}
          <div className="mt-24">

            <ScrollReveal>
              <h3 className="mb-10 text-center text-sm font-medium uppercase tracking-[0.35em] text-[#8B7355] sm:text-base">
                Departemen
              </h3>
            </ScrollReveal>


            <div className="grid gap-7 md:grid-cols-2">

              {/* PELAYANAN KHUSUS */}
              <ScrollReveal>
                <DepartmentCard
                  title="Pelayanan Khusus"
                  people={[
                    ["Kepala Departemen", "Ade Krysando Ardilles"],
                    ["Sekretaris Departemen", "Claudhea Angeliani"],
                    ["Kepala Divisi Musik", "Heri Bertus"],
                    ["Kepala Divisi Worship Leader", "Shela Bunga Nasrani"],
                    ["Kepala Divisi Diakonia", "Ariel Redita Wijaya"],
                  ]}
                />
              </ScrollReveal>


              {/* MULTIMEDIA */}
              <ScrollReveal delay={100}>
                <DepartmentCard
                  title="Multimedia"
                  people={[
                    ["Kepala Departemen", "Earnest Allodya Philein"],
                    ["Sekretaris Departemen", "Hecekiel Mongoloi Siadari"],
                    ["Kepala Divisi Desain", "Frisa"],
                    [
                      "Kepala Divisi Publikasi & Dokumentasi",
                      "Tesalonika",
                    ],
                  ]}
                />
              </ScrollReveal>


              {/* KEWIRAUSAHAAN */}
              <ScrollReveal delay={150}>
                <DepartmentCard
                  title="Kewirausahaan"
                  people={[
                    ["Kepala Departemen", "Cristina"],
                    ["Sekretaris Departemen", "Aryanti"],
                  ]}
                />
              </ScrollReveal>


              {/* OPERASIONAL */}
              <ScrollReveal delay={200}>
                <DepartmentCard
                  title="Operasional"
                  people={[
                    ["Kepala Departemen", "Geovani Nainggolan"],
                    ["Sekretaris Departemen", "Dita Surya Atmaja"],
                    ["Kepala Divisi Logistik", "Alfarel Mosses Putra"],
                    ["Kepala Divisi Akomodasi", "Putra"],
                  ]}
                />
              </ScrollReveal>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          NILAI KAMI
      ====================================================== */}
      <section className="bg-[#F7F3EC] px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1560px]">

          <ScrollReveal>
            <div className="max-w-4xl">

              <div className="mb-6 flex items-center gap-3">

                <div className="h-px w-10 bg-[#BFA98D]" />

                <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#8B7355]">
                  4
                </p>

              </div>

              <h2 className="font-heading text-5xl leading-[1.05] sm:text-6xl">
                Nilai Kami
              </h2>

              <p className="mt-6 max-w-3xl text-justify text-base leading-8 text-[#6F6860] sm:text-lg">
                Nilai yang menjadi dasar kami dalam bertumbuh,
                membangun persekutuan, dan melayani bersama.
              </p>

            </div>
          </ScrollReveal>


          {/* NILAI */}
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            <ValueCard
              title="Iman"
              description="Bertumbuh dalam firman, doa, dan persekutuan."
            />

            <ValueCard
              title="Kasih"
              description="Saling menerima, menghargai, dan mendukung."
            />

            <ValueCard
              title="Pelayanan"
              description="Menggunakan talenta untuk melayani Tuhan dan sesama."
            />

            <ValueCard
              title="Kebersamaan"
              description="Berjalan bersama sebagai satu keluarga."
            />

          </div>

        </div>
      </section>

    </main>
  );
}


/* ============================================================
   MISSION ITEM
============================================================ */

function MissionItem({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-5">

      <span className="shrink-0 font-heading text-3xl text-[#BFA98D]">
        {number}
      </span>

      <div>

        <h3 className="font-heading text-2xl sm:text-3xl">
          {title}
        </h3>

        <p className="mt-2 text-sm leading-7 text-[#6F6860]">
          {children}
        </p>

      </div>

    </div>
  );
}


/* ============================================================
   ORGANIZATION CARD
============================================================ */

function OrganizationCard({
  title,
  name,
  featured = false,
}: {
  title: string;
  name: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`w-full max-w-md rounded-[1.5rem] border border-[#DED7CE] px-8 py-8 text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-lg ${
        featured ? "bg-[#F7F3EC]" : "bg-white"
      }`}
    >

      <h4 className="font-heading text-3xl sm:text-4xl">
        {title}
      </h4>

      <p className="mt-3 text-sm text-[#8B7355]">
        {name}
      </p>

    </div>
  );
}


/* ============================================================
   CONNECTOR
============================================================ */

function Connector() {
  return (
    <div className="h-10 w-px bg-[#CDBDAA]" />
  );
}


/* ============================================================
   ORGANIZATION GROUP
============================================================ */

function OrganizationGroup({
  title,
  people,
}: {
  title: string;
  people: [string, string][];
}) {
  return (
    <div className="rounded-[1.5rem] border border-[#DED7CE] bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg sm:p-10">

      <h4 className="font-heading text-3xl sm:text-4xl">
        {title}
      </h4>

      <div className="mt-7 space-y-6">

        {people.map(([role, name]) => (
          <div key={role}>

            <p className="text-sm font-medium text-[#6F503B]">
              {role}
            </p>

            <p className="mt-1 text-sm text-[#8B7355]">
              {name}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}


/* ============================================================
   DEPARTMENT CARD
============================================================ */

function DepartmentCard({
  title,
  people,
}: {
  title: string;
  people: [string, string][];
}) {
  return (
    <article className="group rounded-[1.5rem] border border-[#DED7CE] bg-[#F7F3EC] p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg sm:p-9">

      <h4 className="font-heading text-3xl sm:text-4xl">
        {title}
      </h4>

      <div className="mt-7 space-y-6 text-sm">

        {people.map(([role, name]) => (
          <div key={role}>

            <p className="font-medium text-[#6F503B]">
              {role}
            </p>

            <p className="mt-1 text-[#8B7355]">
              {name}
            </p>

          </div>
        ))}

      </div>

    </article>
  );
}


/* ============================================================
   VALUE CARD
============================================================ */

function ValueCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <ScrollReveal>
      <div className="group h-full rounded-[1.5rem] border border-[#DED7CE] bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg">

        <div className="mb-5 h-px w-8 bg-[#BFA98D] transition-all duration-500 group-hover:w-12" />

        <h3 className="font-heading text-3xl">
          {title}
        </h3>

        <p className="mt-3 text-justify text-sm leading-7 text-[#6F6860]">
          {description}
        </p>

      </div>
    </ScrollReveal>
  );
}