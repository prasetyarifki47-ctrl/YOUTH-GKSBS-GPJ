  import type { Metadata } from "next";
  import { Inter, Cormorant_Garamond } from "next/font/google";
  import "./globals.css";
  import Navbar from "@/components/navbar";

  const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
  });

  const cormorant = Cormorant_Garamond({
    variable: "--font-cormorant",
    subsets: ["latin"],
  });

  export const metadata: Metadata = {
    title: "Youth GKSBS Gunung Pasir Jaya",
    description:
      "Website Pemuda GKSBS Gunung Pasir Jaya — ruang untuk bertumbuh, melayani, dan berjalan bersama dalam Kristus.",
  };

  export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="id">
        <body
          className={`${inter.variable} ${cormorant.variable} antialiased`}
        >
          <Navbar />
          {children}
        </body>
      </html>
    );
  }