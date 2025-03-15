"use client"

import type React from "react"

import { useState } from "react"
import Navbartop from "./nav"
import ChatWidget from "@/components/chatbot/ChatWidget"
import Footer from "@/components/built/footer"
import MobileNav from "@/components/built/mobile-nav"

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const [isChatOpen, setIsChatOpen] = useState(false)

  const openChat = () => {
    setIsChatOpen(true)
  }

  return (
    <>
      <Navbartop />
      <MobileNav openChat={openChat} />
      <main>{children}</main>
      <Footer />
      <ChatWidget externalIsOpen={isChatOpen} setExternalIsOpen={setIsChatOpen} />
    </>
  )
}

