import type { Metadata } from "next"
import { Anton, Archivo_Black, Inter_Tight, JetBrains_Mono, Geist } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
})

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-arch",
  display: "swap",
})

const interTight = Inter_Tight({
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "AYAMTENNS — Nashville Hot Chicken",
  description:
    "Your daily craving nashville chicken. Authentic Nashville Hot Chicken based in BSD City, Indonesia.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(anton.variable, archivoBlack.variable, interTight.variable, jetbrainsMono.variable, "font-sans", geist.variable)}
    >
      <body>{children}</body>
    </html>
  )
}
