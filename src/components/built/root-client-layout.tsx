"use client";

import type React from "react";
import { useState } from "react";
import { usePathname } from "next/navigation"; // Import usePathname
import ChatWidget from "@/components/chatbot/ChatWidget";
import Footer from "@/components/built/footer";
import Navbartop from "./nav";
import MobileNav from "@/components/built/mobile-nav";

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const pathname = usePathname(); // Get the current route

  const openChat = () => {
    setIsChatOpen(true);
  };

  return (
    <>
      {/* Only render Navbartop and MobileNav if the route is NOT /sp */}
      {pathname !== "/sp" && <Navbartop />}
      {pathname !== "/sp" && <MobileNav openChat={openChat} />}
      <main>{children}</main>
      <Footer />
      <ChatWidget
        externalIsOpen={isChatOpen}
        setExternalIsOpen={setIsChatOpen}
      />
    </>
  );
}
