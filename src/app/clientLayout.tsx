"use client"

import type React from "react"

import { useState } from "react"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Navbartop from "../components/built/nav"
import ChatWidget from "@/components/chatbot/ChatWidget"
import Footer from "@/components/built/footer"
import MobileNav from "@/components/built/mobile-nav"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isChatOpen, setIsChatOpen] = useState(false)

  const openChat = () => {
    setIsChatOpen(true)
  }

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbartop />
        <MobileNav openChat={openChat} />
        <main>{children}</main>
        <Footer />
        <ChatWidget externalIsOpen={isChatOpen} setExternalIsOpen={setIsChatOpen} />
      </body>
    </html>
  )
}

