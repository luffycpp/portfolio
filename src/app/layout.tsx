
import { Outfit } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Background } from "@/components/Background";
import { ScrollProgress } from "@/components/ui/ScrollProgress";


const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

import { constructMetadata } from "@/lib/metadata";
import { Viewport } from "next";

export const metadata = constructMetadata();

export const viewport: Viewport = {
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${outfit.variable} font-sans antialiased bg-[#050505] text-white overflow-x-hidden`} suppressHydrationWarning>
        <Background />
        <ScrollProgress />


        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
