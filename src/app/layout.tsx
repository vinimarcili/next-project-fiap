import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Footer from "@/components/footer/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FIAP - Next.js",
  description: "FIAP - Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br" className='w-full h-full overflow-x-hidden'>
      <body className={`${inter.className} w-full h-full min-h-screen flex flex-col`}>
        {children}
        <Footer />
      </body>
    </html>
  )
}
