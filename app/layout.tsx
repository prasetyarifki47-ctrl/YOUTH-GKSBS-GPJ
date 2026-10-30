
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import PageTransition from "@/components/page-transition";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = "https://youthgksbsgpj.web.id";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Youth GKSBS Gunung Pasir Jaya",
    template: "%s | Youth GKSBS GPJ",
  },

  description:
    "Website Youth GKSBS Gunung Pasir Jaya. Temukan informasi kegiatan pemuda, persekutuan, pelayanan gereja, komunitas, dan Bible Games untuk bertumbuh bersama dalam Kristus.",

  applicationName: "Youth GKSBS GPJ",

  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
    ],
    shortcut: "/favicon.ico",
  },

  keywords: [
    "Youth GKSBS Gunung Pasir Jaya",
    "Pemuda GKSBS Gunung Pasir Jaya",
    "GKSBS Gunung Pasir Jaya",
    "Pemuda gereja",
    "Kegiatan pemuda gereja",
    "Pelayanan pemuda Kristen",
    "Bible Games",
    "Permainan Alkitab",
  ],

  authors: [
    {
      name: "Youth GKSBS Gunung Pasir Jaya",
    },
  ],

  openGraph: {
    title: "Youth GKSBS Gunung Pasir Jaya",
    description:
      "Ruang bagi pemuda untuk bertumbuh, melayani, dan berjalan bersama dalam Kristus.",
    url: siteUrl,
    siteName: "Youth GKSBS GPJ",
    locale: "id_ID",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Youth GKSBS Gunung Pasir Jaya",
    description:
      "Bertumbuh, melayani, dan berjalan bersama dalam Kristus.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.variable} antialiased`}>
        <Navbar />

        <PageTransition>{children}</PageTransition>

        <Footer />
      </body>
    </html>
  );
}
