import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Geist , DM_Sans } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

const dmSans = DM_Sans({
  subsets : ["latin"],
  variable : "--font-dm-sans"
})

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Status up : tracking the uptime of the websites",
  description: "for tracking websites uptime and related metrics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={  dmSans.className+ "  dark"}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
// cn("font-sans", geist.variable) 
