import type { Metadata } from "next";
import { Syne, Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";

const syne = Syne({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Demolish - A delicious tool for demoing",
  description: "Demolish is a tool purpose built for demoing collaborative software.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${syne.variable} ${instrumentSerif.variable} ${inter.variable} antialiased font-sans bg-[#080808] text-[#F0EDE8] overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
